import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const API_PATH = 'http://localhost:1992/react-contact-form/api/contact/index.php';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      email: '',
      message: '',
      mailSent: false,
      error: null
    }
  }

  handleFormSubmit = e => {
    e.preventDefault();
    axios({
        method: 'post',
        url: `${API_PATH}`,
        headers: { 'content-type': 'application/json' },
        data: this.state
      })
    .then(result => {
      this.setState( { 
        mailSent: result.data.sent
      })
      console.log(this.state);
    })
    .catch(error => this.setState( { error: error.message } ));
  };

  render() {
    return (
      <div className="App">
          <p>Contact Me</p>
          <div>
            <form action="#">
              <label>First Name</label>
              <input type="text" id="fname" name="firstname" placeholder="Your name.." 
              value={this.state.fname }
              onChange={e => this.setState({ fname: e.target.value })}
              />

              <label>Last Name</label>
              <input type="text" id="lname" name="lastname" placeholder="Your last name.." 
              value={this.state.lname}
              onChange={e => this.setState({ lname: e.target.value })}
              />
              
              <label>Email</label>
              <input type="email" id="email" name="email" placeholder="Your email"
              value={this.state.email} 
              onChange={e => this.setState({ email: e.target.value })}
              />
              
              <label>Message</label>
              <textarea id="message" name="message" placeholder="Write something.."
              onChange={e => this.setState({ message: e.target.value })}
              value={this.state.message}
              ></textarea>

              <input type="submit" onClick = {e => this.handleFormSubmit(e)}  value="Submit" />
              <div> 
                {this.state.mailSent  &&
                  <div className="sucsess">Thank you for contcting me.</div>
                }
                {this.state.error  &&
                  <div className="error">Sorry we had some problems.</div>
                }
              </div>
            </form>
          </div>
      </div>
    );
  }
}

export default App;
