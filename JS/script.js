// let ul_listcontainer = document.getElementById("list_container");    
// let inputfield = document.getElementById("inputfield");    
// let taskarr = [];    

// function addTask(){
//     let textinput = inputfield.value.trim(); 
//     if (textinput === "") return;

//     let tasklist = { task: textinput, status: "Incomplete" };
//     taskarr.push(tasklist);

//     renderTasks();
//     inputfield.value = ""; 
// }

// function renderTasks() {
//     ul_listcontainer.innerHTML = ""; // clear before re-render

//     taskarr.forEach((arrtask, index) => {
//         const newdiv = document.createElement("div");
//         newdiv.className = "listelement";

//         newdiv.innerHTML = `
//             <li class="${arrtask.status === "Complete" ? "Complete" : ""}">
//                 <span class="listSpan">${arrtask.task}</span>
//             </li>
//             <button class="mark_butn" onclick="togglebutn(${index})">✔</button>
//             <button class="delete_butn" onclick="deletebutn(${index}) id="toggle"">X</button>
//         `;

//         ul_listcontainer.appendChild(newdiv);
//     });
// }

// function togglebutn(index){
//     taskarr[index].status = taskarr[index].status === "Incomplete" ? "Complete" : "Incomplete";
    
//     renderTasks();
// }

// function deletebutn(index) {
//     taskarr.splice(index, 1); // remove only that task
//     renderTasks();
// }
let ul_listcontainer = document.getElementById("list_container");
let inputfield = document.getElementById("inputfield");
let taskarr = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(taskarr));
}

function addTask() {
  let textinput = inputfield.value.trim();
  if (textinput === "") return;

  let tasklist = { task: textinput, status: "Incomplete" };
  taskarr.push(tasklist);
  saveTasks();
  renderTasks();
  inputfield.value = "";
}

function renderTasks(filter = "all") {
  ul_listcontainer.innerHTML = "";
  taskarr.forEach((arrtask, index) => {
    if (filter === "all" || arrtask.status.toLowerCase() === filter) {
      const newdiv = document.createElement("div");
      newdiv.className = "listelement";

      newdiv.innerHTML = `
        <li class="${arrtask.status === "Complete" ? "Complete" : ""}">
          <span>${arrtask.task}</span>
        </li>
        <div class="btn_group">
          <button class="mark_butn" onclick="togglebutn(${index})">✔</button>
          <button class="edit_butn" onclick="editTask(${index})">✎</button>
          <button class="delete_butn" onclick="deletebutn(${index})">X</button>
        </div>
      `;
      ul_listcontainer.appendChild(newdiv);
    }
  });
}

function togglebutn(index) {
  taskarr[index].status = taskarr[index].status === "Incomplete" ? "Complete" : "Incomplete";
  saveTasks();
  renderTasks();
}

function deletebutn(index) {
  taskarr.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  let newText = prompt("Edit your task:", taskarr[index].task);
  if (newText !== null && newText.trim() !== "") {
    taskarr[index].task = newText.trim();
    saveTasks();
    renderTasks();
  }
}

// Filters
function showAll() { renderTasks("all"); }
function showPending() { renderTasks("incomplete"); }
function showCompleted() { renderTasks("complete"); }

// Initial render
renderTasks();
