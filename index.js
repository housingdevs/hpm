import FileUtilities from './modules/FileUtilities/main'
import axios from './modules/axios'

let atlas = {
    loaded: false
};

async function init() {
    atlas = (await axios.get('https://dev.ixnoah.live/mods/hpm/atlas.json')).data
    atlas.loaded = true
} init()

//command: hpm import
async function installModule(moduleName) {
    if (!atlas.loaded) return ChatLib.chat('&cHPM Atlas hasn\'t loaded yet! Please wait!')
    if (!atlas[moduleName]) return ChatLib.chat('&cThis module doesn\'t exist!')
}

//FileUtilities.urlToFile('','./config/ChatTriggers/modules/', 10000, 10000)