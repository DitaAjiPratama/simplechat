document.addEventListener('DOMContentLoaded', () => {
  const socket = io();

  const form = document.querySelector('form');
  const input = document.querySelector('#message-input');
  const messages = document.querySelector('#messages');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
      socket.emit('chat message', input.value);
      input.value = '';
    }
  });

  socket.on('chat message', (msg) => {
    const li = document.createElement('li');
    li.textContent = msg;
    messages.appendChild(li);

    // TODO: bookmark for notification logic to put in here

    if (Notification.permission === 'granted') {
      new Notification('New Message', { body: msg });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('New Message', { body: msg });
        }
      });
    }
  });
});
