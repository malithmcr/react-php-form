import React, {useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./styles.css";

/**
 * @component Form
 * @props - { object } -  config
 */
const Form = (props) => {
  const [mailSent, setmailSent] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
 
  /**
  * @function handleFormSubmit
  * @param e { obj } - form event
  * @return void
  */
  const handleFormSubmit = e => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API}`,
      headers: { "content-type": "application/json" },
      data: formData
    })
      .then(result => {
        if (result.data.sent) {
          setmailSent(result.data.sent)
          setError(false)
        } else {
          setError(true)
        }
      })
      .catch(error => setError( error.message ));
  };
  /**
    * @function handleChange
    * @param e { obj } - change event
    * @param field { string } - namve of the field
    * @return void
    */
   const handleChange = (e, field) => {
    let value = e.target.value;
    setFormData({
      ...formData,
      [field]: value,
    });
  };

    const { title,description, successMessage, errorMessage, fieldsConfig } = props.config;
    return (
      <div className="contact-form">
        <div className="contact-form__header">
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
      <div className="contact-form__container">
        <div>
          <form action="#">
            {fieldsConfig &&
              fieldsConfig.map(field => {
                return (
                  <React.Fragment key={field.id}>
                    {field.type !== "textarea" ? (
                      <React.Fragment>
                        <label>{field.label}</label>
                        <input
                          type={field.type}
                          className={field.klassName}
                          placeholder={field.placeholder}
                          value={field.name}
                          onChange={e => handleChange(e, field.fieldName)}
                        />
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <label>{field.label}</label>
                        <textarea className={field.klassName} placeholder={field.placeholder} onChange={e => handleChange(e, field.fieldName)} value={field.name} />
                      </React.Fragment>
                    )}
                  </React.Fragment>
                );
              })}
            <input type="submit" onClick={e => handleFormSubmit(e)} value="Submit" />
            <div>
              {mailSent && <div className="sucsess">{successMessage}</div>}
              {error && <div className="error">{errorMessage}</div>}
            </div>
          </form>
        </div>
        </div>
      </div>
    );
}

export default Form;
//propTypes for the component
Form.propTypes = {
  config: PropTypes.object.isRequired
};
