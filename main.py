from flask import Flask, render_template, jsonify, request



app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/submit', methods=['POST'])
def submit_plan():
    plan_name = request.form.get('plan_name', 'Unnamed Plan')

    # Create a map of task names to their times, ignoring empty names
    tasks = {}
    for i in range(1, 6):
        task_name = request.form.get(f'task{i}', '').strip()
        time_str = request.form.get(f'time{i}', '').strip()
        if task_name and time_str:
            try:
                time = int(time_str)
                tasks[task_name] = time
            except ValueError:
                pass  # skip if time is not a number

    return render_template('plan_result.html', plan_name=plan_name, tasks=tasks)

@app.route('/run-python')
def run_python():
    print("1")
    result = "Python code executed from Flask!"
    return jsonify({"message": result})
 

if __name__ == '__main__':
    app.run(debug=True)
