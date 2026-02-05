from rest_framework import serializers
from .models import *
        
class registerUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegisterUser
        fields = ['name', 'id_card', 'mail', 'userName','password']
        
    def create(self, validated_data):
        return RegisterUser.objects.create(**validated_data)
    
        
class customerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['name', 'id_card', 'mail', 'documentType']
        
    def create(self, validated_data):
        return Customer.objects.create(**validated_data)
     
class vehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = ['year', 'color', 'engine_info', 'distance', 'plate', 'model','transmition']
    def create(self, validated_data):
        return Vehicle.objects.create(**validated_data)
    
class vehicleImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleImage
        fields = ['vehicle', 'idPhoto','photoUrl']
    
    def create(self, validated_data):
        return VehicleImage.objects.create(**validated_data)
    
class spareSerializer(serializers.ModelSerializer):
    #this to use other attribute from model as foreign key
    stock = serializers.SerializerMethodField()
    categorie = serializers.SlugRelatedField(
        queryset = Categorie.objects.all(),
        slug_field="name"
    )
    
    class Meta:
        model = Spare
        fields = ['name', 'price', 'details', 'code','categorie', 'stock']
        
        
    def get_stock(self, obj):
        return getattr(obj, 'stock', 0)
        
    def create(self, validated_data):
        return Spare.objects.create(**validated_data)
    
class maintenanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maintenance
        fields = ['diagnosis', 'cost_job', 'task_status', 'date', 'type', 'idMaintenance', 'total', 'vehicle', 'payment_method']
        
    def create(self, validated_data):
        return Maintenance.objects.create(**validated_data)
    
class spareDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpareDetails
        fields = ['quantity', 'total', 'spare', 'maintenance']
        
    def create(self, validated_data):
        return SpareDetails.objects.create(**validated_data)
     
class establishmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Establishment
        fields = ['id','name','address','phone_number','economic_activity','mail', 'tax_added', 'currencyName', 'legalIdentifier', 'taxIdentifier']
        
        def create(self, validated_data):
            return Establishment.objects.create(**validated_data)
        
class categorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields = ['id','name','details','type']
        
        def create(self, validated_data):
            return Categorie.objects.create(**validated_data)
        
class providerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provider
        fields = ['code','name','country','ubication','phone_number']
        
        def create(self, validated_data):
            return Categorie.objects.create(**validated_data)
        
class arrivalSerializer(serializers.ModelSerializer):
    provider = serializers.SlugRelatedField(
        queryset = Provider.objects.all(),
        slug_field='name'
    )
    class Meta:
        model = Arrival
        fields = ['idArrival','arrivalDate','provider','description']
        
        def create(self, validated_data):
            return Arrival.objects.create(**validated_data)
        
class arrivalDetailsSerializer(serializers.ModelSerializer):
    spare = serializers.SlugRelatedField(
        queryset = Spare.objects.all(),
        slug_field='name'
    )
    class Meta:
        model = ArrivalDetails
        fields = ['spare','arrival','quantity']
        
        def create(self, validated_data):
            return ArrivalDetails.objects.create(**validated_data)

class CustomerVehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerVehicle
        fields = ['customer','vehicle']
        
        def create(self, validated_data):
            return CustomerVehicle.objects.create(**validated_data)
        