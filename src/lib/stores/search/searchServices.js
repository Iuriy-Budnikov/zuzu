import { createChunk } from '../store';

const { actions, values } = createChunk({
  initialState: { loading: false, loaded: false, services: {}, error: null },
  namespace: 'searchServices',
  actions: {
    start: {
      handler: (state) => ({ ...state, loading: true }),
      payload: (n) => n
    },
    success: {
      handler: (state, payload) => ({ ...state, loading: false, loaded: true, services: payload }),
      payload: (n) => n.search
    },
    failure: {
      handler: (store, payload) => ({ ...store, loading: false, loaded: false, error: payload }),
      payload: (n) => n
    }
  }
});

export const actionsSearchServices = actions;
export const valuesSearchServices = values;
