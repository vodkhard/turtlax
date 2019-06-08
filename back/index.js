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
          multi_match: {
            query: params.query,
            operator: 'and',
            fuzziness: 'auto',
            fields: ['name', 'externals.imdb.keyword']
          }
        }
      }
    })
    .then(({ body }) => {
      res.status(200).send(body.hits.hits);
    })
    .catch(console.error);
});

app.get('/shows/:id/episodes', (req, res) => {
  const show_id = req.params.id;
  client
    .search({
      index: 'tv_shows_episodes',
      body: {
        size: 10000,
        sort: [{ season: 'desc' }, { number: 'desc' }],
        query: {
          term: {
            tv_show_id: show_id
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
