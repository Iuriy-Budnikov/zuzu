import merge from 'lodash/merge';
import {
  isAbsoluteURL,
  isObject,
  requestMethodsWithData,
  requestMethodsWithoutData
} from './helpers';
import { ApiClientError } from './ApiClientError';

export class ApiClient {
  static defaultConfig = {
    timeout: 0,
    responseType: 'json',
    fetch: fetch
  };

  config;
  post;
  put;
  patch;
  delete;
  get;
  head;

  constructor(config) {
    this.config = merge({}, ApiClient.defaultConfig, config);

    requestMethodsWithData.forEach((method) => {
      this[method] = this.requestWithData(method);
    });

    requestMethodsWithoutData.forEach((method) => {
      this[method] = this.requestWithoutData(method);
    });
  }

  mergeConfig(config) {
    return merge(
      {
        url: '',
        method: 'GET'
      },
      this.config,
      config
    );
  }

  buildUrl({ baseURL, url }) {
    if (isAbsoluteURL(url)) {
      return url;
    }
    return `${(baseURL || '').replace(/\/+$/, '')}/${(url || '').replace(/^\/+/, '')}`;
  }

  buildAcceptHeader(responseType) {
    switch (responseType) {
      case 'json':
        return 'application/json';
      case 'text':
        return 'text/*';
      default:
        return undefined;
    }
  }

  buildContentHeader(data) {
    if (isObject(data)) {
      return 'application/json';
    }
    return undefined;
  }

  prepareHeaders({ responseType, data, headers }) {
    const _headers = new Headers(headers);
    if (!_headers.has('accept')) {
      const accept = this.buildAcceptHeader(responseType);
      if (accept) {
        _headers.set('accept', accept);
      }
    }
    if (!_headers.has('content-type')) {
      const contentType = this.buildContentHeader(data);
      if (contentType) {
        _headers.set('content-type', contentType);
      }
    }
    return _headers;
  }

  prepareData(data) {
    // if data is JS Object then stringify it
    if (isObject(data)) {
      return JSON.stringify(data);
    }
    return data ? data : undefined;
  }

  requestWithData(method) {
    return (url, data, config) => {
      const _config = merge({}, config, { method, url, data });
      return this.request(_config);
    };
  }

  requestWithoutData(method) {
    return (url, config) => {
      const _config = merge({}, config, { method, url });
      return this.request(_config);
    };
  }

  createTimeoutSignal(timeout) {
    if (timeout) {
      const controller = new AbortController();
      const timeoutInstance = setTimeout(() => {
        controller.abort();
      }, timeout);
      return [timeoutInstance, controller.signal];
    }
    return [undefined, undefined];
  }

  concatSignals(signals) {
    const filteredSignals = signals.filter((c) => c instanceof AbortSignal);
    if (filteredSignals?.length > 0) {
      const controller = new AbortController();
      const onAbort = () => {
        controller.abort();
        for (let i = 0; i < filteredSignals.length; i++) {
          filteredSignals[i].removeEventListener('abort', onAbort);
        }
      };
      for (let i = 0; i < filteredSignals.length; i++) {
        if (filteredSignals[i].aborted) {
          onAbort();
          break;
        }
        filteredSignals[i].addEventListener('abort', onAbort);
      }
      return controller.signal;
    }
    return undefined;
  }

  async formatResponseData(responseType, response) {
    try {
      switch (responseType) {
        case 'arrayBuffer':
          return await response.arrayBuffer();
        case 'json':
          return await response.json();
        case 'blob':
          return await response.blob();
        default:
          return await response.text();
      }
    } catch (_) {
      return undefined;
    }
  }

  create = (config) => {
    return new ApiClient(merge({}, this.config, config));
  };

  request = async (config) => {
    try {
      const normalizedConfig = this.mergeConfig(config);
      const {
        fetch: _fetch,
        data,
        params,
        signal,
        timeout,
        responseType,
        method
      } = normalizedConfig;
      const [timeoutInstance, timeoutSignal] = this.createTimeoutSignal(timeout);
      const reqURL = this.buildUrl(normalizedConfig);
      const searchParams = new URLSearchParams(params);

      const res = await _fetch(`${reqURL}?${searchParams.toString()}`.replace(/\?+$/, ''), {
        method: method.toUpperCase(),
        headers: this.prepareHeaders(normalizedConfig),
        body: this.prepareData(data),
        signal: this.concatSignals([signal, timeoutSignal])
      });
      clearTimeout(timeoutInstance);
      const resData = await this.formatResponseData(responseType, res);
      if (!res.ok) {
        throw new ApiClientError(res.statusText, res.status, resData, res);
      }
      return {
        data: resData,
        status: res.status,
        response: res
      };
    } catch (e) {
      if (e instanceof ApiClientError) {
        throw e;
      }
      throw new ApiClientError(e);
    }
  };
}
