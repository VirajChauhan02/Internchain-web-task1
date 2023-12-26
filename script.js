function addTask() {
    var taskInput = document.getElementById('taskInput');
    var timeInput = document.getElementById('timeInput');
    var taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        var li = document.createElement('li');
        var currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        // Sort the tasks in chronological order
        var tasks = Array.from(taskList.children);
        tasks.push({ innerText: taskInput.value + ' at ' + timeInput.value });
        tasks.sort((a, b) => new Date(a.innerText.match(/\d{2}:\d{2}/)) - new Date(b.innerText.match(/\d{2}:\d{2}/)));

        // Update the task list with sorted tasks
        taskList.innerHTML = '';
        tasks.forEach(task => {
            var taskItem = document.createElement('li');
            taskItem.innerHTML = task.innerText + ' <button onclick="removeTask(this)">Remove Task</button>' +
                ' <button onclick="removeTime(this)">Remove Time</button>';
            taskList.appendChild(taskItem);
        });

        taskInput.value = '';
        timeInput.value = '';
    }
}

function removeTask(element) {
    var li = element.parentElement;
    li.remove();
}

function removeTime(element) {
    var li = element.parentElement;
    var taskText = li.firstChild.nodeValue;

    // Remove the existing time
    var updatedTask = taskText.replace(/at\s+\d{2}:\d{2}\s+[APMapm]{2}/, '');

    // Add the current time
    var currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    updatedTask += ' at ' + currentTime;

    li.firstChild.nodeValue = updatedTask.trim();
}
