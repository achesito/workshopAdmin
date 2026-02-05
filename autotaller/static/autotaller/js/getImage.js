function getCSRFToken(){
    return document.querySelector('meta[name="csrf_token"]').getAttribute('content');
}

async function getImage(plate) {
    const response = await fetch('/api/vehicleImage/image/?plate=' + String(plate), {
        method : 'GET',
        headers :{
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken()
        }
    });
    return response.json();
}

async function getImages(plate) {
    const response = await fetch('/api/vehicleImage/images/?plate=' + String(plate), {
        method : 'GET',
        headers :{
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken()
        }
    });
    return response.json();
}