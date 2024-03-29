logout_button = document.getElementById('logout-button');
logout_button.addEventListener("click", function (evt) {
  evt.preventDefault();
  chrome.storage.local.remove("email");
  chrome.action.setPopup({ "popup": "signin.html" });
  window.location.replace("signin.html");
});

async function getResponse() {
  //email = "f20190089@dubai.bits-pilani.ac.in"

  let email = await chrome.storage.local.get("email")
  email = email.email

  if (email === undefined || email === "" || email === null) {
    email = await getEmail();
  }

  sendURL = 'http://api.upskillr.ai:5000/history/' + email;

  return await fetch(sendURL)
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        // Examine the text in the response
        return response.json().then(function (data) {
          let loader = document.getElementById("loader")
          loader.parentElement.removeChild(loader)
          return data;
        });
      }
    )
    .catch(function (err) {
      let loader = document.getElementById("loader")
      loader.parentElement.removeChild(loader)

      updatedErrorPage = document.createElement('p')
      updatedErrorPage.style.fontSize = "15px"
      updatedErrorPage.style.textAlign = 'center'
      //updatedErrorPage.style.color = 'Red'
      updatedErrorPage.innerHTML = "Cant load history ☠️"
      document.body.append(updatedErrorPage)
      console.log('Fetch Error :-S', err);
    });
}

async function updatePage() {
  responseDataArr = await getResponse();

  //Event Functions
  function skillSelected(evt) {
    //console.log(evt.currentTarget.skillChosen);
    resp = evt.currentTarget.skillChosen
    activitiesPage = document.createElement('div');
    activitiesPage.id = "activitiesPage";
    activitiesPage.style.margin = "5%";


    heading = document.createElement('h2');
    heading.innerHTML = resp["Input Skill"];
    heading.style.display = "inline-block";
    activitiesPage.appendChild(heading);

    bkBtn = document.createElement('button');
    bkBtn.classList.add("backButton");
    bkBtn.addEventListener("click", changePage);
    bkBtn.pageCurr = activitiesPage;
    bkBtn.pageToChg = skillPageHome;
    bkBtn.innerHTML = "Back";
    activitiesPage.appendChild(bkBtn);

    activitiesPage.appendChild(document.createElement('br'))

    thingsToDoDiv = document.createElement('div');
    thingsToDoDiv.style.marginLeft = "3%";
    thingsToDoHeading = document.createElement("h2")
    thingsToDoHeading.innerHTML = "Courses"
    thingsToDoHeading.style.textDecoration = "underline";
    thingsToDoDiv.appendChild(thingsToDoHeading);


    thingsToReadDiv = document.createElement('div');
    thingsToReadDiv.style.marginLeft = "3%";
    thingsToReadHeading = document.createElement("h2")
    thingsToReadHeading.innerHTML = "Reading Material"
    thingsToReadHeading.style.textDecoration = "underline";
    thingsToReadDiv.appendChild(thingsToReadHeading);

    thingsToWatchDiv = document.createElement('div');
    thingsToWatchDiv.style.marginLeft = "3%";
    thingsToWatchHeading = document.createElement("h2")
    thingsToWatchHeading.innerHTML = "Watch List"
    thingsToWatchHeading.style.textDecoration = "underline";
    thingsToWatchDiv.appendChild(thingsToWatchHeading);

    for (let i = 0; i < Object.keys(resp).length; i++) {

      if (Object.keys(resp)[i] === "Input Skill") continue;
      if (Object.keys(resp)[i] === "Medium" && resp[Object.keys(resp)[i]] === null) continue;

      if (Object.keys(resp[Object.keys(resp)[i]]).length !== 0) {
        acti = document.createElement('h2');
        acti.innerHTML = Object.keys(resp)[i];

        acti.addEventListener("click", sourceSelected);

        placeHolder = Object.keys(resp)[i];
        acti.sourceChosen = resp[Object.keys(resp)[i]];
        acti.classList.add("linkedHeading");
        acti.sourceType = placeHolder;

        if (Object.keys(resp)[i] === "Books" || Object.keys(resp)[i] === "Medium" || Object.keys(resp)[i] === "MITOCW Resource") {
          thingsToReadDiv.appendChild(acti);
        }

        if (Object.keys(resp)[i] === "Coursera" || Object.keys(resp)[i] === "Class Central" || Object.keys(resp)[i] === "Future Learn" || Object.keys(resp)[i] === "SkillShare" || Object.keys(resp)[i] === "Udemy" || Object.keys(resp)[i] === "edX" || Object.keys(resp)[i] === "MITOCW") {
          thingsToDoDiv.appendChild(acti);
        }

        if (Object.keys(resp)[i] === "YouTube") {
          thingsToWatchDiv.appendChild(acti);
        }

        if (Object.keys(resp)[i] === "YouTube" || Object.keys(resp)[i] === "Talks"){
          thingsToWatchDiv.appendChild(acti);
      }
      }
    }

    if (thingsToDoDiv.childElementCount > 1) {
      activitiesPage.appendChild(thingsToDoDiv);
      thingsToDoDiv.appendChild(document.createElement("br"));
    }
    if (thingsToReadDiv.childElementCount > 1) {
      activitiesPage.appendChild(thingsToReadDiv);
      thingsToReadDiv.appendChild(document.createElement("br"));
    }
    if (thingsToWatchDiv.childElementCount > 1) {
      activitiesPage.appendChild(thingsToWatchDiv);
      thingsToWatchDiv.appendChild(document.createElement("br"));
    }

    document.body.removeChild(document.getElementById("skillPageHome"));
    document.body.appendChild(activitiesPage);
  }

  function sourceSelected(evt) {
    resp = evt.currentTarget.sourceChosen;
    sourcesPage = document.createElement('div');
    sourcesPage.id = "sourcesPage";
    sourcesPage.style.margin = "5%";

    heading = document.createElement('h1');
    heading.innerHTML = evt.currentTarget.sourceType;
    heading.style.display = "inline-block";
    sourcesPage.appendChild(heading);

    bkBtn = document.createElement('button');
    bkBtn.classList.add("backButton");
    bkBtn.addEventListener("click", changePage);
    bkBtn.pageCurr = sourcesPage;
    bkBtn.pageToChg = activitiesPage;
    bkBtn.innerHTML = "Back";
    sourcesPage.appendChild(bkBtn);

    sourcesPage.appendChild(document.createElement('br'))

    for (let i = 0; i < Object.keys(resp).length; i++) {

      sourceInfo = resp[Object.keys(resp)[i]]
      containerDiv = document.createElement('div');
      containerDiv.style.display = "flex";
      containerDiv.style.alignItems = "flex-start";
      containerDiv.style.justifyContent = "flex-start";

      imgDiv = document.createElement('div');
      imgDiv.style.flexBasis = "20%";
      containerDiv.appendChild(imgDiv);

      infoImg = document.createElement('img');
      infoImg.style.float = "left";
      infoImg.src = sourceInfo["Picture"];
      infoImg.width = "70"
      infoImg.height = "70"
      infoImg.maxWidth = "100%";
      imgDiv.appendChild(infoImg);

      infoDiv = document.createElement('div');
      infoDiv.style.paddingLeft = "4px";
      containerDiv.appendChild(infoDiv);

      infoHeading = document.createElement('h3')
      infoHeading.style.float = "left";
      infoDiv.appendChild(infoHeading);
      infoLink = document.createElement('a')
      infoLink.innerHTML = sourceInfo["Title"]
      infoLink.style.color = "#000000"
      infoLink.href = sourceInfo["Link"]
      infoLink.target = "_blank"
      infoLink.rel = "noopener noreferrer"
      infoHeading.appendChild(infoLink);

      if (sourceInfo["By"] !== undefined) {
        infoAuthorBy = document.createElement('h4')
        infoAuthorBy.innerHTML = sourceInfo["By"]
        infoDiv.appendChild(infoAuthorBy);
      }


      sourcesPage.appendChild(containerDiv);

    }

    document.body.removeChild(document.getElementById('activitiesPage'));
    document.body.appendChild(sourcesPage);

  }
  //Skills Found Page
  function skillsFound(evt) {
    responseData = evt.currentTarget.jobChosen;
    let skillPageHome = document.createElement('div');
    skillPageHome.id = "skillPageHome";
    skillPageHome.style.margin = "5%";

    let heading = document.createElement('h1');
    heading.innerHTML = responseData["title"] + ' - ' + responseData["company"];
    heading.style.display = "inline-block";
    skillPageHome.appendChild(heading);

    bkBtn = document.createElement('button');
    bkBtn.classList.add("backButton");
    bkBtn.addEventListener("click", changePage);
    bkBtn.pageCurr = skillPageHome;
    bkBtn.pageToChg = histPageHome;
    bkBtn.innerHTML = "Back";
    skillPageHome.appendChild(bkBtn);

    skillPageHome.appendChild(document.createElement('br'))

    for (let i = 0; i < Object.keys(responseData["Skill Set"]).length; i++) {
      skill = document.createElement('h2');
      skill.classList.add("linkedHeading");
      skill.innerHTML = responseData["Skill Set"][i]["Input Skill"];

      skill.addEventListener("click", skillSelected);
      skill.skillChosen = responseData["Skill Set"][i];
      //skill.addEventListener("mouseenter", function(){skill.style.textDecoration = "underline"});
      //skill.addEventListener("mouseleave", function(){skill.style.textDecoration = "none"});
      skillPageHome.appendChild(skill);
    }

    //jobMeta = document.createElement('div');
    skillPageHome.append(document.createElement('br'))
    jobTitle = document.createElement('h3');
    jobTitle.innerHTML = "Job Title: " + responseData["title"];
    skillPageHome.appendChild(jobTitle);

    companyName = document.createElement('h3');
    companyName.innerHTML = "Company: " + responseData["company"];
    skillPageHome.appendChild(companyName);

    minWorkEx = document.createElement('h3');
    minWorkEx.innerHTML = "Min Work Experience: " + responseData["Minimum Work Experience"] + " (in years)";
    skillPageHome.appendChild(minWorkEx);

    jobLoc = document.createElement('h3');
    jobLoc.innerHTML = "Location: " + responseData["Location"]
    skillPageHome.appendChild(jobLoc);

    glassDoor = document.createElement("a");
    glassDoor.innerHTML = "Glassdoor reviews";
    glassDoor.href = "https://www.glassdoor.com/Search/results.htm?keyword=" + responseData["company"] + "&locName=" + responseData["Location"];
    glassDoor.target = "_blank"
    glassDoor.rel = "noopener noreferrer"
    skillPageHome.appendChild(glassDoor);

    skillPageHome.appendChild(document.createElement("br"));
    skillPageHome.appendChild(document.createElement("br"));

    if (document.getElementById("activitiesPage") !== null) {
      document.body.removeChild(document.getElementById("activitiesPage"));
    }
    document.body.removeChild(document.getElementById("histPageHome"))
    document.body.appendChild(skillPageHome);
  }

  function history() {
    let histPageHome = document.createElement('div');
    histPageHome.id = "histPageHome";
    histPageHome.style.margin = "5%";

    let heading = document.createElement('h1');
    heading.innerHTML = "Your History 🧠⚡️"
    histPageHome.appendChild(heading);

    histPageHome.appendChild(document.createElement('br'))

    for (let i = 0; i < responseDataArr.length; i++) {
      hist = document.createElement('h2');
      hist.innerHTML = responseDataArr[i]["title"] + ' - ' + responseDataArr[i]["company"];
      hist.classList.add("linkedHeading")

      hist.addEventListener("click", skillsFound);
      hist.jobChosen = responseDataArr[i];
      //skill.addEventListener("mouseenter", function(){skill.style.textDecoration = "underline"});
      //skill.addEventListener("mouseleave", function(){skill.style.textDecoration = "none"});
      histPageHome.appendChild(hist);
    }

    document.body.appendChild(histPageHome);
  }

  function changePage(evt) {
    document.body.removeChild(evt.currentTarget.pageCurr);
    document.body.appendChild(evt.currentTarget.pageToChg);
  }

  history();
}

updatePage()