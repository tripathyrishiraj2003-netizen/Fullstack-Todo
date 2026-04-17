const API = "http://localhost:3000/tasks";

// Fetch tasks
async function fetchTasks() {
  const res = await fetch(API);
  const data = await res.json();

  const list = document.getElementById("taskList");
  list.innerHTML = "";

  data.forEach((task, index) => {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = task;

    // Mark as complete
    span.onclick = () => {
      span.style.textDecoration = "line-through";
      span.style.color = "gray";
    };

    let btn = document.createElement("button");
    btn.textContent = "Delete";

    btn.onclick = async () => {
      await fetch(`${API}/${index}`, { method: "DELETE" });
      fetchTasks();
    };

    li.appendChild(span);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

// Add task
async function addTask() {
  let input = document.getElementById("taskInput");

  if (input.value === "") return;

  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ task: input.value })
  });

  input.value = "";
  fetchTasks();
}

// Load tasks
fetchTasks();