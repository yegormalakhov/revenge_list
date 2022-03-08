const list = document.querySelector("ul");
const form = document.querySelector(".addTask");


function addTask(task) {
    const template = `<li class="task">
        <span>${task}</span> 
        <img src="assets/icons/fire.svg" id="fire">
      </li>`;

    list.innerHTML += template;
}

addTask("Find a person");
addTask("Make him/her pay! Online");
addTask("But not in real live");


function handleNewTask(event) {
    event.preventDefault();
    if (form.add.value.trim()) {
        addTask(form.add.value.trim());
        activeClass();
        taskInput = "";
    } else {
        alert("Please enter a target!");
    }
};

const activeClass = list.addEventListener('click', e => {
    e.target.parentElement.classList.toggle("active")
});

form.addEventListener("submit", handleNewTask);