const axios = require('axios');
const { Client } = require('es6');
const client = new Client({ node: 'http://localhost:9201' });

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

const indexTvShowsContent = tv_show_id => {
  return axios
    .get(`https://api.tvmaze.com/shows/${tv_show_id}/episodes`)
    .then(resp => {
      client
        .bulk({
          refresh: true,
          body: bulkFormat(resp.data, tv_show_id)
        })
        .then(() => {
          console.log(`TV Show ${tv_show_id} episodes indexed!`);
        });
    })
    .catch(e => console.error(e));
};

client
  .search({
    index: 'tv_shows',
    body: {
      size: 10000,
      stored_fields: [],
      query: {
        match_all: {}
      }
    }
  })
  .then(({ body }) => {
    const shows = body.hits.hits;
    let index = 1486;
    setInterval(() => {
      if (shows[index]) {
        console.log(`(${index}/${body.hits.total})`);
        indexTvShowsContent(shows[index]._id);
        index++;
      } else {
        return console.log('All episodes crawled!');
      }
    }, 100);
  });

module.exports = indexTvShowsContent;
