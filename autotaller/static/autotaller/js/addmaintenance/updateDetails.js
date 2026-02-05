function getCSRFToken(){
    return document.querySelector('meta[name="csrf_token"]').getAttribute('content');
}

async function updateDetails(details, id, code) {
    const response = await fetch('/api/' + id + "/" + code + "/", {
        method : 'PUT',
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken(),
        },
        body : JSON.stringify(details),
    });
    return response.status;
}