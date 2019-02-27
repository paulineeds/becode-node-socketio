// $(function () {
//     //connection
let socket = io.connect('https://becode-chatapp-socket.herokuapp.com/')


//     // //button
//     let message = $('#message')
//     let username = $('#username')
//     let send_message = $('#send_message')
//     let send_username = $('#send_username')
//     let chatroom = $('#chatroom')


//     // $('form').submit(function(e){
//     //     e.preventDefault();

//     //     socket.emit('chat message', $('#m').val())
//     //     $('#m').val('')
//     //     return false;
//     // })



//     send_message.click(function () {
//         socket.emit('new_message', {
//             message: message.val()
//         })
//     })

//     //Listen on new_message
//     socket.on("new_message", (data) => {
//         message.val('');
//         chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
//     })

//      //username
//      send_username.click(function () {
//         console.log(username.val())
//         socket.emit('change_username', {
//             username: username.val()
//         })
//     })
// });

// const messageTypes = {
//     LEFT: 'left',
//     RIGHT: 'right',
//     LOGIN: 'login'
// };

// //Chat stuff
// const chatWindow = document.getElementById('chat');
// const messagesList = document.getElementById('messagesList');
// const messageInput = document.getElementById('messageInput');
// const sendBtn = document.getElementById('sendBtn');

// //login stuff
// let username = '';
// const usernameInput = document.getElementById('usernameInput');
// const loginBtn = document.getElementById('loginBtn');
// const loginWindow = document.getElementById('login');

// const messages = []; // { author, date, content, type }
// // let socket=io()

// socket.on('message', message => {
//     console.log(message)
//     if (message.Type !== messageTypes.LOGIN) {
//         if (message.author === username) {
//             message.type = messageTypes.RIGHT;
//         } else {
//             message.type = messageTypes.LEFT
//         }
//     }

//     messages.push(message);
//     displayMessages()
//     //scroll to the bottom
//     chatWindow.scrollTop = chatWindow.scrollHeight;
// })

// const createMessageHTML = message => {
//     if (message.type === messageTypes.LOGIN) {
//         return `
// 			<p class="text-center mb-2">${message.author} joined the chat...</p>
//         `;
//     }
//     return `
// 	<div class="message ${
// 		message.type === messageTypes.LEFT ? 'message-left' : 'message-right'
// 	}">
// 		<div class="message-details flex">
// 			<p class="flex-grow-1 message-author">${message.type === messageTypes.RIGHT ? 'You' : message.author}</p>
// 		</div>
// 		<p class="message-content">${message.content}</p>
// 	</div>
// 	`;
// };

// displayMessages = () => {
//     const messagesHTML = messages
//         .map(message => createMessageHTML(message))
//         .join('');
//     messagesList.innerHTML = messagesHTML;
// };

// displayMessages()

// sendBtn.addEventListener('click', e => {
//     e.preventDefault();
//     if (!messageInput.value) {
//         return console.log('Invalid input');
//     }

//     const message = {
//         author: username,
//         content: messageInput.value
//     };


//     sendMessage(message);

//     //scroll to the bottom
//     // chatWindow.scrollTop = chatWindow.scrollHeight;

//     //clear input
//     messageInput.value = '';
// });

// const sendMessage = message => {
//     socket.emit('message', message)
// }

// loginBtn.addEventListener('click', e => {
//     e.preventDefault();
//     if (!usernameInput.value) {
//         return alert('Must supply a username');
//     }

//     //set the username and create logged in message
//     username = usernameInput.value;
//     messages.push({
//         author: username,
//         type: messageTypes.LOGIN
//     });
   

//     // sendMessage({ author: username, type: messageTypes.LOGIN });

//     //show chat window and hide login
//     loginWindow.classList.add('hidden');
//     chatWindow.classList.remove('hidden');
// });





const messageTypes = {
    LEFT: 'left',
    RIGHT: 'right',
    LOGIN: 'login'
}

//Chat Stuff
const chatWindow = document.querySelector('#chat');
const messageList = document.querySelector('#messagesList');
const messageInput = document.querySelector('#messageInput');
const sendBtn = document.querySelector('#sendBtn');

//Login Stuff
let username = '';
const usernameInput = document.querySelector('#usernameInput');
const loginBtn = document.querySelector('#loginBtn');
const loginWindow = document.querySelector('#login');


const messages = []; //{author, date, content, type}

// const socket = io();
// const socket = io.connect('https://becode-node-socketio-exercise.herokuapp.com/');

socket.on('message', message => {
    console.log(message);
    if(message.type !== messageTypes.LOGIN) {
        if(message.author === username) {
            message.type = messageTypes.RIGHT;
        } else {
            message.type = messageTypes.LEFT;
        }
    }

    messages.push(message);
    displayMessages();
    chatWindow.scrollTop = chatWindow.scrollHeight;
})

//take in message object, and return corresponding message HTML
const createMessageHTML = message => {
    if (message.type === messageTypes.LOGIN) {
        return `
            <p class="text-center mb-2">${message.author} has joined the chat...</p>
        `;
    }
    return `
        <div class="message ${message.type === messageTypes.LEFT ? 'message-left' : 'message-right'}">
            <div id="message-details" class="flex">
                <p class="flex-grow-1 message-author">${message.type === messageTypes.RIGHT ? 'You' : message.author}</p>
            </div>
            <p class="message-content">${message.content}</p>
        </div>
    `;
    // <p class="message-date">${message.date}</p>
};

const displayMessages = () => {
    console.log('displaying messages')
    const messagesHTML = messages
        .map(message => createMessageHTML(message))
        .join('');
    messagesList.innerHTML = messagesHTML;
}

displayMessages();

//sendbtn callback
const handleClickSendBtn = e => {
    e.preventDefault();
    if(!messageInput.value) {
        return console.log('must supply a message');
    }

    const date = new Date();
    const hour = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    // const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const dateString = `${hour}:${minutes}:${seconds}`;

    const message = {
        author: username,
        date: dateString,
        content: messageInput.value
    }

    sendMessage(message);

    messageInput.value = "";
}

sendBtn.addEventListener('click', handleClickSendBtn);

const sendMessage = message => {
    socket.emit('message', message);
}

//loginbtn callback
const handleClickLoginBtn = e => {
    //preventdefault of a form
    e.preventDefault();
    //set the sername and create logged in message
    if(!usernameInput.value) {
        window.alert('Please fill in a username');
    }
    username = usernameInput.value;

    sendMessage({
        author: username,
        type: messageTypes.LOGIN
    })
    //hide login and show chat window
    loginWindow.classList.add('hidden');
    chatWindow.classList.remove('hidden');
}

loginBtn.addEventListener('click', handleClickLoginBtn);