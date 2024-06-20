import { ServerCommands, ServerEvents } from '@customrealms/core';

ServerEvents.register<org.bukkit.event.player.PlayerJoinEvent>('org.bukkit.event.player.PlayerJoinEvent', event => {
    event.getPlayer().sendMessage('Welcome to the server!');
});

ServerEvents.register<org.bukkit.event.player.PlayerInteractEvent>('org.bukkit.event.player.PlayerInteractEvent', event => {
    const location = event.getPlayer().getTargetBlockExact(100).getLocation();
    location.getWorld().strikeLightning(location);
});

ServerCommands.register('/gmc', (player) => {
    player.setGameMode(org.bukkit.GameMode.CREATIVE);
});

ServerCommands.register('/gms', (player) => {
    player.setGameMode(org.bukkit.GameMode.SURVIVAL);
});

setInterval(() => {
    const players = org.bukkit.Bukkit.getServer().getOnlinePlayers();
    Array.prototype.forEach.call(players, (player) => {
        player.sendMessage('Hello world!');
    });
}, 2000);
