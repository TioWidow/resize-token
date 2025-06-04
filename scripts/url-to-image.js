
Hooks.once("init", () => {
 game.settings.register("resize-token-tw", "allowImageURLForPlayers", {
  name: "resize-token-tw.settings.allowImageURLForPlayers.name",
  hint: "resize-token-tw.settings.allowImageURLForPlayers.hint",
  scope: "world",
  config: true,
  type: Boolean,
  default: true
});
});

console.log("✅ [URL-to-Image] Script iniciado");

Hooks.on("chatMessage", (chatLog, message, chatData) => {
  const user = game.users.get(chatData.user);

  // Verifica permissão nas configurações
  const allowPlayers = game.settings.get("resize-token-tw", "allowImageURLForPlayers");
  const isGM = user?.isGM;

  if (!allowPlayers && !isGM) return; // Bloqueia se for jogador e não for permitido

  // Regex para identificar URLs de imagem
  const imageUrlPattern = /(https?:\/\/[^\s]+\.(?:png|jpe?g|gif|webp|bmp))/gi;
 
  const replaced = message.replace(imageUrlPattern, (url) => {
    console.log("✅ [URL-to-Image] URL de imagem foi convertida para HTML");
    return `<img src="${url}" style="max-width:300px; border:1px solid #333; border-radius:4px;">`;
  });

  // Se houve substituição, envia o HTML
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
