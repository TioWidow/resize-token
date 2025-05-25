const MODULE_ID = "resize-token-tw";

const SIZES = [
  { id: "tiny", labelKey: `${MODULE_ID}.sizes.tiny`, scale: 0.25 },
  { id: "small", labelKey: `${MODULE_ID}.sizes.small`, scale: 0.5 },
  { id: "medium", labelKey: `${MODULE_ID}.sizes.medium`, scale: 1 },
  { id: "large", labelKey: `${MODULE_ID}.sizes.large`, scale: 2 },
  { id: "huge", labelKey: `${MODULE_ID}.sizes.huge`, scale: 3 }
];

Hooks.on("renderTokenHUD", (app, htmlElement, data) => {
  const html = $(htmlElement);

  if (html.find(`.control-icon[data-action="${MODULE_ID}"]`).length > 0) return;

  const tooltip = game.i18n.localize(`${MODULE_ID}.tooltip`);

  const button = $(`
    <div class="control-icon" data-action="${MODULE_ID}" title="${tooltip}">
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
    title: game.i18n.localize(`${MODULE_ID}.dialog.title`),
    content: `
      <p>${game.i18n.localize(`${MODULE_ID}.dialog.content`)}</p>
      <div class="form-group">
        <label>${game.i18n.localize(`${MODULE_ID}.dialog.label`)}</label>
        <select id="resize-token-size">${options}</select>
      </div>
    `,
    buttons: {
      ok: {
        label: game.i18n.localize(`${MODULE_ID}.dialog.ok`),
        callback: html => {
          const selectedId = html.find("#resize-token-size").val();
          const selectedSize = SIZES.find(s => s.id === selectedId);
          if (!selectedSize) return;

          // Ajusta tamanho baseado na escala
          // Supondo que 1 é width/height padrão = 1x1 grid unit
          const size = selectedSize.scale;
          token.document.update({ width: size, height: size });
        }
      },
      cancel: {
        label: game.i18n.localize(`${MODULE_ID}.dialog.cancel`)
      }
    },
    default: "ok"
  }).render(true);
}
