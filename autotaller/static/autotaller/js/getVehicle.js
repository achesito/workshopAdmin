import * as MOD from './pagination.js';

function getCSRFToken(){
    return document.querySelector('meta[name="csrf_token"]').getAttribute('content');
}

async function getvehicle(plate) {
    const response = await fetch('/api/vehicle/' + String(plate), {
        method: 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken()
        },
    });
    return response.json();
}

async function getCarByFilters(index) {
    let data = new URLSearchParams(window.location.search);
    let elements = Object.fromEntries(data.entries());
    let struct = "?transmition=" + String(elements.transmition) + "&year=" + String(elements.year) + "&color=" + String(elements.color) + "&brand=" + String(elements.brand) + "&model=" + String(elements.model);
    let url = '/api/vehicle/vehicleFilter/' + struct;
    let data2 = await MOD.pagination(index, 18, url);
    return data2;
}

window.getCarByFilters = getCarByFilters;
window.getCSRFToken = getCSRFToken;
window.getvehicle = getvehicle;