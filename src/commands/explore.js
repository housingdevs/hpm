import { createPagedMenu } from "../tools/createPagedMenu";
import { Atlas } from "../tools/getAtlas";
import { importModule } from "../tools/importModule";

let exploreMenu = []

function formatAtlas() {
    if (!Atlas.loaded) return ChatLib.chat("&cHPM hasn't loaded yet!")

    let modItems = []

    Object.values(Atlas.data).forEach(modData => {
        let itemType = 'minecart'
        
        if (FileLib.exists(`${Config.modulesFolder}/${modData.name}`)) itemType = 'command_block_minecart'

        modItems.push({
            item: new Item(itemType)
                .setName('§a'+modData.name)
                .setLore(
                    [
                        '&7Creator: &b' + modData.creator,
                        '&7Distributions: &e' + Object.keys(modData.distro).length,
                        '',
                        itemType == 'minecart' ? '&eLeft Click to import!' : '&eLeft Click to patch!'
                    ]
                ),

            leftClick() {
                Client.currentGui.close()
                Client.setCurrentChatMessage('/hpm import '+modData.name)
            }
        })
    })

    modItems = modItems.sort((a,b) => (a.item.getName() > b.item.getName()) ? 1 : ((b.item.getName() > a.item.getName()) ? -1 : 0))
    modItems = modItems.sort((a,b) => a.item.getID() - b.item.getID());

    exploreMenu = createPagedMenu(modItems, 'Explore Modules')
}

export function openExploreMenu() {
    if (!Atlas.loaded) return ChatLib.chat("&cHPM hasn't loaded yet!")
    if (!exploreMenu[0]) formatAtlas()

    exploreMenu[0].open()
}