from flask import Flask, render_template, jsonify, request
import os
from openai import OpenAI
'''
# Create a new client instance
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

# Example function for chat
def ask_openai(messages):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages
    )
    # Depending on version, response.choices might differ; here’s one way:
    return response.choices[0].message.content
'''
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
 

'''@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message", "")
    messages = [
        {"role": "system", "content": "You are a helpful study assistant."},
        {"role": "user", "content": user_input},
    ]
    reply = ask_openai(messages)
    return jsonify({"reply": reply})'''

if __name__ == '__main__':
    app.run(debug=True)
