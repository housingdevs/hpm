import { ChestMenu } from "./index";

const C10PacketCreativeInventoryAction = Java.type(
  "net.minecraft.network.play.client.C10PacketCreativeInventoryAction"
);
const Mouse = Java.type("org.lwjgl.input.Mouse");

const getNextSlot = () => {
  let slot = -1;

  for (let i = 0; i < 9; i++) {
    let stack = Player.getInventory().getStackInSlot(i);
    if (!stack) {
      slot = i + 36;
      break;
    }
  }

  if (slot === -1) {
    for (let i = 9; i < 36; i++) {
      let stack = Player.getInventory().getStackInSlot(i);
      if (!stack) {
        slot = i;
        break;
      }
    }
  }

  return slot;
};

// create a new menu with 1 row
// this menu will add the item to the user's inventory as soon as they click

const chest = new ChestMenu("&6&lyoyoyo", 1);
chest.setItems([
  new Item(1).setName("a").setStackSize(2),
  new Item(2).setName("b"),
  new Item(3).setName("c"),
  null,
  new Item(4).setName("d"),
]);

register("command", () => {
  chest.open();
}).setName("open");

let item = null;
let keepOpening = false;
const mouse = { x: -1, y: -1 };

chest.onClick((stack, slotNumber) => {
  if (slotNumber < chest.getNumberOfSlots()) {
    item = stack;
    keepOpening = true;
    mouse.x = Mouse.getX();
    mouse.y = Mouse.getY();
    Client.currentGui.close();
  }
});

chest.onOpen(() => {
  item = null;
  keepOpening = false;
  if (mouse.x !== -1 && mouse.y !== -1) {
    Mouse.setCursorPosition(mouse.x, mouse.y);
  }
});

chest.onClose(() => {
  if (!item) return;
  Client.sendPacket(
    new C10PacketCreativeInventoryAction(getNextSlot(), item.getItemStack())
  );
  if (keepOpening) {
    chest.open();
  } else {
    mouse.x = -1;
    mouse.y = -1;
  }
});
