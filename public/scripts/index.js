//Pegue o botão e o armazene em uma variável
var buttonSearch = document.querySelector("#page-home main a");
//Faça o mesmo com a div modal
var modal = document.querySelector("#modal");
// E com o link para fechar a modal
var close = document.querySelector("#modal .header a");

//Adicione um escutador de eventos para cliques no botão
buttonSearch.addEventListener("click", () => {modal.classList.remove("hide");});
//E outro para o link de fechamento
close.addEventListener("click", () => {modal.classList.add("hide");});