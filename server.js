const static = require('node-static');

const file = new static.Server('./');

const PORT = 3000;

require('http')
  .createServer(function(request, response) {
    request
      .addListener('end', function() {
        file.serve(request, response);
      })
      .resume();
  })
  .listen(PORT, function() {
    console.log(`server is on ${PORT}`);
  });
