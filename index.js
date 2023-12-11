import { installModule } from './commandImport';
import axios from './modules/axios';

const helpMessage = new Message([
    '\n',
    '&7&l■ HPM Commands\n',
    '&7 | &e/hpm reload &8- &7Reload HPM\'s atlas to check for new mods\n',
    '&7 | &e/hpm import &8- &7Import a ChatTriggers module from our atlas\n',
    '&7 | &e&m/hpm install&8 -&7 &mInstall a HPM Package from our Action Library\n',
    ''
])

let atlas = { loaded: false };

// initialisation
function initialise(loud = false) {
    axios.get('https://dev.ixnoah.live/mods/hpm/atlas.json')
    .then((response) => {
        atlas = response.data
        atlas.loaded = true

        if (loud) ChatLib.chat('&aHPM has successfully loaded!')
    })
        .catch((err) => {
            ChatLib.chat('&c&lERROR! &eHPM has encountered an error while fetching the atlas! See the console for more info!')
            return err
    })
}

initialise()

// command initialisation
register('command', (subcommand, ...args) => {
    switch(subcommand) {
        case 'import':
            installModule(atlas, args[0]?.toLowerCase() || undefined)
        break;
        case 'reload':
            ChatLib.chat('&cReloading HPM...')
            initialise(true)
        break;
        case 'delete':
            ChatLib.command(`ct delete ${...args}`)
        break;
        default:
            ChatLib.chat(helpMessage)
    }
}).setName('hpm')