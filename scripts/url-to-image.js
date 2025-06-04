Hooks.once("ready", () => {
  console.log("✅ [URL-to-Image] Script iniciado");

  Hooks.on("chatMessage", (chatLog, message, chatData) => {
    const user = game.users.get(chatData.user);

    const featureEnabled = game.settings.get(globalThis.MODULE_ID, "enableUrlToImage");
    const allowPlayers = game.settings.get(globalThis.MODULE_ID, "allowUrlImageForPlayers");
    const isGM = user?.isGM;

    if (!featureEnabled) return;
    if (!allowPlayers && !isGM) return;

    const imageUrlPattern = /(https?:\/\/[^\s]+\.(?:png|jpe?g|gif|webp|bmp))/gi;

    if (!imageUrlPattern.test(message)) return;

    const replaced = message.replace(imageUrlPattern, (url) => {
      return `<img src="${url}" style="max-width:300px; border:1px solid #333; border-radius:4px;">`;
    });

    if (replaced !== message) {
      ChatMessage.create({
        user: chatData.user,
        content: replaced,
        whisper: chatData.whisper,
        blind: chatData.blind,
        speaker: chatData.speaker
      });
      return false; // Cancela o envio original
    }
  });
});
