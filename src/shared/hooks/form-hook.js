import { useCallback, useReducer } from "react";

// state is a previous action and action is something that is in the dispatch function.
const formReducer = (state, action) => {
  switch(action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]){
          continue;
        }
        if(inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {value: action.value, isValid: action.isValid}
        },
        isValid: formIsValid
      }
    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid
      } 
    case "RESET_DATA":
      const reset = {inputs: {}, isValid: false};
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]){
          continue;
        }
        reset.inputs.inputId = {value: "", isValid: false};
      }
      return reset;
    default:
      return state;
  }
}

const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity
  })

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({type: "INPUT_CHANGE", inputId: id, value: value, isValid: isValid})
  }, []);

  const resetHandler = useCallback(() => {
    dispatch({type: "RESET_DATA"})
  }, [])

  const setFormData = useCallback( (inputData, formValidity) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputData,
      formIsValid: formValidity
    })
  }, [])

  return [formState, inputHandler, setFormData.bind, resetHandler];
}

export default useForm;