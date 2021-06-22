function Validation() {
    let unameTimer = null,
    	passwordTimer = null,
    	emailTimer = null,
    	phoneTimer = null,
        unameValid, passwordValid, emailValid, phoneValid;
    const self = this;
    
    //Username Validity Checking
    this.checkUnameExist = function (username) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                let status = JSON.parse(this.response);
                if (status['exists']) {
                    document.querySelector("#uname-validity").innerHTML = "Already Exists"
                } else {
                    unameValid = true;
                    document.querySelector("#uname-validity").innerHTML = "Valid Username"
                }
            };
            xhr.onerror = reject;
            xhr.open('GET', '/NoteKeeper2/formvalidate.action?value=' + username);
            xhr.send();
        })
    }


    this.checkUnameValidity = function () {
        let username = document.querySelector("#uname-box").value;
        const regex = /^[a-z0-9_@-]{6,16}$/igm.exec(username);
        const valid = !!regex;
        if(valid){
        	self.checkUnameExist(username);
        } else {
        	document.querySelector("#uname-validity").innerHTML = "Invalid Username"
        }   
    }

    this.detectUnameChange = function () {
    	unameValid= false;
        document.querySelector("#uname-validity").innerHTML = ""
        clearTimeout(unameTimer)
        unameTimer = setTimeout(function () {
            self.checkUnameValidity();
        }, 2000)
    }
    
    //Password Validity Checking
    this.checkPasswordValidity = function () {
        let password = document.querySelector("#password-box").value;
        const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/igm.exec(password);
        const valid = !!regex;
        if(valid){
        	passwordValid = true;
        	document.querySelector("#password-validity").innerHTML = "Valid Password"
        } else {
        	document.querySelector("#password-validity").innerHTML = "Invalid Password"
        }   
    }
    
    this.detectPasswordChange = function () {
    	passwordValid = false;
        self.checkPasswordValidity();
    }
    
    //Email Validity Checking
    this.checkEmailExist = function (email) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                let status = JSON.parse(this.response);
                if (status['exists']) {
                    document.querySelector("#email-validity").innerHTML = "Already Exists"
                } else {
                    emailValid = true;
                    console.log(status['exists'])
                    document.querySelector("#email-validity").innerHTML = "Valid Email"
                }
            };
            xhr.onerror = reject;
            xhr.open('GET', '/NoteKeeper2/formvalidate.action?value=' + email);
            xhr.send();
        })
    }


    this.checkEmailValidity = function () {
        let email = document.querySelector("#email-box").value;
        const regex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.exec(email);
        const valid = !!regex;
        if(valid){
        	self.checkEmailExist(email);
        } else {
        	document.querySelector("#email-validity").innerHTML = "Invalid Email"
        }   
    }

    this.detectEmailChange = function () {
    	emailValid= false;
        document.querySelector("#email-validity").innerHTML = ""
        clearTimeout(emailTimer)
        emailTimer = setTimeout(function () {
            self.checkEmailValidity();
        }, 2000)
    }
    
  //Phone Validity Checking
    this.checkPhoneValidity = function () {
        let password = document.querySelector("#phone-box").value;
        const regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/igm.exec(password);
        const valid = !!regex;
        if(valid){
        	phoneValid = true;
        	document.querySelector("#phone-validity").innerHTML = "Valid Phone Number"
        } else {
        	document.querySelector("#phone-validity").innerHTML = "Invalid Phone Number"
        }   
    }
    
    this.detectPhoneChange = function () {
    	phoneValid = false;
    	self.checkPhoneValidity();
     
    }
    
    //Check Validity before submission
    this.beforeSubmit = function (e) {
    	e.preventDefault();
    	if(unameValid && passwordValid && emailValid && phoneValid){
    		document.querySelector('#createUserForm').submit();
    	} else {
    		alert("Check details and try again")
    	}
    }


}

const validation = new Validation();
document.querySelector('#uname-box').addEventListener('input', validation.detectUnameChange)
document.querySelector('#password-box').addEventListener('input', validation.detectPasswordChange)
document.querySelector('#email-box').addEventListener('input', validation.detectEmailChange)
document.querySelector('#phone-box').addEventListener('input', validation.detectPhoneChange)
document.querySelector('#submit-btn').addEventListener('click', validation.beforeSubmit)