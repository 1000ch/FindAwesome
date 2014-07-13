var pm2 = require('pm2');

// Connect or launch PM2
pm2.connect(function(error) {

  if (error) {
    throw new Error();
  }

  // Start a script on the current folder
  pm2.start('index.js', { name: 'test' }, function(error, process) {

    if (error) {
      throw new Error();
    }

    // Get all processes running
    pm2.list(function(error, processList) {

      if (error) {
        throw new Error();
      }

      console.log(processList);

      // Disconnect to PM2
      pm2.disconnect(function() {
        process.exit(0);
      });
    });
  });
});