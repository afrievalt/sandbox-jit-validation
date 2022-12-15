const acquireHideErrorLookup = {
  "-": ({ touched }) => !touched, // if error '-someError', show only when touched
  "*": ({ past }) => !past // if error '*required', show only when past
};

/*
Get error returns an object with two values, showError and errorMessage.  
errorMessage is similar to meta.error, but is an empty string if the 
error should be suppressed.

meta.error contains an error message if the field is not valid.  
Typically each form field contains logic to determine if the error 
message should be displayed.  This is not very dry.  It also seems 
odd to have validation logic and ‘should display error’ logic in 
two different locations.  To rectify these issues, I use the string 
as a data structure prepending a ‘*’ or ‘-’ to the meta.error.    
Prepending * will suppress the error until meta.past is true.  
Prepending - will spuress the error until meta.touched is true. 

see validate.js for examples
*/
export const getError = (meta) => {
  const { error = "" } = meta;
  const [errorFirstChar] = error || [];
  const inProgressError = acquireHideErrorLookup[errorFirstChar];
  const getHideError = acquireHideErrorLookup[errorFirstChar] || (() => false);

  const displayError = inProgressError ? error.substring(1) : error;
  const errorMessage = getHideError(meta) ? "" : displayError;
  return {
    showError: !!errorMessage,
    errorMessage
  };
};
