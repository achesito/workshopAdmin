from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views.web import *
from .views.invoiceView import MaintenancePdfView
from rest_framework.routers import DefaultRouter
from .views.api.customerViewSet import CustomerViewSet
from .views.api.maintenanceViewSet import MaintenanceViewSet
from .views.api.spareDetailsViewSet import SpareDetailsViewSet
from .views.api.spareViewSet import SpareViewSet
from .views.api.userViewSet import UserViewSet
from .views.api.vehicleImageViewSet import VehicleImageViewSet
from .views.api.vehicleViewSet import VehicleViewSet
from .views.api.establismentViewSet import EstablishmentViewSet
from .views.api.categorieViewSet import CategorieViewSet
from .views.api.providerViewSet import providerViewSet
from .views.api.arrivalViewSet import ArrivalViewSet
from .views.api.arrivalDetailsViewSet import ArrivalDetailsViewSet
from .views.api.customerVehicleViewSet import CustomerVehicleViewSet

router = DefaultRouter()
#the actual feature that creates and sets the route of the api it's the r'something' sintaxis, like: /api/something/
router.register(r'user', UserViewSet, basename="user")
router.register(r'customer', CustomerViewSet, basename="client")
router.register(r'vehicle', VehicleViewSet, basename="vehicle")
router.register(r'vehicleImage', VehicleImageViewSet, basename="image")
router.register(r'spare', SpareViewSet, basename="spare")
router.register(r'spareDetails', SpareDetailsViewSet, basename="spareDetail")
router.register(r'maintenance', MaintenanceViewSet, basename="maintenance")
spare_details = SpareDetailsViewSet.as_view({
    'put' : 'update',
    'delete' : 'destroy'
})
router.register(r'establishment', EstablishmentViewSet,basename="establishment")
router.register(r'categorie', CategorieViewSet, basename="categorie")
router.register(r'provider', providerViewSet, basename="provider")
router.register(r'arrival', ArrivalViewSet, basename="arrival")
router.register(r'arrivalDetails', ArrivalDetailsViewSet, basename="arrivalDetail")
router.register(r'customerVehicle', CustomerVehicleViewSet, basename="customerVehicle")

urlpatterns = [
    path('',login, name='login'),
    path('signUp/', signUp, name='signUp'),
    path('login/signUp/',signUp, name='signUp'),
    path('addMaintenance/', addMaintenance, name='agregar maintenance'),
    path('api/',include(router.urls)),
    path('addVehicle/', addVehicle, name='agregar vehicle y cliente'),
    path('checkRegistration/', consult, name='consultar registro de vehicle y maintenance'),
    path('checkRegistration/2/<str:plate>/', consultPlateCar, name='consultar vehicle'),
    path('checkRegistration/1/<str:plate>/', consultPlateMaintenance, name='consultar maintenance'),
    path('checkRegistration/filter/', consultFilter, name="query filters"),
    path('checkRegistration/vehicleFilter/', consultCar, name="filter for vehicle"),
    #para poder enviar datos entre vistas
    path('maintenance/<int:idMaintenance>/', maintenance_id, name="agregar desde Id"),
    path('api/<str:plate>/', addVehicle, name="agregar desde plate"),
    path('checkRegistration/<int:entity>/', consultReg, name='consultar registro y clasificar'),
    path('vehicle/<str:plate>/', consultVehicle, name="consultar por plate"),
    path('api/<int:maintenance>/<str:spare>/', spare_details),
    path('reports/', reports, name='reportes'),
    path('registrationDocument/', registrationDocument, name='hoja de registro'),
    path('agenda/', agenda, name='agenda'),
    path('updateEstablishment/', updateEstablishment, name='establishment'),
    path('inventory/', inventory, name='inventory'),
    path('billPdf/', MaintenancePdfView.as_view()),
    path('sendMail/<str:mailCustom>/', mail, name='send'),
    path('inventory/spareFilter/', consultSpare, name='spare filter'),
    path('inventory/arrivalFilter/', consultArrival, name="consultArrival"),
    path('logout/', logoutView, name="session out")
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)