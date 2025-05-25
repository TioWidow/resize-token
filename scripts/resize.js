Hooks.on('ready', () => {
    console.log("Resize Token Module | Loaded");

    // Hook para mostrar botão quando um token for controlado
    Hooks.on("controlToken", (token, controlled) => {
        if (!controlled) return;
        addResizeButton(token);
    });
});

function addResizeButton(token) {
    // Evita adicionar múltiplos botões
    if (document.getElementById(`resize-btn-${token.id}`)) return;

    const button = document.createElement("div");
    button.id = `resize-btn-${token.id}`;
    button.classList.add("resize-token-btn");
    button.innerHTML = "📏";
    button.style.position = "absolute";
    button.style.left = `${token.center.x + 20}px`;
    button.style.top = `${token.center.y - 40}px`;
    button.style.zIndex = 100;
    button.style.fontSize = "20px";
    button.style.cursor = "pointer";
    button.style.background = "rgba(0,0,0,0.7)";
    button.style.color = "white";
    button.style.padding = "2px 6px";
    button.style.borderRadius = "4px";

    button.addEventListener("click", () => showResizeDialog(token));
    document.body.appendChild(button);

    // Remove botão ao desmarcar o token
    Hooks.once("controlToken", (token, controlled) => {
        if (!controlled) {
            button.remove();
        }
    });
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
