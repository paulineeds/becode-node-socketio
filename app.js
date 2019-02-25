const express = require ('express')
const app = express ()

// app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/views/index.html')
})

server = app.listen(3000)


//socket.io
const io = require ('socket.io').listen(server);

io.on('connection',(socket) => {
    console.log('New user connected')
    socket.on('disconnect', function(){
        console.log('user disconnected')
    })
    socket.on('chat message', function(msg){
        io.emit('chat message', msg)
        console.log('message: ' + msg)
    })
});


// io.on('connection', function(socket){
//     socket.broadcast.emit('hi')
// })


    // //default username
    // socket.username= "anonymous"

    // //change username
    // socket.on('change_username', (data)=> {
    //     socket.username=data.username
    // })

    // //message
    // socket.on('new_message',(data) =>{
    //     io.sockets.emit('new_message', {message : data.message, username : socket.username})
    // })
// })





