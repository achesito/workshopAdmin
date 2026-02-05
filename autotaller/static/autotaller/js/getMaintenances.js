import * as MOD from './pagination.js';

function getCSRFToken(){
    return document.querySelector('meta[name="csrf_token"]').getAttribute('content');
}

async function getMaintenances(index) {
    let url = '/api/maintenance/';
    let data = await MOD.pagination(index, 18, url);
    return data;
}

async function getByFilters(index) {
    let data = new URLSearchParams(window.location.search);
    let data2 = Object.fromEntries(data.entries());
    let struct = "?total=" + String(data2.total) + "&type=" + String(data2.type) + "&dateFrom=" + String(data2.dateFrom) + "&dateTo=" + String(data2.dateTo) + "&model=" + String(data2.model) + "&plate=" + String(data2.plate);
    let url = '/api/maintenance/filters/' + struct;
    let elements = await MOD.pagination(index, 18, url);
    return elements;
}

window.getMaintenances = getMaintenances;
window.getCSRFToken = getCSRFToken;
window.getByFilters = getByFilters;