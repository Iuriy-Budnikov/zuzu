import { writable } from 'svelte/store';

export const animationStore = writable({
  companyAnimationComplete: false
});

export function completeCompanyAnimation() {
  animationStore.update((c) => {
    return {
      ...c,
      companyAnimationComplete: true
    };
  });
}
