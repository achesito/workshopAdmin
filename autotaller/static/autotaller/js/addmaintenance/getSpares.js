import * as MET from '../pagination.js';

function getCSRFToken(){
    return document.querySelector('meta[name="csrf_token"]').getAttribute('content');
}

async function spares(index){
    let url = '/api/spare/' ;
    let data = await MET.pagination(index, 13, url);
    return data;

}

async function searchByCategorie(categ, name) {
    //let response = await fetch('/api/arrivalDetails/?spare=' + String(spare) + '/?arrival=' + String(arrival) + '/'
    let response = await fetch('/api/spare/getByCategorie/?categorie=' + String(categ) + "&name=" + String(name), {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken()
        }
    });
    return response.json();   
}

window.spares = spares;
window.getCSRFToken = getCSRFToken;
window.searchByCategorie = searchByCategorie;