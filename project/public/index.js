window.onload = async function () {
  checkLogin();
};

//checkLogin
const checkLogin = async () => {
  const res = await fetch("/checkLogin", {
    method: "GET",
  });
  const json = await res.json();
  console.log(json.result);
  if (json.result) {
    document.querySelector(".userProfile").classList.remove("hide");
    document.querySelector(".userProfile").innerHTML = json.users.username;
    document.querySelector("#logout").classList.remove("hide");
    document.querySelector(".become-teacher").classList.add("hide");
    document.querySelector("#loginShow").classList.add("hide");
    document.querySelector("#signUpShow").classList.add("hide");
    return;
  } else {
    document.querySelector("#loginShow").classList.remove("hide");
    document.querySelector("#signUpShow").classList.remove("hide");
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
    // document.querySelector("#loginShow").classList.add("hide");
    // document.querySelector("#signUpShow").classList.add("hide");
    document.querySelector(".userProfile").classList.remove("hide");
    document.querySelector(".userProfile").innerHTML = json.users.username;
    document.querySelector("#loginShow").classList.add("hide");
    document.querySelector("#logout").classList.remove("hide");
    document.querySelector("#signUpShow").classList.add("hide");
    document.querySelector(".become-teacher").classList.add("hide");
    return;
  } else {
    document.querySelector("#loginShow").classList.remove("hide");
    document.querySelector("#signUpShow").classList.remove("hide");
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
