Hooks.on('ready', () => {
    console.log("Resize Token Module | Loaded");

    Hooks.on("controlToken", (token, controlled) => {
        if (controlled) {
            addResizeButtonToHUD(token);
        }
    });
});

function addResizeButtonToHUD(token) {
    const hud = token._object?.hud || token._hud || token.layer.hud;
    if (!hud) return;

    // Evita duplicar botão
    const existing = document.getElementById(`resize-btn-${token.id}`);
    if (existing) existing.remove();

    const button = document.createElement("div");
    button.id = `resize-btn-${token.id}`;
    button.innerHTML = "📏";
    button.title = "Redimensionar Token";
    button.style.position = "absolute";
    button.style.left = "0px";
    button.style.top = "-40px";
    button.style.fontSize = "20px";
    button.style.cursor = "pointer";
    button.style.background = "rgba(0,0,0,0.7)";
    button.style.color = "white";
    button.style.padding = "2px 6px";
    button.style.borderRadius = "4px";
    button.style.zIndex = 999;

    button.onclick = () => showResizeDialog(token);

    // Insere no HUD do token
    const controlIcon = hud.element.find(".control-icon")[0];
    if (controlIcon) {
        controlIcon.appendChild(button);
    }
}

function showResizeDialog(token) {
    const transformations = {
        Tiny: { label: 'Tiny', scale: 0.25 },
        Small: { label: 'Small', scale: 0.5 },
        Medium: { label: 'Medium', scale: 1 },
        Large: { label: 'Large', scale: 2 },
        Huge: { label: 'Huge', scale: 3 }
    };

    new Dialog({
        title: 'Redimensionar Token - TioWidow',
        content: `<p>Selecione o tamanho:</p>`,
        buttons: Object.entries(transformations).reduce((acc, [key, config]) => {
            acc[key] = {
                label: config.label,
                callback: async () => {
                    await canvas.scene.updateEmbeddedDocuments("Token", [{
                        _id: token.id,
                        width: config.scale,
                        height: config.scale
                    }]);
                }
            };
            return acc;
        }, {}),
        close: () => {}
    }).render(true);
}
