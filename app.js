var express = require("express");
var app = express();
var request = require("request");
var cors = require("cors");

var port = 4000;

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

app.get("/", function(req, res) {
  res.send(`App is running on ${port}`);
});

app.post("/submit/request", (req, res) => {
  // redirect post request from frontend to server due to CORS issues initially
  request.post(
    {
      headers: { "Content-Type": "application/json" },
      url: "https://heksemel.no/case/submit.php",
      body: JSON.stringify(req.body)
    },
    function(error, response, body) {
      console.log("error", error);
      console.log("res.body", response.body);
      if (response.body) {
        res.send(response.body);
      }
    }
  );
});
app.listen(port, function() {
  console.log("App listening on port 4000");
});
