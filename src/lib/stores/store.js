import { createStore } from './core';

export const { createChunk, createEffect, dispatch, upstream$, chunks } = createStore();

upstream$.subscribe((v) => console.log(v));
