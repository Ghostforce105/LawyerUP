function is_validemail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function is_validpassword(password) {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return passwordPattern.test(password);
}


document.getElementById("formone").addEventListener("submit", async function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if(is_validemail(email)){
    if(is_validpassword(password)){
            const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (result.success) {
            window.location.href = "../Sidebar/Dashboard/dashboard.html";
        } else {
            alert("INTERNAL ERROR TRY LATER");
            document.getElementById("email").value = '';
            document.getElementById("password").value = '';
        }
    }
    else{
        alert('PASSWORD INVALID BETTER ONE');
    }
  }
  else{
    alert("EMAIL IS INVALID");
  }
  
}); 