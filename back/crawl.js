const axios = require('axios');
const { Client } = require('es6');
const client = new Client({ node: 'http://localhost:9201' });

const bulkData = data =>
  data.filter(datum => datum.rating.average !== null).reduce(
    (acc, item) =>
      acc.concat([
        {
          index: {
            _index: 'tv_shows',
            _type: '_doc',
            _id: item.id
          }
        },
        item
      ]),
    []
  );

const indexTvShows = (page = 0) => {
  axios
    .get(`https://api.tvmaze.com/shows?page=${page}`)
    .then(resp => {
      indexTvShows(page + 1);

      const bulk = bulkData(resp.data);
      debugger;

      client
        .bulk({
          refresh: true,
          body: bulk
        })
        .then(() => {
          console.log(`Page ${page} indexed!`);
        });
    })
    .catch(e => {
      console.error(e);
      console.log(`${page - 1} pages crawled! Over...`);
    });
};

indexTvShows();
