import { useState } from 'react';
/** A Custom hook for manageing the state of a form input (i.e. input and validity).
 * Custom Hooks are good for things like logging, http requests, analytics etc...
 * Custom hooks have same rules as the internal ones. E.g. they can only
 * be used in top level statement of functional components
 */

const useFormInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [validity, setValidity] = useState(false);
  // Input listener for text box
  const inputChangeHandler = (event) => {
    const { value } = event.target;
    setInputValue(value);
    if (value.trim() === '') {
      setValidity(false);
    } else {
      setValidity(true);
    }
  };
  return { value: inputValue, onChange: inputChangeHandler, validity };
};
export default useFormInput;
