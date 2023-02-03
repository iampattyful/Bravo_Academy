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
  const res = await fetch("/checkLogin");
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
  const { result, users } = await res.json();
  if (result) {
    if (users.role_id == 3) {
      window.location = "/admin_portal.html";
    } else {
      // document.querySelector("#loginShow").classList.add("hide");
      // document.querySelector("#signUpShow").classList.add("hide");
      document.querySelector(".userProfile").classList.remove("hide");
      document.querySelector(".userProfile").innerHTML = users.username;
      document
        .querySelector(".userProfile")
        .setAttribute("data-id", `${users.id}`);
      document.querySelector("#loginShow").classList.add("hide");
      document.querySelector("#logout").classList.remove("hide");
      document.querySelector("#signUpShow").classList.add("hide");
    }
  } else {
    alert("登入電郵/密碼錯誤。");
    document.querySelector("#loginShow").classList.remove("hide");
    document.querySelector("#signUpShow").classList.remove("hide");
  }
  login.reset();
});

//Sign up
const role = document.querySelector("#role");
const subjects = document.querySelector("#subjects");
const priceAndTime = document.querySelector(".priceandtime");
const description = document.querySelector(".description");

let roleSelect = false;
role.addEventListener("change", (event) => {
  roleSelect = !roleSelect;
  if (roleSelect == true) {
    subjects.classList.add("hide");
    priceAndTime.classList.add("hide");
    description.classList.add("hide");
  } else {
    subjects.classList.remove("hide");
    priceAndTime.classList.remove("hide");
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
  } else {
    alert("此電郵已使用。");
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
    alert("訊息已發送。");
    return;
  } else {
    alert("請準備好填寫內容。");
  }
});
