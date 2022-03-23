// When I edit a task, if I refresh, it does not show as edited

const listOfTasks = document.querySelector("ul");
const form = document.querySelector(".addTask");
const count = document.querySelector("#count");
const submitBtn = document.querySelector("#button-addon2");

let revenge = 0;

const revengesCountUi = (count.textContent = JSON.parse(
  localStorage.getItem("revenge Count")
));

window.addEventListener(
  "load",
  (e) => (revenge = JSON.parse(localStorage.getItem("revenge Count")))
);


let tasks = [];

function addTask(task) {
  const template = `
      <li class="d-flex justify-content-between task list-group-item bg-secondary text-white" contenteditable="true" data-id="${task.id}">
       ${task.name}
        <img src="assets/icons/fire.svg" id="fire">
      </li>
    `;

  listOfTasks.innerHTML += template;
}

function handleSaveEditedTask(event) {
  // 1a. Grab what the user has typed from the screen (from the li element itself) ✅
  const modifiedText = event.currentTarget.textContent;

  // 1b. Grab the id of the task from the DOM and convert it to a number ✅
      // const targetTaskId = parseInt(event.currentTarget.dataset.id, 10);
      // const targetTaskId = Number(event.currentTarget.dataset.id);
  const targetTaskId = +event.currentTarget.dataset.id;
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
  // 2. Grab the corresponding task inside the tasks array thanks to a matching id ✅1

      // const filtredTask = tasks.filter((task) => task.id === targetTaskId)[0];
  const targetTask = tasks.find((task) => task.id === targetTaskId);

  // 3. Update that task in memory with what the user wrote ✅
  targetTask.name = modifiedText;

  // 4. Save the tasks array in the local storage
  saveToLocalStorage();

  // 5. cleanAndRender() - optional
  clearAndRender();
}

function renderTasks() {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    tasks.forEach((task) => addTask(task));
    document.querySelectorAll("[data-id]").forEach((task) => {
      task.onkeydown = (e) => {
        if (e.key === "Enter") {
          handleSaveEditedTask(e);
        }
      };
      task.onblur = handleSaveEditedTask;
    });
  }
}

function handleNewTask(event) {
  event.preventDefault();
  const task = form.add.value.trim();
  if (task) {
    tasks.push({ name: task, id: Date.now() });
    saveToLocalStorage();
    clearAndRender();
    form.reset();
  } else {
    alert("Please enter a target!");
  }
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearAndRender() {
  clearTasks(listOfTasks);
  renderTasks();
}

listOfTasks.addEventListener("click", (e) => {
  if (e.target.id === "fire") {
    // 1. Find the parent and grab its id from the dataset
    const burnParent = e.target.parentElement;
    const burnParentId = +burnParent.dataset.id;
    // 2. re-assign the tasks array in the global scope to be a filtered list of tasks with the id that you grabbed from the DOM
    tasks = tasks.filter((task) => task.id !== burnParentId);
    // 3. save to local storage
    saveToLocalStorage();
    // 4. clean and render
    clearAndRender();
    revengesCount();
    count.textContent = revenge;
  } else {
    console.log("");
  }
});

function revengesCount() {
  revenge++;
  localStorage.setItem("revenge Count", JSON.stringify(revenge));
}

function clearTasks(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// console.log(form);
form.addEventListener("submit", handleNewTask);
submitBtn.addEventListener("click", handleNewTask);

listOfTasks.addEventListener("click", (e) => {
  e.target.classList.toggle("active");
});

renderTasks();
