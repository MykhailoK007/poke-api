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
    document.querySelector('.rightSide').innerHTML = ''
    string = string[0].toUpperCase() + string.slice(1)
    return string;
}

function createExtendCard(data) {
    let cardBox = document.createElement('div');
    let img = document.createElement('img');
    let name = document.createElement('h2');
    let types = document.createElement('div');


    img.src = data.sprites.front_default;
    name.textContent = changeName(data.name);


    // cardBox.classList.add('col-7');
    cardBox.classList.add('extendCard');

    img.classList.add('card-img-extend');
    img.classList.add('col-12')
    name.classList.add('card-p');






    document.querySelector('.rightSide').append(cardBox);
    cardBox.append(img);
    cardBox.append(name);
    createTable(data, cardBox);




}

function createTable(data, div) {
    let table = document.createElement('table');
    let tr1 = document.createElement('tr');
    let tr2 = document.createElement('tr');
    let tr3 = document.createElement('tr');
    let tr4 = document.createElement('tr');
    let tr5 = document.createElement('tr');
    let tr6 = document.createElement('tr');
    let tr7 = document.createElement('tr');
    let tr8 = document.createElement('tr');
    let tr9 = document.createElement('tr');
    let td1 = document.createElement('td');
    let td1a = document.createElement('td');
    let td2 = document.createElement('td');
    let td2a = document.createElement('td');
    let td3 = document.createElement('td');
    let td3a = document.createElement('td');
    let td4 = document.createElement('td');
    let td4a = document.createElement('td');
    let td5 = document.createElement('td');
    let td5a = document.createElement('td');
    let td6 = document.createElement('td');
    let td6a = document.createElement('td');
    let td7 = document.createElement('td');
    let td7a = document.createElement('td');
    let td8 = document.createElement('td');
    let td8a = document.createElement('td');
    let td9 = document.createElement('td');
    let td9a = document.createElement('td');

    td1.textContent = 'Type';
    td2.textContent = 'Attack';
    td3.textContent = 'Defense';
    td4.textContent = 'HP';
    td5.textContent = 'SP Attack';
    td6.textContent = 'SP Defense';
    td7.textContent = 'Speed';
    td8.textContent = 'Weight';
    td9.textContent = 'Total moves';

    td2a.textContent = data.stats[4].base_stat;
    td3a.textContent = data.stats[3].base_stat;
    td4a.textContent = data.stats[5].base_stat;
    td5a.textContent = data.stats[2].base_stat;
    td6a.textContent = data.stats[1].base_stat;
    td7a.textContent = data.stats[0].base_stat;
    td8a.textContent = data.weight;
    td9a.textContent = data.moves.length;
    for (let key of data.types) {
        td1a.innerHTML += `${key.type.name}<br> `;
    }
    table.classList.add('table-bordered');
    table.classList.add('characteristic');
    div.append(table);


    table.append(tr1);
    table.append(tr2);
    table.append(tr3);
    table.append(tr4);
    table.append(tr5);
    table.append(tr6);
    table.append(tr7);
    table.append(tr8);
    table.append(tr9);


    tr1.append(td1);
    tr1.append(td1a);
    tr2.append(td2);
    tr2.append(td2a);
    tr3.append(td3);
    tr3.append(td3a);
    tr4.append(td4);
    tr4.append(td4a);
    tr5.append(td5);
    tr5.append(td5a);
    tr6.append(td6);
    tr6.append(td6a);
    tr7.append(td7);
    tr7.append(td7a);
    tr8.append(td8);
    tr8.append(td8a);
    tr9.append(td9);
    tr9.append(td9a);

}

async function getListOfTypes(url) {
    const response = await fetch(url);
    const data = await response.json();
    if (response.status !== 200) {
        console.log(response.status);
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
