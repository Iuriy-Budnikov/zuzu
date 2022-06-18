import { createChunk } from '../store';

const { actions, values } = createChunk({
  initialState: {
    isSuggestModalOpened: false,
    isGeoTreeModalOpened: false,
    isDepsModalOpened: false,
    isNightsModalOpened: false,
    isPeopleModalOpened: false
  },
  namespace: 'searchForm',
  actions: {
    openSuggestModal: {
      handler: (store) => ({ ...store, isSuggestModalOpened: true })
    },
    closeSuggestModal: {
      handler: (store) => ({ ...store, isSuggestModalOpened: false })
    },
    openGeoTreeModal: {
      handler: (store) => ({ ...store, isGeoTreeModalOpened: true })
    },
    closeGeoTreeModal: {
      handler: (store) => ({ ...store, isGeoTreeModalOpened: false })
    },
    openDepsModal: {
      handler: (store) => ({ ...store, isDepsModalOpened: true })
    },
    closeDepsModal: {
      handler: (store) => ({ ...store, isDepsModalOpened: false })
    },
    openNightsModal: {
      handler: (store) => ({ ...store, isNightsModalOpened: true })
    },
    closeNightsModal: {
      handler: (store) => ({ ...store, isNightsModalOpened: false })
    },
    openPeopleModal: {
      handler: (store) => ({ ...store, isPeopleModalOpened: true })
    },
    closePeopleModal: {
      handler: (store) => ({ ...store, isPeopleModalOpened: false })
    }
  }
});

export const actionsSearchForm = actions;
export const valuesSearchForm = values;
