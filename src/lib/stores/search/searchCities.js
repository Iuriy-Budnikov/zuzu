import { createChunk } from '../store';

const { actions, values } = createChunk({
  initialState: { loading: false, cities: [], error: null },
  namespace: 'searchCities',
  actions: {
    start: {
      handler: (state) => ({ ...state, loading: true }),
      payload: (n) => n
    },
    success: {
      handler: (state, payload) => ({ ...state, loading: false, cities: payload }),
      payload: (n) => n.fromCities
    },
    failure: {
      handler: (store, payload) => ({ ...store, loading: false, error: payload }),
      payload: (n) => n
    }
  }
});

export const actionsSearchCities = actions;
export const valuesSearchCities = values;
