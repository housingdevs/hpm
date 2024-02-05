import { Atlas } from "../tools/getAtlas"
import { importModule } from "../tools/importModule"

export function importModuleCommand(moduleName, flags) {
    if (!Atlas.loaded) return ChatLib.chat("&cHPM hasn't loaded yet!")
    if (!Atlas.data[moduleName?.toLowerCase()]) return ChatLib.chat("&cCouldn't find this module!")

    importModule(Atlas.data[moduleName.toLowerCase().trim()]).then(() => {
        ChatLib.chat(`&aImported ${Atlas.data[moduleName.toLowerCase()].name}!`)
        ChatLib.command('ct load', true)
    })
}