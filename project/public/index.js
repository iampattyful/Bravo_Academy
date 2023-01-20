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
    window.location = "/";
    document.querySelector("#login").add;
    return;
  } else {
    window.location = "/404.html";
  }
});

//Sign up
const role = document.querySelector("#role");
const subjects = document.querySelector("#subjects");
const priceandtime = document.querySelector(".priceandtime");

let roleSelect = false;
role.addEventListener("change", (event) => {
  roleSelect = !roleSelect;
  if (roleSelect == true) {
    subjects.classList.add("hide");
    priceandtime.classList.add("hide");
  } else {
    subjects.classList.remove("hide");
    priceandtime.classList.remove("hide");
  }
});

const signUp = document.querySelector("#signUp");
signUp.addEventListener("submit", async (event) => {
  event.preventDefault(); // To prevent the form from submitting synchronously
  const form = event.target;
  const formData = new FormData(form);

  const res = await fetch("/signup", {
    method: "POST",
    body: formData,
  });
  signUp.reset();
  const json = await res.json();

  if (json.result) {
    // login.innerHTML = "WELCOME";
    window.location = "/";
    return;
  } else {
    window.location = "/404.html";
  }
});
