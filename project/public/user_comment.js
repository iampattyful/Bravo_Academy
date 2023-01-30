// window onload
window.onload = async function () {
  const res = await fetch(`/user_comment/}`, {
    method: "GET",
  });
  let json = await res.json();
  await userCommentResult(json);
};

//user comment template
const userCommentTemplate = (
  img,
  userId,
  userName,
  userComment
) =>
  `           
      `;

//user comment result
async function userCommentResult(json) {
  const userCommentContent = document.querySelector(".userCommentContainer");
  console.log(json);

  if (json.result) {
    userCommentContent.innerHTML = "";
    document.querySelector(".userCommentContainer").innerHTML = json.comments
      .map(
        (comment) =>
          `${
            comments.image === null
              ? teacherProfileSettingsTemplate(
                  `./assets/profile_image_placeholder.jpg" alt=""`,
                  teacher.subject_id,
                  teacher.subject_name,
                  teacher.user_id,
                  teacher.username,
                  teacher.description,
                  teacher.price,
                  teacher.duration
                )
              : teacherProfileSettingsTemplate(
                  teacher.image,
                  teacher.subject_id,
                  teacher.subject_name,
                  teacher.user_id,
                  teacher.username,
                  teacher.description,
                  teacher.price,
                  teacher.duration
                )
          }`
      )
      .join("");

    const profileDiv = document.querySelector("div#teacherContainer");
    //for (const profileDiv of profileDivs) {
    //const checkLoginRes = await checkLogin();
    if (checkLoginRes.result && checkLoginRes.users.role_id == 2) {
      //console.log(await checkLogin());
      console.log(profileDiv.querySelector("div.iconClicked"));
      profileDiv
        .querySelector("div.iconClicked")
        .addEventListener("click", async (event) => {
          let userId = event.currentTarget.dataset.id;
          console.log(userId);
          profileDiv.querySelector(
            ".iconClicked"
          ).innerHTML = `<i class="fa-solid fa-bookmark"></i>`;
          const res = await fetch(`/bookmark/${userId}`, {
            method: "POST",
          });
        });
    } else {
      profileDiv.querySelector(".fa-bookmark").classList.add("hide");
    }
    //}
  } else {
    teacherProfileContent.innerHTML = "";
  }
}
