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
  await bookmarkedResult(json);
  await appointmentResult(json)
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
    const json = await res.json();
    console.log(json.student);
    if (json.result) {
      //   document.querySelector(".userProfile").innerHTML = json.student.username;
      window.location = `/student_login.html?id=${checkLoginRes.users.id}`;
      return;
    } else {
      alert("Please fill in the blank.");
    }

    //load bookmark

    //   //start load student remark
    //   const reRemark = await fetch(`/student_login/${userId}`,{
    //     method: "POST",
    //   });
    //   let jsonRemark = await reRemark.json();
    //   console.log(jsonRemark)
    //   await studentRemarkResult(jsonRemark);

    // });
    //   // end load student remark
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
  });
};

//student profile template
const studentLoginTemplate = (
  img,
  userId,
  studentName,
  email,
  phone,
  description,

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
              <label class="form-label">備忘錄</label>
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

//bookmark template
const bookmarkedTemplate = (
  teacherImg,
  subjectName,
  teacherName,
  teacherId,
  teacherDescription,
  price,
  min
) =>
  `
<div class="inner-column">
        <div class="picture">
          <img src="${teacherImg}">
          <div><a href="#">${subjectName}老師</a></div>
        </div>
        <div class="description">
          <div class="des-head" data-id=${teacherId} >${teacherName}</div>
          <div class="des-icon">
            <div class="iconClicked" data-id=${teacherId}>
                  <i class="fa-solid fa-bookmark" data-id=${teacherId}></i>
            </div>
        
          </div>
          <div class="des-content">${teacherDescription}
          </div>
          <div>
            <div class="des-price">
              <p1>HK$${price}</p1>
              <p2>/${min}分鐘</p2>
            </div>
          </div>
        </div>
      </div>`;

//Bookmarked result
async function bookmarkedResult(json) {
  const bookmarkedContent = document.querySelector("#bookmarkTeacher");
  if (json.result) {
    bookmarkedContent.innerHTML = "";

    bookmarkedContent.innerHTML = json.bookmarked
      .map(
        (bookmark) =>
          `${
            bookmark.image === null
              ? bookmarkedTemplate(
                  `./assets/profile_image_placeholder.jpg" alt=""`,
                  bookmark.subject_name,
                  bookmark.username,
                  bookmark.user_id,
                  bookmark.description,
                  bookmark.price,
                  bookmark.duration
                )
              : bookmarkedTemplate(
                  bookmark.image,
                  bookmark.subject_name,
                  bookmark.username,
                  bookmark.user_id,
                  bookmark.description,
                  bookmark.price,
                  bookmark.duration
                )
          }`
      )
      .join("");

    const bookmarkDivs = [...document.querySelectorAll(".inner-column")];
    for (const bookmarkDiv of bookmarkDivs) {
      bookmarkDiv
        .querySelector(".iconClicked")
        .addEventListener("click", async (event) => {
          let userId = event.currentTarget.dataset.id;
          
          if (
            bookmarkDiv
              .querySelector(".fa-bookmark")
              .classList.contains("fa-solid")
          ) {
            bookmarkDiv.querySelector(
              ".iconClicked"
            ).innerHTML = `<i class="fa-regular fa-bookmark" data-id=${userId}></i>`;
            const res = await fetch(`/bookmark/${userId}`, {
              method: "DELETE",
            });
            bookmarkDiv.classList.add("animate__animated")
            bookmarkDiv.classList.add("animate__bounceOut")
          }
        });
    } let teacherTitle = document.querySelectorAll(".des-head");
    for (let t of teacherTitle) {
      t.addEventListener("click", (event) => {
        window.location.href = `teacher_profile.html?id=${event.currentTarget.dataset.id}`;
      });
    }
  } else {
    bookmarkedContent.innerHTML = "";
  }
}



//appointment template
const appointmentTemplate = (
  teacherImg,
  subjectName,
  teacherName,
  teacherId,
  teacherDescription,
  price,
  min
) =>
  `
<div class="inner-column">
        <div class="picture">
          <img src="${teacherImg}">
          <div><a href="#">${subjectName}老師</a></div>
        </div>
        <div class="description">
          <div class="des-head" data-id=${teacherId} >${teacherName}</div>
          <div class="des-icon">
            <div class="iconClicked" data-id=${teacherId}>
                  <i class="fa-solid fa-bookmark" data-id=${teacherId}></i>
            </div>
        
          </div>
          <div class="des-content">${teacherDescription}
          </div>
          <div>
            <div class="des-price">
              <p1>HK$${price}</p1>
              <p2>/${min}分鐘</p2>
            </div>
          </div>
        </div>
      </div>`;

//Bookmarked result
async function appointmentResult(json) {
  const appointmentContent = document.querySelector("#appointment");
  if (json.result) {
    appointmentContent.innerHTML = "";

    appointmentContent.innerHTML = json.appointments
      .map(
        (appointment) =>
          `${
            appointment.image === null
              ? appointmentResult(
                  `./assets/profile_image_placeholder.jpg" alt=""`,
                  appointment.subject_name,
                  appointment.username,
                  appointment.user_id,
                  appointment.description,
                  appointment.price,
                  appointment.duration
                )
              : appointmentResult(
                appointment.image,
                appointment.subject_name,
                appointment.username,
                appointment.user_id,
                appointment.description,
                appointment.price,
                appointment.duration
                )
          }`
      )
      .join("");

    
     let teacherTitle = document.querySelectorAll(".des-head");
    for (let t of teacherTitle) {
      t.addEventListener("click", (event) => {
        window.location.href = `teacher_profile.html?id=${event.currentTarget.dataset.id}`;
      });
    }
  } else {
    appointmentContent.innerHTML = "";
  }
}
