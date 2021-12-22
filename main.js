let todoTask = document.getElementById("todoTask");
let todoDate = document.getElementById("dateOfTask");
let todoTime = document.getElementById("timeOfTask");
let todoList = document.getElementById("todoList");

function saveCardInUI() {
    let saveTask = JSON.parse(localStorage.getItem("tasks"));

    if(saveTask != null) {
        for(let i = 0; i < saveTask.length; i++) {
            addTaskCard(saveTask[i]);
        } 
    }
}

saveCardInUI();

function onClickAdd() {
    try {
        clearAllFields();
        validateInputs();
        save();
    } catch(e) {
        let message = document.getElementById("errorsDiv");
        message.innerHTML = e.message;
    }
}

function cleanInputs() {
    todoTask.value = "";
    todoDate.value = "";
    todoTime.value = "";
}

function clearAllFields() {
    cleanErrorBorder("todoTask");
    cleanErrorBorder("dateOfTask");
    cleanErrorBorder("timeOfTask");
    cleanErrorMessage();

}

function addTaskCard(task) {
    let taskValue = task.userTask;
    let dateValue = task.date;
    let timeValue = task.time;

    let todoDiv = document.createElement("div");
    todoDiv.setAttribute("class", "todo-card");
    todoList.append(todoDiv);

    let taskDiv = document.createElement("div");
    taskDiv.setAttribute("class", "task");
    taskDiv.append(taskValue);

    todoDiv.append(taskDiv);

    let dateDiv = document.createElement("div");
    dateDiv.setAttribute("class", "date-task");
    dateDiv.append(dateValue);

    let timeDiv = document.createElement("div");
    timeDiv.setAttribute("class", "time-task");
    timeDiv.append(timeValue);

    let dateAndTimeDiv = document.createElement("div");
    dateAndTimeDiv.setAttribute("class", "date-time-of-task");
    dateAndTimeDiv.append(dateDiv, timeDiv);

    todoDiv.append(dateAndTimeDiv);

    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "fas fa-times-circle");

    todoDiv.append(deleteButton);

    todoDiv.addEventListener("transitionend", e => {
        todoDiv.remove();
      });
}

todoList.addEventListener("click", deleteTodo);

function deleteTodo(e) {
    let item = e.target;
  
    if (item.classList[0] == "fas") {
      let todo = item.parentElement;
      removeLocalTasks(todo);
      todo.remove();
    }
}

function removeLocalTasks(todo) {
    let tasks;
    if(localStorage.getItem("tasks") == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    let textTask = todo.getElementsByClassName("task");
    let date = todo.getElementsByClassName("date-task");
    let time = todo.getElementsByClassName("time-task");

    let textValue = textTask[0].textContent;
    let dateValue = date[0].textContent;
    let timeValue = time[0].textContent;

    let todoToDelete = {
        textTask: textValue,
        dateTask: dateValue,
        timeTask: timeValue,
    }

    let findIndex = tasks.findIndex(todo => todo.userTask == todoToDelete.textTask && todo.date == todoToDelete.dateTask && todo.time == todoToDelete.timeTask);
    tasks.splice(findIndex, 1);

    if(tasks.length == 0) {
        localStorage.removeItem("tasks");
    } else {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

function save() {

    let todo = {
        userTask: todoTask.value,
        date: todoDate.value,
        time: todoTime.value,
    }

    let tasks;
    let strUserTasks = JSON.parse(localStorage.getItem("tasks"));

    if(!strUserTasks) {
        tasks = [];
    } else {
        tasks = strUserTasks;
    }
    addTaskCard(todo);
    tasks.push(todo);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function validateInputs() {

    let errorMessage = "";

    if(isEmptyField(todoTask.value)) {
        markAsError("todoTask");
        errorMessage = errorMessage + "Your task can not be empty" + "<br>";
    }

    if(isEmptyField(todoDate.value)) {
        markAsError("dateOfTask");
        errorMessage = errorMessage + "Please enter the date by which your task must be completed" + "<br>";
    }

    if(isEmptyField(todoTime.value)) {
        markAsError("timeOfTask");
        errorMessage = errorMessage + "Please enter the hour by which your task must be completed" + "<br>";
    }

    if(errorMessage != "") {
        throw new Error(errorMessage);
    }

    return false;
}

function isEmptyField(field) {
    if(field == "" || field == null) {
        return true;
    }
    
    return false;
}

function markAsError(errorBorderId) {
    let errorBorder = document.getElementById(errorBorderId);
    errorBorder.style.border = "2px solid red";
}

function cleanErrorBorder(errorBorderId) {
    let errorBorder = document.getElementById(errorBorderId);
    errorBorder.style.border = "";
}

function cleanErrorMessage() {
    let message = document.getElementById("errorsDiv");
    message.innerHTML = "";
}