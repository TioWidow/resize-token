console.log("✅ [TW Toolkit] Script de URL-to-Image iniciado");

const MODULE_ID = "tw-toolkit";

Hooks.on("chatMessage", (chatLog, message, chatData) => {
  const isEnabled = game.settings.get(MODULE_ID, "enableUrlToImage");
  const allowPlayers = game.settings.get(MODULE_ID, "allowUrlImageForPlayers");

  if (!isEnabled) return;
  if (!game.user.isGM && !allowPlayers) return;

  const url = extractImageUrl(message);
  if (!url) return;

  // Previne que o chat envie a mensagem padrão
  handleImageMessage(url);
  return false;
});

function extractImageUrl(message) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = message.match(urlRegex);
  if (!urls) return null;

  // Verifica apenas a primeira URL da mensagem
  return urls[0];
}

function handleImageMessage(url) {
  validateImageUrl(url).then(isValid => {
    if (isValid) {
      const html = `
        <div class="url-to-image">
          <img src="${url}" style="max-width: 100%; height: auto;">
        </div>
      `;
      ChatMessage.create({ content: html });
    } else {
      ui.notifications.warn(game.i18n.format(`${MODULE_ID}.urlToImage.invalidUrl`, { url }));
    }
  });
}

function validateImageUrl(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}
