document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('add-task-btn').addEventListener('click', addTask);
document.getElementById('clear-tasks-btn').addEventListener('click', clearTasks);
document.getElementById('search-task').addEventListener('input', filterTasks);
document.getElementById('filter-tasks').addEventListener('change', filterTasks);

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText) {
        const taskList = document.getElementById('task-list');
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <button onclick="deleteTask(this)">Удалить</button>
        `;
        taskItem.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') {
                taskItem.classList.toggle('completed');
                saveTasks(); // Save tasks to localStorage when toggling completion
            }
        });

        taskList.appendChild(taskItem);
        taskInput.value = '';
        saveTasks();
    } else {
        alert('Пожалуйста, введите задачу.');
    }
}

function deleteTask(button) {
    const taskItem = button.parentElement;
    taskItem.remove();
    saveTasks();
}

function clearTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    saveTasks();
}

function filterTasks() {
    const searchQuery = document.getElementById('search-task').value.toLowerCase();
    const filter = document.getElementById('filter-tasks').value;
    const tasks = document.querySelectorAll('#task-list li');
    let taskVisible = false;

    tasks.forEach(task => {
        const taskText = task.querySelector('span').textContent.toLowerCase();
        const isCompleted = task.classList.contains('completed');

        let shouldShow = false;

        if (filter === 'all') {
            shouldShow = taskText.includes(searchQuery);
        } else if (filter === 'active') {
            shouldShow = !isCompleted && taskText.includes(searchQuery);
        } else if (filter === 'completed') {
            shouldShow = isCompleted && taskText.includes(searchQuery);
        }

        task.style.display = shouldShow ? 'flex' : 'none';
        if (shouldShow) taskVisible = true;
    });

}


function saveTasks() {
    const tasks = [];
    const taskItems = document.querySelectorAll('#task-list li');
    
    taskItems.forEach(task => {
        const text = task.querySelector('span').textContent;
        const completed = task.classList.contains('completed');
        tasks.push({ text, completed });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <button onclick="deleteTask(this)">Удалить</button>
        `;
        if (task.completed) {
            taskItem.classList.add('completed');
        }
        taskItem.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') {
                taskItem.classList.toggle('completed');
                saveTasks();
            }
        });
        taskList.appendChild(taskItem);
    });
}
