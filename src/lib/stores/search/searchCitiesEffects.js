import { createEffect } from '../store';
import { actionsSearchCities } from './searchCities';
import { catchError, from, map, mergeMap, of } from 'rxjs';
import { apiClientCached } from './searchClient';

createEffect(actionsSearchCities.start, (action$) => {
  return action$.pipe(
    mergeMap(({ payload: { params } }) => {
      return from(apiClientCached.get('/2.5/tours/deptCities', { params })).pipe(
        map(({ data }) => actionsSearchCities.success(data)),
        catchError(({ response: { data } }) => of(actionsSearchCities.failure(data)))
      );
    })
  );
});
