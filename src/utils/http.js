import axios from 'axios';

const BASE_URL =
  process.env.REACT_APP_SERVER_URL || 'http://localhost:5000/api/v1';

const instance = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
});

/**
 * @param {String} url The url for the api request (without the base)
 * @param {Object} [config]
 * @param {Object} [config.params] An object of queries that will be added to
 * the url
 * @param {Boolean} [config.accessToken] Whether or not to include the
 * access-token header
 * @returns {Observable}
 */
function get(url, { params = {}, responseType = 'json', headers = {} } = {}) {
  return instance({
    url,
    params,
    headers,
    responseType,
    method: 'get',
  }).then((response) => response.data);
}

/**
 * @param {String} url The url for the api request (without the base)
 * @param {Object} [config]
 * @param {Object} [config.params] An object of queries that will be added to
 * the url
 * @param {Object} [config.body] An object that will be sent in the request
 * body
 * @param {Boolean} [config.accessToken] Whether or not to include the
 * access-token header
 * @returns {Observable}
 */
function post(url, { params = {}, body = {}, headers = {} } = {}) {
  return instance({
    url,
    headers,
    params,
    data: body,
    method: 'post',
  }).then((response) => response.data);
}

/**
 * @param {String} url The url for the api request (without the base)
 * @param {Object} [config]
 * @param {Object} [config.params] An object of queries that will be added to
 * the url
 * @param {Object} [config.body] An object that will be sent in the request
 * body
 * @param {Boolean} [config.accessToken] Whether or not to include the
 * access-token header
 * @returns {Observable}
 */
function put(url, { params = {}, body = {}, headers = {} } = {}) {
  return instance({
    url,
    params,
    headers,
    data: body,
    method: 'put',
  }).then((response) => response.data);
}

/**
 * @param {String} url The url for the api request (without the base)
 * @param {Object} [config]
 * @param {Object} [config.params] An object of queries that will be added to
 * the url
 * @param {Boolean} [config.accessToken] Whether or not to include the
 * access-token header
 * @returns {Observable}
 */
function remove(url, { params = {} } = {}) {
  const headers = {};

  return instance({
    url,
    headers,
    params,
    method: 'delete',
  }).then((response) => response.data);
}

export default {
  get,
  put,
  post,
  delete: remove,
};
