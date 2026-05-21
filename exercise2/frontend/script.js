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
                <div class="contato-card" id="card-${c.id}">
                    <div class="card-view">
                        <div class="card-info">
                            <strong>${c.nome}</strong>
                            <span>${c.email}</span>
                            <p>${c.mensagem}</p>
                        </div>
                        <div class="card-acoes">
                            <button class="btn-editar" onclick="abrirEdicao(${c.id}, '${c.nome}', '${c.email}', \`${c.mensagem}\`)">Editar</button>
                            <button class="btn-deletar" onclick="deletarContato(${c.id}, '${c.nome}')">&#x2715;</button>
                        </div>
                    </div>
                </div>
            `).join("");
    } catch (err) {
        lista.innerHTML = "<p style='color:red'>Erro ao carregar contatos.</p>";
    }
}

async function deletarContato(id, nome) {
    if (!confirm(`Tem certeza que deseja deletar o contato de "${nome}"?`)) return;
    const res = await fetch(`/api/contato/${id}`, { method: "DELETE" });
    if (res.ok) carregarContatos();
}

function abrirEdicao(id, nome, email, mensagem) {
    const card = document.getElementById(`card-${id}`);
    card.innerHTML = `
        <div class="card-edit">
            <input id="edit-nome-${id}" value="${nome}">
            <input id="edit-email-${id}" value="${email}">
            <textarea id="edit-mensagem-${id}" rows="3">${mensagem}</textarea>
            <div class="acoes">
                <button onclick="salvarEdicao(${id}, '${nome}', '${email}', \`${mensagem}\`)">Salvar</button>
                <button class="btn-cancelar" onclick="carregarContatos()">Cancelar</button>
            </div>
        </div>
    `;
}

async function salvarEdicao(id, nomeOriginal, emailOriginal, mensagemOriginal) {
    const nome = document.getElementById(`edit-nome-${id}`).value;
    const email = document.getElementById(`edit-email-${id}`).value;
    const mensagem = document.getElementById(`edit-mensagem-${id}`).value;

    if (nome === nomeOriginal && email === emailOriginal && mensagem === mensagemOriginal) {
        carregarContatos();
        return;
    }

    const res = await fetch(`/api/contato/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, mensagem })
    });

    if (res.ok) carregarContatos();
}

carregarContatos();
