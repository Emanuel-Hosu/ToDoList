const form = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

let taskNr = 1;

//Local storage
document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar que se recargue la página

  const task = taskInput.value.trim();

  if (task !== "") {
    const li = document.createElement('li');
    // Para enviar un id del mismo div co html en js: \'buttonTask' + taskNr + '\'
    li.innerHTML = '<button id="buttonTask' + taskNr + '" class="border-2 border-stone-500 bg-stone-50 rounded-full w-6 h-6 mr-3" onclick="deleteTask(\'buttonTask' + taskNr + '\', \'Task' + taskNr + '\')"></button>' + task;
    li.id = 'Task' + taskNr;
    li.className = 'p-3 rounded-lg shadow-md shadow-stone-600/50 flex items-center';

    taskList.appendChild(li);

    // Guardar la nueva tarea en LocalStorage
    saveTaskToLocalStorage({ id: li.id, task });

    taskInput.value = '';
    taskNr += 1;
  }
});

// Función para guardar una tarea en LocalStorage
function saveTaskToLocalStorage(task) {
  let tasks = getTasksFromLocalStorage(); // Obtener las tareas existentes
  tasks.push(task); // Añadir la nueva tarea al array
  localStorage.setItem('tasks', JSON.stringify(tasks)); // Guardar en LocalStorage
}

// Función para obtener tareas de LocalStorage
function getTasksFromLocalStorage() {
  let tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : []; // Si hay tareas, devolver el array, si no, un array vacío
}

// Función para cargar tareas desde LocalStorage
function loadTasksFromLocalStorage() {
  const tasks = getTasksFromLocalStorage();

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <button id="button${task.id}" class="border-2 border-stone-500 bg-stone-50 rounded-full w-6 h-6 mr-3" onclick="deleteTask('${task.id}')"></button>
      ${task.task}
    `; //Para entederlo bien Emi del futuro, fijate en la linea 18 (puede que el task.task te vaya a confundir alguna vez)
    li.id = task.id;
    li.className = 'p-3 rounded-lg shadow-md shadow-stone-600/50 flex items-center'; // Flexbox para alinear
    taskList.appendChild(li);
  });
}

// Función para eliminar la tarea (marcarla) y actualizar LocalStorage
function deleteTask(buttonId) {
  let checkButton = document.getElementById(buttonId); 
  const taskId = buttonId.replace('button', ''); //Para identificar a qué li (tarea) corresponde este botón, eliminamos la parte button del id, quedando solo Task1, Task2, etc.

  if (!checkButton.classList.contains('marked')) { //Marcar la tarea como completada (tachada)
    checkButton.innerHTML = 
      `<svg class="stroke-stone-50 stroke-2" width="16px" height="16px" viewBox="-5 -2 24.00 24.00" xmlns="http://www.w3.org/2000/svg" fill="none" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 5L8 15l-5-4"></path>
        </g>
      </svg>`;
    checkButton.classList.add('marked', 'bg-amber-500', 'border-amber-500');
  } else {
    checkButton.innerHTML = '';
    checkButton.classList.remove('marked', 'bg-amber-500', 'border-amber-500');
  }

  // Actualizar las tareas en LocalStorage
  let tasks = getTasksFromLocalStorage();
  tasks = tasks.filter(task => task.id !== taskId); // Eliminar la tarea del array
  localStorage.setItem('tasks', JSON.stringify(tasks)); // Guardar el array actualizado en LocalStorage
}


