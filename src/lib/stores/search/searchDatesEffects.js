import { catchError, from, map, mergeMap, of } from 'rxjs';
import { createEffect } from '../store';
import { actionsSearchDates } from './searchDates';
import { searchClient } from '../apiClients';

createEffect(actionsSearchDates.start, (action$) => {
  return action$.pipe(
    mergeMap(({ payload: { params } }) => {
      return from(searchClient.get('/proxy/api/2.5/tours/dates', { params })).pipe(
        map(({ data }) => actionsSearchDates.success(data)),
        catchError(({ response: { data } }) => of(actionsSearchDates.failure(data)))
      );
    })
  );
});
