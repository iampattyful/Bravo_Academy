// This file contains the javascript code for the teacher profile settings page

let checkLoginRes;
// window onload
window.onload = async function () {
  //await checkLogin();
  checkLoginRes = await checkLogin();
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("id");
  const res = await fetch(
    `/teacher_profile_settings/${checkLoginRes.users.id}`,
    {
      method: "GET",
    }
  );
  let json = await res.json();
  await teacherProfileSettingsResult(json);
  // update teacher profile settings
  const updateForm = document.querySelector("#updateForm");
  updateForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // To prevent the form from submitting synchronously
    const form = event.target;
    const formData = new FormData(form);

    const res = await fetch(
      `/updateTeacherSettings/${checkLoginRes.users.id}`,
      {
        method: "PUT",
        body: formData,
      }
    );
    console.log(res);
    const json = await res.json();
    if (json.result) {
      window.location = `/teacher_profile_settings.html?id=${checkLoginRes.users.id}`;
      return;
    } else {
      alert("格式錯誤！");
    }
  });
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

// submit user comment
const submitUserComment = document.querySelector("#submitUserComment");
submitUserComment.addEventListener("submit", async (event) => {
  event.preventDefault(); // To prevent the form from submitting synchronously
  const body = {
    userId: checkLoginRes.users.id,
    content: document.getElementById("userComment").value,
  };
  const submitUserCommentRes = await fetch(
    `/submitUserComment/${checkLoginRes.users.id}`,
    {
      method: "POST",
      headers: {
        // Specify any HTTP Headers Here
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(body), // Specify the Request Body
    }
  );

  const content = await submitUserCommentRes.json();
  if (content.result) {
    submitUserComment.reset();
    alert("已成功提交用戶評價！");
    // window.location = `/teacher_profile_settings.html?id=${checkLoginRes.users.id}`;
  } else {
    alert("請準確填寫內容。");
  }
});

//teacher profile template
const teacherProfileSettingsTemplate = (
  img,
  subjectId,
  subjectName,
  userId,
  teacherName,
  email,
  phone,
  description,
  price,
  min
) =>
  `
<div class="container">
    <div class="row">
        <div class="teacherSettings">
            <div class="col-md-4 teacherPicProfileTag">
                <div class="teacherPic">
                    <img src="${img}">
                </div>
                <div class="profileTag"><strong>${subjectName}老師</strong></div>
                <div class="teacherInfo">
                    <h3 data-id=${userId}>${teacherName}</h3>
                </div>
                <div class="previewBtn"><a href="./teacher_profile.html?id=${userId}">瀏覽個人簡介網頁</a></div>
            </div>
            <div class="col-md-8">
                <div id="updatePersonalInfoTitle">
                    <h2>更新個人資料</h2>
                </div>
                <form id="updateForm">
                    <div class="mb-3">
                        <label class="form-label">電郵地址</label>
                        <input type="email" name="email" class="form-control" aria-describedby="emailHelp"
                            value="${email}" disabled />
                    </div>
                    <div class="flex">
                        <div class="mb-3">
                            <label class="form-label">姓名</label>
                            <input type="username" name="username" class="form-control" value="${teacherName}" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">電話</label>
                            <input type="phone" name="phone" class="form-control" value="${phone}" />
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">選擇相片</label>
                        <input type="file" name="image" />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">自我介紹</label>
                        <textarea class="form-control" name="description"
                            style="height: 150px">${description}</textarea>
                    </div>
                    <div class="flex priceandtime">
                        <div class="mb-3">
                            <label class="form-label">收費 (HKD)</label>
                            <input name="price" class="form-control" value="${price}" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">時間（分鐘）</label>
                            <input name="duration" class="form-control" value="${min}" />
                        </div>
                    </div>
                    <input type="submit" class="btn btn-primary" value="提交" />
                </form>
            </div>
        </div>
    </div>
    `;

//teacher profile settings result
async function teacherProfileSettingsResult(json) {
  const teacherProfileSettingsContent = document.querySelector(
    ".teacherProfileSettings"
  );
  if (json.result) {
    teacherProfileSettingsContent.innerHTML = "";
    document.querySelector(".teacherProfileSettings").innerHTML = json.teachers
      .map(
        (teacher) =>
          `${
            teacher.image === null
              ? teacherProfileSettingsTemplate(
                  `./assets/profile_image_placeholder.jpg" alt=""`,
                  teacher.subject_id,
                  teacher.subject_name,
                  teacher.user_id,
                  teacher.username,
                  teacher.email,
                  teacher.phone,
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
                  teacher.email,
                  teacher.phone,
                  teacher.description,
                  teacher.price,
                  teacher.duration
                )
          }`
      )
      .join("");
  } else {
    teacherProfileContent.innerHTML = "";
  }
}
