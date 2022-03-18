const listOfTasks = document.querySelector("ul");
const form = document.querySelector(".addTask");
const count = document.querySelector("#count");
const submitBtn = document.querySelector("#button-addon2");

let revengesCount = 0;

const tasks = [
  {
    name: "Find a person",
  },
  {
    name: "Make him/her pay! Online",
  },
  {
    name: "But not in real live",
  },
];

function addTask(task) {
  const template = `
      <li class="task">
        ${task.name}
        <img src="assets/icons/fire.svg" id="fire">
      </li>
    `;

  listOfTasks.innerHTML += template;
  //added
  //   tasks.push(`{name: ${task.name}}`);
}

function renderTasks() {
  tasks.forEach((task) => addTask(task));
}

function handleNewTask(event) {
  event.preventDefault();
  const task = form.add.value.trim();
  if (task) {
    tasks.push({ name: task });
    clearAndRender();
    form.reset();
  } else {
    alert("Please enter a target!");
  }
}

function clearAndRender() {
  clearTasks(listOfTasks);
  renderTasks();
}

//added

function removeFromTasks(e) {
  const index = tasks.splice(
    tasks.indexOf((task) => task.name === e.target.parentElement.textContent),
    1
  );
}

//end

listOfTasks.addEventListener("click", (e) => {
  if (e.target.id === "fire") {
    removeFromTasks(e);
    e.target.parentElement.remove();
    revengesCount++;
    count.textContent = revengesCount;
  } else {
    console.log("");
  }
});

function clearTasks(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

console.log(form);
form.addEventListener("submit", handleNewTask);
submitBtn.addEventListener("click", handleNewTask);

listOfTasks.addEventListener("click", (e) => {
  e.target.classList.toggle("active");
});

renderTasks();
