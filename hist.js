async function getResponse() {
    email = "f20190089@dubai.bits-pilani.ac.in"
    sendURL = 'http://127.0.0.1:5000/phase3/' + email

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
                    return data;
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

async function updatePage() {
    responseDataArr = await getResponse();
    //skillsSetLenght = responseData["skill_set"].length
    for (let i = 0; i < responseDataArr.length; i++) {
        responseData = responseDataArr[i];
        job = document.createElement("details");
        jobSummary = document.createElement("summary");
        jobSummary.innerHTML = responseDataArr[i]["company_title"];
        jobSummary.style.fontSize = "16px"
        jobSummary.style.fontWeight = "bold"
        job.append(jobSummary);
        document.body.append(job);

        for (let i = 0; i < responseData["skill_set"].length; i++) {
            skill = document.createElement('details')
            skillSummary = document.createElement('summary')
            skillSummary.innerHTML = responseData["skill_set"][i]["Input Skill"]
            skillSummary.style.fontSize = "16px"
            //skillSummary.style.fontIndent = "1em"
            skill.appendChild(skillSummary)
            job.appendChild(skill)

            detailsEle = document.createElement('details');
            detailsEleSummary = document.createElement('summary');
            detailsEleSummary.innerHTML = "Books to Read"
            detailsEleSummary.style.fontSize = "14px"
            detailsEleSummary.style.textIndent = "1em"
            detailsEle.appendChild(detailsEleSummary)
            skill.appendChild(detailsEle)

            ele = document.createElement('li');
            ele.innerHTML = responseData["skill_set"][i]["Things to Read"]["Books"]["Book 1"]["Book Title"] + ' by ' + responseData["skill_set"][i]["Things to Read"]["Books"]["Book 1"]["Authors"][0];
            ele.style.textIndent = "2em";
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Read"]["Books"]["Book 2"]["Book Title"] + ' by ' + responseData["skill_set"][i]["Things to Read"]["Books"]["Book 2"]["Authors"][0];
            ele.style.textIndent = "2em";
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Read"]["Books"]["Book 3"]["Book Title"] + ' by ' + responseData["skill_set"][i]["Things to Read"]["Books"]["Book 3"]["Authors"][0];
            ele.style.textIndent = "2em";
            detailsEle.appendChild(ele);

            detailsEle = document.createElement('details');
            detailsEleSummary = document.createElement('summary');
            detailsEleSummary.innerHTML = "Magazines to Read"
            detailsEleSummary.style.fontSize = "14px"
            detailsEleSummary.style.textIndent = "1em"
            detailsEle.appendChild(detailsEleSummary)
            skill.appendChild(detailsEle)

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Read"]["Magazines"]["Magazine 1"]["Magazine Title"] + " (" + responseData["skill_set"][i]["Things to Read"]["Magazines"]["Magazine 1"]["Publish Date"] + ")"
            ele.style.textIndent = "2em";
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Read"]["Magazines"]["Magazine 2"]["Magazine Title"] + " (" + responseData["skill_set"][i]["Things to Read"]["Magazines"]["Magazine 2"]["Publish Date"] + ")";
            ele.style.textIndent = "2em";
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Read"]["Magazines"]["Magazine 3"]["Magazine Title"] + " (" + responseData["skill_set"][i]["Things to Read"]["Magazines"]["Magazine 3"]["Publish Date"] + ")"
            ele.style.textIndent = "2em";
            detailsEle.appendChild(ele);

            detailsEle = document.createElement('details');
            detailsEleSummary = document.createElement('summary');
            detailsEleSummary.innerHTML = "EdX Courses"
            detailsEleSummary.style.fontSize = "14px"
            detailsEleSummary.style.textIndent = "1em"
            detailsEle.appendChild(detailsEleSummary)
            skill.appendChild(detailsEle)

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["edX"]["Course 1"]["Course Title"] + " by " + responseData["skill_set"][i]["Things to Do"]["edX"]["Course 1"]["Offered By"];
            ele.style.textIndent = "2em";
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["edX"]["Course 2"]["Course Title"] + " by " + responseData["skill_set"][i]["Things to Do"]["edX"]["Course 2"]["Offered By"];
            ele.style.textIndent = "2em";
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["edX"]["Course 3"]["Course Title"] + " by " + responseData["skill_set"][i]["Things to Do"]["edX"]["Course 3"]["Offered By"];
            ele.style.textIndent = "2em";
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["edX"]["Program 1"]["Course Title"] + " by " + responseData["skill_set"][i]["Things to Do"]["edX"]["Program 1"]["Offered By"];
            ele.style.textIndent = "2em";
            detailsEle.appendChild(ele)

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["edX"]["Program 2"]["Course Title"] + " by " + responseData["skill_set"][i]["Things to Do"]["edX"]["Program 2"]["Offered By"];
            ele.style.textIndent = "2em";
            detailsEle.appendChild(ele)

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["edX"]["Program 3"]["Course Title"] + " by " + responseData["skill_set"][i]["Things to Do"]["edX"]["Program 3"]["Offered By"];
            ele.style.textIndent = "2em";
            detailsEle.appendChild(ele)

            detailsEle = document.createElement('details');
            detailsEleSummary = document.createElement('summary');
            detailsEleSummary.innerHTML = "Udemy Courses"
            detailsEleSummary.style.fontSize = "14px"
            detailsEleSummary.style.textIndent = "1em"
            detailsEle.appendChild(detailsEleSummary)
            skill.appendChild(detailsEle)

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["Udemy"]["Course 1"]["Course Title"] + " by " + responseData["skill_set"][i]["Things to Do"]["Udemy"]["Course 1"]["Instructor"];
            ele.style.textIndent = "2em";
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["Udemy"]["Course 2"]["Course Title"] + " by " + responseData["skill_set"][i]["Things to Do"]["Udemy"]["Course 2"]["Instructor"];
            ele.style.textIndent = "2em";
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["Udemy"]["Course 3"]["Course Title"] + " by " + responseData["skill_set"][i]["Things to Do"]["Udemy"]["Course 3"]["Instructor"];
            ele.style.textIndent = "2em";
            detailsEle.appendChild(ele);

            detailsEle = document.createElement('details');
            detailsEleSummary = document.createElement('summary');
            detailsEleSummary.innerHTML = "Coursera"
            detailsEleSummary.style.fontSize = "14px"
            detailsEleSummary.style.textIndent = "1em"
            detailsEle.appendChild(detailsEleSummary)
            skill.appendChild(detailsEle)

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["Coursera"]["Course 1"]["Course Title"] + " (" + responseData["skill_set"][i]["Things to Do"]["Coursera"]["Course 1"]["Type"] + ")";
            ele.style.textIndent = "2em";
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["Coursera"]["Course 2"]["Course Title"] + " (" + responseData["skill_set"][i]["Things to Do"]["Coursera"]["Course 2"]["Type"] + ")";
            ele.style.textIndent = "2em";
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["Coursera"]["Course 3"]["Course Title"] + " (" + responseData["skill_set"][i]["Things to Do"]["Coursera"]["Course 3"]["Type"] + ")";
            ele.style.textIndent = "2em";
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["Coursera"]["Course 4"]["Course Title"] + " (" + responseData["skill_set"][i]["Things to Do"]["Coursera"]["Course 4"]["Type"] + ")";
            ele.style.textIndent = "2em";
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["Coursera"]["Course 5"]["Course Title"] + " (" + responseData["skill_set"][i]["Things to Do"]["Coursera"]["Course 5"]["Type"] + ")";
            ele.style.textIndent = "2em";
            detailsEle.appendChild(ele);

            detailsEle = document.createElement('details');
            detailsEleSummary = document.createElement('summary');
            detailsEleSummary.innerHTML = "Future Learn Courses"
            detailsEleSummary.style.fontSize = "14px"
            detailsEleSummary.style.textIndent = "1em"
            detailsEle.appendChild(detailsEleSummary)
            skill.appendChild(detailsEle)
        
            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["Future Learn"]["Course 1"]["Course Title"] 
            ele.style.textIndent = "2em"
            detailsEle.appendChild(ele);
        
            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["Future Learn"]["Course 2"]["Course Title"] 
            ele.style.textIndent = "2em"
            detailsEle.appendChild(ele);
        
            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["Future Learn"]["Course 3"]["Course Title"] 
            ele.style.textIndent = "2em"
            detailsEle.appendChild(ele);
        
            detailsEle = document.createElement('details');
            detailsEleSummary = document.createElement('summary');
            detailsEleSummary.innerHTML = "Swayam Courses"
            detailsEleSummary.style.fontSize = "14px"
            detailsEleSummary.style.textIndent = "1em"
            detailsEle.appendChild(detailsEleSummary)
            skill.appendChild(detailsEle)
        
            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["Swayam"]["Course 1"]["Course Title"] + " by " + responseData["skill_set"][i]["Things to Do"]["Swayam"]["Course 1"]["Instructor"]
            ele.style.textIndent = "2em"
            detailsEle.appendChild(ele);
        
            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["Swayam"]["Course 2"]["Course Title"] + " by " + responseData["skill_set"][i]["Things to Do"]["Swayam"]["Course 2"]["Instructor"]
            ele.style.textIndent = "2em"
            detailsEle.appendChild(ele);
        
            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["Swayam"]["Course 3"]["Course Title"] + " by " + responseData["skill_set"][i]["Things to Do"]["Swayam"]["Course 3"]["Instructor"]
            ele.style.textIndent = "2em"
            detailsEle.appendChild(ele);
        
            detailsEle = document.createElement('details');
            detailsEleSummary = document.createElement('summary');
            detailsEleSummary.innerHTML = "ClassCentral Courses"
            detailsEleSummary.style.fontSize = "14px"
            detailsEleSummary.style.textIndent = "1em"
            detailsEle.appendChild(detailsEleSummary)
            skill.appendChild(detailsEle)
        
            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["Class Central"]["Course 1"]["Course Title"] + " by " + responseData["skill_set"][i]["Things to Do"]["Class Central"]["Course 1"]["By"]
            ele.style.textIndent = "2em"
            detailsEle.appendChild(ele);
        
            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["Class Central"]["Course 2"]["Course Title"] + " by " + responseData["skill_set"][i]["Things to Do"]["Class Central"]["Course 2"]["By"]
            ele.style.textIndent = "2em"
            detailsEle.appendChild(ele);
        
            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["Class Central"]["Course 3"]["Course Title"] + " by " + responseData["skill_set"][i]["Things to Do"]["Class Central"]["Course 3"]["By"]
            ele.style.textIndent = "2em"
            detailsEle.appendChild(ele);

            detailsEle = document.createElement('details');
            detailsEleSummary = document.createElement('summary');
            detailsEleSummary.innerHTML = "Youtube Videos"
            detailsEleSummary.style.fontSize = "14px"
            detailsEleSummary.style.textIndent = "1em"
            detailsEle.appendChild(detailsEleSummary)
            skill.appendChild(detailsEle)

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Watch"]["Video 1"]["Video Title"] + " by " + responseData["skill_set"][i]["Things to Watch"]["Video 1"]["Channel Name"];
            ele.style.textIndent = "2em";
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Watch"]["Video 2"]["Video Title"] + " by " + responseData["skill_set"][i]["Things to Watch"]["Video 2"]["Channel Name"];
            ele.style.textIndent = "2em";
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Watch"]["Video 3"]["Video Title"] + " by " + responseData["skill_set"][i]["Things to Watch"]["Video 3"]["Channel Name"];
            ele.style.textIndent = "2em";
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Watch"]["Video 4"]["Video Title"] + " by " + responseData["skill_set"][i]["Things to Watch"]["Video 4"]["Channel Name"];
            ele.style.textIndent = "2em";
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Watch"]["Video 5"]["Video Title"] + " by " + responseData["skill_set"][i]["Things to Watch"]["Video 5"]["Channel Name"];
            ele.style.textIndent = "2em";
            detailsEle.appendChild(ele);
        }
    }
}

//async function mainFunc(){
//  await updatePage()
//}

updatePage()