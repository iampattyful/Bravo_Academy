window.onload = async function () {
  checkLogin();
  //   chinese.click();
};

//teacher list Template
const teacherListTemplate = (img, teacherName, description, price, min) =>
  ` 
        <div class="picture">
          <img src="../uploads/${img}">
          <div><a href="#">聯絡老師</a></div>
        </div>
        <div class="description">
          <div class="des-head">${teacherName}</div>
          <div class="des-icon">
            <div><i class="fa-regular fa-bookmark"></i></div>
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
      `;

// load teacher list
const loadTeacher = async (event) => {
  let id;

  if (event.currentTarget.id == "chinese") {
    id = 1;
  } else if (event.currentTarget.id == "english") {
    id = 2;
  } else if (event.currentTarget.id == "french") {
    id = 3;
  } else if (event.currentTarget.id == "japanese") {
    id = 4;
  }

  console.log(id);
  const res = await fetch(`/teachers/${id}`, {
    method: "POST",
  });
  let json = await res.json();
  console.log(json);
  teacherResult(json);
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
    for (let i = json.teachers.length - 1; i >= 0; i--) {
      const teacher = document.createElement("div");
      teacher.classList.add("inner-column");

      teacher.innerHTML = teacherListTemplate(
        json.teachers[i].image,
        json.teachers[i].username,
        json.teachers[i].description,
        json.teachers[i].price,
        json.teachers[i].duration
      );

      teacherListing.appendChild(teacher);
    }
  }
}
