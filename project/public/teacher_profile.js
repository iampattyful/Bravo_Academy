// This file contains the javascript code for the teacher profile page

let checkLoginRes;
// window onload
window.onload = async function () {
  checkLoginRes = await checkLogin();
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("id");
  const res = await fetch(`/teacher_profile/${userId}`, {
    method: "POST",
  });
  let json = await res.json();
  await userCommentResult(json);
  await createEvents(); // for contactBtn modal function
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

//teacher profile template
const teacherProfileSettingsTemplate = (
  img,
  subjectId,
  subjectName,
  userId,
  teacherName,
  isBookMark,
  description,
  price,
  min,
  userEmail
) =>
  `           
<div id="teacherContainer" class="container">
    <div class="row teacherHeader">
        <div class="col-md-2">
            <div class="teacherPic">
                <div><img src="${img}"></div>
            </div>
            <div class="profileTag"><a href="/teacher_page.html?id=${subjectId}">${subjectName}老師</a></div>
        </div>
        <div class="col-md-7">
            <div class="teacherInfo">
                <h1 data-id=${userId}>${teacherName}</h1>
                <div class="teacherStat">
                    <div class="bookmark">
                        <div class="iconClicked" data-id=${userId}>
              ${
                isBookMark
                  ? `<i class="fa-solid fa-bookmark marked" data-id=${userId}></i> <span>已收藏</span>`
                  : `<i class="fa-regular fa-bookmark unmarked" data-id=${userId}></i> <span>收藏</span>`
              } 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="teacherPriceContact">
                <div class="teacherPrice">
                    <div id="priceText">HK$${price}</div>
                    <div id="durationText">/${min}分鐘</div>
                </div>
                <!-- <div class="teacherContact">
                        <div id="contactText">預約諮詢</div>
                    </div> -->
                <!-- Trigger/Open The Modal -->
                <button id="contactBtn" data-id=${userId}><a href="#">預約諮詢</a></button>

                <!-- The Modal -->
                <div id="myModal" class="modal">

                    <!-- Modal content -->
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <br>
                        <p id="modalContent"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-9">
            <div class="selfIntro">
                <h3>自我介紹</h3>
                <div class="selfIntroInnerText">
                    ${description}
                </div>
            </div>
      `;

//teacher profile result
async function userCommentResult(json) {
  const teacherProfileContent = document.querySelector(".teacherProfile");
  console.log(json);

  if (json.result) {
    teacherProfileContent.innerHTML = "";
    document.querySelector(".teacherProfile").innerHTML = json.teachers
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
                  teacher.isBookMark,
                  teacher.description,
                  teacher.price,
                  teacher.duration,
                  teacher.email
                )
              : teacherProfileSettingsTemplate(
                  teacher.image,
                  teacher.subject_id,
                  teacher.subject_name,
                  teacher.user_id,
                  teacher.username,
                  teacher.isBookMark,
                  teacher.description,
                  teacher.price,
                  teacher.duration,
                  teacher.email
                )
          }`
      )
      .join("");

    // teacher individual profile bookmark function setup
    if (checkLoginRes.result && checkLoginRes.users.role_id == 2) {
      document
        .querySelector(".iconClicked")
        .addEventListener("click", async (event) => {
          let userId = event.currentTarget.dataset.id;
          console.log(userId);
          if (
            document
              .querySelector(".fa-bookmark")
              .classList.contains("unmarked")
          ) {
            document.querySelector(
              ".iconClicked"
            ).innerHTML = `<i class="fa-solid fa-bookmark marked" data-id=${userId}></i> <span>已收藏</span>`;
            const res = await fetch(`/bookmark/${userId}`, {
              method: "POST",
            });
          } else {
            document.querySelector(
              ".iconClicked"
            ).innerHTML = `<i class="fa-regular fa-bookmark unmarked" data-id=${userId}></i> <span>收藏</span>`;
            const res = await fetch(`/bookmark/${userId}`, {
              method: "DELETE",
            });
          }
        });
    } else {
      document.querySelector(".iconClicked").classList.add("hide");
    }
  } else {
    teacherProfileContent.innerHTML = "";
  }
}

// Contact button modal code
async function createEvents() {
  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById("contactBtn")

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  btn.onclick = function () {
    modal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  if (checkLoginRes.result && checkLoginRes.users.role_id == 1) {
    document
      .getElementById("contactBtn")
      .addEventListener("click", async (event) => {
        document.getElementById("modalContent").innerHTML =
          "請注意：預約諮詢服務僅供學生用戶使用，謝謝！";
      });
  } else if (!checkLoginRes.result) {
    document
      .getElementById("contactBtn")
      .addEventListener("click", async (event) => {
        document.getElementById("modalContent").innerHTML =
          "您必須先註冊/登入學生帳戶才能預約諮詢，謝謝！";
      });
  } else if(checkLoginRes.result && checkLoginRes.users.role_id == 2){
    document
      .getElementById("contactBtn")
      .addEventListener("click", async (event) => {
        let userId = event.currentTarget.dataset.id;
        const res = await fetch(`/contactTeacher/${userId}`, {
          method: "POST",

        });
        let json = await res.json();
        console.log(json.teacher)
        if(json.result){
          document.getElementById("modalContent").innerHTML =
          `我們已收到您的預約諮詢申請，Bravo Academy課程顧問將盡快與您聯繫。您亦可以發送電郵到 <a href="mailto:${json.teacher.email}">${json.teacher.email}</a> 聯絡 <strong>${json.teacher.username}</strong> 老師，謝謝！`;
        } else {
          document.getElementById("modalContent").innerHTML =
          "我們已收到您的預約諮詢申請，Bravo Academy課程顧問將盡快與您聯繫。"}
        
      });
    
  } 
}


