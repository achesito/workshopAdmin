function getCSRFToken(){
    return document.querySelector('meta[name="csrf_token"]').getAttribute('content');
}

async function Insert(url){
    const response = await fetch('/api/user/creado/?usuario=' + String(url), {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken(),
        }
    });
    return response.status;
}