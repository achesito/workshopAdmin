function getCSRFToken(){
    return document.querySelector('meta[name="csrf_token"]').getAttribute('content');
}

async function getEstablishment(){
    let response = await fetch('/api/establishment/', {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken(),
        }
    });
    return response.json();
}

async function updateEstablishment(model, ident) {
    let response = await fetch('/api/establishment/' + String(ident) + '/', {
        method : 'PUT',
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken(),
        },
        body : JSON.stringify(model),
    });
    return response.status;
}