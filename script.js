const listOfTasks = document.querySelector("ul");
const form = document.querySelector(".addTask");
const count = document.querySelector("#count");

let revengesCount = 0;

const tasks = [{
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
        <span>${task.name}</span> 
        <img src="assets/icons/fire.svg" id="fire">
      </li>
    `;

    listOfTasks.innerHTML += template;
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

listOfTasks.addEventListener("click", (e) => {
    if (e.target.id === "fire") {
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

listOfTasks.addEventListener("click", (e) => {
    e.target.classList.toggle("active");
});

renderTasks();