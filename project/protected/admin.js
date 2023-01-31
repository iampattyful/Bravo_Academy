// const { formatInTimeZone } = require("date-fns-tz");

// const date = contentDate;
// const timeZone = "Asia/Hong_Kong";

// formatInTimeZone(date, "Asia/Hong_Kong", "yyyy-MM-dd HH:mm:ss");

//load contact us msg
window.onload = async function () {
  const res = await fetch("/contactus", {
    method: "GET",
  });
  let json = await res.json();
  await contactUsResult(json);
};

//contact us msg template
const contactUsTemplate = (messageId, read, email, date, content) =>
  `   <div class="messageElement animate__animated animate__backInLeft ${
    read == 1 ? `messageElementRead` : ``
  }" data-id=${messageId}>
                <div class="upper">
                  <div>
                    <div class="dot ${read == 1 ? `hide` : ``}"></div>
                    <p class="email">${email}</p>
                  </div>
                  <span class="date">${date}</span>
                </div>
                <div class="lower">
                  <p class="content">
                    ${content}
                  </p>
                </div>
                <div class="reply btn btn-primary"><a href="mailto:${email}" target="_blank">
                  回覆信息 <i class="bi bi-reply-fill"></i></a>
                </div>
              </div>
      `;

async function contactUsResult(json) {
  const messageListing = document.querySelector(".messageList");
  if (json.result) {
    messageListing.innerHTML = "";
    messageListing.innerHTML = json.contents
      .map((content) =>
        contactUsTemplate(
          content.id,
          content.read,
          content.email,
          content.created_at,
          content.content
        )
      )
      .join("");

    const messageDivs = [...document.querySelectorAll(".messageElement")];
    for (const messageDiv of messageDivs) {
      messageDiv.addEventListener("click", async (event) => {
        const res = await fetch(
          `/contactus/${event.currentTarget.dataset.id}`,
          { method: "PUT" }
        );
        const json = await res.json();
        messageDiv.querySelector(".dot").classList.add("hide");
        messageDiv.classList.add("messageElementRead");
      });
    }
  }
}

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
