function getCSRFToken(){
    return document.querySelector('meta[name="csrf_token"]').getAttribute('content');
}

async function getMant(id) {
    const response = await fetch('/api/maintenance/' + String(id), {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken(),
        }
    });
    return response.json();
}