function getCSRFToken(){
    return document.querySelector('meta[name="csrf_token"]').getAttribute('content');
}

async function notifications() {
    let response = await fetch('/api/maintenance/future/',{
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken()
        }
    });
    return response.json();
}