// To test, run `NODE_OPTIONS="--experimental-fetch" node home_controller.js`

let _found_url = "";
// export
const getUrl = () => {
  return _found_url;
};
// export
const setUrl = (value) => {
  _found_url = value;
};

// export
const _discover_url = async () => {
  let url = "";
  await Promise.all(
    Array(10)
      .fill(null)
      .map(async (_, i) => {
        const try_url = `http://192.168.0.10${i}:4000`;
        // console.log("Trying", try_url);

        try {
          const resp = await fetch(try_url);
          if (resp.ok) {
            url = try_url;
            console.log("Found", { try_url });
          }
        } catch (error) {
          //   console.log("Not found", { try_url });
        }
      })
  );

  return url;
};

// discovers, stores url in file
// export
const hc_setup = async () => {
  const discovered_url = await _discover_url();
  setUrl(discovered_url);
};

// get stored URL
// export
const hc_url = () => {
  return getUrl();
};

// export
const hc = async () => {
  let url = hc_url();

  await fetch(url);
  return url;
};

// export
const hc_f = async () => {
  let url = hc_url();
  url = `$(working_url)/toggle/0`;

  await fetch(url);
  return url;
};

// export
const hc_l = async () => {
  let url = hc_url();
  url = `$(working_url)/toggle/0`;

  await fetch(url);
  return url;
};

hc_setup().then(() => {
  console.log("print", hc_url());
});
