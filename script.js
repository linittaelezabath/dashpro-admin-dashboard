const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});


// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})

const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})

if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}

window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})

const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("salesChart");

  if (!canvas) {
    console.error("Canvas not found");
    return;
  }

  const ctx = canvas.getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [{
        label: "Sales",
        data: [120, 190, 300, 250, 220, 320, 400],
        borderWidth: 2,
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
});

// TODO LIST
const todoText = document.getElementById("todoText");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const todoEmpty = document.getElementById("todoEmpty");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function updateUI() {
  const activeCount = todos.filter(t => !t.completed).length;
  todoCount.textContent = `${activeCount} ${activeCount === 1 ? 'task' : 'tasks'} left`;

  if (todos.length === 0) {
    todoEmpty.style.display = "flex";
    todoList.style.display = "none";
  } else {
    todoEmpty.style.display = "none";
    todoList.style.display = "block";
  }
}
function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    
    if (todo.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
      <button class="todo-check" onclick="toggleTodo(${index})">
        ${todo.completed ? "<i class='bx bx-check-circle'></i>" : "<i class='bx bx-radio-circle'></i>"}
      </button>
      <span class="todo-text">${todo.text}</span>
      <button class="delete-btn" onclick="deleteTodo(${index})">
        <i class='bx bx-trash'></i>
      </button>
    `;

    todoList.appendChild(li);
  });

  updateUI();
}

addTodoBtn.addEventListener("click", () => {
  const text = todoText.value.trim();
  if (text === "") return;

  todos.push({
    text: text,
    completed: false
  });

  todoText.value = "";
  todoText.focus();
  saveTodos();
  renderTodos();
});

todoText.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodoBtn.click();
});

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

renderTodos();
