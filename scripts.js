document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    let editingTask = null;

    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <div class="task-content">
                <input type="checkbox" class="task-checkbox">
                <span class="task-text">${taskText}</span>
            </div>
            <div class="task-actions">
                <button class="edit-btn"><i class="fas fa-edit"></i></button>
                <button class="delete-btn"><i class="fas fa-trash-alt"></i></button>
            </div>
        `;
        return li;
    }

    function removeTaskWithAnimation(taskItem) {
        taskItem.style.opacity = '0';
        setTimeout(() => {
            taskList.removeChild(taskItem);
        }, 300);
    }

    function editTask(taskItem) {
        const taskText = taskItem.querySelector('.task-text');
        taskInput.value = taskText.textContent;
        editingTask = taskText.textContent;
        removeTaskWithAnimation(taskItem);
        toggleTaskInput();
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const taskElement = createTaskElement(taskText);
            taskList.insertBefore(taskElement, taskList.firstChild);
            taskInput.value = '';
            taskElement.style.opacity = '0';
            setTimeout(() => {
                taskElement.style.opacity = '1';
            }, 10);
            toggleTaskInput();
        }
    }

    function toggleTaskInput() {
        if (taskInput.style.display === 'none' || taskInput.style.display === '') {
            taskInput.style.display = 'block';
            taskInput.style.width = '0';
            taskInput.style.padding = '10px 0';
            setTimeout(() => {
                taskInput.style.width = '200px';
                taskInput.style.padding = '10px';
                taskInput.focus();
            }, 10);
        } else {
            taskInput.style.width = '0';
            taskInput.style.padding = '10px 0';
            setTimeout(() => {
                taskInput.style.display = 'none';
                taskInput.value = '';
                editingTask = null;
            }, 300);
        }
    }

    addTaskBtn.addEventListener('click', () => {
        if (taskInput.style.display === 'none' || taskInput.style.display === '') {
            toggleTaskInput();
        } else {
            addTask();
        }
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    taskList.addEventListener('click', (e) => {
        const target = e.target;
        const taskItem = target.closest('.task-item');

        if (target.classList.contains('task-checkbox')) {
            taskItem.querySelector('.task-text').classList.toggle('completed');
        } else if (target.classList.contains('edit-btn') || target.parentElement.classList.contains('edit-btn')) {
            editTask(taskItem);
        } else if (target.classList.contains('delete-btn') || target.parentElement.classList.contains('delete-btn')) {
            removeTaskWithAnimation(taskItem);
        }
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.add-task-container') && !event.target.closest('.edit-btn')) {
            if (taskInput.style.display !== 'none') {
                if (editingTask) {
                    const taskElement = createTaskElement(editingTask);
                    taskList.insertBefore(taskElement, taskList.firstChild);
                    taskElement.style.opacity = '0';
                    setTimeout(() => {
                        taskElement.style.opacity = '1';
                    }, 10);
                    editingTask = null;
                }
                toggleTaskInput();
            }
        }
    });
});
