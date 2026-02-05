//const { lazy } = require("react");

function setVehicleWindow(){
    document.getElementById('nav__grid').addEventListener('click', function(event){
        if (event.target.classList[0] === "registration__mant" || event.target.tagName === "IMG"){
            let id = event.target.classList[0] === "registration__mant" ? event.target.classList[1] : event.target.classList[0];
            window.location.href = '/vehicle/' + String(id);
        }
    });
}                
                    
async function show(index){
    let item = new URLSearchParams(window.location.search);
    let order = 0;
    let parameters = window.location.pathname;
    let param = parameters.split('/');
    let pam = param[2];
    let formFrag = document.createDocumentFragment();
    let row = document.createElement('div');
    row.id = 'vehicle__grid';
    row.classList.add('vehicle__grid');
    if (parseInt(pam) === 2 && isNaN(param[3]) === false){
        var response = await getVehicles(index);
        document.getElementById('2__vehicle').classList.add('activeModel');
        setVehicleWindow()
    }
    else if (isNaN(param[3]) === true && parseInt(pam) === 2){
        //enviando el tercer param en la url para filtrar por plate en este caso si se selecciona el boton 
        // //para vehicle
        var response = await findfirsts(String(param[3]), index);
        document.getElementById('2__vehicle').classList.add('activeModel');
        setVehicleWindow();
    }
    else if (pam === "vehicleFilter"){
        var response = await getCarByFilters(index);
        document.getElementById('2__vehicle').classList.add('activeModel');
        setVehicleWindow();
    }
    else if (window.location.pathname.split('/').length > 4 && parseInt(pam) === 1){
        var response = await findMantVehicle(String(param[3]), index);
        document.getElementById('nav__grid').addEventListener('click', function(event){
            if ((event.target.classList[0] === "registration__mant" || event.target.tagName === "IMG") && event.target.classList.length === 1){
                let id = event.target.dataset.id;
                window.location.href = '/maintenance/' + String(id);
            }
        });
    }
    else{
        if (pam === "filter" && window.location.pathname.split('/').length > 3){
            var response = await getByFilters(index);
        }
        else{
            var response = await getMaintenances(index);
        }
        document.getElementById('nav__grid').addEventListener('click', function(event){
            if (event.target.classList[0] === "registration__mant" || event.target.tagName === "IMG"){
                let id = event.target.dataset.id;
                window.location.href = '/maintenance/' + String(id);
            }
        });
        document.getElementById('1__maintenance').classList.add('activeModel');
    }
    if (response.length === 0){
        let h1 = document.createElement('h1');
        h1.textContent = "no maintenance or vehicle currently";
        document.getElementById('title__h1').append(h1);
    }
    else{
        let limit = response.total;
        //numero de datos que se quieren mostrar por cada seccion de pagina (lenglist)
        let lengList = 3;
        for (let i of response.items){
            if (order === 3){
                order = 0;
                formFrag.appendChild(row);
                row = document.createElement('div');
                row.id = 'vehicle__grid';
                row.classList.add('vehicle__grid');
            }
            var atr1 = parseInt(pam) === 2 || pam === "vehicleFilter" ? i.plate : i.vehicle;
            var atr2 = parseInt(pam) === 2 || pam === "vehicleFilter" ? i.plate : i.idMaintenance;
            var atr3 = parseInt(pam) === 2 || pam === "vehicleFilter" ? i.model : i.type;
            var atr4 = parseInt(pam) === 2 || pam === "vehicleFilter" ? i.year : i.total;
            order += 1;
            const response1 = await getImage(atr1);
            //creando elemento de la caja contenedora
            var imgSpace = document.createElement('div');
            //añadiendole clase a la caja
            imgSpace.classList.add('registration__mant');
            //guardando el id como clase para posteriores consultas
            imgSpace.setAttribute('data-id', atr2);
            let text = String(atr2).split(" ").join("_");
            imgSpace.classList.add(text);
            //creando el contenedor de la imagen
            var imgContainter = document.createElement('div');
            imgContainter.classList.add('img__container');
            imgContainter.setAttribute('data-id', atr2);
            //creando la etiqueta de la imagen
            var img = document.createElement('img');
            img.setAttribute('data-id', atr2);
            //agregando el id para como clase de img para extender la funcionalidad
            img.classList.add(text);
            //validando url de imagen desde el frontend para que sea justo la que se guarda
            let position = String(response1.photoUrl).includes('_.') == true || String(response1.photoUrl).includes('_') == false ? 
            (String(response1.photoUrl).length - 4) : String(response1.photoUrl).indexOf('_'); 
            let url = String(response1.photoUrl).slice(21, position) + String(response1.photoUrl).slice(position, String(response1.photoUrl).length);
            img.src = url;
            img.loading = "lazy";
            imgContainter.append(img);
            imgSpace.append(imgContainter);
            let nav1 = document.createElement("nav");
            let nav2 = document.createElement("nav");
            let nav3 = document.createElement("nav");
            nav3.classList.add("lastNav");
            let span = Object.assign(document.createElement('span'),{
                className : "span__maintenance",
                textContent : atr1
            });
            span.style.fontSize = "20px";
            span.style.fontWeight = "500";
            let span2 = Object.assign(document.createElement('span'),{
                className : "span__maintenance",
                textContent : atr3
            });
            nav1.append(span);
            nav2.append(span2);
            imgSpace.append(nav1);
            imgSpace.append(nav2);
            let del = document.createElement('button');
            if (pam != 2 && pam != "vehicleFilter") del.textContent= "cancel";
            else{
                del.textContent= "delete";
            }
            del.classList.add('card-button');
            del.classList.add(text);
            del.setAttribute('data-id', String(atr2));
            del.addEventListener('click', (e)=>{
                e.stopPropagation();
                document.getElementById('filters-box').style.display = "none";
                document.getElementById('confirmDelete').style.display = "block";
                document.getElementById('confirmDelete').setAttribute('data-id', (e.target.dataset.id));
                document.getElementById('layer1').style.display = "flex";
            });
            if (pam != 2 && pam != "vehicleFilter"){
                let mail = document.createElement("button");
                mail.setAttribute('data-id', String(atr1));
                mail.addEventListener('click', (e)=>{
                    e.stopPropagation();
                    window.location.href = "/sendMail/" + String(mail.dataset.id);
                });
                mail.classList.add("mail-button");
                mail.classList.add("card-button");
                mail.textContent = "send mail";
                nav3.append(mail);
            }
            nav3.append(atr4);
            nav3.append(del);
            imgSpace.append(nav3);
            row.append(imgSpace);
        }
        if (order > 0){
            formFrag.appendChild(row);
        }
        document.getElementById('nav__grid').append(formFrag);
        //pagination
        addButtons(index, limit, 18);
    }
    let ent = String(window.location.pathname.split('/')[2]) === "2" || String(window.location.pathname.split('/')[2]) === "vehicleFilter" ? "vehicles" : "maintenances";
    let startNum = data.get('start') === "" || data.get('start') == null ? 0 : data.get('start');
    let plus = parseInt(startNum) > 0 || response.items.length > 0 ? 1 : 0;
    document.getElementById('pagination-data').textContent = "Showing " + String((parseInt(startNum) * 18) + plus) +  "-" + String((parseInt(startNum) * 18) + response.items.length) + " of " + String(response.total) + " " + ent;
}

//funcion para generar los nuevos registros dependiendo el boton apretado
let data = new URLSearchParams(window.location.search);
let indx = data.get('start') === "" || data.get('start') == null ? 0 : data.get('start');
document.addEventListener('DOMContentLoaded', show(indx));
