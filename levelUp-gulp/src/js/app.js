const express = require('express'),
  app = express();
const port = 3000;

app.set('view engine', 'pug');

app.get('/', function(req, res) {
  res.send('Yolo');
});

app.listen(port, () => console.log(`server started on port ${port}`));
