//esta funcion sirve para desplegar el contenido del mantenimiento por si se entra a modificar
async function loadMaintenance(){
    let param = window.location.pathname;
    let params = param.split('/');
    //posible error
    let id = parseInt(params[2]);
    let response = await getMant(id);
    document.getElementById('diagnosis').textContent = String(response.diagnosis);
    document.getElementById('date').value = String(response.date);
    document.getElementById('vehicle__input').value = response.vehicle;
    document.getElementById('cost_job').value = String(response.cost_job);
    document.getElementById('payment__input').value = String(response.payment_method);
    document.getElementById('payment__input').setAttribute("readonly", "true");
    if(String(response.task_status) === "completed" || String(response.task_status) === "completado" || String(response.task_status) === "terminado"){
        document.getElementById('diagnosis').setAttribute('readonly', true);
        document.getElementById('status').setAttribute('readonly', true);
        document.getElementById('date').setAttribute('readonly', true);
        document.getElementById('vehicle__input').setAttribute('readonly', true);
        document.getElementById('cost_job').setAttribute('readonly', true);
    }
    for (let i = 0; i < 4; i++){
        document.getElementById('status').children[0].remove();
    }
    for(let i = 0; i < 2; i++){
        document.getElementById('type__maintenance').children[0].remove();
    }
    let option = document.createElement('option');
    let stats = document.createElement('option');
    stats.textContent = String(response.task_status);
    document.getElementById('status').append(stats);
    option.textContent = response.type;
    document.getElementById('type__maintenance').append(option);
    let resp1 = await getDetails(response.idMaintenance);
    for (let i = 0; i < resp1[0].length; i++){
        let head = document.createElement('div');
        head.classList.add('details__header');
        let sec1 = document.createElement('div');
        let sec2 = document.createElement('div');
        let sec3 = document.createElement('div');
        let quant = document.createElement('input');
        quant.type = 'number';
        quant.min = '1';
        //posible cambio
        quant.max = '20';
        quant.value = resp1[0][i].quantity;
        quant.classList.add('number__data');
        sec1.classList.add('sec__product');
        sec1.setAttribute('data-id', i.spare);
        sec2.classList.add('sec__product');
        sec3.classList.add('sec__product');
        sec3.appendChild(quant);
        //posible error 27/11/25
        sec1.textContent = resp1[1][i].name;
        sec2.textContent = resp1[1][i].price;
        head.appendChild(sec1);
        head.appendChild(sec2);
        head.appendChild(sec3);
        document.getElementById('spare__table').append(head);
        if (i === (resp1[0].length - 1)){
            document.getElementById('spare__table').classList.toggle('show');
        }
    }
    document.getElementById("get__document").style.display = "block";
}