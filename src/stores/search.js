import {derived, writable} from "svelte/store";
import superagent from "superagent";

export const query = writable("");
export const page = writable(1);
export const results = derived(
  [query, page],
  ([$query, $page], set) => {
    if ($query === "") {
      superagent
        .get("https://api.themoviedb.org/3/tv/popular")
        .query({
          api_key: "",
          language: "fr-FR",
          page: $page
        })
        .then(data => {
          set(data.body.results);
        });
    } else {
      superagent
        .get("https://api.themoviedb.org/3/search/tv")
        .query({
          api_key: "",
          language: "fr-FR",
          page: $page,
          query: $query
        })
        .then(data => {
          set(data.body.results);
        });
    }
  },
  []
);
