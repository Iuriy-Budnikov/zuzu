import { catchError, from, map, mergeMap, of } from 'rxjs';
import { createEffect } from '../store';
import { actionsTours } from './tours';
import { searchClient } from './../apiClients';

createEffect(actionsTours.start, (action$) => {
  return action$.pipe(
    mergeMap(({ payload: { params } }) => {
      return from(searchClient.get('/proxy/api/2.6/tours/fromCities', { params })).pipe(
        map(({ data }) => actionsTours.success(data)),
        catchError(({ response: { data } }) => of(actionsTours.failure(data)))
      );
    })
  );
});
