import { Atlas, getAtlas } from "./src/tools/getAtlas"

import './src/base'

getAtlas().then(data => {
    Atlas.loaded = true
    Atlas.data = data
}).catch(err => {
    ChatLib.chat('&cCouldn\'t connect to HPM server!')
    console.error(err)
})