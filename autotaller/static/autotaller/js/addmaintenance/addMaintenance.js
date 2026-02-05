function getCSRFToken(){
    return document.querySelector('meta[name="csrf_token"]').getAttribute('content');
}

async function insertMant(maintenance, method, identifier) {
    let id = "";
    if (method === 'PUT'){
        id = String(identifier) + "/";
    }
    const response = await fetch('/api/maintenance/' + id,{
        method: method,
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken()
        },
        body : JSON.stringify(maintenance),
    });
    return response.json();
    
}

async function insertDetails(details) {
    const response = await fetch('/api/spareDetails/', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken(),
        },
        body : JSON.stringify(details),
    });
    return response.status;
}