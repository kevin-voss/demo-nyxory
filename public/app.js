const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

async function fetchTodos() {
  const response = await fetch("/api/todos");
  if (!response.ok) throw new Error("Failed to load todos");
  return response.json();
}

function renderTodos(todos) {
  todoList.innerHTML = "";

  if (todos.length === 0) {
    const empty = document.createElement("li");
    empty.className = "todo-empty";
    empty.textContent = "No todos yet. Add one above.";
    todoList.appendChild(empty);
    return;
  }

  for (const todo of todos) {
    const item = document.createElement("li");
    item.className = `todo-item${todo.done ? " done" : ""}`;
    item.dataset.id = todo.id;

    const title = document.createElement("span");
    title.className = "todo-title";
    title.textContent = todo.title;

    const actions = document.createElement("div");
    actions.className = "todo-actions";

    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.textContent = todo.done ? "Undo" : "Done";
    toggleBtn.addEventListener("click", () => toggleTodo(todo.id, !todo.done));

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

    actions.append(toggleBtn, deleteBtn);
    item.append(title, actions);
    todoList.appendChild(item);
  }
}

async function loadTodos() {
  const todos = await fetchTodos();
  renderTodos(todos);
}

async function addTodo(title) {
  const response = await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!response.ok) throw new Error("Failed to add todo");
  return response.json();
}

async function toggleTodo(id, done) {
  const response = await fetch(`/api/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ done }),
  });
  if (!response.ok) throw new Error("Failed to update todo");
  await loadTodos();
}

async function deleteTodo(id) {
  const response = await fetch(`/api/todos/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Failed to delete todo");
  await loadTodos();
}

todoForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = todoInput.value.trim();
  if (!title) return;

  await addTodo(title);
  todoInput.value = "";
  await loadTodos();
});

loadTodos().catch((error) => {
  console.error(error);
  todoList.innerHTML = '<li class="todo-empty">Could not load todos.</li>';
});
