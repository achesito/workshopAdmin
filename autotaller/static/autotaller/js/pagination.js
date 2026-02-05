function getCSRFToken(){
    return document.querySelector('meta[name="csrf_token"]').getAttribute('content');
}

export async function pagination(start, order, url){
    let data = new URLSearchParams({
        'start' : start,
        'order' : order
    });
    let dir = url.split('/')[url.split('/').length - 1].length > 0 ? url + "&"+`${data.toString()}` : url + `?${data.toString()}`;
    let resp = await fetch(dir ,{
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken()
        }
    });
    return resp.json();
}