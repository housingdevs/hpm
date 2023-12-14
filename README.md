# Housing Packet Manager
Add functions, ChatTriggers modules & more! It's an all-in-one Housing importer!

* Import specialised, professionally created action packages!
* Access all your Housing mods without needing to manually install them!

## Usage
| Command              | Purpose
| -------------------- | ------------------------------------------------------
| `/hpm`               | Opens a list of all commands
| `/hpm add <package>` | Adds a package from the HPM Action Library, these are curated heavily
| `/hpm import <mod>`  | Checks the mod atlas and downloads the mod if it's on there
| `/hpm reload`        | Fetches the updated version of the mod link atlas (you won't need this, unless imports break)

## Installation
> [!IMPORTANT]  
> You will need [Forge 1.8.9](https://files.minecraftforge.net/net/minecraftforge/forge/index_1.8.9.html) and [ChatTriggers](https://www.chattriggers.com/). We are currently **not** working on 1.9+ support.

1. Grab the latest stable build from the [Releases](https://github.com/housingdevs/hpm/releases) tab, or get our [latest codebase copy](https://github.com/housingdevs/hpm/archive/main.zip). (warning: instant download!)
2. Head ingame with ChatTriggers and type `/ct files` to open up your ChatTriggers folder. Navigate to the `/modules/` subfolder and drop in your newly downloaded zip file.
3. Unzip this file, it will mostlikely turn into a folder called `hpm-main`. Open this up and if there is another folder inside of the same name, you can safely move it up.
4. Rename the folder to `hpm`.
5. Now, type `/ct load` and enjoy the benefit of having HPM installed! 
