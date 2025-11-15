function runPython() {
    fetch('/run-python')
        .then(response => response.json())
        .then(data => {
        alert(data.message);
        });
}
