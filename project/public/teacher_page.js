let checkLoginRes;

window.onload = async function () {
  checkLoginRes = await checkLogin();
  const urlParams = new URLSearchParams(window.location.search);
  const subjectId = urlParams.get("id");
  // console.log(subjectId);
  const res = await fetch(`/teachers/${subjectId}`, {
    method: "POST",
  });
  let json = await res.json();
  console.log(json);
  await teacherResult(json);
};

//teacher list Template
const teacherListTemplate = (
  img,
  subjectName,
  userId,
  teacherName,
  isBookMark,
  description,
  price,
  min
) =>
  `   <div class="inner-column">
        <div class="picture">
          <img src="${img}">
          <div><a href="#">${subjectName}老師</a></div>
        </div>
        <div class="description">
          <div class="des-head" data-id=${userId}>${teacherName}</div>
          <div class="des-icon">
            <div class="iconClicked">
              ${
                isBookMark
                  ? `<i class="fa-solid fa-bookmark" data-id=${userId}></i>`
                  : `<i class="fa-regular fa-bookmark" data-id=${userId}></i>`
              }
            </div>
            <div><i class="fa-regular fa-heart"></i></div>
          </div>
          <div class="des-content">${description}
          </div>
          <div>
            <div class="des-price">
              <p1>HK$${price}</p1>
              <p2>/${min}分鐘</p2>
            </div>
          </div>
        </div>
      </div>
      `;

// load teacher list
const loadTeacher = async (event) => {
  // let subjectId;

  // if (event.currentTarget.id == "chinese") {
  //   subjectId = 1;
  // } else if (event.currentTarget.id == "english") {
  //   subjectId = 2;
  // } else if (event.currentTarget.id == "french") {
  //   subjectId = 3;
  // } else if (event.currentTarget.id == "japanese") {
  //   subjectId = 4;
  // }
  const urlParams = new URLSearchParams(window.location.search);
  const subjectId = urlParams.get("id");

  console.log(subjectId);
  const res = await fetch(`/teachers/${subjectId}`, {
    method: "POST",
  });
  let json = await res.json();
  await teacherResult(json);
};

const chinese = document.querySelector("#chinese");
const english = document.querySelector("#english");
const french = document.querySelector("#french");
const japanese = document.querySelector("#japanese");
chinese.addEventListener("click", loadTeacher);
english.addEventListener("click", loadTeacher);
french.addEventListener("click", loadTeacher);
japanese.addEventListener("click", loadTeacher);

async function teacherResult(json) {
  const teacherListing = document.querySelector(".teacherListing");
  console.log(json);

  if (json.result) {
    teacherListing.innerHTML = "";
    document.querySelector(".teacherListing").innerHTML = json.teachers
      .map(
        (teacher) =>
          `${
            teacher.image === null
              ? teacherListTemplate(
                  `./assets/profile_image_placeholder.jpg" alt=""`,
                  teacher.subject_name,
                  teacher.user_id,
                  teacher.username,
                  teacher.isBookMark,
                  teacher.description,
                  teacher.price,
                  teacher.duration
                )
              : teacherListTemplate(
                  teacher.image,
                  teacher.subject_name,
                  teacher.user_id,
                  teacher.username,
                  teacher.isBookMark,
                  teacher.description,
                  teacher.price,
                  teacher.duration
                )
          }`
      )
      .join("");

    const teacherDivs = [...document.querySelectorAll(".inner-column")];
    for (const teacherDiv of teacherDivs) {
      if (checkLoginRes.result && checkLoginRes.users.role_id == 2) {
        teacherDiv
          .querySelector(".fa-bookmark")
          .addEventListener("click", async (event) => {
            let userId = event.currentTarget.dataset.id;
            console.log(userId);
            teacherDiv.querySelector(
              ".iconClicked"
            ).innerHTML = `<i class="fa-solid fa-bookmark"></i>`;
            const res = await fetch(`/bookmark/${userId}`, {
              method: "POST",
            });
          });
      } else {
        teacherDiv.querySelector(".fa-bookmark").classList.add("hide");
      }
    }
    let teacherTitle = document.querySelectorAll(".des-head");
    for (let t of teacherTitle) {
      t.addEventListener("click", (event) => {
        window.location.href = `teacher_profile.html?id=${event.currentTarget.dataset.id}`;
      });
    }
  }

  // teacherListing.innerHTML = "";
  // for (let i = json.teachers.length - 1; i >= 0; i--) {
  //   const teacher = document.createElement("div");
  //   teacher.classList.add("inner-column");
  //   if (json.teachers[i].image == null) {
  //     document.querySelector(
  //       ".picture"
  //     ).innerHTML = `<img src="./assets/profile_image_placeholder.jpg">`;
  //   } else {
  //     json.teachers[i].image == json.teachers[i].image;
  //   }

  //   teacher.innerHTML = teacherListTemplate(
  //     json.teachers[i].image,
  //     json.teachers[i].user_id,
  //     json.teachers[i].username,
  //     json.teachers[i].description,
  //     json.teachers[i].price,
  //     json.teachers[i].duration
  //   );

  // teacherListing.appendChild(teacher);
  else {
    teacherListing.innerHTML = "";
  }
}
