// ========== GLOBAL VARIABLES ==========

let _flats = [];

// ========== JSON BIN key ==========
const _baseUrl = "https://api.jsonbin.io/b/6155a4c7aa02be1d44518cd5";
const _headers = {
  "X-Master-Key":
    "$2b$10$uybgdG.EpfR.9Wcg5lK3cOZ0femfX1zFvlJ3e59IPnfkm.3Wx2o0.",
  "Content-Type": "application/json",
};

// ========== READ ==========

async function loadFlats() {
  const url = _baseUrl + "/latest"; 
  const response = await fetch(url, {
    headers: _headers,
  });
  const data = await response.json();
  console.log("main-array", data);
  _flats = data;
  showLoader(false);
  filterFlats();
}

loadFlats();


//Append apartments in home -- Marko & Mads
function appendFlats(flats) {
  let htmlTemplate = "";
  for (const flat of flats) {
    htmlTemplate += /*html*/ `

      <article class="cards">
        <div class="card-container">
          <div class="card-heading-flex">
            <div class="card-img">
              <img class="profile-img" src="${flat.img_profile[0]}"/>
              <img class="verified-img"  src="/img/Verified.svg" id="verified"/>
            </div>
           <div class="card-heading">
            <h3>${flat.title}</h3>
             <p><span class="material-icons md-14">location_on</span>${flat.adress}</p>
             <p><span class="material-icons md-14">home</span>${flat.tags[0]} | ${flat.tags[1]} | ${flat.tags[2]}</p>
           </div>
            
          </div>

          <div class="card-content">
             <div class="card-description">
                <p>${flat.description_card}</p>
             </div>
             <div class="img-container-card">
                <div class="main">
                  <img src="${flat.img[0]}"/>
                </div>
              <div class="img-card-flex">
                <div class="secondary">
                  <img src="${flat.img[2]}"/>
                   <div class="opacity">                   
                     <div class="see-more">
                        <p>+5</p>
                     </div>
                       <img src="${flat.img[2]}"/>
                  </div>
                </div>
               </div>
             </div>
             <div class="content-row">
                <div class="content-row-description">
                  <p>Husleje</p>
                  <p>${flat.rent}</p>
                 </div>
                 <div class="content-row-description">
                  <p>Indflytningsklart</p>
                  <p>${flat.ready_move_date}</p>
                 </div>

                  <div class="content-row-description">
                   <p>Plads</p>
                   <p>${flat.space}</p>
                 </div>
              </div>
           </div>
             <div class="card-footer">
               <!--<button onclick="changePage('#/test')">Se bolig</button>-->
               <button class="nav-link" onclick="showDetailView('${flat.id}');" >Se lejlighed</button>
               <p>${flat.created}</p>
            </div>
         </div>  
        </div>  
       </div>
      </article>
      `;
  }
  document.querySelector("#flats-container").innerHTML = htmlTemplate;
}

//Append detailview of apartments in detailview --- Marko & Mads
function showDetailView(id) {
  scrollToTop();
  const flat = _flats.find((flat) => flat.id == id);
  document.querySelector("#flats-container-page").innerHTML = /*html*/ `
 
    <header class="detail-view">
         <a href="#/" class="nav-link" onclick="navigateTo('#/')"><img  src="/img/Return.svg"></a>
        <h1>${flat.title}</h1>
    </header> 

    <div class="detail-view-contact">
      <div class="detail-view-contact-container">
        <div class="detail-view-rent">
          <p>Månedlig leje</p>
          <p>${flat.rent}</p>
        </div>  
        <div class="detail-view-message">
        <button class="nav-link detail-view-button" onclick="navigateTo('#/beskeder');">Skriv til udlejer</button>
        </div>
      </div>
    </div>

  <article>
    <div class="detail-view-container">
      <div class="detail-view-slideshow">
        <img src="${flat.img[0]}" />
      </div>
      <div class="content-row">
        <div class="content-row-description">
          <p>Husleje</p>
          <p>${flat.rent}</p>
        </div>
        <div class="content-row-description">
          <p>Indflytningsklart</p>
          <p>${flat.ready_move_date}</p>
        </div>

        <div class="content-row-description">
          <p>Plads</p>
          <p>${flat.space}</p>
        </div>
      </div>

      <div class="detail-view-heading">
        <h2>${flat.adress}</h2>
        <p class="left">Månedlig acconto<span class="float-right">${flat.acconto}</span></p>
        <p class="left">Indflytningspris<span class="float-right">${flat.price_move}</span></p>
      </div>

      <div class="detail-view-content">
        <p>${flat.title_page}</p>
        <p>${flat.page_content}</p>
      </div>

      <div class="detail-view-table">
        <table>

          <tr>
            <td>Boligtype</td>
            <td class="text-right">${flat.details_apartment[0]}</td>
            <td>Etage</td>
            <td class="text-right">${flat.details_apartment[5]}</td>
          </tr>

          <tr>
            <td>Energimærke</td>
            <td class="text-right">${flat.details_apartment[1]}</td>
            <td>Møbleret</td>
            <td class="text-right">${flat.details_apartment[6]}</td>
          </tr>
          <tr>
            <td>Delevenlig</td>
            <td class="text-right">${flat.details_apartment[2]}</td>
            <td>Husdyr</td>
            <td class="text-right">${flat.details_apartment[7]}</td>
          </tr>
          <tr>
            <td>Elevator</td>
            <td class="text-right">${flat.details_apartment[3]}</td>
            <td>Balkon/altan</td>
            <td class="text-right">${flat.details_apartment[8]}</td>
          </tr>

          <tr>
            <td>Parkering</td>
            <td class="text-right">${flat.details_apartment[4]}</td>
            <td>Handicapvenlig</td>
            <td class="text-right">${flat.details_apartment[9]}</td>
          </tr>
        </table>
      </div>

      <div class="detail-view-location">
        <iframe src="${flat.location}"></iframe>
      </div>

    </div>

    <div class="roomies">
    <h3>Roomies</h3>

    <div class="card-img-roomies">
      <img class="profile-img-roomies" src="${flat.img_profile[0]}" />
      <img class="verified-img" src="/img/Verified.svg" id="verified" />
    </div>

    <div class="roomies-container">

      <h4>${flat.roomie_name}</h4>

      <div class="content-row-roomies">
        <div class="content-row-description-roomies">
          <p>Civilstatus</p>
          <p>${flat.status}</p>
        </div>
        <div class="content-row-description-roomies">
          <p>Beskæftigelse</p>
          <p>${flat.ready_move_date}</p>
        </div>
        <div class="content-row-description-roomies">
          <p>Hobby</p>
          <p>${flat.hobby}</p>
        </div>
      </div>

      <div class="roomies-description">
        <p>${flat.roomie_description}</p>
      </div>
      <button class="nav-link roomie-button" onclick="showDetailView('${flat.id}'); navigateTo('#/beskeder');">Kontakt mig</button></a>
      <div class="roomies-socials">
        <a>
        <img src="/img/Facebook.svg"/>
        </a>
        <p>${flat.member_since}</p>
        </div>
  </article>

    `;
  navigateTo("#/detailView");
  showLoader(false);
}

//Loader
function showLoader(show) {
  const loader = document.querySelector("#loader");
  if (show) {
    loader.classList.remove("hide");
  } else {
    loader.classList.add("hide");
  }
}

//Login -- Marko & Mads

function logIn() {
  const mail = document.querySelector("#login-mail").value;
  const password = document.querySelector("#login-password").value;

  if ((mail === "thilde@live.dk" && password === "123") || (mail === "emil@live.dk" && password === "123")
  ) {
    localStorage.setItem("userMail", mail);
    document.querySelector(".login-message").innerHTML = "";
    showNavigation(true);
    navigateTo("#/");

  } else {
    document.querySelector(".login-message").innerHTML =
      "Forkert e-mail eller adgangskode";
  }
}

// login out
function logOut() {
  localStorage.removeItem("userMail");
  navigateTo("#/login");
  showLoader(false);
}

//Filter flats according to log-in - Marko & Mads

//Globalt variable, så man kan tilgå resultaterne fra filterFlats i search functionen 
let _results = [];

function filterFlats() {
  const mail = localStorage.getItem("userMail");

  if (mail === "thilde@live.dk") {
    _results = _flats.filter((flat) => flat.category_tags === "Indeliv");
    console.log("Thilde loggede ind");
  } else if (mail === "emil@live.dk") {
    _results = _flats.filter((flat) => flat.category_tags === "Udeliv");
    console.log("Emil loggede ind");
  }
  console.log("Filtreret array", _results);
  appendFlats(_results);
}

//Search function - Filter flats - Marko
function search(value) {
  value = value.toLowerCase();
  let filteredeFlatResults = [];
  for (let result of _results) {
    let title = result.title.toLowerCase();
    let tags = result.tags.toString().toLowerCase();
    if (title.includes(value) || tags.includes(value)) {
      filteredeFlatResults.push(result);
      console.log(filteredeFlatResults.length);
      console.log(_results);
    } else if (filteredeFlatResults.length === 0) {
      document.getElementById("no-result").style.display = "block";
    } else {
      document.getElementById("no-result").style.display = "none";
    }
  }
  console.log(_results);
  console.log(filteredeFlatResults);
  appendFlats(filteredeFlatResults);
}


//Scroll to top on detailview - Mads
function scrollToTop() {
  window.scrollTo(0, 0);
}
