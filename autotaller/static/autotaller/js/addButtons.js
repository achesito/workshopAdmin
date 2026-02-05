//establecer el flujo de elementos a mostrar por seccion
function getCSRFToken(){
    return document.querySelector('meta[name="csrf_token"]').getAttribute('content');
}

function addButtons(index, limit, lengList){
    let item = new URLSearchParams(window.location.search);
    let begin = parseInt(index) >= 5 && limit > 8 ? 3 - (8 - (parseInt(index) + 1)) : 0; 
    if (limit > lengList && document.getElementById('buttons__sec').children.length === 1){
        let plus = 0;
        if (limit % lengList != 0) plus = 1;
        let quantityButton = Math.floor(limit / lengList) > 8 ? 8 : Math.floor(limit / lengList) + plus;
        if (begin > 0 && (quantityButton + begin) <= limit) quantityButton = quantityButton + begin;
        else {
            if(begin > 0) quantityButton = limit;
            if(quantityButton >= 8) begin = quantityButton - 8;
        }
        for (let i = begin; i < quantityButton; i++){
            let buton = document.createElement('button');
            buton.textContent = String(i + 1);
            buton.classList.add('buttons__page');
            buton.classList.add('number__button');
            if (i === 0){
                buton.classList.add("active");
            }
            buton.setAttribute('data-id', String((i)));
            document.getElementById('buttons__sec').append(buton);
        }
        document.querySelectorAll('.buttons__page').forEach(e =>{
            if (String(e.dataset.id) === String(index) && e.classList.length === 2) e.style.backgroundColor = "#a64949";
        });
        document.addEventListener('click',(e)=>{
            if(e.target.matches('.number__button')){
                //desde aqui
                clean();
                if (item.toString().length === 0) item.append('start', e.target.dataset.id);
                else item.set('start', e.target.dataset.id);
                let url = `${location.pathname}?${item.toString()}`;
                history.replaceState({}, "", url);
                window.location.reload();
            }
        });
        let btn = document.createElement("button");
        btn.classList.add("arrows");
        btn.classList.add("buttons__page");
        btn.id = "next-arrow";
        btn.textContent = ">";
        btn.setAttribute("data-id", String(1));
        document.getElementById('buttons__sec').append(btn);
        document.querySelectorAll('.number__button').forEach(e =>{
            if (parseInt(e.getAttribute('data-id')) === parseInt(index)) e.style.backgroundColor = "#a64949";  
        })
        document.querySelectorAll('.arrows').forEach(e =>{
            e.style.display = 'block';
            let next = 0;
            e.addEventListener("click", (element)=>{
                let position = item.get('start') === "" || item.get('start') === null ? 0 : item.get('start');
                if (element.target.id === "next-arrow"){
                    next = parseInt(position) + 1;
                }
                else{
                    next = parseInt(position) - 1;
                }
                //se encarga de ver que no se mueva a la pagina anterior a la primera o posterior a la ultima
                if (next >= 0 && next < parseInt(document.getElementById("buttons__sec").children[(document.getElementById("buttons__sec").children.length - 2)].textContent)){
                    clean();
                    item.set('start', next);
                    let url = `${location.pathname}?${item.toString()}`;
                    history.replaceState({}, "", url);
                    window.location.reload();
                }
            });
        }); 
    }
}