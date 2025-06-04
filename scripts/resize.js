const SIZES = [
  { id: "tiny", scale: 0.25, labelKey: `${globalThis.MODULE_ID}.sizes.tiny` },
  { id: "small", scale: 0.5, labelKey: `${globalThis.MODULE_ID}.sizes.small` },
  { id: "medium", scale: 1, labelKey: `${globalThis.MODULE_ID}.sizes.medium` },
  { id: "large", scale: 2, labelKey: `${globalThis.MODULE_ID}.sizes.large` },
  { id: "huge", scale: 3, labelKey: `${globalThis.MODULE_ID}.sizes.huge` }
];

Hooks.on("renderTokenHUD", (app, htmlElement, data) => {
  const featureEnabled = game.settings.get(globalThis.MODULE_ID, "enableResizeToken");
  const allowPlayers = game.settings.get(globalThis.MODULE_ID, "allowResizeTokenForPlayers");
  const isGM = game.user.isGM;

  if (!featureEnabled) return;
  if (!allowPlayers && !isGM) return;

  const html = $(htmlElement);
  if (html.find(`.control-icon[data-action="resize-token-tw"]`).length > 0) return;

  const button = $(`
    <div class="control-icon" data-action="resize-token-tw" title="${game.i18n.localize(`${globalThis.MODULE_ID}.button.title`)}">
      <i class="fas fa-expand-arrows-alt"></i>
    </div>
  `);

  const rightCol = html.find(".col.right");
  if (rightCol.length > 0) {
    rightCol.append(button);
  }

  button.on("click", () => {
    showResizeDialog(app.object);
  });
});

function showResizeDialog(token) {
  const options = SIZES.map(size =>
    `<option value="${size.id}">${game.i18n.localize(size.labelKey)}</option>`
  ).join("");

  new Dialog({
    title: game.i18n.localize(`${globalThis.MODULE_ID}.dialog.title`),
    content: `
      <p>${game.i18n.localize(`${globalThis.MODULE_ID}.dialog.content`)}</p>
      <div class="form-group">
        <label>${game.i18n.localize(`${globalThis.MODULE_ID}.dialog.label`)}</label>
        <select id="resize-token-size">${options}</select>
      </div>
    `,
    buttons: {
      ok: {
        label: game.i18n.localize(`${globalThis.MODULE_ID}.dialog.ok`),
        callback: html => {
          const selectedId = html.find("#resize-token-size").val();
          const selectedSize = SIZES.find(s => s.id === selectedId);
          if (!selectedSize) return;

          const size = selectedSize.scale;
          token.document.update({ width: size, height: size });
        }
      },
      cancel: {
        label: game.i18n.localize(`${globalThis.MODULE_ID}.dialog.cancel`)
      }
    },
    default: "ok"
  }).render(true);
}
