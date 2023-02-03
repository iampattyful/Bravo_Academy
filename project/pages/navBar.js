document.querySelector(
  "#navBar"
).innerHTML = `<nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="/"><img src="/assets/Bravo Academy.png" width="164" height="24" /></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                探索課程
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" id="chinese" href="/teacher_page.html?id=1">中文</a></li>
                <li><a class="dropdown-item" id="english" href="/teacher_page.html?id=2">英文</a></li>
                <li><a class="dropdown-item" id="french" href="/teacher_page.html?id=3">法文</a></li>
                <li><a class="dropdown-item" id="japanese" href="/teacher_page.html?id=4">日文</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="./index.html#contactUs">聯絡我們</a>
            </li>
            <li class="nav-item" id="review">
              <a class="nav-link" href="./user_comment.html">用戶評價</a>
            </li>
            <li class="nav-item">
              <div class="nav-link userProfile hide"></div>
            </li>
            <li class="nav-item login hide" id="logout">
              <a class="nav-link">登出</a>
            </li>
            <li>
              <div id="loginShow" type="button" class="nav-item login white hide" data-bs-toggle="modal"
                data-bs-target="#exampleModal">
                登入
              </div>
              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">
                        用戶登入
                      </h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <form id="login">
                        <div class="mb-3">
                          <label for="exampleInputEmail1" class="form-label">登入電郵</label>
                          <input type="email" name="email" class="form-control" aria-describedby="emailHelp" />
                        </div>
                        <div class="mb-3">
                          <label for="exampleInputPassword1" class="form-label">密碼</label>
                          <input type="password" name="password" class="form-control" />
                        </div>
                        <input type="submit" class="btn btn-primary" value="登入"/>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div id="signUpShow" type="button" class="nav-item login white hide" data-bs-toggle="modal"
                data-bs-target="#staticBackdrop">
                註冊
              </div>
              <!-- Modal -->
              <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog  modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="staticBackdropLabel">
                        用戶登記
                      </h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <form id="signUp">
                        <div class="mb-3">
                          <label class="form-label">選擇身份</label>
                          <select class="form-select" id='role' name='roleId' aria-label="Default select example">
                            <option class='teachers' value="1">老師</option>
                            <option class='students' value="2">學生</option>
                          </select>
                        </div>
                        <div class="mb-3" id='subjects'>
                          <label class="form-label">選擇科目</label>
                          <select class="form-select" aria-label="Default select example" name="subjectId">
                            <option value="1">中文</option>
                            <option value="2">英文</option>
                            <option value="3">法文</option>
                            <option value="4">日文</option>
                          </select>
                        </div>
                        <div class="mb-3">
                          <label class="form-label">電郵地址</label>
                          <input type="email" name="email" class="form-control" aria-describedby="emailHelp" />
                        </div>
                        <div class="mb-3">
                          <label for="exampleInputPassword1" class="form-label">輸入密碼</label>
                          <input type="password" name="password" class="form-control" />
                        </div>
                        <div class="flex">
                          <div class="mb-3">
                            <label class="form-label">姓名</label>
                            <input type="username" name="username" class="form-control" />
                          </div>
                          <div class="mb-3">
                            <label class="form-label">電話</label>
                            <input type="phone" name="phone" class="form-control" />
                          </div>
                        </div>
                        <div class="mb-3">
                          <label class="form-label">選擇相片</label>
                          <input type="file" name="image" />
                        </div>
                        <div class="mb-3 description">
                          <label class="form-label">自我介紹</label>
                          <textarea class="form-control" name="description" placeholder="輸入自我介紹"
                            style="height: 150px"></textarea>
                        </div>
                        <div class="flex priceandtime">
                          <div class="mb-3">
                            <label class="form-label">收費 (HKD)</label>
                            <input name="price" class="form-control" />
                          </div>
                          <div class="mb-3">
                            <label class="form-label">時間（分鐘）</label>
                            <input name="duration" class="form-control" />
                          </div>
                        </div>
                        <input type="submit" class="btn btn-primary" value="完成" />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li class="nav-item time">
              <p class="clock">00:00</p>
            </li>
          </ul>
        </div>
      </div>
    </nav>`;

document.querySelector("#footer").innerHTML = `<section class="footer">
            <div class="container-fluid" style="padding-left: 0; padding-right: 0">
              <div class="row">
                <div class="col-md-1"></div>
                <div class="col-md-2">
                    <div style="display: flex;justify-content: center;align-items: center; flex-direction: column;">
                         <div><span>熱門</span></div>
                     <div class="outer">
                         <ul>
              <li><a href="#">線上英文</a></li>
              <li><a href="#">英文補習</a></li>
              <li><a href="#">English Tutor</a></li>
            </ul>
                     </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div><span style="color: black;visibility: hidden;;">dummy</span></div>
                     <div class="outer">
                       <ul>
              <li><a href="#">オンライン英会話</a></li>
              <li><a href="#">Online English Tutor</a></li>
              <li><a href="#">Online Tutor</a></li>
            </ul>
                     </div>
                </div>
                <div class="col-md-2">
                     <div><span style="color: black;visibility: hidden;;">dummy</span></div>
                     <div class="outer">
                       <ul>
              <li><a href="#">線上家教</a></li>
              <li><a href="#">網上課程</a></li>
              <li><a href="#">オンラインレッスン</a></li>
            </ul>
                     </div>
                </div>
                <div class="col-md-2">
                     <div><span style="color: black;visibility: hidden;;">dummy</span></div>
                     <div class="outer">
                      <ul>
              <li><a href="#">線上家教</a></li>
              <li><a href="#">網上課程</a></li>
              <li><a href="#">オンラインレッスン</a></li>
            </ul>
                     </div>
                </div>
                <div class="col-md-2">
                      <div><span>其他</span></div>
                     <div class="outer">
                        <ul>
              <li><a href="#">成為老師</a></li>
              <li>關於我們</li>
            </ul>
                     </div>
                </div>
                
            </div>

            <section class="end">
              <span>© 2023 Bravo Academy.</span>
              <div class="social-media">
                <div>
                  <a href="#"><i class="bi bi-instagram"></i></a>
                </div>
                <div>
                  <a href="#"><i class="bi bi-facebook"></i></a>
                </div>
                <div>
                  <a href="#"><i class="bi bi-twitter"></i></a>
                </div>
              </div>
            </section>
          </section>

          <a href="#">
            <div class="scroll-to-top">
              <i class="bi bi-chevron-compact-up"></i>
            </div>
          </a>`;
