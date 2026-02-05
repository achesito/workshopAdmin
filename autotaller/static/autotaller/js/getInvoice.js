function getCSRFToken(){
    return document.querySelector('meta[name="csrf_token"]').getAttribute('content');
}

async function renderInvoice() {
    let response = await fetch('/api/maintenance/document/', {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/pdf',
            'X-CSRFToken' : getCSRFToken()
        }
    })
    return response;
}