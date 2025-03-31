import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World! Update 3/31 220pm');
});

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);