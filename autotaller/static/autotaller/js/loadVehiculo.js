async function loadVehicleImage() {
    let param = window.location.pathname;
    let params = param.split('/');
    let data = params[2];
    const response = await getImages(data);
    const response1 = await getvehicle(data);
    const response2 = await dateOrder(response1.plate);
    const response3 = await getCustomerPlate(response2.customer);
    document.getElementById('licence').value = response3.documentType;
    document.getElementById('name').value = response3.name;
    document.getElementById('mail').value = response3.mail;
    document.getElementById('id_card').value = response3.id_card;
    document.getElementById('id_card').readOnly = true;
    document.getElementById('year').value = response1.year;
    document.getElementById('year').readOnly = true;
    document.getElementById('color').value = response1.color;
    document.getElementById('engine').value = response1.engine_info;
    document.getElementById('distance').value = parsed(String(response1.distance).slice(0,String(response1.distance).lastIndexOf(" ")), String(response1.distance).slice(String(response1.distance).lastIndexOf(" ") + 1));
    document.getElementById('plate').value = response1.plate;
    document.getElementById('plate').readOnly = true;
    document.getElementById('model').value = response1.model;
    document.getElementById('model').readOnly = true;
    for(let i = 0; i < 2; i++){
        document.getElementById('transmition').children[0].remove();
    }
    let option1 = document.createElement('option');
    option1.textContent = response1.transmition;
    document.getElementById('transmition').append(option1);
    for (let i in response){
        //let text = String(response[i].photoUrl).split('_').length > 1 ? String(response[i].photoUrl).split('_').slice(0, [String(response[i].photoUrl).split('_').length - 2]) : String(response[i].photoUrl);
        let text = String(response[i].photoUrl).includes('_') ? String(response[i].photoUrl).lastIndexOf('_') : String(response[i].photoUrl).lastIndexOf('.');
        url = String(response[i].photoUrl).slice(21, text) + String(response[i].photoUrl).slice((String(response[i].photoUrl).lastIndexOf('.')));
        document.getElementsByClassName('img__container')[i].children[0].src = String(response[i].photoUrl); 
    }
}

function parsed(val, unit){
    if (unit === 'km') return String(parseFloat(parseFloat(val) / 1.60934).toFixed(2));
    else return val;
}
