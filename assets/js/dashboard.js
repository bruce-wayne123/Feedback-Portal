
var employeesListView = document.getElementById("employeesListView");

//Get employees from database
async function GetEmployees() {
    let employeesAPIResponse = await fetch('http://localhost:8000/employee/getEmployees');
    let employeesJSON = await employeesAPIResponse.json();
    let filterlist = employeesJSON.employees.filter(employee => employee.name !== 'admin');
    let employeesList = filterlist;
    employeesList.forEach(employee => {
        addToList(employee);
    });
}

//Add each employee in DOM list
function addToList(employee) {
    const li = document.createElement("li");

    li.innerHTML = `<li>
    <div style="display:flex;justify-content: center;
                border-top: 1px solid black; border-bottom: 1px solid black; padding: 10px;width: 500px;">
                <a id=${employee._id}  style="font-size: 14px;width:22.5%" href="/employee/updateEmployee/${employee._id}">${employee.employeeId}</a>
                <a id=${employee._id}  style="font-size: 14px;width: 22.5%" text-decoration:none;>${employee.name}</a>
                <a id=${employee._id}  style="font-size: 14px;width: 22.5%" text-decoration:none;>${employee.department}</a>
                <a id=${employee._id}  style="font-size: 14px;width: 22.5%" text-decoration:none;>${employee.location}</a>
                <a id=${employee._id}  style="font-size: 14px;width:10%" href="/employee/deleteEmployee/${employee._id}"> <i class="fa-sharp fa-solid fa-trash" style="color: red"></i>   </a>
                       
                <div> 
    </li>`;
    employeesListView.append(li);
}

GetEmployees();