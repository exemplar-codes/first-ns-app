// To test, run `NODE_OPTIONS="--experimental-fetch" node home_controller.js`

let _found_url = "";
const getUrl = () => {
  return _found_url;
};
const setUrl = (value) => {
  _found_url = value;
};

const DEFAULT_GUESSES = [3, 7];
const _discover_url = async (guesses = DEFAULT_GUESSES) => {
  // if (guess !== null) {
  //   const guess_url = `http://192.168.0.10${guess}:4000`;
  //   const resp = await fetch(guess_url);
  //   if (resp.ok) {
  //     console.log("Guess, found", { guess_url });
  //     return guess_url;
  //   }
  // }

  let url = "";

  const addresses = [
    ...guesses,
    ...Array(10)
      .fill(null)
      .map((__, i) => i),
  ];

  // early return
  for (let i of addresses) {
    const try_url = `http://192.168.0.10${i}:4000`;
    // console.log("Trying", { try_url });
    try {
      const resp = await fetch(try_url);
      if (resp.ok) {
        url = try_url;
        console.log("Found", { try_url });

        break;
      }
    } catch (error) {
      // console.log("Not found", { try_url });
    }
  }

  return url;
};

// discovers, stores url in file
const hc_setup = async () => {
  const discovered_url = await _discover_url(); // time varies - max 12s, min 2s
  setUrl(discovered_url);
  return discovered_url;
};

// get stored URL
const hc_url = () => {
  return getUrl();
};

const hc = async () => {
  let url = hc_url();

  await fetch(url);
  return url;
};

const hc_f = async () => {
  let url = hc_url();
  url = `${url}/toggle/0`;

  await fetch(url);
  return url;
};

const hc_l = async () => {
  let url = hc_url();
  url = `${url}/toggle/1`;

  await fetch(url);
  return url;
};

const test = "HC is available";

// hc_setup().then(() => {
//   console.log("print", hc_url());
//   console.log("print again", hc_url());
//   console.log("set", setUrl(123));
//   console.log("print", hc_url());
// });

export default {
  getUrl,
  setUrl,
  _discover_url,
  hc_setup,
  hc_url,
  hc,
  hc_f,
  hc_l,
  test,
};
