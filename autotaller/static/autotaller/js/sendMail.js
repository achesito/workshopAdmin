function getCSRFToken(){
    return document.querySelector('meta[name="csrf_token"]').getAttribute('content');
}

async function sendMail(element){
    let paragraphs = String(document.getElementById('contentMail').value).split('.');
    let descript = "";
    let obj = new FormData();
    for(let i = 0; i < paragraphs.length; i++){
        descript += '<p class="emailDescription">' + paragraphs[i] + '</p>';
    }
    obj.append("customer", String(document.getElementById('customerMail').value));
    obj.append("affair", String(document.getElementById('affairMail').value));
    cont = `<style>
            .mailContainer{
                width: 60%;
                height: max-content;
                margin: auto;
            }

            .titleMail{
                text-align: left;
            }

            .emailDescription{
                padding: 7px;
                font-weight: 400;
                line-height: 1.4;
            }
        </style>
        <div class="mailContainer">
            <h1 class="titleMail">`+ String(element.name) +`</h1>`+ descript +`
        </div>`;
    obj.append("content", cont);
    obj.append("sender", String(element.mail));
    if (parseInt(document.getElementById('fileAdder').dataset.id) > 0){
        for(let i = 1; i < parseInt(document.getElementById('fileAdder').dataset.id) + 1; i++){
            obj.append("files", document.getElementById('input' + String(i)).files[0]);
        }
    }
    let resp = await fetch('/api/maintenance/mail/', {
        method : 'POST',
        headers : {
            'X-CSRFToken' : getCSRFToken()
        },
        body : obj,
    });
    return resp;
}