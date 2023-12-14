import FileUtilities from './modules/FileUtilities/main';

export function installModule(atlas, moduleName) {
    if (!atlas.loaded)      return ChatLib.chat('&cHPM Atlas hasn\'t loaded yet! Please wait!')
    if (!moduleName)        return ChatLib.chat('&cPlease input a module name!')
    if (!atlas[moduleName]) return ChatLib.chat('&cThis module doesn\'t exist!') 

    const tempId = Date.now()
    FileUtilities.urlToFile(atlas[moduleName].url, `./config/ChatTriggers/modules/hpm-temp-${tempId}.zip`, 5000, 5000)

    const suicideCheck = register('step', () => {
        if (FileUtilities.exists(`./config/ChatTriggers/modules/hpm-temp-${tempId}.zip`)) {
            suicideCheck.unregister()
            
            FileLib.unzip(`./config/ChatTriggers/modules/hpm-temp-${tempId}.zip`, './config/ChatTriggers/modules/')
            // then publish releases u fucker!!!!
            // lol -master has cause so many problems
            FileUtilities.renameDirectory(`./config/ChatTriggers/modules/${atlas[moduleName].expectedName}/`, atlas[moduleName].name)
            
            FileLib.delete(`./config/ChatTriggers/modules/hpm-temp-${tempId}.zip`)
            ChatLib.chat(`&aImported ${atlas[moduleName].name}!`)
            ChatLib.command('ct load', true)
        }
    }).setDelay(1)
}