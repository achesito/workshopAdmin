function getCSRFToken(){
    return document.querySelector('meta[name="csrf_token"]').getAttribute('content');
}

async function custVehicle(plate) {
    let response = await fetch('/api/customerVehicle/?vehicle=' + String(plate), {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken()
        }
    });
    return response.json();
}