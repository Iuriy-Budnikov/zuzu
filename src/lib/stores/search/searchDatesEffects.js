import { createEffect } from '../store';
import { actionsSearchDates } from './searchDates';
import { catchError, from, map, mergeMap, of } from 'rxjs';
import { apiClient } from './searchClient';

createEffect(actionsSearchDates.start, (action$) => {
  return action$.pipe(
    mergeMap(({ payload: { params } }) => {
      return from(apiClient.get('/proxy/api/2.6/tours/dates', { params })).pipe(
        map(({ data }) => actionsSearchDates.success(data)),
        catchError(({ response: { data } }) => of(actionsSearchDates.failure(data)))
      );
    })
  );
});
