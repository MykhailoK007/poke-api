let cardList = [];
let pokemonJsonList = [];
let url = 'https://pokeapi.co/api/v2/pokemon/?limit=12';
let typeUrl = 'http://pokeapi.co/api/v2/type/?limit=999';

getAllPokemons(url);
getListOfTypes(typeUrl);
//Gets limit pokemon list with length=12
async function getAllPokemons(otherUrl) {

    const response = await fetch(url);
    if (response.status !== 200) {
        console.log(response.status);
        return;
    }
    const data = await response.json();
    const pokemons = data.results.map((element) => ({
        name: element.name,
        url: element.url

    }));


    for (let i = 0; i < pokemons.length; i++) {
        getPersonalCard(pokemons[i].url);


    }


    document.querySelector('.loadMore').onclick = function () {
        getNextPokemonList(data)
    }
};

//This function get personal information about card
async function getPersonalCard(personalUrl) {

    let response = await fetch(personalUrl);
    if (response.status !== 200) {
        console.log(response.status);
        return;
    }
    let data = await response.json();
    createCard(data);


}

//This function create card of pokemon
function createCard(data) {
    let cardBox = document.createElement('div');
    let img = document.createElement('img');
    let name = document.createElement('p');
    let types = document.createElement('div');
    name.textContent = changeName(data.name);

    img.src = data.sprites.front_default;

    types.classList.add('types')
    cardBox.classList.add('card');

    img.classList.add('card-img')
    name.classList.add('card-p');
    getTypes(data.types, types, true);


    cardBox.append(img);
    cardBox.append(name);
    cardBox.append(types);
    document.querySelector('.leftSide').append(cardBox);


    cardBox.onclick = () => {
             createExtendCard(data);

    }
}

//This function gets next 12 pokemon cards
function getNextPokemonList(data) {
    url = data.next;
    getAllPokemons(data.next)
}

//Gets 
function getTypes(types, div, booln) {
    let string = '';
    for (let key in types) {
        let innerDiv = document.createElement('div');
        let typeName = types[key].type.name;


        innerDiv.textContent = changeName(typeName);


        innerDiv.classList.add(`type`);



        innerDiv.classList.add(`type-${typeName}`);
        div.append(innerDiv)
    }
}
//Change first letter to upperCase 
function changeName(string) {

    string = string[0].toUpperCase() + string.slice(1)
    return string;
}

function createExtendCard(data) {
    document.querySelector('.extendCard').style.display = 'block';

    let cardBox = document.querySelector('.extendCard');
    let img = document.querySelector('.card-img-extend');
    let name = document.querySelector('.card-p-extend');
    let types = document.createElement('div');


    img.src = data.sprites.front_default;
    name.innerHTML = changeName(data.name);



    fillInDataInTable(data);

}

function fillInDataInTable(data) {
    let rightSideTd = document.querySelectorAll('.right_td')

    rightSideTd.forEach((element,index) => {
        switch(index){
            case 0:
                element.innerHTML ='';
                for (let key of data.types) {
                    element.innerHTML += `${key.type.name}<br> `;
                }
                break;
            case 1:
                element.innerHTML = data.stats[4].base_stat;
                break;
            case 2:
                element.innerHTML = data.stats[3].base_stat;
                break;
            case 3:
                element.innerHTML = data.stats[5].base_stat;
                break;
            case 4:
                element.innerHTML = data.stats[2].base_stat;
                break;
            case 5:
                element.innerHTML = data.stats[1].base_stat;
                break;
            case 6:
                element.innerHTML = data.stats[0].base_stat;
                break;
            case 7:
                element.innerHTML = data.weight;
                break;
            case 8:
                element.innerHTML = data.moves.length;
                break;

        }
    })


}

async function getListOfTypes(url) {
    const response = await fetch(url);
    const data = await response.json();
    if (response.status !== 200) {
        console.error(response.status);
        return;
    }
    let typesLength = data.results.length;
    let select = document.querySelector('select');
    for (let i = 0; i < typesLength; i++) {
        let option = document.createElement('option');
        option.value = data.results[i].url;
        option.innerHTML = changeName(data.results[i].name);
        option.dataset.urls = data.results[i].url;
        select.append(option);


    }



}

document.querySelector('select').onchange = (e) => {
    getTypesbyFilter(e.target.value);
    document.querySelector('.returnMode').style.display = 'block';
    document.querySelector('.loadMore').style.display = 'none';


}
async function getTypesbyFilter(url) {
    const response = await fetch(url);
    if (response.status !== 200) {
        console.log(response.status);
        return;
    }
    const data = await response.json();
    document.querySelector('.leftSide').innerHTML = '';
    console.log(data);
    const pokemons = data.pokemon.map((element) => ({
        name: element.pokemon.name,
        url: element.pokemon.url

    }));
    for (let i = 0; i < pokemons.length; i++) {
        getPersonalCard(pokemons[i].url);


    }
}

document.querySelector('.returnMode').onclick = function () {
    document.querySelector('.leftSide').innerHTML = '';
    document.querySelector('.returnMode').style.display = 'none';
    getAllPokemons(url);
    getListOfTypes(typeUrl);
    document.querySelector('.loadMore').style.display = 'block';
};
