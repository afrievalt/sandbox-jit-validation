import { useContext } from "react";
import { useField, useForm } from "react-final-form";
import { getError } from "./getError";
import { FormContext } from "./StandardForm";

const useHandleFocusChange = (input) => {
  const { name: fieldId } = input;
  const { getRegisteredFields } = useForm();
  const [pastFields, setPastFields] = useContext(FormContext);

  function handleFocusChange() {
    const registeredFields = getRegisteredFields();
    const lastPastFieldId = [...pastFields].pop();
    const lastPastFieldIndex = registeredFields.indexOf(lastPastFieldId);
    const i = registeredFields.indexOf(fieldId);
    const isMorePast = ~i && lastPastFieldIndex < i;
    isMorePast && setPastFields(registeredFields.slice(0, i));
    input.onFocus(...arguments);
  }
  return handleFocusChange;
};

function useFieldWithPast(fieldId, options) {
  const { input, meta } = useField(fieldId, options);
  const [pastFields] = useContext(FormContext);
  const handleFocusChange = useHandleFocusChange(input);

  return {
    input: {
      ...input,
      onFocus: handleFocusChange
    },
    meta: {
      ...meta,
      past: pastFields?.includes(fieldId) || meta.submitFailed
    }
  };
}

function useFormField(fieldId, options) {
  const { input, meta } = useFieldWithPast(fieldId, options);

  return {
    input,
    meta: {
      ...meta,
      ...getError(meta) // showError, errorMessage
    }
  };
}

export default useFormField;
