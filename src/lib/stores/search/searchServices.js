import { createChunk } from '../store';

const { actions, values } = createChunk({
  initialState: { loading: false, services: {}, error: null },
  namespace: 'searchServices',
  actions: {
    start: {
      handler: (state) => ({ ...state, loading: true }),
      payload: (n) => n
    },
    success: {
      handler: (state, payload) => ({ ...state, loading: false, services: payload }),
      payload: (n) => n.search
    },
    failure: {
      handler: (store, payload) => ({ ...store, loading: false, error: payload }),
      payload: (n) => n
    }
  }
});

export const actionsSearchServices = actions;
export const valuesSearchServices = values;
