import React, { Component } from 'react';
import SocketContext from './contexts/SocketContext';
import Dummy from './components/Dummy/Dummy'
import './App.css';

class App extends Component {

  getName(){
    var person = prompt("Please enter your name. \nMust be shorter than 21 characters", "Anonymous");
      if(person == null || person.length > 21){
        alert("Invalid Name!");
        return this.getName();
      }
      else {
        return person;
      }
  }


  componentDidMount(){
    const { socket } = this.context;
    console.log(socket);

    socket.emit("adduser", this.getName(), function(available){
      if (available){
        console.log("user added!");
      }
      else{
        console.log("something went wrong");
        alert("Name already taken :(");
      }
    });
  }
/*
socket.emit("adduser", "GnoMe", function(available){
  if (available){
    console.log("user added!");
  }
  else{
    console.log("something went wrong");
  }
});
*/


  render() {
    return (
      <div className="App">
        <Dummy />
      </div>
    );
  }
}

App.contextType = SocketContext;

export default App;
