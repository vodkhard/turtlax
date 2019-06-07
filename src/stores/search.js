import { derived, writable } from 'svelte/store';

export const query = writable('');
export const page = writable(1);
export const results = derived(
  [query, page],
  ([$query, $page], set) => {
    if ($query === '') {
    } else {
      fetch(`http://localhost:3005/search?query=${$query}`)
        .then(data => data.json())
        .then(shows => {
          set(shows);
        });
    }
  },
  []
);
