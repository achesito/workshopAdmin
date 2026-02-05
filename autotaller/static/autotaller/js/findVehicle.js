import * as MOD from './pagination.js';

function getCSRFToken(){
    return document.querySelector('meta[name="csrf_token"]').getAttribute('content');
}

async function findMantVehicle(plate, index) {
    let url = '/api/maintenance/mantVehicle/?plate=' + String(plate);
    let data = await MOD.pagination(index, 3, url);
    return data;
}

async function findfirsts(plate, index){
    let url = '/api/vehicle/getplate/?plate=' + String(plate);
    let data = await MOD.pagination(index, 3, url);
    return data;
}

window.findfirsts = findfirsts;
window.getCSRFToken = getCSRFToken;
window.findMantVehicle = findMantVehicle;