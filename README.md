# Housing Packet Manager
Add functions, ChatTriggers modules & more! It's an all-in-one Housing importer!

* Import specialised, professionally created action packages!
* Access all your Housing mods without needing to manually install them!


| Command              | Purpose
| -------------------- | ------------------------------------------------------
| `/hpm`               | Opens a list of all commands
| `/hpm explore`       | Browse the mod explorer to manage your mods
| `/hpm import <mod>`  | Checks the mod atlas and downloads the mod if it's on there


## Installation
> [!IMPORTANT]  
> Install mods [Forge 1.8.9](https://files.minecraftforge.net/net/minecraftforge/forge/index_1.8.9.html) and [ChatTriggers](https://www.chattriggers.com/) before you attempt to use HPM. Modern versions are currently unsupported.

> [!NOTE]  
> Manual reinstalling is not needed to update HPM. Just type /hpm import hpm to update!

- Grab the latest release from our [Releases](/releases) page, or get the most recently commited version on the main branch.
- Unzip this zip file and copy the folder inside to your clipboard.
- Type `/ct files` in-game and navigate to the `modules` subfolder.
- Paste your folder into this `modules` subfolder and rename it to `hpm` in all lowercase.
- Reload ChatTriggers using `/ct reload`. You can now run `/hpm` to use the HPM mod!

If it's not working, make sure your file structure looks something like this before asking for help:

```
ChatTriggers
- modules
--- hpm
----- modules
----- src
----- index.js
----- metadata.json
----- README.md
--- [...]
- [...]
```
