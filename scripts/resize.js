const MODULE_ID = "resize-token-tw";

Hooks.on("renderTokenHUD", (app, htmlElement, data) => {
  const html = $(htmlElement); // Garante compatibilidade com jQuery

  // Evita adicionar o botão múltiplas vezes
  if (html.find(`.control-icon[data-action="${MODULE_ID}"]`).length > 0) return;

  // Tooltip traduzido
  const tooltip = game.i18n.localize(`${MODULE_ID}.tooltip`);

  // Cria o botão
  const button = $(`
    <div class="control-icon" data-action="${MODULE_ID}" title="${tooltip}">
      <i class="fas fa-expand-arrows-alt"></i>
    </div>
  `);

  // Procura a coluna da direita no HUD
  const rightCol = html.find(".col.right");
  if (rightCol.length > 0) {
    rightCol.append(button);
  }

  // Ação do botão
  button.on("click", () => {
    showResizeDialog(app.object);
  });
});

function showResizeDialog(token) {
  new Dialog({
    title: game.i18n.localize(`${MODULE_ID}.dialog.title`),
    content: `
      <p>${game.i18n.localize(`${MODULE_ID}.dialog.content`)}</p>
      <div class="form-group">
        <label>${game.i18n.localize(`${MODULE_ID}.dialog.label`)}</label>
        <select id="resize-token-size">
          <option value="1">${game.i18n.localize(`${MODULE_ID}.sizes.small`)}</option>
          <option value="2">${game.i18n.localize(`${MODULE_ID}.sizes.medium`)}</option>
          <option value="3">${game.i18n.localize(`${MODULE_ID}.sizes.large`)}</option>
        </select>
      </div>
    `,
    buttons: {
      ok: {
        label: game.i18n.localize(`${MODULE_ID}.dialog.ok`),
        callback: html => {
          const size = parseInt(html.find("#resize-token-size").val());
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
