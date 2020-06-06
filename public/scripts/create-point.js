/*
A funcionalidade
querySelector()
procura elementos
ao longo da página
*/
//document.querySelector("form");

/*
A funcionalidade
addEventListener()
fica escutando/esperando
o acontecimento do primeiro argumento
transmitido. Se este acontecer, ela executa o
seu segundo argumento
*/

function populateStates() {
    // Cria uma variável para escrever no campo select
    var ufSelect = document.querySelector("select[name=uf]");
    //Envia o resultado para o primeiro then
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( res => res.json() ) //Pega o resultado, transforma-o em um Array em Json e o envia para o próximo then
        .then(
            states => { //Entra com o array states
                for(let state of states ) { //Pega cada objeto state
                    ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
                }
            }
        )
}


//Defina outra função para popular o campo das cidades
function populateCities(event) {
    //Selecionando o campo select das cidades
     const citySelect = document.querySelector("select[name=city]");
     
     //Veja que aqui faz-se a conexão com o input hidden
     const stateInput = document.querySelector("input[name=state]");
     
     //Armazena-se o valor do index do Estado selecionado através de .selectedIndex
     const indexOfSelectedState = event.target.selectedIndex;
 
     //Passa-se o valor do texto da option (o nome do Estado) para o input hidden
     stateInput.value = event.target.options[indexOfSelectedState].text; 

     //Armazene o valor (uma string) em ufValue
     const ufValue = event.target.value;
 
     //A URL dos municípios de cada Estado
     const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
     
     //Limpa o campo select para uma nova busca
     citySelect.innerHTML = "<option> Selecione a cidade </option>";
     citySelect.disabled = true;
 
 
     fetch(url) //Envia o resultado para o primeiro then
         .then( res => res.json() ) //Pega o resultado, transforma-o em um Array em Json e o envia para o próximo then
         .then(
             cities => { //Entra com o array cities
                 for(let city of cities ) { //Pega cada objeto city
                     citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
                 }
                 citySelect.disabled = false;
             }
         )
 }


//Chama a função para popular o campo dos Estados
populateStates();


//Veja que a função populateCities é escrita sem parênteses para não ser chamada automaticamente
document
  .querySelector("select[name=uf]")
  .addEventListener("change", populateCities);


//Agora trabalharemos os itens selecionados
//Array de itens selecionados (inicialmente vazio)
var selectedItems = [];

//Armazene o Input hidden em uma variável
var collectedItems = document.querySelector("input[name=items]");

//Defina uma função para lidar com o evento
function handleSelectedItem(event) {
    //Armazene o LI em uma variável
    var itemLi = event.target;
    
    //Adicione ou remova uma classe HTML/CSS (no argumento da linha abaixo) através de classList.toggle()
    itemLi.classList.toggle("selected");

    //Salve o data-id do elemento em uma variável
    var itemLiId = itemLi.dataset.id;
    
    /* 
    Veja que usando "console.log(event.target);", percebe-se
    que há o problema de que os elementos filhos
    são clicáveis. Isso pode ser facilmente corrigido no
    CSS, colocando a propriedade "pointer-eventes: none" para os
    filhos.  
    */

    /*
    Agora, desejamos  fazer com que sejam passados para o input hidden 
    os "li"s que forem selecionados. Lembre-se de que toda esta função é 
    acionada no momento em que o elemento é clicado. Vamos escrever o
    algoritmo:
    */
    // Verifique se o item está selecionado.
    /*
    A função findIndex retorna o index do primeiro elemento que satisfaz
    a função definida em seu argumento, ou seja, esta função retorna true.
    Se a função não encontrar o índice, ela retorna -1. Assim...
    */
    var alreadySelected = selectedItems.findIndex(
        //Repare que "item" é o elemento do array selectedItems
        (item) => {var itemFound = (item == itemLiId); return itemFound;}
    );

    //Se já estiver selecionado, isto é, se seu index >=0, retire-o de selectedItems
    if(alreadySelected >= 0) {
        var filteredItems = selectedItems.filter(
            (item) => {return (item != itemLiId);} //Se false, o item é retirado do array
        )
        // selectedItems é atualizado
        selectedItems = filteredItems;
    }else {
        //Adicione o elemento selecionado a selectedItems
        selectedItems.push(itemLiId);
    }
    
    //Veja que será passado um array para o value input hidden:
    collectedItems.value = selectedItems;
    console.log(selectedItems);
}


//Armazene todos os elementos li em uma variável
var itemsToCollect = document.querySelectorAll(".items-grid li");

//Adicione um ouvidor de eventos a todos estes elementos
for(let item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem);
}