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
