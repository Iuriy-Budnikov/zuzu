import { BehaviorSubject, queueScheduler, startWith, Subject } from 'rxjs';
import { share, observeOn, withLatestFrom, pairwise, map, filter, pluck } from 'rxjs/operators';
export function upstreamFactory(middlewares = [], chunks) {
  const _raw$ = new Subject();
  const dispatch = (action) => _raw$.next(action);
  const upstream$ = middlewares
    .reduce((p$, middleware) => middleware(p$, chunks), _raw$.asObservable())
    .pipe(observeOn(queueScheduler), share());
  return { dispatch, upstream$ };
}
export function storeChunkFactory(upstream$, config) {
  const state$ = new BehaviorSubject(config.initialState);
  const actionCreators = {};
  for (const actionKey in config.actions) {
    const currentActionConfig = config.actions[actionKey];
    const actionType = `${config.namespace}/${actionKey}`;
    // build action creators based on the config
    actionCreators[actionKey] = (...params) => {
      const action = { type: actionType };
      if (currentActionConfig.payload) {
        action.payload = currentActionConfig.payload(...params);
      }
      return action;
    };
    actionCreators[actionKey].toString = () => actionType;
    // subscribe to upstream and set next chunk value to result of action handler
    upstream$
      .pipe(
        filter((action) => action.type === actionType),
        withLatestFrom(state$),
        map(([action, state]) => currentActionConfig.handler(state, action.payload))
      )
      .subscribe(state$);
  }
  // build value selectors for each initial state value
  const values = {};
  for (const valueName in config.initialState) {
    values[valueName] = state$.pipe(
      map((state) => state[valueName]),
      startWith(undefined),
      pairwise(),
      filter(([prev, next]) => prev !== next),
      pluck(1),
      share({ connector: () => new BehaviorSubject(undefined) })
    );
  }
  return { chunk$: state$.asObservable(), actions: actionCreators, values };
}
export function effectFactory(upstream$, dispatch, filters, effectFn) {
  const _filters = (Array.isArray(filters) ? filters : [filters]).map((c) => c.toString());
  const filteredStream$ = _filters.length
    ? upstream$.pipe(filter((action) => _filters.some((c) => c === action.type)))
    : upstream$;
  return effectFn(filteredStream$).subscribe((action) => dispatch(action));
}
export function createStore(middlewares) {
  const chunks = {};
  const { upstream$, dispatch } = upstreamFactory(middlewares, chunks);
  function createChunk(config) {
    const chunk = storeChunkFactory(upstream$, config);
    chunks[config.namespace] = chunk;
    return chunk;
  }
  function createEffect(filters, effectFn) {
    return effectFactory(upstream$, dispatch, filters, effectFn);
  }
  return {
    dispatch,
    upstream$,
    createChunk,
    createEffect,
    chunks
  };
}
