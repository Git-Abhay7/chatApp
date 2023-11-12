const socket = io();

const clientsTotal = document.getElementById('client-total');
const messageContainer = document.getElementById('message-container');
const nameInput = document.getElementById('name-input');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messageTone = new Audio('/message-tone.mp3');

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  sendMessage();
});

socket.on('clients-total', (data) => {
  clientsTotal.innerText = `Total Clients: ${data}`;
});

socket.on('user-registered', (data) => {
  console.log('User registered:', data);
});

socket.on('registration-error', (data) => {
  console.error('Registration error:', data.error);
});

socket.on('chat-message', (data) => {
  messageTone.play();
  addMessageToUI(data);
});

socket.on('feedback', (data) => {
  clearFeedback()
  const element = `
        <li class="message-feedback">
          <p class="feedback" id="feedback">${data.feedback}</p>
        </li>
  `
  messageContainer.innerHTML += element
})

function sendMessage() {
  if (messageInput.value === '') return
  // console.log(messageInput.value)
  const data = {
    sender: nameInput.value,
    message: messageInput.value,
    timestamp: new Date(),
  }
  socket.emit('message', data)
  addMessageToUI(data)
  messageInput.value = ''
}

function addMessageToUI(data) {
  // clearFeedback();
  const element = `
    <li class="message-left">
      <p class="message">
        ${data.message}
        <span>${data.sender} ● ${new Date().toISOString()}</span>
      </p>
    </li>
  `;

  messageContainer.innerHTML += element;
  scrollToBottom();
}


function clearFeedback() {
  document.querySelectorAll('li.message-feedback').forEach((element) => {
    element.parentNode.removeChild(element);
  });
}

function scrollToBottom() {
  messageContainer.scrollTo(0, messageContainer.scrollHeight);
}

