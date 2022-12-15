import { createChunk } from '../store';

const { actions, values } = createChunk({
  initialState: { loading: false, loaded: false, geo: [], error: null },
  namespace: 'searchGeoTree',
  actions: {
    start: {
      handler: (state) => ({ ...state, loading: true }),
      payload: (n) => n
    },
    success: {
      handler: (state, payload) => ({ ...state, loading: false, loaded: true, geo: payload }),
      payload: (n) =>
        n.geo
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((c) => {
            if (c.children) {
              return { ...c, children: c.children.sort((a, b) => a.name.localeCompare(b.name)) };
            }
            return c;
          })
          .sort((a, b) => (a?.children?.length || -1) - (b?.children?.length || -1))
    },
    failure: {
      handler: (store, payload) => ({ ...store, loading: false, loaded: false, error: payload }),
      payload: (n) => n
    }
  }
});

export const actionsSearchGeoTree = actions;
export const valuesSearchGeoTree = values;
