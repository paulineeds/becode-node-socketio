// $(function () {
//     //connection
//     let socket = io.connect('https://becode-chatapp-socket.herokuapp.com/')


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

const messageTypes = { LEFT: 'left', RIGHT: 'right', LOGIN: 'login' };

//Chat stuff
const chatWindow = document.getElementById('chat');
const messagesList = document.getElementById('messagesList');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

//login stuff
let username = '';
const usernameInput = document.getElementById('usernameInput');
const loginBtn = document.getElementById('loginBtn');
const loginWindow = document.getElementById('login');

const messages = []; // { author, date, content, type }
let socket=io()

socket.on('message', message => {
console.log(message)
if (message.Type !== messageTypes.LOGIN){
    if(message.author === username) {
        message.type = messageTypes.RIGHT;
    } else {
        message.type = messageTypes.LEFT
    }
}

    messages.push(message);
    displayMessages()
    //scroll to the bottom
	chatWindow.scrollTop = chatWindow.scrollHeight;
})

createMessageHTML = message => {
	if (message.type === messageTypes.LOGIN) {
		return `
			<p class="secondary-text text-center mb-2">${
				message.author
			} joined the chat...</p>
		`;
	}
	return `
	<div class="message ${
		message.type === messageTypes.LEFT ? 'message-left' : 'message-right'
	}">
		<div class="message-details flex">
			<p class="flex-grow-1 message-author">${message.author}</p>
		</div>
		<p class="message-content">${message.content}</p>
	</div>
	`;
};

displayMessages = () => {
	const messagesHTML = messages
		.map(message => createMessageHTML(message))
		.join('');
	messagesList.innerHTML = messagesHTML;
};

displayMessages()

sendBtn.addEventListener('click', e => {
	e.preventDefault();
	if (!messageInput.value) {
		return console.log('Invalid input');
	}

	const message = {
		author: username,
		content: messageInput.value
	};


    sendMessage(message);

	//scroll to the bottom
	// chatWindow.scrollTop = chatWindow.scrollHeight;

	//clear input
	messageInput.value = '';
});

const sendMessage = message => {
    socket.emit('message', message)
}

loginBtn.addEventListener('click', e => {
	e.preventDefault();
	if (!usernameInput.value) {
		return console.log('Must supply a username');
	}

	//set the username and create logged in message
	username = usernameInput.value;
	messages.push({ author: username, type: messageTypes.LOGIN });
	displayMessages();

// sendMessage({ author: username, type: messageTypes.LOGIN });

	//show chat window and hide login
	loginWindow.classList.add('hidden');
	chatWindow.classList.remove('hidden');
});