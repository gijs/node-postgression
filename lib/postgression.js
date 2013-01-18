var http = require('http');

var postgression = {
  provision: function(callback) {
    http.get('http://api.postgression.com', function(res) {
      var body = "";

      res.on('error', function(e) {
        callback("Sorry, there was an error on our end. Please try again shortly.");
      });

      res.on('data', function(chunk) {
        body += chunk;
      });

      res.on('end', function() {
        if(res.statusCode === 200) {
          callback(body);
        } else {
          var message = "We are sorry. There was an error with your request.\n";
          message += "Please try again shortly.\n";
          message += "Response Status Code: " + res.statusCode + "\n";
          message += "Response Body:\n";
          message += body;
          callback(message);
        }
      });
    });
  }
};

exports = module.exports = postgression;
