globalThis.MODULE_ID = "tw-toolkit";

console.log("✅ [TW Toolkit] Script de configuração iniciado");
Hooks.once("init", () => {
  // 📦 Ativar Resize Token
  game.settings.register(MODULE_ID, "enableResizeToken", {
    name: `${MODULE_ID}.settings.enableResizeToken.name`,
    hint: `${MODULE_ID}.settings.enableResizeToken.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });

  // 🎮 Permitir Resize Token para jogadores
  game.settings.register(MODULE_ID, "allowResizeTokenForPlayers", {
    name: `${MODULE_ID}.settings.allowResizeTokenForPlayers.name`,
    hint: `${MODULE_ID}.settings.allowResizeTokenForPlayers.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });

  // 🖼️ Ativar URL to Image
  game.settings.register(MODULE_ID, "enableUrlToImage", {
    name: `${MODULE_ID}.settings.enableUrlToImage.name`,
    hint: `${MODULE_ID}.settings.enableUrlToImage.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });

  // 👤 Permitir URL to Image para jogadores
  game.settings.register(MODULE_ID, "allowUrlImageForPlayers", {
    name: `${MODULE_ID}.settings.allowUrlImageForPlayers.name`,
    hint: `${MODULE_ID}.settings.allowUrlImageForPlayers.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });
});
