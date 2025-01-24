document.addEventListener("DOMContentLoaded", () => { //wait for the DOM to load
   const todoInput = document.getElementById("todo-input");
   const addTaskButton = document.getElementById("add-task-btn");
   const todoList = document.getElementById("todo-list");
 
   let tasks = JSON.parse(localStorage.getItem("tasks")) || []; //get tasks from local storage
 
   tasks.forEach((task) => renderTask(task)); //render tasks from local storage
 
   addTaskButton.addEventListener("click", () => { //add task
     const taskText = todoInput.value.trim(); //trim removes whitespace
     if (taskText === "") return;
 
     const newTask = { //create new task
       id: Date.now(),
       text: taskText,
       completed: false,
     };
     tasks.push(newTask); //add task to tasks array
     saveTasks();
     renderTask(newTask);
     todoInput.value = ""; //clear input
     console.log(tasks);
   });
 
   function renderTask(task) { //render task
     const li = document.createElement("li"); //create li element
     li.setAttribute("data-id", task.id); 
     if (task.completed) li.classList.add("completed"); //add completed class if task is completed
     li.innerHTML = ` 
     <span>${task.text}</span> 
     <button>delete</button> 
     `;
     li.addEventListener("click", (e) => { //toggle task completion
       if (e.target.tagName === "BUTTON") return; //prevent toggle from firing when delete button is clicked
       task.completed = !task.completed;
       li.classList.toggle("completed"); 
       saveTasks();
     });
 
     li.querySelector("button").addEventListener("click", (e) => { //delete task
       e.stopPropagation(); //prevent toggle from firing
       tasks = tasks.filter((t) => t.id === task.id); //remove task from tasks array
       li.remove();
       saveTasks();
     });
 
     todoList.appendChild(li); //add task to todo list
   }
 
   function saveTasks() { //save tasks to local storage
     localStorage.setItem("tasks", JSON.stringify(tasks)); //convert tasks array to string and save to local storage
   }
 });
 