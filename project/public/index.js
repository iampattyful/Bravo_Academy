const socket = io.connect("http://localhost:8080/");

window.onload = async function () {
  let res = await checkLogin();
  let userTitle = document.querySelector(".userProfile");
  if (res.users.role_id == 1) {
    userTitle.addEventListener("click", (event) => {
      window.location.href = `teacher_profile_settings.html?id=${event.currentTarget.dataset.id}`;
    });
  } else if (res.users.role_id == 2) {
    userTitle.addEventListener("click", (event) => {
      window.location.href = `student_login.html?id=${event.currentTarget.dataset.id}`;
    });
  }
};

//checkLogin
const checkLogin = async () => {
  const res = await fetch("/checkLogin", {
    method: "GET",
  });
  const json = await res.json();
  console.log(json.result);
  if (json.result) {
    if (json.users.role_id == 3) {
      window.location = "/admin_portal.html";
    } else {
      document.querySelector(".userProfile").classList.remove("hide");
      document.querySelector(".userProfile").innerHTML = json.users.username;
      document
        .querySelector(".userProfile")
        .setAttribute("data-id", `${json.users.id}`);
      document.querySelector("#logout").classList.remove("hide");
      document.querySelector("#loginShow").classList.add("hide");
      document.querySelector("#signUpShow").classList.add("hide");
      // document.querySelector(".become-teacher").classList.add("hide");
      return json;
    }
  } else {
    document.querySelector("#loginShow").classList.remove("hide");
    document.querySelector("#signUpShow").classList.remove("hide");
    return json;
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
    if (json.users.role_id == 3) {
      window.location = "/admin_portal.html";
    } else {
      // document.querySelector("#loginShow").classList.add("hide");
      // document.querySelector("#signUpShow").classList.add("hide");
      document.querySelector(".userProfile").classList.remove("hide");
      document.querySelector(".userProfile").innerHTML = json.users.username;
      document
        .querySelector(".userProfile")
        .setAttribute("data-id", `${json.users.id}`);
      document.querySelector("#loginShow").classList.add("hide");
      document.querySelector("#logout").classList.remove("hide");
      document.querySelector("#signUpShow").classList.add("hide");
      // document.querySelector(".become-teacher").classList.add("hide");
      window.location.reload();
      return;
    }
  } else {
    alert("Incorrect login email or password.");
    document.querySelector("#loginShow").classList.remove("hide");
    document.querySelector("#signUpShow").classList.remove("hide");
  }
});

//Sign up
const role = document.querySelector("#role");
const subjects = document.querySelector("#subjects");
const priceandtime = document.querySelector(".priceandtime");
const description = document.querySelector(".description");

let roleSelect = false;
role.addEventListener("change", (event) => {
  roleSelect = !roleSelect;
  if (roleSelect == true) {
    subjects.classList.add("hide");
    priceandtime.classList.add("hide");
    description.classList.add("hide");
  } else {
    subjects.classList.remove("hide");
    priceandtime.classList.remove("hide");
    description.classList.remove("hide");
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
  // signUp.reset();
  const json = await res.json();
  console.log(json);

  if (json.result) {
    window.location = "/";
    return;
  } else {
    alert("Email address has been used.");
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
    // window.location.reload();
  }
});

//contact us
const contactus = document.querySelector("#contactBox");
contactus.addEventListener("submit", async (event) => {
  event.preventDefault(); // To prevent the form from submitting synchronously
  const form = event.target;
  const formData = new FormData(form);

  const res = await fetch("/contactus", {
    method: "POST",
    body: formData,
  });
  const json = await res.json();
  console.log(json);

  if (json.result) {
    socket.emit("newMessage");
    contactus.reset();
    alert("Message sent.");
    return;
  } else {
    alert("Please fill in the blank.");
  }
});
