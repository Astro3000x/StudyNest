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

const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');

chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const userMsg = chatInput.value.trim();
    if (!userMsg) return;

    // Display user message
    const userDiv = document.createElement('div');
    userDiv.textContent = `You: ${userMsg}`;
    userDiv.style.fontWeight = 'bold';
    chatMessages.appendChild(userDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    chatInput.value = '';

    // Send message to Flask backend
    fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
    })
    .then(res => res.json())
    .then(data => {
        const botDiv = document.createElement('div');
        botDiv.textContent = `AI: ${data.reply}`;
        botDiv.style.color = '#007bff';
        chatMessages.appendChild(botDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    })
    .catch(err => console.error(err));
}

// -------- FLASHCARD SYSTEM --------

let flashcards = [];
let flashIndex = 0;
let flashShowingAnswer = false;

// UI elements
const flashToggle = document.getElementById("flashcard-toggle");
const flashSection = document.getElementById("flashcard-section");
const flashCard = document.getElementById("flashcard-card");
const flashFlip = document.getElementById("flash-flip-btn");
const flashNext = document.getElementById("flash-next-btn");
const flashAdd = document.getElementById("flash-add-btn");
const flashQ = document.getElementById("flash-q");
const flashA = document.getElementById("flash-a");
const flashList = document.getElementById("flashcard-list");

// Show/hide flashcard section
flashToggle.addEventListener("click", () => {
    if (flashSection.style.display === "none") {
        flashSection.style.display = "block";
        flashToggle.textContent = "Close Flashcards";
    } else {
        flashSection.style.display = "none";
        flashToggle.textContent = "Open Flashcards";
    }
});

// Display a flashcard
function showFlashcard() {
    if (flashcards.length === 0) {
        flashCard.textContent = "No flashcards yet!";
        return;
    }

    flashShowingAnswer = false;
    flashCard.textContent = flashcards[flashIndex].question;
}

// Flip question/answer
flashFlip.addEventListener("click", () => {
    if (flashcards.length === 0) return;

    flashShowingAnswer = !flashShowingAnswer;
    const fc = flashcards[flashIndex];

    flashCard.textContent = flashShowingAnswer ? fc.answer : fc.question;
});

// Random next flashcard
flashNext.addEventListener("click", () => {
    if (flashcards.length === 0) return;
    flashIndex = Math.floor(Math.random() * flashcards.length);
    showFlashcard();
});

// Add new flashcard
flashAdd.addEventListener("click", () => {
    const q = flashQ.value.trim();
    const a = flashA.value.trim();

    if (!q || !a) {
        alert("Please enter both question and answer!");
        return;
    }

    flashcards.push({ question: q, answer: a });

    flashQ.value = "";
    flashA.value = "";

    updateFlashList();
    showFlashcard();
});

// Update list of all flashcards
function updateFlashList() {
    flashList.innerHTML = "<h4>Your Flashcards:</h4>" +
        flashcards.map((f, i) => `<div>${i+1}. ${f.question}</div>`).join("");
}

// -------- RANDOM MOTIVATIONAL QUOTES --------
const quotes = [
    "Small progress is still progress.",
    "You don’t have to be perfect, just consistent.",
    "The secret to getting ahead is getting started.",
    "Success is the sum of small efforts repeated daily.",
    "Your future self will thank you for the work you do today.",
    "Focus on progress, not perfection.",
    "Don’t wish for it. Work for it.",
    "Dreams don’t work unless you do.",
    "It always seems impossible until it’s done.",
    "You are capable of more than you think."
];

function setRandomQuote() {
    const quoteBox = document.getElementById("motivation-quote");
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteBox.textContent = `"${quotes[randomIndex]}"`;
}

// Run once on page load
setRandomQuote();
