import { catchError, from, map, mergeMap, of } from 'rxjs';
import { createEffect } from '../store';
import { actionsSearchServices } from './searchServices';
import { searchClient } from '../apiClients';

createEffect(actionsSearchServices.start, (action$) => {
  return action$.pipe(
    mergeMap(() => {
      return from(searchClient.get('/proxy/api/2.6/tours/services')).pipe(
        map(({ data }) => actionsSearchServices.success(data)),
        catchError(({ response: { data } }) => of(actionsSearchServices.failure(data)))
      );
    })
  );
});
