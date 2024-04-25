const socket = io("http://localhost:3003");
const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");
const user = document.getElementById("user");
const leave = document.getElementById("Leave");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    console.log({ user: user.value, message: input.value });
    socket.emit("chat message", { user: user.value, message: input.value });
    input.value = "";
  }
});

socket.on("chat message", (msg) => {
  const item = document.createElement("li");
  item.textContent = `${msg.user}: ${msg.message}`;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

leave.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("leave");
  socket.disconnect();
});
