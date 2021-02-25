import datetime
from django.conf import settings
from django.shortcuts import render
from manager.models import *
from django.core.mail import send_mail
import random

class CustomerView:

    def index(self):
        return render(self, 'customer/Login.html')

    def login(self):
        if self.method == 'POST':
            user_email = self.POST.get('email')
            user_password = self.POST.get('password')
            cust = Customer.objects.get(email=user_email,password=user_password)
            self.session['user_id'] = cust.id
            if cust:
                b = SavingAccount.objects.get(member_id=self.session['user_id'])
                trans = Transaction.objects.filter(member_id=self.session['user_id'])
                return render(self, 'customer/Transaction.Html', {'customer':cust,'acc_bal':b.account_balance,
                                                                  'tran':trans})
            else:
                message = "Invalid Credentials"
                return render(self, 'Customer/login.html', {'message': message})
        else:
            return render(self, 'customer/Login.html')

    def transaction(self):
        return render(self,'customer/Transaction.Html')

    def debit(self):
        cust = Customer.objects.get(id=self.session['user_id'])
        b = SavingAccount.objects.get(member_id=self.session['user_id'])
        if self.method == 'POST':
            bal = SavingAccount.objects.get(member_id=self.session['user_id']).account_balance
            amount = float(self.POST.get('enter_amount'))
            total = bal - amount
            if total > 0:
                transaction = Transaction(
                    member=cust,
                    Transaction_Type='DEBIT',
                    Transaction_amount=amount,
                    bal_after_transaction=total
                )
                transaction.save()
                SavingAccount.objects.filter(member_id=self.session['user_id']).update(account_balance=total)
                trans = Transaction.objects.filter(member_id=self.session['user_id'])
                current = datetime.datetime.now()
                content = "Your A/c is debited with INR: " + str(amount) + " on " + current.strftime(
                    "%d-%m-%Y %H:%M:%S") + ". Your current balance is INR : " + str(total)
                send_mail(settings.SUBJECT, content, settings.EMAIL_HOST_USER, [cust.email], fail_silently=False)
                return render(self, 'customer/Transaction.Html', {'acc_bal': total, 'customer': cust, 'tran': trans})
            else:
                message = "Enter Amount greater then balance !"
                return render(self, 'Customer/Debit.html', {'message': message,'sav_acc': b, 'customer': cust})
        else:
            return render(self, 'customer/Debit.html', {'sav_acc': b, 'customer': cust, })

    def credit(self):
        cust = Customer.objects.get(id=self.session['user_id'])
        if self.method == 'POST':
             bal =SavingAccount.objects.get(member_id=self.session['user_id']).account_balance
             amount = float(self.POST.get('enter_amount'))
             total = bal + amount
             try:
                 transaction= Transaction(
                     member= cust,
                     Transaction_Type = 'CREDIT',
                     Transaction_amount = amount,
                     bal_after_transaction = total
                 )
                 transaction.save()
                 SavingAccount.objects.filter(member_id=self.session['user_id']).update(account_balance=total)
                 trans = Transaction.objects.filter(member_id=self.session['user_id'])
                 current = datetime.datetime.now()
                 content = "Your A/c is Credited with INR: " + str(amount) + " on " + current.strftime(
                     "%d-%m-%Y %H:%M:%S") + ". Your current balance is INR : " + str(total)
                 send_mail(settings.SUBJECT, content, settings.EMAIL_HOST_USER, [cust.email], fail_silently=False)
                 return render(self,'customer/Transaction.Html',{'acc_bal':total,'customer':cust,'tran':trans})
             except:
                pass
        else:
            b = SavingAccount.objects.get(member_id=self.session['user_id'])
            return render(self,'customer/Credit.html',{'sav_acc':b,'customer':cust,})

    def register(self):
        if self.method == 'POST':
          first_name = self.POST.get('first_name')
          last_name =  self.POST.get('last_name')
          email = self.POST.get('email')
          password = self.POST.get('password')
          contact = self.POST.get('contact')
          customer = Customer(
              first_name= first_name,
              last_name = last_name,
              password = password,
              email = email,
              mobile = contact
          )
          customer.save()
          cust = Customer.objects.last()
          account = random.randint(1111111111, 9999999999)
          saving_account = SavingAccount(
               member = cust,
               account_no = "TEST" + str(account),
               account_balance= 0
          )
          saving_account.save()
          print(saving_account)
          return render(self,'customer/Login.html')
        else:
            return render(self, 'customer/Register.html')

    def logout(self):
        del self.session['user_id']
        return render(self, 'customer/login.html')