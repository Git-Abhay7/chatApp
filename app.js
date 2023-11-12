require("./dbConfig")
const express = require('express');
const path = require('path');
const app = express();
const PORT = 4000;
const server = app.listen(PORT, () => console.log(`💬 server on port ${PORT}`));
const io = require('socket.io')(server);
const userRoute = require("./router/userRouter")
const chatModel = require("./model/chatModel")

let users = [];
let messages = [];

app.use(express.static(path.join(__dirname, 'public')));
app.use('/user', userRoute);

io.on('connection', onConnected);

function onConnected(socket) {
  console.log('Socket connected', socket.id);

  socket.on('register-user', async (username) => {
    const user = { id: socket.id, name: username };
    users.push(user);
    io.emit('clients-total', users.length);
  });

  socket.on('message', async (data) => {

    const message = {
      sender: data.sender,
      message: data.message,
      timestamp: new Date().toISOString(),
    };
    messages.push(message);
    const findChat = await chatModel.find({})
    if (findChat.length) {
      await chatModel.updateOne({ _id: findChat[0]._id }, {
        $push: {
          chats: message
        }
      })
    }
    else await new chatModel({ chats: message }).save()
    socket.broadcast.emit('chat-message', messages);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected', socket.id);
    io.emit('clients-total', users.length);
  });

  socket.on('feedback', (data) => {
    socket.broadcast.emit('feedback', data)
  })

}
