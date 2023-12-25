export function formatAtlasToChat(atlas) {
    if (!atlas.loaded) return ChatLib.chat('&cHPM Atlas hasn\'t loaded yet! Please wait!')
    delete atlas.loaded // Fucks with iteration, gtfo
    
    let components = []
    components.push('\n&7&l■ Module Atlas\n')

    Object.values(atlas).forEach(moduleData => {
        components.push(`&7 | `)

        if (FileLib.exists(`./config/ChatTriggers/modules/${moduleData.name}`)) {
            components.push(
                new TextComponent('&c&lx ')
                    .setHover('show_text','&cDelete Module')
                    .setClick('run_command',`/hpm delete ${moduleData.name}`),
                new TextComponent('&a&l+ ')
                    .setHover('show_text','&aCheck for Updates')
                    .setClick('run_command',`/hpm import ${moduleData.name}`),
            )
        } else {
            components.push(
                new TextComponent('&8&lx ').setHover('show_text', '&7&mDelete Module'),
                new TextComponent('&a&l+ ')
                    .setHover('show_text', '&aImport Module')
                    .setClick('run_command', `/hpm import ${moduleData.name}`)
            )
        }
        components.push(
            new TextComponent(`&7| &b${moduleData.name}\n`) // kill me
                .setHover('show_text', `&a${moduleData.name}\n&7by &b${moduleData.creator}\n\n&eClick to view ${Object.keys(moduleData.releases).length} release${Object.keys(moduleData.releases).length == 1 ? '' : 's'}!`)
                .setClick('run_command',`/hpm atlas ${moduleData.name}`)
            )                
    })

    ChatLib.chat(new Message(components).setChatLineId(694201337))
    atlas.loaded = true
}