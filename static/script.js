function runPython() {
    fetch('/run-python')
        .then(response => response.json())
        .then(data => {
        alert(data.message);
        });
}

function createPlan() {
    document.getElementById("studyplans").innerHTML += "<div id='studyplan'><form action='/submit' method='POST' style='max-width: 400px; margin: auto;'><h2>Create Your Plan</h2><label>Plan Name:</label><input type='text' name='plan_name' required><br><h3>Enter Your Tasks</h3><label>Task 1 Name:</label><input type='text' name='task1'><label>Time (minutes):</label><input type='number' name='time1' min='1'><label>Task 2 Name:</label><input type='text' name='task2'><label>Time (minutes):</label><input type='number' name='time2' min='1'><label>Task 3 Name:</label><input type='text' name='task3'><label>Time (minutes):</label><input type='number' name='time3' min='1'><label>Task 4 Name:</label><input type='text' name='task4'><label>Time (minutes):</label><input type='number' name='time4' min='1'><label>Task 5 Name:</label><input type='text' name='task5'><label>Time (minutes):</label><input type='number' name='time5' min='1'><br><br><button type='submit'>Submit Plan</button></form></div>";
}