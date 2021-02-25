from django.db import models


class Manager(models.Model):
    email = models.CharField(max_length=80, null=True)
    password = models.CharField(max_length=200, null=True)
    contact = models.CharField(max_length=80, null=True)
    created_date = models.DateTimeField(auto_now_add=True)


class Customer(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    password = models.CharField(max_length=80)
    email = models.EmailField(max_length=60)
    mobile = models.BigIntegerField()
    registration_date = models.DateTimeField(auto_now_add=True)


class SavingAccount(models.Model):
    member = models.ForeignKey(Customer, on_delete=models.CASCADE)
    account_no = models.CharField(max_length=20)
    account_balance = models.FloatField(max_length=80, null=True)
    created_date = models.DateTimeField(auto_now_add=True)


class Transaction(models.Model):
    member = models.ForeignKey(Customer, on_delete=models.CASCADE)
    Transaction_Type = models.CharField(max_length=10)
    Transaction_amount = models.FloatField(max_length=20, null=True)
    bal_after_transaction = models.FloatField(max_length=20)
    Date = models.DateTimeField(auto_now_add=True)









