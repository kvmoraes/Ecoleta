/*console.log("Hello")*/

function populateUF() {
    const ufSelect = document.querySelector("select[name=uf]")
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados") 
    .then( res => res.json() ) //ou: .then ( (res) => {return res.json() }), sendo a abreviação usada somente quando se tem só um valor
    .then( states => {
        
        for(state of states) {
            ufSelect.innerHTML +=`<option value="${state.id}">${state.nome}</option>`
        }

    } )
}

populateUF()

function getCities(event) {
    
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value //o "target" traz a informação de onde o evento aconteceu

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML ="<option>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url) 
    .then( res => res.json() ) 
    .then( cities => {
        
        for(const city of cities) {
            citySelect.innerHTML +=`<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    } )
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities) //nao contem "()", pois a função está sendo passada por referência (condição=mudar)

//Itens de coleta
//Pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
     //adicionar uma classe com javascript
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id
}

//verificar se existem itens selecionados
//se sim, pegar os itens selecionados
const alreadySelected = selectedItems.findIndex(item => {
    const itemFound = item == itemId //isso será false ou true
    return itemFound
})
//se já estiver selecionado, tirar da seleção
if(alreadySelected >= 0) {
    //tirar seleção
    const filteredItems = selectedItems.filter(item => {
        const itemIsDifferent = item != itemId //false
        return itemIsDifferent
    })
    selectedItems = filteredItems
} else {
//se não, adicionar à seleção
selectedItems.push(itemId)
}

//atualizar o campo escondido com os itens selecionados
collectedItems.value = selectedItems