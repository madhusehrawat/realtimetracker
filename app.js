const express=require('express');
const app=express();
const path=require('path');
const socketIo=require('socket.io');
const http=require('http');
const server=http.createServer(app);
const io=socketIo(server);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,"public")));
io.on('connection', (socket) => {
    socket.on('send-location',function(data){
        io.emit("received-location",{id:socket.id,...data});
    })
    socket.on('disconnect', () => {
       io.emit('user-disconnected', socket.id);
    });
    console.log('A user connected');
}); 
app.get('/',(req,res)=>{
    res.render('index');
});
server.listen(3000,()=>{
    console.log('Server is running on port 3000');
});
