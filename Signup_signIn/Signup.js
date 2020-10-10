var array;
var name;
var email;
var password;
var date;
    function loaddata(key){
    return JSON.parse(localStorage.getItem(key));
    }
    function savedata(key,list){
        localStorage.setItem(key,JSON.stringify(list))
    }
    
    window.addEventListener('load',function(){
        array=loaddata('customerDetails')||[];
        var form=document.querySelector('form');
        form.addEventListener('submit',submit)
    })

    var signin=document.getElementById('signin')
    signin.addEventListener('click',change)
 
    document.querySelector('.close').addEventListener('click',function(){
        event.preventDefault();
        document.querySelector('.overpage').style.display='none'
    })
    

function submit(){
    event.preventDefault();
    var form=new FormData(event.target)
     name=form.get('name')
     email=form.get('email');
     password=form.get('password')
     date=Date();
    var c=false;
        if(array.length!=0){
       
                     //checking whether the user already exsists or not
            for(var i=0;i<array.length;i++){
                    if(email==array[i].email){  
                        c=true;
                        break;
                    }          
             }
             
                if(c){
                        var showerror=document.getElementById('showerror')
                        showerror.textContent='user already exists'
                      } 
                 else
                {   
                    document.querySelector('form').reset();
                    var showerror=document.getElementById('showerror')
                    showerror.textContent="";
                    details();
                    location.assign("file:///C:/Users/D%20E%20L%20L/Desktop/Project/signin.html")
                }          
        }
        else if(array.length==0){
            details();
        }
                
        
      

    
}

function details(){
    var customerDetails= {
        name: name,
        email: email,
        password: password,
        transactions: [
                            {title:"", type: "", amount:0, timestamp:date},
                         ]
        }

        array.push(customerDetails)
        savedata('customerDetails',array)

}


function change(){
    document.querySelector('.overpage').style.display='flex';

}

document.querySelector('.content form').addEventListener('submit',function(){
   event.preventDefault();
    var form= new FormData(event.target)
    var email=form.get('email')
    var password=form.get('password')
    var check=false;
    var email_check=false;
    var password_check=false;

        for(var i=0;i<array.length;i++){
            if(email==array[i].email&&password==array[i].password){
                check=true;
                break;
            }
            if(email==array[i].email&&password!=array[i].password){
                email_check=true;
            }
            if(email!=array[i].email&&password==array[i].password){
                password_check=true;
            }
        }

        if(check){
            location.assign("file:///C:/Users/D%20E%20L%20L/Desktop/Project/signin.html")
        }
        else{
            if(email_check)
            {
                var showerror=document.querySelector('.error')
                showerror.textContent='Wrong Password'
            }
            else if(password_check){
                var showerror=document.querySelector('.error')
                showerror.textContent='Account doesn’t exists'
            }
            else{
                var showerror=document.querySelector('.error')
                showerror.textContent='Email or Password INCORRECT'
            }
            
        }

   console.log(email,password)
})