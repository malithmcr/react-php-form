import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './styles.css';

/**
 * @component Form
 * @props
 */
class Form extends React.Component {
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
        url: `${process.env.REACT_APP_API}`,
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
    const { title, successMessage, errorMessage } = this.props.config;
    return (
      <div className="App">
          <h2>{ title }</h2>
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
                  <div className="sucsess">{ successMessage }</div>
                }
                {this.state.error  &&
                  <div className="error">{ errorMessage }</div>
                }
              </div>
            </form>
          </div>
      </div>
    );
  }
}

export default Form;
//propTypes for the component
Form.propTypes = {
  config: PropTypes.object.isRequired,
}