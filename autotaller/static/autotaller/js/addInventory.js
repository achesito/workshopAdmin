function getCSRFToken(){
    return document.querySelector('meta[name="csrf_token"]').getAttribute('content');
}

async function addCategorie() {
    let mthd;
    let direction;
    let ident;
    const Categorie = {
        name :  String(document.getElementById('input1').value),
        type : String(document.getElementById('input2').value),
        details : String(document.getElementById('input3').value)
    };
    if (document.getElementById('model__post').classList.contains('updating') === true){
        mthd = 'PUT';
        ident = await getCategory(document.getElementById('model__post').dataset.id);
        direction = String(ident.id) + '/';
    }
    else{
        mthd = 'POST';
        direction = "";
    }
    let response = await fetch('/api/categorie/' + direction, {
        method : mthd,
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken()
        },
        body : JSON.stringify(Categorie),
    });
    return response.url;
}

async function addProvider() {
    let mthd;
    let direction;
    const provider = {
        name : String(document.getElementById('input1').value),
        country : String(document.getElementById('input2').value),
        ubication : String(document.getElementById('input3').value),
        phone_number : String(document.getElementById('input4').value)
    };
    if (document.getElementById('model__post').classList.contains('updating') === true){
        mthd = 'PUT';
        direction = String(document.getElementById('model__post').dataset.id) + '/';
    }
    else{
        mthd = 'POST';
        direction ="";
    }
    let response = await fetch('/api/provider/' + direction, {
        method : mthd,
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken()
        },
        body: JSON.stringify(provider)
    });
    return response.status;
}

async function getCategory(categorieName) {
    let response = await fetch('/api/categorie/getByName/?name=' + String(categorieName), {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken()
        }
    });
    return response.json();
}

async function getCat(code) {
    let response = await fetch('/api/spare/' + String(code),{
        method : 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken()
        }
    });
    return response.json();
}

async function ArrivalCreate(arriv) {
    let response = await fetch('/api/arrival/', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken()
        },
        body : JSON.stringify(arriv)
    });
    return response.json();
}

async function addArrivalDetails(arriv){
    let response = await fetch('/api/arrivalDetails/', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken()
        },
        body : JSON.stringify(arriv)
    });
    return response.status;
}

async function addSpare() {
    let mthd;
    let direction;
    const Spare = {
        name : String(document.getElementById('input1').value),
        //posible error
        price : parseFloat(String(document.getElementById('input3').value).slice(0,6)),
        details : String(document.getElementById('input2').value),
        categorie : String(document.getElementById('input4').value)
    };
    if (document.getElementById('model__post').classList.contains('updating') === true){
        mthd = 'PUT';
        direction = String(document.getElementById('model__post').getAttribute('data-id')) + '/';
    }
    else{
        mthd = 'POST';
        direction ="";
    }
    let part = await fetch('/api/spare/' + direction, {
        method : mthd,
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken()
        },
        body : JSON.stringify(Spare)
    });
    return part.json();
}

async function addArrival() {
    let name = document.getElementById('input1').value;
    let prov = document.getElementById('input2').value;
    let date = document.getElementById('input3').value;
    let quant = parseInt(document.getElementById('input4').value);
    let descrip = document.getElementById('input5').value;
    let arrival = {
        arrivalDate : date,
        provider : prov,
        description : descrip
    };
    let resp = await ArrivalCreate(arrival);
    let arrivalDetails = {
        spare : name,
        arrival : resp.idArrival,
        quantity : quant
    };
    let resp1 = await addArrivalDetails(arrivalDetails);
    return resp;
}

async function getArrivalDetails() {
    let resp = await fetch('/api/arrivalDetails/', {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : getCSRFToken()
        }
    });
    return resp.json();
}