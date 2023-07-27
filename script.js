document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');

    function updateLocalStorage(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks(tasks) {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = task.text;
            if (task.completed) {
                listItem.classList.add('completed');
            }
            const closeBtn = document.createElement('span');
            closeBtn.textContent = '\u00D7';
            closeBtn.classList.add('close');
            closeBtn.addEventListener('click', () => {
                tasks.splice(index, 1);
                updateLocalStorage(tasks);
                renderTasks(tasks);
            });
            listItem.appendChild(closeBtn);
            listItem.addEventListener('click', () => {
                task.completed = !task.completed;
                updateLocalStorage(tasks);
                renderTasks(tasks);
            });
            taskList.appendChild(listItem);
        });
    }

    addBtn.addEventListener('click', () => {
        const text = taskInput.value.trim();
        if (text !== '') {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push({ text, completed: false });
            updateLocalStorage(tasks);
            renderTasks(tasks);
            taskInput.value = '';
        }
    });

    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
        renderTasks(savedTasks);
    }
});
