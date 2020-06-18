import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse

class api_news(APIView):

	def get(self,request):
		search = request.GET.get('search')
		pageNumber = request.GET.get('page')
		country = request.GET.get('country')
		source = request.GET.get('source')

		if(search):
			x=requests.get("https://newsapi.org/v2/everything?q="+search+"&apiKey=ad23c45e8dbf4c418fc72871384d9ec5")
		elif(source):
			x=requests.get("https://newsapi.org/v2/sources?apiKey=ad23c45e8dbf4c418fc72871384d9ec5&country="+source)
		elif(country):
			x=requests.get("https://newsapi.org/v2/top-headlines?country="+country+"&apiKey=ad23c45e8dbf4c418fc72871384d9ec5&page="+pageNumber+"&pageSize=11")
		else:
			x=requests.get("https://newsapi.org/v2/top-headlines?country=in&apiKey=ad23c45e8dbf4c418fc72871384d9ec5&page=1&pageSize=11")

		return HttpResponse(x)

	def post(self,request):
		pass

class authh(APIView):

	def get(self,request):
				

		return HttpResponse("""3A921B0E707B58D4B82E38A9CF5F6AB00C3FA0205FD6197160C4772397F132D3
						comodoca.com
						e4646957dc24ab8""")

	def post(self,request):
		pass