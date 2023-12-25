import { installModule } from './src/modImporter';
import axios from './modules/axios';
import { formatAtlasToChat } from './src/modExplorer';
import { viewModReleases } from './src/modReleases';

const helpMessage = new Message([
    '\n',
    '&7&l■ HPM Commands\n',
    '&7 | &e/hpm atlas&8 - &7Manage your HPM Atlas modules\n',
    '&7 | &e/hpm import&8 - &7Import a HPM Atlas module\n',
    '&7 | &e/hpm delete&8 - &7Delete a HPM Atlas module\n',
    '&7 | &e&m/hpm package&8 - &7&mImport an Action Package\n'
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
        case 'atlas':
            if (!args[0]) return formatAtlasToChat(atlas)
            viewModReleases(atlas, args[0])
        break;
        case 'reload':
            ChatLib.chat('&cReloading HPM...')
            initialise(true)
        break;
        case 'delete':
            if (args[0]=="hpm") return ChatLib.chat(new Message([
                new TextComponent("\n&cAre you sure you want to delete HPM? You'll lose out on critical patches, easy installing of modules & more!\n"),
                new TextComponent('&c&lDELETE HPM\n').setHover('show_text','&cDelete HPM').setClick('run_command','/ct delete hpm')
            ]))

            ChatLib.command(`ct delete ${...args}`)
        break;
        default:
            ChatLib.chat(helpMessage)
    }
}).setName('hpm')