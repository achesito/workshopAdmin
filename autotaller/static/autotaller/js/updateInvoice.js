//no olvidar parametros
function getCSRFToken(){
    return document.querySelector('meta[name="csrf_token"]').getAttribute('content');
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(
                    cookie.substring(name.length + 1)
                );
                break;
            }
        }
    }
    return cookieValue;
}

async function getEst() {
    let resp = await fetch('/api/establishment/',{
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
             'X-CSRFToken' : getCSRFToken()
        }
    });
    return resp.json();
}

async function getCustom(plate) {
    let response = await fetch('/api/customerVehicle/customer/?vehicle=' + String(plate),{
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken()
        }
    });
    return response.json();
}

async function newInvoice(data, lang){
    let total = 0;
    let elements = [];
    let path = window.location.pathname;
    let param = path.split("/")[2];
    elements.push({
        name : document.getElementById("diagnosis").textContent,
        price : parseFloat(document.getElementById("cost_job").value),
        quantity : 1,
        amount : parseFloat(document.getElementById("cost_job").value)
    });
    let subtotal = 0;
    let establish = await getEst();
    let customerVehicle = await getCustom(data);
    for (let i = 1; i < document.getElementById('spare__table').children.length; i++){
        elements.push({
            name : document.getElementById('spare__table').children[i].children[0].textContent,
            price : parseFloat(document.getElementById('spare__table').children[i].children[1].textContent),
            quantity : parseInt(document.getElementById('spare__table').children[i].children[2].children[0].value),
            amount : parseFloat(document.getElementById('spare__table').children[i].children[1].textContent) * parseInt(document.getElementById('spare__table').children[i].children[2].children[0].value)
        });
        subtotal += parseFloat(document.getElementById('spare__table').children[i].children[1].textContent) * parseInt(document.getElementById('spare__table').children[i].children[2].children[0].value);
    }
    total = subtotal + parseFloat(document.getElementById("cost_job").value);
    pseudoMaint = {
        idNumber : String(param),
        status : document.getElementById('status').textContent,
        paymentMethod : document.getElementById('payment__input').value,
        dateService : String(document.getElementById('date').value),
        sub : subtotal,
        tot : total
    };
    data = {
        establishment : establish,
        customer : customerVehicle[0],
        vehicle : customerVehicle[1],
        element : elements,
        maintenance : pseudoMaint,
        language : lang
    };
    let resp = await fetch('/billPdf/',{
        method : 'POST',
        headers : {
            'Content-Type': 'application/json',
            'X-CSRFToken' : getCookie("csrftoken")
        },
        body : JSON.stringify(data)
    }).then(res => res.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "maintenance.pdf";
        a.click();
    });
}