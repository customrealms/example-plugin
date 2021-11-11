import { PlayerChatEvent, ServerCommands, ServerEvents } from '@customrealms/core';

// Listen for player chat events
ServerEvents.register(PlayerChatEvent, event => {

    const player = event.getPlayer();
    const message = event.getMessage();

    // Log something to the server console
    console.log(`Player "${player.getName()}" said "${message}"`);

    // Send a response to the player who chatted
    player.sendMessage(`I see that you said "${message}"`)

});

// Listen for /title commands
ServerCommands.register('/title {message}...', (player, call) => {

    const message = call.getPlaceholder('message')!;

    player.sendTitle(message, null, 20, 20, 20);

});
