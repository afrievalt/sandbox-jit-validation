import React, { createContext, useState } from "react";
import { Form } from "react-final-form";
import createDecorator from "final-form-focus";

const focusOnErrorDecorator = createDecorator();
const decorators = [focusOnErrorDecorator];
export const FormContext = createContext("standardForm");
const { Provider } = FormContext;

const StandardForm = ({
  onSubmit,
  initialValues,
  validate,
  children,
  ...rest
}) => {
  const context = useState([]);
  const defaultValues = initialValues || {};

  return (
    <Provider value={context}>
      <Form
        onSubmit={onSubmit}
        initialValues={defaultValues}
        validate={validate}
        decorators={decorators}
      >
        {({ handleSubmit, values, submitting, form, pristine }) => (
          <>
            <form onSubmit={handleSubmit} {...rest}>
              {children}
              <div className="buttons">
                <button type="submit" disabled={submitting}>
                  Submit
                </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div>
            </form>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </>
        )}
      </Form>
    </Provider>
  );
};

export default StandardForm;
