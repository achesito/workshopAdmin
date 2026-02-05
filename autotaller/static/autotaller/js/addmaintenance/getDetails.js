function getCSRFToken(){
    return document.querySelector('meta[name="csrf_token"]').getAttribute('content');
}

async function getDetails(maintenance) {
    const response = await fetch('/api/spareDetails/maintenance/?idMaintenance=' + String(maintenance), {
        method : 'GET',
        headers :{
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken()
        }
    });
    return response.json();
}