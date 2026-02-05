function getCSRFToken(){
    return document.querySelector('meta[name="csrf_token"]').getAttribute('content');
}

async function existCustomer(id) {
    let respon = await fetch('/api/customer/' + String(id), {
        method : 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken()
        }
    });
    return respon.status;
}

async function existVehicle(plate) {
    let response = await fetch('/api/vehicle/',{
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken()
        }
    });
    return response.json();
}

async function addCustomer(customer, identifier) {
    let result = await existCustomer(identifier);
    let id = '';
    let metho = 'POST';
    if (result === 200){
        metho = 'PUT';
        id = String(identifier) + "/";
    }
    const response = await fetch('/api/customer/' + String(id),{
        method : metho,
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken(),
        },
        body : JSON.stringify(customer),
    });
    return response.status;
}

async function addVehicle(vehicle,metho,identifier) {
    let id = "";
    if (metho === 'PUT'){
        id = String(identifier) + '/';
    }
    const response = await fetch('/api/vehicle/' + String(id),{
        method : metho,
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken(),
        },
        body : JSON.stringify(vehicle),
    });
    return response.status;
}

async function addImg(img, method) {
    await fetch('/api/vehicleImage/', {
        method : method,
        headers:{
            'X-CSRFToken' : getCSRFToken(),
        },
        body : img,
    }).then(response => {
        console.log(img);
        console.log(response.status);
        console.log(img.photoUrl);
        return;
    }).then(console.log("succes")).
    catch(error => console.log("error from ",error.message));
}

async function addCustVehicle(details) {
    let response = await fetch('/api/customerVehicle/', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken()
        },
        body : JSON.stringify(details)
    });
    return response.status;
}

async function dateOrder(plate) {
    let response = await fetch('/api/customerVehicle/order/?vehicle=' + String(plate), {
        method : 'get',
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken()
        }
    });
    return response.json();
}
