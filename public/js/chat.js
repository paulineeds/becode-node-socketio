$(function(){
    //connection
    let socket = io.connect('http://localhost:3000')

    $('form').submit(function(e){
        e.preventDefault();
        
        socket.emit('chat message', $('#m').val())
        $('#m').val('')
        return false;
    })

    
    socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg))
    })
    // //button
    // let message = $('#message')
    // let username = $('#username')
    // let send_message = $('#send_message')
    // let send_username = $('#send_username')
    // let chatroom = $('#chatroom')

    // //username
    // send_username.click(function(){
    //     console.log(username.val())
    //     socket.emit('change_username',{username: username.val()})
    // })

    // // new message
    // send_message.click(function(){
    //     socket.emit('new_message', {message: message.val()})
    // })

    // //luistert naart nieuw berichtje
    // socket.on('new_message', (data) => {
    //     console.log(data)
    //     chatroom.append("<p> class='message'</p>" + data.username + ': ' + data.send_message + '</p>')
    // })

});