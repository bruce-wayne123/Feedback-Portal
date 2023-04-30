
var studentsListView = document.getElementById("studentsListView");

//Get students from database
async function GetStudents() {
    let studentsAPIResponse = await fetch('http://localhost:8000/students/getStudents');
    let studentsJSON = await studentsAPIResponse.json();
    let studentsList = studentsJSON.students;

    studentsList.forEach(student => {
        addToList(student);
    });
}

//Add each student in DOM list
function addToList(student) {
    const li = document.createElement("li");

    li.innerHTML = `<li>
    <div style="display:flex;justify-content: center;
                border-top: 1px solid black; border-bottom: 1px solid black; padding: 10px;width: 500px;">
                <a id=${student._id}  style="font-size: 14px;width: 35%" href="/results/${student._id}">${student.name}</a>
                <a id=${student.id}  style="font-size: 14px;width: 35%" text-decoration:none;>${student.batch}</a>
                <a id=${student.id}  style="font-size: 14px;width: 30%" text-decoration:none;>${student.college}</a>
              
                <div> 
    </li>`;
    studentsListView.append(li);
}

GetStudents();