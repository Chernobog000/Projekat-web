$(document).ready(function () {

  const registrationForm = $('#registration-form');
  const nameInput = $('#name');
  const emailInput = $('#email');
  const passwordInput = $('#password');
  const confirmPasswordInput = $('#confirm-password');

// -----------------------------------------------

function validateName() {
    if (nameInput.val().trim() === '') {
      setErrorFor(nameInput,'Ime ne moze biti prazno!');
      return false;
    } else{
        setSuccessFor(nameInput);
        return true;
    }
}

function validateEmail(){
   var emailValue= emailInput.val();
   var atposition=emailValue.indexOf("@");  
   var dotposition=emailValue.lastIndexOf(".");
   
     if(emailValue.trim()===''){
       setErrorFor(emailInput,'Email ne moze biti prazan!');
       return false;
     }else if(atposition<1 || dotposition<atposition+2 || dotposition+2>=emailValue.length){ 
         setErrorFor(emailInput,"Unesite ispravnu e-mail adresu!");
         return false;  
     }else{
          setSuccessFor(emailInput);
           return true; 
      }
}

 function validatePassword() {
    
    // Password
    if (password.value.length < 6) {
        setErrorFor(passwordInput,'Password mora da sadrzi najmanje 6 znakova!');
        return false;
    }

    // Slova
    const upperCaseLetters = /[A-Z]/g;
    if (!password.value.match(upperCaseLetters)) {
      setErrorFor(passwordInput,'Password mora sadrzati makar jedno veliko slovo');
       return false;
     }
    
     // mala slova
     const lowerCaseLetters = /[a-z]/g;
      if(!password.value.match(lowerCaseLetters)){
         setErrorFor(passwordInput,"Molimo Vas da unesete ispravnu lozinku. Lozinke razlikuju velika i mala slova i moraju imati najmanje 6 znakova");
          return false;   
      }
      
      //brojevi
      var numbers = /[0-9]/g; 
        if(!password.value.match(numbers)) {  
           setErrorFor(passwordInput,"Molimo Vas da unesete ispravnu lozinku. Lozinke treba da imaju najmanje jedan broj");
            return false;  
        } 

   setSuccessFor(passwordInput);
   return true;

}

function validateConfirmPassword() {
  const confirmPasswordValue=confirmPasswordInput.val().trim();

  if (confirmPasswordValue === '') {
       setErrorFor(confirmPasswordInput, 'Molimo potvrdite password');
       return false;
   } else if (confirmPasswordValue !== password.val()) {
       setErrorFor(confirmPassword, 'Passwords se ne podudaraju');
       return false;
   }else{
         setSuccessFor(confirm-password);
         removeErrorMessages();
         registrationForm.submit(function(event){
               event.preventDefault();            
     
              $.ajax({
                type: "POST",
                url: "process.php", 
                data: $(this).serialize(),             
                  
                    success : function(response) {        
                       $('#registration-form').html("<p class='success-message'>Prijava uspesna!</p>");
                      },
                    
                    error:function(xhr,status,error){
                        console.log(xhr);         
                     },
                   dataType:'text'
              });   
         });
       }
}

// -----------------------  ------------------------

function setErrorFor(input, message) {
  input.addClass('error');
  const errorMessageElement = input.parent().find('.error-message');
  errorMessageElement.text(message);
}

function setSuccessFor(input) {
  input.removeClass('error');
}

function removeErrorMessages() {
   $('.error-message').text('');
}

// -----------------------  ------------------------

registrationForm.on('submit', function(event){
    event.preventDefault();
    validateName();
    validateEmail();
    validatePassword();
    validateConfirmPassword();       
});

nameInput.on('input', function(){
     if(nameInput.val().trim() !== ''){
        setSuccessFor(nameInput);    
      }else{
           setErrorFor(nameInput,'Name cannot be blank!');  
      }
});

emailInput.on('input', function () { 
     if(email.value.trim()===''){
       setErrorFor(email,'Email cannot be blank!');
     }else{
          setSuccessFor(email);
      }
 });

passwordInput.on("blur",validatePassword);

confirmPasswordInput.on("blur",validateConfirmPassword);


});