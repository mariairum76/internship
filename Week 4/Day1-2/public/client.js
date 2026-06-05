const socket = io();

function sendMessage() {

  const text = document.getElementById("msg").value;

  const data = {
    id: Date.now().toString(),
    text: text
  };

  socket.emit("message", data);

  document.getElementById("msg").value = "";
}

socket.on("message", (data) => {

  const li = document.createElement("li");

  li.textContent =
    `ID: ${data.id} | Message: ${data.text}`;

  document.getElementById("messages")
    .appendChild(li);
});

