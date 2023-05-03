var feedbacksListView = document.getElementById("feedbacksListView");
//Get employees from database
async function GetFeedbacks() {
    let feedbackAPIResponse = await fetch('http://localhost:8000/feedback/getAllFeedBacks');
    let feedbackJSON = await feedbackAPIResponse.json();
    let feedbackList = feedbackJSON.feedbacks;
    feedbackList.forEach(feedback => {
        addToList(feedback);
    });
}

//Add each feedback in DOM list
function addToList(feedback) {
    console.log(feedback);
    const li = document.createElement("li");

    li.innerHTML = `<li>
                <div style="display:flex; flex-direction: column; 
border: 1px solid black; width: 800px; height: 100%; margin-top: 10px;">
        <div style="display:flex;justify-content: center;padding: 10px;width: 800px; ">
            <a style="font-size: 14px;width: 18%" href="/feedback/feedbackDetails/${feedback._id}">${feedback.employeeName}</a>
            <label style="font-size: 14px;width: 18%">${feedback.teamwork}</label>
            <label style="font-size: 14px;width: 18%">${feedback.communication}</label>
            <label style="font-size: 14px;width: 18%">${feedback.accuracyOfWork}</label>
            <label style="font-size: 14px;width: 18%">${feedback.attendance}</label>    
            <a id=${feedback._id}  style="font-size: 14px;width:10%" href="/feedback/deleteFeedBack/${feedback._id}"> <i class="fa-sharp fa-solid fa-trash" style="color: red"></i>   </a>
        </div>
        </div>
    </li>`;
    feedbacksListView.append(li);
}
GetFeedbacks();