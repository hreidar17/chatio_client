import React from 'react';
import SocketContext from '../../contexts/SocketContext';

class ChatWindow extends React.Component {
    componentDidMount() {
        const { socket } = this.context;
        socket.on('message', message => {
            const { messages } = this.state;
            this.setState({ messages: [ ...messages, message ] });
        });
    }
    constructor(props) {
        super(props);
        this.state = {
            messages: [], /* List of all messages within the public lobby */
            message: '' /* Current message */
        };
    }
    sendMessage(message) {
        const { socket } = this.context;
        if (message === '') { return false; }
        socket.emit('message', message);
        this.setState({ message: '' });
    }
    render() {
        const { users } = this.props;
        const { messages, message } = this.state;
        return (
            <div className="chat-window">
                <ChatWindow.Title />
                <ChatWindow.Messages messages={ messages } />
                <ChatWindow.Users users={ users } />
                <div className="input-container">
                    <input type="text" value={ message } onChange={e => this.setState({ message: e.target.value })} placeholder="Enter your message here..." />
                    <button type="button" onClick={() => this.sendMessage(message)}>Send</button>
                </div>
            </div>
        );
    }
};

ChatWindow.Title = () => (
    <h3>
        <span className="first">Chat.io</span>
    </h3>
);

ChatWindow.Messages = props => (
    <div className="messages">
        { props.messages.map(m => <div key={ m } className="message">{ m }</div>) }
    </div>
);

ChatWindow.Users = props => (
    <div className="users">
        { props.users.map(u => <div key={ u } className="user">{ u }</div>) }
    </div>
);

ChatWindow.contextType = SocketContext;

export default ChatWindow;
