const querystring = require("querystring");
const path = require("path");
const https = require("https");
const fs = require("fs");

// CSS File to minify
let fileName = "test.css";
let minifiedFileName = `${fileName.split(".")[0]}.min.css`

// Read the CSS file synchronously
let fileData = fs.readFileSync(path.resolve(__dirname, fileName), "utf8");

// Pass the query parameters
let query = querystring.stringify({
  input: fileData
});

// Configure request and response
let req = https.request(
  {
    method: "POST",
    port: 443,
    hostname: "cssminifier.com",
    path: "/raw"
  }, res => {
    // if the statusCode isn't what we expect, get out of here
    if (res.statusCode !== 200) {
      console.log("StatusCode=" + res.statusCode);
      return;
    }
    let data = '';

    // Store all incoming data chunks
    res.on("data", chunk => {
        data += chunk;
    });

    // Write to a file once all data chunks have been downloaded
    res.on("end", () => {
      fs.writeFile(path.resolve(__dirname, minifiedFileName), data, err => {
        if (err) throw err;
        console.log(`The file: ${minifiedFileName} has been saved in ${__dirname}`);
      });
    });
  }
)

// Request extra configurations
req.on("error", err => { throw err });
req.setHeader("Content-Type", "application/x-www-form-urlencoded");
req.setHeader("Content-Length", query.length);
req.end(query, "utf8");
