import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';

/*eslint-disable no-console*/

const port = 3000;
const app = express();
const compiler = webpack(config);
//app.use is way to tell express other things we want to use. Goig to use middleware and the compiler from line 9.
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true, //No special info displayed
publicPath: config.output.publicPath //configure public path. Variable we degined when set it up.
}));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/users', function(req, res) {
  //hard coding for simplicity, Pretend this hits a real DB
  res.json([
    {"id": 1, "firstName":"Bob","lastName":"Smith","email":"bob@gmail.com"},
    {"id": 2, "firstName":"Tammy","lastName":"Norton","email":"tnorton@yahoo.com"},
    {"id": 3, "firstName":"Tina","lastName":"Lee","email":"lee.tina@hotmail.com"}
  ]);
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
open('http://localhost:' + port);

  }
});
