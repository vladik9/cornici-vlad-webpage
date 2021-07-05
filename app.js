const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const { constants } = require("buffer");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.get("/index.html", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.get("/CV.html", function (req, res) {
  res.sendFile(__dirname + "/CV.html");
});
app.get("/Contact.html", function (req, res) {
  res.sendFile(__dirname + "/Contact.html");
});

app.post("/Contact.html", function (req, res) {
  let userName = req.body.user_name;
  let UserEmail = req.body.user_email;
  let userMessage = req.body.user_message;
  console.log(userName + " " + userMessage + " " + UserEmail);

  const url = "url api";
  const options = {
    // make a options object for autentication method and post request option
    method: "POST",
    auth: "pasword: api", // the authentification login can be random until the api key is unchanged
  };
  const dataFromUser = {
    //make a JS object with an arr of object
    members: [
      {
        email_address: UserEmail,
        status: "subscribed",
        merge_fields: { FNAME: userName, UMESSAGE: userMessage },
      },
    ],
  };
  const JsonData = JSON.stringify(dataFromUser);
  const sendingData = https.request(url, options, function (response) {
    //store https request in a variable and make a request to the server
    response.on("data", function (data) {
      // manage the response from the server and print data in normal JSON format
      console.log(JSON.parse(data));

      if (response.statusCode === 200) res.sendFile(__dirname + "/succes.html");
      else res.sendFile(__dirname + "/fail.html");
    });
  });
  // write the data into a buferr and send to the server
  sendingData.write(JsonData);
  sendingData.end();
});
app.listen(8080, () => {
  console.log("Port start at 8080");
});

app.listen(process.env.PORT, () => {
  console.log("Port start at HerrokyPort");
});
