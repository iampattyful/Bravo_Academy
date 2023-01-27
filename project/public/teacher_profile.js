let checkLoginRes;
// window onload
window.onload = async function () {
  //await checkLogin();
  checkLoginRes = await checkLogin();
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("id");
  const res = await fetch(`/teacher_profile/${userId}`, {
    method: "POST",
  });
  let json = await res.json();
  await teacherProfileSettingsResult(json);
  await createEvents();
};

//teacher profile template
const teacherProfileSettingsTemplate = (
  img,
  subjectId,
  subjectName,
  userId,
  teacherName,
  description,
  price,
  min
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
                            <div class="fire">
                                <div class="fire icon">
                                    <i class="fa-solid fa-fire"></i>
                                </div>
                                <div class="fireNo"><a href="#">100</a>
                                </div>
                            </div>
                            <div class="comment">
                                <div class="comment icon">
                                    <i class="fa-regular fa-comment-dots"></i>
                                </div>
                                <div class="commentNo"><a href="#commentTitle">
                                        5個評論</a>
                                </div>
                            </div>
                            <div class="bookmark">
                                <div class="bookmark icon iconClicked" data-id=${userId}>
                                    <i class="fa-regular fa-bookmark"></i>
                                </div>
                                <div class="bookmarkNo"><a href="#">
                                        9人收藏</a>
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
                        <button id="contactBtn"><a href="#">預約諮詢</a></button>

                        <!-- The Modal -->
                        <div id="myModal" class="modal">

                            <!-- Modal content -->
                            <div class="modal-content">
                                <span class="close">&times;</span>
                                <p>我們已收到您的預約諮詢申請，Bravo Academy課程顧問將盡快與您聯繫，敬請留意通知，謝謝！</p>
                            </div>

                        </div>
                        <div class="sns">
                            <!-- <div class="sns-icon"><a href="#"><i class="fa-regular fa-envelope"></i></a></div> -->
                            <div class="sns-icon"><a href="http://www.twitter.com/"><i
                                        class="fa-brands fa-twitter"></i></a>
                            </div>
                            <div class="sns-icon"><a href="http://www.facebook.com/"><i
                                        class="fa-brands fa-facebook"></i></a></div>
                            <div class="sns-icon"><a href="http://www.instagram.com/"><i
                                        class="fa-brands fa-instagram"></i></a></div>
                            <!-- <div class="sns-icon"><a href="http://api.whatsapp.com/"><i
                                        class="fa-brands fa-whatsapp"></i></a></div>
                        </div> -->

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
async function teacherProfileSettingsResult(json) {
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

async function createEvents() {
  // This file contains the javascript code for the teacher profile page
  // Contact button modal code <

  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById("contactBtn");

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
  // >
}
