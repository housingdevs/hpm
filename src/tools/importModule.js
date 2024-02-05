import FileUtilities from '../../modules/FileUtilities/main'
import { Promise } from '../../modules/PromiseV2/index'

export function importModule(moduleData, distro = null) {
    return new Promise(( resolve, reject ) => {
        const selectedDistro = moduleData.distro[distro] || moduleData.distro[moduleData.defaultDistro]
        const tempFilename = `/hpm-temp-${Date.now()}.zip`


        FileUtilities.urlToFile(
            selectedDistro.archive, 
            Config.modulesFolder + tempFilename,
            1e4, 1e4 // 10 seconds
        ).then(data => {
            FileLib.unzip(
                Config.modulesFolder + tempFilename, 
                Config.modulesFolder
            )

            FileUtilities.mergeDirectory(
                Config.modulesFolder + '/' + selectedDistro.importName,
                Config.modulesFolder + '/' + moduleData.name
            ).then(() => {
                FileLib.deleteDirectory(Config.modulesFolder + '/' + selectedDistro.importName)
                FileLib.delete(Config.modulesFolder + tempFilename)

                resolve()
            })
        })
    }).catch(err => {
        console.log(err)
        ChatLib.chat('&cAn error occured while importing! Type &e/ct console js &cfor more info!')
    })
}