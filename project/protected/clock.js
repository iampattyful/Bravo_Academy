let time = document.querySelector(".clock");

setInterval(function () {
  const date = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  time.innerHTML = date;
}, 1000);
