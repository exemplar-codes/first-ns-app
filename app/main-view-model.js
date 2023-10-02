import { Observable } from "@nativescript/core";
import home_controller from "./utils/home_controller";
const { hc_setup, hc, hc_url, hc_l, hc_f } = home_controller;

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
    viewModel.set("xResult", eval(input));
    // const username = viewModel.xValue;
    // fetch(`https://api.github.com/users/${username}`)
    //   .then((x) => x.json())
    //   .then((body) => {
    //     viewModel.set("xResult", JSON.stringify(body));
    //   });
  };
  viewModel.xOnClearButton = () => {
    viewModel.set("xValue", "");
  };
  viewModel.xOnResetButton = () => {
    viewModel.set("xValue", initialInput);
  };

  // fan stuff
  viewModel.discoveredUrl = "❌ http://192.168.0.10x:4000";
  viewModel.xOnDiscoverButton = async () => {
    const url = await hc_setup();
    console.log({ discovered_url: url });
    if (url) {
      viewModel.discoveredUrl = url;
      viewModel.set("discoveredUrl", `✅ ${url}`);
    }
  };
  viewModel.xOnFanButton = () => {
    console.log(hc_url(), "fan toggled");
    hc_f();
  };
  viewModel.xOnLightButton = () => {
    console.log(hc_url(), "light toggled");
    hc_l();
  };

  return viewModel;
}
