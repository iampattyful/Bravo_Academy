window.onload = async function () {
  checkLogin();
};

const checkLogin = async () => {
  const res = await fetch("/checkLogin", {
    method: "GET",
  });
  const json = await res.json();
  console.log(json.result);
  if (json.result) {
    document.querySelector("#loginShow").classList.add("hide");
    document.querySelector("#signUpShow").classList.add("hide");
    document.querySelector("#logout").classList.remove("hide");
    document.querySelector(".become-teacher").classList.add("hide");

    return;
  }
};

//login
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
    document.querySelector("#loginShow").classList.add("hide");
    document.querySelector("#signUpShow").classList.add("hide");
    document.querySelector("#logout").classList.remove("hide");
    document.querySelector(".become-teacher").classList.add("hide");

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
  console.log(json);

  if (json.result) {
    // login.innerHTML = "WELCOME";
    window.location = "/";
    return;
  } else {
    alert("Please fill in the blank.");
  }
});

//logout;
const logout = document.querySelector("#logout");
logout.addEventListener("click", async (event) => {
  const res = await fetch("/logout", {
    method: "POST",
  });
  const json = await res.json();
  if (json.result) {
    window.location = "/";
  }
});
