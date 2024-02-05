import { openExploreMenu } from "./commands/explore";
import { importModuleCommand } from "./commands/import";

const commands = {
    'import': {
        name: 'import',
        description: 'Imports or patches a HPM module',
        usage: 'import <module>',
        run: importModuleCommand
    },
    'explore': {
        name: 'explore',
        description: 'Opens a browser for HPM modules',
        usage: 'explore',
        run: openExploreMenu
    }
}

let helpMessage;
const components = [
    '\n',
    '&7■ &lHPM Commands\n'
]

Object.values(commands).forEach(commandData => {
    components.push(
        new TextComponent('&7 | &e/hpm '+commandData.usage.replace('<','&7<')+'\n')
        .setClick('suggest_command', '/hpm '+commandData.name)
        .setHover('show_text', '&7'+commandData.description)
    )
})

helpMessage = new Message(components).setChatLineId(572364634)

register('command', (subcommand, ...args) => {
    if (commands[subcommand?.toLowerCase()]) return commands[subcommand.toLowerCase()].run(...args)

    ChatLib.chat(helpMessage)
}).setName('hpm')