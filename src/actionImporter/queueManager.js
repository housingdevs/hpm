const Queue = []

// TODO: Proper Implementation by @ImaDoofus
// Utilities by @ixNoah

// Color codes are removed automagically dw
function triggerItemButton(itemName) {
    const target = Player.getContainer().getItems().find(item => item.getName().removeFormatting() == itemName)
    Player.getContainer().indexOf(target)
}