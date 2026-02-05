function getCSRFToken(){
    return document.querySelector('meta[name="csrf_token"]').getAttribute('content');
}

async function getListCat(params) {
    let response = await fetch('/api/categorie/getInitials/?name=' + String(params), {
        method : 'GET',
        headers : {
            'Content-type' : 'application/json',
            'X-CSRFToken' : getCSRFToken()
        }
    });
    return response.json();
}