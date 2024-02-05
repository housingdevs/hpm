import { ChestMenu } from "../../modules/ChestMenu"

const Mouse = Java.type('org.lwjgl.input.Mouse')

const chestSlots = [
    10, 11, 12, 13, 14, 15, 16,
    19, 20, 21, 22, 23, 24, 25,
    28, 29, 30, 31, 32, 33, 34,
]

const itemsPerPage = 21

// If this reaches prod I hope this code is so awful I'm never allowed to write UI code again

export function createPagedMenu(items, title) {
    const pageMenus = []
    const pages = []

    for (let i = 0; i < items.length; i += itemsPerPage) {
        const page = items.slice(i, i + itemsPerPage)
        pages.push(page)
    }

    for (let i = 0; i < pages.length; i++) {
        const pageItems = pages[i]
        const pageChestItems = new Array(54).fill(null)

        pageChestItems[49] = new Item('barrier').setName('&cClose')
        if (pages.length>1 && i < pages.length-1) pageChestItems[53] = new Item('arrow').setName('&aNext Page').setLore(`&ePage ${i + 2}`) 
        if (pages.length>1 && i > 0) pageChestItems[45] = new Item('arrow').setName('&aPrevious Page').setLore(`&ePage ${i}`)

        for (let i2 = 0; i2 < pageItems.length; i2++) {
            pageChestItems[chestSlots[i2]] = pageItems[i2].item
        }

        const pageChestMenu = new ChestMenu( (i > 0 ? `(${i+1}/${pages.length}) ` : '') + title, 6 )
        pageChestMenu.setItems(pageChestItems)

        pageChestMenu.onClick((stack, slot) => {
            if (stack?.getName()?.includes('§cClose'))         return Client.currentGui.close()
            if (stack?.getName()?.includes('§aPrevious Page')) return pageMenus[parseInt(stack.getLore()[1].split(' ')[1])-1]?.open()
            if (stack?.getName()?.includes('§aNext Page'))     return pageMenus[parseInt(stack.getLore()[1].split(' ')[1])-1]?.open()

            if (!Mouse.isButtonDown(1)) return pageItems[chestSlots.indexOf(slot)]?.leftClick()
            if (Mouse.isButtonDown(1))  return pageItems[chestSlots.indexOf(slot)]?.rightClick()
        })

        pageMenus.push(pageChestMenu)
    }

    return pageMenus
}