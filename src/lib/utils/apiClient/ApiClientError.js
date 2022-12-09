export class ApiClientError extends Error {
  isApiClientError = true;
  name = 'ApiClientError';

  message;
  data;
  response;
  status;

  constructor(message, status, data, response) {
    super();
    this.message = message instanceof Error ? message.message : message;
    status && (this.status = status);
    data && (this.data = data);
    response && (this.response = response);
  }

  toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // ApiClient
      data: this.data,
      response: this.response,
      status: this.status || this.response?.status || null
    };
  }
}
