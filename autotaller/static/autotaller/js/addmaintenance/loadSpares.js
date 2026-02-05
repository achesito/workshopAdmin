function getCSRFToken(){
    return document.querySelector('meta[name="csrf_token"]').getAttribute('content');
}

async function getSpares() {
    let response = await fetch('/api/spare/', {
        method : 'get',
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken()
        }
    });
    return response.json();
}

async function getCategs() {
    let response = await fetch('/api/categorie/', {
        method : 'get',
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken()
        }
    });
    return response.json();
}

function setClassName(name, action) {
    if (action === 'low line'){
        return String(name).split(" ").join("__");
    }    
    else{
        return String(name).replace("__", " ");
    }
}