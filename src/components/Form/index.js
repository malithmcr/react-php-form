import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./styles.css";

/**
 * @component Form
 * @props
 */
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      message: "",
      mailSent: false,
      error: null
    };
  }

  handleFormSubmit = e => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API}`,
      headers: { "content-type": "application/json" },
      data: this.state
    })
      .then(result => {
        this.setState({
          mailSent: result.data.sent
        });
        console.log(this.state);
      })
      .catch(error => this.setState({ error: error.message }));
  };

  render() {
    const { title, successMessage, errorMessage, fields } = this.props.config;
    return (
      <div className="App">
        <h2>{title}</h2>
        <div>
          <form action="#">
            {fields &&
              fields.map(field => {
                return (
                  <React.Fragment key={field.id}>
                    {field.type !== "textarea" ? (
                      <React.Fragment>
                        <label>{field.label}</label>
                        <input
                          type={field.type}
                          className={field.klassName}
                          placeholder={field.placeholder}
                          value={this.state.fname}
                          onChange={e => this.setState({ fname: e.target.value })}
                        />
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <label>{field.label}</label>
                        <textarea
                          className={field.klassName}
                          placeholder={field.placeholder}
                          onChange={e => this.setState({ message: e.target.value })}
                          value={this.state.message}
                        />
                      </React.Fragment>
                    )}
                  </React.Fragment>
                );
              })}
            <input type="submit" onClick={e => this.handleFormSubmit(e)} value="Submit" />
            <div>
              {this.state.mailSent && <div className="sucsess">{successMessage}</div>}
              {this.state.error && <div className="error">{errorMessage}</div>}
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
  config: PropTypes.object.isRequired
};
