const axios = require('axios');
const { Client } = require('es6');
const client = new Client({ node: 'http://localhost:9201' });

const indexTvShows = (page = 0) => {
  axios
    .get(`https://api.tvmaze.com/shows?page=${page}`)
    .then(resp => {
      indexTvShows(page + 1);

      const bulk = resp.data.reduce((acc, item) => {
        return acc.concat([
          {
            index: {
              _index: 'tv_shows',
              _type: '_doc',
              _id: item.id
            }
          },
          item
        ]);
      }, []);

      client
        .bulk({
          refresh: true,
          body: bulk
        })
        .then(() => {
          console.log(`Page ${page} indexed!`);
        });
    })
    .catch(() => {
      console.log(`${page - 1} pages crawled! Over...`);
    });
};

indexTvShows();
