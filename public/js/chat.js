$(function () {
    //connection
    let socket = io.connect('http://localhost:3000')


    // //button
    let message = $('#message')
    let username = $('#username')
    let send_message = $('#send_message')
    let send_username = $('#send_username')
    let chatroom = $('#chatroom')


    // $('form').submit(function(e){
    //     e.preventDefault();

    //     socket.emit('chat message', $('#m').val())
    //     $('#m').val('')
    //     return false;
    // })

   

    send_message.click(function () {
        socket.emit('new_message', {
            message: message.val()
        })
    })

    //Listen on new_message
    socket.on("new_message", (data) => {
        message.val('');
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
    })

     //username
     send_username.click(function () {
        console.log(username.val())
        socket.emit('change_username', {
            username: username.val()
        })
    })
});