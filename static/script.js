function runPython() {
    fetch('/run-python')
        .then(response => response.json())
        .then(data => {
        alert(data.message);
        });
}

// Show / hide form
const showFormBtn = document.getElementById('show-form-btn');
const planForm = document.getElementById('plan-form');

showFormBtn.addEventListener('click', () => {
    if (planForm.style.display === 'none') {
        planForm.style.display = 'block';
        showFormBtn.style.display = 'none'; // hide button when form is shown
        addTaskRow(); // add initial task row when form is revealed
    }
});

// Dynamic tasks
let taskCount = 0;
const tasksContainer = document.getElementById('tasks-container');
const addTaskBtn = document.getElementById('add-task-btn');

function addTaskRow() {
    taskCount++;
    const div = document.createElement('div');
    div.className = 'task-row';
    div.style.display = 'flex';
    div.style.gap = '10px';
    div.style.marginBottom = '5px';
    div.innerHTML = `
        <input type='text' name='task${taskCount}' placeholder='Task Name'>
        <input type='number' name='time${taskCount}' min='1' placeholder='Minutes'>
        <button type='button' class='remove-btn'>X</button>
    `;
    tasksContainer.appendChild(div);

    div.querySelector('.remove-btn').addEventListener('click', () => {
        tasksContainer.removeChild(div);
    });
}

// Add task button inside the form
addTaskBtn.addEventListener('click', addTaskRow);


// Add initial task row
addTaskRow();

// Add new row when + Add Task is clicked
addTaskBtn.addEventListener('click', addTaskRow);
