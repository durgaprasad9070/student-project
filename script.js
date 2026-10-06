let tasks=JSON.parse(localStorage.getItem("tasks"))||[];

function saveTasks(){localStorage.setItem("tasks",JSON.stringify(tasks));}

function displayTasks(list=tasks){
 const taskList=document.getElementById("taskList");
 taskList.innerHTML="";
 list.forEach((task,index)=>{
  const div=document.createElement("div");
  div.className=task.completed?"task completed":"task";
  div.innerHTML=`<span>${escapeHtml(task.text)}</span>
  <div class="actions">
  <button class="complete" onclick="completeTask(${index})">✓</button>
  <button class="delete" onclick="deleteTask(${index})">Delete</button>
  </div>`;
  taskList.appendChild(div);
 });
}

function escapeHtml(text){
 const div=document.createElement("div");
 div.textContent=text;
 return div.innerHTML;
}

function addTask(){
 const input=document.getElementById("taskInput");
 const text=input.value.trim();
 if(!text){alert("Please enter a task");return;}
 tasks.push({text,completed:false});
 saveTasks(); input.value=""; displayTasks();
}

function completeTask(index){
 tasks[index].completed=!tasks[index].completed;
 saveTasks(); displayTasks();
}

function deleteTask(index){
 tasks.splice(index,1);
 saveTasks(); displayTasks();
}

function searchTasks(){
 const search=document.getElementById("searchInput").value.toLowerCase();
 displayTasks(tasks.filter(task=>task.text.toLowerCase().includes(search)));
}

displayTasks();
