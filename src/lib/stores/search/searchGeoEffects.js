import axios from 'axios';
import { createEffect } from '../store';
import { actionsSearchGeoTree } from './searchGeoTree';
import { catchError, EMPTY, from, map, mergeMap, of } from 'rxjs';
import { apiClientCached } from './searchClient';

let cancelTokenSuggestion;

createEffect(actionsSearchGeoTree.start, (action$) => {
  return action$.pipe(
    mergeMap(({ payload: { params } }) => {
      cancelTokenSuggestion?.cancel?.();
      cancelTokenSuggestion = axios.CancelToken.source();
      return from(
        apiClientCached.get('/proxy/api/2.5/tours/geotree', {
          params: { depth: 'city', with: 'price', ...params },
          cancelToken: cancelTokenSuggestion?.token
        })
      ).pipe(
        map(({ data }) => actionsSearchGeoTree.success(data)),
        catchError((error) => {
          if (error?.code === 'ERR_CANCELED') {
            return EMPTY;
          }
          return of(actionsSearchGeoTree.failure(error?.response?.data));
        })
      );
    })
  );
});
