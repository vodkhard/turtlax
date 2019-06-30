const axios = require('axios');
const { Client } = require('es6');
const client = new Client({ node: 'http://localhost:9201' });

const bulkData = data =>
  data.reduce(
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

const bulkFormat = (data, id) =>
  data.reduce((acc, item) => {
    item.tv_show_id = id;
    return acc.concat([
      {
        index: {
          _index: 'tv_shows_episodes',
          _type: '_doc',
          _id: item.id
        }
      },
      item
    ]);
  }, []);

const indexTvShowsContent = show => {
  return new Promise(resolve => {
    const crawl = () =>
      axios
        .get(`https://api.tvmaze.com/shows/${show.id}/episodes`)
        .then(resp => {
          if (resp.data.length === 0) resolve();
          client
            .bulk({
              refresh: true,
              body: bulkFormat(resp.data, show.id)
            })
            .then(() => {
              console.log(`[${show.id}] ${show.name} episodes indexed!`);
              resolve();
            });
        });
    crawl().catch(e => {
      if (e.response.status === 429) {
        console.log('WARNING !!! Rate limit !!!!');
        setTimeout(crawl, 5 * 1000);
      } else {
        console.log(e);
        resolve();
      }
    });
  });
};

const bulkIndexTvShowsContent = async shows => {
  for (let index = 0; index < shows.length; index++) {
    const show = shows[index];
    await indexTvShowsContent(show);
  }
};

const indexTvShows = (page = 0) => {
  axios
    .get(`https://api.tvmaze.com/shows?page=${page}`)
    .then(({ data }) => {
      const shows = data.filter(show => show.rating.average !== null);
      console.log(shows.length);

      bulkIndexTvShowsContent(shows).then(() => {
        client
          .bulk({
            refresh: true,
            body: bulkData(shows)
          })
          .then(() => {
            console.log(`Page ${page} of shows indexed!`);
            console.log(
              '----------------- Next Page ! ------------------------'
            );
            indexTvShows(page + 1);
          });
      });
    })
    .catch(e => {
      if (e.response && e.response.status === 429) {
        console.log('WARNING !!! Rate limit !!!!');
        setTimeout(() => indexTvShows(page), 5 * 1000);
      }
      console.log(`${page - 1} pages crawled! Over...`);
    });
};

indexTvShows(171);
