// This file contains the javascript code for the user comment page

let checkLoginRes;
// window onload
window.onload = async function () {
  checkLoginRes = await checkLogin();
  const res = await fetch(`/user_comment`, {
    method: "GET",
  });
  let json = await res.json();
  await userCommentResult(json);
  // nav bar login / register / logout function setup
  let userTitle = document.querySelector(".userProfile");
  if (checkLoginRes.users.role_id == 1) {
    userTitle.addEventListener("click", (event) => {
      window.location.href = `teacher_profile_settings.html?id=${event.currentTarget.dataset.id}`;
    });
  } else if (checkLoginRes.users.role_id == 2) {
    userTitle.addEventListener("click", (event) => {
      window.location.href = `student_login.html?id=${event.currentTarget.dataset.id}`;
    });
  }
};

//user comment template
const userCommentTemplate = (img, userName, userId, userComment) =>
  ` 
  <div class="commentBox">
    <div class="commentUserInfo">
        <div class="commentPic"><img src="${img}"></div>
            <div class="commentName" data-id=${userId}>${userName}</div>
    </div>
    <div class="commentText">${userComment}</div>
</div>          
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
            comment.image === null
              ? userCommentTemplate(
                  `./assets/profile_image_placeholder.jpg" alt=""`,
                  comment.username,
                  comment.user_id,
                  comment.content
                )
              : userCommentTemplate(
                  comment.image,
                  comment.username,
                  comment.user_id,
                  comment.content
                )
          }`
      )
      .join("");
    // check if user is a teacher, if so, redirect to teacher profile page (done)
    // if user is student, do nothing
    let userTitle = document.querySelectorAll(".commentName");
    for (let u of userTitle) {
      t.addEventListener("click", (event) => {
        window.location.href = `teacher_profile.html?id=${event.currentTarget.dataset.id}`;
      });
    }
  } else {
    userCommentContent.innerHTML = "";
  }
}
