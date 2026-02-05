function getCSRFToken(){
    return document.querySelector('meta[name="csrf_token"]').getAttribute('content');
}

async function nameGet(name) {
    let data = [];
    let response = await fetch('/api/spare/getByname/?name=' + String(name) , {
        method : 'GET',
        headers : {
            'Content-Type': 'application/json',
            'X-CSRFToken' : getCSRFToken()
        }
    });
    data.push(response.status);
    data.push(await response.json());
    return data;
}

async function setName(name, spare_names) {
    let data = await nameGet(name);
    if (data[0] != 200){
        spare_names.style.display = 'none';
    }
    else{
        spare_names.style.display = 'block'
        spare_names.textContent = data[1].name;
        spare_names.addEventListener('click', ()=>{
            document.getElementById('input1').value = spare_names.textContent;
            spare_names.style.display = 'none';
        });
    }
}

function manageStuff(sp_nm){
    sp_nm.addEventListener('click', ()=>{
        sp_nm.style.display = 'none';
    });
}

function setSpace(name, spare_names){
    let del = false;
        //incluir en otro segmento
    name.addEventListener('keydowm', (e)=>{
        if (e.key === 'Backspace' || e.key === 'Delete'){
            del = true;
        }
    });
    name.addEventListener('keyup', (e)=>{
        if (e.key === 'Backspace' || e.key === 'Delete'){
            del = false;
        }
    });
    name.addEventListener('input', async()=>{
        if (del === true){
            return
        }
        else{
            await setName(name.value, spare_names);
        }
    });
}