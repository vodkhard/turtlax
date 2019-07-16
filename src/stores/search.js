import { derived, writable } from 'svelte/store';

export const query = writable('');
export const page = writable(1);
export const filters = writable([]);
export const results = derived(
  [query, filters],
  ([$query, $filters], set) => {
    const url = new URL('http://localhost:3005');
    if ($query) {
      url.searchParams.append('query', $query);
    }
    $filters.forEach(({ name, value }) => {
      url.searchParams.append(`filters[${name}]`, value);
    });

    if ($query === '') {
      url.pathname = 'trends';
    } else {
      url.pathname = 'search';
    }

    fetch(url.toString())
      .then(data => data.json())
      .then(results => {
        set(results);
      });
  },
  []
);
