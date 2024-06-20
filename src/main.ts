import { ServerCommands, ServerEvents } from '@customrealms/core';

// When a player joins, send them a welcome message.
ServerEvents.register<org.bukkit.event.player.PlayerJoinEvent>('org.bukkit.event.player.PlayerJoinEvent', event => {
    event.getPlayer().sendMessage(`${org.bukkit.ChatColor.BOLD}Welcome to the server!`);
});

// When a player interacts with a block, strike lightning at the block's location.
ServerEvents.register<org.bukkit.event.player.PlayerInteractEvent>('org.bukkit.event.player.PlayerInteractEvent', event => {
    const location = event.getPlayer().getTargetBlockExact(1000).getLocation();
    location.getWorld().strikeLightning(location);
});

// Register two commands for changing the player's game mode.
ServerCommands.register('/gmc', (player) => {
    player.setGameMode(org.bukkit.GameMode.CREATIVE);
});
ServerCommands.register('/gms', (player) => {
    player.setGameMode(org.bukkit.GameMode.SURVIVAL);
});

// Every 2 seconds, send a 'Hello World' message to all online players.
setInterval(() => {
    const players = org.bukkit.Bukkit.getServer().getOnlinePlayers();
    players.forEach(player => {
        player.sendMessage('Hello world!');
    });
}, 2000);
