import FileUtilities from '../modules/FileUtilities/main';
import { Promise } from '../modules/PromiseV2/index'

const JavaFiles = Java.type('java.nio.file.Files')
const JavaPaths = Java.type('java.nio.file.Paths')
const JavaStandardCopyOption = Java.type('java.nio.file.StandardCopyOption')

function mergeDirectories(source, destination) {
    return new Promise((resolve, reject) => { try {
        if (!JavaFiles.exists(destination)) JavaFiles.createDirectories(destination)
    
        const sourceItems = JavaFiles.list(source)

        sourceItems.forEach(sourceItem => {
            const destinationItem = destination.resolve(source.relativize(sourceItem))

            if (JavaFiles.isDirectory(sourceItem)) {
                mergeDirectories(sourceItem, destinationItem)
            } else {
                JavaFiles.copy(sourceItem, destinationItem, JavaStandardCopyOption.REPLACE_EXISTING)
            }
        })

        resolve();
    } catch(err) {reject(err)} })
}

// im beginnin' to feel like a jank god, jank god.
export function installModule(atlas, moduleName) {
    if (!atlas.loaded)      return ChatLib.chat('&cHPM Atlas hasn\'t loaded yet! Please wait!')
    if (!moduleName)        return ChatLib.chat('&cPlease input a module name!')
    
    moduleName = moduleName.split(':')
    if (!atlas[moduleName[0]]) return ChatLib.chat('&cThis module doesn\'t exist!') 

    let release = atlas[moduleName[0]].releases[moduleName[1] || '$default'] // Multi version support

    const tempId = Date.now()
    FileUtilities.urlToFile(release.url, `./config/ChatTriggers/modules/hpm-temp-${tempId}.zip`, 5000, 5000)

    const suicideCheck = register('step', () => {
        if (FileUtilities.exists(`./config/ChatTriggers/modules/hpm-temp-${tempId}.zip`)) {
            suicideCheck.unregister()

            FileLib.unzip(`./config/ChatTriggers/modules/hpm-temp-${tempId}.zip`, './config/ChatTriggers/modules/')

            mergeDirectories(
                JavaPaths.get(`./config/ChatTriggers/modules/${release.expectedName}`), 
                JavaPaths.get(`./config/ChatTriggers/modules/${atlas[moduleName[0]].name}`)
            ).then(() => {
                FileLib.deleteDirectory(`./config/ChatTriggers/modules/${release.expectedName}`)
                FileLib.delete(`./config/ChatTriggers/modules/hpm-temp-${tempId}.zip`)

                ChatLib.chat(`&aImported ${atlas[moduleName[0]].name}!`)
                if (release.unstable) ChatLib.chat(`&6&lWARN&8 - &7This release has been marked as unstable! There may be bugs!`)

                ChatLib.command('ct load', true)
            })
        }
    }).setDelay(1)
}