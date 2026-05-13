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
}