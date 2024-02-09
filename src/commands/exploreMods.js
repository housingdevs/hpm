import { createPagedMenu } from "../tools/createPagedMenu";
import { Atlas } from "../tools/getAtlas";
import { importModule } from "../tools/importModule";

const SORT_ORDER = {
    minecart: 0,
    command_block_minecart: 1,
    chest_minecart: 2
};

let exploreMenu = []

function formatAtlas() {
    if (!Atlas.loaded) return ChatLib.chat("&cHPM hasn't loaded yet!")

    let modItems = []

    for (const modData of Object.values(Atlas.data)) {
        let itemType = 'minecart'

        if (FileLib.exists(`${Config.modulesFolder}/${modData.name}`)) itemType = 'command_block_minecart'
        if ( itemType=='command_block_minecart' && modData.isLibrary ) itemType = 'chest_minecart'
        if ( itemType=='minecart' && modData.isLibrary ) continue; // we don't want to show libraries in the explore menu unless they're already imported
        
        modItems.push({
            item: new Item(itemType)
                .setName('&a'+modData.name)
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
                Client.setCurrentChatMessage('/hpm import ' + modData.name)
            }
        })
    }

    modItems.sort((a, b) => {
        const itemTypeA = a.item.getRegistryName().split(':')[1];
        const itemTypeB = b.item.getRegistryName().split(':')[1];

        if (itemTypeA !== itemTypeB) {
            return SORT_ORDER[itemTypeA] - SORT_ORDER[itemTypeB];
        }

        return a.item.getName().localeCompare(b.item.getName());
    });

    exploreMenu = createPagedMenu(modItems, 'Explore Modules')
}

export function openExploreMenu() {
    if (!Atlas.loaded) return ChatLib.chat("&cHPM hasn't loaded yet!")
    if (!exploreMenu[0]) formatAtlas()

    exploreMenu[0].open()
}
