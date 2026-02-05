import * as MET from './pagination.js';

async function getAgenda(index) {
    let url = '/api/maintenance/agenda?';
    let data = await MET.pagination(index, 18, url);
    return data;
}

async function show(index){
    const container = document.getElementById("agenda-cards");
    let resp = await getAgenda(index);
    if (resp.items.length === 0) {
        container.innerHTML = "<p style='text-align:center;'>no scheduled maintenance.</p>";
        return;
    }
    for (let i = 0; i < resp.items.length; i++){
        let div = document.createElement("div");
        div.className = "card";
        let st0 = document.createElement("strong");
        st0.textContent = resp.items[i].date;
        let st1 = document.createElement("strong");
        st1.textContent = "Customer: " + resp.items[i].customer;
        let p1 = document.createElement("p");
        let st2 = document.createElement("strong");
        st2.textContent = "Plate: " + resp.items[i].plate;
        let p2 = document.createElement("p");
        let st3 = document.createElement("strong");
        st3.textContent = "Status: " + resp.items[i].task_status;
        let p3 = document.createElement("p");
        p1.append(st1);
        p2.append(st2);
        p3.append(st3);
        let buton = document.createElement("button");
        buton.addEventListener("click",()=>{
            checkDetail(resp.items[i].id);
        });
        buton.textContent = "check";
        div.append(st0);
        div.append(p1);
        div.append(p2);
        div.append(p3);
        div.append(buton);
        container.append(div);
    }
    addButtons(index, resp.total, 18);
}
let elements = new URLSearchParams(window.location.search);
let obj = Object.fromEntries(elements.entries());
let index = obj.start != undefined ? obj.start : 0;
document.addEventListener("DOMContentLoaded", show(index));
window.getAgenda = getAgenda;