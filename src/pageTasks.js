import variable from "./variable.js";

// document.addEventListener("DOMContentLoaded", () => {
let currentTaskId = null;

function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  variable.shortTaskList.innerHTML =
    '<p class="shortHeaderListTask">My Tasks</p>';
  if (storedTasks) {
    const tasks = JSON.parse(storedTasks);
    if (tasks.length > 0) {
      tasks.forEach((task) => createTaskElement(task));
      variable.myTaskShortArticle.style.display = "flex";
    } else {
      hideTaskArticle();
    }
  } else {
    hideTaskArticle();
  }
}

function hideTaskArticle() {
  variable.myTaskShortArticle.style.display = "none";
  variable.taskFullInfo.innerHTML = "";
}

function createTaskElement(task) {
  const taskComponent = `
      <div class="exampleTask" data-id="${task.id}">
        <div class="taskShortInfo">
          <h2>${task.title}</h2>
          <span class="shortText">${task.text}</span>
        </div>
        <img src="../public/images/DALL·E\ 2025-01-30\ 22.05.38\ -\ A\ simple\ digital\ illustration\ representing\ unfinished\ tasks.\ The\ image\ features\ a\ to-do\ list\ with\ unchecked\ boxes\ and\ a\ clock\ indicating\ urgency.\ The\ .webp" alt="Task illustration">
      </div>
    `;
  variable.shortTaskList.insertAdjacentHTML("beforeend", taskComponent);
}

function createFullTaskComponent(task) {
  const fullTaskComponent = `
      <div class="fullComponent">
        <img src="../public/images/DALL·E\ 2025-01-30\ 22.05.38\ -\ A\ simple\ digital\ illustration\ representing\ unfinished\ tasks.\ The\ image\ features\ a\ to-do\ list\ with\ unchecked\ boxes\ and\ a\ clock\ indicating\ urgency.\ The\ .webp" alt="Task illustration"/>
        <h1>${task.title}</h1>
      </div>
      <p>
        <b>TASK DESCRIPTION:</b> <br />
        ${task.text}
      </p>
      <div class="taskButtons">
        <img src="../public/svg/Group 87.svg" alt="" id="buttonDoneTask"/>
        <img src="../public/svg/Group 86.svg" alt="" id="buttonDeleteTask"/>
      </div>
    `;
  variable.taskFullInfo.innerHTML = fullTaskComponent;
  currentTaskId = task.id;

  const buttonDeleteTask = document.getElementById("buttonDeleteTask");
  buttonDeleteTask.addEventListener("click", deleteTask);
}

function deleteTask() {
  if (currentTaskId) {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks = tasks.filter((task) => task.id !== currentTaskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
    currentTaskId = null;
  }
}

variable.shortTaskList.addEventListener("click", (event) => {
  const taskElement = event.target.closest(".exampleTask");
  if (taskElement) {
    const taskId = taskElement.dataset.id;
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const selectedTask = tasks.find((task) => task.id === taskId);
    if (selectedTask) {
      createFullTaskComponent(selectedTask);
    }
  }
});

function addDoneTask() {
  variable.buttonDoneTask.addEventListener("click", () => {
    variable.shortFinishedTask.insertAdjacentHTML("beforeend", taskComponent);
  });
}

loadTasks();
// });

export default loadTasks;
