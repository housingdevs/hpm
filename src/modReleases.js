export function viewModReleases(atlas, moduleName) {
    if (!atlas.loaded) return ChatLib.chat('&cHPM Atlas hasn\'t loaded yet! Please wait!')
    if (!moduleName)   return ChatLib.chat('&cPlease input a module name!')

    moduleName = moduleName.split(':')[0].toLowerCase()
    const moduleData = atlas[moduleName]

    if (!moduleData) return ChatLib.chat('&cThis module doesn\'t exist!') 

    let components = [
        new TextComponent('\n&7 ✖').setClick('run_command','/hpm atlas').setHover('show_text','&7Click to return to the atlas!'),
        ` &7&l${moduleData.name}\n`,
        `&7 | Created by: ${moduleData.creator}\n`,
    ]

    Object.keys(moduleData.releases).forEach(releaseName => {
        const releaseData = moduleData.releases[releaseName]
        
        components.push('&7 | ')
        components.push(
            new TextComponent('&a&l+')
                .setClick('run_command',`/hpm import ${moduleName}:${releaseName}`)
                .setHover('show_text', `&aImport ${moduleName}:${releaseName}`)
        )
        components.push(` &7| &b${releaseName} ${releaseData.unstable ? '&6(Unstable)' : ''}\n`)
    })

    ChatLib.chat(new Message(components).setChatLineId(694201337))
}