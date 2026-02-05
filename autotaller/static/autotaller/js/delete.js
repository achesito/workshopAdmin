function getCSRFToken(){
    return document.querySelector('meta[name="csrf_token"]').getAttribute('content');
}

async function delMaintenance(id) {
    const response = await fetch('/api/maintenance/' + String(id) + '/', {
        method: 'DELETE',
        headers : {
            'X-CSRFToken' : getCSRFToken()
        },
        credentials : "include"
    });
    return response.body;
}

async function delVehicle(id) {
    let resp1;
    let resp = await getCustomerTotal(id);
    const response = await fetch('/api/vehicle/' + String(id) + "/", {
        method: 'DELETE',
        headers : {
            'X-CSRFToken' : getCSRFToken()
        },
        credentials : "include"
    });
    if (parseInt(resp['total']) === 1){
        resp1 = await delCustomer(resp['customer'].customer);
    }
    return response.status;
}

async function getCustomerTotal(id) {
    let response = await fetch('/api/customerVehicle/totalCustomer/?vehicle=' + String(id), {
        method : 'GET',
        headers : {
            'X-CSRFToken' : getCSRFToken()
        },
        credentials : "include"
    });
    return response.json();
}

async function delCustomer(id) {
    let response = await fetch('/api/customer/' + String(id) + "/", {
        method : 'DELETE',
        headers : {
            'X-CSRFToken' : getCSRFToken()
        },
        credentials : "include"
    });
    return response.status;
}

async function removeArrive(id) {
    let response = await fetch('/api/arrivalDetails/removeArrive/?spare=' + String(id), {
        method : 'GET',
        headers : {
            'X-CSRFToken': getCSRFToken()
        }
    });
    return response.json();
}

async function delSpare(id) {
    let resp = await removeArrive(id);
    let response = await fetch('/api/spare/' + String(id) + "/", {
        method : 'DELETE',
        headers : {
            'X-CSRFToken' : getCSRFToken()
        },
        credentials : "include"
    });
    return response.status;
}

async function delCategorie(id) {
    let response = await fetch('/api/categorie/' + String(id) + "/",{
        method : 'DELETE',
        headers : {
            'X-CSRFToken' : getCSRFToken()
        },
        credentials : "include"
    });
    return response.status;
}

async function delProvider(id) {
    let response = await fetch('/api/provider/' + String(id) + "/",{
        method : 'DELETE',
        headers : {
            'X-CSRFToken' : getCSRFToken()
        },
        credentials : "include"
    });
    return response.status;
}