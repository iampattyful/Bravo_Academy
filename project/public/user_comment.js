let checkLoginRes;
// window onload
window.onload = async function () {
  checkLoginRes = await checkLogin();
  const res = await fetch(`/user_comment`, {
    method: "GET",
  });
  let json = await res.json();
  await userCommentResult(json);
};

//user comment template
const userCommentTemplate = (img, userName, userComment) =>
  ` 
  <div class="commentBox">
    <div class="commentUserInfo">
        <div class="commentPic"><img src="${img}"></div>
        <div class="commentContent">
            <div class="commentName">${userName}</div>
        </div>
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
                  comment.content
                )
              : userCommentTemplate(
                  comment.image,
                  comment.username,
                  comment.content
                )
          }`
      )
      .join("");
  } else {
    userCommentContent.innerHTML = "";
  }
}
