const express = require('express');
const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use('/', express.static(path.join(__dirname, 'public')));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.get('*', (req, res) => handle(req, res));

  server.listen(prod ? process.env.PORT : 5800, () => {
    console.log(`success ${prod ? process.env.PORT : 5800}`);
  });
});
