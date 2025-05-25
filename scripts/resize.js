const MODULE_ID = "resize-token-tw";

Hooks.on("renderTokenHUD", (app, html, data) => {
  // Evita adicionar o botão múltiplas vezes
  if (html.find(`.control-icon[data-action="${MODULE_ID}"]`).length > 0) return;

  // Cria o botão
  const button = $(`
    <div class="control-icon" data-action="${MODULE_ID}" title="Redimensionar Token">
      <i class="fas fa-expand-arrows-alt"></i>
    </div>
  `);

  // Adiciona ao HUD na coluna da direita
  const rightCol = html.find(".col.right");
  if (rightCol.length > 0) {
    rightCol.append(button);
  }

  // Evento de clique
  button.on("click", () => {
    showResizeDialog();
  });
});

async function showResizeDialog() {
  const transformations = {
    Tiny: { label: 'Tiny', scale: 0.25 },
    Small: { label: 'Small', scale: 0.5 },
    Medium: { label: 'Medium', scale: 1 },
    Large: { label: 'Large', scale: 2 },
    Huge: { label: 'Huge', scale: 3 }
  };

  if (canvas.tokens.controlled.length === 0) {
    ui.notifications.warn("Selecione um token primeiro.");
    return;
  }

  new Dialog({
    title: "Redimensionar Token",
    content: "<p>Escolha o tamanho do token:</p>",
    buttons: Object.fromEntries(
      Object.entries(transformations).map(([key, val]) => [
        key,
        {
          label: val.label,
          callback: () => resizeTokens(val.scale)
        }
      ])
    )
  }).render(true);
}

async function resizeTokens(scale) {
  const updates = canvas.tokens.controlled.map(token => ({
    _id: token.id,
    width: scale,
    height: scale
  }));

  await canvas.scene.updateEmbeddedDocuments("Token", updates);
}
