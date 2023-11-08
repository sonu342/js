const addTaskBtn = document.getElementById("addTask");
const taskTextField = document.getElementById("task");
const recordsDisplay =document.getElementById('record')
const btnText = addTaskBtn.innerText;

let taskArray = [];
let edit_id=null


//validate

// get data
let objstr = localStorage.getItem("tasks");
// console.log(objstr)
if (objstr != null) {
  // console.log(objstr)
  taskArray = JSON.parse(objstr); //to convert string into object
}
// taskArray=JSON.parse(objstr)    //to convert string into object
// console.log(taskArray)
displayInfo();

addTaskBtn.onclick = () => {
  const task = taskTextField.value;
  if(edit_id !=null){
    taskArray.splice(edit_id,1,{'taskName':task})
     edit_id = null;
  }else{
             taskArray.push({ 'taskName': task });
  }
  
  // console.log(taskArray)
  saveTask(taskArray);

  taskTextField.value=''
   addTaskBtn.innerText=btnText
};
function saveTask(taskArray) {
  // console.log(taskArray)
  let str = JSON.stringify(taskArray); //to convert  object into string
  // console.log(str)
  localStorage.setItem("tasks", str);
  displayInfo()
}

function displayInfo() {
  let data = "";
  taskArray.forEach((user, i) => {
    //    console.log(user);
    data += `<tr>
           <th scope="row">${i + 1}</th>
           <td>${user.taskName}</td>
           <td><i class="btn text-white fa fa-edit btn-info mx-2" onclick='EditInfo(${i})'></i> 
           <i class="btn btn-danger text-white fa fa-trash" onclick='DeleteInfo(${i})'></i>
           </td>
         </tr>`;
  });

  recordsDisplay.innerHTML = data
//   console.log(data);
}

function DeleteInfo(id){
    taskArray.splice(id,1)
    saveTask(taskArray)
}
function EditInfo(id){
  //alert(id)
  edit_id=id
  taskTextField.value = taskArray[id].taskName
  addTaskBtn.innerText = 'Updated Task'
}