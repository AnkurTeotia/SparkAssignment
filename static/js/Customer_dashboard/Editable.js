function UserDetails()
{
    document.getElementById("first-name").disabled = false;
    document.getElementById("last-name").disabled = false;
    document.getElementById("father_name").disabled = false;
    document.getElementById("gender").disabled = false;
    document.getElementById("dob").disabled = false;
    document.getElementById("state").disabled = false;
    document.getElementById("city").disabled = false;
    document.getElementById("current-add").disabled = false;
    document.getElementById("postal").disabled = false;
    document.getElementById("email").disabled = false;
    document.getElementById("mobile").disabled = false;
    document.getElementById("bank-name").disabled = false;
    document.getElementById("account").disabled = false;
    document.getElementById("branch").disabled = false;
    document.getElementById("ifsc").disabled = false;
    document.getElementById("account-holder").disabled = false;
    document.getElementById("nominee-name").disabled = false;
    document.getElementById("relation").disabled = false;
    document.getElementById("nominee-dob").disabled = false;
}


function chkamount() {
    var amount = document.getElementById('amount').value;
    var status;
    if(amount>=1000 && amount<=750000){
         status = "done";
         document.getElementById('amts').innerHTML = "";
         document.getElementById("btnsubmit").disabled = false;
    }
    else if(amount <=1000){
         status = "Amount should be greater than 1000 !";
         document.getElementById('amts').innerHTML = status;
         document.getElementById("btnsubmit").disabled = true;
    }
    else if(amount >=750000){
         status = "Amount should be less than 750000 !";
         document.getElementById('amts').innerHTML = status;
         document.getElementById("btnsubmit").disabled = true;
    }
}

function chktenure(){
    var period = document.getElementById('tenure').value;
    var status;
    if(period>=1 && period<=12){
         status = "done";
         document.getElementById('tns').innerHTML = "";
         document.getElementById("btnsubmit").disabled = false;
    }

    else if(period > 12){
         status = "Period should be between 1 to 12 months";
         document.getElementById('tns').innerHTML = status;
         document.getElementById("btnsubmit").disabled = true;
    }

}


function chkmamount() {
    var amount = document.getElementById('amount').value;
    var status;
    if(amount>=200000){
         status = "done";
         document.getElementById('amts').innerHTML = "";
         document.getElementById("btnsubmit").disabled = false;
    }
    else if(amount < 200000){
         status = "Amount should be greater than 2 lakhs !";
         document.getElementById('amts').innerHTML = status;
         document.getElementById("btnsubmit").disabled = true;
    }

}

function chkmtenure(){
    var period = document.getElementById('tenure').value;
    var status;
    if(period>=12 && period<=60){
         status = "done";
         document.getElementById('tns').innerHTML = "";
         document.getElementById("btnsubmit").disabled = false;
    }
    else if(period < 12){
        status = "Period should be greater then 12 months !";
        document.getElementById('tns').innerHTML = status;
        document.getElementById("btnsubmit").disabled = true;
    }
    else if(period > 60){
         status = "Period should be less or equal to 60 months";
         document.getElementById('tns').innerHTML = status;
         document.getElementById("btnsubmit").disabled = true;
    }

}

function selectedvalue() {
    var e = document.getElementById("scheme");
    var strUser = e.options[e.selectedIndex].value;
    if(strUser == 0)
    {
           document.getElementById("Non-Breakable").style.display="block";
           document.getElementById("Breakable").style.display="none";

    }
    else if(strUser == 1)
    {
        document.getElementById("Breakable").style.display="block";
        document.getElementById("Non-Breakable").style.display="none";
    }
    else
    {
        document.getElementById("Non-Breakable").style.display="none";
        document.getElementById("Breakable").style.display="none";
    }
}

function admin_ten(val) {
    var ab,scheme,Url;
    if (val == 0) {
         ab = document.getElementById("nonbreak_roi");
         scheme = ab.options[ab.selectedIndex].text;
    }
    else {
        ab = document.getElementById("break_roi");
        scheme = ab.options[ab.selectedIndex].text;
    }
        var request = $.ajax({
          url: 'http://127.0.0.1:8000/admin/ad_rate' ,
          type: "GET",
          data: { scheme : scheme ,breakable : val},
          dataType: "html"
        });

        request.done(function(rate) {
            $("#rate_of_interest").val(rate);
            $("#scheme_type").val(scheme);
         });

        request.fail(function(jqXHR, textStatus) {
          alert( "Request failed: " + textStatus );
        });
}

function admin_rd_ten(val) {
    var ab,tenure,Url;
    ab = document.getElementById("nonbreak_roi");
    scheme = ab.options[ab.selectedIndex].text;
        var request = $.ajax({
          url: 'http://127.0.0.1:8000/admin/rd_rate' ,
          type: "GET",
          data: { scheme : scheme ,breakable : val},
          dataType: "html"
        });

        request.done(function(rate) {
            $("#rate_of_interest").val(rate);
            $("#scheme_type").val(scheme);
         });

        request.fail(function(jqXHR, textStatus) {
          alert( "Request failed: " + textStatus );
        });
}


function non_break_roi(val) {
    var ab,scheme;
    if (val == 0) {
         ab = document.getElementById("nonbreak_roi");
         scheme = ab.options[ab.selectedIndex].text;
    }
    else {
        ab = document.getElementById("break_roi");
        scheme = ab.options[ab.selectedIndex].text;
    }

        var request = $.ajax({
          url: "rate" ,
          type: "GET",
          data: { scheme : scheme ,breakable : val},
          dataType: "html"
        });

        request.done(function(pair) {

                  var response=JSON.parse(pair);
                  var tenure=response.tenure;
                  $("#intrest_rate").val(response.rate);
                  var amount = $("#amount").val();
                  var irate =response.rate/400;
                  var maturity_amount = (1+irate);
                  var power,mat_amount,new_tenure;
                  if( tenure.includes('-')) {
                      new_tenure  = tenure.split('-')[1];
                      time = (new_tenure / 12) * 4;
                      power = Math.pow(maturity_amount, time);
                      mat_amount = amount*power;
                  }
                  else {
                      new_tenure=tenure;
                      time = (new_tenure / 12) * 12;
                      power = Math.pow(maturity_amount, time);
                      mat_amount = amount * power;
                  }
                  $("#scheme_type").val(scheme);
                  $("#ten_val").val(tenure);
                  $("#maturity").val(mat_amount.toFixed(2));
				  $("#schemeval").val(val);
        });

        request.fail(function(jqXHR, textStatus) {
          alert( "Request failed: " + textStatus );
        });

}



function RD_roi(val) {

       var  ab = document.getElementById("non_break_roi");
       var  scheme = ab.options[ab.selectedIndex].text;

        var request = $.ajax({
          url: "rd_rate" ,
          type: "GET",
          data: { scheme : scheme ,breakable : val},
          dataType: "html"
        });

        request.done(function(pair) {

          var response=JSON.parse(pair);
          var tenure=response.tenure;
          var interest = response.rate;
          var amount = $("#amount").val();
          var count=0,maturityamount=0,new_tenure,calculated;

          while (count < tenure) {
              new_tenure = tenure - count;
              calculated=calc(amount, interest, new_tenure);
              maturityamount = maturityamount + parseFloat(calculated);
              alert(maturityamount);
              count = count + 1
          }


          $("#intrest_rate").val(response.rate);
          $("#scheme_type").val(scheme);
          $("#ten_val").val(tenure);
          $("#maturity").val(maturityamount.toFixed(2));
        });

        request.fail(function(jqXHR, textStatus) {
          alert( "Request failed: " + textStatus );
        });

}

function calc(principal,rate,tenure) {
    var maturity,time,val,amount;
    maturity = (1 + (rate / 1200));
    time = (tenure / 12) * 12;
    val = Math.pow(maturity, time);
    amount = (principal * val);
    return amount.toFixed(2)

}


function chkaccountno() {
    var account_no = document.getElementById('account').value;
    var message;
    var request = $.ajax({
          url: "account_number" ,
          type: "GET",
          data: { account_no : account_no},
          dataType: "html"
    });


    request.done(function(exist) {
       if(exist == "")
       {
           message="Enter Account No does not exist";
           document.getElementById('tns').innerHTML = message;
       }
       else if(exist == "NOT"){
           message="Enter Account No is not a hbf account ";
           document.getElementById('tns').innerHTML = message;
       }
       else if(exist == "valid"){
         document.getElementById('tns').innerHTML = "";
         $("#valid").val(1);
       }
    });
    request.fail(function(jqXHR, textStatus) {
          alert( "Request failed: " + textStatus );
    });
}


function chkmobileno() {
    var mobile_no = document.getElementById('mobile').value;
    var message;
    var request = $.ajax({
          url: "mobile_no" ,
          type: "GET",
          data: { mobile_no : mobile_no},
          dataType: "html"
    });


    request.done(function(exist) {
       if(exist == "")
       {
           message="Enter Mobile No does not exist";
           document.getElementById('mns').innerHTML = message;
       }
       else if(exist == "NOT"){
           message="Enter Mobile No is not registered as  hbf account ";
           document.getElementById('mns').innerHTML = message;
       }
       else if(exist == "valid"){
         document.getElementById('mns').innerHTML = "";
         $("#valid").val(1);
       }

    });
    request.fail(function(jqXHR, textStatus) {
          alert( "Request failed: " + textStatus );
    });

}


function Transaction_calculation() {

  var balance=document.getElementById("balance_amount").value;
  var amount_enter=document.getElementById("enter_amount").value;
  var total;
  if ( (balance - amount_enter) > 0)
  {
      if(amount_enter < 1000)
      {
          total=balance-amount_enter ;
         $("#transaction_amount").val(amount_enter);
         $("#transaction_charge").val(0);
         $("#balance_before").val(balance);
         $("#balance_after").val(total);


      }
      else if(amount_enter > 1000 && amount_enter <5000)
      {
          total=balance-amount_enter-10 ;
         $("#transaction_amount").val(amount_enter);
         $("#transaction_charge").val(10);
         $("#balance_before").val(balance);
         $("#balance_after").val(total);



      }
      else if(amount_enter > 5000 && amount_enter <10000)
      {
         total=balance-amount_enter-20;
         $("#transaction_amount").val(amount_enter);
         $("#transaction_charge").val(20);
         $("#balance_before").val(balance);
         $("#balance_after").val(total);


      }
      else if(amount_enter >10000)
      {
          total=balance-amount_enter-40;
          $("#transaction_amount").val(amount_enter);
          $("#transaction_charge").val(40);
          $("#balance_before").val(balance);
          $("#balance_after").val(total);


      }
  }

   var abc = document.getElementById("ben_other_select");
   var ben_select = abc.options[abc.selectedIndex].value;
   $("#beneficiary_id").val(ben_select);

}

