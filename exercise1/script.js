let bancoDeDados = []

function salvarUsuario(event){
    event.preventDefault();
    let userForm = document.getElementById("usuario-campo").value;
    let emailForm = document.getElementById("email-campo").value;

    let dadosForm = {
        usuario: userForm,
        email: emailForm,
    }

    bancoDeDados.push(dadosForm);
    console.log(bancoDeDados);
    mostrarUsuarios();
}

function mostrarUsuarios() {
    let lista = document.getElementById("lista");
    lista.innerHTML = "";
    for (let i = 0; i < bancoDeDados.length; i++) {
    lista.innerHTML += `
      <div class="usuario">
        <span>
          ${bancoDeDados[i].usuario}
        </span>
                <span>
          ${bancoDeDados[i].email}
        </span>
        <button onclick="remover(${i})">
          Excluir
        </button>
      </div>
    `;
  }
}

function remover(posicao) {
  bancoDeDados.splice(posicao, 1);
  mostrarUsuarios();
}