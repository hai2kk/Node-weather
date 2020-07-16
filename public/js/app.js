console.log("My client side JS loaded here!");

const weatherForm = document.querySelector("form");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  var output = document.querySelector("#outputDiv");
  output.innerHTML = "Loading...";
  console.log("testing");
  const location = document.querySelector("input").value;
  const url = "/weather?address=" + location;

  fetch(url).then((response) => {
    response.json().then((data) => {
      console.log(data);
      const {
        temperatue,
        description,
        address,
        region,
        feelslike,
      } = data.forecast;
      if (data.forecast != "Error connecting to location service.") {
        output.innerHTML = `It is ${temperatue} degree celsius and ${description} in ${address},${region}. Feels like ${feelslike}`;
      }
    });
  });
});
