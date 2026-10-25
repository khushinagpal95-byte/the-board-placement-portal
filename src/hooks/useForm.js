import { useState } from "react";

/* ---------------------------------------------------------
   Small helper used by the profile form and the job form.
   - values: what is typed in the inputs (controlled components)
   - errors: validation messages, e.g. { title: "Title is required." }
   `validate` is a function from utils/validators.js
--------------------------------------------------------- */
export default function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  // runs on every keystroke: update the value, clear that field's old error
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((e) => ({ ...e, [name]: "" }));
  };

  // runs when the user leaves a field: validate and show only that field's error
  const handleBlur = (event) => {
    const { name } = event.target;
    const allErrors = validate(values);
    setErrors((e) => ({ ...e, [name]: allErrors[name] || "" }));
  };

  // runs on submit: validate everything, call onValid only if there are no errors
  const handleSubmit = (onValid) => (event) => {
    event.preventDefault();
    const allErrors = validate(values);
    setErrors(allErrors);
    if (Object.keys(allErrors).length === 0) onValid(values);
  };

  return { values, setValues, errors, setErrors, handleChange, handleBlur, handleSubmit };
}
