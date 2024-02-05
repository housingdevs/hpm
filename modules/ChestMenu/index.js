/// <reference types="../CTAutocomplete" />

const MCItem = Java.type("net.minecraft.item.Item");
const MCItemStack = Java.type("net.minecraft.item.ItemStack");
const InventoryBasic = Java.type("net.minecraft.inventory.InventoryBasic");
const GuiScreen = Java.type("net.minecraft.client.gui.GuiScreen");
const GuiChest = Java.type("net.minecraft.client.gui.inventory.GuiChest");

class IllegalArgumentException extends Error {
  constructor(message) {
    super(message);
    this.name = "IllegalArgumentException";
  }
}
class IllegalStateException extends Error {
  constructor(message) {
    super(message);
    this.name = "IllegalStateException";
  }
}

/**
 *
 * @typedef {(Item | MCTItem | MCTItemStack | null | undefined)} ChestItem
 */

export class ChestMenu {
  /**
   * @type {ChestItem[]}
   */
  #items;
  /**
   * @type {number}
   */
  #numSlots;
  /**
   * @type {boolean}
   */
  #open;
  /**
   * @type {((stack: MCTItemStack, slotNumber: number) => void)[]}
   */
  #clickListeners;
  /**
   * @type {(() => void)[]}
   */
  #openListeners;
  /**
   * @type {(() => void)[]}
   */
  #closeListeners;
  #inventoryBasic;
  #gui;

  /**
   * Creates a new ChestMenu with given name and number of slots
   * @param {string} name the name of this ChestMenu. Can use color codes using
   * & or §
   * @param {number} numRows the number of rows in this chest menu.
   * `1 <= numRows <= 6`
   */
  constructor(name, numRows) {
    if (numRows < 1 || numRows > 6) {
      throw new IllegalArgumentException("numRows must be between 1 and 6");
    }

    this.#items = [];
    this.#numSlots = numRows * 9;
    this.#inventoryBasic = new InventoryBasic(
      ChatLib.addColor(name),
      true,
      this.#numSlots
    );
    this.#clickListeners = [];
    this.#openListeners = [];
    this.#closeListeners = [];

    register("guiMouseClick", (mx, my, btn, gui, e) => {
      if (!gui.equals(this.#gui)) return;
      cancel(e);

      const slot = Client.currentGui.getSlotUnderMouse();
      if (slot === null) return;

      if (slot.getItem() !== null) {
        const itemStack =
          slot.getItem()?.getItemStack()?.func_77946_l() ?? null; // copy
        if (itemStack !== null && GuiScreen.func_146272_n()) {
          // isShiftKeyDown
          itemStack.field_77994_a = itemStack.func_77976_d(); // stackSize, getMaxStackSize
        }

        this.#clickListeners.forEach((listener) => {
          listener(new Item(itemStack), slot.getIndex());
        });
      }
    });

    register("guiClosed", (gui) => {
      if (gui.equals(this.#gui)) {
        this.#closeListeners.forEach((listener) => listener());
        this.#open = false;
      }
    });

    register("postGuiRender", (mx, my, gui) => {
      if (gui.equals(this.#gui) && !this.#open) {
        this.#openListeners.forEach((listener) => listener());
        this.#open = true;
      }
    });
  }

  /**
   * Sets the item at slot `index` to `item`
   * @param {number} index the slot index to set.
   * `0 <= index < getNumberOfSlots()`
   * @param {ChestItem} item the new item
   * @returns {this} the ChestMenu to allow method chaining
   */
  setItem(index, item) {
    if (index < 0 || index >= this.#numSlots) {
      throw new IllegalArgumentException(
        "index must be >= 0 and < getNumberOfSlots()"
      );
    }

    this.#items[index] = item;
    this.#inventoryBasic.func_70299_a(index, this._convertItem(item));

    return this;
  }

  /**
   * Adds the item at the next open slot
   * @param {number} index the slot index to set. Must have space available in
   * this ChestMenu
   * @param {ChestItem} item the new item
   * @returns {this} the ChestMenu to allow method chaining
   */
  addItem(item) {
    if (this.#items.length === this.#numSlots) {
      throw new IllegalStateException("this ChestMenu is already full");
    }

    this.setItem(this.#items.length, item);

    return this;
  }

  /**
   * Removes the item at `index`, and shifts all elements after it down 1 slot
   * @param {number} index the index of the item to remove.
   * `0 <= index < getNumberOfSlots()`
   * @returns {ChestItem} the removed item
   */
  remove(index) {
    if (index < 0 || index >= this.#numSlots) {
      throw new IllegalArgumentException(
        "index must be >= 0 and < getNumberOfSlots()"
      );
    }

    const removed = this.#items.splice(index, 1);
    const items = this.#items;
    this.clear();
    this.setItems(items);

    return removed[0];
  }

  /**
   * Inserts the item at the given index. If there is an item in the last slot,
   * it will be removed from all the other items shifting over.
   * @param {number} index the index to insert the item. `0 <= index < getNumberOfSlots()`
   * @param {ChestItem} item the item to insert
   * @returns {this} the ChestMenu to allow method chaining
   */
  insertItem(index, item) {
    if (index < 0 || index >= this.#numSlots) {
      throw new IllegalArgumentException(
        "index must be >= 0 and < getNumberOfSlots()"
      );
    }

    if (index > this.#items.length) {
      this.#items[index] = item;
    } else {
      this.#items.splice(index, 0, item);
    }

    const items = this.#items.slice(0, this.#numSlots);
    this.clear();
    this.setItems(items);

    return this;
  }

  /**
   * Sets the items in this ChestMenu
   * @param {ChestItem[]} items the items to set for the ChestMenu.
   * `itemArray.length <= getNumberOfSlots()`
   * @returns {this} the ChestMenu to allow method chaining
   */
  setItems(items) {
    if (items.length > this.#numSlots) {
      throw new IllegalArgumentException(
        "itemArray.length must be <= getNumberOfSlots()"
      );
    }

    this.clear();
    items.forEach((item, index) => {
      this.setItem(index, item);
    });

    return this;
  }

  /**
   * Gets the item in the slot at index `index`
   * @param {number} index the index of the item to get. `0 <= index < getNumberOfSlots()`
   * @returns {ChestItem} the item at slot `index`
   */
  getItemInSlot(index) {
    if (index < 0 || index >= this.#numSlots) {
      throw new IllegalArgumentException(
        "index must be >= 0 and < getNumberOfSlots()"
      );
    }

    return this.#items[index];
  }

  /**
   * Converts a ChestItem to an MCItemStack. For internal use only
   * @param {ChestItem} item the item to convert
   * @returns {MCTItemStack} the corresponding MCItemStack of the item
   */
  _convertItem(item) {
    if (item === undefined) {
      return null;
    }

    if (item instanceof Item) {
      return item.getItemStack();
    } else if (item instanceof MCItem) {
      return new MCItemStack(item);
    }

    return item;
  }

  /**
   * Clears all items from this ChestMenu
   */
  clear() {
    this.#items = [];
    this.#inventoryBasic.func_174888_l();
  }

  /**
   * Opens this ChestMenu
   */
  open() {
    if (!this.#gui) {
      this.#gui = new GuiChest(
        Player.getPlayer().field_71071_by,
        this.#inventoryBasic
      );
    }
    GuiHandler.openGui(this.#gui);
  }

  /**
   * Registers `callback` to fire every time any slot is clicked while this
   * ChestMenu is open. Slots below `getNumberOfSlots()` are inside the chest
   * menu.
   * @param {(stack: MCTItemStack, slotNumber: number) => void} callback the
   * callback that listens whenever a slot is clicked
   */
  onClick(callback) {
    this.#clickListeners.push(callback);
  }

  /**
   * Registers `callback` to fire every time this ChestMenu is closed.
   * @param {() => void} callback the callback that listens whenever this
   * ChestMenu is closed
   */
  onClose(callback) {
    this.#closeListeners.push(callback);
  }

  /**
   * Registers `callback` to fire every time this ChestMenu is opened.
   * @param {() => void} callback the callback that listens whenever this
   * ChestMenu is opened
   */
  onOpen(callback) {
    this.#openListeners.push(callback);
  }

  /**
   * Gets the total number of slots in this ChestMenu
   * @returns the total number of slots inside this ChestMenu (the upper
   * inventory)
   */
  getNumberOfSlots() {
    return this.#numSlots;
  }
}
