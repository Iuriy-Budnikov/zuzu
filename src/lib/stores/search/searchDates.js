import { createChunk } from '../store';

const { actions, values } = createChunk({
  initialState: { loading: false, dates: [], error: null },
  namespace: 'searchDates',
  actions: {
    start: {
      handler: (state) => ({ ...state, loading: true }),
      payload: (n) => n
    },
    success: {
      handler: (state, payload) => ({ ...state, loading: false, dates: payload }),
      payload: (n) => n.dates
    },
    failure: {
      handler: (store, payload) => ({ ...store, loading: false, error: payload }),
      payload: (n) => n
    }
  }
});

export const actionsSearchDates = actions;
export const valuesSearchDates = values;