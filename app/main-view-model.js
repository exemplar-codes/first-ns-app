import { Observable } from "@nativescript/core";

function getMessage(counter) {
  if (counter <= 0) {
    return "Hoorraaay! You unlocked the NativeScript clicker achievement!";
  } else {
    return `${counter} taps left`;
  }
}

export function createViewModel() {
  const viewModel = new Observable();
  // Hello, world code by NS
  // viewModel.counter = 2;
  // viewModel.message = getMessage(viewModel.counter);

  // viewModel.onTap = () => {
  //   const countMessage = getMessage(viewModel.counter);
  //   viewModel.counter--;
  //   viewModel.set("message", countMessage);
  // };

  // new code (my code)
  viewModel.xHint = "Enter github username"; // input placeholder
  const initialInput = `fetch("https://api.github.com/users/sanjarcode")
  .then((x) => x.json())
  .then((body) => {
    viewModel.set("xResult", JSON.stringify(body));
  })`;
  viewModel.xValue = initialInput; // no need of setter
  viewModel.xResult = ""; // no need of setter
  viewModel.xOnSubmitButton = () => {
    const input = viewModel.xValue;
    viewModel.set('xResult', eval(input))
    // const username = viewModel.xValue;
    // fetch(`https://api.github.com/users/${username}`)
    //   .then((x) => x.json())
    //   .then((body) => {
    //     viewModel.set("xResult", JSON.stringify(body));
    //   });
  };
  viewModel.xOnClearButton = () => {
    viewModel.set("xResult", "");
  };
  viewModel.xOnResetButton = () => {
    viewModel.set("xValue", initialInput);
  };

  return viewModel;
}
