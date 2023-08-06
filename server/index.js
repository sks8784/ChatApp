const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const { connectDB } = require("./database/db");
const dotenv = require("dotenv");
const Message = require('./models/usermessage');

const app = express();

app.use(express.json());
dotenv.config();

app.use(cors());
const port = 4500 || process.env.PORT;
connectDB();

const users = [{}];

app.get("/", (req, res) => {
    res.send("Hello World");
})

const server = http.createServer(app);
const io = socketIO(server);


io.on("connection", (socket) => {
    console.log("new connection");


    socket.on('joined', ({ user, roomID }) => {

        socket.join(roomID);

        users[socket.id] = user;
        console.log(`${user} has joined`);

        const findMssg = async () => {
            const prevMssg = await Message.find({ roomID: roomID });
            console.log(prevMssg);
            await socket.emit('sendPrevmssg', prevMssg);

        }
        findMssg();

        //  socket.broadcast.emit('userJoined',{user:"Admin",message:`${users[socket.id]} has joined`,mobile:mobile}) // visible to all other except the user who has joined
        //  socket.emit('welcome',{user:"Admin",message:`Welcome to the chat, ${users[socket.id]}`,mobile:mobile}) //only visible to the user who has joined


    })



    socket.on('message', ({ message, mobile, id, roomID }) => {

        // io.to(roomID).emit('sendMessage',{user:users[id],message,mobile,id,roomID})
        io.to(roomID).emit('sendMessage', { user: users[id], message, mobile, roomID })
    })

    socket.on('loadData', async (data) => {
        await Message.create(data);
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('leave', { user: "Admin", message: `${users[socket.id]} has left` });
        console.log('user left');
    })

});

server.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
})

