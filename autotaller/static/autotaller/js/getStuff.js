import * as MOD from './pagination.js';

function getCSRFToken(){
    return document.querySelector('meta[name="csrf_token"]').getAttribute('content');
}

async function getProviders(index) {
    let url = '/api/provider/';
    let data = MOD.pagination(index, 13, url);
    return data;
}

async function getCategories(index) {
    let url = '/api/categorie/';
    let data = await MOD.pagination(index, 13, url);
    return data;
}

async function getArrivals(index) {
    let url = '/api/arrivalDetails/getArrivals/';
    let data = await MOD.pagination(index, 13, url);
    return data;
}

async function getArrival(id) {
    let response = await fetch('/api/arrival/' + String(id) + "/", {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken()
        }
    });
    return response.json();
    
}

async function getArrivalsDetails(spare, arrival) {
    let response = await fetch('/api/arrivalDetails/?spare=' + String(spare) + '/?arrival=' + String(arrival) + '/', {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken()
        }
    });
    return response.json();
}

async function getByIdArrival(id) {
    let response = await fetch('/api/arrivalDetails/getById/?arrival=' + String(id), {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken()
        }
    });
    return response.json();
}

async function getProviderByCode(code) {
    let response = await fetch('/api/provider/' + String(code) + '/',{
        method : 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'X-CSRFToke' : getCSRFToken()
        }
    });
    return response.json();
}

/*async function getTypes() {
    let p = [];
    let resp = await fetch('/api/categorie/categories/', {
        method : 'get',
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken()
        }
    });
    return resp.json();
}*/

async function editFilters(model){
    if (model === "spares" || model === "Repuestos"){
        let resp = await getTypes();
        for (let i = 0; i < resp.length; i++){
            let opt = document.createElement('option');
            opt.textContent = resp[i][0];
            opt.value = resp[i][0];
            opt.setAttribute('data-id', resp[i][1].join('-'));
            document.getElementById('select-typeCategorie').append(opt);
        }
    }
}

async function spareFilters(index) {
    let data = new URLSearchParams(window.location.search);
    let data2 = Object.fromEntries(data.entries());
    let struct = "?typeCategorie=" + String(data2.typeCategorie) + "&minPrice=" + String(data2.minPrice) + "&maxPrice=" + String(data2.maxPrice) + "&categorie=" + String(data2.categorie);
    let url = '/api/spare/spareFilter/' + struct;
    let elements = await MOD.pagination(index, 13, url);
    return elements;
}

async function arrivalFilters(index) {
    let data = new URLSearchParams(window.location.search);
    let data2 = Object.fromEntries(data.entries());
    let struct = "?minQuantity=" + String(data2.minQuantity) + "&maxQuantity=" + String(data2.maxQuantity) + "&spare=" + String(data2.spare) + "&dateFrom=" + String(data2.dateFrom) + "&dateTo=" + String(data2.dateTo)
    + "&provider=" + String(data2.provider);
    let url = '/api/arrivalDetails/arrivalFilter/' + struct;
    let elements = await MOD.pagination(index, 13, url);
    return elements;
}

async function getAll(selected, index){
    let resp;
    let num = 0;
    let pam = window.location.pathname.split('/');
    document.getElementById('model__select').value = String(selected);
    if (selected === 'spares' || selected === 'Repuestos'){
        document.getElementById('model__select').setAttribute('data-id', "spares");
        removeTable();
        let indexes = [];
        for (let i = 0; i < 7; i++){
            let div = document.createElement('div');
            div.className = 'element__add';
            indexes.push(div);
        }
        let dv = document.createElement('div');
        dv.className = 'element__grid';
        dv.id = 'element__grid';
        document.getElementById('element__container').appendChild(dv);
        indexes[0].textContent = "name";
        indexes[1].textContent = "price";
        indexes[2].textContent = "details";
        indexes[3].textContent = "stock";
        indexes[4].textContent = "categorie";
        indexes[5].textContent = "edit";
        indexes[6].textContent = "remove";
        for (let i = 0; i < 7; i++){
            indexes[i].classList.add("attribute__title");
            document.getElementById('element__grid').appendChild(indexes[i]);
        }
        if (pam[2] === "spareFilter") resp = await spareFilters(index);
        else resp = await spares(index);
        num = resp.total;
        if (resp.items.length > 0){
            //desde aqui 
            document.getElementById('title1').style.display = 'none';
            for (let i = 0; i < resp.items.length; i++){
                let buttons = [];
                let n = 0;
                let m = 0;
                let data = [];
                let row = document.createElement('div');
                row.className = 'element__grid';
                for (let j = 0; j < 7; j++){
                    let rowElement = document.createElement('div');
                    rowElement.className = 'element__add';
                    data.push(rowElement);
                }
                let button = document.createElement('button');
                let button2 = document.createElement('button');
                for (let j in resp.items[i]){
                    if (String().length > 16 && String(j) != "code"){
                        let btn = document.createElement('button');
                        btn.className = 'button__element';
                        //posible que se haga cambio
                        btn.setAttribute("data-id", resp.items[i][j]);
                        //sin la clase no puede coincidir el atributo que tiene un valor con muchos
                        btn.classList.add(String(j));
                        btn.textContent = 'details';
                        document.querySelector('.description__area').textContent = '';
                        document.querySelector('.description__area').textContent = String(resp.items[i][j]);
                            buttons.push(btn);
                        } 
                    }
                    for (let j in resp.items[i]){
                        if (buttons.length > 0 && buttons[n].classList[1] === j && String(j) != "code"){
                            data[m].appendChild(buttons[n]);
                            //si no no se puede iterar buttons
                            if (buttons.length > (n + 1)) n += 1;
                        }
                        else{
                            if (String(j) === "code"){
                                data[m].textContent = resp.items[i]["stock"];
                            }
                            else{
                                if (String(j) != "stock")data[m].textContent = resp.items[i][j];
                            }
                        }
                        m += 1;
                    }
                    button.classList.add('edit__button');
                    button.classList.add('button__element');
                    button2.classList.add('remove__button');
                    button2.classList.add('button__element');
                    button2.setAttribute('data-id', String(resp.items[i].code));
                    button2.textContent = "remove";
                    button.textContent = "edit";
                    data[5].appendChild(button);
                    data[6].appendChild(button2);
                    for (let j = 0; j < 7; j++){
                        row.appendChild(data[j]);
                    }
                    document.getElementById("element__container").appendChild(row);
                }    
            }
            else{
                document.getElementById('element__container').children[0].remove();
                document.getElementById('title1').style.display = 'block';
            }
        }
    else if (selected === 'providers' || selected === 'Proveedores'){
        document.getElementById('model__select').setAttribute('data-id', "providers");
        removeTable();
        let indexes = [];
        for (let i = 0; i < 6; i++){
            let div = document.createElement('div');
            div.className = 'element__add';
            indexes.push(div);
        }
        let dv = document.createElement('div');
        dv.className = 'element__grid';
        dv.id = 'element__grid';
        document.getElementById('element__container').appendChild(dv);
        indexes[0].textContent = "name";
        indexes[1].textContent = "country";
        indexes[2].textContent = "ubication";
        indexes[3].textContent = "phone number";
        indexes[4].textContent = "edit";
        indexes[5].textContent = "remove";
        document.getElementById('element__grid').style.gridTemplateColumns = 'repeat(6, 1fr)';
        for (let j = 0; j < 6; j++){
            indexes[j].classList.add("attribute__title");
            document.getElementById('element__grid').appendChild(indexes[j]);
        }
        resp = await getProviders(index);
        let num = resp.total;
        if (resp.items.length > 0){
            document.getElementById('title1').style.display = 'none';
            for (let i = 0; i < resp.items.length; i++){
                let data = [];
                let buttons = [];
                let n = 0;
                let m = 0;
                let row = document.createElement('div');
                row.className = 'element__grid';
                row.style.gridTemplateColumns = 'repeat(6, 1fr)';
                for (let j = 0; j < 6; j++){
                    let rowElement = document.createElement('div');
                    rowElement.className = 'element__add';
                    data.push(rowElement);
                }
                let button1 = document.createElement('button');
                let button2 = document.createElement('button');
                button2.setAttribute('data-id', String(resp.items[i].code));
                button1.classList.add('edit__button');
                button1.classList.add('button__element');
                button2.classList.add('remove__button');
                button2.classList.add('button__element');
                button1.textContent = 'edit';
                button2.textContent = 'remove';
                for (let j in resp.items[i]){
                    if (String(resp.items[i][j]).length > 16 && String(j) != "code"){
                        let btn = document.createElement('button');
                        btn.className = 'button__element';
                        //posible que se haga cambio
                        btn.classList.add(String(j));
                        btn.setAttribute("data-id", resp.items[i][j]);
                        btn.classList.add(String(j));
                        btn.textContent = 'details';
                        document.querySelector('.description__area').textContent = '';
                        document.querySelector('.description__area').textContent = String(resp.items[i][j]);
                        buttons.push(btn);
                    } 
                }
                for (let j in resp.items[i]){
                    if (String(j) != "code"){
                        if (buttons.length > 0 && buttons[n].classList[1] === j){
                            data[m].appendChild(buttons[n]);
                            //si no no se puede iterar buttons
                            if (buttons.length > (n + 1)) n += 1;
                        }
                        else{
                            data[m].textContent = resp.items[i][j];
                            /*else{
                                if (String(j) != "stock") data[m].textContent = resp.items[i][j];
                                }*/
                        }
                        m += 1;
                    }
                }
                data[4].appendChild(button1);
                data[5].appendChild(button2);
                //completar con los demas campos
                for (let j = 0; j < 6; j++){
                    row.appendChild(data[j]);
                }
                document.getElementById('element__container').appendChild(row);
            }
        }
        else{
            document.getElementById('element__container').children[0].remove();
            //cambia y muestra el mensaje en lugar de la tabla
            document.getElementById('title1').style.display = 'block';
        }
    }
    else if (selected === 'categories' || selected === 'Categorías'){
        document.getElementById('model__select').setAttribute('data-id', "categories");
        removeTable();
        resp = await getCategories(index);
        let num = resp.total;
        if (resp.items.length === 0){
            document.getElementById('element__container').children[0].remove();
        }
        else{
            document.getElementById('title1').style.display = 'none';
            let indexes = [];
            let row = document.createElement('div');
            row.className = 'element__grid';
            row.id = 'element__grid';
            row.style.gridTemplateColumns = 'repeat(5,1fr)';
            for (let i = 0; i < 5; i++){
                let field = document.createElement('div');
                field.className = 'element__add';
                indexes.push(field);
            }
            indexes[0].textContent = 'name';
            indexes[1].textContent = 'details';
            indexes[2].textContent = 'type';
            indexes[3].textContent = 'edit';
            indexes[4].textContent = 'remove';
            for (let i = 0; i < 5; i++){
                indexes[i].classList.add('attribute__title');
                row.appendChild(indexes[i]);
            }
            document.getElementById('element__container').appendChild(row);
            let limit = num;
            for (let i = 0; i < resp.items.length; i++){
                let buttons = [];
                let n = 0;
                let m = 0;
                let row = document.createElement('div');
                row.className = 'element__grid';
                row.style.gridTemplateColumns = 'repeat(5, 1fr)';
                let data = [];
                for (let j = 0; j < 5; j++){
                    let field = document.createElement('div');
                    field.className = 'element__add';
                    data.push(field);
                }
                let button1 = document.createElement('button');
                let button2 = document.createElement('button');
                button2.setAttribute('data-id', String(resp.items[i].id));
                button1.classList.add('edit__button');
                button1.classList.add('button__element');
                button2.classList.add('remove__button');
                button2.classList.add('button__element');
                button1.textContent = 'edit';
                button2.textContent = 'remove';
                for (let j in resp.items[i]){
                    if (String(resp.items[i][j]).length > 30 && j != 'id'){
                        let btn = document.createElement('button');
                        btn.className = 'button__element';
                        //posible que se haga cambio
                        btn.classList.add(String(j));
                        btn.setAttribute("data-id", resp.items[i][j]);
                        btn.classList.add(String(j));
                        btn.textContent = 'details';
                        document.querySelector('.description__area').textContent = '';
                        document.querySelector('.description__area').textContent = String(resp.items[i][j]);
                        buttons.push(btn);
                    } 
                }
                for (let j in resp.items[i]){
                    if (j != 'id'){
                        if (buttons.length > 0 && buttons[n].classList[1] === j){
                            data[m].appendChild(buttons[n])
                            //si no no se puede iterar buttons
                            // if (buttons.length > (n + 1)) n += 1;
                        }
                        else{
                            data[m].textContent = resp.items[i][j];
                        }
                        m += 1;
                    }
                }
                data[3].appendChild(button1);
                data[4].appendChild(button2);
                for (let j = 0; j < 5; j++){
                    row.appendChild(data[j]);
                }
                document.getElementById('element__container').appendChild(row);
            }
        }
    }
    else{
        if (selected === 'arrivals' || selected === 'Llegadas'){
            removeTable();
            let pam = window.location.pathname.split('/');
            if (pam[2] === "arrivalFilter"){
                resp = await arrivalFilters(index);
            }
            else{
                resp = await getArrivals(index);
            }
            let num = resp.total;
            if (num === 0){
                document.getElementById('title1').style.display = 'block';
            }
            else{
                document.getElementById('title1').style.display = 'none';
                let head = document.createElement('div');
                head.className = 'element__grid';
                head.style.gridTemplateColumns = 'repeat(5, 1fr)';
                let heads = [];
                for (let i = 0; i < 5; i++){
                    let title = document.createElement('div');
                    title.className = 'element__add';
                    heads.push(title);
                }
                heads[0].textContent = 'spare';
                heads[1].textContent = 'arrival date';
                heads[2].textContent = 'provider';
                heads[3].textContent = 'description';
                heads[4].textContent = 'quantity';
                for (let i = 0; i < heads.length; i++){
                    heads[i].classList.add("attribute__title");
                    head.appendChild(heads[i]);
                }
                let limit = num;
                document.getElementById('element__container').appendChild(head);
                for (let i = 0; i < resp.items.length; i++){
                    let row = document.createElement('div');
                    let fields = [];
                    let elements = [];
                    row.className = 'element__grid'
                    //realizar cambios
                    row.style.gridTemplateColumns = 'repeat(5, 1fr)';
                    for (let j = 0; j < 5; j++){
                        let data = document.createElement('div');
                        data.className = 'element__add';
                        fields.push(data);
                    }
                    for (let j = 0; j < 5; j++){
                        if (j === 0 || j === 4){
                            if (j === 0){
                                elements.push(resp.items[i]['spare_name']);
                            }
                            else{
                                elements.push(resp.items[i]['quantity']);
                            }
                        }
                        else{
                            if (resp.items[i][Object.keys(resp.items[i])[j]] === ""){
                                elements.push("None");
                            }
                            else{
                                elements.push(resp.items[i][Object.keys(resp.items[i])[j]]);
                            }
                        }
                    }
                    for (let j in elements){
                        if (String(elements[j]).length > 30){
                            let btn = document.createElement('button');
                            btn.className = 'button__element';
                            //posible que se haga cambio
                            btn.textContent = 'details';
                            btn.setAttribute("data-id", resp.items[i][j]);
                            btn.classList.add(String(j));
                            document.querySelector('.description__area').textContent = '';
                            document.querySelector('.description__area').textContent = String(resp.items[i][j]);
                            row.appendChild(btn);
                        }
                        else{
                            let div = document.createElement('div');
                            div.className = 'element__add';
                            div.textContent = elements[j];
                            row.appendChild(div);
                        }
                    }
                    document.getElementById('element__container').appendChild(row);
                }
            }
        }
    }
    addButtons(index, resp.total, 13);
}
let data = new URLSearchParams(window.location.search);
let indx = data.get('start') === "" || data.get('start') == null ? 0 : data.get('start');
let entity = data.get('entity') === undefined || data.get('entity') === null ? "spares" : data.get('entity');
document.addEventListener('DOMContentLoaded', getAll(entity, indx));

window.getAll = getAll;
window.editFilters = editFilters;
window.getArrivals = getArrivals;
window.editFilters = editFilters;
window.arrivalFilters = arrivalFilters;
window.getProviderByCode = getProviderByCode;
