    function validateName(){
        let name = document.getElementById("name").value.trim();
        document.getElementById("error-name").style.display = (name.length >= 3) ? "none" : "block";  
        return name.length >= 3;
    }

    function validateDob(){
        let dob = document.getElementById("dob").value;
        let dobDate = new Date(dob);
        let age = new Date().getFullYear() - dobDate.getFullYear();
        document.getElementById("error-dob").style.display = (dob && age >= 18) ? "none" : "block";
        return (dob && age >= 18);
    }
    function validateGender(){
        let gender = document.getElementById("gender").value;
        document.getElementById("error-gender").style.display = (gender != "") ? "none" : "block"
        return gender != "";
    }

    function validateStep1(){
        if(validateName() && validateDob() && validateGender()){
            document.getElementById("next-1").removeAttribute('disabled');
            return true;
        }
        else{
            document.getElementById("next-1").removeAttribute('disabled');
            document.getElementById("next-1").disabled = true;
            return false;
        }
    }

    function validateEmail(){
        const email = document.getElementById("email").value.trim();
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let flag = pattern.test(email);
        document.getElementById("error-email").style.display = (flag) ? "none" : "block"
        return flag;
    }

    function validatePhone(){
        const phone = document.getElementById("phone").value.trim();
        const pattern = /^\d{10}$/;
        let flag = pattern.test(phone);
        document.getElementById("error-phone").style.display = (flag)? "none" : "block";    
        return flag;
    }

    function validateAddress(){
        let address = document.getElementById("address").value.trim();
        document.getElementById("error-address").style.display = (address.length >= 10) ? "none" : "block";
        return address.length >= 10;
    }

    function validateStep2(){
        if(validateEmail() && validatePhone() && validateAddress()){
            document.getElementById("next-2").removeAttribute('disabled');
            return true;
        }
        else{
            document.getElementById("next-2").removeAttribute('disabled');
            document.getElementById("next-2").disabled = true;
            return false;
        }
    }

    function showStep(stepIndex) {
        const steps = document.querySelectorAll(".step");
        steps.forEach((step, index) => {
            step.classList.toggle("inactive", index !== stepIndex);
        });

        const progressBar = document.getElementById("progress");
        if (progressBar) {
            const progressPercentage = ((stepIndex + 1) / steps.length) * 100;
            progressBar.style.width = progressPercentage + "%";
        }
    }

    function displayDetails() {
        const fields = ["name", "email", "phone", "address", "dob", "gender"];
        fields.forEach(field => {
            document.getElementById(`preview-${field}`).innerHTML = localStorage.getItem(field) || "";
        });
    }

    function handleFormSubmit() {
        const formData = {
            name: document.getElementById("name").value.trim(),
            dob: document.getElementById("dob").value,
            gender: document.getElementById("gender").value,
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            address: document.getElementById("address").value.trim(),
        };
        alert("Form Submitted: \n" + JSON.stringify(formData));

        console.log("Form Data Submitted:", formData);
    }

    function clearForm(){
        const form = document.getElementById("multi-step-form");
        form.reset();
        localStorage.clear();
        showStep(0);
        validateStep1();
    }

    document.addEventListener("DOMContentLoaded", () => {
        const fields = ["name", "gender", "dob", "email", "phone", "address"];
        fields.forEach(field => {
            document.getElementById(field).value = localStorage.getItem(field) || "";
        });
        
        
        showStep(0);
        const next1 = document.getElementById("next-1");
        window.addEventListener("load",()=>{
            validateStep1();
        })
        next1.addEventListener("click",() => {
            showStep(1);
            validateStep2();
        });
        
        
        const back1 = document.getElementById("back-1");
        back1.addEventListener("click",()=>{
            showStep(0);
        });
        const next2 = document.getElementById("next-2");
        next2.addEventListener("click",()=>{
            showStep(2);
            displayDetails();
        });
        
        
        const edit = document.getElementById("edit");
        edit.addEventListener("click",()=>{
            showStep(1);
        });
        
        const name = document.getElementById("name")
        name.addEventListener("change",()=>{
            inpTxt = name.value;
            inpTxt.trim();
            localStorage.setItem("name",inpTxt);
            validateName();
            validateStep1();
        })
        
        const gender = document.getElementById("gender");
        gender.addEventListener("change",()=>{
            localStorage.setItem("gender",gender.value);
            validateGender();
            validateStep1();
        });
        
        const dob = document.getElementById("dob")
        dob.addEventListener("change",()=>{
            localStorage.setItem("dob",dob.value);
            validateDob();
            validateStep1();
        });
        
        
        const email = document.getElementById("email");
        email.addEventListener("change",()=>{
            localStorage.setItem("email",email.value);
            validateEmail();
            validateStep2();
        });
        
        const phone = document.getElementById("phone");
        phone.addEventListener("change",()=>{
            localStorage.setItem("phone",phone.value);
            validatePhone();
            validateStep2();
        });
        
        const address = document.getElementById("address");
        address.addEventListener("change",()=>{
            localStorage.setItem("address",address.value);
            validateAddress();
            validateStep2();
        });
        
        const form = document.getElementById("multi-step-form");
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            clearForm();
        });
        const submitButton = document.getElementById("submit");
        submitButton.addEventListener("click",()=>{
            handleFormSubmit();
            showStep(0);
        });
        
        const clearButton1 = document.getElementById("clear-1");
        const clearButton2 = document.getElementById("clear-2");
        const clearButton3 = document.getElementById("clear-3");
        clearButton1.addEventListener("click",()=>{
            clearForm();
            alert("Form Cleared")
        })
        clearButton2.addEventListener("click",()=>{
            clearForm();
            alert("Form Cleared")
        })
        clearButton3.addEventListener("click",()=>{
            clearForm();
            alert("Form Cleared")
        })
        
        
        const themeToggle1 = document.getElementById("theme-toggle-1");
        const themeToggle2 = document.getElementById("theme-toggle-2");
        const themeToggle3 = document.getElementById("theme-toggle-3");
        const currentTheme = localStorage.getItem("theme");
        
        if (currentTheme === "dark") {
            document.body.classList.add("dark-mode");
        }
        themeToggle1.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("theme", "dark");
            } else {
                localStorage.setItem("theme", "light");
            }
        });
        themeToggle2.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("theme", "dark");
            } else {
                localStorage.setItem("theme", "light");
            }
        });
        themeToggle3.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("theme", "dark");
            } else {
                localStorage.setItem("theme", "light");
            }
        });
    })
