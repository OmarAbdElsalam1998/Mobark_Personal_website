
//handilg sendin email
let Person_name=document.getElementById("person-name");
let email=document.getElementById("email");
let phone=document.getElementById("phoneNumber");
let subject=document.getElementById("email-subject");
let message=document.getElementById("message");
let errorMessages=document.querySelectorAll(".error-message");

let contactForm=document.getElementById("contact-form");
let alertDiv=document.querySelector(".pop-up-alert-message");
let alertMessage=document.querySelector(".contact-with-me   .pop-up-alert-message .message");
let closeAlertMessageButton=document.querySelector(".contact-with-me   .pop-up-alert-message .close-alert");
let interval;



//check the validity of customer name
checkName=()=>{
    if(Person_name.value==""){

        errorMessages[0].textContent="هذا الحقل مطلوب";
        return false;
    }
    else if(!Person_name.value.match(/^[A-Za-z\s0-9]+$/)){
        errorMessages[0].textContent="ادخل اسم صحيج";
        return false;
    }
    else{
        errorMessages[0].textContent="";
        return true;
    }
}


//check the validity of email
checkEmail=()=>{
    if(email.value==""){

        errorMessages[1].textContent="هذا الحقل مطلوب";
        return false;
    }
    else if(!email.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)){
        errorMessages[1].textContent="البريد الإلكتروني غير صحيح";
        return false;
    }
    else{
        errorMessages[1].textContent="";

        return true;

    }
}
//check the validity of email
checkSubject=()=>{
    if(subject.value==""){

        errorMessages[2].textContent="هذا الحقل مطلوب";
        return false;
    }
    else{
        errorMessages[2].textContent="";

        return true;

    }
}
//check the validity of email
checkemessage=()=>{
    if(message.value==""){

        errorMessages[3].textContent="هذا الحقل مطلوب";
        return false;
    }
  
    else{
        errorMessages[3].textContent="";

        return true;

    }
}



contactForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    checkName();
    checkEmail();
    checkSubject();
    checkemessage();

    if(checkName()&&checkEmail()&&checkSubject()&&checkemessage()){
        let date=new Date(Date.now()).getDate();
        if(localStorage.getItem("lastTimeSendingMessage")){
             if(date!=localStorage.getItem("lastTimeSendingMessage")){
                
                sendEmail();
                


             }
             else{
                alertDiv.classList.add("error","active")
                alertMessage.innerHTML="عفوا , مسموح لك بارسال رسالة واحدة"
               interval= setTimeout(()=>{
                    alertDiv.classList.remove("active")

                },5000);
             }
            
        }
        else{
          
            sendEmail();
          
            localStorage.setItem("lastTimeSendingMessage",date);

            
        }
    }
   

   
    
});    

//sending mails using emailjs

function sendEmail(){
    (function(){
        emailjs.init("sKV7QyH9TsieomS2K");
    })();
    let serviceID="service_ssu5aus";//email service id
    let templateID="template_077uiv7";//email template id 
    let params={
        name:Person_name.value,
        email:email.value,
        phone:phone.value,
        subject:subject.value,
        message:message.value


    }
    emailjs.send(serviceID,templateID,params)
    .then(function() {
        alertDiv.classList.add("success","active");
        alertMessage.innerHTML="تم إرسال رسالتك بنجاح"
        interval=setTimeout(()=>{
            alertDiv.classList.remove("active")

        },5000);
    }, function(error) {
        alertDiv.classList.add("error","active")
        alertMessage.innerHTML="تعذر إرسال الرسالة"
        sendEmail();
       interval= setTimeout(()=>{
            alertDiv.classList.remove("active")

        },5000);
    });


}

//close alert message when click on close btn
closeAlertMessageButton.addEventListener("click",function(){
    alertDiv.classList.remove("active")
    clearInterval(interval);

});
