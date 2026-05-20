async function enviarFormulario(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem").value;

    const resposta = document.getElementById("resposta");
    resposta.textContent = "Enviando...";

    try {
        const res = await fetch("/api/contato", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email, mensagem })
        });

        const json = await res.json();

        if (res.ok) {
            resposta.textContent = "Mensagem enviada com sucesso!";
            document.getElementById("form").reset();
            carregarContatos();
        } else {
            resposta.textContent = "Erro: " + (json.erro || "algo deu errado.");
        }
    } catch (err) {
        resposta.textContent = "Erro ao conectar com o servidor.";
    }
}

async function carregarContatos() {
    const lista = document.getElementById("lista");

    try {
        const res = await fetch("/api/contatos");
        const contatos = await res.json();

        lista.innerHTML = contatos.length === 0
            ? "<p style='text-align:center;color:#888'>Nenhuma mensagem ainda.</p>"
            : contatos.map(c => `
                <div class="contato-card">
                    <strong>${c.nome}</strong>
                    <span>${c.email}</span>
                    <p>${c.mensagem}</p>
                </div>
            `).join("");
    } catch (err) {
        lista.innerHTML = "<p style='color:red'>Erro ao carregar contatos.</p>";
    }
}

carregarContatos();
