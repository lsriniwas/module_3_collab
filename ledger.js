var totalIncome=0;
var totalExpense=0;
var totalBalance=0;
var dashboardUser;
var customerDetails;
var presentUserDetails;
window.addEventListener('load',function(){
    var get_email=JSON.parse(localStorage.getItem('present_user'))
    console.log(get_email)
    
        if(get_email==null){
            location.assign("index.html")
        }
    else{
    document.querySelector('form').addEventListener('submit',handleData)
     customerDetails=JSON.parse(localStorage.getItem('customerDetails')) // storing the entire users details
    
    for(var i=0;i<customerDetails.length;i++){
        if(customerDetails[i].email==get_email){
            dashboardUser=customerDetails[i]                
            break;
        }
    }
    presentUserDetails=dashboardUser
    console.log("data",presentUserDetails,typeof presentUserDetails)
    console.log(presentUserDetails.transactions)
    console.log(presentUserDetails.transactions.length)

         document.querySelector('h1').textContent=`Welcome ${presentUserDetails.name}`

        for(var i=0;i<presentUserDetails.transactions.length;i++){

                if(presentUserDetails.transactions[i].type=='credit'){
                    totalIncome=totalIncome+Number(presentUserDetails.transactions[i].amount)
                }
                if(presentUserDetails.transactions[i].type=='debit'){
                    totalExpense=totalExpense+Number(presentUserDetails.transactions[i].amount)
                }
        }
        
        
        document.querySelector(".box1").textContent=+totalIncome;
        document.querySelector(".box2").textContent=+totalExpense;
        // totalBalance=totalIncome-totalExpense;
        document.querySelector(".box3").textContent=(Number(totalIncome)-Number(totalExpense));

    if(totalIncome!=0||totalExpense!=0){
        document.querySelector('.emptyTrans').style.visibility="hidden";
        var table=document.querySelector('table')
        for(var i=presentUserDetails.transactions.length-1;i>0;i--){
            var tr=document.createElement('tr')
            var td1=document.createElement('td')
            td1.innerHTML= presentUserDetails.transactions[i].title;
            var td2=document.createElement('td')
            td2.innerHTML=presentUserDetails.transactions[i].type;
            var td3=document.createElement('td')
            td3.innerHTML=presentUserDetails.transactions[i].amount;
            var td4=document.createElement('td')
            td4.innerHTML=presentUserDetails.transactions[i].timestamp;
            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            tr.appendChild(td4)
            table.appendChild(tr)
            if(i==presentUserDetails.transactions.length-5){
                break;
            }   
        }
       
    }

}

        
})

function handleData(){
     event.preventDefault();
     var form=new FormData(event.target)
     var title=form.get('title')
     var amount=form.get('amount')

     var checked_ = document.getElementsByName('type');
     var options;
    for(var i = 0; i < checked_.length; i++){
     if(checked_[i].checked){
         options = checked_[i].value;
     }
}
    document.querySelector('form').reset(); 
    // console.log(title,amount,options)
    var transObj={
        title:title,
        type:options,
        amount:amount,
        timestamp:Date()

    }
 
    for(var i=0;i<customerDetails.length;i++){
        if(customerDetails[i].email==dashboardUser.email){
            customerDetails[i].transactions.push(transObj)
            break;
        }
    }


    localStorage.setItem('customerDetails',JSON.stringify(customerDetails))

    document.querySelector('.emptyTrans').style.visibility="hidden";
    
    if(transObj.type=='credit'){
        
        document.querySelector(".box1").textContent=+amount;
    }
    else{
        totalExpense=totalExpense+Number(amount);
        document.querySelector(".box2").textContent=+amount;
    }

    document.querySelector(".box3").textContent=(totalIncome-totalExpense);
    
    var table=document.querySelector('table')
    table.textContent="";
     var trhead=document.createElement('tr')
                        var th1=document.createElement("th")
                        var th2=document.createElement("th")
                        var th3=document.createElement("th")
                        var th4=document.createElement("th")
                        th1.textContent=`Title`;
                        th2.textContent=`Type`;
                        th3.textContent=`Amount`;
                        th4.textContent=`Transaction Date`;

                        trhead.appendChild(th1)
                        trhead.appendChild(th2)
                        trhead.appendChild(th3)
                        trhead.appendChild(th4)

                        table.appendChild(trhead)
                       


    for(var i=presentUserDetails.transactions.length-1;i>0;i--){
        var tr=document.createElement('tr')
        var td1=document.createElement('td')
        td1.innerHTML= presentUserDetails.transactions[i].title;
        var td2=document.createElement('td')
        td2.innerHTML=presentUserDetails.transactions[i].type;
        var td3=document.createElement('td')
        td3.innerHTML=presentUserDetails.transactions[i].amount;
        var td4=document.createElement('td')
        td4.innerHTML=presentUserDetails.transactions[i].timestamp;
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        table.appendChild(tr)
        
        if(i==presentUserDetails.transactions.length-5){
            break;
        }   
    }

    window.location.reload();    

}
document.querySelector('button').addEventListener('dblclick',function(){
   


    document.querySelector('.overpage').style.display='none'
})


document.querySelector('button').addEventListener('click',function(){
   
        document.querySelector('.overpage').style.display='flex';

        console.log(dashboardUser)

        if(dashboardUser.transactions.length==1){
                var details_ledger=document.querySelector('.details_ledger');
                    details_ledger.style.fontSize="40px";
                        details_ledger.style.color="red";

                    details_ledger.textContent=`NO Transactions`
        }
        else{
                var table=document.querySelector('.details_ledger table')
                    table.textContent=""
                    var trhead=document.createElement('tr')
                        var th1=document.createElement("th")
                        var th2=document.createElement("th")
                        var th3=document.createElement("th")
                        var th4=document.createElement("th")
                        th1.textContent=`Title`;
                        th2.textContent=`Type`;
                        th3.textContent=`Amount`;
                        th4.textContent=`Transaction Date`;

                        trhead.appendChild(th1)
                        trhead.appendChild(th2)
                        trhead.appendChild(th3)
                        trhead.appendChild(th4)

                        table.appendChild(trhead)
                for(var i=1;i<dashboardUser.transactions.length;i++){
                    var tr=document.createElement('tr')
                    var td1=document.createElement('td')
                    td1.innerHTML=presentUserDetails.transactions[i].title;
                    var td2=document.createElement('td')
                    td2.innerHTML=presentUserDetails.transactions[i].type;
                    var td3=document.createElement('td')
                    td3.innerHTML=presentUserDetails.transactions[i].amount;
                    var td4=document.createElement('td')
                    td4.innerHTML=presentUserDetails.transactions[i].timestamp;
                    tr.appendChild(td1)
                    tr.appendChild(td2)
                    tr.appendChild(td3)
                    tr.appendChild(td4)
                    table.appendChild(tr)
                    
                }
               
               
        }


  
})


function allLedgerHandle(){
    if(dashboardUser.transactions.length==1){
        var details_ledger=document.querySelector('.details_ledger');
            details_ledger.style.fontSize="40px";
            details_ledger.style.color="red";
            details_ledger.textContent=`NO Transactions`
        
        }

    else
    {
        var table=document.querySelector('.details_ledger table')
            table.textContent=""
            var trhead=document.createElement('tr')
                var th1=document.createElement("th")
                var th2=document.createElement("th")
                var th3=document.createElement("th")
                var th4=document.createElement("th")
                th1.textContent=`Title`;
                th2.textContent=`Type`;
                th3.textContent=`Amount`;
                th4.textContent=`Transaction Date`;

                trhead.appendChild(th1)
                trhead.appendChild(th2)
                trhead.appendChild(th3)
                trhead.appendChild(th4)

                table.appendChild(trhead)
        for(var i=1;i<dashboardUser.transactions.length;i++){
            var tr=document.createElement('tr')
            var td1=document.createElement('td')
            td1.innerHTML=presentUserDetails.transactions[i].title;
            var td2=document.createElement('td')
            td2.innerHTML=presentUserDetails.transactions[i].type;
            var td3=document.createElement('td')
            td3.innerHTML=presentUserDetails.transactions[i].amount;
            var td4=document.createElement('td')
            td4.innerHTML=presentUserDetails.transactions[i].timestamp;
            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            tr.appendChild(td4)
            table.appendChild(tr)
            
        }
       
       
    }
}
function allLedgerCreditHandle(){
    if(dashboardUser.transactions.length==1){
        var details_ledger=document.querySelector('.details_ledger');
            details_ledger.style.fontSize="40px";
            details_ledger.style.color="red";
            details_ledger.textContent=`NO Transactions`
}
else{
        var table=document.querySelector('.details_ledger table')
            table.textContent=""
            var trhead=document.createElement('tr')
                var th1=document.createElement("th")
                var th2=document.createElement("th")
                var th3=document.createElement("th")
                var th4=document.createElement("th")
                th1.textContent=`Title`;
                th2.textContent=`Type`;
                th3.textContent=`Amount`;
                th4.textContent=`Transaction Date`;

                trhead.appendChild(th1)
                trhead.appendChild(th2)
                trhead.appendChild(th3)
                trhead.appendChild(th4)

                table.appendChild(trhead)
        for(var i=1;i<dashboardUser.transactions.length;i++){
        if(dashboardUser.transactions[i].type=='credit'){
            var tr=document.createElement('tr')
            var td1=document.createElement('td')
            td1.innerHTML=presentUserDetails.transactions[i].title;
            var td2=document.createElement('td')
            td2.innerHTML=presentUserDetails.transactions[i].type;
            var td3=document.createElement('td')
            td3.innerHTML=presentUserDetails.transactions[i].amount;
            var td4=document.createElement('td')
            td4.innerHTML=presentUserDetails.transactions[i].timestamp;
            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            tr.appendChild(td4)
            table.appendChild(tr)
        }
            
        }
}
}

function allLedgerdebitHandle(){
   
    if(dashboardUser.transactions.length==1){
        var details_ledger=document.querySelector('.details_ledger');
            details_ledger.style.fontSize="40px";
            details_ledger.style.color="red";
            details_ledger.textContent=`NO Transactions`
}
else{
    // var details_ledger=document.querySelector('.details_ledger');
        var table=document.querySelector('.details_ledger table')
            table.textContent=""
            var trhead=document.createElement('tr')
                var th1=document.createElement("th")
                var th2=document.createElement("th")
                var th3=document.createElement("th")
                var th4=document.createElement("th")
                th1.textContent=`Title`;
                th2.textContent=`Type`;
                th3.textContent=`Amount`;
                th4.textContent=`Transaction Date`;

                trhead.appendChild(th1)
                trhead.appendChild(th2)
                trhead.appendChild(th3)
                trhead.appendChild(th4)

                table.appendChild(trhead)
        for(var i=1;i<dashboardUser.transactions.length;i++){
        if(dashboardUser.transactions[i].type=='debit'){
            var tr=document.createElement('tr')
            var td1=document.createElement('td')
            td1.innerHTML=presentUserDetails.transactions[i].title;
            var td2=document.createElement('td')
            td2.innerHTML=presentUserDetails.transactions[i].type;
            var td3=document.createElement('td')
            td3.innerHTML=presentUserDetails.transactions[i].amount;
            var td4=document.createElement('td')
            td4.innerHTML=presentUserDetails.transactions[i].timestamp;
            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            tr.appendChild(td4)
            table.appendChild(tr)
        }
            
        }
}
}

//logout button
document.getElementById('logout').addEventListener('click',function(){
    localStorage.removeItem('present_user')
    location.assign("index.html")
})