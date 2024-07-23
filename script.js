document.getElementById('add-task-btn').addEventListener('click', addTask);
document.getElementById('delete-all-btn').addEventListener('click', deleteAll);
document.getElementById('search-task').addEventListener('input', filerTasks);
document.getElementById('filter-tasks').addEventListener('change', filerTasks);

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText) {
        const taskList = document.getElementById('task-list');
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            ${taskText}
            <button onclick="deleteTask(this)">Удалить</button>
        `;
        taskItem.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
            filerTasks();
        });

        taskList.appendChild(taskItem);
        taskInput.value = '';
        noMessage();
        filerTasks();
    } else {
        alert('Пожалуйста, введите задачу.');
    }
}

function deleteTask(button) {
    const taskItem = button.parentElement;
    taskItem.remove();
    noMessage();
    filterTasks();
}

function deleteAll(button){
   const taskList= document.getElementById('task-list');
   taskList.innerHTML=" ";
   noMessage();
}
function filerTasks(){
    const search = document.getElementById('search-task').value.toLowerCase();
    const filter = document.getElementById('filter-tasks').value;
    const tasks = document.querySelectorAll('#task-list li');
    let taskVisible = false;
    tasks.forEach(task => {
        const taskText = task.textContent.toLocaleLowerCase();
        const isComleted = task.classList.contains('completed');

        let shouldShow = false;

        if (filter === 'all'){
            shouldShow = taskText.includes(search);
        } else if(filter === 'active'){
            shouldShow = !isComleted && taskText.includes(searchQuery);
            
        }else if(filter === 'completed'){
            shouldShow = isComleted && taskText.includes(search);
        }
        task.style.display = shouldShow ? 'flex' : 'none';
        if(shouldShow) taskVisible = true;
    });
    noMessage(taskVisible);
}
function noMessage(visible = false){
    const message = document.getElementById('no-tasks')
    message.style.display = visible ? 'none' : 'block';

}
