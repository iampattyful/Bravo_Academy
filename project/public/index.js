//AJAX login

const login = document.querySelector("#login");
login.addEventListener("submit", async (event) => {
  event.preventDefault(); // To prevent the form from submitting synchronously
  const form = event.target;
  const formData = new FormData(form);

  const res = await fetch("/login", {
    method: "POST",
    body: formData,
  });
  login.reset();
  const json = await res.json();

  if (json.result) {
    // login.innerHTML = "WELCOME";
    window.location = "/admin.html";
    return;
  } else {
    window.location = "/";
  }
});
