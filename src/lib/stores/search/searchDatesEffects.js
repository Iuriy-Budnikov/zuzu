import { createEffect } from '../store';
import { actionsSearchDates } from './searchDates';
import { catchError, from, map, mergeMap, of } from 'rxjs';
import { apiClientCached } from './searchClient';

createEffect(actionsSearchDates.start, (action$) => {
  return action$.pipe(
    mergeMap(({ payload: { params } }) => {
      return from(apiClientCached.get('/2.6/tours/dates', { params })).pipe(
        map(({ data }) => actionsSearchDates.success(data)),
        catchError(({ response: { data } }) => of(actionsSearchDates.failure(data)))
      );
    })
  );
});
