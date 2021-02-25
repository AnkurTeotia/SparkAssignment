from django.urls import path
from manager.views import DashBoard

app_name = "manager"

urlpatterns = [
    path('', DashBoard.index),
    path('login',DashBoard.login, name = 'login'),
    path('cust_details',DashBoard.cust_details, name = 'cust_details'),
    path('date_range',DashBoard.date_range, name = 'date_range'),
    path('cust_trans', DashBoard.cust_trans, name = 'cust_trans'),
    path('daterangetrans', DashBoard.daterangetrans, name = 'daterangetrans'),
    path('home', DashBoard.home, name='home'),
    path('logout',DashBoard.logout, name = 'logout')

 ]
