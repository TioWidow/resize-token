const MODULE_ID = "resize-token-tw";

Hooks.on("renderTokenHUD", (app, htmlElement, data) => {
  const html = $(htmlElement); // Garante compatibilidade com jQuery

  // Evita adicionar o botão múltiplas vezes
  if (html.find(`.control-icon[data-action="${MODULE_ID}"]`).length > 0) return;

  // Cria o botão
  const button = $(`
    <div class="control-icon" data-action="${MODULE_ID}" title="Redimensionar Token">
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
  // Exemplo de diálogo simples com três tamanhos
  new Dialog({
    title: "Redimensionar Token",
    content: `
      <p>Escolha o tamanho do token:</p>
      <div class="form-group">
        <label>Tamanho:</label>
        <select id="resize-token-size">
          <option value="1">Pequeno (1x1)</option>
          <option value="2">Médio (2x2)</option>
          <option value="3">Grande (3x3)</option>
        </select>
      </div>
    `,
    buttons: {
      ok: {
        label: "Aplicar",
        callback: html => {
          const size = parseInt(html.find("#resize-token-size").val());
          token.document.update({ width: size, height: size });
        }
      },
      cancel: {
        label: "Cancelar"
      }
    },
    default: "ok"
  }).render(true);
}
