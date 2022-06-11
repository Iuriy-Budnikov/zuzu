import { writable } from 'svelte/store';
import { lang, geoId, access_token } from './searchConst';
import { apiClient } from './searchClient';

export const searchCitiesData = writable({});
export const searchCitiesFetching = writable(false);

const setSearchCities = (data) => {
  searchCitiesData.update(() => {
    return { ...data };
  });
};

const setSearchCitiesFetching = (isPending) => {
  searchCitiesFetching.update(() => {
    return isPending;
  });
};

export async function fetchSearchCities() {
  try {
    setSearchCitiesFetching(true);
    const { data } = await apiClient.get('/2.5/tours/deptCities', {
      params: {
        lang,
        access_token,
        geoId
      }
    });
    setSearchCities(data);
  } catch (err) {
    console.error(err);
  } finally {
    setSearchCitiesFetching(false);
  }
}
