import axios from 'axios';
import { catchError, EMPTY, from, map, mergeMap, of } from 'rxjs';
import { createEffect } from '../store';
import { actionsSearchSuggests } from './searchSuggests';
import { searchClient } from '../apiClients';

let cancelTokenSuggestion;

createEffect(actionsSearchSuggests.start, (action$) => {
  return action$.pipe(
    mergeMap(({ payload: { params } }) => {
      cancelTokenSuggestion?.cancel?.();
      cancelTokenSuggestion = axios.CancelToken.source();
      return from(
        searchClient.get('/proxy/api/2.5/tours/suggests', {
          params: { ...params },
          cancelToken: cancelTokenSuggestion?.token
        })
      ).pipe(
        map(({ data }) => actionsSearchSuggests.success(data)),
        catchError((error) => {
          if (error?.code === 'ERR_CANCELED') {
            return EMPTY;
          }
          return of(actionsSearchSuggests.failure(error?.response?.data));
        })
      );
    })
  );
});
