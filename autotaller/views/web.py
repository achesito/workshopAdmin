from django.shortcuts import render, redirect
from django.utils.timezone import now
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login as log, authenticate, logout


def login(request):
    if request.method == 'POST':
        userName = request.POST['userName']
        password = request.POST['password']
        user = authenticate(request, username=userName, password=password)
        if user is not None:
            log(request, user)
            next_url = request.GET.get('next') or '/checkRegistration/'  # home predeterminado
            return redirect(next_url)
        else:
            error = 'invalids credentials'
            return render(request, 'autotaller/login.html', {'error': error})
    elif str(request.user) != 'AnonymousUser':
        return redirect('/checkRegistration/')
    else:
        return render(request, 'autotaller/login.html')


def logoutView(request):
    logout(request)
    return render('autotaller/login.html')

def signUp(request):
    return render(request, 'autotaller/signup.html', {'version': now().timestamp()})

@login_required
def addMaintenance(request):
    return render(request, 'autotaller/addMaintenance.html', {'version': now().timestamp()})

@login_required
def addVehicle(request):
    return render(request, 'autotaller/addVehicle.html', {'version': now().timestamp()})

@login_required
def consult(request):
    return render(request, 'autotaller/checkRegistration.html', {'version': now().timestamp()})

@login_required
def consultFilter(request):
    total = request.GET.get('total')
    type = request.GET.get('type')
    dateFrom = request.GET.get('dateFrom')
    dateTo = request.GET.get('dateTo')
    model = request.GET.get('model')
    return render(request, 'autotaller/checkRegistration.html', {
        'total' : total,
        'type' : type,
        'dateFrom' : dateFrom,
        'dateTo' : dateTo,
        'model' : model
    })

@login_required
def consultPlateCar(request, plate):
    return render(request, 'autotaller/checkRegistration.html', {'Plate' : plate})

@login_required
def consultCar(request):
    year = request.GET.get('year')
    color = request.GET.get('color')
    transmition = request.GET.get('transmition')
    brand = request.GET.get('brand')
    model = request.GET.get('model')
    return render(request, 'autotaller/checkRegistration.html', {
        'year' : year,
        'color' : color,
        'transmition' : transmition,
        'brand' : brand,
        'model' : model
    })
    

@login_required
def consultPlateMaintenance(request, plate):
    return render(request, 'autotaller/checkRegistration.html', {'Plate' : plate})

@login_required
def maintenance_id(request, idMaintenance):
    #to get data from views
    return render(request, 'autotaller/addMaintenance.html', {'idMaintenance' : idMaintenance})

@login_required
def consultReg(request, entity):
    return render(request, 'autotaller/checkRegistration.html', {'entity' : entity})

@login_required
def consultVehicle(request, plate):
    return render(request, 'autotaller/addVehicle.html', {'Plate': plate})

@login_required
def reports(request):
    return render(request, 'autotaller/reports.html')

@login_required
def registrationDocument(request):
    return render(request, 'autotaller/registrationDocument.html')

@login_required
def agenda(request):
    return render(request, "autotaller/agenda.html")

@login_required
def updateEstablishment(request):
    return render(request, 'autotaller/updateEstablishment.html')

@login_required
def inventory(request):
    return render(request, 'autotaller/inventory.html')

@login_required
def billPdf(request):
    return render(request, 'autotaller/billPdf.html')

@login_required
def mail(request, mailCustom):
    return render(request, "autotaller/mail.html")

@login_required
def consultSpare(request):
    minPrice = request.GET.get('min')
    maxPrice = request.GET.get('max')
    typeCategorie = request.GET.get('typeCategorie')
    categorie = request.GET.get('categorie')
    return render(request, 'autotaller/inventory.html', {
        'minPrice' : minPrice,
        'maxPrice' : maxPrice,
        'typeCategorie' : typeCategorie,
        'categorie' : categorie
    })
    
@login_required
def consultArrival(request):
    minQuantity = request.GET.get('minQuantity')
    maxQuantity = request.GET.get('maxQuantity')
    spare = request.GET.get('spare')
    dateFrom = request.GET.get('dateFrom')
    dateTo = request.GET.get('dateTo')
    provider = request.GET.get('provider')
    return render(request, 'autotaller/inventory.html', {
        'minQuantity' : minQuantity,
        'maxQuantity' : maxQuantity,
        'spare' : spare,
        'dateFrom' : dateFrom,
        'dateTo' : dateTo,
        'provider' : provider
    })
    

