const form = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

taskNr = 1;
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar que se recargue la página

  const task = taskInput.value.trim();

  if (task !== "") {
    const li = document.createElement('li');
    li.innerHTML = '<input class="mr-2" type="checkbox" id="task'+ taskNr + '" name="task' + taskNr + '" value="'+ taskNr + '">' + task;
    li.className = 'p-3 rounded-lg shadow-md shadow-stone-600/50';
    
    taskList.appendChild(li);
    
    taskInput.value = '';
    taskNr += 1;
  }
});

function deleteTask(){
  let checkButton = document.getElementById('task1') //En un futuro el id habra que pasarlo por parametro

  if (!checkButton.classList.contains('marked')){
    checkButton.innerHTML = '✓'
    checkButton.classList.add('marked', 'bg-amber-500', 'border-amber-500');
    checkButton.classList.remove('bg-stone-50', 'border-stone-500')
  }else {
    checkButton.innerHTML = ''
    checkButton.classList.remove('marked', 'bg-amber-500', 'border-amber-300')
    checkButton.classList.add('bg-stone-50', 'border-stone-500')
    
  }

}