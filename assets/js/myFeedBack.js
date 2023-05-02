async function GetMyFeedBack() {
    let empId = document.getElementById("empIdLabel").value;
    let apiURL = `http://localhost:8000/feedback/getFeedBack/${empId}`;
    let feedBackResponse = await fetch(apiURL);
    let feedBackJSON = await feedBackResponse.json();
    if (feedBackJSON.message === "Feedback data") {
        let feedBack = feedBackJSON.feedback[0];
        document.getElementById("remarksLabel").innerText = feedBack.remarks;
        var chrt = document.getElementById("chartId").getContext("2d");
        var chartId = new Chart(chrt, {
            type: 'bar',
            data: {
                labels: ["Teamwork", "Communication", "Accuracy Of Work", "Attendance"],
                datasets: [{
                    label: "2022-23 Feedback",
                    data: [feedBack.teamwork, feedBack.communication, feedBack.accuracyOfWork, feedBack.attendance],
                    backgroundColor: ['yellow', 'aqua', 'pink', 'lightgreen', 'lightblue', 'gold'],
                    borderColor: ['red', 'blue', 'fuchsia', 'green', 'navy', 'black'],
                    borderWidth: 2,
                }],
            },
            options: {
                responsive: false,
            },
        });
    }
    else {
       Toastify({
            text: "No feedback data found",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "red",
            },
            onClick: function () { } // Callback after click
        }).showToast();
        
    }
}

GetMyFeedBack();
