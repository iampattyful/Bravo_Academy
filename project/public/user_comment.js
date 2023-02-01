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
const userCommentTemplate = (
  img,
  userName,
  userId,
  subjectName,
  roleName,
  userComment,
  roleId
) =>
  ` 
  <div class="commentBox">
    <div class="commentUserInfo">
        <div class="commentPic"><img src="${img}"></div>
        <div class="commentNameSubject">
            <div class="commentName" data-role_id=${roleId} data-id=${userId}>${userName}</div>
            <div class="commentSubject" data-id=${userId}>
            ${
              subjectName !== "student"
                ? `${subjectName}${roleName}`
                : `${roleName}`
            }
            
            </div>
        </div>
    </div>
    <div class="commentText">${userComment}</div>
</div>          
      `;

//user comment result
async function userCommentResult(json) {
  const userCommentContent = document.querySelector(".userCommentContainer");
  if (json.result) {
    console.log(json);
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
                  comment.subject_name,
                  comment.role_name,
                  comment.content.replaceAll("\r\n" && "\n", "<br>"),
                  comment.role_id
                )
              : userCommentTemplate(
                  comment.image,
                  comment.username,
                  comment.user_id,
                  comment.subject_name,
                  comment.role_name,
                  comment.content.replaceAll("\r\n" && "\n", "<br>"),
                  comment.role_id
                )
          }`
      )
      .join("");
    // check if user is a teacher, if so, redirect to teacher profile page, if user is a student, redirect to homepage
    let userTitle = document.querySelectorAll(".commentName");
    for (let u of userTitle) {
      u.addEventListener("click", (event) => {
        if (event.currentTarget.dataset.role_id == 2) {
          return;
        }
        window.location.href = `teacher_profile.html?id=${event.currentTarget.dataset.id}`;
      });
    }
  } else {
    userCommentContent.innerHTML = "";
  }
}
