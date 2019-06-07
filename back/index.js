const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const { Client } = require('es6');
const client = new Client({ node: 'http://localhost:9201' });

const app = express();
app.use(cors('*'));
app.use(bodyparser.json());

app.get('/search', (req, res) => {
  const params = req.query;
  client
    .search({
      index: 'tv_shows',
      body: {
        sort: [{ weight: 'desc' }],
        query: {
          match: {
            name: {
              query: params.query,
              operator: 'and',
              fuzziness: 'auto'
            }
          }
        }
      }
    })
    .then(({ body }) => {
      res.status(200).send(body.hits.hits);
    })
    .catch(console.error);
});
const port = 3005;
app.listen(port, () => console.log('App listening on port : ' + port));
