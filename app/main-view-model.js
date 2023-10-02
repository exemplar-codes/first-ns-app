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
  viewModel.counter = 2;
  viewModel.message = getMessage(viewModel.counter);

  viewModel.onTap = () => {
    const countMessage = getMessage(viewModel.counter);
    viewModel.counter--;
    viewModel.set("message", countMessage);
  };

  // new code (my code)
  viewModel.xHint = 2; // input placeholder
  viewModel.xValue = "Hello, world"; // no need of setter
  viewModel.xOnButtonClick = () => {
    viewModel.set("message", viewModel.xValue);
  };

  return viewModel;
}
