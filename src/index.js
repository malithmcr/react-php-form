import React from 'react';
import ReactDOM from 'react-dom';
import Form from '../src/components/Form';

const config = {
  api: `${process.env.REACT_APP_API}`,
  title: 'Contact Me',
  successMessage: 'Thank you for contcting me.',
  errorMessage: 'Sorry we have some problems.',
  fields:  [
   { name: 'First Name', type: 'text', isRequired: true , klassName:'first-name-field'},
   { name: 'Last Name', type: 'text', isRequired: true , klassName:'last-name-field'}
  ]
}
ReactDOM.render(<Form config={config} />, document.getElementById('root'));
