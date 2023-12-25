import FileUtilities from '../modules/FileUtilities/main';

// im beginnin' to feel like a jank god, jank god.
export function installModule(atlas, moduleName) {
    if (!atlas.loaded)      return ChatLib.chat('&cHPM Atlas hasn\'t loaded yet! Please wait!')
    if (!moduleName)        return ChatLib.chat('&cPlease input a module name!')
    
    moduleName = moduleName.split(':')
    if (!atlas[moduleName[0]]) return ChatLib.chat('&cThis module doesn\'t exist!') 

    let release = atlas[moduleName].releases[moduleName[1] || '$default'] // Multi version support

    const tempId = Date.now()
    FileUtilities.urlToFile(release.url, `./config/ChatTriggers/modules/hpm-temp-${tempId}.zip`, 5000, 5000)

    const suicideCheck = register('step', () => {
        if (FileUtilities.exists(`./config/ChatTriggers/modules/hpm-temp-${tempId}.zip`)) {
            suicideCheck.unregister()
            
            FileLib.deleteDirectory(`./config/ChatTriggers/modules/${moduleName[0]}`)
            FileLib.unzip(`./config/ChatTriggers/modules/hpm-temp-${tempId}.zip`, './config/ChatTriggers/modules/')
            FileUtilities.renameDirectory(`./config/ChatTriggers/modules/${release.expectedName}/`, atlas[moduleName[0]].name)
            
            FileLib.delete(`./config/ChatTriggers/modules/hpm-temp-${tempId}.zip`)
            ChatLib.chat(`&aImported ${atlas[moduleName[0]].name}!`)
            if (release.unstable) ChatLib.chat(`&6&lWARN&8 - &7This release has been marked as unstable! There may be bugs!`)
            ChatLib.command('ct load', true)
        }
    }).setDelay(1)
}