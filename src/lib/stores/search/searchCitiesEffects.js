import { catchError, from, map, mergeMap, of } from 'rxjs';
import { createEffect } from '../store';
import { actionsSearchCities } from './searchCities';
import { searchClient } from '../apiClients';

createEffect(actionsSearchCities.start, (action$) => {
  return action$.pipe(
    mergeMap(({ payload: { params } }) => {
      return from(searchClient.get('/proxy/api/2.6/tours/fromCities', { params })).pipe(
        map(({ data }) => actionsSearchCities.success(data)),
        catchError(({ response: { data } }) => of(actionsSearchCities.failure(data)))
      );
    })
  );
});
