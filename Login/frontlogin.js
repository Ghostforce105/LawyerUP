
document.getElementById("formone").addEventListener("submit", async function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const result = await response.json();

  if (result.success) {
    alert("successful");
    window.location.href = "../Sidebar/Dashboard/dashboard.html";
  } 
  else {
    alert("Invalid email or password.");
    document.getElementById("email").value = '';
    document.getElementById("password").value = '';
  }
});

