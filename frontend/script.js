const API = "http://localhost:3000/tasks";

// Fetch tasks from backend
async function fetchTasks() {
  const res = await fetch(API);
  const data = await res.json();

  const list = document.getElementById("taskList");
  list.innerHTML = "";

  data.forEach((task, index) => {
    let li = document.createElement("li");
    li.textContent = task;

    let btn = document.createElement("button");
    btn.textContent = "Delete";

    btn.onclick = async () => {
      await fetch(`${API}/${index}`, { method: "DELETE" });
      fetchTasks();
    };

    li.appendChild(btn);
    list.appendChild(li);
  });
}

// Add task to backend
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

// Load tasks on page load
fetchTasks();