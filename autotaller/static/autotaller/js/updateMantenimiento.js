function getCSRFToken(){
    return document.querySelector('meta[name="csrf_token"]').getAttribute('content');
}

async function updateMaintenance(maintenance) {
    const response = await fetch('/api/maintenance/', {
        method : 'PUT',
        headers :{
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken()
        },
        body : JSON.stringify(maintenance)
    });
    return response.json();
}