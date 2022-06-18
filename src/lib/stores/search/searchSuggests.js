import { createChunk } from '../store';

const { actions, values } = createChunk({
  initialState: { loading: false, suggests: [], error: null },
  namespace: 'searchSuggests',
  actions: {
    start: {
      handler: (state) => ({ ...state, loading: true }),
      payload: (n) => n
    },
    success: {
      handler: (state, payload) => ({ ...state, loading: false, suggests: payload }),
      payload: (n) =>
        Object.keys(n.response)
          .map((key) => n.response[key])
          .sort((a, b) => b.weight - a.weight)
          .filter((c) => {
            if (c.type === 'hotel' && c.price === '') {
              return false;
            }
            return true;
          })
    },
    failure: {
      handler: (store, payload) => ({ ...store, loading: false, error: payload }),
      payload: (n) => n
    }
  }
});

export const actionsSearchSuggests = actions;
export const valuesSearchSuggests = values;
