import { writable, get, derived } from 'svelte/store';
import { produce } from 'immer';

const defaultModalState = {
  isOpen: false,
};

export const modalsStore = writable({});
export const activeModalsStore = writable([]);
export const modalComponentState = (modalId) =>
  derived([modalsStore, activeModalsStore], ([$modalsSt, $activeModalsSt], set) => {
    set({
      ...defaultModalState,
      ...$modalsSt?.[modalId],
      isActive: $activeModalsSt?.[0] === modalId,
    });
  });

export function initModal(modalId) {
  modalsStore.update((state) =>
    produce(state, (nextState) => {
      nextState[modalId] = { ...defaultModalState };
    })
  );
}

export function openModal(modalId) {
  modalsStore.update((state) =>
    produce(state, (nextState) => {
      nextState[modalId].isOpen = true;
    })
  );
  activeModalsStore.update((state) =>
    produce(state, (nextState) => {
      nextState.unshift(modalId);
    })
  );
}

export function closeModal(modalId) {
  modalsStore.update((state) =>
    produce(state, (nextState) => {
      nextState[modalId].isOpen = false;
    })
  );
  activeModalsStore.update((state) =>
    produce(state, (nextState) => {
      const index = nextState.findIndex((id) => id === modalId);
      if (index > -1) {
        nextState.splice(index, 1);
      }
    })
  );
}

export function unmountModal(modalId) {
  modalsStore.update((state) =>
    produce(state, (nextState) => {
      delete nextState[modalId];
    })
  );
  activeModalsStore.update((state) =>
    produce(state, (nextState) => {
      const index = nextState.findIndex((id) => id === modalId);
      if (index > -1) {
        nextState.splice(index, 1);
      }
    })
  );
}

export function focusModal(modalId) {
  const isModalOpen = get(modalsStore)?.[modalId]?.isOpen;
  if (isModalOpen) {
    activeModalsStore.update((state) =>
      produce(state, (nextState) => {
        const index = nextState.findIndex((id) => id === modalId);
        if (index > -1) {
          nextState.splice(index, 1);
        }
        nextState.unshift(modalId);
      })
    );
  }
}
