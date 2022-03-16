const list = document.querySelector("ul");
const form = document.querySelector(".addTask");
const count = document.querySelector('#count')
let revengesCount = 0;

// count.textContent = revengesCount;

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
    e.target.classList.toggle("active")
});

list.addEventListener('click', e => {
   if (e.target.id === 'fire') {
       e.target.parentElement.remove();
        revengesCount++;
        count.textContent = revengesCount;
   } else {
       console.log('')
   }
});


form.addEventListener("submit", handleNewTask);