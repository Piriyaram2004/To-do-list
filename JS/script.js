let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  tasks
    .filter((task) => {
      if (currentFilter === "all") return true;
      return task.status === currentFilter;
    })
    .forEach((task, index) => {
      const li = document.createElement("li");
      li.className = "task-item";
      const span = document.createElement("div");
      span.className = "task-text";
      span.textContent = task.name;
      if (task.status === "completed") span.classList.add("completed");
      li.appendChild(span);
      if (task.datetime) {
        const meta = document.createElement("div");
        meta.className = "task-meta";
        meta.textContent = "⏰ " + task.datetime;
        li.appendChild(meta);
      }
      const actions = document.createElement("div");
      actions.className = "task-actions";
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.onclick = () => editTask(index);
      const completeBtn = document.createElement("button");
      completeBtn.textContent = "✔";
      completeBtn.onclick = () => toggleStatus(index);
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "🗑";
      deleteBtn.onclick = () => deleteTask(index, li);
      actions.appendChild(editBtn);
      actions.appendChild(completeBtn);
      actions.appendChild(deleteBtn);
      li.appendChild(actions);
      list.appendChild(li);
    });
}
function addTask() {
  const input = document.getElementById("taskInput");
  const dateTime = document.getElementById("taskDateTime").value;
  const name = input.value.trim();
  if (name === "") return;
  tasks.push({ name, status: "pending", datetime: dateTime });
  input.value = "";
  document.getElementById("taskDateTime").value = "";
  saveTasks();
  renderTasks();
}
function toggleStatus(index) {
  tasks[index].status =
    tasks[index].status === "pending" ? "completed" : "pending";
  saveTasks();
  renderTasks();
}
function deleteTask(index, element) {
  element.classList.add("fade-out");
  setTimeout(() => {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }, 400);
}
function editTask(index) {
  const newName = prompt("Edit task name:", tasks[index].name);
  const newDateTime = prompt(
    "Edit date/time (YYYY-MM-DDTHH:MM):",
    tasks[index].datetime || "",
  );
  if (newName !== null && newName.trim() !== "") {
    tasks[index].name = newName.trim();
  }
  if (newDateTime !== null && newDateTime.trim() !== "") {
    tasks[index].datetime = newDateTime.trim();
  }
  saveTasks();
  renderTasks();
}
function filterTasks(type) {
  currentFilter = type;
  renderTasks();
}
function toggleTheme() {
  document.body.classList.toggle("dark");
  const btn = document.getElementById("themeBtn");
  btn.textContent = document.body.classList.contains("dark") ? "🌙" : "☀️";
}
renderTasks();
