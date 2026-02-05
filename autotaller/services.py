from .models import *
from django.utils.timezone import now
from django.db.models import Sum, Subquery, OuterRef, Value, F
from django.db.models.functions import Coalesce

class UserService():
    @staticmethod
    def objects():
        return RegisterUser.objects.all()
    
    @staticmethod
    def find(user):
        return RegisterUser.objects.all().filter(userName=user).first()
    
    @staticmethod
    def create(usr, nom, id, cor):
        return RegisterUser(userName=usr, name=nom, id_card=id, mail=cor)
     
class customerService():
    @staticmethod
    def objects():
        return Customer.objects.all()
    
    @staticmethod
    def find(client):
        return Customer.objects.all().filter(mail=client).first()
    
    @staticmethod
    def initials(text):
        customers = []
        cust = Customer.objects.all()
        for c in cust:
            if (str(c.id_card).startswith(str(text).lower()) or str(c.id_card).startswith(str(text).upper())):
                customers.append(c)
        return customers
    
    
class vehicleService():
    @staticmethod
    def objects():
        return Vehicle.objects.all()
    
    @staticmethod
    def firsts(initials):
        cars = Vehicle.objects.all()
        plates = []
        for c in cars:
            if (c.plate.upper().startswith(str(initials).upper()) or c.plate.lower().startswith(str(initials).lower())) and len(str(initials)) > 0:
                plates.append(c)
        return plates
    
    @staticmethod
    def plates(initials):
        cars = Vehicle.objects.all()
        plates = []
        for c in cars:
            if (c.plate.startswith(str(initials).upper()) or c.plate.startswith(str(initials).lower())):
                plates.append(c.plate)
        return plates
    
    @staticmethod
    def related(param):
        return Vehicle.objects.select_related(param)
    
    @staticmethod
    def brands():
        data = Vehicle.objects.values('model').distinct()
        elements = [n['model'].split() for n in data]
        models = [car[0] for car in elements]
        brands = list(set(models))
        return brands
            
    
class imageService():
    @staticmethod
    def objects():
        return VehicleImage.objects.all()
    
    @staticmethod
    def getVehicle(plate):
        return VehicleImage.objects.filter(vehicle=plate).first()
    
    @staticmethod
    def getVehicles(plate):
        return VehicleImage.objects.filter(vehicle=plate)
    
    
    
class spareService():
    @staticmethod
    def objects():
        spare_in = arrivalDetailsService.objects().filter(spare=OuterRef('pk')).values('spare').annotate(Sum('quantity')).values('quantity__sum')
        spare_out = spareDetailsService.objects().filter(spare=OuterRef('pk')).values('spare').annotate(Sum('quantity')).values('quantity__sum')
        query = Spare.objects.annotate(spare_in=Coalesce(Subquery(spare_in), Value(0)),
                                       spare_out=Coalesce(Subquery(spare_out), Value(0)))
        elements = query.annotate(
            stock=F('spare_in') - F('spare_out')
        )
        return elements
    
    @staticmethod
    def orderByCategorie(categ, nam=""):
        c = 0
        spares = []
        for n in spareService.objects():
            if n.categorie.name == categ and ((n.name.startswith(str(nam).upper()) or n.name.startswith(str(nam).lower()))):
                spares.append(n)
            else:
                #sets the conditions to allow include any elements, all of this are required
                if c < 15 and n.categorie.name == categ and len(nam) == 0:
                    spares.append(n)
                    c += 1
        return spares
    
        
    @staticmethod
    def firstName(nom):
        data = []
        spares = Spare.objects.all()
        for n in spares:
            if ((n.name.startswith(str(nom).upper()) or n.name.startswith(str(nom).lower())) and len(nom) > 0):
                data.append(n)
            else:
                continue
        return data[0]
    
    @staticmethod
    def getStock():
        queryArrival = """SELECT SUM(ar.quantity) AS spare_in, s.code  FROM autotaller_spare as s
        INNER JOIN autotaller_arrivaldetails as ar
        ON ar.spare_id = s.code 
        GROUP BY s.code"""
        querySpare = """SELECT SUM(sp.quantity) AS spare_out, s.code FROM autotaller_spare as s
        INNER JOIN autotaller_sparedetails as sp
        ON sp.spare_id = s.code
        GROUP BY s.code"""
        queryArr = spareService.objects().raw(queryArrival)
        querySp =spareService.objects().raw(querySpare)
        for n in queryArr:
            print(n.spare_in)
        print(querySp.columns)
        stock = int(queryArr[0].spare_in) - int(querySp[0].spare_out)
        return stock
    
class maintenanceService():
    @staticmethod
    def objects():
        return Maintenance.objects.all()
    
    @staticmethod
    def getByplate(initials):
        cars = Maintenance.objects.all()
        maints = []
        for c in cars:
            if c.vehicle.plate.upper().startswith(str(initials).upper()) or c.vehicle.plate.lower().startswith(str(initials).lower()):
                maints.append(c)
        return maints
    
    @staticmethod
    def getByVehicle(param):
        return Maintenance.objects.filter(vehicle=param)
    
    @staticmethod
    def getAgenda():
        elements = []
        agenda = maintenanceService.objects()
        for m in agenda:
            data = CustomerVehicleService.objects().filter(vehicle=m.vehicle.plate).first()
            if ((m.date - now().date()).days < 3 and (str(m.task_status) != "completed" and str(m.task_status) != "completado")):
                elements.append({
                    "id" : m.idMaintenance,
                    "task_status" : m.task_status,
                    "date": m.date,
                    "plate": m.vehicle.plate,
                    "customer": str(data.customer.name),
                })
        return elements
    
    @staticmethod
    def futureMaints():
        states = ['pending','completed','upcoming','overdue']
        estados = ['pendiente', 'completado','proximo', 'atrasado']
        totalStates = [0,0]
        agenda = maintenanceService.objects()
        for m in agenda:
            if (m.task_status in states or m.task_status in estados): 
                if ((m.task_status == 'proximo' or m.task_status == 'upcoming') and (m.date - now().date()).days < 3):
                    totalStates[0] += 1
                else:
                    if (m.task_status != 'completado' and m.task_status != 'completed') and (m.date - now().date()).days < 3:
                        totalStates[1] += 1
        return totalStates
        
    
class spareDetailsService():
    sparedetails = SpareDetails
    
    @staticmethod
    def objects():
        return SpareDetails.objects.all()
    
    @staticmethod
    def getByMaintenance(id):
        data = []
        details = SpareDetails.objects.filter(maintenance=id)
        for n in details:
            spare = str(n.spare).split(" ")[2][1:len((str(n.spare).split(" ")[2])) - 1] 
            data.append(Spare.objects.filter(code=spare).first())
        return (details, data)
    
    @staticmethod
    def getByparam(param):
        return SpareDetails.objects.filter(maintenance__in=param)
    
class establismentService():
    @staticmethod
    def objects():
        return Establishment.objects.all()
    
    
class categorieService():
    @staticmethod
    def objects():
        return Categorie.objects.all()
    
    @staticmethod
    def getByName(nam):
        return Categorie.objects.filter(name=nam).first()
    
    @staticmethod
    def getByInitials(nam):
        c = []
        for n in Categorie.objects.all():
            if n.name.startswith(str(nam).upper()) or n.name.startswith(str(nam).lower()):
                c.append(n)
        return c 
    
    @staticmethod
    def getTypes():
        types = Categorie.objects.values('type').distinct()
        data = []
        for n in types:
            text = [m['name'] for m in Categorie.objects.filter(type=n['type']).values()]
            #Categorie.objects.filter(type=n['type']).values()
            data.append([n['type'], text])
        print(len(data))
        return data
        
    
class providerService():
    @staticmethod
    def objects():
        return Provider.objects.all()
    
    @staticmethod
    def getByName(nam):
        return Provider.objects.filter(name=nam).first()
    
class arrivalService():
    @staticmethod
    def objects():
        return Arrival.objects.all()
    
    @staticmethod
    def removeArrive(elements):
        return arrivalService.objects().filter(idArrival__in=elements).delete()
    
    
class arrivalDetailsService():
    @staticmethod
    def objects():
        return ArrivalDetails.objects.all()        
    
    @staticmethod
    def getByIdArriv(id):
        return ArrivalDetails.objects.filter(arrival=id).first()
    
    @staticmethod
    def getOrder():
        query = '''select * from autotaller_arrivaldetails
        order by arrival_id
        asc'''
        models = ArrivalDetails.objects.raw(query)
        return models
    
    @staticmethod
    def removeArrive(elements):
        return arrivalService.removeArrive(elements)

class CustomerVehicleService():
    @staticmethod 
    def objects():
        return CustomerVehicle.objects.all()
    
    @staticmethod
    def orderDate(ident):
        statement = """select * from autotaller_customervehicle
        WHERE vehicle_id = %s
        ORDER BY "incomeDate", id
        DESC"""
        params = [ident]
        data = list(CustomerVehicle.objects.raw(statement, params))
        return data[0]
    
    @staticmethod
    def getCustomer(car):
        cust = CustomerVehicle.objects.all().filter(vehicle=car).first()
        data = [len(CustomerVehicle.objects.all().filter(customer=cust.customer)), CustomerVehicle.objects.all().filter(customer=cust.customer).first()]
        return data

  