import { createChunk } from '../store';

const { actions, values } = createChunk({
  initialState: { loading: false, loaded: false, result: {}, error: null },
  namespace: 'tours',
  actions: {
    startSearch: {
      handler: (state) => ({ ...state, loading: true }),
      payload: (n) => n
    },
    startLoad: {
      handler: (state) => ({ ...state, loading: true }),
      payload: (n) => n
    },
    success: {
      handler: (state, payload) => ({ ...state, loading: false, loaded: true, result: payload }),
      payload: (n) => n
    },
    failure: {
      handler: (store, payload) => ({
        ...store,
        loading: false,
        loaded: false,
        result: {},
        error: payload
      }),
      payload: (n) => n
    }
  }
});

export const actionsTours = actions;
export const valuesTours = values;
