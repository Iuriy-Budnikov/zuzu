import { catchError, from, map, mergeMap, of, delay } from 'rxjs';
import { createEffect } from '../store';
import { actionsTours } from './tours';
import { searchClient } from './../apiClients';

createEffect(actionsTours.startSearch, (action$) => {
  return action$.pipe(
    mergeMap(({ payload: { params } }) => {
      return from(searchClient.get('/proxy/api/2.5/tours/getResults', { params })).pipe(
        map(({ data }) => {
          const progress = data?.progress || {};
          const progressValues = Object?.values(progress) || [];
          if (progressValues.some((c) => !c)) {
            return actionsTours.startLoad({ params: { ...params, number: 1 } });
          }
          return actionsTours.success(data);
        }),
        catchError(({ response: { data } }) => of(actionsTours.failure(data)))
      );
    })
  );
});

createEffect(actionsTours.startLoad, (action$) => {
  return action$.pipe(
    delay(4000),
    mergeMap(({ payload: { params } }) => {
      return from(searchClient.get('/proxy/api/2.5/tours/getResults', { params })).pipe(
        map(({ data }) => {
          const progress = data?.progress || {};
          const progressValues = Object?.values(progress) || [];
          if (progressValues.some((c) => !c)) {
            return actionsTours.startLoad({ params: { ...params, number: 1 } });
          }
          return actionsTours.success(data);
        }),
        catchError(({ response: { data } }) => of(actionsTours.failure(data)))
      );
    })
  );
});
