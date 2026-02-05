function getCSRFToken(){
    return document.querySelector('meta[name="csrf_token"]').getAttribute('content');
}

async function getByCode(code){
    const response = await fetch('/api/spare/' + String(code), {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken(),
        }
    });
    return response.json();
}

async function getTypes() {
    let resp = await fetch('/api/categorie/categories/', {
        method : 'get',
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken()
        }
    });
    return resp.json();
}