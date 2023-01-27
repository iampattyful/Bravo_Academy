let checkLoginRes;
// window onload
window.onload = async function () {
  //await checkLogin();
  checkLoginRes = await checkLogin();
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("id");
  const res = await fetch(`/studentLogin/${checkLoginRes.users.id}`, {
    method: "GET",
  });
  let json = await res.json();
  await studentLoginResult(json);
  // update student profile settings
  const updateForm = document.querySelector("#studentUpdateForm");
  updateForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // To prevent the form from submitting synchronously
    const form = event.target;
    const formData = new FormData(form);

    const res = await fetch(`/updateStudentLogin/${checkLoginRes.users.id}`, {
      method: "PUT",
      body: formData,
    });
    console.log(res);
    const json = await res.json();
    if (json.result) {
      window.location = `/student_login.html?id=${checkLoginRes.users.id}`;
      return;
    } else {
      alert("Please fill in the blank.");
    }
  });

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

//student profile template
const studentLoginTemplate = (
  img,
  userId,
  studentName,
  email,
  phone,
  description
) =>
  `
    <div class="container">
    <div class="row">
      <div class="col-md-4 student-image">
        <div class="student-pic">
            <img src="${img}" > 
        </div>
        <div class="student-tag">
          學生
        </div>
        <h3 data-id=${userId}>${studentName}</h3>
      </div>
      <div class="col-md-8">
        <form id="studentUpdateForm">      
          <div class="mb-3">
              <label class="form-label">電郵地址</label>
              <input type="email" name="email" class="form-control" aria-describedby="emailHelp" value="${email}"
                  disabled />
          </div>
          <div class="flex">
              <div class="mb-3">
                  <label class="form-label">姓名</label>
                  <input type="username" name="username" class="form-control" value="${studentName}"/>
              </div>
              <div class="mb-3">
                  <label class="form-label">電話</label>
                  <input type="phone" name="phone" class="form-control" value="${phone}"/>
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
          <input type="submit" class="btn btn-primary" value="完成" />
        </form>
      </div>
    </div>  
  </div>
    `;

//student profile settings result
async function studentLoginResult(json) {
  const studentLoginContent = document.querySelector(".studentLoginSetting");
  if (json.result) {
    studentLoginContent.innerHTML = "";
    studentLoginContent.innerHTML = json.students
      .map(
        (student) =>
          `${
            student.image === null
              ? studentLoginTemplate(
                  `./assets/profile_image_placeholder.jpg" alt=""`,
                  student.user_id,
                  student.username,
                  student.email,
                  student.phone,
                  student.description
                )
              : studentLoginTemplate(
                  student.image,
                  student.user_id,
                  student.username,
                  student.email,
                  student.phone,
                  student.description
                )
          }`
      )
      .join("");
  } else {
    studentLoginContent.innerHTML = "";
  }
}
