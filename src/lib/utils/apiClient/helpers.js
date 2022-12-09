export const responseAcceptTypes = ['arrayBuffer', 'json', 'text', 'blob'];
export const requestMethodsWithData = ['post', 'put', 'patch'];
export const requestMethodsWithoutData = ['delete', 'get', 'head'];
export const requestMethods = [...requestMethodsWithData, ...requestMethodsWithoutData];

export const isObject = (obj) => {
  const objectTypes = ['array', 'object'];
  const type = Object.prototype.toString.call(obj).slice(8, -1);
  return objectTypes.some((c) => c.toLowerCase() === type?.toLowerCase());
};

export const isAbsoluteURL = (url) => {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};
