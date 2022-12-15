import { createChunk } from '../store';

const { actions, values } = createChunk({
  initialState: { loading: false, loaded: false, dates: {}, error: null },
  namespace: 'searchDates',
  actions: {
    start: {
      handler: (state) => ({ ...state, loading: true }),
      payload: (n) => n
    },
    success: {
      handler: (state, payload) => ({ ...state, loading: false, loaded: true, dates: payload }),
      payload: (n) => n.dates
    },
    failure: {
      handler: (store, payload) => ({ ...store, loading: false, loaded: false, error: payload }),
      payload: (n) => n
    },
    clear: {
      handler: (store) => ({ ...store, loading: false, loaded: false, dates: {}, error: null }),
      payload: (n) => n
    }
  }
});

export const actionsSearchDates = actions;
export const valuesSearchDates = values;
