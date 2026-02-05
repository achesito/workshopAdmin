function getCSRFToken(){
    return document.querySelector('meta[name="csrf_token"]').getAttribute('content');
}

async function add(url, user) {
    const response = await fetch(url, {
        method : 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken(),
        },
        body: JSON.stringify(user),
    });
    if(!response.ok){
        return response.status;
    }
    else{
        return response.status;
    }
}

async function logout() {
    let resp = await fetch('/logout/',{
        method : 'POST',
        credentials : "include",
        headers : {
            'X-CSRFToken' : getCSRFToken()
        }
    });
    window.location.href = "";
    return resp.json();
}