import axios from 'axios';
import { createEffect } from '../store';
import { actionsSearchSuggests } from './searchSuggests';
import { catchError, debounceTime, EMPTY, from, map, mergeMap, of } from 'rxjs';
import { apiClient } from './searchClient';

let cancelTokenSuggestion;

createEffect(actionsSearchSuggests.start, (action$) => {
  return action$.pipe(
    debounceTime(300),
    mergeMap(({ payload: { params } }) => {
      cancelTokenSuggestion?.cancel?.();
      cancelTokenSuggestion = axios.CancelToken.source();
      return from(
        apiClient.get('/2.5/tours/suggests', {
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