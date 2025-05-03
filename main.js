function verifyAccount() {
  alert("Malipo kupitia M-Pesa au AirtelMoney:\nM-Pesa: 0750081642\nAirtelMoney: 0697450144\n\nBaada ya malipo, wasiliana nasi kwa verification.");
}

// Prevent form reload and show alert (demo only)
document.getElementById('signup-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert("Sign up successful!");
});

document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert("Logged in successfully!");
});

// Fungua ukurasa na onyesha ujumbe uliohifadhiwa
window.onload = function () {
  loadMessages();
};

function sendMessage() {
  const input = document.getElementById('message-input');
  const chatBox = document.getElementById('chat-box');
  const message = input.value.trim();

  if (message !== "") {
    const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];

    messages.push(message);
    localStorage.setItem('chatMessages', JSON.stringify(messages));

    displayMessage(message);
    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

function displayMessage(msg) {
  const chatBox = document.getElementById('chat-box');
  const msgDiv = document.createElement('div');
  msgDiv.textContent = msg;
  msgDiv.style.margin = '5px 0';
  msgDiv.style.padding = '8px';
  msgDiv.style.background = '#e0e0e0';
  msgDiv.style.borderRadius = '5px';
  chatBox.appendChild(msgDiv);
}

function loadMessages() {
  const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
  messages.forEach(displayMessage);
}

function handleLogin() {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();

  if (email && password) {
    // Rahisi: tunahifadhi status ya kuwa logged in
    localStorage.setItem('loggedInUser', email);
    alert("Login successful!");
    showChatIfLoggedIn();
  } else {
    alert("Tafadhali jaza email na password.");
  }
}
function showChatIfLoggedIn() {
  const chatSection = document.getElementById('chat');
  const input = document.getElementById('message-input');
  const button = document.querySelector('#chat-controls button');
  const isLoggedIn = !!localStorage.getItem('loggedInUser');

  if (isLoggedIn) {
    chatSection.style.display = 'block';
    input.disabled = false;
    button.disabled = false;
    loadMessages();
  } else {
    chatSection.style.display = 'block';
    input.disabled = true;
    button.disabled = true;
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = "<p>Chat inapatikana kwa members waliologin tu.</p>";
  }
}

// On page load
window.onload = function () {
  showChatIfLoggedIn();
};

function logoutUser() {
  localStorage.removeItem('loggedInUser');
  alert("Umetoka kwenye akaunti.");
  location.reload(); // Reload page to hide chat
}

function showChatIfLoggedIn() {
  const chatSection = document.getElementById('chat');
  const input = document.getElementById('message-input');
  const button = document.querySelector('#chat-controls button');
  const welcomeMsg = document.getElementById('welcome-message');
  const logoutBtn = document.getElementById('logout-btn');

  const user = localStorage.getItem('loggedInUser');

  chatSection.style.display = 'block';

  if (user) {
    input.disabled = false;
    button.disabled = false;
    welcomeMsg.textContent = "Karibu, " + user;
    logoutBtn.style.display = 'inline-block';
    loadMessages();
  } else {
    input.disabled = true;
    button.disabled = true;
    welcomeMsg.textContent = "";
    logoutBtn.style.display = 'none';
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = "<p>Chat inapatikana kwa members waliologin tu.</p>";
  }
}

document.getElementById("motivation-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const fileInput = document.getElementById("motivation-file");
  const textInput = document.getElementById("motivation-text");
  const gallery = document.getElementById("motivation-gallery");

  const file = fileInput.files[0];
  const text = textInput.value;

  if (!file) return alert("Chagua faili la kupakia.");

  const reader = new FileReader();
  reader.onload = function (event) {
    const item = document.createElement("div");
    item.className = "motivation-item";

    if (file.type.startsWith("image/")) {
      item.innerHTML = `<img src="${event.target.result}" alt="Motivation">
                        <p>${text}</p>
                        <a href="${event.target.result}" download>Download</a>`;
    } else if (file.type.startsWith("video/")) {
      item.innerHTML = `<video controls src="${event.target.result}"></video>
                        <p>${text}</p>
                        <a href="${event.target.result}" download>Download</a>`;
    }

    gallery.appendChild(item);
    textInput.value = "";
    fileInput.value = "";
  };

  reader.readAsDataURL(file);
});

// Hifadhi comment
document.getElementById("comment-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const input = document.getElementById("comment-input");
  const comment = input.value.trim();
  if (!comment) return;

  let comments = JSON.parse(localStorage.getItem("comments") || "[]");
  comments.push(comment);
  localStorage.setItem("comments", JSON.stringify(comments));

  input.value = "";
  loadComments();
});

// Onyesha comment zote
function loadComments() {
  const list = document.getElementById("comment-list");
  list.innerHTML = "";

  const comments = JSON.parse(localStorage.getItem("comments") || "[]");

  comments.forEach(function (cmt) {
    const div = document.createElement("div");
    div.className = "comment-item";
    div.textContent = cmt;
    list.appendChild(div);
  });
}

// Pakia comments on page load
window.addEventListener("load", loadComments);
