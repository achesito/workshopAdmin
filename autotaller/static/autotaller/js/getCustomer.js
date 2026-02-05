function getCSRFToken(){
    return document.querySelector('meta[name="csrf_token"]').getAttribute('content');
}

async function getCustomerPlate(plate) {
    const response = await fetch('/api/customer/' + String(plate),{
        method : 'GET',
        headers:{
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken()
        }
    });
    return response.json();
}