import { createChunk } from '../store';

const { actions, values } = createChunk({
  initialState: { loading: false, loaded: false, tours: [], error: null },
  namespace: 'tours',
  actions: {
    start: {
      handler: (state) => ({ ...state, loading: true }),
      payload: (n) => n
    },
    success: {
      handler: (state, payload) => ({ ...state, loading: false, loaded: true, tours: payload }),
      payload: (n) => n.tours
    },
    failure: {
      handler: (store, payload) => ({ ...store, loading: false, loaded: false, error: payload }),
      payload: (n) => n
    }
  }
});

export const actionsTours = actions;
export const valuesTours = values;
