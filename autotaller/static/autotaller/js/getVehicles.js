import * as MOD from './pagination.js';

function getCSRFToken(){
    return document.querySelector('meta[name="csrf_token"]').getAttribute('content');
}

async function getVehicles(index) {
    let url = '/api/vehicle/';
    let data = await MOD.pagination(index, 18, url);
    return data;
}

async function filterBrands(start) {
    let response = await fetch('/api/vehicle/brands', {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken()
        }
    });
    return response.json();
}

async function createOptions(){
    let select1 = document.createElement('div');
    let ul = document.createElement("ul");
    ul.classList.add("options-container");
    ul.id = "options-container";
    select1.classList.add('filter-option');
    select1.id = "select-brand";
    select1.textContent = "car vehicle";
    select1.setAttribute('data-id', "any");
    let resp = await filterBrands();
    for (let i = 0; i < resp.length; i++){
        let opt = document.createElement("li");
        opt.textContent = resp[i];
        opt.value = resp[i];
        opt.classList.add('filter-option');
        ul.append(opt);
    }
    document.querySelectorAll('.box-line').item(3).children[1].append(select1);
    document.querySelectorAll('.box-line').item(3).children[1].append(ul);
}

window.getVehicles = getVehicles;
window.getCSRFToken = getCSRFToken;
window.createOptions = createOptions;