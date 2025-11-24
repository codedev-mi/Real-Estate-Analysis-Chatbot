# from django.urls import path
# from .views import analyze_area

# urlpatterns = [
#     path('analyze/', analyze_area),
# ]



# from django.urls import path
# from . import views

# urlpatterns = [
#     path('analyze/', views.analyze_area),
#     path('compare/', views.compare_areas),
#     path('price-growth/', views.price_growth),
#     path('download/', views.download_filtered),
# ]


from django.urls import path
from .views import analyze_area, compare_areas

urlpatterns = [
    path("analyze/", analyze_area),
    path("compare/", compare_areas),
]
