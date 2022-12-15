import React from "react";
import { render } from "react-dom";
import Styles from "./Styles";
import validate from "./validate";
import StandardForm from "./StandardForm";
import InputRow from "./InputRow";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const App = () => (
  <Styles>
    <h1> React Final Form Example</h1>
    <h2>Just in time (JIT) validation</h2>
    <a href="https://github.com/final-form/react-final-form#-react-final-form">
      Read Docs
    </a>

    <h2 id="objective">Objective:</h2>
    <p>
      Most forms show required error messages when the user moves out of a
      required field or submits the form. The{" "}
      <a href="https://designmodo.com/ux-form-validation/#right-time">
        right time
      </a>{" "}
      to show errors is when a user skips a required field. A field is{" "}
      <strong>skipped</strong> whenever any control below the required field is
      used.
    </p>

    <h2 id="example">Example:</h2>
    <p>
      The user’s only interaction is clicking the 3rd field, the first two
      fields should display the “<font color="red">Required</font>” error
      messages.
    </p>

    <p>Example by Andy Frievalt</p>

    <StandardForm onSubmit={onSubmit} validate={validate}>
      <InputRow label="First Name" fieldId="firstName" />
      <InputRow label="Last Name" fieldId="lastName" />
      <InputRow label="Street" fieldId="street" />
      <InputRow label="Age" fieldId="age" />
    </StandardForm>
  </Styles>
);

render(<App />, document.getElementById("root"));
