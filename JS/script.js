// Initialize tasks array from localStorage, or use an empty array if none exists
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Current filter type for displaying tasks (all, pending, completed)
let currentFilter = "all";

// Save tasks to localStorage (avoids repetition)
function saveTasks() {
  // Convert tasks array into JSON string and store in localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render tasks to the UI
function renderTasks() {
  // Get the task list container
  const list = document.getElementById("taskList");

  // Clear existing list items before re-rendering
  list.innerHTML = "";

  // Filter tasks based on currentFilter and display them
  tasks
    .filter((task) => {
      if (currentFilter === "all") return true;
      return task.status === currentFilter;
    })
    .forEach((task, index) => {
      const li = document.createElement("li");
      li.className = "task-item";

      // Task text
      const span = document.createElement("div");
      span.className = "task-text";
      span.textContent = task.name;

      // Add "completed" style if task is completed
      if (task.status === "completed") span.classList.add("completed");
      li.appendChild(span);

      // Show datetime if available
      if (task.datetime) {
        const meta = document.createElement("div");
        meta.className = "task-meta";
        meta.textContent = "⏰ " + task.datetime;
        li.appendChild(meta);
      }

      // Action buttons (Edit, Complete, Delete)
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

      // Append buttons to actions container
      actions.appendChild(editBtn);
      actions.appendChild(completeBtn);
      actions.appendChild(deleteBtn);

      // Append actions to task item
      li.appendChild(actions);

      // Append task item to list
      list.appendChild(li);
    });
}

// Add a new task
function addTask() {
  const input = document.getElementById("taskInput");
  const dateTime = document.getElementById("taskDateTime").value;

  // Trim whitespace from input value
  const name = input.value.trim();

  // Prevent adding empty tasks
  if (name === "") return;

  // Add new task object to tasks array
  tasks.push({ name, status: "pending", datetime: dateTime });

  // Clear input fields after adding task
  input.value = "";
  document.getElementById("taskDateTime").value = "";

  // Save and re-render tasks
  saveTasks();
  renderTasks();
}

// Toggle task status between pending and completed
function toggleStatus(index) {
  tasks[index].status =
    tasks[index].status === "pending" ? "completed" : "pending";
  saveTasks();
  renderTasks();
}

// Delete a task with fade-out animation
function deleteTask(index, element) {
  element.classList.add("fade-out");
  setTimeout(() => {
    tasks.splice(index, 1); // Remove task from array
    saveTasks();
    renderTasks();
  }, 400);
}

// Edit an existing task
function editTask(index) {
  const newName = prompt("Edit task name:", tasks[index].name);
  const newDateTime = prompt(
    "Edit date/time (YYYY-MM-DDTHH:MM):",
    tasks[index].datetime || ""
  );

  // Update task name if valid
  if (newName !== null && newName.trim() !== "") {
    tasks[index].name = newName.trim();
  }

  // Update task datetime if valid
  if (newDateTime !== null && newDateTime.trim() !== "") {
    tasks[index].datetime = newDateTime.trim();
  }

  saveTasks();
  renderTasks();
}

// Change filter type and re-render tasks
function filterTasks(type) {
  currentFilter = type;
  renderTasks();
}

// Toggle between dark and light theme
function toggleTheme() {
  document.body.classList.toggle("dark");
  const btn = document.getElementById("themeBtn");
  btn.textContent = document.body.classList.contains("dark") ? "🌙" : "☀️";
}

// Initial render
renderTasks();
