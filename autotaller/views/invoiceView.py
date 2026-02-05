from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authentication import BasicAuthentication
from rest_framework.views import APIView
from django.http import HttpResponse
from django.template.loader import render_to_string
from django.utils.timezone import datetime
from xhtml2pdf import pisa

class MaintenancePdfView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        list_element = request.data
        render = 'autotaller/billPdf.html'
        print(list_element)
        print(list_element['customer']['name'])
        print(list_element['vehicle']['color'])
        print(list_element['element'][0]['name'])
        print(list_element['maintenance']['sub'])
        print(list_element['language'])
        if (str(list_element['language']) == "es"):
            render = "autotaller/spanishBill.html"
        data = {
            "establishment" : list_element['establishment'][0],
            "customer" : list_element['customer'],
            "vehicle" : list_element['vehicle'],
            "elements" : list_element['element'],
            "date" : datetime.today().strftime("%d/%m/%Y"),
            "maintenance" : list_element['maintenance']
        }
        html = render_to_string(
            render,
            context=data,
            request=request
        )
        
        response = HttpResponse(content_type="application/pdf")
        pisa.CreatePDF(html, dest=response)
        return response
        