from flask import Flask, render_template, jsonify


app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/run-python')
def run_python():
    print("1")
    result = "Python code executed from Flask!"
    return jsonify({"message": result})


if __name__ == '__main__':
    app.run(debug=True)
