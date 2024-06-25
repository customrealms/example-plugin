import { Bukkit, ServerCommands, ServerEvents } from '@customrealms/core';
import { buildStairs } from './stairs';

const ChatColor = org.bukkit.ChatColor;

ServerEvents.register(org.bukkit.event.player.PlayerJoinEvent, event => {
    const player = event.getPlayer();
    event.setJoinMessage(`${ChatColor.BOLD}${ChatColor.GRAY}[${ChatColor.GREEN}+${ChatColor.GRAY}]${ChatColor.RESET} ${player.getName()}`);
});

ServerEvents.register(org.bukkit.event.player.PlayerInteractEvent, event => {
    const targetBlock = event.getPlayer().getTargetBlockExact(1000);
    if (!targetBlock) return;
    const location = targetBlock.getLocation();
    location.getWorld()?.strikeLightning(location);
});

// Register two commands for changing the player's game mode.
ServerCommands.register('/gmc', (player) => {
    player.setGameMode(org.bukkit.GameMode.CREATIVE);
});
ServerCommands.register('/gms', (player) => {
    player.setGameMode(org.bukkit.GameMode.SURVIVAL);
});
ServerCommands.register('/gmsp', (player) => {
    player.setGameMode(org.bukkit.GameMode.SPECTATOR);
});

ServerCommands.register('/stairs {#:count} {S:material}', (player, call) => {
    const count = call.getNumericPlaceholder('count')!;
    const material = org.bukkit.Material.matchMaterial(call.getPlaceholder('material')!);
    if (!material || !material.isBlock()) {
        player.sendMessage('Invalid material');
        return;
    }

    buildStairs(player.getLocation(), count, material);
});

ServerCommands.register('/inv', (player) => {
    const inventory = Bukkit.createInventory(player, org.bukkit.event.inventory.InventoryType.CHEST);
    const materials = [
        org.bukkit.Material.DIAMOND_SWORD,
        org.bukkit.Material.DIAMOND_CHESTPLATE,
        org.bukkit.Material.DIAMOND_HELMET,
        org.bukkit.Material.DIAMOND_LEGGINGS,
        org.bukkit.Material.DIAMOND_BOOTS,
    ];
    for (const material of materials) {
        inventory.addItem(new org.bukkit.inventory.ItemStack(material));
    }
    player.openInventory(inventory);
});

ServerCommands.register('/invsee {P:player}', (player, call) => {
    const target = call.getPlayerPlaceholder('player');
    if (!target) {
        player.sendMessage('Invalid player');
        return;
    }

    const inventory = target.getInventory();
    player.openInventory(inventory);
});

ServerCommands.register('/nether', (player) => {
    const loc = Bukkit.getWorld('world_nether')?.getSpawnLocation();
    if (!loc) return;
    player.teleport(loc);
});
