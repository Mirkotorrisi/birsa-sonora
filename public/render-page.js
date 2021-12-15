/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 1506:
/***/ ((module) => {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 7154:
/***/ ((module) => {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  module.exports["default"] = module.exports, module.exports.__esModule = true;
  return _extends.apply(this, arguments);
}

module.exports = _extends;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 5354:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var setPrototypeOf = __webpack_require__(9489);

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  setPrototypeOf(subClass, superClass);
}

module.exports = _inheritsLoose;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 5318:
/***/ ((module) => {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 7316:
/***/ ((module) => {

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

module.exports = _objectWithoutPropertiesLoose;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 9489:
/***/ ((module) => {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  module.exports["default"] = module.exports, module.exports.__esModule = true;
  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 1122:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.shallowCompare = exports.validateRedirect = exports.insertParams = exports.resolve = exports.match = exports.pick = exports.startsWith = undefined;

var _invariant = __webpack_require__(6128);

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

////////////////////////////////////////////////////////////////////////////////
// startsWith(string, search) - Check if `string` starts with `search`
var startsWith = function startsWith(string, search) {
  return string.substr(0, search.length) === search;
};

////////////////////////////////////////////////////////////////////////////////
// pick(routes, uri)
//
// Ranks and picks the best route to match. Each segment gets the highest
// amount of points, then the type of segment gets an additional amount of
// points where
//
//     static > dynamic > splat > root
//
// This way we don't have to worry about the order of our routes, let the
// computers do it.
//
// A route looks like this
//
//     { path, default, value }
//
// And a returned match looks like:
//
//     { route, params, uri }
//
// I know, I should use TypeScript not comments for these types.
var pick = function pick(routes, uri) {
  var match = void 0;
  var default_ = void 0;

  var _uri$split = uri.split("?"),
      uriPathname = _uri$split[0];

  var uriSegments = segmentize(uriPathname);
  var isRootUri = uriSegments[0] === "";
  var ranked = rankRoutes(routes);

  for (var i = 0, l = ranked.length; i < l; i++) {
    var missed = false;
    var route = ranked[i].route;

    if (route.default) {
      default_ = {
        route: route,
        params: {},
        uri: uri
      };
      continue;
    }

    var routeSegments = segmentize(route.path);
    var params = {};
    var max = Math.max(uriSegments.length, routeSegments.length);
    var index = 0;

    for (; index < max; index++) {
      var routeSegment = routeSegments[index];
      var uriSegment = uriSegments[index];

      if (isSplat(routeSegment)) {
        // Hit a splat, just grab the rest, and return a match
        // uri:   /files/documents/work
        // route: /files/*
        var param = routeSegment.slice(1) || "*";
        params[param] = uriSegments.slice(index).map(decodeURIComponent).join("/");
        break;
      }

      if (uriSegment === undefined) {
        // URI is shorter than the route, no match
        // uri:   /users
        // route: /users/:userId
        missed = true;
        break;
      }

      var dynamicMatch = paramRe.exec(routeSegment);

      if (dynamicMatch && !isRootUri) {
        var matchIsNotReserved = reservedNames.indexOf(dynamicMatch[1]) === -1;
        !matchIsNotReserved ?  false ? 0 : (0, _invariant2.default)(false) : void 0;
        var value = decodeURIComponent(uriSegment);
        params[dynamicMatch[1]] = value;
      } else if (routeSegment !== uriSegment) {
        // Current segments don't match, not dynamic, not splat, so no match
        // uri:   /users/123/settings
        // route: /users/:id/profile
        missed = true;
        break;
      }
    }

    if (!missed) {
      match = {
        route: route,
        params: params,
        uri: "/" + uriSegments.slice(0, index).join("/")
      };
      break;
    }
  }

  return match || default_ || null;
};

////////////////////////////////////////////////////////////////////////////////
// match(path, uri) - Matches just one path to a uri, also lol
var match = function match(path, uri) {
  return pick([{ path: path }], uri);
};

////////////////////////////////////////////////////////////////////////////////
// resolve(to, basepath)
//
// Resolves URIs as though every path is a directory, no files.  Relative URIs
// in the browser can feel awkward because not only can you be "in a directory"
// you can be "at a file", too. For example
//
//     browserSpecResolve('foo', '/bar/') => /bar/foo
//     browserSpecResolve('foo', '/bar') => /foo
//
// But on the command line of a file system, it's not as complicated, you can't
// `cd` from a file, only directories.  This way, links have to know less about
// their current path. To go deeper you can do this:
//
//     <Link to="deeper"/>
//     // instead of
//     <Link to=`{${props.uri}/deeper}`/>
//
// Just like `cd`, if you want to go deeper from the command line, you do this:
//
//     cd deeper
//     # not
//     cd $(pwd)/deeper
//
// By treating every path as a directory, linking to relative paths should
// require less contextual information and (fingers crossed) be more intuitive.
var resolve = function resolve(to, base) {
  // /foo/bar, /baz/qux => /foo/bar
  if (startsWith(to, "/")) {
    return to;
  }

  var _to$split = to.split("?"),
      toPathname = _to$split[0],
      toQuery = _to$split[1];

  var _base$split = base.split("?"),
      basePathname = _base$split[0];

  var toSegments = segmentize(toPathname);
  var baseSegments = segmentize(basePathname);

  // ?a=b, /users?b=c => /users?a=b
  if (toSegments[0] === "") {
    return addQuery(basePathname, toQuery);
  }

  // profile, /users/789 => /users/789/profile
  if (!startsWith(toSegments[0], ".")) {
    var pathname = baseSegments.concat(toSegments).join("/");
    return addQuery((basePathname === "/" ? "" : "/") + pathname, toQuery);
  }

  // ./         /users/123  =>  /users/123
  // ../        /users/123  =>  /users
  // ../..      /users/123  =>  /
  // ../../one  /a/b/c/d    =>  /a/b/one
  // .././one   /a/b/c/d    =>  /a/b/c/one
  var allSegments = baseSegments.concat(toSegments);
  var segments = [];
  for (var i = 0, l = allSegments.length; i < l; i++) {
    var segment = allSegments[i];
    if (segment === "..") segments.pop();else if (segment !== ".") segments.push(segment);
  }

  return addQuery("/" + segments.join("/"), toQuery);
};

////////////////////////////////////////////////////////////////////////////////
// insertParams(path, params)

var insertParams = function insertParams(path, params) {
  var _path$split = path.split("?"),
      pathBase = _path$split[0],
      _path$split$ = _path$split[1],
      query = _path$split$ === undefined ? "" : _path$split$;

  var segments = segmentize(pathBase);
  var constructedPath = "/" + segments.map(function (segment) {
    var match = paramRe.exec(segment);
    return match ? params[match[1]] : segment;
  }).join("/");
  var _params$location = params.location;
  _params$location = _params$location === undefined ? {} : _params$location;
  var _params$location$sear = _params$location.search,
      search = _params$location$sear === undefined ? "" : _params$location$sear;

  var searchSplit = search.split("?")[1] || "";
  constructedPath = addQuery(constructedPath, query, searchSplit);
  return constructedPath;
};

var validateRedirect = function validateRedirect(from, to) {
  var filter = function filter(segment) {
    return isDynamic(segment);
  };
  var fromString = segmentize(from).filter(filter).sort().join("/");
  var toString = segmentize(to).filter(filter).sort().join("/");
  return fromString === toString;
};

////////////////////////////////////////////////////////////////////////////////
// Junk
var paramRe = /^:(.+)/;

var SEGMENT_POINTS = 4;
var STATIC_POINTS = 3;
var DYNAMIC_POINTS = 2;
var SPLAT_PENALTY = 1;
var ROOT_POINTS = 1;

var isRootSegment = function isRootSegment(segment) {
  return segment === "";
};
var isDynamic = function isDynamic(segment) {
  return paramRe.test(segment);
};
var isSplat = function isSplat(segment) {
  return segment && segment[0] === "*";
};

var rankRoute = function rankRoute(route, index) {
  var score = route.default ? 0 : segmentize(route.path).reduce(function (score, segment) {
    score += SEGMENT_POINTS;
    if (isRootSegment(segment)) score += ROOT_POINTS;else if (isDynamic(segment)) score += DYNAMIC_POINTS;else if (isSplat(segment)) score -= SEGMENT_POINTS + SPLAT_PENALTY;else score += STATIC_POINTS;
    return score;
  }, 0);
  return { route: route, score: score, index: index };
};

var rankRoutes = function rankRoutes(routes) {
  return routes.map(rankRoute).sort(function (a, b) {
    return a.score < b.score ? 1 : a.score > b.score ? -1 : a.index - b.index;
  });
};

var segmentize = function segmentize(uri) {
  return uri
  // strip starting/ending slashes
  .replace(/(^\/+|\/+$)/g, "").split("/");
};

var addQuery = function addQuery(pathname) {
  for (var _len = arguments.length, query = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    query[_key - 1] = arguments[_key];
  }

  query = query.filter(function (q) {
    return q && q.length > 0;
  });
  return pathname + (query && query.length > 0 ? "?" + query.join("&") : "");
};

var reservedNames = ["uri", "path"];

/**
 * Shallow compares two objects.
 * @param {Object} obj1 The first object to compare.
 * @param {Object} obj2 The second object to compare.
 */
var shallowCompare = function shallowCompare(obj1, obj2) {
  var obj1Keys = Object.keys(obj1);
  return obj1Keys.length === Object.keys(obj2).length && obj1Keys.every(function (key) {
    return obj2.hasOwnProperty(key) && obj1[key] === obj2[key];
  });
};

////////////////////////////////////////////////////////////////////////////////
exports.startsWith = startsWith;
exports.pick = pick;
exports.match = match;
exports.resolve = resolve;
exports.insertParams = insertParams;
exports.validateRedirect = validateRedirect;
exports.shallowCompare = shallowCompare;

/***/ }),

/***/ 9669:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(1609);

/***/ }),

/***/ 7970:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(4867);
var settle = __webpack_require__(6026);
var buildFullPath = __webpack_require__(4097);
var buildURL = __webpack_require__(5327);
var http = __webpack_require__(2503);
var https = __webpack_require__(7959);
var httpFollow = __webpack_require__(938).http;
var httpsFollow = __webpack_require__(938).https;
var url = __webpack_require__(4269);
var zlib = __webpack_require__(8884);
var VERSION = __webpack_require__(7288).version;
var createError = __webpack_require__(5061);
var enhanceError = __webpack_require__(481);
var defaults = __webpack_require__(5655);
var Cancel = __webpack_require__(5263);

var isHttps = /https:?/;

/**
 *
 * @param {http.ClientRequestArgs} options
 * @param {AxiosProxyConfig} proxy
 * @param {string} location
 */
function setProxy(options, proxy, location) {
  options.hostname = proxy.host;
  options.host = proxy.host;
  options.port = proxy.port;
  options.path = location;

  // Basic proxy authorization
  if (proxy.auth) {
    var base64 = Buffer.from(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
    options.headers['Proxy-Authorization'] = 'Basic ' + base64;
  }

  // If a proxy is used, any redirects must also pass through the proxy
  options.beforeRedirect = function beforeRedirect(redirection) {
    redirection.headers.host = redirection.host;
    setProxy(redirection, proxy, redirection.href);
  };
}

/*eslint consistent-return:0*/
module.exports = function httpAdapter(config) {
  return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
    var onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }
    var resolve = function resolve(value) {
      done();
      resolvePromise(value);
    };
    var reject = function reject(value) {
      done();
      rejectPromise(value);
    };
    var data = config.data;
    var headers = config.headers;
    var headerNames = {};

    Object.keys(headers).forEach(function storeLowerName(name) {
      headerNames[name.toLowerCase()] = name;
    });

    // Set User-Agent (required by some servers)
    // See https://github.com/axios/axios/issues/69
    if ('user-agent' in headerNames) {
      // User-Agent is specified; handle case where no UA header is desired
      if (!headers[headerNames['user-agent']]) {
        delete headers[headerNames['user-agent']];
      }
      // Otherwise, use specified value
    } else {
      // Only set header if it hasn't been set in config
      headers['User-Agent'] = 'axios/' + VERSION;
    }

    if (data && !utils.isStream(data)) {
      if (Buffer.isBuffer(data)) {
        // Nothing to do...
      } else if (utils.isArrayBuffer(data)) {
        data = Buffer.from(new Uint8Array(data));
      } else if (utils.isString(data)) {
        data = Buffer.from(data, 'utf-8');
      } else {
        return reject(createError(
          'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
          config
        ));
      }

      // Add Content-Length header if data exists
      if (!headerNames['content-length']) {
        headers['Content-Length'] = data.length;
      }
    }

    // HTTP basic authentication
    var auth = undefined;
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      auth = username + ':' + password;
    }

    // Parse url
    var fullPath = buildFullPath(config.baseURL, config.url);
    var parsed = url.parse(fullPath);
    var protocol = parsed.protocol || 'http:';

    if (!auth && parsed.auth) {
      var urlAuth = parsed.auth.split(':');
      var urlUsername = urlAuth[0] || '';
      var urlPassword = urlAuth[1] || '';
      auth = urlUsername + ':' + urlPassword;
    }

    if (auth && headerNames.authorization) {
      delete headers[headerNames.authorization];
    }

    var isHttpsRequest = isHttps.test(protocol);
    var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;

    var options = {
      path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
      method: config.method.toUpperCase(),
      headers: headers,
      agent: agent,
      agents: { http: config.httpAgent, https: config.httpsAgent },
      auth: auth
    };

    if (config.socketPath) {
      options.socketPath = config.socketPath;
    } else {
      options.hostname = parsed.hostname;
      options.port = parsed.port;
    }

    var proxy = config.proxy;
    if (!proxy && proxy !== false) {
      var proxyEnv = protocol.slice(0, -1) + '_proxy';
      var proxyUrl = ({})[proxyEnv] || ({})[proxyEnv.toUpperCase()];
      if (proxyUrl) {
        var parsedProxyUrl = url.parse(proxyUrl);
        var noProxyEnv = ({}).no_proxy || ({}).NO_PROXY;
        var shouldProxy = true;

        if (noProxyEnv) {
          var noProxy = noProxyEnv.split(',').map(function trim(s) {
            return s.trim();
          });

          shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
            if (!proxyElement) {
              return false;
            }
            if (proxyElement === '*') {
              return true;
            }
            if (proxyElement[0] === '.' &&
                parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
              return true;
            }

            return parsed.hostname === proxyElement;
          });
        }

        if (shouldProxy) {
          proxy = {
            host: parsedProxyUrl.hostname,
            port: parsedProxyUrl.port,
            protocol: parsedProxyUrl.protocol
          };

          if (parsedProxyUrl.auth) {
            var proxyUrlAuth = parsedProxyUrl.auth.split(':');
            proxy.auth = {
              username: proxyUrlAuth[0],
              password: proxyUrlAuth[1]
            };
          }
        }
      }
    }

    if (proxy) {
      options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
      setProxy(options, proxy, protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path);
    }

    var transport;
    var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
    if (config.transport) {
      transport = config.transport;
    } else if (config.maxRedirects === 0) {
      transport = isHttpsProxy ? https : http;
    } else {
      if (config.maxRedirects) {
        options.maxRedirects = config.maxRedirects;
      }
      transport = isHttpsProxy ? httpsFollow : httpFollow;
    }

    if (config.maxBodyLength > -1) {
      options.maxBodyLength = config.maxBodyLength;
    }

    if (config.insecureHTTPParser) {
      options.insecureHTTPParser = config.insecureHTTPParser;
    }

    // Create the request
    var req = transport.request(options, function handleResponse(res) {
      if (req.aborted) return;

      // uncompress the response body transparently if required
      var stream = res;

      // return the last request in case of redirects
      var lastRequest = res.req || req;


      // if no content, is HEAD request or decompress disabled we should not decompress
      if (res.statusCode !== 204 && lastRequest.method !== 'HEAD' && config.decompress !== false) {
        switch (res.headers['content-encoding']) {
        /*eslint default-case:0*/
        case 'gzip':
        case 'compress':
        case 'deflate':
        // add the unzipper to the body stream processing pipeline
          stream = stream.pipe(zlib.createUnzip());

          // remove the content-encoding in order to not confuse downstream operations
          delete res.headers['content-encoding'];
          break;
        }
      }

      var response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: res.headers,
        config: config,
        request: lastRequest
      };

      if (config.responseType === 'stream') {
        response.data = stream;
        settle(resolve, reject, response);
      } else {
        var responseBuffer = [];
        var totalResponseBytes = 0;
        stream.on('data', function handleStreamData(chunk) {
          responseBuffer.push(chunk);
          totalResponseBytes += chunk.length;

          // make sure the content length is not over the maxContentLength if specified
          if (config.maxContentLength > -1 && totalResponseBytes > config.maxContentLength) {
            stream.destroy();
            reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded',
              config, null, lastRequest));
          }
        });

        stream.on('error', function handleStreamError(err) {
          if (req.aborted) return;
          reject(enhanceError(err, config, null, lastRequest));
        });

        stream.on('end', function handleStreamEnd() {
          var responseData = Buffer.concat(responseBuffer);
          if (config.responseType !== 'arraybuffer') {
            responseData = responseData.toString(config.responseEncoding);
            if (!config.responseEncoding || config.responseEncoding === 'utf8') {
              responseData = utils.stripBOM(responseData);
            }
          }

          response.data = responseData;
          settle(resolve, reject, response);
        });
      }
    });

    // Handle errors
    req.on('error', function handleRequestError(err) {
      if (req.aborted && err.code !== 'ERR_FR_TOO_MANY_REDIRECTS') return;
      reject(enhanceError(err, config, null, req));
    });

    // Handle request timeout
    if (config.timeout) {
      // This is forcing a int timeout to avoid problems if the `req` interface doesn't handle other types.
      var timeout = parseInt(config.timeout, 10);

      if (isNaN(timeout)) {
        reject(createError(
          'error trying to parse `config.timeout` to int',
          config,
          'ERR_PARSE_TIMEOUT',
          req
        ));

        return;
      }

      // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
      // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
      // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
      // And then these socket which be hang up will devoring CPU little by little.
      // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
      req.setTimeout(timeout, function handleRequestTimeout() {
        req.abort();
        var transitional = config.transitional || defaults.transitional;
        reject(createError(
          'timeout of ' + timeout + 'ms exceeded',
          config,
          transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
          req
        ));
      });
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = function(cancel) {
        if (req.aborted) return;

        req.abort();
        reject(!cancel || (cancel && cancel.type) ? new Cancel('canceled') : cancel);
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }


    // Send the request
    if (utils.isStream(data)) {
      data.on('error', function handleStreamError(err) {
        reject(enhanceError(err, config, null, req));
      }).pipe(req);
    } else {
      req.end(data);
    }
  });
};


/***/ }),

/***/ 5448:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(4867);
var settle = __webpack_require__(6026);
var cookies = __webpack_require__(4372);
var buildURL = __webpack_require__(5327);
var buildFullPath = __webpack_require__(4097);
var parseHeaders = __webpack_require__(4109);
var isURLSameOrigin = __webpack_require__(7985);
var createError = __webpack_require__(5061);
var defaults = __webpack_require__(5655);
var Cancel = __webpack_require__(5263);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;
    var onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      var transitional = config.transitional || defaults.transitional;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(
        timeoutErrorMessage,
        config,
        transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = function(cancel) {
        if (!request) {
          return;
        }
        reject(!cancel || (cancel && cancel.type) ? new Cancel('canceled') : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ 1609:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(4867);
var bind = __webpack_require__(1849);
var Axios = __webpack_require__(321);
var mergeConfig = __webpack_require__(7185);
var defaults = __webpack_require__(5655);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(5263);
axios.CancelToken = __webpack_require__(4972);
axios.isCancel = __webpack_require__(6502);
axios.VERSION = __webpack_require__(7288).version;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(8713);

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(6268);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports["default"] = axios;


/***/ }),

/***/ 5263:
/***/ ((module) => {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ 4972:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Cancel = __webpack_require__(5263);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;

  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;

  // eslint-disable-next-line func-names
  this.promise.then(function(cancel) {
    if (!token._listeners) return;

    var i;
    var l = token._listeners.length;

    for (i = 0; i < l; i++) {
      token._listeners[i](cancel);
    }
    token._listeners = null;
  });

  // eslint-disable-next-line func-names
  this.promise.then = function(onfulfilled) {
    var _resolve;
    // eslint-disable-next-line func-names
    var promise = new Promise(function(resolve) {
      token.subscribe(resolve);
      _resolve = resolve;
    }).then(onfulfilled);

    promise.cancel = function reject() {
      token.unsubscribe(_resolve);
    };

    return promise;
  };

  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Subscribe to the cancel signal
 */

CancelToken.prototype.subscribe = function subscribe(listener) {
  if (this.reason) {
    listener(this.reason);
    return;
  }

  if (this._listeners) {
    this._listeners.push(listener);
  } else {
    this._listeners = [listener];
  }
};

/**
 * Unsubscribe from the cancel signal
 */

CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  if (!this._listeners) {
    return;
  }
  var index = this._listeners.indexOf(listener);
  if (index !== -1) {
    this._listeners.splice(index, 1);
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ 6502:
/***/ ((module) => {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ 321:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(4867);
var buildURL = __webpack_require__(5327);
var InterceptorManager = __webpack_require__(782);
var dispatchRequest = __webpack_require__(3572);
var mergeConfig = __webpack_require__(7185);
var validator = __webpack_require__(4875);

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ 782:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(4867);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ 4097:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isAbsoluteURL = __webpack_require__(1793);
var combineURLs = __webpack_require__(7303);

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ 5061:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var enhanceError = __webpack_require__(481);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ 3572:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(4867);
var transformData = __webpack_require__(8527);
var isCancel = __webpack_require__(6502);
var defaults = __webpack_require__(5655);
var Cancel = __webpack_require__(5263);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new Cancel('canceled');
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ 481:
/***/ ((module) => {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  };
  return error;
};


/***/ }),

/***/ 7185:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(4867);

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  var mergeMap = {
    'url': valueFromConfig2,
    'method': valueFromConfig2,
    'data': valueFromConfig2,
    'baseURL': defaultToConfig2,
    'transformRequest': defaultToConfig2,
    'transformResponse': defaultToConfig2,
    'paramsSerializer': defaultToConfig2,
    'timeout': defaultToConfig2,
    'timeoutMessage': defaultToConfig2,
    'withCredentials': defaultToConfig2,
    'adapter': defaultToConfig2,
    'responseType': defaultToConfig2,
    'xsrfCookieName': defaultToConfig2,
    'xsrfHeaderName': defaultToConfig2,
    'onUploadProgress': defaultToConfig2,
    'onDownloadProgress': defaultToConfig2,
    'decompress': defaultToConfig2,
    'maxContentLength': defaultToConfig2,
    'maxBodyLength': defaultToConfig2,
    'transport': defaultToConfig2,
    'httpAgent': defaultToConfig2,
    'httpsAgent': defaultToConfig2,
    'cancelToken': defaultToConfig2,
    'socketPath': defaultToConfig2,
    'responseEncoding': defaultToConfig2,
    'validateStatus': mergeDirectKeys
  };

  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge(prop);
    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
};


/***/ }),

/***/ 6026:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var createError = __webpack_require__(5061);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ 8527:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(4867);
var defaults = __webpack_require__(5655);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};


/***/ }),

/***/ 5655:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(4867);
var normalizeHeaderName = __webpack_require__(6016);
var enhanceError = __webpack_require__(481);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(5448);
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(7970);
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {

  transitional: {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  },

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional || defaults.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw enhanceError(e, this, 'E_JSON_PARSE');
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;


/***/ }),

/***/ 7288:
/***/ ((module) => {

module.exports = {
  "version": "0.24.0"
};

/***/ }),

/***/ 1849:
/***/ ((module) => {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ 5327:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(4867);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ 7303:
/***/ ((module) => {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ 4372:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(4867);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ 1793:
/***/ ((module) => {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ 6268:
/***/ ((module) => {

"use strict";


/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};


/***/ }),

/***/ 7985:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(4867);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ 6016:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(4867);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ 4109:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(4867);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ 8713:
/***/ ((module) => {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ 4875:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var VERSION = __webpack_require__(7288).version;

var validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};

/**
 * Transitional option validator
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new Error(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')));
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new TypeError('options must be an object');
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new TypeError('option ' + opt + ' must be ' + result);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw Error('Unknown option ' + opt);
    }
  }
}

module.exports = {
  assertOptions: assertOptions,
  validators: validators
};


/***/ }),

/***/ 4867:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(1849);

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ 5863:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "TemplateTag": () => (/* reexport */ TemplateTag_TemplateTag),
  "codeBlock": () => (/* reexport */ html_html),
  "commaLists": () => (/* reexport */ commaLists_commaLists),
  "commaListsAnd": () => (/* reexport */ commaListsAnd_commaListsAnd),
  "commaListsOr": () => (/* reexport */ commaListsOr_commaListsOr),
  "html": () => (/* reexport */ html_html),
  "inlineArrayTransformer": () => (/* reexport */ inlineArrayTransformer_inlineArrayTransformer),
  "inlineLists": () => (/* reexport */ inlineLists_inlineLists),
  "oneLine": () => (/* reexport */ oneLine_oneLine),
  "oneLineCommaLists": () => (/* reexport */ oneLineCommaLists_oneLineCommaLists),
  "oneLineCommaListsAnd": () => (/* reexport */ oneLineCommaListsAnd_oneLineCommaListsAnd),
  "oneLineCommaListsOr": () => (/* reexport */ oneLineCommaListsOr_oneLineCommaListsOr),
  "oneLineInlineLists": () => (/* reexport */ oneLineInlineLists_oneLineInlineLists),
  "oneLineTrim": () => (/* reexport */ oneLineTrim_oneLineTrim),
  "removeNonPrintingValuesTransformer": () => (/* reexport */ removeNonPrintingValuesTransformer_removeNonPrintingValuesTransformer),
  "replaceResultTransformer": () => (/* reexport */ replaceResultTransformer_replaceResultTransformer),
  "replaceStringTransformer": () => (/* reexport */ replaceStringTransformer_replaceStringTransformer),
  "replaceSubstitutionTransformer": () => (/* reexport */ replaceSubstitutionTransformer_replaceSubstitutionTransformer),
  "safeHtml": () => (/* reexport */ safeHtml_safeHtml),
  "source": () => (/* reexport */ html_html),
  "splitStringTransformer": () => (/* reexport */ splitStringTransformer_splitStringTransformer),
  "stripIndent": () => (/* reexport */ stripIndent_stripIndent),
  "stripIndentTransformer": () => (/* reexport */ stripIndentTransformer_stripIndentTransformer),
  "stripIndents": () => (/* reexport */ stripIndents_stripIndents),
  "trimResultTransformer": () => (/* reexport */ trimResultTransformer_trimResultTransformer)
});

;// CONCATENATED MODULE: ./node_modules/common-tags/es/TemplateTag/TemplateTag.js
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['', ''], ['', '']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class TemplateTag
 * @classdesc Consumes a pipeline of composable transformer plugins and produces a template tag.
 */
var TemplateTag = function () {
  /**
   * constructs a template tag
   * @constructs TemplateTag
   * @param  {...Object} [...transformers] - an array or arguments list of transformers
   * @return {Function}                    - a template tag
   */
  function TemplateTag() {
    var _this = this;

    for (var _len = arguments.length, transformers = Array(_len), _key = 0; _key < _len; _key++) {
      transformers[_key] = arguments[_key];
    }

    _classCallCheck(this, TemplateTag);

    this.tag = function (strings) {
      for (var _len2 = arguments.length, expressions = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        expressions[_key2 - 1] = arguments[_key2];
      }

      if (typeof strings === 'function') {
        // if the first argument passed is a function, assume it is a template tag and return
        // an intermediary tag that processes the template using the aforementioned tag, passing the
        // result to our tag
        return _this.interimTag.bind(_this, strings);
      }

      if (typeof strings === 'string') {
        // if the first argument passed is a string, just transform it
        return _this.transformEndResult(strings);
      }

      // else, return a transformed end result of processing the template with our tag
      strings = strings.map(_this.transformString.bind(_this));
      return _this.transformEndResult(strings.reduce(_this.processSubstitutions.bind(_this, expressions)));
    };

    // if first argument is an array, extrude it as a list of transformers
    if (transformers.length > 0 && Array.isArray(transformers[0])) {
      transformers = transformers[0];
    }

    // if any transformers are functions, this means they are not initiated - automatically initiate them
    this.transformers = transformers.map(function (transformer) {
      return typeof transformer === 'function' ? transformer() : transformer;
    });

    // return an ES2015 template tag
    return this.tag;
  }

  /**
   * Applies all transformers to a template literal tagged with this method.
   * If a function is passed as the first argument, assumes the function is a template tag
   * and applies it to the template, returning a template tag.
   * @param  {(Function|String|Array<String>)} strings        - Either a template tag or an array containing template strings separated by identifier
   * @param  {...*}                            ...expressions - Optional list of substitution values.
   * @return {(String|Function)}                              - Either an intermediary tag function or the results of processing the template.
   */


  _createClass(TemplateTag, [{
    key: 'interimTag',


    /**
     * An intermediary template tag that receives a template tag and passes the result of calling the template with the received
     * template tag to our own template tag.
     * @param  {Function}        nextTag          - the received template tag
     * @param  {Array<String>}   template         - the template to process
     * @param  {...*}            ...substitutions - `substitutions` is an array of all substitutions in the template
     * @return {*}                                - the final processed value
     */
    value: function interimTag(previousTag, template) {
      for (var _len3 = arguments.length, substitutions = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        substitutions[_key3 - 2] = arguments[_key3];
      }

      return this.tag(_templateObject, previousTag.apply(undefined, [template].concat(substitutions)));
    }

    /**
     * Performs bulk processing on the tagged template, transforming each substitution and then
     * concatenating the resulting values into a string.
     * @param  {Array<*>} substitutions - an array of all remaining substitutions present in this template
     * @param  {String}   resultSoFar   - this iteration's result string so far
     * @param  {String}   remainingPart - the template chunk after the current substitution
     * @return {String}                 - the result of joining this iteration's processed substitution with the result
     */

  }, {
    key: 'processSubstitutions',
    value: function processSubstitutions(substitutions, resultSoFar, remainingPart) {
      var substitution = this.transformSubstitution(substitutions.shift(), resultSoFar);
      return ''.concat(resultSoFar, substitution, remainingPart);
    }

    /**
     * Iterate through each transformer, applying the transformer's `onString` method to the template
     * strings before all substitutions are processed.
     * @param {String}  str - The input string
     * @return {String}     - The final results of processing each transformer
     */

  }, {
    key: 'transformString',
    value: function transformString(str) {
      var cb = function cb(res, transform) {
        return transform.onString ? transform.onString(res) : res;
      };
      return this.transformers.reduce(cb, str);
    }

    /**
     * When a substitution is encountered, iterates through each transformer and applies the transformer's
     * `onSubstitution` method to the substitution.
     * @param  {*}      substitution - The current substitution
     * @param  {String} resultSoFar  - The result up to and excluding this substitution.
     * @return {*}                   - The final result of applying all substitution transformations.
     */

  }, {
    key: 'transformSubstitution',
    value: function transformSubstitution(substitution, resultSoFar) {
      var cb = function cb(res, transform) {
        return transform.onSubstitution ? transform.onSubstitution(res, resultSoFar) : res;
      };
      return this.transformers.reduce(cb, substitution);
    }

    /**
     * Iterates through each transformer, applying the transformer's `onEndResult` method to the
     * template literal after all substitutions have finished processing.
     * @param  {String} endResult - The processed template, just before it is returned from the tag
     * @return {String}           - The final results of processing each transformer
     */

  }, {
    key: 'transformEndResult',
    value: function transformEndResult(endResult) {
      var cb = function cb(res, transform) {
        return transform.onEndResult ? transform.onEndResult(res) : res;
      };
      return this.transformers.reduce(cb, endResult);
    }
  }]);

  return TemplateTag;
}();

/* harmony default export */ const TemplateTag_TemplateTag = (TemplateTag);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9UZW1wbGF0ZVRhZy9UZW1wbGF0ZVRhZy5qcyJdLCJuYW1lcyI6WyJUZW1wbGF0ZVRhZyIsInRyYW5zZm9ybWVycyIsInRhZyIsInN0cmluZ3MiLCJleHByZXNzaW9ucyIsImludGVyaW1UYWciLCJiaW5kIiwidHJhbnNmb3JtRW5kUmVzdWx0IiwibWFwIiwidHJhbnNmb3JtU3RyaW5nIiwicmVkdWNlIiwicHJvY2Vzc1N1YnN0aXR1dGlvbnMiLCJsZW5ndGgiLCJBcnJheSIsImlzQXJyYXkiLCJ0cmFuc2Zvcm1lciIsInByZXZpb3VzVGFnIiwidGVtcGxhdGUiLCJzdWJzdGl0dXRpb25zIiwicmVzdWx0U29GYXIiLCJyZW1haW5pbmdQYXJ0Iiwic3Vic3RpdHV0aW9uIiwidHJhbnNmb3JtU3Vic3RpdHV0aW9uIiwic2hpZnQiLCJjb25jYXQiLCJzdHIiLCJjYiIsInJlcyIsInRyYW5zZm9ybSIsIm9uU3RyaW5nIiwib25TdWJzdGl0dXRpb24iLCJlbmRSZXN1bHQiLCJvbkVuZFJlc3VsdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztJQUlxQkEsVztBQUNuQjs7Ozs7O0FBTUEseUJBQTZCO0FBQUE7O0FBQUEsc0NBQWRDLFlBQWM7QUFBZEEsa0JBQWM7QUFBQTs7QUFBQTs7QUFBQSxTQXVCN0JDLEdBdkI2QixHQXVCdkIsVUFBQ0MsT0FBRCxFQUE2QjtBQUFBLHlDQUFoQkMsV0FBZ0I7QUFBaEJBLG1CQUFnQjtBQUFBOztBQUNqQyxVQUFJLE9BQU9ELE9BQVAsS0FBbUIsVUFBdkIsRUFBbUM7QUFDakM7QUFDQTtBQUNBO0FBQ0EsZUFBTyxNQUFLRSxVQUFMLENBQWdCQyxJQUFoQixRQUEyQkgsT0FBM0IsQ0FBUDtBQUNEOztBQUVELFVBQUksT0FBT0EsT0FBUCxLQUFtQixRQUF2QixFQUFpQztBQUMvQjtBQUNBLGVBQU8sTUFBS0ksa0JBQUwsQ0FBd0JKLE9BQXhCLENBQVA7QUFDRDs7QUFFRDtBQUNBQSxnQkFBVUEsUUFBUUssR0FBUixDQUFZLE1BQUtDLGVBQUwsQ0FBcUJILElBQXJCLE9BQVosQ0FBVjtBQUNBLGFBQU8sTUFBS0Msa0JBQUwsQ0FDTEosUUFBUU8sTUFBUixDQUFlLE1BQUtDLG9CQUFMLENBQTBCTCxJQUExQixRQUFxQ0YsV0FBckMsQ0FBZixDQURLLENBQVA7QUFHRCxLQXpDNEI7O0FBQzNCO0FBQ0EsUUFBSUgsYUFBYVcsTUFBYixHQUFzQixDQUF0QixJQUEyQkMsTUFBTUMsT0FBTixDQUFjYixhQUFhLENBQWIsQ0FBZCxDQUEvQixFQUErRDtBQUM3REEscUJBQWVBLGFBQWEsQ0FBYixDQUFmO0FBQ0Q7O0FBRUQ7QUFDQSxTQUFLQSxZQUFMLEdBQW9CQSxhQUFhTyxHQUFiLENBQWlCLHVCQUFlO0FBQ2xELGFBQU8sT0FBT08sV0FBUCxLQUF1QixVQUF2QixHQUFvQ0EsYUFBcEMsR0FBb0RBLFdBQTNEO0FBQ0QsS0FGbUIsQ0FBcEI7O0FBSUE7QUFDQSxXQUFPLEtBQUtiLEdBQVo7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7QUE0QkE7Ozs7Ozs7OytCQVFXYyxXLEVBQWFDLFEsRUFBNEI7QUFBQSx5Q0FBZkMsYUFBZTtBQUFmQSxxQkFBZTtBQUFBOztBQUNsRCxhQUFPLEtBQUtoQixHQUFaLGtCQUFrQmMsOEJBQVlDLFFBQVosU0FBeUJDLGFBQXpCLEVBQWxCO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7O3lDQVFxQkEsYSxFQUFlQyxXLEVBQWFDLGEsRUFBZTtBQUM5RCxVQUFNQyxlQUFlLEtBQUtDLHFCQUFMLENBQ25CSixjQUFjSyxLQUFkLEVBRG1CLEVBRW5CSixXQUZtQixDQUFyQjtBQUlBLGFBQU8sR0FBR0ssTUFBSCxDQUFVTCxXQUFWLEVBQXVCRSxZQUF2QixFQUFxQ0QsYUFBckMsQ0FBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7b0NBTWdCSyxHLEVBQUs7QUFDbkIsVUFBTUMsS0FBSyxTQUFMQSxFQUFLLENBQUNDLEdBQUQsRUFBTUMsU0FBTjtBQUFBLGVBQ1RBLFVBQVVDLFFBQVYsR0FBcUJELFVBQVVDLFFBQVYsQ0FBbUJGLEdBQW5CLENBQXJCLEdBQStDQSxHQUR0QztBQUFBLE9BQVg7QUFFQSxhQUFPLEtBQUsxQixZQUFMLENBQWtCUyxNQUFsQixDQUF5QmdCLEVBQXpCLEVBQTZCRCxHQUE3QixDQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7MENBT3NCSixZLEVBQWNGLFcsRUFBYTtBQUMvQyxVQUFNTyxLQUFLLFNBQUxBLEVBQUssQ0FBQ0MsR0FBRCxFQUFNQyxTQUFOO0FBQUEsZUFDVEEsVUFBVUUsY0FBVixHQUNJRixVQUFVRSxjQUFWLENBQXlCSCxHQUF6QixFQUE4QlIsV0FBOUIsQ0FESixHQUVJUSxHQUhLO0FBQUEsT0FBWDtBQUlBLGFBQU8sS0FBSzFCLFlBQUwsQ0FBa0JTLE1BQWxCLENBQXlCZ0IsRUFBekIsRUFBNkJMLFlBQTdCLENBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7O3VDQU1tQlUsUyxFQUFXO0FBQzVCLFVBQU1MLEtBQUssU0FBTEEsRUFBSyxDQUFDQyxHQUFELEVBQU1DLFNBQU47QUFBQSxlQUNUQSxVQUFVSSxXQUFWLEdBQXdCSixVQUFVSSxXQUFWLENBQXNCTCxHQUF0QixDQUF4QixHQUFxREEsR0FENUM7QUFBQSxPQUFYO0FBRUEsYUFBTyxLQUFLMUIsWUFBTCxDQUFrQlMsTUFBbEIsQ0FBeUJnQixFQUF6QixFQUE2QkssU0FBN0IsQ0FBUDtBQUNEOzs7Ozs7ZUFuSGtCL0IsVyIsImZpbGUiOiJUZW1wbGF0ZVRhZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGNsYXNzIFRlbXBsYXRlVGFnXG4gKiBAY2xhc3NkZXNjIENvbnN1bWVzIGEgcGlwZWxpbmUgb2YgY29tcG9zYWJsZSB0cmFuc2Zvcm1lciBwbHVnaW5zIGFuZCBwcm9kdWNlcyBhIHRlbXBsYXRlIHRhZy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVtcGxhdGVUYWcge1xuICAvKipcbiAgICogY29uc3RydWN0cyBhIHRlbXBsYXRlIHRhZ1xuICAgKiBAY29uc3RydWN0cyBUZW1wbGF0ZVRhZ1xuICAgKiBAcGFyYW0gIHsuLi5PYmplY3R9IFsuLi50cmFuc2Zvcm1lcnNdIC0gYW4gYXJyYXkgb3IgYXJndW1lbnRzIGxpc3Qgb2YgdHJhbnNmb3JtZXJzXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufSAgICAgICAgICAgICAgICAgICAgLSBhIHRlbXBsYXRlIHRhZ1xuICAgKi9cbiAgY29uc3RydWN0b3IoLi4udHJhbnNmb3JtZXJzKSB7XG4gICAgLy8gaWYgZmlyc3QgYXJndW1lbnQgaXMgYW4gYXJyYXksIGV4dHJ1ZGUgaXQgYXMgYSBsaXN0IG9mIHRyYW5zZm9ybWVyc1xuICAgIGlmICh0cmFuc2Zvcm1lcnMubGVuZ3RoID4gMCAmJiBBcnJheS5pc0FycmF5KHRyYW5zZm9ybWVyc1swXSkpIHtcbiAgICAgIHRyYW5zZm9ybWVycyA9IHRyYW5zZm9ybWVyc1swXTtcbiAgICB9XG5cbiAgICAvLyBpZiBhbnkgdHJhbnNmb3JtZXJzIGFyZSBmdW5jdGlvbnMsIHRoaXMgbWVhbnMgdGhleSBhcmUgbm90IGluaXRpYXRlZCAtIGF1dG9tYXRpY2FsbHkgaW5pdGlhdGUgdGhlbVxuICAgIHRoaXMudHJhbnNmb3JtZXJzID0gdHJhbnNmb3JtZXJzLm1hcCh0cmFuc2Zvcm1lciA9PiB7XG4gICAgICByZXR1cm4gdHlwZW9mIHRyYW5zZm9ybWVyID09PSAnZnVuY3Rpb24nID8gdHJhbnNmb3JtZXIoKSA6IHRyYW5zZm9ybWVyO1xuICAgIH0pO1xuXG4gICAgLy8gcmV0dXJuIGFuIEVTMjAxNSB0ZW1wbGF0ZSB0YWdcbiAgICByZXR1cm4gdGhpcy50YWc7XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyBhbGwgdHJhbnNmb3JtZXJzIHRvIGEgdGVtcGxhdGUgbGl0ZXJhbCB0YWdnZWQgd2l0aCB0aGlzIG1ldGhvZC5cbiAgICogSWYgYSBmdW5jdGlvbiBpcyBwYXNzZWQgYXMgdGhlIGZpcnN0IGFyZ3VtZW50LCBhc3N1bWVzIHRoZSBmdW5jdGlvbiBpcyBhIHRlbXBsYXRlIHRhZ1xuICAgKiBhbmQgYXBwbGllcyBpdCB0byB0aGUgdGVtcGxhdGUsIHJldHVybmluZyBhIHRlbXBsYXRlIHRhZy5cbiAgICogQHBhcmFtICB7KEZ1bmN0aW9ufFN0cmluZ3xBcnJheTxTdHJpbmc+KX0gc3RyaW5ncyAgICAgICAgLSBFaXRoZXIgYSB0ZW1wbGF0ZSB0YWcgb3IgYW4gYXJyYXkgY29udGFpbmluZyB0ZW1wbGF0ZSBzdHJpbmdzIHNlcGFyYXRlZCBieSBpZGVudGlmaWVyXG4gICAqIEBwYXJhbSAgey4uLip9ICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmV4cHJlc3Npb25zIC0gT3B0aW9uYWwgbGlzdCBvZiBzdWJzdGl0dXRpb24gdmFsdWVzLlxuICAgKiBAcmV0dXJuIHsoU3RyaW5nfEZ1bmN0aW9uKX0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtIEVpdGhlciBhbiBpbnRlcm1lZGlhcnkgdGFnIGZ1bmN0aW9uIG9yIHRoZSByZXN1bHRzIG9mIHByb2Nlc3NpbmcgdGhlIHRlbXBsYXRlLlxuICAgKi9cbiAgdGFnID0gKHN0cmluZ3MsIC4uLmV4cHJlc3Npb25zKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBzdHJpbmdzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBpZiB0aGUgZmlyc3QgYXJndW1lbnQgcGFzc2VkIGlzIGEgZnVuY3Rpb24sIGFzc3VtZSBpdCBpcyBhIHRlbXBsYXRlIHRhZyBhbmQgcmV0dXJuXG4gICAgICAvLyBhbiBpbnRlcm1lZGlhcnkgdGFnIHRoYXQgcHJvY2Vzc2VzIHRoZSB0ZW1wbGF0ZSB1c2luZyB0aGUgYWZvcmVtZW50aW9uZWQgdGFnLCBwYXNzaW5nIHRoZVxuICAgICAgLy8gcmVzdWx0IHRvIG91ciB0YWdcbiAgICAgIHJldHVybiB0aGlzLmludGVyaW1UYWcuYmluZCh0aGlzLCBzdHJpbmdzKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHN0cmluZ3MgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBpZiB0aGUgZmlyc3QgYXJndW1lbnQgcGFzc2VkIGlzIGEgc3RyaW5nLCBqdXN0IHRyYW5zZm9ybSBpdFxuICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtRW5kUmVzdWx0KHN0cmluZ3MpO1xuICAgIH1cblxuICAgIC8vIGVsc2UsIHJldHVybiBhIHRyYW5zZm9ybWVkIGVuZCByZXN1bHQgb2YgcHJvY2Vzc2luZyB0aGUgdGVtcGxhdGUgd2l0aCBvdXIgdGFnXG4gICAgc3RyaW5ncyA9IHN0cmluZ3MubWFwKHRoaXMudHJhbnNmb3JtU3RyaW5nLmJpbmQodGhpcykpO1xuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybUVuZFJlc3VsdChcbiAgICAgIHN0cmluZ3MucmVkdWNlKHRoaXMucHJvY2Vzc1N1YnN0aXR1dGlvbnMuYmluZCh0aGlzLCBleHByZXNzaW9ucykpLFxuICAgICk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFuIGludGVybWVkaWFyeSB0ZW1wbGF0ZSB0YWcgdGhhdCByZWNlaXZlcyBhIHRlbXBsYXRlIHRhZyBhbmQgcGFzc2VzIHRoZSByZXN1bHQgb2YgY2FsbGluZyB0aGUgdGVtcGxhdGUgd2l0aCB0aGUgcmVjZWl2ZWRcbiAgICogdGVtcGxhdGUgdGFnIHRvIG91ciBvd24gdGVtcGxhdGUgdGFnLlxuICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gICAgICAgIG5leHRUYWcgICAgICAgICAgLSB0aGUgcmVjZWl2ZWQgdGVtcGxhdGUgdGFnXG4gICAqIEBwYXJhbSAge0FycmF5PFN0cmluZz59ICAgdGVtcGxhdGUgICAgICAgICAtIHRoZSB0ZW1wbGF0ZSB0byBwcm9jZXNzXG4gICAqIEBwYXJhbSAgey4uLip9ICAgICAgICAgICAgLi4uc3Vic3RpdHV0aW9ucyAtIGBzdWJzdGl0dXRpb25zYCBpcyBhbiBhcnJheSBvZiBhbGwgc3Vic3RpdHV0aW9ucyBpbiB0aGUgdGVtcGxhdGVcbiAgICogQHJldHVybiB7Kn0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0gdGhlIGZpbmFsIHByb2Nlc3NlZCB2YWx1ZVxuICAgKi9cbiAgaW50ZXJpbVRhZyhwcmV2aW91c1RhZywgdGVtcGxhdGUsIC4uLnN1YnN0aXR1dGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy50YWdgJHtwcmV2aW91c1RhZyh0ZW1wbGF0ZSwgLi4uc3Vic3RpdHV0aW9ucyl9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBidWxrIHByb2Nlc3Npbmcgb24gdGhlIHRhZ2dlZCB0ZW1wbGF0ZSwgdHJhbnNmb3JtaW5nIGVhY2ggc3Vic3RpdHV0aW9uIGFuZCB0aGVuXG4gICAqIGNvbmNhdGVuYXRpbmcgdGhlIHJlc3VsdGluZyB2YWx1ZXMgaW50byBhIHN0cmluZy5cbiAgICogQHBhcmFtICB7QXJyYXk8Kj59IHN1YnN0aXR1dGlvbnMgLSBhbiBhcnJheSBvZiBhbGwgcmVtYWluaW5nIHN1YnN0aXR1dGlvbnMgcHJlc2VudCBpbiB0aGlzIHRlbXBsYXRlXG4gICAqIEBwYXJhbSAge1N0cmluZ30gICByZXN1bHRTb0ZhciAgIC0gdGhpcyBpdGVyYXRpb24ncyByZXN1bHQgc3RyaW5nIHNvIGZhclxuICAgKiBAcGFyYW0gIHtTdHJpbmd9ICAgcmVtYWluaW5nUGFydCAtIHRoZSB0ZW1wbGF0ZSBjaHVuayBhZnRlciB0aGUgY3VycmVudCBzdWJzdGl0dXRpb25cbiAgICogQHJldHVybiB7U3RyaW5nfSAgICAgICAgICAgICAgICAgLSB0aGUgcmVzdWx0IG9mIGpvaW5pbmcgdGhpcyBpdGVyYXRpb24ncyBwcm9jZXNzZWQgc3Vic3RpdHV0aW9uIHdpdGggdGhlIHJlc3VsdFxuICAgKi9cbiAgcHJvY2Vzc1N1YnN0aXR1dGlvbnMoc3Vic3RpdHV0aW9ucywgcmVzdWx0U29GYXIsIHJlbWFpbmluZ1BhcnQpIHtcbiAgICBjb25zdCBzdWJzdGl0dXRpb24gPSB0aGlzLnRyYW5zZm9ybVN1YnN0aXR1dGlvbihcbiAgICAgIHN1YnN0aXR1dGlvbnMuc2hpZnQoKSxcbiAgICAgIHJlc3VsdFNvRmFyLFxuICAgICk7XG4gICAgcmV0dXJuICcnLmNvbmNhdChyZXN1bHRTb0Zhciwgc3Vic3RpdHV0aW9uLCByZW1haW5pbmdQYXJ0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVyYXRlIHRocm91Z2ggZWFjaCB0cmFuc2Zvcm1lciwgYXBwbHlpbmcgdGhlIHRyYW5zZm9ybWVyJ3MgYG9uU3RyaW5nYCBtZXRob2QgdG8gdGhlIHRlbXBsYXRlXG4gICAqIHN0cmluZ3MgYmVmb3JlIGFsbCBzdWJzdGl0dXRpb25zIGFyZSBwcm9jZXNzZWQuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSAgc3RyIC0gVGhlIGlucHV0IHN0cmluZ1xuICAgKiBAcmV0dXJuIHtTdHJpbmd9ICAgICAtIFRoZSBmaW5hbCByZXN1bHRzIG9mIHByb2Nlc3NpbmcgZWFjaCB0cmFuc2Zvcm1lclxuICAgKi9cbiAgdHJhbnNmb3JtU3RyaW5nKHN0cikge1xuICAgIGNvbnN0IGNiID0gKHJlcywgdHJhbnNmb3JtKSA9PlxuICAgICAgdHJhbnNmb3JtLm9uU3RyaW5nID8gdHJhbnNmb3JtLm9uU3RyaW5nKHJlcykgOiByZXM7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtZXJzLnJlZHVjZShjYiwgc3RyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIGEgc3Vic3RpdHV0aW9uIGlzIGVuY291bnRlcmVkLCBpdGVyYXRlcyB0aHJvdWdoIGVhY2ggdHJhbnNmb3JtZXIgYW5kIGFwcGxpZXMgdGhlIHRyYW5zZm9ybWVyJ3NcbiAgICogYG9uU3Vic3RpdHV0aW9uYCBtZXRob2QgdG8gdGhlIHN1YnN0aXR1dGlvbi5cbiAgICogQHBhcmFtICB7Kn0gICAgICBzdWJzdGl0dXRpb24gLSBUaGUgY3VycmVudCBzdWJzdGl0dXRpb25cbiAgICogQHBhcmFtICB7U3RyaW5nfSByZXN1bHRTb0ZhciAgLSBUaGUgcmVzdWx0IHVwIHRvIGFuZCBleGNsdWRpbmcgdGhpcyBzdWJzdGl0dXRpb24uXG4gICAqIEByZXR1cm4geyp9ICAgICAgICAgICAgICAgICAgIC0gVGhlIGZpbmFsIHJlc3VsdCBvZiBhcHBseWluZyBhbGwgc3Vic3RpdHV0aW9uIHRyYW5zZm9ybWF0aW9ucy5cbiAgICovXG4gIHRyYW5zZm9ybVN1YnN0aXR1dGlvbihzdWJzdGl0dXRpb24sIHJlc3VsdFNvRmFyKSB7XG4gICAgY29uc3QgY2IgPSAocmVzLCB0cmFuc2Zvcm0pID0+XG4gICAgICB0cmFuc2Zvcm0ub25TdWJzdGl0dXRpb25cbiAgICAgICAgPyB0cmFuc2Zvcm0ub25TdWJzdGl0dXRpb24ocmVzLCByZXN1bHRTb0ZhcilcbiAgICAgICAgOiByZXM7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtZXJzLnJlZHVjZShjYiwgc3Vic3RpdHV0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVyYXRlcyB0aHJvdWdoIGVhY2ggdHJhbnNmb3JtZXIsIGFwcGx5aW5nIHRoZSB0cmFuc2Zvcm1lcidzIGBvbkVuZFJlc3VsdGAgbWV0aG9kIHRvIHRoZVxuICAgKiB0ZW1wbGF0ZSBsaXRlcmFsIGFmdGVyIGFsbCBzdWJzdGl0dXRpb25zIGhhdmUgZmluaXNoZWQgcHJvY2Vzc2luZy5cbiAgICogQHBhcmFtICB7U3RyaW5nfSBlbmRSZXN1bHQgLSBUaGUgcHJvY2Vzc2VkIHRlbXBsYXRlLCBqdXN0IGJlZm9yZSBpdCBpcyByZXR1cm5lZCBmcm9tIHRoZSB0YWdcbiAgICogQHJldHVybiB7U3RyaW5nfSAgICAgICAgICAgLSBUaGUgZmluYWwgcmVzdWx0cyBvZiBwcm9jZXNzaW5nIGVhY2ggdHJhbnNmb3JtZXJcbiAgICovXG4gIHRyYW5zZm9ybUVuZFJlc3VsdChlbmRSZXN1bHQpIHtcbiAgICBjb25zdCBjYiA9IChyZXMsIHRyYW5zZm9ybSkgPT5cbiAgICAgIHRyYW5zZm9ybS5vbkVuZFJlc3VsdCA/IHRyYW5zZm9ybS5vbkVuZFJlc3VsdChyZXMpIDogcmVzO1xuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybWVycy5yZWR1Y2UoY2IsIGVuZFJlc3VsdCk7XG4gIH1cbn1cbiJdfQ==
;// CONCATENATED MODULE: ./node_modules/common-tags/es/TemplateTag/index.js


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9UZW1wbGF0ZVRhZy9pbmRleC5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0Il0sIm1hcHBpbmdzIjoicUJBQW9CLGU7cUJBQWJBLE8iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmcm9tICcuL1RlbXBsYXRlVGFnJztcbiJdfQ==
;// CONCATENATED MODULE: ./node_modules/common-tags/es/trimResultTransformer/trimResultTransformer.js
/**
 * TemplateTag transformer that trims whitespace on the end result of a tagged template
 * @param  {String} side = '' - The side of the string to trim. Can be 'start' or 'end' (alternatively 'left' or 'right')
 * @return {Object}           - a TemplateTag transformer
 */
var trimResultTransformer = function trimResultTransformer() {
  var side = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return {
    onEndResult: function onEndResult(endResult) {
      if (side === '') {
        return endResult.trim();
      }

      side = side.toLowerCase();

      if (side === 'start' || side === 'left') {
        return endResult.replace(/^\s*/, '');
      }

      if (side === 'end' || side === 'right') {
        return endResult.replace(/\s*$/, '');
      }

      throw new Error('Side not supported: ' + side);
    }
  };
};

/* harmony default export */ const trimResultTransformer_trimResultTransformer = (trimResultTransformer);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmltUmVzdWx0VHJhbnNmb3JtZXIvdHJpbVJlc3VsdFRyYW5zZm9ybWVyLmpzIl0sIm5hbWVzIjpbInRyaW1SZXN1bHRUcmFuc2Zvcm1lciIsInNpZGUiLCJvbkVuZFJlc3VsdCIsImVuZFJlc3VsdCIsInRyaW0iLCJ0b0xvd2VyQ2FzZSIsInJlcGxhY2UiLCJFcnJvciJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0FBS0EsSUFBTUEsd0JBQXdCLFNBQXhCQSxxQkFBd0I7QUFBQSxNQUFDQyxJQUFELHVFQUFRLEVBQVI7QUFBQSxTQUFnQjtBQUM1Q0MsZUFENEMsdUJBQ2hDQyxTQURnQyxFQUNyQjtBQUNyQixVQUFJRixTQUFTLEVBQWIsRUFBaUI7QUFDZixlQUFPRSxVQUFVQyxJQUFWLEVBQVA7QUFDRDs7QUFFREgsYUFBT0EsS0FBS0ksV0FBTCxFQUFQOztBQUVBLFVBQUlKLFNBQVMsT0FBVCxJQUFvQkEsU0FBUyxNQUFqQyxFQUF5QztBQUN2QyxlQUFPRSxVQUFVRyxPQUFWLENBQWtCLE1BQWxCLEVBQTBCLEVBQTFCLENBQVA7QUFDRDs7QUFFRCxVQUFJTCxTQUFTLEtBQVQsSUFBa0JBLFNBQVMsT0FBL0IsRUFBd0M7QUFDdEMsZUFBT0UsVUFBVUcsT0FBVixDQUFrQixNQUFsQixFQUEwQixFQUExQixDQUFQO0FBQ0Q7O0FBRUQsWUFBTSxJQUFJQyxLQUFKLDBCQUFpQ04sSUFBakMsQ0FBTjtBQUNEO0FBakIyQyxHQUFoQjtBQUFBLENBQTlCOztBQW9CQSxlQUFlRCxxQkFBZiIsImZpbGUiOiJ0cmltUmVzdWx0VHJhbnNmb3JtZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRlbXBsYXRlVGFnIHRyYW5zZm9ybWVyIHRoYXQgdHJpbXMgd2hpdGVzcGFjZSBvbiB0aGUgZW5kIHJlc3VsdCBvZiBhIHRhZ2dlZCB0ZW1wbGF0ZVxuICogQHBhcmFtICB7U3RyaW5nfSBzaWRlID0gJycgLSBUaGUgc2lkZSBvZiB0aGUgc3RyaW5nIHRvIHRyaW0uIENhbiBiZSAnc3RhcnQnIG9yICdlbmQnIChhbHRlcm5hdGl2ZWx5ICdsZWZ0JyBvciAncmlnaHQnKVxuICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgICAgLSBhIFRlbXBsYXRlVGFnIHRyYW5zZm9ybWVyXG4gKi9cbmNvbnN0IHRyaW1SZXN1bHRUcmFuc2Zvcm1lciA9IChzaWRlID0gJycpID0+ICh7XG4gIG9uRW5kUmVzdWx0KGVuZFJlc3VsdCkge1xuICAgIGlmIChzaWRlID09PSAnJykge1xuICAgICAgcmV0dXJuIGVuZFJlc3VsdC50cmltKCk7XG4gICAgfVxuXG4gICAgc2lkZSA9IHNpZGUudG9Mb3dlckNhc2UoKTtcblxuICAgIGlmIChzaWRlID09PSAnc3RhcnQnIHx8IHNpZGUgPT09ICdsZWZ0Jykge1xuICAgICAgcmV0dXJuIGVuZFJlc3VsdC5yZXBsYWNlKC9eXFxzKi8sICcnKTtcbiAgICB9XG5cbiAgICBpZiAoc2lkZSA9PT0gJ2VuZCcgfHwgc2lkZSA9PT0gJ3JpZ2h0Jykge1xuICAgICAgcmV0dXJuIGVuZFJlc3VsdC5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoYFNpZGUgbm90IHN1cHBvcnRlZDogJHtzaWRlfWApO1xuICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHRyaW1SZXN1bHRUcmFuc2Zvcm1lcjtcbiJdfQ==
;// CONCATENATED MODULE: ./node_modules/common-tags/es/stripIndentTransformer/stripIndentTransformer.js
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * strips indentation from a template literal
 * @param  {String} type = 'initial' - whether to remove all indentation or just leading indentation. can be 'all' or 'initial'
 * @return {Object}                  - a TemplateTag transformer
 */
var stripIndentTransformer = function stripIndentTransformer() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'initial';
  return {
    onEndResult: function onEndResult(endResult) {
      if (type === 'initial') {
        // remove the shortest leading indentation from each line
        var match = endResult.match(/^[^\S\n]*(?=\S)/gm);
        var indent = match && Math.min.apply(Math, _toConsumableArray(match.map(function (el) {
          return el.length;
        })));
        if (indent) {
          var regexp = new RegExp('^.{' + indent + '}', 'gm');
          return endResult.replace(regexp, '');
        }
        return endResult;
      }
      if (type === 'all') {
        // remove all indentation from each line
        return endResult.replace(/^[^\S\n]+/gm, '');
      }
      throw new Error('Unknown type: ' + type);
    }
  };
};

/* harmony default export */ const stripIndentTransformer_stripIndentTransformer = (stripIndentTransformer);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJpcEluZGVudFRyYW5zZm9ybWVyL3N0cmlwSW5kZW50VHJhbnNmb3JtZXIuanMiXSwibmFtZXMiOlsic3RyaXBJbmRlbnRUcmFuc2Zvcm1lciIsInR5cGUiLCJvbkVuZFJlc3VsdCIsImVuZFJlc3VsdCIsIm1hdGNoIiwiaW5kZW50IiwiTWF0aCIsIm1pbiIsIm1hcCIsImVsIiwibGVuZ3RoIiwicmVnZXhwIiwiUmVnRXhwIiwicmVwbGFjZSIsIkVycm9yIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7OztBQUtBLElBQU1BLHlCQUF5QixTQUF6QkEsc0JBQXlCO0FBQUEsTUFBQ0MsSUFBRCx1RUFBUSxTQUFSO0FBQUEsU0FBdUI7QUFDcERDLGVBRG9ELHVCQUN4Q0MsU0FEd0MsRUFDN0I7QUFDckIsVUFBSUYsU0FBUyxTQUFiLEVBQXdCO0FBQ3RCO0FBQ0EsWUFBTUcsUUFBUUQsVUFBVUMsS0FBVixDQUFnQixtQkFBaEIsQ0FBZDtBQUNBLFlBQU1DLFNBQVNELFNBQVNFLEtBQUtDLEdBQUwsZ0NBQVlILE1BQU1JLEdBQU4sQ0FBVTtBQUFBLGlCQUFNQyxHQUFHQyxNQUFUO0FBQUEsU0FBVixDQUFaLEVBQXhCO0FBQ0EsWUFBSUwsTUFBSixFQUFZO0FBQ1YsY0FBTU0sU0FBUyxJQUFJQyxNQUFKLFNBQWlCUCxNQUFqQixRQUE0QixJQUE1QixDQUFmO0FBQ0EsaUJBQU9GLFVBQVVVLE9BQVYsQ0FBa0JGLE1BQWxCLEVBQTBCLEVBQTFCLENBQVA7QUFDRDtBQUNELGVBQU9SLFNBQVA7QUFDRDtBQUNELFVBQUlGLFNBQVMsS0FBYixFQUFvQjtBQUNsQjtBQUNBLGVBQU9FLFVBQVVVLE9BQVYsQ0FBa0IsYUFBbEIsRUFBaUMsRUFBakMsQ0FBUDtBQUNEO0FBQ0QsWUFBTSxJQUFJQyxLQUFKLG9CQUEyQmIsSUFBM0IsQ0FBTjtBQUNEO0FBakJtRCxHQUF2QjtBQUFBLENBQS9COztBQW9CQSxlQUFlRCxzQkFBZiIsImZpbGUiOiJzdHJpcEluZGVudFRyYW5zZm9ybWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBzdHJpcHMgaW5kZW50YXRpb24gZnJvbSBhIHRlbXBsYXRlIGxpdGVyYWxcbiAqIEBwYXJhbSAge1N0cmluZ30gdHlwZSA9ICdpbml0aWFsJyAtIHdoZXRoZXIgdG8gcmVtb3ZlIGFsbCBpbmRlbnRhdGlvbiBvciBqdXN0IGxlYWRpbmcgaW5kZW50YXRpb24uIGNhbiBiZSAnYWxsJyBvciAnaW5pdGlhbCdcbiAqIEByZXR1cm4ge09iamVjdH0gICAgICAgICAgICAgICAgICAtIGEgVGVtcGxhdGVUYWcgdHJhbnNmb3JtZXJcbiAqL1xuY29uc3Qgc3RyaXBJbmRlbnRUcmFuc2Zvcm1lciA9ICh0eXBlID0gJ2luaXRpYWwnKSA9PiAoe1xuICBvbkVuZFJlc3VsdChlbmRSZXN1bHQpIHtcbiAgICBpZiAodHlwZSA9PT0gJ2luaXRpYWwnKSB7XG4gICAgICAvLyByZW1vdmUgdGhlIHNob3J0ZXN0IGxlYWRpbmcgaW5kZW50YXRpb24gZnJvbSBlYWNoIGxpbmVcbiAgICAgIGNvbnN0IG1hdGNoID0gZW5kUmVzdWx0Lm1hdGNoKC9eW15cXFNcXG5dKig/PVxcUykvZ20pO1xuICAgICAgY29uc3QgaW5kZW50ID0gbWF0Y2ggJiYgTWF0aC5taW4oLi4ubWF0Y2gubWFwKGVsID0+IGVsLmxlbmd0aCkpO1xuICAgICAgaWYgKGluZGVudCkge1xuICAgICAgICBjb25zdCByZWdleHAgPSBuZXcgUmVnRXhwKGBeLnske2luZGVudH19YCwgJ2dtJyk7XG4gICAgICAgIHJldHVybiBlbmRSZXN1bHQucmVwbGFjZShyZWdleHAsICcnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlbmRSZXN1bHQ7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSAnYWxsJykge1xuICAgICAgLy8gcmVtb3ZlIGFsbCBpbmRlbnRhdGlvbiBmcm9tIGVhY2ggbGluZVxuICAgICAgcmV0dXJuIGVuZFJlc3VsdC5yZXBsYWNlKC9eW15cXFNcXG5dKy9nbSwgJycpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gdHlwZTogJHt0eXBlfWApO1xuICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmlwSW5kZW50VHJhbnNmb3JtZXI7XG4iXX0=
;// CONCATENATED MODULE: ./node_modules/common-tags/es/replaceResultTransformer/replaceResultTransformer.js
/**
 * Replaces tabs, newlines and spaces with the chosen value when they occur in sequences
 * @param  {(String|RegExp)} replaceWhat - the value or pattern that should be replaced
 * @param  {*}               replaceWith - the replacement value
 * @return {Object}                      - a TemplateTag transformer
 */
var replaceResultTransformer = function replaceResultTransformer(replaceWhat, replaceWith) {
  return {
    onEndResult: function onEndResult(endResult) {
      if (replaceWhat == null || replaceWith == null) {
        throw new Error('replaceResultTransformer requires at least 2 arguments.');
      }
      return endResult.replace(replaceWhat, replaceWith);
    }
  };
};

/* harmony default export */ const replaceResultTransformer_replaceResultTransformer = (replaceResultTransformer);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXBsYWNlUmVzdWx0VHJhbnNmb3JtZXIvcmVwbGFjZVJlc3VsdFRyYW5zZm9ybWVyLmpzIl0sIm5hbWVzIjpbInJlcGxhY2VSZXN1bHRUcmFuc2Zvcm1lciIsInJlcGxhY2VXaGF0IiwicmVwbGFjZVdpdGgiLCJvbkVuZFJlc3VsdCIsImVuZFJlc3VsdCIsIkVycm9yIiwicmVwbGFjZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQU1BLElBQU1BLDJCQUEyQixTQUEzQkEsd0JBQTJCLENBQUNDLFdBQUQsRUFBY0MsV0FBZDtBQUFBLFNBQStCO0FBQzlEQyxlQUQ4RCx1QkFDbERDLFNBRGtELEVBQ3ZDO0FBQ3JCLFVBQUlILGVBQWUsSUFBZixJQUF1QkMsZUFBZSxJQUExQyxFQUFnRDtBQUM5QyxjQUFNLElBQUlHLEtBQUosQ0FDSix5REFESSxDQUFOO0FBR0Q7QUFDRCxhQUFPRCxVQUFVRSxPQUFWLENBQWtCTCxXQUFsQixFQUErQkMsV0FBL0IsQ0FBUDtBQUNEO0FBUjZELEdBQS9CO0FBQUEsQ0FBakM7O0FBV0EsZUFBZUYsd0JBQWYiLCJmaWxlIjoicmVwbGFjZVJlc3VsdFRyYW5zZm9ybWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBSZXBsYWNlcyB0YWJzLCBuZXdsaW5lcyBhbmQgc3BhY2VzIHdpdGggdGhlIGNob3NlbiB2YWx1ZSB3aGVuIHRoZXkgb2NjdXIgaW4gc2VxdWVuY2VzXG4gKiBAcGFyYW0gIHsoU3RyaW5nfFJlZ0V4cCl9IHJlcGxhY2VXaGF0IC0gdGhlIHZhbHVlIG9yIHBhdHRlcm4gdGhhdCBzaG91bGQgYmUgcmVwbGFjZWRcbiAqIEBwYXJhbSAgeyp9ICAgICAgICAgICAgICAgcmVwbGFjZVdpdGggLSB0aGUgcmVwbGFjZW1lbnQgdmFsdWVcbiAqIEByZXR1cm4ge09iamVjdH0gICAgICAgICAgICAgICAgICAgICAgLSBhIFRlbXBsYXRlVGFnIHRyYW5zZm9ybWVyXG4gKi9cbmNvbnN0IHJlcGxhY2VSZXN1bHRUcmFuc2Zvcm1lciA9IChyZXBsYWNlV2hhdCwgcmVwbGFjZVdpdGgpID0+ICh7XG4gIG9uRW5kUmVzdWx0KGVuZFJlc3VsdCkge1xuICAgIGlmIChyZXBsYWNlV2hhdCA9PSBudWxsIHx8IHJlcGxhY2VXaXRoID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ3JlcGxhY2VSZXN1bHRUcmFuc2Zvcm1lciByZXF1aXJlcyBhdCBsZWFzdCAyIGFyZ3VtZW50cy4nLFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGVuZFJlc3VsdC5yZXBsYWNlKHJlcGxhY2VXaGF0LCByZXBsYWNlV2l0aCk7XG4gIH0sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgcmVwbGFjZVJlc3VsdFRyYW5zZm9ybWVyO1xuIl19
;// CONCATENATED MODULE: ./node_modules/common-tags/es/replaceSubstitutionTransformer/replaceSubstitutionTransformer.js
var replaceSubstitutionTransformer = function replaceSubstitutionTransformer(replaceWhat, replaceWith) {
  return {
    onSubstitution: function onSubstitution(substitution, resultSoFar) {
      if (replaceWhat == null || replaceWith == null) {
        throw new Error('replaceSubstitutionTransformer requires at least 2 arguments.');
      }

      // Do not touch if null or undefined
      if (substitution == null) {
        return substitution;
      } else {
        return substitution.toString().replace(replaceWhat, replaceWith);
      }
    }
  };
};

/* harmony default export */ const replaceSubstitutionTransformer_replaceSubstitutionTransformer = (replaceSubstitutionTransformer);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXBsYWNlU3Vic3RpdHV0aW9uVHJhbnNmb3JtZXIvcmVwbGFjZVN1YnN0aXR1dGlvblRyYW5zZm9ybWVyLmpzIl0sIm5hbWVzIjpbInJlcGxhY2VTdWJzdGl0dXRpb25UcmFuc2Zvcm1lciIsInJlcGxhY2VXaGF0IiwicmVwbGFjZVdpdGgiLCJvblN1YnN0aXR1dGlvbiIsInN1YnN0aXR1dGlvbiIsInJlc3VsdFNvRmFyIiwiRXJyb3IiLCJ0b1N0cmluZyIsInJlcGxhY2UiXSwibWFwcGluZ3MiOiJBQUFBLElBQU1BLGlDQUFpQyxTQUFqQ0EsOEJBQWlDLENBQUNDLFdBQUQsRUFBY0MsV0FBZDtBQUFBLFNBQStCO0FBQ3BFQyxrQkFEb0UsMEJBQ3JEQyxZQURxRCxFQUN2Q0MsV0FEdUMsRUFDMUI7QUFDeEMsVUFBSUosZUFBZSxJQUFmLElBQXVCQyxlQUFlLElBQTFDLEVBQWdEO0FBQzlDLGNBQU0sSUFBSUksS0FBSixDQUNKLCtEQURJLENBQU47QUFHRDs7QUFFRDtBQUNBLFVBQUlGLGdCQUFnQixJQUFwQixFQUEwQjtBQUN4QixlQUFPQSxZQUFQO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsZUFBT0EsYUFBYUcsUUFBYixHQUF3QkMsT0FBeEIsQ0FBZ0NQLFdBQWhDLEVBQTZDQyxXQUE3QyxDQUFQO0FBQ0Q7QUFDRjtBQWRtRSxHQUEvQjtBQUFBLENBQXZDOztBQWlCQSxlQUFlRiw4QkFBZiIsImZpbGUiOiJyZXBsYWNlU3Vic3RpdHV0aW9uVHJhbnNmb3JtZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCByZXBsYWNlU3Vic3RpdHV0aW9uVHJhbnNmb3JtZXIgPSAocmVwbGFjZVdoYXQsIHJlcGxhY2VXaXRoKSA9PiAoe1xuICBvblN1YnN0aXR1dGlvbihzdWJzdGl0dXRpb24sIHJlc3VsdFNvRmFyKSB7XG4gICAgaWYgKHJlcGxhY2VXaGF0ID09IG51bGwgfHwgcmVwbGFjZVdpdGggPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAncmVwbGFjZVN1YnN0aXR1dGlvblRyYW5zZm9ybWVyIHJlcXVpcmVzIGF0IGxlYXN0IDIgYXJndW1lbnRzLicsXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIERvIG5vdCB0b3VjaCBpZiBudWxsIG9yIHVuZGVmaW5lZFxuICAgIGlmIChzdWJzdGl0dXRpb24gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHN1YnN0aXR1dGlvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN1YnN0aXR1dGlvbi50b1N0cmluZygpLnJlcGxhY2UocmVwbGFjZVdoYXQsIHJlcGxhY2VXaXRoKTtcbiAgICB9XG4gIH0sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgcmVwbGFjZVN1YnN0aXR1dGlvblRyYW5zZm9ybWVyO1xuIl19
;// CONCATENATED MODULE: ./node_modules/common-tags/es/replaceStringTransformer/replaceStringTransformer.js
var replaceStringTransformer = function replaceStringTransformer(replaceWhat, replaceWith) {
  return {
    onString: function onString(str) {
      if (replaceWhat == null || replaceWith == null) {
        throw new Error('replaceStringTransformer requires at least 2 arguments.');
      }

      return str.replace(replaceWhat, replaceWith);
    }
  };
};

/* harmony default export */ const replaceStringTransformer_replaceStringTransformer = (replaceStringTransformer);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXBsYWNlU3RyaW5nVHJhbnNmb3JtZXIvcmVwbGFjZVN0cmluZ1RyYW5zZm9ybWVyLmpzIl0sIm5hbWVzIjpbInJlcGxhY2VTdHJpbmdUcmFuc2Zvcm1lciIsInJlcGxhY2VXaGF0IiwicmVwbGFjZVdpdGgiLCJvblN0cmluZyIsInN0ciIsIkVycm9yIiwicmVwbGFjZSJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBTUEsMkJBQTJCLFNBQTNCQSx3QkFBMkIsQ0FBQ0MsV0FBRCxFQUFjQyxXQUFkO0FBQUEsU0FBK0I7QUFDOURDLFlBRDhELG9CQUNyREMsR0FEcUQsRUFDaEQ7QUFDWixVQUFJSCxlQUFlLElBQWYsSUFBdUJDLGVBQWUsSUFBMUMsRUFBZ0Q7QUFDOUMsY0FBTSxJQUFJRyxLQUFKLENBQ0oseURBREksQ0FBTjtBQUdEOztBQUVELGFBQU9ELElBQUlFLE9BQUosQ0FBWUwsV0FBWixFQUF5QkMsV0FBekIsQ0FBUDtBQUNEO0FBVDZELEdBQS9CO0FBQUEsQ0FBakM7O0FBWUEsZUFBZUYsd0JBQWYiLCJmaWxlIjoicmVwbGFjZVN0cmluZ1RyYW5zZm9ybWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcmVwbGFjZVN0cmluZ1RyYW5zZm9ybWVyID0gKHJlcGxhY2VXaGF0LCByZXBsYWNlV2l0aCkgPT4gKHtcbiAgb25TdHJpbmcoc3RyKSB7XG4gICAgaWYgKHJlcGxhY2VXaGF0ID09IG51bGwgfHwgcmVwbGFjZVdpdGggPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAncmVwbGFjZVN0cmluZ1RyYW5zZm9ybWVyIHJlcXVpcmVzIGF0IGxlYXN0IDIgYXJndW1lbnRzLicsXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBzdHIucmVwbGFjZShyZXBsYWNlV2hhdCwgcmVwbGFjZVdpdGgpO1xuICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHJlcGxhY2VTdHJpbmdUcmFuc2Zvcm1lcjtcbiJdfQ==
;// CONCATENATED MODULE: ./node_modules/common-tags/es/inlineArrayTransformer/inlineArrayTransformer.js
var defaults = {
  separator: '',
  conjunction: '',
  serial: false
};

/**
 * Converts an array substitution to a string containing a list
 * @param  {String} [opts.separator = ''] - the character that separates each item
 * @param  {String} [opts.conjunction = '']  - replace the last separator with this
 * @param  {Boolean} [opts.serial = false] - include the separator before the conjunction? (Oxford comma use-case)
 *
 * @return {Object}                     - a TemplateTag transformer
 */
var inlineArrayTransformer = function inlineArrayTransformer() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaults;
  return {
    onSubstitution: function onSubstitution(substitution, resultSoFar) {
      // only operate on arrays
      if (Array.isArray(substitution)) {
        var arrayLength = substitution.length;
        var separator = opts.separator;
        var conjunction = opts.conjunction;
        var serial = opts.serial;
        // join each item in the array into a string where each item is separated by separator
        // be sure to maintain indentation
        var indent = resultSoFar.match(/(\n?[^\S\n]+)$/);
        if (indent) {
          substitution = substitution.join(separator + indent[1]);
        } else {
          substitution = substitution.join(separator + ' ');
        }
        // if conjunction is set, replace the last separator with conjunction, but only if there is more than one substitution
        if (conjunction && arrayLength > 1) {
          var separatorIndex = substitution.lastIndexOf(separator);
          substitution = substitution.slice(0, separatorIndex) + (serial ? separator : '') + ' ' + conjunction + substitution.slice(separatorIndex + 1);
        }
      }
      return substitution;
    }
  };
};

/* harmony default export */ const inlineArrayTransformer_inlineArrayTransformer = (inlineArrayTransformer);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbmxpbmVBcnJheVRyYW5zZm9ybWVyL2lubGluZUFycmF5VHJhbnNmb3JtZXIuanMiXSwibmFtZXMiOlsiZGVmYXVsdHMiLCJzZXBhcmF0b3IiLCJjb25qdW5jdGlvbiIsInNlcmlhbCIsImlubGluZUFycmF5VHJhbnNmb3JtZXIiLCJvcHRzIiwib25TdWJzdGl0dXRpb24iLCJzdWJzdGl0dXRpb24iLCJyZXN1bHRTb0ZhciIsIkFycmF5IiwiaXNBcnJheSIsImFycmF5TGVuZ3RoIiwibGVuZ3RoIiwiaW5kZW50IiwibWF0Y2giLCJqb2luIiwic2VwYXJhdG9ySW5kZXgiLCJsYXN0SW5kZXhPZiIsInNsaWNlIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFNQSxXQUFXO0FBQ2ZDLGFBQVcsRUFESTtBQUVmQyxlQUFhLEVBRkU7QUFHZkMsVUFBUTtBQUhPLENBQWpCOztBQU1BOzs7Ozs7OztBQVFBLElBQU1DLHlCQUF5QixTQUF6QkEsc0JBQXlCO0FBQUEsTUFBQ0MsSUFBRCx1RUFBUUwsUUFBUjtBQUFBLFNBQXNCO0FBQ25ETSxrQkFEbUQsMEJBQ3BDQyxZQURvQyxFQUN0QkMsV0FEc0IsRUFDVDtBQUN4QztBQUNBLFVBQUlDLE1BQU1DLE9BQU4sQ0FBY0gsWUFBZCxDQUFKLEVBQWlDO0FBQy9CLFlBQU1JLGNBQWNKLGFBQWFLLE1BQWpDO0FBQ0EsWUFBTVgsWUFBWUksS0FBS0osU0FBdkI7QUFDQSxZQUFNQyxjQUFjRyxLQUFLSCxXQUF6QjtBQUNBLFlBQU1DLFNBQVNFLEtBQUtGLE1BQXBCO0FBQ0E7QUFDQTtBQUNBLFlBQU1VLFNBQVNMLFlBQVlNLEtBQVosQ0FBa0IsZ0JBQWxCLENBQWY7QUFDQSxZQUFJRCxNQUFKLEVBQVk7QUFDVk4seUJBQWVBLGFBQWFRLElBQWIsQ0FBa0JkLFlBQVlZLE9BQU8sQ0FBUCxDQUE5QixDQUFmO0FBQ0QsU0FGRCxNQUVPO0FBQ0xOLHlCQUFlQSxhQUFhUSxJQUFiLENBQWtCZCxZQUFZLEdBQTlCLENBQWY7QUFDRDtBQUNEO0FBQ0EsWUFBSUMsZUFBZVMsY0FBYyxDQUFqQyxFQUFvQztBQUNsQyxjQUFNSyxpQkFBaUJULGFBQWFVLFdBQWIsQ0FBeUJoQixTQUF6QixDQUF2QjtBQUNBTSx5QkFDRUEsYUFBYVcsS0FBYixDQUFtQixDQUFuQixFQUFzQkYsY0FBdEIsS0FDQ2IsU0FBU0YsU0FBVCxHQUFxQixFQUR0QixJQUVBLEdBRkEsR0FHQUMsV0FIQSxHQUlBSyxhQUFhVyxLQUFiLENBQW1CRixpQkFBaUIsQ0FBcEMsQ0FMRjtBQU1EO0FBQ0Y7QUFDRCxhQUFPVCxZQUFQO0FBQ0Q7QUE1QmtELEdBQXRCO0FBQUEsQ0FBL0I7O0FBK0JBLGVBQWVILHNCQUFmIiwiZmlsZSI6ImlubGluZUFycmF5VHJhbnNmb3JtZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkZWZhdWx0cyA9IHtcbiAgc2VwYXJhdG9yOiAnJyxcbiAgY29uanVuY3Rpb246ICcnLFxuICBzZXJpYWw6IGZhbHNlLFxufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhbiBhcnJheSBzdWJzdGl0dXRpb24gdG8gYSBzdHJpbmcgY29udGFpbmluZyBhIGxpc3RcbiAqIEBwYXJhbSAge1N0cmluZ30gW29wdHMuc2VwYXJhdG9yID0gJyddIC0gdGhlIGNoYXJhY3RlciB0aGF0IHNlcGFyYXRlcyBlYWNoIGl0ZW1cbiAqIEBwYXJhbSAge1N0cmluZ30gW29wdHMuY29uanVuY3Rpb24gPSAnJ10gIC0gcmVwbGFjZSB0aGUgbGFzdCBzZXBhcmF0b3Igd2l0aCB0aGlzXG4gKiBAcGFyYW0gIHtCb29sZWFufSBbb3B0cy5zZXJpYWwgPSBmYWxzZV0gLSBpbmNsdWRlIHRoZSBzZXBhcmF0b3IgYmVmb3JlIHRoZSBjb25qdW5jdGlvbj8gKE94Zm9yZCBjb21tYSB1c2UtY2FzZSlcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICAgICAgICAgICAgICAgLSBhIFRlbXBsYXRlVGFnIHRyYW5zZm9ybWVyXG4gKi9cbmNvbnN0IGlubGluZUFycmF5VHJhbnNmb3JtZXIgPSAob3B0cyA9IGRlZmF1bHRzKSA9PiAoe1xuICBvblN1YnN0aXR1dGlvbihzdWJzdGl0dXRpb24sIHJlc3VsdFNvRmFyKSB7XG4gICAgLy8gb25seSBvcGVyYXRlIG9uIGFycmF5c1xuICAgIGlmIChBcnJheS5pc0FycmF5KHN1YnN0aXR1dGlvbikpIHtcbiAgICAgIGNvbnN0IGFycmF5TGVuZ3RoID0gc3Vic3RpdHV0aW9uLmxlbmd0aDtcbiAgICAgIGNvbnN0IHNlcGFyYXRvciA9IG9wdHMuc2VwYXJhdG9yO1xuICAgICAgY29uc3QgY29uanVuY3Rpb24gPSBvcHRzLmNvbmp1bmN0aW9uO1xuICAgICAgY29uc3Qgc2VyaWFsID0gb3B0cy5zZXJpYWw7XG4gICAgICAvLyBqb2luIGVhY2ggaXRlbSBpbiB0aGUgYXJyYXkgaW50byBhIHN0cmluZyB3aGVyZSBlYWNoIGl0ZW0gaXMgc2VwYXJhdGVkIGJ5IHNlcGFyYXRvclxuICAgICAgLy8gYmUgc3VyZSB0byBtYWludGFpbiBpbmRlbnRhdGlvblxuICAgICAgY29uc3QgaW5kZW50ID0gcmVzdWx0U29GYXIubWF0Y2goLyhcXG4/W15cXFNcXG5dKykkLyk7XG4gICAgICBpZiAoaW5kZW50KSB7XG4gICAgICAgIHN1YnN0aXR1dGlvbiA9IHN1YnN0aXR1dGlvbi5qb2luKHNlcGFyYXRvciArIGluZGVudFsxXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdWJzdGl0dXRpb24gPSBzdWJzdGl0dXRpb24uam9pbihzZXBhcmF0b3IgKyAnICcpO1xuICAgICAgfVxuICAgICAgLy8gaWYgY29uanVuY3Rpb24gaXMgc2V0LCByZXBsYWNlIHRoZSBsYXN0IHNlcGFyYXRvciB3aXRoIGNvbmp1bmN0aW9uLCBidXQgb25seSBpZiB0aGVyZSBpcyBtb3JlIHRoYW4gb25lIHN1YnN0aXR1dGlvblxuICAgICAgaWYgKGNvbmp1bmN0aW9uICYmIGFycmF5TGVuZ3RoID4gMSkge1xuICAgICAgICBjb25zdCBzZXBhcmF0b3JJbmRleCA9IHN1YnN0aXR1dGlvbi5sYXN0SW5kZXhPZihzZXBhcmF0b3IpO1xuICAgICAgICBzdWJzdGl0dXRpb24gPVxuICAgICAgICAgIHN1YnN0aXR1dGlvbi5zbGljZSgwLCBzZXBhcmF0b3JJbmRleCkgK1xuICAgICAgICAgIChzZXJpYWwgPyBzZXBhcmF0b3IgOiAnJykgK1xuICAgICAgICAgICcgJyArXG4gICAgICAgICAgY29uanVuY3Rpb24gK1xuICAgICAgICAgIHN1YnN0aXR1dGlvbi5zbGljZShzZXBhcmF0b3JJbmRleCArIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3Vic3RpdHV0aW9uO1xuICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGlubGluZUFycmF5VHJhbnNmb3JtZXI7XG4iXX0=
;// CONCATENATED MODULE: ./node_modules/common-tags/es/inlineArrayTransformer/index.js


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbmxpbmVBcnJheVRyYW5zZm9ybWVyL2luZGV4LmpzIl0sIm5hbWVzIjpbImRlZmF1bHQiXSwibWFwcGluZ3MiOiJxQkFBb0IsMEI7cUJBQWJBLE8iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmcm9tICcuL2lubGluZUFycmF5VHJhbnNmb3JtZXInO1xuIl19
;// CONCATENATED MODULE: ./node_modules/common-tags/es/splitStringTransformer/splitStringTransformer.js
var splitStringTransformer = function splitStringTransformer(splitBy) {
  return {
    onSubstitution: function onSubstitution(substitution, resultSoFar) {
      if (splitBy != null && typeof splitBy === 'string') {
        if (typeof substitution === 'string' && substitution.includes(splitBy)) {
          substitution = substitution.split(splitBy);
        }
      } else {
        throw new Error('You need to specify a string character to split by.');
      }
      return substitution;
    }
  };
};

/* harmony default export */ const splitStringTransformer_splitStringTransformer = (splitStringTransformer);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zcGxpdFN0cmluZ1RyYW5zZm9ybWVyL3NwbGl0U3RyaW5nVHJhbnNmb3JtZXIuanMiXSwibmFtZXMiOlsic3BsaXRTdHJpbmdUcmFuc2Zvcm1lciIsIm9uU3Vic3RpdHV0aW9uIiwic3Vic3RpdHV0aW9uIiwicmVzdWx0U29GYXIiLCJzcGxpdEJ5IiwiaW5jbHVkZXMiLCJzcGxpdCIsIkVycm9yIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFNQSx5QkFBeUIsU0FBekJBLHNCQUF5QjtBQUFBLFNBQVk7QUFDekNDLGtCQUR5QywwQkFDMUJDLFlBRDBCLEVBQ1pDLFdBRFksRUFDQztBQUN4QyxVQUFJQyxXQUFXLElBQVgsSUFBbUIsT0FBT0EsT0FBUCxLQUFtQixRQUExQyxFQUFvRDtBQUNsRCxZQUFJLE9BQU9GLFlBQVAsS0FBd0IsUUFBeEIsSUFBb0NBLGFBQWFHLFFBQWIsQ0FBc0JELE9BQXRCLENBQXhDLEVBQXdFO0FBQ3RFRix5QkFBZUEsYUFBYUksS0FBYixDQUFtQkYsT0FBbkIsQ0FBZjtBQUNEO0FBQ0YsT0FKRCxNQUlPO0FBQ0wsY0FBTSxJQUFJRyxLQUFKLENBQVUscURBQVYsQ0FBTjtBQUNEO0FBQ0QsYUFBT0wsWUFBUDtBQUNEO0FBVndDLEdBQVo7QUFBQSxDQUEvQjs7QUFhQSxlQUFlRixzQkFBZiIsImZpbGUiOiJzcGxpdFN0cmluZ1RyYW5zZm9ybWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc3BsaXRTdHJpbmdUcmFuc2Zvcm1lciA9IHNwbGl0QnkgPT4gKHtcbiAgb25TdWJzdGl0dXRpb24oc3Vic3RpdHV0aW9uLCByZXN1bHRTb0Zhcikge1xuICAgIGlmIChzcGxpdEJ5ICE9IG51bGwgJiYgdHlwZW9mIHNwbGl0QnkgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAodHlwZW9mIHN1YnN0aXR1dGlvbiA9PT0gJ3N0cmluZycgJiYgc3Vic3RpdHV0aW9uLmluY2x1ZGVzKHNwbGl0QnkpKSB7XG4gICAgICAgIHN1YnN0aXR1dGlvbiA9IHN1YnN0aXR1dGlvbi5zcGxpdChzcGxpdEJ5KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbmVlZCB0byBzcGVjaWZ5IGEgc3RyaW5nIGNoYXJhY3RlciB0byBzcGxpdCBieS4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHN1YnN0aXR1dGlvbjtcbiAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBzcGxpdFN0cmluZ1RyYW5zZm9ybWVyO1xuIl19
;// CONCATENATED MODULE: ./node_modules/common-tags/es/removeNonPrintingValuesTransformer/removeNonPrintingValuesTransformer.js
var isValidValue = function isValidValue(x) {
  return x != null && !Number.isNaN(x) && typeof x !== 'boolean';
};

var removeNonPrintingValuesTransformer = function removeNonPrintingValuesTransformer() {
  return {
    onSubstitution: function onSubstitution(substitution) {
      if (Array.isArray(substitution)) {
        return substitution.filter(isValidValue);
      }
      if (isValidValue(substitution)) {
        return substitution;
      }
      return '';
    }
  };
};

/* harmony default export */ const removeNonPrintingValuesTransformer_removeNonPrintingValuesTransformer = (removeNonPrintingValuesTransformer);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZW1vdmVOb25QcmludGluZ1ZhbHVlc1RyYW5zZm9ybWVyL3JlbW92ZU5vblByaW50aW5nVmFsdWVzVHJhbnNmb3JtZXIuanMiXSwibmFtZXMiOlsiaXNWYWxpZFZhbHVlIiwieCIsIk51bWJlciIsImlzTmFOIiwicmVtb3ZlTm9uUHJpbnRpbmdWYWx1ZXNUcmFuc2Zvcm1lciIsIm9uU3Vic3RpdHV0aW9uIiwic3Vic3RpdHV0aW9uIiwiQXJyYXkiLCJpc0FycmF5IiwiZmlsdGVyIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFNQSxlQUFlLFNBQWZBLFlBQWU7QUFBQSxTQUNuQkMsS0FBSyxJQUFMLElBQWEsQ0FBQ0MsT0FBT0MsS0FBUCxDQUFhRixDQUFiLENBQWQsSUFBaUMsT0FBT0EsQ0FBUCxLQUFhLFNBRDNCO0FBQUEsQ0FBckI7O0FBR0EsSUFBTUcscUNBQXFDLFNBQXJDQSxrQ0FBcUM7QUFBQSxTQUFPO0FBQ2hEQyxrQkFEZ0QsMEJBQ2pDQyxZQURpQyxFQUNuQjtBQUMzQixVQUFJQyxNQUFNQyxPQUFOLENBQWNGLFlBQWQsQ0FBSixFQUFpQztBQUMvQixlQUFPQSxhQUFhRyxNQUFiLENBQW9CVCxZQUFwQixDQUFQO0FBQ0Q7QUFDRCxVQUFJQSxhQUFhTSxZQUFiLENBQUosRUFBZ0M7QUFDOUIsZUFBT0EsWUFBUDtBQUNEO0FBQ0QsYUFBTyxFQUFQO0FBQ0Q7QUFUK0MsR0FBUDtBQUFBLENBQTNDOztBQVlBLGVBQWVGLGtDQUFmIiwiZmlsZSI6InJlbW92ZU5vblByaW50aW5nVmFsdWVzVHJhbnNmb3JtZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBpc1ZhbGlkVmFsdWUgPSB4ID0+XG4gIHggIT0gbnVsbCAmJiAhTnVtYmVyLmlzTmFOKHgpICYmIHR5cGVvZiB4ICE9PSAnYm9vbGVhbic7XG5cbmNvbnN0IHJlbW92ZU5vblByaW50aW5nVmFsdWVzVHJhbnNmb3JtZXIgPSAoKSA9PiAoe1xuICBvblN1YnN0aXR1dGlvbihzdWJzdGl0dXRpb24pIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShzdWJzdGl0dXRpb24pKSB7XG4gICAgICByZXR1cm4gc3Vic3RpdHV0aW9uLmZpbHRlcihpc1ZhbGlkVmFsdWUpO1xuICAgIH1cbiAgICBpZiAoaXNWYWxpZFZhbHVlKHN1YnN0aXR1dGlvbikpIHtcbiAgICAgIHJldHVybiBzdWJzdGl0dXRpb247XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCByZW1vdmVOb25QcmludGluZ1ZhbHVlc1RyYW5zZm9ybWVyO1xuIl19
;// CONCATENATED MODULE: ./node_modules/common-tags/es/commaLists/commaLists.js





var commaLists = new TemplateTag_TemplateTag(inlineArrayTransformer_inlineArrayTransformer({ separator: ',' }), stripIndentTransformer_stripIndentTransformer, trimResultTransformer_trimResultTransformer);

/* harmony default export */ const commaLists_commaLists = (commaLists);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYUxpc3RzL2NvbW1hTGlzdHMuanMiXSwibmFtZXMiOlsiVGVtcGxhdGVUYWciLCJzdHJpcEluZGVudFRyYW5zZm9ybWVyIiwiaW5saW5lQXJyYXlUcmFuc2Zvcm1lciIsInRyaW1SZXN1bHRUcmFuc2Zvcm1lciIsImNvbW1hTGlzdHMiLCJzZXBhcmF0b3IiXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLFdBQVAsTUFBd0IsZ0JBQXhCO0FBQ0EsT0FBT0Msc0JBQVAsTUFBbUMsMkJBQW5DO0FBQ0EsT0FBT0Msc0JBQVAsTUFBbUMsMkJBQW5DO0FBQ0EsT0FBT0MscUJBQVAsTUFBa0MsMEJBQWxDOztBQUVBLElBQU1DLGFBQWEsSUFBSUosV0FBSixDQUNqQkUsdUJBQXVCLEVBQUVHLFdBQVcsR0FBYixFQUF2QixDQURpQixFQUVqQkosc0JBRmlCLEVBR2pCRSxxQkFIaUIsQ0FBbkI7O0FBTUEsZUFBZUMsVUFBZiIsImZpbGUiOiJjb21tYUxpc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRlbXBsYXRlVGFnIGZyb20gJy4uL1RlbXBsYXRlVGFnJztcbmltcG9ydCBzdHJpcEluZGVudFRyYW5zZm9ybWVyIGZyb20gJy4uL3N0cmlwSW5kZW50VHJhbnNmb3JtZXInO1xuaW1wb3J0IGlubGluZUFycmF5VHJhbnNmb3JtZXIgZnJvbSAnLi4vaW5saW5lQXJyYXlUcmFuc2Zvcm1lcic7XG5pbXBvcnQgdHJpbVJlc3VsdFRyYW5zZm9ybWVyIGZyb20gJy4uL3RyaW1SZXN1bHRUcmFuc2Zvcm1lcic7XG5cbmNvbnN0IGNvbW1hTGlzdHMgPSBuZXcgVGVtcGxhdGVUYWcoXG4gIGlubGluZUFycmF5VHJhbnNmb3JtZXIoeyBzZXBhcmF0b3I6ICcsJyB9KSxcbiAgc3RyaXBJbmRlbnRUcmFuc2Zvcm1lcixcbiAgdHJpbVJlc3VsdFRyYW5zZm9ybWVyLFxuKTtcblxuZXhwb3J0IGRlZmF1bHQgY29tbWFMaXN0cztcbiJdfQ==
;// CONCATENATED MODULE: ./node_modules/common-tags/es/commaLists/index.js


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYUxpc3RzL2luZGV4LmpzIl0sIm5hbWVzIjpbImRlZmF1bHQiXSwibWFwcGluZ3MiOiJxQkFBb0IsYztxQkFBYkEsTyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZyb20gJy4vY29tbWFMaXN0cyc7XG4iXX0=
;// CONCATENATED MODULE: ./node_modules/common-tags/es/commaListsAnd/commaListsAnd.js





var commaListsAnd = new TemplateTag_TemplateTag(inlineArrayTransformer_inlineArrayTransformer({ separator: ',', conjunction: 'and' }), stripIndentTransformer_stripIndentTransformer, trimResultTransformer_trimResultTransformer);

/* harmony default export */ const commaListsAnd_commaListsAnd = (commaListsAnd);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYUxpc3RzQW5kL2NvbW1hTGlzdHNBbmQuanMiXSwibmFtZXMiOlsiVGVtcGxhdGVUYWciLCJzdHJpcEluZGVudFRyYW5zZm9ybWVyIiwiaW5saW5lQXJyYXlUcmFuc2Zvcm1lciIsInRyaW1SZXN1bHRUcmFuc2Zvcm1lciIsImNvbW1hTGlzdHNBbmQiLCJzZXBhcmF0b3IiLCJjb25qdW5jdGlvbiJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBT0EsV0FBUCxNQUF3QixnQkFBeEI7QUFDQSxPQUFPQyxzQkFBUCxNQUFtQywyQkFBbkM7QUFDQSxPQUFPQyxzQkFBUCxNQUFtQywyQkFBbkM7QUFDQSxPQUFPQyxxQkFBUCxNQUFrQywwQkFBbEM7O0FBRUEsSUFBTUMsZ0JBQWdCLElBQUlKLFdBQUosQ0FDcEJFLHVCQUF1QixFQUFFRyxXQUFXLEdBQWIsRUFBa0JDLGFBQWEsS0FBL0IsRUFBdkIsQ0FEb0IsRUFFcEJMLHNCQUZvQixFQUdwQkUscUJBSG9CLENBQXRCOztBQU1BLGVBQWVDLGFBQWYiLCJmaWxlIjoiY29tbWFMaXN0c0FuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUZW1wbGF0ZVRhZyBmcm9tICcuLi9UZW1wbGF0ZVRhZyc7XG5pbXBvcnQgc3RyaXBJbmRlbnRUcmFuc2Zvcm1lciBmcm9tICcuLi9zdHJpcEluZGVudFRyYW5zZm9ybWVyJztcbmltcG9ydCBpbmxpbmVBcnJheVRyYW5zZm9ybWVyIGZyb20gJy4uL2lubGluZUFycmF5VHJhbnNmb3JtZXInO1xuaW1wb3J0IHRyaW1SZXN1bHRUcmFuc2Zvcm1lciBmcm9tICcuLi90cmltUmVzdWx0VHJhbnNmb3JtZXInO1xuXG5jb25zdCBjb21tYUxpc3RzQW5kID0gbmV3IFRlbXBsYXRlVGFnKFxuICBpbmxpbmVBcnJheVRyYW5zZm9ybWVyKHsgc2VwYXJhdG9yOiAnLCcsIGNvbmp1bmN0aW9uOiAnYW5kJyB9KSxcbiAgc3RyaXBJbmRlbnRUcmFuc2Zvcm1lcixcbiAgdHJpbVJlc3VsdFRyYW5zZm9ybWVyLFxuKTtcblxuZXhwb3J0IGRlZmF1bHQgY29tbWFMaXN0c0FuZDtcbiJdfQ==
;// CONCATENATED MODULE: ./node_modules/common-tags/es/commaListsAnd/index.js


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYUxpc3RzQW5kL2luZGV4LmpzIl0sIm5hbWVzIjpbImRlZmF1bHQiXSwibWFwcGluZ3MiOiJxQkFBb0IsaUI7cUJBQWJBLE8iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmcm9tICcuL2NvbW1hTGlzdHNBbmQnO1xuIl19
;// CONCATENATED MODULE: ./node_modules/common-tags/es/commaListsOr/commaListsOr.js





var commaListsOr = new TemplateTag_TemplateTag(inlineArrayTransformer_inlineArrayTransformer({ separator: ',', conjunction: 'or' }), stripIndentTransformer_stripIndentTransformer, trimResultTransformer_trimResultTransformer);

/* harmony default export */ const commaListsOr_commaListsOr = (commaListsOr);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYUxpc3RzT3IvY29tbWFMaXN0c09yLmpzIl0sIm5hbWVzIjpbIlRlbXBsYXRlVGFnIiwic3RyaXBJbmRlbnRUcmFuc2Zvcm1lciIsImlubGluZUFycmF5VHJhbnNmb3JtZXIiLCJ0cmltUmVzdWx0VHJhbnNmb3JtZXIiLCJjb21tYUxpc3RzT3IiLCJzZXBhcmF0b3IiLCJjb25qdW5jdGlvbiJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBT0EsV0FBUCxNQUF3QixnQkFBeEI7QUFDQSxPQUFPQyxzQkFBUCxNQUFtQywyQkFBbkM7QUFDQSxPQUFPQyxzQkFBUCxNQUFtQywyQkFBbkM7QUFDQSxPQUFPQyxxQkFBUCxNQUFrQywwQkFBbEM7O0FBRUEsSUFBTUMsZUFBZSxJQUFJSixXQUFKLENBQ25CRSx1QkFBdUIsRUFBRUcsV0FBVyxHQUFiLEVBQWtCQyxhQUFhLElBQS9CLEVBQXZCLENBRG1CLEVBRW5CTCxzQkFGbUIsRUFHbkJFLHFCQUhtQixDQUFyQjs7QUFNQSxlQUFlQyxZQUFmIiwiZmlsZSI6ImNvbW1hTGlzdHNPci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUZW1wbGF0ZVRhZyBmcm9tICcuLi9UZW1wbGF0ZVRhZyc7XG5pbXBvcnQgc3RyaXBJbmRlbnRUcmFuc2Zvcm1lciBmcm9tICcuLi9zdHJpcEluZGVudFRyYW5zZm9ybWVyJztcbmltcG9ydCBpbmxpbmVBcnJheVRyYW5zZm9ybWVyIGZyb20gJy4uL2lubGluZUFycmF5VHJhbnNmb3JtZXInO1xuaW1wb3J0IHRyaW1SZXN1bHRUcmFuc2Zvcm1lciBmcm9tICcuLi90cmltUmVzdWx0VHJhbnNmb3JtZXInO1xuXG5jb25zdCBjb21tYUxpc3RzT3IgPSBuZXcgVGVtcGxhdGVUYWcoXG4gIGlubGluZUFycmF5VHJhbnNmb3JtZXIoeyBzZXBhcmF0b3I6ICcsJywgY29uanVuY3Rpb246ICdvcicgfSksXG4gIHN0cmlwSW5kZW50VHJhbnNmb3JtZXIsXG4gIHRyaW1SZXN1bHRUcmFuc2Zvcm1lcixcbik7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbW1hTGlzdHNPcjtcbiJdfQ==
;// CONCATENATED MODULE: ./node_modules/common-tags/es/commaListsOr/index.js


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYUxpc3RzT3IvaW5kZXguanMiXSwibmFtZXMiOlsiZGVmYXVsdCJdLCJtYXBwaW5ncyI6InFCQUFvQixnQjtxQkFBYkEsTyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZyb20gJy4vY29tbWFMaXN0c09yJztcbiJdfQ==
;// CONCATENATED MODULE: ./node_modules/common-tags/es/html/html.js







var html = new TemplateTag_TemplateTag(splitStringTransformer_splitStringTransformer('\n'), removeNonPrintingValuesTransformer_removeNonPrintingValuesTransformer, inlineArrayTransformer_inlineArrayTransformer, stripIndentTransformer_stripIndentTransformer, trimResultTransformer_trimResultTransformer);

/* harmony default export */ const html_html = (html);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9odG1sL2h0bWwuanMiXSwibmFtZXMiOlsiVGVtcGxhdGVUYWciLCJzdHJpcEluZGVudFRyYW5zZm9ybWVyIiwiaW5saW5lQXJyYXlUcmFuc2Zvcm1lciIsInRyaW1SZXN1bHRUcmFuc2Zvcm1lciIsInNwbGl0U3RyaW5nVHJhbnNmb3JtZXIiLCJyZW1vdmVOb25QcmludGluZ1ZhbHVlc1RyYW5zZm9ybWVyIiwiaHRtbCJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBT0EsV0FBUCxNQUF3QixnQkFBeEI7QUFDQSxPQUFPQyxzQkFBUCxNQUFtQywyQkFBbkM7QUFDQSxPQUFPQyxzQkFBUCxNQUFtQywyQkFBbkM7QUFDQSxPQUFPQyxxQkFBUCxNQUFrQywwQkFBbEM7QUFDQSxPQUFPQyxzQkFBUCxNQUFtQywyQkFBbkM7QUFDQSxPQUFPQyxrQ0FBUCxNQUErQyx1Q0FBL0M7O0FBRUEsSUFBTUMsT0FBTyxJQUFJTixXQUFKLENBQ1hJLHVCQUF1QixJQUF2QixDQURXLEVBRVhDLGtDQUZXLEVBR1hILHNCQUhXLEVBSVhELHNCQUpXLEVBS1hFLHFCQUxXLENBQWI7O0FBUUEsZUFBZUcsSUFBZiIsImZpbGUiOiJodG1sLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRlbXBsYXRlVGFnIGZyb20gJy4uL1RlbXBsYXRlVGFnJztcbmltcG9ydCBzdHJpcEluZGVudFRyYW5zZm9ybWVyIGZyb20gJy4uL3N0cmlwSW5kZW50VHJhbnNmb3JtZXInO1xuaW1wb3J0IGlubGluZUFycmF5VHJhbnNmb3JtZXIgZnJvbSAnLi4vaW5saW5lQXJyYXlUcmFuc2Zvcm1lcic7XG5pbXBvcnQgdHJpbVJlc3VsdFRyYW5zZm9ybWVyIGZyb20gJy4uL3RyaW1SZXN1bHRUcmFuc2Zvcm1lcic7XG5pbXBvcnQgc3BsaXRTdHJpbmdUcmFuc2Zvcm1lciBmcm9tICcuLi9zcGxpdFN0cmluZ1RyYW5zZm9ybWVyJztcbmltcG9ydCByZW1vdmVOb25QcmludGluZ1ZhbHVlc1RyYW5zZm9ybWVyIGZyb20gJy4uL3JlbW92ZU5vblByaW50aW5nVmFsdWVzVHJhbnNmb3JtZXInO1xuXG5jb25zdCBodG1sID0gbmV3IFRlbXBsYXRlVGFnKFxuICBzcGxpdFN0cmluZ1RyYW5zZm9ybWVyKCdcXG4nKSxcbiAgcmVtb3ZlTm9uUHJpbnRpbmdWYWx1ZXNUcmFuc2Zvcm1lcixcbiAgaW5saW5lQXJyYXlUcmFuc2Zvcm1lcixcbiAgc3RyaXBJbmRlbnRUcmFuc2Zvcm1lcixcbiAgdHJpbVJlc3VsdFRyYW5zZm9ybWVyLFxuKTtcblxuZXhwb3J0IGRlZmF1bHQgaHRtbDtcbiJdfQ==
;// CONCATENATED MODULE: ./node_modules/common-tags/es/html/index.js


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9odG1sL2luZGV4LmpzIl0sIm5hbWVzIjpbImRlZmF1bHQiXSwibWFwcGluZ3MiOiJxQkFBb0IsUTtxQkFBYkEsTyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZyb20gJy4vaHRtbCc7XG4iXX0=
;// CONCATENATED MODULE: ./node_modules/common-tags/es/codeBlock/index.js


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb2RlQmxvY2svaW5kZXguanMiXSwibmFtZXMiOlsiZGVmYXVsdCJdLCJtYXBwaW5ncyI6InFCQUFvQixTO3FCQUFiQSxPIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnJvbSAnLi4vaHRtbCc7XG4iXX0=
;// CONCATENATED MODULE: ./node_modules/common-tags/es/source/index.js


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zb3VyY2UvaW5kZXguanMiXSwibmFtZXMiOlsiZGVmYXVsdCJdLCJtYXBwaW5ncyI6InFCQUFvQixTO3FCQUFiQSxPIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnJvbSAnLi4vaHRtbCc7XG4iXX0=
;// CONCATENATED MODULE: ./node_modules/common-tags/es/safeHtml/safeHtml.js







var safeHtml = new TemplateTag_TemplateTag(splitStringTransformer_splitStringTransformer('\n'), inlineArrayTransformer_inlineArrayTransformer, stripIndentTransformer_stripIndentTransformer, trimResultTransformer_trimResultTransformer, replaceSubstitutionTransformer_replaceSubstitutionTransformer(/&/g, '&amp;'), replaceSubstitutionTransformer_replaceSubstitutionTransformer(/</g, '&lt;'), replaceSubstitutionTransformer_replaceSubstitutionTransformer(/>/g, '&gt;'), replaceSubstitutionTransformer_replaceSubstitutionTransformer(/"/g, '&quot;'), replaceSubstitutionTransformer_replaceSubstitutionTransformer(/'/g, '&#x27;'), replaceSubstitutionTransformer_replaceSubstitutionTransformer(/`/g, '&#x60;'));

/* harmony default export */ const safeHtml_safeHtml = (safeHtml);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zYWZlSHRtbC9zYWZlSHRtbC5qcyJdLCJuYW1lcyI6WyJUZW1wbGF0ZVRhZyIsInN0cmlwSW5kZW50VHJhbnNmb3JtZXIiLCJpbmxpbmVBcnJheVRyYW5zZm9ybWVyIiwidHJpbVJlc3VsdFRyYW5zZm9ybWVyIiwic3BsaXRTdHJpbmdUcmFuc2Zvcm1lciIsInJlcGxhY2VTdWJzdGl0dXRpb25UcmFuc2Zvcm1lciIsInNhZmVIdG1sIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxXQUFQLE1BQXdCLGdCQUF4QjtBQUNBLE9BQU9DLHNCQUFQLE1BQW1DLDJCQUFuQztBQUNBLE9BQU9DLHNCQUFQLE1BQW1DLDJCQUFuQztBQUNBLE9BQU9DLHFCQUFQLE1BQWtDLDBCQUFsQztBQUNBLE9BQU9DLHNCQUFQLE1BQW1DLDJCQUFuQztBQUNBLE9BQU9DLDhCQUFQLE1BQTJDLG1DQUEzQzs7QUFFQSxJQUFNQyxXQUFXLElBQUlOLFdBQUosQ0FDZkksdUJBQXVCLElBQXZCLENBRGUsRUFFZkYsc0JBRmUsRUFHZkQsc0JBSGUsRUFJZkUscUJBSmUsRUFLZkUsK0JBQStCLElBQS9CLEVBQXFDLE9BQXJDLENBTGUsRUFNZkEsK0JBQStCLElBQS9CLEVBQXFDLE1BQXJDLENBTmUsRUFPZkEsK0JBQStCLElBQS9CLEVBQXFDLE1BQXJDLENBUGUsRUFRZkEsK0JBQStCLElBQS9CLEVBQXFDLFFBQXJDLENBUmUsRUFTZkEsK0JBQStCLElBQS9CLEVBQXFDLFFBQXJDLENBVGUsRUFVZkEsK0JBQStCLElBQS9CLEVBQXFDLFFBQXJDLENBVmUsQ0FBakI7O0FBYUEsZUFBZUMsUUFBZiIsImZpbGUiOiJzYWZlSHRtbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUZW1wbGF0ZVRhZyBmcm9tICcuLi9UZW1wbGF0ZVRhZyc7XG5pbXBvcnQgc3RyaXBJbmRlbnRUcmFuc2Zvcm1lciBmcm9tICcuLi9zdHJpcEluZGVudFRyYW5zZm9ybWVyJztcbmltcG9ydCBpbmxpbmVBcnJheVRyYW5zZm9ybWVyIGZyb20gJy4uL2lubGluZUFycmF5VHJhbnNmb3JtZXInO1xuaW1wb3J0IHRyaW1SZXN1bHRUcmFuc2Zvcm1lciBmcm9tICcuLi90cmltUmVzdWx0VHJhbnNmb3JtZXInO1xuaW1wb3J0IHNwbGl0U3RyaW5nVHJhbnNmb3JtZXIgZnJvbSAnLi4vc3BsaXRTdHJpbmdUcmFuc2Zvcm1lcic7XG5pbXBvcnQgcmVwbGFjZVN1YnN0aXR1dGlvblRyYW5zZm9ybWVyIGZyb20gJy4uL3JlcGxhY2VTdWJzdGl0dXRpb25UcmFuc2Zvcm1lcic7XG5cbmNvbnN0IHNhZmVIdG1sID0gbmV3IFRlbXBsYXRlVGFnKFxuICBzcGxpdFN0cmluZ1RyYW5zZm9ybWVyKCdcXG4nKSxcbiAgaW5saW5lQXJyYXlUcmFuc2Zvcm1lcixcbiAgc3RyaXBJbmRlbnRUcmFuc2Zvcm1lcixcbiAgdHJpbVJlc3VsdFRyYW5zZm9ybWVyLFxuICByZXBsYWNlU3Vic3RpdHV0aW9uVHJhbnNmb3JtZXIoLyYvZywgJyZhbXA7JyksXG4gIHJlcGxhY2VTdWJzdGl0dXRpb25UcmFuc2Zvcm1lcigvPC9nLCAnJmx0OycpLFxuICByZXBsYWNlU3Vic3RpdHV0aW9uVHJhbnNmb3JtZXIoLz4vZywgJyZndDsnKSxcbiAgcmVwbGFjZVN1YnN0aXR1dGlvblRyYW5zZm9ybWVyKC9cIi9nLCAnJnF1b3Q7JyksXG4gIHJlcGxhY2VTdWJzdGl0dXRpb25UcmFuc2Zvcm1lcigvJy9nLCAnJiN4Mjc7JyksXG4gIHJlcGxhY2VTdWJzdGl0dXRpb25UcmFuc2Zvcm1lcigvYC9nLCAnJiN4NjA7JyksXG4pO1xuXG5leHBvcnQgZGVmYXVsdCBzYWZlSHRtbDtcbiJdfQ==
;// CONCATENATED MODULE: ./node_modules/common-tags/es/safeHtml/index.js


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zYWZlSHRtbC9pbmRleC5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0Il0sIm1hcHBpbmdzIjoicUJBQW9CLFk7cUJBQWJBLE8iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmcm9tICcuL3NhZmVIdG1sJztcbiJdfQ==
;// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLine/oneLine.js




var oneLine = new TemplateTag_TemplateTag(replaceResultTransformer_replaceResultTransformer(/(?:\n(?:\s*))+/g, ' '), trimResultTransformer_trimResultTransformer);

/* harmony default export */ const oneLine_oneLine = (oneLine);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vbmVMaW5lL29uZUxpbmUuanMiXSwibmFtZXMiOlsiVGVtcGxhdGVUYWciLCJ0cmltUmVzdWx0VHJhbnNmb3JtZXIiLCJyZXBsYWNlUmVzdWx0VHJhbnNmb3JtZXIiLCJvbmVMaW5lIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxXQUFQLE1BQXdCLGdCQUF4QjtBQUNBLE9BQU9DLHFCQUFQLE1BQWtDLDBCQUFsQztBQUNBLE9BQU9DLHdCQUFQLE1BQXFDLDZCQUFyQzs7QUFFQSxJQUFNQyxVQUFVLElBQUlILFdBQUosQ0FDZEUseUJBQXlCLGlCQUF6QixFQUE0QyxHQUE1QyxDQURjLEVBRWRELHFCQUZjLENBQWhCOztBQUtBLGVBQWVFLE9BQWYiLCJmaWxlIjoib25lTGluZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUZW1wbGF0ZVRhZyBmcm9tICcuLi9UZW1wbGF0ZVRhZyc7XG5pbXBvcnQgdHJpbVJlc3VsdFRyYW5zZm9ybWVyIGZyb20gJy4uL3RyaW1SZXN1bHRUcmFuc2Zvcm1lcic7XG5pbXBvcnQgcmVwbGFjZVJlc3VsdFRyYW5zZm9ybWVyIGZyb20gJy4uL3JlcGxhY2VSZXN1bHRUcmFuc2Zvcm1lcic7XG5cbmNvbnN0IG9uZUxpbmUgPSBuZXcgVGVtcGxhdGVUYWcoXG4gIHJlcGxhY2VSZXN1bHRUcmFuc2Zvcm1lcigvKD86XFxuKD86XFxzKikpKy9nLCAnICcpLFxuICB0cmltUmVzdWx0VHJhbnNmb3JtZXIsXG4pO1xuXG5leHBvcnQgZGVmYXVsdCBvbmVMaW5lO1xuIl19
;// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLine/index.js


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vbmVMaW5lL2luZGV4LmpzIl0sIm5hbWVzIjpbImRlZmF1bHQiXSwibWFwcGluZ3MiOiJxQkFBb0IsVztxQkFBYkEsTyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZyb20gJy4vb25lTGluZSc7XG4iXX0=
;// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLineTrim/oneLineTrim.js




var oneLineTrim = new TemplateTag_TemplateTag(replaceResultTransformer_replaceResultTransformer(/(?:\n\s*)/g, ''), trimResultTransformer_trimResultTransformer);

/* harmony default export */ const oneLineTrim_oneLineTrim = (oneLineTrim);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vbmVMaW5lVHJpbS9vbmVMaW5lVHJpbS5qcyJdLCJuYW1lcyI6WyJUZW1wbGF0ZVRhZyIsInRyaW1SZXN1bHRUcmFuc2Zvcm1lciIsInJlcGxhY2VSZXN1bHRUcmFuc2Zvcm1lciIsIm9uZUxpbmVUcmltIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxXQUFQLE1BQXdCLGdCQUF4QjtBQUNBLE9BQU9DLHFCQUFQLE1BQWtDLDBCQUFsQztBQUNBLE9BQU9DLHdCQUFQLE1BQXFDLDZCQUFyQzs7QUFFQSxJQUFNQyxjQUFjLElBQUlILFdBQUosQ0FDbEJFLHlCQUF5QixZQUF6QixFQUF1QyxFQUF2QyxDQURrQixFQUVsQkQscUJBRmtCLENBQXBCOztBQUtBLGVBQWVFLFdBQWYiLCJmaWxlIjoib25lTGluZVRyaW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGVtcGxhdGVUYWcgZnJvbSAnLi4vVGVtcGxhdGVUYWcnO1xuaW1wb3J0IHRyaW1SZXN1bHRUcmFuc2Zvcm1lciBmcm9tICcuLi90cmltUmVzdWx0VHJhbnNmb3JtZXInO1xuaW1wb3J0IHJlcGxhY2VSZXN1bHRUcmFuc2Zvcm1lciBmcm9tICcuLi9yZXBsYWNlUmVzdWx0VHJhbnNmb3JtZXInO1xuXG5jb25zdCBvbmVMaW5lVHJpbSA9IG5ldyBUZW1wbGF0ZVRhZyhcbiAgcmVwbGFjZVJlc3VsdFRyYW5zZm9ybWVyKC8oPzpcXG5cXHMqKS9nLCAnJyksXG4gIHRyaW1SZXN1bHRUcmFuc2Zvcm1lcixcbik7XG5cbmV4cG9ydCBkZWZhdWx0IG9uZUxpbmVUcmltO1xuIl19
;// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLineTrim/index.js


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vbmVMaW5lVHJpbS9pbmRleC5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0Il0sIm1hcHBpbmdzIjoicUJBQW9CLGU7cUJBQWJBLE8iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmcm9tICcuL29uZUxpbmVUcmltJztcbiJdfQ==
;// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLineCommaLists/oneLineCommaLists.js





var oneLineCommaLists = new TemplateTag_TemplateTag(inlineArrayTransformer_inlineArrayTransformer({ separator: ',' }), replaceResultTransformer_replaceResultTransformer(/(?:\s+)/g, ' '), trimResultTransformer_trimResultTransformer);

/* harmony default export */ const oneLineCommaLists_oneLineCommaLists = (oneLineCommaLists);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vbmVMaW5lQ29tbWFMaXN0cy9vbmVMaW5lQ29tbWFMaXN0cy5qcyJdLCJuYW1lcyI6WyJUZW1wbGF0ZVRhZyIsImlubGluZUFycmF5VHJhbnNmb3JtZXIiLCJ0cmltUmVzdWx0VHJhbnNmb3JtZXIiLCJyZXBsYWNlUmVzdWx0VHJhbnNmb3JtZXIiLCJvbmVMaW5lQ29tbWFMaXN0cyIsInNlcGFyYXRvciJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBT0EsV0FBUCxNQUF3QixnQkFBeEI7QUFDQSxPQUFPQyxzQkFBUCxNQUFtQywyQkFBbkM7QUFDQSxPQUFPQyxxQkFBUCxNQUFrQywwQkFBbEM7QUFDQSxPQUFPQyx3QkFBUCxNQUFxQyw2QkFBckM7O0FBRUEsSUFBTUMsb0JBQW9CLElBQUlKLFdBQUosQ0FDeEJDLHVCQUF1QixFQUFFSSxXQUFXLEdBQWIsRUFBdkIsQ0FEd0IsRUFFeEJGLHlCQUF5QixVQUF6QixFQUFxQyxHQUFyQyxDQUZ3QixFQUd4QkQscUJBSHdCLENBQTFCOztBQU1BLGVBQWVFLGlCQUFmIiwiZmlsZSI6Im9uZUxpbmVDb21tYUxpc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRlbXBsYXRlVGFnIGZyb20gJy4uL1RlbXBsYXRlVGFnJztcbmltcG9ydCBpbmxpbmVBcnJheVRyYW5zZm9ybWVyIGZyb20gJy4uL2lubGluZUFycmF5VHJhbnNmb3JtZXInO1xuaW1wb3J0IHRyaW1SZXN1bHRUcmFuc2Zvcm1lciBmcm9tICcuLi90cmltUmVzdWx0VHJhbnNmb3JtZXInO1xuaW1wb3J0IHJlcGxhY2VSZXN1bHRUcmFuc2Zvcm1lciBmcm9tICcuLi9yZXBsYWNlUmVzdWx0VHJhbnNmb3JtZXInO1xuXG5jb25zdCBvbmVMaW5lQ29tbWFMaXN0cyA9IG5ldyBUZW1wbGF0ZVRhZyhcbiAgaW5saW5lQXJyYXlUcmFuc2Zvcm1lcih7IHNlcGFyYXRvcjogJywnIH0pLFxuICByZXBsYWNlUmVzdWx0VHJhbnNmb3JtZXIoLyg/OlxccyspL2csICcgJyksXG4gIHRyaW1SZXN1bHRUcmFuc2Zvcm1lcixcbik7XG5cbmV4cG9ydCBkZWZhdWx0IG9uZUxpbmVDb21tYUxpc3RzO1xuIl19
;// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLineCommaLists/index.js


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vbmVMaW5lQ29tbWFMaXN0cy9pbmRleC5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0Il0sIm1hcHBpbmdzIjoicUJBQW9CLHFCO3FCQUFiQSxPIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnJvbSAnLi9vbmVMaW5lQ29tbWFMaXN0cyc7XG4iXX0=
;// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLineCommaListsOr/oneLineCommaListsOr.js





var oneLineCommaListsOr = new TemplateTag_TemplateTag(inlineArrayTransformer_inlineArrayTransformer({ separator: ',', conjunction: 'or' }), replaceResultTransformer_replaceResultTransformer(/(?:\s+)/g, ' '), trimResultTransformer_trimResultTransformer);

/* harmony default export */ const oneLineCommaListsOr_oneLineCommaListsOr = (oneLineCommaListsOr);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vbmVMaW5lQ29tbWFMaXN0c09yL29uZUxpbmVDb21tYUxpc3RzT3IuanMiXSwibmFtZXMiOlsiVGVtcGxhdGVUYWciLCJpbmxpbmVBcnJheVRyYW5zZm9ybWVyIiwidHJpbVJlc3VsdFRyYW5zZm9ybWVyIiwicmVwbGFjZVJlc3VsdFRyYW5zZm9ybWVyIiwib25lTGluZUNvbW1hTGlzdHNPciIsInNlcGFyYXRvciIsImNvbmp1bmN0aW9uIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxXQUFQLE1BQXdCLGdCQUF4QjtBQUNBLE9BQU9DLHNCQUFQLE1BQW1DLDJCQUFuQztBQUNBLE9BQU9DLHFCQUFQLE1BQWtDLDBCQUFsQztBQUNBLE9BQU9DLHdCQUFQLE1BQXFDLDZCQUFyQzs7QUFFQSxJQUFNQyxzQkFBc0IsSUFBSUosV0FBSixDQUMxQkMsdUJBQXVCLEVBQUVJLFdBQVcsR0FBYixFQUFrQkMsYUFBYSxJQUEvQixFQUF2QixDQUQwQixFQUUxQkgseUJBQXlCLFVBQXpCLEVBQXFDLEdBQXJDLENBRjBCLEVBRzFCRCxxQkFIMEIsQ0FBNUI7O0FBTUEsZUFBZUUsbUJBQWYiLCJmaWxlIjoib25lTGluZUNvbW1hTGlzdHNPci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUZW1wbGF0ZVRhZyBmcm9tICcuLi9UZW1wbGF0ZVRhZyc7XG5pbXBvcnQgaW5saW5lQXJyYXlUcmFuc2Zvcm1lciBmcm9tICcuLi9pbmxpbmVBcnJheVRyYW5zZm9ybWVyJztcbmltcG9ydCB0cmltUmVzdWx0VHJhbnNmb3JtZXIgZnJvbSAnLi4vdHJpbVJlc3VsdFRyYW5zZm9ybWVyJztcbmltcG9ydCByZXBsYWNlUmVzdWx0VHJhbnNmb3JtZXIgZnJvbSAnLi4vcmVwbGFjZVJlc3VsdFRyYW5zZm9ybWVyJztcblxuY29uc3Qgb25lTGluZUNvbW1hTGlzdHNPciA9IG5ldyBUZW1wbGF0ZVRhZyhcbiAgaW5saW5lQXJyYXlUcmFuc2Zvcm1lcih7IHNlcGFyYXRvcjogJywnLCBjb25qdW5jdGlvbjogJ29yJyB9KSxcbiAgcmVwbGFjZVJlc3VsdFRyYW5zZm9ybWVyKC8oPzpcXHMrKS9nLCAnICcpLFxuICB0cmltUmVzdWx0VHJhbnNmb3JtZXIsXG4pO1xuXG5leHBvcnQgZGVmYXVsdCBvbmVMaW5lQ29tbWFMaXN0c09yO1xuIl19
;// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLineCommaListsOr/index.js


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vbmVMaW5lQ29tbWFMaXN0c09yL2luZGV4LmpzIl0sIm5hbWVzIjpbImRlZmF1bHQiXSwibWFwcGluZ3MiOiJxQkFBb0IsdUI7cUJBQWJBLE8iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmcm9tICcuL29uZUxpbmVDb21tYUxpc3RzT3InO1xuIl19
;// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLineCommaListsAnd/oneLineCommaListsAnd.js





var oneLineCommaListsAnd = new TemplateTag_TemplateTag(inlineArrayTransformer_inlineArrayTransformer({ separator: ',', conjunction: 'and' }), replaceResultTransformer_replaceResultTransformer(/(?:\s+)/g, ' '), trimResultTransformer_trimResultTransformer);

/* harmony default export */ const oneLineCommaListsAnd_oneLineCommaListsAnd = (oneLineCommaListsAnd);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vbmVMaW5lQ29tbWFMaXN0c0FuZC9vbmVMaW5lQ29tbWFMaXN0c0FuZC5qcyJdLCJuYW1lcyI6WyJUZW1wbGF0ZVRhZyIsImlubGluZUFycmF5VHJhbnNmb3JtZXIiLCJ0cmltUmVzdWx0VHJhbnNmb3JtZXIiLCJyZXBsYWNlUmVzdWx0VHJhbnNmb3JtZXIiLCJvbmVMaW5lQ29tbWFMaXN0c0FuZCIsInNlcGFyYXRvciIsImNvbmp1bmN0aW9uIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxXQUFQLE1BQXdCLGdCQUF4QjtBQUNBLE9BQU9DLHNCQUFQLE1BQW1DLDJCQUFuQztBQUNBLE9BQU9DLHFCQUFQLE1BQWtDLDBCQUFsQztBQUNBLE9BQU9DLHdCQUFQLE1BQXFDLDZCQUFyQzs7QUFFQSxJQUFNQyx1QkFBdUIsSUFBSUosV0FBSixDQUMzQkMsdUJBQXVCLEVBQUVJLFdBQVcsR0FBYixFQUFrQkMsYUFBYSxLQUEvQixFQUF2QixDQUQyQixFQUUzQkgseUJBQXlCLFVBQXpCLEVBQXFDLEdBQXJDLENBRjJCLEVBRzNCRCxxQkFIMkIsQ0FBN0I7O0FBTUEsZUFBZUUsb0JBQWYiLCJmaWxlIjoib25lTGluZUNvbW1hTGlzdHNBbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGVtcGxhdGVUYWcgZnJvbSAnLi4vVGVtcGxhdGVUYWcnO1xuaW1wb3J0IGlubGluZUFycmF5VHJhbnNmb3JtZXIgZnJvbSAnLi4vaW5saW5lQXJyYXlUcmFuc2Zvcm1lcic7XG5pbXBvcnQgdHJpbVJlc3VsdFRyYW5zZm9ybWVyIGZyb20gJy4uL3RyaW1SZXN1bHRUcmFuc2Zvcm1lcic7XG5pbXBvcnQgcmVwbGFjZVJlc3VsdFRyYW5zZm9ybWVyIGZyb20gJy4uL3JlcGxhY2VSZXN1bHRUcmFuc2Zvcm1lcic7XG5cbmNvbnN0IG9uZUxpbmVDb21tYUxpc3RzQW5kID0gbmV3IFRlbXBsYXRlVGFnKFxuICBpbmxpbmVBcnJheVRyYW5zZm9ybWVyKHsgc2VwYXJhdG9yOiAnLCcsIGNvbmp1bmN0aW9uOiAnYW5kJyB9KSxcbiAgcmVwbGFjZVJlc3VsdFRyYW5zZm9ybWVyKC8oPzpcXHMrKS9nLCAnICcpLFxuICB0cmltUmVzdWx0VHJhbnNmb3JtZXIsXG4pO1xuXG5leHBvcnQgZGVmYXVsdCBvbmVMaW5lQ29tbWFMaXN0c0FuZDtcbiJdfQ==
;// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLineCommaListsAnd/index.js


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vbmVMaW5lQ29tbWFMaXN0c0FuZC9pbmRleC5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0Il0sIm1hcHBpbmdzIjoicUJBQW9CLHdCO3FCQUFiQSxPIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnJvbSAnLi9vbmVMaW5lQ29tbWFMaXN0c0FuZCc7XG4iXX0=
;// CONCATENATED MODULE: ./node_modules/common-tags/es/inlineLists/inlineLists.js





var inlineLists = new TemplateTag_TemplateTag(inlineArrayTransformer_inlineArrayTransformer, stripIndentTransformer_stripIndentTransformer, trimResultTransformer_trimResultTransformer);

/* harmony default export */ const inlineLists_inlineLists = (inlineLists);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbmxpbmVMaXN0cy9pbmxpbmVMaXN0cy5qcyJdLCJuYW1lcyI6WyJUZW1wbGF0ZVRhZyIsInN0cmlwSW5kZW50VHJhbnNmb3JtZXIiLCJpbmxpbmVBcnJheVRyYW5zZm9ybWVyIiwidHJpbVJlc3VsdFRyYW5zZm9ybWVyIiwiaW5saW5lTGlzdHMiXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLFdBQVAsTUFBd0IsZ0JBQXhCO0FBQ0EsT0FBT0Msc0JBQVAsTUFBbUMsMkJBQW5DO0FBQ0EsT0FBT0Msc0JBQVAsTUFBbUMsMkJBQW5DO0FBQ0EsT0FBT0MscUJBQVAsTUFBa0MsMEJBQWxDOztBQUVBLElBQU1DLGNBQWMsSUFBSUosV0FBSixDQUNsQkUsc0JBRGtCLEVBRWxCRCxzQkFGa0IsRUFHbEJFLHFCQUhrQixDQUFwQjs7QUFNQSxlQUFlQyxXQUFmIiwiZmlsZSI6ImlubGluZUxpc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRlbXBsYXRlVGFnIGZyb20gJy4uL1RlbXBsYXRlVGFnJztcbmltcG9ydCBzdHJpcEluZGVudFRyYW5zZm9ybWVyIGZyb20gJy4uL3N0cmlwSW5kZW50VHJhbnNmb3JtZXInO1xuaW1wb3J0IGlubGluZUFycmF5VHJhbnNmb3JtZXIgZnJvbSAnLi4vaW5saW5lQXJyYXlUcmFuc2Zvcm1lcic7XG5pbXBvcnQgdHJpbVJlc3VsdFRyYW5zZm9ybWVyIGZyb20gJy4uL3RyaW1SZXN1bHRUcmFuc2Zvcm1lcic7XG5cbmNvbnN0IGlubGluZUxpc3RzID0gbmV3IFRlbXBsYXRlVGFnKFxuICBpbmxpbmVBcnJheVRyYW5zZm9ybWVyLFxuICBzdHJpcEluZGVudFRyYW5zZm9ybWVyLFxuICB0cmltUmVzdWx0VHJhbnNmb3JtZXIsXG4pO1xuXG5leHBvcnQgZGVmYXVsdCBpbmxpbmVMaXN0cztcbiJdfQ==
;// CONCATENATED MODULE: ./node_modules/common-tags/es/inlineLists/index.js


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbmxpbmVMaXN0cy9pbmRleC5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0Il0sIm1hcHBpbmdzIjoicUJBQW9CLGU7cUJBQWJBLE8iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmcm9tICcuL2lubGluZUxpc3RzJztcbiJdfQ==
;// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLineInlineLists/oneLineInlineLists.js





var oneLineInlineLists = new TemplateTag_TemplateTag(inlineArrayTransformer_inlineArrayTransformer, replaceResultTransformer_replaceResultTransformer(/(?:\s+)/g, ' '), trimResultTransformer_trimResultTransformer);

/* harmony default export */ const oneLineInlineLists_oneLineInlineLists = (oneLineInlineLists);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vbmVMaW5lSW5saW5lTGlzdHMvb25lTGluZUlubGluZUxpc3RzLmpzIl0sIm5hbWVzIjpbIlRlbXBsYXRlVGFnIiwiaW5saW5lQXJyYXlUcmFuc2Zvcm1lciIsInRyaW1SZXN1bHRUcmFuc2Zvcm1lciIsInJlcGxhY2VSZXN1bHRUcmFuc2Zvcm1lciIsIm9uZUxpbmVJbmxpbmVMaXN0cyJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBT0EsV0FBUCxNQUF3QixnQkFBeEI7QUFDQSxPQUFPQyxzQkFBUCxNQUFtQywyQkFBbkM7QUFDQSxPQUFPQyxxQkFBUCxNQUFrQywwQkFBbEM7QUFDQSxPQUFPQyx3QkFBUCxNQUFxQyw2QkFBckM7O0FBRUEsSUFBTUMscUJBQXFCLElBQUlKLFdBQUosQ0FDekJDLHNCQUR5QixFQUV6QkUseUJBQXlCLFVBQXpCLEVBQXFDLEdBQXJDLENBRnlCLEVBR3pCRCxxQkFIeUIsQ0FBM0I7O0FBTUEsZUFBZUUsa0JBQWYiLCJmaWxlIjoib25lTGluZUlubGluZUxpc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRlbXBsYXRlVGFnIGZyb20gJy4uL1RlbXBsYXRlVGFnJztcbmltcG9ydCBpbmxpbmVBcnJheVRyYW5zZm9ybWVyIGZyb20gJy4uL2lubGluZUFycmF5VHJhbnNmb3JtZXInO1xuaW1wb3J0IHRyaW1SZXN1bHRUcmFuc2Zvcm1lciBmcm9tICcuLi90cmltUmVzdWx0VHJhbnNmb3JtZXInO1xuaW1wb3J0IHJlcGxhY2VSZXN1bHRUcmFuc2Zvcm1lciBmcm9tICcuLi9yZXBsYWNlUmVzdWx0VHJhbnNmb3JtZXInO1xuXG5jb25zdCBvbmVMaW5lSW5saW5lTGlzdHMgPSBuZXcgVGVtcGxhdGVUYWcoXG4gIGlubGluZUFycmF5VHJhbnNmb3JtZXIsXG4gIHJlcGxhY2VSZXN1bHRUcmFuc2Zvcm1lcigvKD86XFxzKykvZywgJyAnKSxcbiAgdHJpbVJlc3VsdFRyYW5zZm9ybWVyLFxuKTtcblxuZXhwb3J0IGRlZmF1bHQgb25lTGluZUlubGluZUxpc3RzO1xuIl19
;// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLineInlineLists/index.js


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vbmVMaW5lSW5saW5lTGlzdHMvaW5kZXguanMiXSwibmFtZXMiOlsiZGVmYXVsdCJdLCJtYXBwaW5ncyI6InFCQUFvQixzQjtxQkFBYkEsTyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZyb20gJy4vb25lTGluZUlubGluZUxpc3RzJztcbiJdfQ==
;// CONCATENATED MODULE: ./node_modules/common-tags/es/stripIndent/stripIndent.js




var stripIndent = new TemplateTag_TemplateTag(stripIndentTransformer_stripIndentTransformer, trimResultTransformer_trimResultTransformer);

/* harmony default export */ const stripIndent_stripIndent = (stripIndent);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJpcEluZGVudC9zdHJpcEluZGVudC5qcyJdLCJuYW1lcyI6WyJUZW1wbGF0ZVRhZyIsInN0cmlwSW5kZW50VHJhbnNmb3JtZXIiLCJ0cmltUmVzdWx0VHJhbnNmb3JtZXIiLCJzdHJpcEluZGVudCJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBT0EsV0FBUCxNQUF3QixnQkFBeEI7QUFDQSxPQUFPQyxzQkFBUCxNQUFtQywyQkFBbkM7QUFDQSxPQUFPQyxxQkFBUCxNQUFrQywwQkFBbEM7O0FBRUEsSUFBTUMsY0FBYyxJQUFJSCxXQUFKLENBQ2xCQyxzQkFEa0IsRUFFbEJDLHFCQUZrQixDQUFwQjs7QUFLQSxlQUFlQyxXQUFmIiwiZmlsZSI6InN0cmlwSW5kZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRlbXBsYXRlVGFnIGZyb20gJy4uL1RlbXBsYXRlVGFnJztcbmltcG9ydCBzdHJpcEluZGVudFRyYW5zZm9ybWVyIGZyb20gJy4uL3N0cmlwSW5kZW50VHJhbnNmb3JtZXInO1xuaW1wb3J0IHRyaW1SZXN1bHRUcmFuc2Zvcm1lciBmcm9tICcuLi90cmltUmVzdWx0VHJhbnNmb3JtZXInO1xuXG5jb25zdCBzdHJpcEluZGVudCA9IG5ldyBUZW1wbGF0ZVRhZyhcbiAgc3RyaXBJbmRlbnRUcmFuc2Zvcm1lcixcbiAgdHJpbVJlc3VsdFRyYW5zZm9ybWVyLFxuKTtcblxuZXhwb3J0IGRlZmF1bHQgc3RyaXBJbmRlbnQ7XG4iXX0=
;// CONCATENATED MODULE: ./node_modules/common-tags/es/stripIndent/index.js


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJpcEluZGVudC9pbmRleC5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0Il0sIm1hcHBpbmdzIjoicUJBQW9CLGU7cUJBQWJBLE8iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmcm9tICcuL3N0cmlwSW5kZW50JztcbiJdfQ==
;// CONCATENATED MODULE: ./node_modules/common-tags/es/stripIndents/stripIndents.js




var stripIndents = new TemplateTag_TemplateTag(stripIndentTransformer_stripIndentTransformer('all'), trimResultTransformer_trimResultTransformer);

/* harmony default export */ const stripIndents_stripIndents = (stripIndents);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJpcEluZGVudHMvc3RyaXBJbmRlbnRzLmpzIl0sIm5hbWVzIjpbIlRlbXBsYXRlVGFnIiwic3RyaXBJbmRlbnRUcmFuc2Zvcm1lciIsInRyaW1SZXN1bHRUcmFuc2Zvcm1lciIsInN0cmlwSW5kZW50cyJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBT0EsV0FBUCxNQUF3QixnQkFBeEI7QUFDQSxPQUFPQyxzQkFBUCxNQUFtQywyQkFBbkM7QUFDQSxPQUFPQyxxQkFBUCxNQUFrQywwQkFBbEM7O0FBRUEsSUFBTUMsZUFBZSxJQUFJSCxXQUFKLENBQ25CQyx1QkFBdUIsS0FBdkIsQ0FEbUIsRUFFbkJDLHFCQUZtQixDQUFyQjs7QUFLQSxlQUFlQyxZQUFmIiwiZmlsZSI6InN0cmlwSW5kZW50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUZW1wbGF0ZVRhZyBmcm9tICcuLi9UZW1wbGF0ZVRhZyc7XG5pbXBvcnQgc3RyaXBJbmRlbnRUcmFuc2Zvcm1lciBmcm9tICcuLi9zdHJpcEluZGVudFRyYW5zZm9ybWVyJztcbmltcG9ydCB0cmltUmVzdWx0VHJhbnNmb3JtZXIgZnJvbSAnLi4vdHJpbVJlc3VsdFRyYW5zZm9ybWVyJztcblxuY29uc3Qgc3RyaXBJbmRlbnRzID0gbmV3IFRlbXBsYXRlVGFnKFxuICBzdHJpcEluZGVudFRyYW5zZm9ybWVyKCdhbGwnKSxcbiAgdHJpbVJlc3VsdFRyYW5zZm9ybWVyLFxuKTtcblxuZXhwb3J0IGRlZmF1bHQgc3RyaXBJbmRlbnRzO1xuIl19
;// CONCATENATED MODULE: ./node_modules/common-tags/es/stripIndents/index.js


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJpcEluZGVudHMvaW5kZXguanMiXSwibmFtZXMiOlsiZGVmYXVsdCJdLCJtYXBwaW5ncyI6InFCQUFvQixnQjtxQkFBYkEsTyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZyb20gJy4vc3RyaXBJbmRlbnRzJztcbiJdfQ==
;// CONCATENATED MODULE: ./node_modules/common-tags/es/index.js
// core



// transformers


















// tags

































//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJUZW1wbGF0ZVRhZyIsInRyaW1SZXN1bHRUcmFuc2Zvcm1lciIsInN0cmlwSW5kZW50VHJhbnNmb3JtZXIiLCJyZXBsYWNlUmVzdWx0VHJhbnNmb3JtZXIiLCJyZXBsYWNlU3Vic3RpdHV0aW9uVHJhbnNmb3JtZXIiLCJyZXBsYWNlU3RyaW5nVHJhbnNmb3JtZXIiLCJpbmxpbmVBcnJheVRyYW5zZm9ybWVyIiwic3BsaXRTdHJpbmdUcmFuc2Zvcm1lciIsInJlbW92ZU5vblByaW50aW5nVmFsdWVzVHJhbnNmb3JtZXIiLCJjb21tYUxpc3RzIiwiY29tbWFMaXN0c0FuZCIsImNvbW1hTGlzdHNPciIsImh0bWwiLCJjb2RlQmxvY2siLCJzb3VyY2UiLCJzYWZlSHRtbCIsIm9uZUxpbmUiLCJvbmVMaW5lVHJpbSIsIm9uZUxpbmVDb21tYUxpc3RzIiwib25lTGluZUNvbW1hTGlzdHNPciIsIm9uZUxpbmVDb21tYUxpc3RzQW5kIiwiaW5saW5lTGlzdHMiLCJvbmVMaW5lSW5saW5lTGlzdHMiLCJzdHJpcEluZGVudCIsInN0cmlwSW5kZW50cyJdLCJtYXBwaW5ncyI6IkFBQUE7eUJBQ3dCLGU7eUJBQWpCQSxXOztBQUVQOzttQ0FDa0MseUI7bUNBQTNCQyxxQjtvQ0FDNEIsMEI7b0NBQTVCQyxzQjtzQ0FDOEIsNEI7c0NBQTlCQyx3Qjs0Q0FDb0Msa0M7NENBQXBDQyw4QjtzQ0FDOEIsNEI7c0NBQTlCQyx3QjtvQ0FDNEIsMEI7b0NBQTVCQyxzQjtvQ0FDNEIsMEI7b0NBQTVCQyxzQjtnREFDd0Msc0M7Z0RBQXhDQyxrQzs7QUFFUDs7d0JBQ3VCLGM7d0JBQWhCQyxVOzJCQUNtQixpQjsyQkFBbkJDLGE7MEJBQ2tCLGdCOzBCQUFsQkMsWTtrQkFDVSxRO2tCQUFWQyxJO3VCQUNlLGE7dUJBQWZDLFM7b0JBQ1ksVTtvQkFBWkMsTTtzQkFDYyxZO3NCQUFkQyxRO3FCQUNhLFc7cUJBQWJDLE87eUJBQ2lCLGU7eUJBQWpCQyxXOytCQUN1QixxQjsrQkFBdkJDLGlCO2lDQUN5Qix1QjtpQ0FBekJDLG1CO2tDQUMwQix3QjtrQ0FBMUJDLG9CO3lCQUNpQixlO3lCQUFqQkMsVztnQ0FDd0Isc0I7Z0NBQXhCQyxrQjt5QkFDaUIsZTt5QkFBakJDLFc7MEJBQ2tCLGdCOzBCQUFsQkMsWSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGNvcmVcbmV4cG9ydCBUZW1wbGF0ZVRhZyBmcm9tICcuL1RlbXBsYXRlVGFnJztcblxuLy8gdHJhbnNmb3JtZXJzXG5leHBvcnQgdHJpbVJlc3VsdFRyYW5zZm9ybWVyIGZyb20gJy4vdHJpbVJlc3VsdFRyYW5zZm9ybWVyJztcbmV4cG9ydCBzdHJpcEluZGVudFRyYW5zZm9ybWVyIGZyb20gJy4vc3RyaXBJbmRlbnRUcmFuc2Zvcm1lcic7XG5leHBvcnQgcmVwbGFjZVJlc3VsdFRyYW5zZm9ybWVyIGZyb20gJy4vcmVwbGFjZVJlc3VsdFRyYW5zZm9ybWVyJztcbmV4cG9ydCByZXBsYWNlU3Vic3RpdHV0aW9uVHJhbnNmb3JtZXIgZnJvbSAnLi9yZXBsYWNlU3Vic3RpdHV0aW9uVHJhbnNmb3JtZXInO1xuZXhwb3J0IHJlcGxhY2VTdHJpbmdUcmFuc2Zvcm1lciBmcm9tICcuL3JlcGxhY2VTdHJpbmdUcmFuc2Zvcm1lcic7XG5leHBvcnQgaW5saW5lQXJyYXlUcmFuc2Zvcm1lciBmcm9tICcuL2lubGluZUFycmF5VHJhbnNmb3JtZXInO1xuZXhwb3J0IHNwbGl0U3RyaW5nVHJhbnNmb3JtZXIgZnJvbSAnLi9zcGxpdFN0cmluZ1RyYW5zZm9ybWVyJztcbmV4cG9ydCByZW1vdmVOb25QcmludGluZ1ZhbHVlc1RyYW5zZm9ybWVyIGZyb20gJy4vcmVtb3ZlTm9uUHJpbnRpbmdWYWx1ZXNUcmFuc2Zvcm1lcic7XG5cbi8vIHRhZ3NcbmV4cG9ydCBjb21tYUxpc3RzIGZyb20gJy4vY29tbWFMaXN0cyc7XG5leHBvcnQgY29tbWFMaXN0c0FuZCBmcm9tICcuL2NvbW1hTGlzdHNBbmQnO1xuZXhwb3J0IGNvbW1hTGlzdHNPciBmcm9tICcuL2NvbW1hTGlzdHNPcic7XG5leHBvcnQgaHRtbCBmcm9tICcuL2h0bWwnO1xuZXhwb3J0IGNvZGVCbG9jayBmcm9tICcuL2NvZGVCbG9jayc7XG5leHBvcnQgc291cmNlIGZyb20gJy4vc291cmNlJztcbmV4cG9ydCBzYWZlSHRtbCBmcm9tICcuL3NhZmVIdG1sJztcbmV4cG9ydCBvbmVMaW5lIGZyb20gJy4vb25lTGluZSc7XG5leHBvcnQgb25lTGluZVRyaW0gZnJvbSAnLi9vbmVMaW5lVHJpbSc7XG5leHBvcnQgb25lTGluZUNvbW1hTGlzdHMgZnJvbSAnLi9vbmVMaW5lQ29tbWFMaXN0cyc7XG5leHBvcnQgb25lTGluZUNvbW1hTGlzdHNPciBmcm9tICcuL29uZUxpbmVDb21tYUxpc3RzT3InO1xuZXhwb3J0IG9uZUxpbmVDb21tYUxpc3RzQW5kIGZyb20gJy4vb25lTGluZUNvbW1hTGlzdHNBbmQnO1xuZXhwb3J0IGlubGluZUxpc3RzIGZyb20gJy4vaW5saW5lTGlzdHMnO1xuZXhwb3J0IG9uZUxpbmVJbmxpbmVMaXN0cyBmcm9tICcuL29uZUxpbmVJbmxpbmVMaXN0cyc7XG5leHBvcnQgc3RyaXBJbmRlbnQgZnJvbSAnLi9zdHJpcEluZGVudCc7XG5leHBvcnQgc3RyaXBJbmRlbnRzIGZyb20gJy4vc3RyaXBJbmRlbnRzJztcbiJdfQ==

/***/ }),

/***/ 1227:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
/**
 * Colors.
 */

exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */
// eslint-disable-next-line complexity

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
    return true;
  } // Internet Explorer and Edge do not support colors.


  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  } // Is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */


function formatArgs(args) {
  args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

  if (!this.useColors) {
    return;
  }

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into

  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function (match) {
    if (match === '%%') {
      return;
    }

    index++;

    if (match === '%c') {
      // We only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });
  args.splice(lastC, 0, c);
}
/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */


function log() {
  var _console;

  // This hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return (typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object' && console.log && (_console = console).log.apply(_console, arguments);
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */


function save(namespaces) {
  try {
    if (namespaces) {
      exports.storage.setItem('debug', namespaces);
    } else {
      exports.storage.removeItem('debug');
    }
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */


function load() {
  var r;

  try {
    r = exports.storage.getItem('debug');
  } catch (error) {} // Swallow
  // XXX (@Qix-) should we be logging these?
  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = ({}).DEBUG;
  }

  return r;
}
/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */


function localstorage() {
  try {
    // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
    // The Browser also has localStorage in the global context.
    return localStorage;
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}

module.exports = __webpack_require__(2447)(exports);
var formatters = module.exports.formatters;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (error) {
    return '[UnexpectedJSONParseError]: ' + error.message;
  }
};



/***/ }),

/***/ 2447:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */
function setup(env) {
  createDebug.debug = createDebug;
  createDebug.default = createDebug;
  createDebug.coerce = coerce;
  createDebug.disable = disable;
  createDebug.enable = enable;
  createDebug.enabled = enabled;
  createDebug.humanize = __webpack_require__(7824);
  Object.keys(env).forEach(function (key) {
    createDebug[key] = env[key];
  });
  /**
  * Active `debug` instances.
  */

  createDebug.instances = [];
  /**
  * The currently active debug mode names, and names to skip.
  */

  createDebug.names = [];
  createDebug.skips = [];
  /**
  * Map of special "%n" handling functions, for the debug "format" argument.
  *
  * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
  */

  createDebug.formatters = {};
  /**
  * Selects a color for a debug namespace
  * @param {String} namespace The namespace string for the for the debug instance to be colored
  * @return {Number|String} An ANSI color code for the given namespace
  * @api private
  */

  function selectColor(namespace) {
    var hash = 0;

    for (var i = 0; i < namespace.length; i++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  }

  createDebug.selectColor = selectColor;
  /**
  * Create a debugger with the given `namespace`.
  *
  * @param {String} namespace
  * @return {Function}
  * @api public
  */

  function createDebug(namespace) {
    var prevTime;

    function debug() {
      // Disabled?
      if (!debug.enabled) {
        return;
      }

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var self = debug; // Set `diff` timestamp

      var curr = Number(new Date());
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;
      args[0] = createDebug.coerce(args[0]);

      if (typeof args[0] !== 'string') {
        // Anything else let's inspect with %O
        args.unshift('%O');
      } // Apply any `formatters` transformations


      var index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
        // If we encounter an escaped % then don't increase the array index
        if (match === '%%') {
          return match;
        }

        index++;
        var formatter = createDebug.formatters[format];

        if (typeof formatter === 'function') {
          var val = args[index];
          match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

          args.splice(index, 1);
          index--;
        }

        return match;
      }); // Apply env-specific formatting (colors, etc.)

      createDebug.formatArgs.call(self, args);
      var logFn = self.log || createDebug.log;
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.enabled = createDebug.enabled(namespace);
    debug.useColors = createDebug.useColors();
    debug.color = selectColor(namespace);
    debug.destroy = destroy;
    debug.extend = extend; // Debug.formatArgs = formatArgs;
    // debug.rawLog = rawLog;
    // env-specific initialization logic for debug instances

    if (typeof createDebug.init === 'function') {
      createDebug.init(debug);
    }

    createDebug.instances.push(debug);
    return debug;
  }

  function destroy() {
    var index = createDebug.instances.indexOf(this);

    if (index !== -1) {
      createDebug.instances.splice(index, 1);
      return true;
    }

    return false;
  }

  function extend(namespace, delimiter) {
    return createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
  }
  /**
  * Enables a debug mode by namespaces. This can include modes
  * separated by a colon and wildcards.
  *
  * @param {String} namespaces
  * @api public
  */


  function enable(namespaces) {
    createDebug.save(namespaces);
    createDebug.names = [];
    createDebug.skips = [];
    var i;
    var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    var len = split.length;

    for (i = 0; i < len; i++) {
      if (!split[i]) {
        // ignore empty strings
        continue;
      }

      namespaces = split[i].replace(/\*/g, '.*?');

      if (namespaces[0] === '-') {
        createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        createDebug.names.push(new RegExp('^' + namespaces + '$'));
      }
    }

    for (i = 0; i < createDebug.instances.length; i++) {
      var instance = createDebug.instances[i];
      instance.enabled = createDebug.enabled(instance.namespace);
    }
  }
  /**
  * Disable debug output.
  *
  * @api public
  */


  function disable() {
    createDebug.enable('');
  }
  /**
  * Returns true if the given mode name is enabled, false otherwise.
  *
  * @param {String} name
  * @return {Boolean}
  * @api public
  */


  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true;
    }

    var i;
    var len;

    for (i = 0, len = createDebug.skips.length; i < len; i++) {
      if (createDebug.skips[i].test(name)) {
        return false;
      }
    }

    for (i = 0, len = createDebug.names.length; i < len; i++) {
      if (createDebug.names[i].test(name)) {
        return true;
      }
    }

    return false;
  }
  /**
  * Coerce `val`.
  *
  * @param {Mixed} val
  * @return {Mixed}
  * @api private
  */


  function coerce(val) {
    if (val instanceof Error) {
      return val.stack || val.message;
    }

    return val;
  }

  createDebug.enable(createDebug.load());
  return createDebug;
}

module.exports = setup;



/***/ }),

/***/ 5158:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */
if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
  module.exports = __webpack_require__(1227);
} else {
  module.exports = __webpack_require__(39);
}



/***/ }),

/***/ 39:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


/**
 * Module dependencies.
 */
var tty = __webpack_require__(4786);

var util = __webpack_require__(6464);
/**
 * This is the Node.js implementation of `debug()`.
 */


exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
  // Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
  // eslint-disable-next-line import/no-extraneous-dependencies
  var supportsColor = __webpack_require__(2130);

  if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
    exports.colors = [20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221];
  }
} catch (error) {} // Swallow - we only care if `supports-color` is available; it doesn't have to be.

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */


exports.inspectOpts = Object.keys(({})).filter(function (key) {
  return /^debug_/i.test(key);
}).reduce(function (obj, key) {
  // Camel-case
  var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function (_, k) {
    return k.toUpperCase();
  }); // Coerce string value into JS value

  var val = ({})[key];

  if (/^(yes|on|true|enabled)$/i.test(val)) {
    val = true;
  } else if (/^(no|off|false|disabled)$/i.test(val)) {
    val = false;
  } else if (val === 'null') {
    val = null;
  } else {
    val = Number(val);
  }

  obj[prop] = val;
  return obj;
}, {});
/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
}
/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */


function formatArgs(args) {
  var name = this.namespace,
      useColors = this.useColors;

  if (useColors) {
    var c = this.color;
    var colorCode = "\x1B[3" + (c < 8 ? c : '8;5;' + c);
    var prefix = "  ".concat(colorCode, ";1m").concat(name, " \x1B[0m");
    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + "\x1B[0m");
  } else {
    args[0] = getDate() + name + ' ' + args[0];
  }
}

function getDate() {
  if (exports.inspectOpts.hideDate) {
    return '';
  }

  return new Date().toISOString() + ' ';
}
/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */


function log() {
  return process.stderr.write(util.format.apply(util, arguments) + '\n');
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */


function save(namespaces) {
  if (namespaces) {
    ({}).DEBUG = namespaces;
  } else {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete ({}).DEBUG;
  }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */


function load() {
  return ({}).DEBUG;
}
/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */


function init(debug) {
  debug.inspectOpts = {};
  var keys = Object.keys(exports.inspectOpts);

  for (var i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }
}

module.exports = __webpack_require__(2447)(exports);
var formatters = module.exports.formatters;
/**
 * Map %o to `util.inspect()`, all on a single line.
 */

formatters.o = function (v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts)
    .split('\n')
    .map(function (str) { return str.trim(); })
    .join(' ');
};
/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */


formatters.O = function (v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};



/***/ }),

/***/ 9996:
/***/ ((module) => {

"use strict";


var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value, options) {
	return (options.clone !== false && options.isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, options)
		: value
}

function defaultArrayMerge(target, source, options) {
	return target.concat(source).map(function(element) {
		return cloneUnlessOtherwiseSpecified(element, options)
	})
}

function getMergeFunction(key, options) {
	if (!options.customMerge) {
		return deepmerge
	}
	var customMerge = options.customMerge(key);
	return typeof customMerge === 'function' ? customMerge : deepmerge
}

function getEnumerableOwnPropertySymbols(target) {
	return Object.getOwnPropertySymbols
		? Object.getOwnPropertySymbols(target).filter(function(symbol) {
			return target.propertyIsEnumerable(symbol)
		})
		: []
}

function getKeys(target) {
	return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
}

function propertyIsOnObject(object, property) {
	try {
		return property in object
	} catch(_) {
		return false
	}
}

// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target, key) {
	return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
		&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
			&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
}

function mergeObject(target, source, options) {
	var destination = {};
	if (options.isMergeableObject(target)) {
		getKeys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
		});
	}
	getKeys(source).forEach(function(key) {
		if (propertyIsUnsafe(target, key)) {
			return
		}

		if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
			destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
		} else {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
		}
	});
	return destination
}

function deepmerge(target, source, options) {
	options = options || {};
	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
	options.isMergeableObject = options.isMergeableObject || isMergeableObject;
	// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
	// implementations can use it. The caller may not replace it.
	options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;

	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, options)
	} else if (sourceIsArray) {
		return options.arrayMerge(target, source, options)
	} else {
		return mergeObject(target, source, options)
	}
}

deepmerge.all = function deepmergeAll(array, options) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev, next) {
		return deepmerge(prev, next, options)
	}, {})
};

var deepmerge_1 = deepmerge;

module.exports = deepmerge_1;


/***/ }),

/***/ 2261:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var debug;

module.exports = function () {
  if (!debug) {
    try {
      /* eslint global-require: off */
      debug = __webpack_require__(5158)("follow-redirects");
    }
    catch (error) { /* */ }
    if (typeof debug !== "function") {
      debug = function () { /* */ };
    }
  }
  debug.apply(null, arguments);
};


/***/ }),

/***/ 938:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var url = __webpack_require__(4269);
var URL = url.URL;
var http = __webpack_require__(2503);
var https = __webpack_require__(7959);
var Writable = __webpack_require__(8311).Writable;
var assert = __webpack_require__(9084);
var debug = __webpack_require__(2261);

// Create handlers that pass events from native requests
var events = ["abort", "aborted", "connect", "error", "socket", "timeout"];
var eventHandlers = Object.create(null);
events.forEach(function (event) {
  eventHandlers[event] = function (arg1, arg2, arg3) {
    this._redirectable.emit(event, arg1, arg2, arg3);
  };
});

// Error types with codes
var RedirectionError = createErrorType(
  "ERR_FR_REDIRECTION_FAILURE",
  ""
);
var TooManyRedirectsError = createErrorType(
  "ERR_FR_TOO_MANY_REDIRECTS",
  "Maximum number of redirects exceeded"
);
var MaxBodyLengthExceededError = createErrorType(
  "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
  "Request body larger than maxBodyLength limit"
);
var WriteAfterEndError = createErrorType(
  "ERR_STREAM_WRITE_AFTER_END",
  "write after end"
);

// An HTTP(S) request that can be redirected
function RedirectableRequest(options, responseCallback) {
  // Initialize the request
  Writable.call(this);
  this._sanitizeOptions(options);
  this._options = options;
  this._ended = false;
  this._ending = false;
  this._redirectCount = 0;
  this._redirects = [];
  this._requestBodyLength = 0;
  this._requestBodyBuffers = [];

  // Attach a callback if passed
  if (responseCallback) {
    this.on("response", responseCallback);
  }

  // React to responses of native requests
  var self = this;
  this._onNativeResponse = function (response) {
    self._processResponse(response);
  };

  // Perform the first request
  this._performRequest();
}
RedirectableRequest.prototype = Object.create(Writable.prototype);

RedirectableRequest.prototype.abort = function () {
  abortRequest(this._currentRequest);
  this.emit("abort");
};

// Writes buffered data to the current native request
RedirectableRequest.prototype.write = function (data, encoding, callback) {
  // Writing is not allowed if end has been called
  if (this._ending) {
    throw new WriteAfterEndError();
  }

  // Validate input and shift parameters if necessary
  if (!(typeof data === "string" || typeof data === "object" && ("length" in data))) {
    throw new TypeError("data should be a string, Buffer or Uint8Array");
  }
  if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Ignore empty buffers, since writing them doesn't invoke the callback
  // https://github.com/nodejs/node/issues/22066
  if (data.length === 0) {
    if (callback) {
      callback();
    }
    return;
  }
  // Only write when we don't exceed the maximum body length
  if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
    this._requestBodyLength += data.length;
    this._requestBodyBuffers.push({ data: data, encoding: encoding });
    this._currentRequest.write(data, encoding, callback);
  }
  // Error when we exceed the maximum body length
  else {
    this.emit("error", new MaxBodyLengthExceededError());
    this.abort();
  }
};

// Ends the current native request
RedirectableRequest.prototype.end = function (data, encoding, callback) {
  // Shift parameters if necessary
  if (typeof data === "function") {
    callback = data;
    data = encoding = null;
  }
  else if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Write data if needed and end
  if (!data) {
    this._ended = this._ending = true;
    this._currentRequest.end(null, null, callback);
  }
  else {
    var self = this;
    var currentRequest = this._currentRequest;
    this.write(data, encoding, function () {
      self._ended = true;
      currentRequest.end(null, null, callback);
    });
    this._ending = true;
  }
};

// Sets a header value on the current native request
RedirectableRequest.prototype.setHeader = function (name, value) {
  this._options.headers[name] = value;
  this._currentRequest.setHeader(name, value);
};

// Clears a header value on the current native request
RedirectableRequest.prototype.removeHeader = function (name) {
  delete this._options.headers[name];
  this._currentRequest.removeHeader(name);
};

// Global timeout for all underlying requests
RedirectableRequest.prototype.setTimeout = function (msecs, callback) {
  var self = this;

  // Destroys the socket on timeout
  function destroyOnTimeout(socket) {
    socket.setTimeout(msecs);
    socket.removeListener("timeout", socket.destroy);
    socket.addListener("timeout", socket.destroy);
  }

  // Sets up a timer to trigger a timeout event
  function startTimer(socket) {
    if (self._timeout) {
      clearTimeout(self._timeout);
    }
    self._timeout = setTimeout(function () {
      self.emit("timeout");
      clearTimer();
    }, msecs);
    destroyOnTimeout(socket);
  }

  // Stops a timeout from triggering
  function clearTimer() {
    if (self._timeout) {
      clearTimeout(self._timeout);
      self._timeout = null;
    }
    if (callback) {
      self.removeListener("timeout", callback);
    }
    if (!self.socket) {
      self._currentRequest.removeListener("socket", startTimer);
    }
  }

  // Attach callback if passed
  if (callback) {
    this.on("timeout", callback);
  }

  // Start the timer if or when the socket is opened
  if (this.socket) {
    startTimer(this.socket);
  }
  else {
    this._currentRequest.once("socket", startTimer);
  }

  // Clean up on events
  this.on("socket", destroyOnTimeout);
  this.once("response", clearTimer);
  this.once("error", clearTimer);

  return this;
};

// Proxy all other public ClientRequest methods
[
  "flushHeaders", "getHeader",
  "setNoDelay", "setSocketKeepAlive",
].forEach(function (method) {
  RedirectableRequest.prototype[method] = function (a, b) {
    return this._currentRequest[method](a, b);
  };
});

// Proxy all public ClientRequest properties
["aborted", "connection", "socket"].forEach(function (property) {
  Object.defineProperty(RedirectableRequest.prototype, property, {
    get: function () { return this._currentRequest[property]; },
  });
});

RedirectableRequest.prototype._sanitizeOptions = function (options) {
  // Ensure headers are always present
  if (!options.headers) {
    options.headers = {};
  }

  // Since http.request treats host as an alias of hostname,
  // but the url module interprets host as hostname plus port,
  // eliminate the host property to avoid confusion.
  if (options.host) {
    // Use hostname if set, because it has precedence
    if (!options.hostname) {
      options.hostname = options.host;
    }
    delete options.host;
  }

  // Complete the URL object when necessary
  if (!options.pathname && options.path) {
    var searchPos = options.path.indexOf("?");
    if (searchPos < 0) {
      options.pathname = options.path;
    }
    else {
      options.pathname = options.path.substring(0, searchPos);
      options.search = options.path.substring(searchPos);
    }
  }
};


// Executes the next native request (initial or redirect)
RedirectableRequest.prototype._performRequest = function () {
  // Load the native protocol
  var protocol = this._options.protocol;
  var nativeProtocol = this._options.nativeProtocols[protocol];
  if (!nativeProtocol) {
    this.emit("error", new TypeError("Unsupported protocol " + protocol));
    return;
  }

  // If specified, use the agent corresponding to the protocol
  // (HTTP and HTTPS use different types of agents)
  if (this._options.agents) {
    var scheme = protocol.substr(0, protocol.length - 1);
    this._options.agent = this._options.agents[scheme];
  }

  // Create the native request
  var request = this._currentRequest =
        nativeProtocol.request(this._options, this._onNativeResponse);
  this._currentUrl = url.format(this._options);

  // Set up event handlers
  request._redirectable = this;
  for (var e = 0; e < events.length; e++) {
    request.on(events[e], eventHandlers[events[e]]);
  }

  // End a redirected request
  // (The first request must be ended explicitly with RedirectableRequest#end)
  if (this._isRedirect) {
    // Write the request entity and end.
    var i = 0;
    var self = this;
    var buffers = this._requestBodyBuffers;
    (function writeNext(error) {
      // Only write if this request has not been redirected yet
      /* istanbul ignore else */
      if (request === self._currentRequest) {
        // Report any write errors
        /* istanbul ignore if */
        if (error) {
          self.emit("error", error);
        }
        // Write the next buffer if there are still left
        else if (i < buffers.length) {
          var buffer = buffers[i++];
          /* istanbul ignore else */
          if (!request.finished) {
            request.write(buffer.data, buffer.encoding, writeNext);
          }
        }
        // End the request if `end` has been called on us
        else if (self._ended) {
          request.end();
        }
      }
    }());
  }
};

// Processes a response from the current native request
RedirectableRequest.prototype._processResponse = function (response) {
  // Store the redirected response
  var statusCode = response.statusCode;
  if (this._options.trackRedirects) {
    this._redirects.push({
      url: this._currentUrl,
      headers: response.headers,
      statusCode: statusCode,
    });
  }

  // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
  // that further action needs to be taken by the user agent in order to
  // fulfill the request. If a Location header field is provided,
  // the user agent MAY automatically redirect its request to the URI
  // referenced by the Location field value,
  // even if the specific status code is not understood.
  var location = response.headers.location;
  if (location && this._options.followRedirects !== false &&
      statusCode >= 300 && statusCode < 400) {
    // Abort the current request
    abortRequest(this._currentRequest);
    // Discard the remainder of the response to avoid waiting for data
    response.destroy();

    // RFC7231§6.4: A client SHOULD detect and intervene
    // in cyclical redirections (i.e., "infinite" redirection loops).
    if (++this._redirectCount > this._options.maxRedirects) {
      this.emit("error", new TooManyRedirectsError());
      return;
    }

    // RFC7231§6.4: Automatic redirection needs to done with
    // care for methods not known to be safe, […]
    // RFC7231§6.4.2–3: For historical reasons, a user agent MAY change
    // the request method from POST to GET for the subsequent request.
    if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" ||
        // RFC7231§6.4.4: The 303 (See Other) status code indicates that
        // the server is redirecting the user agent to a different resource […]
        // A user agent can perform a retrieval request targeting that URI
        // (a GET or HEAD request if using HTTP) […]
        (statusCode === 303) && !/^(?:GET|HEAD)$/.test(this._options.method)) {
      this._options.method = "GET";
      // Drop a possible entity and headers related to it
      this._requestBodyBuffers = [];
      removeMatchingHeaders(/^content-/i, this._options.headers);
    }

    // Drop the Host header, as the redirect might lead to a different host
    var previousHostName = removeMatchingHeaders(/^host$/i, this._options.headers) ||
      url.parse(this._currentUrl).hostname;

    // Create the redirected request
    var redirectUrl = url.resolve(this._currentUrl, location);
    debug("redirecting to", redirectUrl);
    this._isRedirect = true;
    var redirectUrlParts = url.parse(redirectUrl);
    Object.assign(this._options, redirectUrlParts);

    // Drop the Authorization header if redirecting to another host
    if (redirectUrlParts.hostname !== previousHostName) {
      removeMatchingHeaders(/^authorization$/i, this._options.headers);
    }

    // Evaluate the beforeRedirect callback
    if (typeof this._options.beforeRedirect === "function") {
      var responseDetails = { headers: response.headers };
      try {
        this._options.beforeRedirect.call(null, this._options, responseDetails);
      }
      catch (err) {
        this.emit("error", err);
        return;
      }
      this._sanitizeOptions(this._options);
    }

    // Perform the redirected request
    try {
      this._performRequest();
    }
    catch (cause) {
      var error = new RedirectionError("Redirected request failed: " + cause.message);
      error.cause = cause;
      this.emit("error", error);
    }
  }
  else {
    // The response is not a redirect; return it as-is
    response.responseUrl = this._currentUrl;
    response.redirects = this._redirects;
    this.emit("response", response);

    // Clean up
    this._requestBodyBuffers = [];
  }
};

// Wraps the key/value object of protocols with redirect functionality
function wrap(protocols) {
  // Default settings
  var exports = {
    maxRedirects: 21,
    maxBodyLength: 10 * 1024 * 1024,
  };

  // Wrap each protocol
  var nativeProtocols = {};
  Object.keys(protocols).forEach(function (scheme) {
    var protocol = scheme + ":";
    var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
    var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);

    // Executes a request, following redirects
    function request(input, options, callback) {
      // Parse parameters
      if (typeof input === "string") {
        var urlStr = input;
        try {
          input = urlToOptions(new URL(urlStr));
        }
        catch (err) {
          /* istanbul ignore next */
          input = url.parse(urlStr);
        }
      }
      else if (URL && (input instanceof URL)) {
        input = urlToOptions(input);
      }
      else {
        callback = options;
        options = input;
        input = { protocol: protocol };
      }
      if (typeof options === "function") {
        callback = options;
        options = null;
      }

      // Set defaults
      options = Object.assign({
        maxRedirects: exports.maxRedirects,
        maxBodyLength: exports.maxBodyLength,
      }, input, options);
      options.nativeProtocols = nativeProtocols;

      assert.equal(options.protocol, protocol, "protocol mismatch");
      debug("options", options);
      return new RedirectableRequest(options, callback);
    }

    // Executes a GET request, following redirects
    function get(input, options, callback) {
      var wrappedRequest = wrappedProtocol.request(input, options, callback);
      wrappedRequest.end();
      return wrappedRequest;
    }

    // Expose the properties on the wrapped protocol
    Object.defineProperties(wrappedProtocol, {
      request: { value: request, configurable: true, enumerable: true, writable: true },
      get: { value: get, configurable: true, enumerable: true, writable: true },
    });
  });
  return exports;
}

/* istanbul ignore next */
function noop() { /* empty */ }

// from https://github.com/nodejs/node/blob/master/lib/internal/url.js
function urlToOptions(urlObject) {
  var options = {
    protocol: urlObject.protocol,
    hostname: urlObject.hostname.startsWith("[") ?
      /* istanbul ignore next */
      urlObject.hostname.slice(1, -1) :
      urlObject.hostname,
    hash: urlObject.hash,
    search: urlObject.search,
    pathname: urlObject.pathname,
    path: urlObject.pathname + urlObject.search,
    href: urlObject.href,
  };
  if (urlObject.port !== "") {
    options.port = Number(urlObject.port);
  }
  return options;
}

function removeMatchingHeaders(regex, headers) {
  var lastValue;
  for (var header in headers) {
    if (regex.test(header)) {
      lastValue = headers[header];
      delete headers[header];
    }
  }
  return lastValue;
}

function createErrorType(code, defaultMessage) {
  function CustomError(message) {
    Error.captureStackTrace(this, this.constructor);
    this.message = message || defaultMessage;
  }
  CustomError.prototype = new Error();
  CustomError.prototype.constructor = CustomError;
  CustomError.prototype.name = "Error [" + code + "]";
  CustomError.prototype.code = code;
  return CustomError;
}

function abortRequest(request) {
  for (var e = 0; e < events.length; e++) {
    request.removeListener(events[e], eventHandlers[events[e]]);
  }
  request.on("error", noop);
  request.abort();
}

// Exports
module.exports = wrap({ http: http, https: https });
module.exports.wrap = wrap;


/***/ }),

/***/ 8037:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;


var _interopRequireDefault = __webpack_require__(5318);

__webpack_unused_export__ = true;
exports.dq = withPrefix;
exports.mc = withAssetPrefix;
exports.c4 = exports.ZP = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(7316));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(1506));

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5354));

var _extends2 = _interopRequireDefault(__webpack_require__(7154));

var _propTypes = _interopRequireDefault(__webpack_require__(5697));

var _react = _interopRequireDefault(__webpack_require__(2504));

var _reachRouter = __webpack_require__(3631);

var _utils = __webpack_require__(1122);

var _parsePath = __webpack_require__(1752);

exports.cP = _parsePath.parsePath;
var _excluded = ["to", "getProps", "onClick", "onMouseEnter", "activeClassName", "activeStyle", "innerRef", "partiallyActive", "state", "replace", "_location"];

var isAbsolutePath = function isAbsolutePath(path) {
  return path === null || path === void 0 ? void 0 : path.startsWith("/");
};

function withPrefix(path, prefix) {
  var _ref, _prefix;

  if (prefix === void 0) {
    prefix = getGlobalBasePrefix();
  }

  if (!isLocalLink(path)) {
    return path;
  }

  if (path.startsWith("./") || path.startsWith("../")) {
    return path;
  }

  var base = (_ref = (_prefix = prefix) !== null && _prefix !== void 0 ? _prefix : getGlobalPathPrefix()) !== null && _ref !== void 0 ? _ref : "/";
  return "" + (base !== null && base !== void 0 && base.endsWith("/") ? base.slice(0, -1) : base) + (path.startsWith("/") ? path : "/" + path);
} // These global values are wrapped in typeof clauses to ensure the values exist.
// This is especially problematic in unit testing of this component.


var getGlobalPathPrefix = function getGlobalPathPrefix() {
  return  false ? 0 : "";
};

var getGlobalBasePrefix = function getGlobalBasePrefix() {
  return  false ? 0 : "";
};

var isLocalLink = function isLocalLink(path) {
  return path && !path.startsWith("http://") && !path.startsWith("https://") && !path.startsWith("//");
};

function withAssetPrefix(path) {
  return withPrefix(path, getGlobalPathPrefix());
}

function absolutify(path, current) {
  // If it's already absolute, return as-is
  if (isAbsolutePath(path)) {
    return path;
  }

  return (0, _utils.resolve)(path, current);
}

var rewriteLinkPath = function rewriteLinkPath(path, relativeTo) {
  if (typeof path === "number") {
    return path;
  }

  if (!isLocalLink(path)) {
    return path;
  }

  return isAbsolutePath(path) ? withPrefix(path) : absolutify(path, relativeTo);
};

var NavLinkPropTypes = {
  activeClassName: _propTypes.default.string,
  activeStyle: _propTypes.default.object,
  partiallyActive: _propTypes.default.bool
}; // Set up IntersectionObserver

var createIntersectionObserver = function createIntersectionObserver(el, cb) {
  var io = new window.IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (el === entry.target) {
        // Check if element is within viewport, remove listener, destroy observer, and run link callback.
        // MSEdge doesn't currently support isIntersecting, so also test for  an intersectionRatio > 0
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          io.unobserve(el);
          io.disconnect();
          cb();
        }
      }
    });
  }); // Add element to the observer

  io.observe(el);
  return {
    instance: io,
    el: el
  };
};

function GatsbyLinkLocationWrapper(props) {
  return /*#__PURE__*/_react.default.createElement(_reachRouter.Location, null, function (_ref2) {
    var location = _ref2.location;
    return /*#__PURE__*/_react.default.createElement(GatsbyLink, (0, _extends2.default)({}, props, {
      _location: location
    }));
  });
}

var GatsbyLink = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2.default)(GatsbyLink, _React$Component);

  function GatsbyLink(props) {
    var _this;

    _this = _React$Component.call(this, props) || this; // Default to no support for IntersectionObserver

    _this.defaultGetProps = function (_ref3) {
      var isPartiallyCurrent = _ref3.isPartiallyCurrent,
          isCurrent = _ref3.isCurrent;

      if (_this.props.partiallyActive ? isPartiallyCurrent : isCurrent) {
        return {
          className: [_this.props.className, _this.props.activeClassName].filter(Boolean).join(" "),
          style: (0, _extends2.default)({}, _this.props.style, _this.props.activeStyle)
        };
      }

      return null;
    };

    var IOSupported = false;

    if (typeof window !== "undefined" && window.IntersectionObserver) {
      IOSupported = true;
    }

    _this.state = {
      IOSupported: IOSupported
    };
    _this.handleRef = _this.handleRef.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  var _proto = GatsbyLink.prototype;

  _proto._prefetch = function _prefetch() {
    var currentPath = window.location.pathname; // reach router should have the correct state

    if (this.props._location && this.props._location.pathname) {
      currentPath = this.props._location.pathname;
    }

    var rewrittenPath = rewriteLinkPath(this.props.to, currentPath);
    var newPathName = (0, _parsePath.parsePath)(rewrittenPath).pathname; // Prefech is used to speed up next navigations. When you use it on the current navigation,
    // there could be a race-condition where Chrome uses the stale data instead of waiting for the network to complete

    if (currentPath !== newPathName) {
      ___loader.enqueue(newPathName);
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    // Preserve non IO functionality if no support
    if (this.props.to !== prevProps.to && !this.state.IOSupported) {
      this._prefetch();
    }
  };

  _proto.componentDidMount = function componentDidMount() {
    // Preserve non IO functionality if no support
    if (!this.state.IOSupported) {
      this._prefetch();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (!this.io) {
      return;
    }

    var _this$io = this.io,
        instance = _this$io.instance,
        el = _this$io.el;
    instance.unobserve(el);
    instance.disconnect();
  };

  _proto.handleRef = function handleRef(ref) {
    var _this2 = this;

    if (this.props.innerRef && this.props.innerRef.hasOwnProperty("current")) {
      this.props.innerRef.current = ref;
    } else if (this.props.innerRef) {
      this.props.innerRef(ref);
    }

    if (this.state.IOSupported && ref) {
      // If IO supported and element reference found, setup Observer functionality
      this.io = createIntersectionObserver(ref, function () {
        _this2._prefetch();
      });
    }
  };

  _proto.render = function render() {
    var _this3 = this;

    var _this$props = this.props,
        to = _this$props.to,
        _this$props$getProps = _this$props.getProps,
        getProps = _this$props$getProps === void 0 ? this.defaultGetProps : _this$props$getProps,
        _onClick = _this$props.onClick,
        _onMouseEnter = _this$props.onMouseEnter,
        $activeClassName = _this$props.activeClassName,
        $activeStyle = _this$props.activeStyle,
        $innerRef = _this$props.innerRef,
        partiallyActive = _this$props.partiallyActive,
        state = _this$props.state,
        replace = _this$props.replace,
        _location = _this$props._location,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, _excluded);

    if (false) {}

    var prefixedTo = rewriteLinkPath(to, _location.pathname);

    if (!isLocalLink(prefixedTo)) {
      return /*#__PURE__*/_react.default.createElement("a", (0, _extends2.default)({
        href: prefixedTo
      }, rest));
    }

    return /*#__PURE__*/_react.default.createElement(_reachRouter.Link, (0, _extends2.default)({
      to: prefixedTo,
      state: state,
      getProps: getProps,
      innerRef: this.handleRef,
      onMouseEnter: function onMouseEnter(e) {
        if (_onMouseEnter) {
          _onMouseEnter(e);
        }

        ___loader.hovering((0, _parsePath.parsePath)(prefixedTo).pathname);
      },
      onClick: function onClick(e) {
        if (_onClick) {
          _onClick(e);
        }

        if (e.button === 0 && // ignore right clicks
        !_this3.props.target && // let browser handle "target=_blank"
        !e.defaultPrevented && // onClick prevented default
        !e.metaKey && // ignore clicks with modifier keys...
        !e.altKey && !e.ctrlKey && !e.shiftKey) {
          e.preventDefault();
          var shouldReplace = replace;

          var isCurrent = encodeURI(prefixedTo) === _location.pathname;

          if (typeof replace !== "boolean" && isCurrent) {
            shouldReplace = true;
          } // Make sure the necessary scripts and data are
          // loaded before continuing.


          window.___navigate(prefixedTo, {
            state: state,
            replace: shouldReplace
          });
        }

        return true;
      }
    }, rest));
  };

  return GatsbyLink;
}(_react.default.Component);

GatsbyLink.propTypes = (0, _extends2.default)({}, NavLinkPropTypes, {
  onClick: _propTypes.default.func,
  to: _propTypes.default.string.isRequired,
  replace: _propTypes.default.bool,
  state: _propTypes.default.object
});

var _default = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  return /*#__PURE__*/_react.default.createElement(GatsbyLinkLocationWrapper, (0, _extends2.default)({
    innerRef: ref
  }, props));
});

exports.ZP = _default;

var navigate = function navigate(to, options) {
  window.___navigate(rewriteLinkPath(to, window.location.pathname), options);
};

exports.c4 = navigate;

/***/ }),

/***/ 1752:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.__esModule = true;
exports.parsePath = parsePath;

function parsePath(path) {
  var pathname = path || "/";
  var search = "";
  var hash = "";
  var hashIndex = pathname.indexOf("#");

  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf("?");

  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === "?" ? "" : search,
    hash: hash === "#" ? "" : hash
  };
}

/***/ }),

/***/ 9679:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = true;
exports.p2 = __webpack_unused_export__ = void 0;

var _scrollHandler = __webpack_require__(1432);

__webpack_unused_export__ = _scrollHandler.ScrollHandler;

var _useScrollRestoration = __webpack_require__(4855);

exports.p2 = _useScrollRestoration.useScrollRestoration;

/***/ }),

/***/ 1432:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(5318);

exports.__esModule = true;
exports.ScrollHandler = exports.ScrollContext = void 0;

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(1506));

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5354));

var React = _interopRequireWildcard(__webpack_require__(2504));

var _propTypes = _interopRequireDefault(__webpack_require__(5697));

var _sessionStorage = __webpack_require__(1142);

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ScrollContext = /*#__PURE__*/React.createContext(new _sessionStorage.SessionStorage());
exports.ScrollContext = ScrollContext;
ScrollContext.displayName = "GatsbyScrollContext";

var ScrollHandler = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2.default)(ScrollHandler, _React$Component);

  function ScrollHandler() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this._stateStorage = new _sessionStorage.SessionStorage();
    _this._isTicking = false;
    _this._latestKnownScrollY = 0;

    _this.scrollListener = function () {
      _this._latestKnownScrollY = window.scrollY;

      if (!_this._isTicking) {
        _this._isTicking = true;
        requestAnimationFrame(_this._saveScroll.bind((0, _assertThisInitialized2.default)(_this)));
      }
    };

    _this.windowScroll = function (position, prevProps) {
      if (_this.shouldUpdateScroll(prevProps, _this.props)) {
        window.scrollTo(0, position);
      }
    };

    _this.scrollToHash = function (hash, prevProps) {
      var node = document.getElementById(hash.substring(1));

      if (node && _this.shouldUpdateScroll(prevProps, _this.props)) {
        node.scrollIntoView();
      }
    };

    _this.shouldUpdateScroll = function (prevRouterProps, routerProps) {
      var shouldUpdateScroll = _this.props.shouldUpdateScroll;

      if (!shouldUpdateScroll) {
        return true;
      } // Hack to allow accessing this._stateStorage.


      return shouldUpdateScroll.call((0, _assertThisInitialized2.default)(_this), prevRouterProps, routerProps);
    };

    return _this;
  }

  var _proto = ScrollHandler.prototype;

  _proto._saveScroll = function _saveScroll() {
    var key = this.props.location.key || null;

    if (key) {
      this._stateStorage.save(this.props.location, key, this._latestKnownScrollY);
    }

    this._isTicking = false;
  };

  _proto.componentDidMount = function componentDidMount() {
    window.addEventListener("scroll", this.scrollListener);
    var scrollPosition;
    var _this$props$location = this.props.location,
        key = _this$props$location.key,
        hash = _this$props$location.hash;

    if (key) {
      scrollPosition = this._stateStorage.read(this.props.location, key);
    }

    if (scrollPosition) {
      this.windowScroll(scrollPosition, undefined);
    } else if (hash) {
      this.scrollToHash(decodeURI(hash), undefined);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollListener);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props$location2 = this.props.location,
        hash = _this$props$location2.hash,
        key = _this$props$location2.key;
    var scrollPosition;

    if (key) {
      scrollPosition = this._stateStorage.read(this.props.location, key);
    }
    /**  There are two pieces of state: the browser url and
     * history state which keeps track of scroll position
     * Native behaviour prescribes that we ought to restore scroll position
     * when a user navigates back in their browser (this is the `POP` action)
     * Currently, reach router has a bug that prevents this at https://github.com/reach/router/issues/228
     * So we _always_ stick to the url as a source of truth — if the url
     * contains a hash, we scroll to it
     */


    if (hash) {
      this.scrollToHash(decodeURI(hash), prevProps);
    } else {
      this.windowScroll(scrollPosition, prevProps);
    }
  };

  _proto.render = function render() {
    return /*#__PURE__*/React.createElement(ScrollContext.Provider, {
      value: this._stateStorage
    }, this.props.children);
  };

  return ScrollHandler;
}(React.Component);

exports.ScrollHandler = ScrollHandler;
ScrollHandler.propTypes = {
  shouldUpdateScroll: _propTypes.default.func,
  children: _propTypes.default.element.isRequired,
  location: _propTypes.default.object.isRequired
};

/***/ }),

/***/ 1142:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.__esModule = true;
exports.SessionStorage = void 0;
var STATE_KEY_PREFIX = "@@scroll|";
var GATSBY_ROUTER_SCROLL_STATE = "___GATSBY_REACT_ROUTER_SCROLL";

var SessionStorage = /*#__PURE__*/function () {
  function SessionStorage() {}

  var _proto = SessionStorage.prototype;

  _proto.read = function read(location, key) {
    var stateKey = this.getStateKey(location, key);

    try {
      var value = window.sessionStorage.getItem(stateKey);
      return value ? JSON.parse(value) : 0;
    } catch (e) {
      if (false) {}

      if (window && window[GATSBY_ROUTER_SCROLL_STATE] && window[GATSBY_ROUTER_SCROLL_STATE][stateKey]) {
        return window[GATSBY_ROUTER_SCROLL_STATE][stateKey];
      }

      return 0;
    }
  };

  _proto.save = function save(location, key, value) {
    var stateKey = this.getStateKey(location, key);
    var storedValue = JSON.stringify(value);

    try {
      window.sessionStorage.setItem(stateKey, storedValue);
    } catch (e) {
      if (window && window[GATSBY_ROUTER_SCROLL_STATE]) {
        window[GATSBY_ROUTER_SCROLL_STATE][stateKey] = JSON.parse(storedValue);
      } else {
        window[GATSBY_ROUTER_SCROLL_STATE] = {};
        window[GATSBY_ROUTER_SCROLL_STATE][stateKey] = JSON.parse(storedValue);
      }

      if (false) {}
    }
  };

  _proto.getStateKey = function getStateKey(location, key) {
    var stateKeyBase = "" + STATE_KEY_PREFIX + location.pathname;
    return key === null || typeof key === "undefined" ? stateKeyBase : stateKeyBase + "|" + key;
  };

  return SessionStorage;
}();

exports.SessionStorage = SessionStorage;

/***/ }),

/***/ 4855:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.useScrollRestoration = useScrollRestoration;

var _scrollHandler = __webpack_require__(1432);

var _react = __webpack_require__(2504);

var _reachRouter = __webpack_require__(3631);

function useScrollRestoration(identifier) {
  var location = (0, _reachRouter.useLocation)();
  var state = (0, _react.useContext)(_scrollHandler.ScrollContext);
  var ref = (0, _react.useRef)(null);
  (0, _react.useLayoutEffect)(function () {
    if (ref.current) {
      var position = state.read(location, identifier);
      ref.current.scrollTo(0, position || 0);
    }
  }, [location.key]);
  return {
    ref: ref,
    onScroll: function onScroll() {
      if (ref.current) {
        state.save(location, identifier, ref.current.scrollTop);
      }
    }
  };
}

/***/ }),

/***/ 4852:
/***/ ((module) => {

"use strict";


module.exports = Object.assign;
//# sourceMappingURL=object-assign.js.map

/***/ }),

/***/ 885:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// prefer default export if available
const preferDefault=m=>m&&m.default||m;exports.components={"component---src-pages-404-js":preferDefault(__webpack_require__(9616)),"component---src-pages-index-js":preferDefault(__webpack_require__(104))};

/***/ }),

/***/ 9874:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "apiRunner": () => (/* binding */ apiRunner),
/* harmony export */   "apiRunnerAsync": () => (/* binding */ apiRunnerAsync)
/* harmony export */ });
var plugins=[{name:'gatsby-plugin-image',plugin:__webpack_require__(573),options:{"plugins":[]}},{name:'gatsby-plugin-react-helmet',plugin:__webpack_require__(9814),options:{"plugins":[]}},{name:'gatsby-plugin-sitemap',plugin:__webpack_require__(6313),options:{"plugins":[],"output":"/sitemap","createLinkInHead":true,"entryLimit":45000,"query":"{ site { siteMetadata { siteUrl } } allSitePage { nodes { path } } }","excludes":[]}},{name:'gatsby-plugin-manifest',plugin:__webpack_require__(341),options:{"plugins":[],"icon":"src/images/logo_brisa.webp","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"cbfdb2c424d74ee96dd298f021afb7a3"}}];/* global plugins */ // During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]
const apis=__webpack_require__(3120);function augmentErrorWithPlugin(plugin,err){if(plugin.name!==`default-site-plugin`){// default-site-plugin is user code and will print proper stack trace,
// so no point in annotating error message pointing out which plugin is root of the problem
err.message+=` (from plugin: ${plugin.name})`;}throw err;}function apiRunner(api,args,defaultReturn,argTransform){if(!apis[api]){console.log(`This API doesn't exist`,api);}const results=[];plugins.forEach(plugin=>{const apiFn=plugin.plugin[api];if(!apiFn){return;}try{const result=apiFn(args,plugin.options);if(result&&argTransform){args=argTransform({args,result});}// This if case keeps behaviour as before, we should allow undefined here as the api is defined
// TODO V4
if(typeof result!==`undefined`){results.push(result);}}catch(e){augmentErrorWithPlugin(plugin,e);}});return results.length?results:[defaultReturn];}async function apiRunnerAsync(api,args,defaultReturn,argTransform){if(!apis[api]){console.log(`This API doesn't exist`,api);}const results=[];for(const plugin of plugins){const apiFn=plugin.plugin[api];if(!apiFn){continue;}try{const result=await apiFn(args,plugin.options);if(result&&argTransform){args=argTransform({args,result});}// This if case keeps behaviour as before, we should allow undefined here as the api is defined
// TODO V4
if(typeof result!==`undefined`){results.push(result);}}catch(e){augmentErrorWithPlugin(plugin,e);}}return results.length?results:[defaultReturn];}

/***/ }),

/***/ 3120:
/***/ ((__unused_webpack_module, exports) => {

/**
 * Object containing options defined in `gatsby-config.js`
 * @typedef {object} pluginOptions
 */ /**
 * Replace the default server renderer. This is useful for integration with
 * Redux, css-in-js libraries, etc. that need custom setups for server
 * rendering.
 * @param {object} $0
 * @param {string} $0.pathname The pathname of the page currently being rendered.
 * @param {ReactNode} $0.bodyComponent The React element to be rendered as the page body
 * @param {function} $0.replaceBodyHTMLString Call this with the HTML string
 * you render. **WARNING** if multiple plugins implement this API it's the
 * last plugin that "wins". TODO implement an automated warning against this.
 * @param {function} $0.setHeadComponents Takes an array of components as its
 * first argument which are added to the `headComponents` array which is passed
 * to the `html.js` component.
 * @param {function} $0.setHtmlAttributes Takes an object of props which will
 * spread into the `<html>` component.
 * @param {function} $0.setBodyAttributes Takes an object of props which will
 * spread into the `<body>` component.
 * @param {function} $0.setPreBodyComponents Takes an array of components as its
 * first argument which are added to the `preBodyComponents` array which is passed
 * to the `html.js` component.
 * @param {function} $0.setPostBodyComponents Takes an array of components as its
 * first argument which are added to the `postBodyComponents` array which is passed
 * to the `html.js` component.
 * @param {function} $0.setBodyProps Takes an object of data which
 * is merged with other body props and passed to `html.js` as `bodyProps`.
 * @param {pluginOptions} pluginOptions
 * @example
 * // From gatsby-plugin-glamor
 * const { renderToString } = require("react-dom/server")
 * const inline = require("glamor-inline")
 *
 * exports.replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
 *   const bodyHTML = renderToString(bodyComponent)
 *   const inlinedHTML = inline(bodyHTML)
 *
 *   replaceBodyHTMLString(inlinedHTML)
 * }
 */exports.replaceRenderer=true;/**
 * Called after every page Gatsby server renders while building HTML so you can
 * set head and body components to be rendered in your `html.js`.
 *
 * Gatsby does a two-pass render for HTML. It loops through your pages first
 * rendering only the body and then takes the result body HTML string and
 * passes it as the `body` prop to your `html.js` to complete the render.
 *
 * It's often handy to be able to send custom components to your `html.js`.
 * For example, it's a very common pattern for React.js libraries that
 * support server rendering to pull out data generated during the render to
 * add to your HTML.
 *
 * Using this API over [`replaceRenderer`](#replaceRenderer) is preferable as
 * multiple plugins can implement this API where only one plugin can take
 * over server rendering. However, if your plugin requires taking over server
 * rendering then that's the one to
 * use
 * @param {object} $0
 * @param {string} $0.pathname The pathname of the page currently being rendered.
 * @param {function} $0.setHeadComponents Takes an array of components as its
 * first argument which are added to the `headComponents` array which is passed
 * to the `html.js` component.
 * @param {function} $0.setHtmlAttributes Takes an object of props which will
 * spread into the `<html>` component.
 * @param {function} $0.setBodyAttributes Takes an object of props which will
 * spread into the `<body>` component.
 * @param {function} $0.setPreBodyComponents Takes an array of components as its
 * first argument which are added to the `preBodyComponents` array which is passed
 * to the `html.js` component.
 * @param {function} $0.setPostBodyComponents Takes an array of components as its
 * first argument which are added to the `postBodyComponents` array which is passed
 * to the `html.js` component.
 * @param {function} $0.setBodyProps Takes an object of data which
 * is merged with other body props and passed to `html.js` as `bodyProps`.
 * @param {pluginOptions} pluginOptions
 * @example
 * // Import React so that you can use JSX in HeadComponents
 * const React = require("react")
 *
 * const HtmlAttributes = {
 *   lang: "en"
 * }
 *
 * const HeadComponents = [
 *   <script key="my-script" src="https://gatsby.dev/my-script" />
 * ]
 *
 * const BodyAttributes = {
 *   "data-theme": "dark"
 * }
 *
 * exports.onRenderBody = ({
 *   setHeadComponents,
 *   setHtmlAttributes,
 *   setBodyAttributes
 * }, pluginOptions) => {
 *   setHtmlAttributes(HtmlAttributes)
 *   setHeadComponents(HeadComponents)
 *   setBodyAttributes(BodyAttributes)
 * }
 */exports.onRenderBody=true;/**
 * Called after every page Gatsby server renders while building HTML so you can
 * replace head components to be rendered in your `html.js`. This is useful if
 * you need to reorder scripts or styles added by other plugins.
 * @param {object} $0
 * @param {string} $0.pathname The pathname of the page currently being rendered.
 * @param {Array<ReactNode>} $0.getHeadComponents Returns the current `headComponents` array.
 * @param {function} $0.replaceHeadComponents Takes an array of components as its
 * first argument which replace the `headComponents` array which is passed
 * to the `html.js` component. **WARNING** if multiple plugins implement this
 * API it's the last plugin that "wins".
 * @param {Array<ReactNode>} $0.getPreBodyComponents Returns the current `preBodyComponents` array.
 *  @param {function} $0.replacePreBodyComponents Takes an array of components as its
 * first argument which replace the `preBodyComponents` array which is passed
 * to the `html.js` component. **WARNING** if multiple plugins implement this
 * API it's the last plugin that "wins".
 * @param {Array<ReactNode>} $0.getPostBodyComponents Returns the current `postBodyComponents` array.
 *  @param {function} $0.replacePostBodyComponents Takes an array of components as its
 * first argument which replace the `postBodyComponents` array which is passed
 * to the `html.js` component. **WARNING** if multiple plugins implement this
 * API it's the last plugin that "wins".
 * @param {pluginOptions} pluginOptions
 * @example
 * // Move Typography.js styles to the top of the head section so they're loaded first.
 * exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
 *   const headComponents = getHeadComponents()
 *   headComponents.sort((x, y) => {
 *     if (x.key === 'TypographyStyle') {
 *       return -1
 *     } else if (y.key === 'TypographyStyle') {
 *       return 1
 *     }
 *     return 0
 *   })
 *   replaceHeadComponents(headComponents)
 * }
 */exports.onPreRenderHTML=true;/**
 * Allow a plugin to wrap the page element.
 *
 * This is useful for setting wrapper components around pages that won't get
 * unmounted on page changes. For setting Provider components, use [wrapRootElement](#wrapRootElement).
 *
 * _Note:_
 * There is an equivalent hook in Gatsby's [Browser API](/docs/browser-apis/#wrapPageElement).
 * It is recommended to use both APIs together.
 * For example usage, check out [Using i18n](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-i18n).
 * @param {object} $0
 * @param {ReactNode} $0.element The "Page" React Element built by Gatsby.
 * @param {object} $0.props Props object used by page.
 * @param {pluginOptions} pluginOptions
 * @returns {ReactNode} Wrapped element
 * @example
 * const React = require("react")
 * const Layout = require("./src/components/layout").default
 *
 * exports.wrapPageElement = ({ element, props }) => {
 *   // props provide same data to Layout as Page element will get
 *   // including location, data, etc - you don't need to pass it
 *   return <Layout {...props}>{element}</Layout>
 * }
 */exports.wrapPageElement=true;/**
 * Allow a plugin to wrap the root element.
 *
 * This is useful to set up any Provider components that will wrap your application.
 * For setting persistent UI elements around pages use [wrapPageElement](#wrapPageElement).
 *
 * _Note:_
 * There is an equivalent hook in Gatsby's [Browser API](/docs/browser-apis/#wrapRootElement).
 * It is recommended to use both APIs together.
 * For example usage, check out [Using redux](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-redux).
 * @param {object} $0
 * @param {ReactNode} $0.element The "Root" React Element built by Gatsby.
 * @param {pluginOptions} pluginOptions
 * @returns {ReactNode} Wrapped element
 * @example
 * const React = require("react")
 * const { Provider } = require("react-redux")
 *
 * const createStore = require("./src/state/createStore")
 * const store = createStore()
 *
 * exports.wrapRootElement = ({ element }) => {
 *   return (
 *     <Provider store={store}>
 *       {element}
 *     </Provider>
 *   )
 * }
 */exports.wrapRootElement=true;

/***/ }),

/***/ 5677:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HTML)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2504);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5697);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function HTML(props){return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("html",props.htmlAttributes,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("head",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta",{charSet:"utf-8"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta",{httpEquiv:"x-ua-compatible",content:"ie=edge"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1, shrink-to-fit=no"}),props.headComponents),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("body",props.bodyAttributes,props.preBodyComponents,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{key:`body`,id:"___gatsby",dangerouslySetInnerHTML:{__html:props.body}}),props.postBodyComponents));}HTML.propTypes={htmlAttributes:(prop_types__WEBPACK_IMPORTED_MODULE_1___default().object),headComponents:(prop_types__WEBPACK_IMPORTED_MODULE_1___default().array),bodyAttributes:(prop_types__WEBPACK_IMPORTED_MODULE_1___default().object),preBodyComponents:(prop_types__WEBPACK_IMPORTED_MODULE_1___default().array),body:(prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),postBodyComponents:(prop_types__WEBPACK_IMPORTED_MODULE_1___default().array)};

/***/ }),

/***/ 8451:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "cleanPath": () => (/* binding */ cleanPath),
  "findMatchPath": () => (/* binding */ findMatchPath),
  "findPath": () => (/* binding */ findPath),
  "grabMatchParams": () => (/* binding */ grabMatchParams),
  "setMatchPaths": () => (/* binding */ setMatchPaths)
});

// EXTERNAL MODULE: ./node_modules/@gatsbyjs/reach-router/lib/utils.js
var utils = __webpack_require__(1122);
;// CONCATENATED MODULE: ./.cache/strip-prefix.js
/**
 * Remove a prefix from a string. Return the input string if the given prefix
 * isn't found.
 */function stripPrefix(str,prefix=``){if(!prefix){return str;}if(str===prefix){return`/`;}if(str.startsWith(`${prefix}/`)){return str.slice(prefix.length);}return str;}
;// CONCATENATED MODULE: ./.cache/normalize-page-path.js
/* harmony default export */ const normalize_page_path = (path=>{if(path===undefined){return path;}if(path===`/`){return`/`;}if(path.charAt(path.length-1)===`/`){return path.slice(0,-1);}return path;});
;// CONCATENATED MODULE: ./.cache/redirects.json
const redirects_namespaceObject = [];
;// CONCATENATED MODULE: ./.cache/redirect-utils.js
// Convert to a map for faster lookup in maybeRedirect()
const redirectMap=new Map();const redirectIgnoreCaseMap=new Map();redirects_namespaceObject.forEach(redirect=>{if(redirect.ignoreCase){redirectIgnoreCaseMap.set(redirect.fromPath,redirect);}else{redirectMap.set(redirect.fromPath,redirect);}});function maybeGetBrowserRedirect(pathname){let redirect=redirectMap.get(pathname);if(!redirect){redirect=redirectIgnoreCaseMap.get(pathname.toLowerCase());}return redirect;}
;// CONCATENATED MODULE: ./.cache/find-path.js
const pathCache=new Map();let matchPaths=[];const trimPathname=rawPathname=>{const pathname=decodeURIComponent(rawPathname);// Remove the pathPrefix from the pathname.
const trimmedPathname=stripPrefix(pathname,decodeURIComponent(""))// Remove any hashfragment
.split(`#`)[0]// Remove search query
.split(`?`)[0];return trimmedPathname;};function absolutify(path){// If it's already absolute, return as-is
if(path.startsWith(`/`)||path.startsWith(`https://`)||path.startsWith(`http://`)){return path;}// Calculate path relative to current location, adding a trailing slash to
// match behavior of @reach/router
return new URL(path,window.location.href+(window.location.href.endsWith(`/`)?``:`/`)).pathname;}/**
 * Set list of matchPaths
 *
 * @param {Array<{path: string, matchPath: string}>} value collection of matchPaths
 */const setMatchPaths=value=>{matchPaths=value;};/**
 * Return a matchpath url
 * if `match-paths.json` contains `{ "/foo*": "/page1", ...}`, then
 * `/foo?bar=far` => `/page1`
 *
 * @param {string} rawPathname A raw pathname
 * @return {string|null}
 */const findMatchPath=rawPathname=>{const trimmedPathname=cleanPath(rawPathname);const pickPaths=matchPaths.map(({path,matchPath})=>{return{path:matchPath,originalPath:path};});const path=(0,utils.pick)(pickPaths,trimmedPathname);if(path){return normalize_page_path(path.route.originalPath);}return null;};/**
 * Return a matchpath params from reach/router rules
 * if `match-paths.json` contains `{ ":bar/*foo" }`, and the path is /baz/zaz/zoo
 * then it returns
 *  { bar: baz, foo: zaz/zoo }
 *
 * @param {string} rawPathname A raw pathname
 * @return {object}
 */const grabMatchParams=rawPathname=>{const trimmedPathname=cleanPath(rawPathname);const pickPaths=matchPaths.map(({path,matchPath})=>{return{path:matchPath,originalPath:path};});const path=(0,utils.pick)(pickPaths,trimmedPathname);if(path){return path.params;}return{};};// Given a raw URL path, returns the cleaned version of it (trim off
// `#` and query params), or if it matches an entry in
// `match-paths.json`, its matched path is returned
//
// E.g. `/foo?bar=far` => `/foo`
//
// Or if `match-paths.json` contains `{ "/foo*": "/page1", ...}`, then
// `/foo?bar=far` => `/page1`
const findPath=rawPathname=>{const trimmedPathname=trimPathname(absolutify(rawPathname));if(pathCache.has(trimmedPathname)){return pathCache.get(trimmedPathname);}const redirect=maybeGetBrowserRedirect(rawPathname);if(redirect){return findPath(redirect.toPath);}let foundPath=findMatchPath(trimmedPathname);if(!foundPath){foundPath=cleanPath(rawPathname);}pathCache.set(trimmedPathname,foundPath);return foundPath;};/**
 * Clean a url and converts /index.html => /
 * E.g. `/foo?bar=far` => `/foo`
 *
 * @param {string} rawPathname A raw pathname
 * @return {string}
 */const cleanPath=rawPathname=>{const trimmedPathname=trimPathname(absolutify(rawPathname));let foundPath=trimmedPathname;if(foundPath===`/index.html`){foundPath=`/`;}foundPath=normalize_page_path(foundPath);return foundPath;};

/***/ }),

/***/ 2031:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Link": () => (/* reexport */ gatsby_link/* default */.ZP),
  "PageRenderer": () => (/* reexport */ (public_page_renderer_default())),
  "StaticQuery": () => (/* binding */ StaticQuery),
  "StaticQueryContext": () => (/* binding */ StaticQueryContext),
  "graphql": () => (/* binding */ graphql),
  "navigate": () => (/* reexport */ gatsby_link/* navigate */.c4),
  "parsePath": () => (/* reexport */ gatsby_link/* parsePath */.cP),
  "prefetchPathname": () => (/* binding */ prefetchPathname),
  "useScrollRestoration": () => (/* reexport */ gatsby_react_router_scroll/* useScrollRestoration */.p2),
  "useStaticQuery": () => (/* binding */ useStaticQuery),
  "withAssetPrefix": () => (/* reexport */ gatsby_link/* withAssetPrefix */.mc),
  "withPrefix": () => (/* reexport */ gatsby_link/* withPrefix */.dq)
});

// EXTERNAL MODULE: external "/Users/mirkotorrisi/Documents/birsa-sonora/node_modules/react/index.js"
var index_js_ = __webpack_require__(2504);
var index_js_default = /*#__PURE__*/__webpack_require__.n(index_js_);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(5697);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: ./node_modules/gatsby-link/index.js
var gatsby_link = __webpack_require__(8037);
// EXTERNAL MODULE: ./node_modules/gatsby-react-router-scroll/index.js
var gatsby_react_router_scroll = __webpack_require__(9679);
// EXTERNAL MODULE: ./.cache/public-page-renderer.js
var public_page_renderer = __webpack_require__(861);
var public_page_renderer_default = /*#__PURE__*/__webpack_require__.n(public_page_renderer);
;// CONCATENATED MODULE: ./.cache/prefetch.js
const support=function(feature){if(typeof document===`undefined`){return false;}const fakeLink=document.createElement(`link`);try{if(fakeLink.relList&&typeof fakeLink.relList.supports===`function`){return fakeLink.relList.supports(feature);}}catch(err){return false;}return false;};const linkPrefetchStrategy=function(url,options){return new Promise((resolve,reject)=>{if(typeof document===`undefined`){reject();return;}const link=document.createElement(`link`);link.setAttribute(`rel`,`prefetch`);link.setAttribute(`href`,url);Object.keys(options).forEach(key=>{link.setAttribute(key,options[key]);});link.onload=resolve;link.onerror=reject;const parentElement=document.getElementsByTagName(`head`)[0]||document.getElementsByName(`script`)[0].parentNode;parentElement.appendChild(link);});};const xhrPrefetchStrategy=function(url){return new Promise((resolve,reject)=>{const req=new XMLHttpRequest();req.open(`GET`,url,true);req.onload=()=>{if(req.status===200){resolve();}else{reject();}};req.send(null);});};const supportedPrefetchStrategy=support(`prefetch`)?linkPrefetchStrategy:xhrPrefetchStrategy;const preFetched={};const prefetch=function(url,options){return new Promise(resolve=>{if(preFetched[url]){resolve();return;}supportedPrefetchStrategy(url,options).then(()=>{resolve();preFetched[url]=true;}).catch(()=>{});// 404s are logged to the console anyway
});};/* harmony default export */ const _cache_prefetch = ((/* unused pure expression or super */ null && (prefetch)));
;// CONCATENATED MODULE: ./node_modules/mitt/dist/mitt.es.js
//      
// An event handler can take an optional event argument
// and should not return a value
                                          
                                                               

// An array of all currently registered event handlers for a type
                                            
                                                            
// A map of event types and their corresponding event handlers.
                        
                                 
                                   
  

/** Mitt: Tiny (~200b) functional event emitter / pubsub.
 *  @name mitt
 *  @returns {Mitt}
 */
function mitt(all                 ) {
	all = all || Object.create(null);

	return {
		/**
		 * Register an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to listen for, or `"*"` for all events
		 * @param  {Function} handler Function to call in response to given event
		 * @memberOf mitt
		 */
		on: function on(type        , handler              ) {
			(all[type] || (all[type] = [])).push(handler);
		},

		/**
		 * Remove an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to unregister `handler` from, or `"*"`
		 * @param  {Function} handler Handler function to remove
		 * @memberOf mitt
		 */
		off: function off(type        , handler              ) {
			if (all[type]) {
				all[type].splice(all[type].indexOf(handler) >>> 0, 1);
			}
		},

		/**
		 * Invoke all handlers for the given type.
		 * If present, `"*"` handlers are invoked after type-matched handlers.
		 *
		 * @param {String} type  The event type to invoke
		 * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
		 * @memberOf mitt
		 */
		emit: function emit(type        , evt     ) {
			(all[type] || []).slice().map(function (handler) { handler(evt); });
			(all['*'] || []).slice().map(function (handler) { handler(type, evt); });
		}
	};
}

/* harmony default export */ const mitt_es = (mitt);
//# sourceMappingURL=mitt.es.js.map

;// CONCATENATED MODULE: ./.cache/emitter.js
const emitter_emitter=mitt_es();/* harmony default export */ const _cache_emitter = ((/* unused pure expression or super */ null && (emitter_emitter)));
// EXTERNAL MODULE: ./.cache/find-path.js + 4 modules
var find_path = __webpack_require__(8451);
;// CONCATENATED MODULE: ./.cache/loader.js
/**
 * Available resource loading statuses
 */const PageResourceStatus={/**
   * At least one of critical resources failed to load
   */Error:`error`,/**
   * Resources loaded successfully
   */Success:`success`};const preferDefault=m=>m&&m.default||m;const stripSurroundingSlashes=s=>{s=s[0]===`/`?s.slice(1):s;s=s.endsWith(`/`)?s.slice(0,-1):s;return s;};const createPageDataUrl=path=>{const fixedPath=path===`/`?`index`:stripSurroundingSlashes(path);return`${""}/page-data/${fixedPath}/page-data.json`;};function doFetch(url,method=`GET`){return new Promise((resolve,reject)=>{const req=new XMLHttpRequest();req.open(method,url,true);req.onreadystatechange=()=>{if(req.readyState==4){resolve(req);}};req.send(null);});}const doesConnectionSupportPrefetch=()=>{if(`connection`in navigator&&typeof navigator.connection!==`undefined`){if((navigator.connection.effectiveType||``).includes(`2g`)){return false;}if(navigator.connection.saveData){return false;}}return true;};const toPageResources=(pageData,component=null)=>{const page={componentChunkName:pageData.componentChunkName,path:pageData.path,webpackCompilationHash:pageData.webpackCompilationHash,matchPath:pageData.matchPath,staticQueryHashes:pageData.staticQueryHashes};return{component,json:pageData.result,page};};class BaseLoader{constructor(loadComponent,matchPaths){this.inFlightNetworkRequests=new Map();// Map of pagePath -> Page. Where Page is an object with: {
//   status: PageResourceStatus.Success || PageResourceStatus.Error,
//   payload: PageResources, // undefined if PageResourceStatus.Error
// }
// PageResources is {
//   component,
//   json: pageData.result,
//   page: {
//     componentChunkName,
//     path,
//     webpackCompilationHash,
//     staticQueryHashes
//   },
//   staticQueryResults
// }
this.pageDb=new Map();this.inFlightDb=new Map();this.staticQueryDb={};this.pageDataDb=new Map();this.prefetchTriggered=new Set();this.prefetchCompleted=new Set();this.loadComponent=loadComponent;setMatchPaths(matchPaths);}memoizedGet(url){let inFlightPromise=this.inFlightNetworkRequests.get(url);if(!inFlightPromise){inFlightPromise=doFetch(url,`GET`);this.inFlightNetworkRequests.set(url,inFlightPromise);}// Prefer duplication with then + catch over .finally to prevent problems in ie11 + firefox
return inFlightPromise.then(response=>{this.inFlightNetworkRequests.delete(url);return response;}).catch(err=>{this.inFlightNetworkRequests.delete(url);throw err;});}setApiRunner(apiRunner){this.apiRunner=apiRunner;this.prefetchDisabled=apiRunner(`disableCorePrefetching`).some(a=>a);}fetchPageDataJson(loadObj){const{pagePath,retries=0}=loadObj;const url=createPageDataUrl(pagePath);return this.memoizedGet(url).then(req=>{const{status,responseText}=req;// Handle 200
if(status===200){try{const jsonPayload=JSON.parse(responseText);if(jsonPayload.path===undefined){throw new Error(`not a valid pageData response`);}return Object.assign(loadObj,{status:PageResourceStatus.Success,payload:jsonPayload});}catch(err){// continue regardless of error
}}// Handle 404
if(status===404||status===200){// If the request was for a 404 page and it doesn't exist, we're done
if(pagePath===`/404.html`){return Object.assign(loadObj,{status:PageResourceStatus.Error});}// Need some code here to cache the 404 request. In case
// multiple loadPageDataJsons result in 404s
return this.fetchPageDataJson(Object.assign(loadObj,{pagePath:`/404.html`,notFound:true}));}// handle 500 response (Unrecoverable)
if(status===500){return Object.assign(loadObj,{status:PageResourceStatus.Error});}// Handle everything else, including status === 0, and 503s. Should retry
if(retries<3){return this.fetchPageDataJson(Object.assign(loadObj,{retries:retries+1}));}// Retried 3 times already, result is an error.
return Object.assign(loadObj,{status:PageResourceStatus.Error});});}loadPageDataJson(rawPath){const pagePath=findPath(rawPath);if(this.pageDataDb.has(pagePath)){const pageData=this.pageDataDb.get(pagePath);if(true){return Promise.resolve(pageData);}}return this.fetchPageDataJson({pagePath}).then(pageData=>{this.pageDataDb.set(pagePath,pageData);return pageData;});}findMatchPath(rawPath){return findMatchPath(rawPath);}// TODO check all uses of this and whether they use undefined for page resources not exist
loadPage(rawPath){const pagePath=findPath(rawPath);if(this.pageDb.has(pagePath)){const page=this.pageDb.get(pagePath);if(true){if(page.error){return{error:page.error,status:page.status};}return Promise.resolve(page.payload);}}if(this.inFlightDb.has(pagePath)){return this.inFlightDb.get(pagePath);}const inFlightPromise=Promise.all([this.loadAppData(),this.loadPageDataJson(pagePath)]).then(allData=>{const result=allData[1];if(result.status===PageResourceStatus.Error){return{status:PageResourceStatus.Error};}let pageData=result.payload;const{componentChunkName,staticQueryHashes=[]}=pageData;const finalResult={};const componentChunkPromise=this.loadComponent(componentChunkName).then(component=>{finalResult.createdAt=new Date();let pageResources;if(!component||component instanceof Error){finalResult.status=PageResourceStatus.Error;finalResult.error=component;}else{finalResult.status=PageResourceStatus.Success;if(result.notFound===true){finalResult.notFound=true;}pageData=Object.assign(pageData,{webpackCompilationHash:allData[0]?allData[0].webpackCompilationHash:``});pageResources=toPageResources(pageData,component);}// undefined if final result is an error
return pageResources;});const staticQueryBatchPromise=Promise.all(staticQueryHashes.map(staticQueryHash=>{// Check for cache in case this static query result has already been loaded
if(this.staticQueryDb[staticQueryHash]){const jsonPayload=this.staticQueryDb[staticQueryHash];return{staticQueryHash,jsonPayload};}return this.memoizedGet(`${""}/page-data/sq/d/${staticQueryHash}.json`).then(req=>{const jsonPayload=JSON.parse(req.responseText);return{staticQueryHash,jsonPayload};}).catch(()=>{throw new Error(`We couldn't load "${""}/page-data/sq/d/${staticQueryHash}.json"`);});})).then(staticQueryResults=>{const staticQueryResultsMap={};staticQueryResults.forEach(({staticQueryHash,jsonPayload})=>{staticQueryResultsMap[staticQueryHash]=jsonPayload;this.staticQueryDb[staticQueryHash]=jsonPayload;});return staticQueryResultsMap;});return Promise.all([componentChunkPromise,staticQueryBatchPromise]).then(([pageResources,staticQueryResults])=>{let payload;if(pageResources){payload={...pageResources,staticQueryResults};finalResult.payload=payload;emitter.emit(`onPostLoadPageResources`,{page:payload,pageResources:payload});}this.pageDb.set(pagePath,finalResult);if(finalResult.error){return{error:finalResult.error,status:finalResult.status};}return payload;})// when static-query fail to load we throw a better error
.catch(err=>{return{error:err,status:PageResourceStatus.Error};});});inFlightPromise.then(()=>{this.inFlightDb.delete(pagePath);}).catch(error=>{this.inFlightDb.delete(pagePath);throw error;});this.inFlightDb.set(pagePath,inFlightPromise);return inFlightPromise;}// returns undefined if the page does not exists in cache
loadPageSync(rawPath,options={}){const pagePath=findPath(rawPath);if(this.pageDb.has(pagePath)){const pageData=this.pageDb.get(pagePath);if(pageData.payload){return pageData.payload;}if(options!==null&&options!==void 0&&options.withErrorDetails){return{error:pageData.error,status:pageData.status};}}return undefined;}shouldPrefetch(pagePath){// Skip prefetching if we know user is on slow or constrained connection
if(!doesConnectionSupportPrefetch()){return false;}// Check if the page exists.
if(this.pageDb.has(pagePath)){return false;}return true;}prefetch(pagePath){if(!this.shouldPrefetch(pagePath)){return false;}// Tell plugins with custom prefetching logic that they should start
// prefetching this path.
if(!this.prefetchTriggered.has(pagePath)){this.apiRunner(`onPrefetchPathname`,{pathname:pagePath});this.prefetchTriggered.add(pagePath);}// If a plugin has disabled core prefetching, stop now.
if(this.prefetchDisabled){return false;}const realPath=findPath(pagePath);// Todo make doPrefetch logic cacheable
// eslint-disable-next-line consistent-return
this.doPrefetch(realPath).then(()=>{if(!this.prefetchCompleted.has(pagePath)){this.apiRunner(`onPostPrefetchPathname`,{pathname:pagePath});this.prefetchCompleted.add(pagePath);}});return true;}doPrefetch(pagePath){const pageDataUrl=createPageDataUrl(pagePath);return prefetchHelper(pageDataUrl,{crossOrigin:`anonymous`,as:`fetch`}).then(()=>// This was just prefetched, so will return a response from
// the cache instead of making another request to the server
this.loadPageDataJson(pagePath));}hovering(rawPath){this.loadPage(rawPath);}getResourceURLsForPathname(rawPath){const pagePath=findPath(rawPath);const page=this.pageDataDb.get(pagePath);if(page){const pageResources=toPageResources(page.payload);return[...createComponentUrls(pageResources.page.componentChunkName),createPageDataUrl(pagePath)];}else{return null;}}isPageNotFound(rawPath){const pagePath=findPath(rawPath);const page=this.pageDb.get(pagePath);return!page||page.notFound;}loadAppData(retries=0){return this.memoizedGet(`${""}/page-data/app-data.json`).then(req=>{const{status,responseText}=req;let appData;if(status!==200&&retries<3){// Retry 3 times incase of non-200 responses
return this.loadAppData(retries+1);}// Handle 200
if(status===200){try{const jsonPayload=JSON.parse(responseText);if(jsonPayload.webpackCompilationHash===undefined){throw new Error(`not a valid app-data response`);}appData=jsonPayload;}catch(err){// continue regardless of error
}}return appData;});}}const createComponentUrls=componentChunkName=>(window.___chunkMapping[componentChunkName]||[]).map(chunk=>""+chunk);class ProdLoader extends (/* unused pure expression or super */ null && (BaseLoader)){constructor(asyncRequires,matchPaths,pageData){const loadComponent=chunkName=>{if(!asyncRequires.components[chunkName]){throw new Error(`We couldn't find the correct component chunk with the name ${chunkName}`);}return asyncRequires.components[chunkName]().then(preferDefault)// loader will handle the case when component is error
.catch(err=>err);};super(loadComponent,matchPaths);if(pageData){this.pageDataDb.set(pageData.path,{pagePath:pageData.path,payload:pageData,status:`success`});}}doPrefetch(pagePath){return super.doPrefetch(pagePath).then(result=>{if(result.status!==PageResourceStatus.Success){return Promise.resolve();}const pageData=result.payload;const chunkName=pageData.componentChunkName;const componentUrls=createComponentUrls(chunkName);return Promise.all(componentUrls.map(prefetchHelper)).then(()=>pageData);});}loadPageDataJson(rawPath){return super.loadPageDataJson(rawPath).then(data=>{if(data.notFound){// check if html file exist using HEAD request:
// if it does we should navigate to it instead of showing 404
return doFetch(rawPath,`HEAD`).then(req=>{if(req.status===200){// page (.html file) actually exist (or we asked for 404 )
// returning page resources status as errored to trigger
// regular browser navigation to given page
return{status:PageResourceStatus.Error};}// if HEAD request wasn't 200, return notFound result
// and show 404 page
return data;});}return data;});}}let instance;const setLoader=_loader=>{instance=_loader;};const publicLoader={enqueue:rawPath=>instance.prefetch(rawPath),// Real methods
getResourceURLsForPathname:rawPath=>instance.getResourceURLsForPathname(rawPath),loadPage:rawPath=>instance.loadPage(rawPath),// TODO add deprecation to v4 so people use withErrorDetails and then we can remove in v5 and change default behaviour
loadPageSync:(rawPath,options={})=>instance.loadPageSync(rawPath,options),prefetch:rawPath=>instance.prefetch(rawPath),isPageNotFound:rawPath=>instance.isPageNotFound(rawPath),hovering:rawPath=>instance.hovering(rawPath),loadAppData:()=>instance.loadAppData()};/* harmony default export */ const loader = (publicLoader);function getStaticQueryResults(){if(instance){return instance.staticQueryDb;}else{return{};}}
;// CONCATENATED MODULE: ./.cache/gatsby-browser-entry.js
const prefetchPathname=loader.enqueue;const StaticQueryContext=/*#__PURE__*/index_js_default().createContext({});function StaticQueryDataRenderer({staticQueryData,data,query,render}){const finalData=data?data.data:staticQueryData[query]&&staticQueryData[query].data;return/*#__PURE__*/index_js_default().createElement((index_js_default()).Fragment,null,finalData&&render(finalData),!finalData&&/*#__PURE__*/index_js_default().createElement("div",null,"Loading (StaticQuery)"));}const StaticQuery=props=>{const{data,query,render,children}=props;return/*#__PURE__*/index_js_default().createElement(StaticQueryContext.Consumer,null,staticQueryData=>/*#__PURE__*/index_js_default().createElement(StaticQueryDataRenderer,{data:data,query:query,render:render||children,staticQueryData:staticQueryData}));};const useStaticQuery=query=>{var _context$query;if(typeof (index_js_default()).useContext!==`function`&&"production"===`development`){}const context=index_js_default().useContext(StaticQueryContext);// query is a stringified number like `3303882` when wrapped with graphql, If a user forgets
// to wrap the query in a grqphql, then casting it to a Number results in `NaN` allowing us to
// catch the misuse of the API and give proper direction
if(isNaN(Number(query))){throw new Error(`useStaticQuery was called with a string but expects to be called using \`graphql\`. Try this:

import { useStaticQuery, graphql } from 'gatsby';

useStaticQuery(graphql\`${query}\`);
`);}if((_context$query=context[query])!==null&&_context$query!==void 0&&_context$query.data){return context[query].data;}else{throw new Error(`The result of this StaticQuery could not be fetched.\n\n`+`This is likely a bug in Gatsby and if refreshing the page does not fix it, `+`please open an issue in https://github.com/gatsbyjs/gatsby/issues`);}};StaticQuery.propTypes={data:(prop_types_default()).object,query:(prop_types_default()).string.isRequired,render:(prop_types_default()).func,children:(prop_types_default()).func};function graphql(){throw new Error(`It appears like Gatsby is misconfigured. Gatsby related \`graphql\` calls `+`are supposed to only be evaluated at compile time, and then compiled away. `+`Unfortunately, something went wrong and the query was left in the compiled code.\n\n`+`Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.`);}

/***/ }),

/***/ 861:
/***/ ((module) => {

const preferDefault=m=>m&&m.default||m;if(false){}else if(false){}else{module.exports=()=>null;}

/***/ }),

/***/ 3639:
/***/ ((__unused_webpack_module, exports) => {

exports.O=Component=>Component;

/***/ }),

/***/ 5394:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RouteAnnouncerProps": () => (/* binding */ RouteAnnouncerProps)
/* harmony export */ });
// This is extracted to separate module because it's shared
// between browser and SSR code
const RouteAnnouncerProps={id:`gatsby-announcer`,style:{position:`absolute`,top:0,width:1,height:1,padding:0,overflow:`hidden`,clip:`rect(0, 0, 0, 0)`,whiteSpace:`nowrap`,border:0},"aria-live":`assertive`,"aria-atomic":`true`};

/***/ }),

/***/ 1945:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WritableAsPromise": () => (/* binding */ WritableAsPromise)
/* harmony export */ });
/* harmony import */ var stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8311);
/* harmony import */ var stream__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(stream__WEBPACK_IMPORTED_MODULE_0__);
class WritableAsPromise extends stream__WEBPACK_IMPORTED_MODULE_0__.Writable{constructor(){super();this._output=``;this._deferred={promise:null,resolve:null,reject:null};this._deferred.promise=new Promise((resolve,reject)=>{this._deferred.resolve=resolve;this._deferred.reject=reject;});}_write(chunk,enc,cb){this._output+=chunk.toString();cb();}end(){this._deferred.resolve(this._output);this.destroy();}// disguise us as a promise
then(resolve,reject){return this._deferred.promise.then(resolve,reject);}}

/***/ }),

/***/ 573:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var React=__webpack_require__(2504);var commonTags=__webpack_require__(5863);function _interopNamespace(e){if(e&&e.__esModule)return e;var n=Object.create(null);if(e){Object.keys(e).forEach(function(k){if(k!=='default'){var d=Object.getOwnPropertyDescriptor(e,k);Object.defineProperty(n,k,d.get?d:{enumerable:true,get:function(){return e[k];}});}});}n['default']=e;return n;}var React__namespace=/*#__PURE__*/_interopNamespace(React);var generateHtml=function generateHtml(str){return{__html:commonTags.oneLine(str)};};function onRenderBody(_ref){var setHeadComponents=_ref.setHeadComponents;setHeadComponents([React__namespace.createElement("style",{key:"gatsby-image-style",dangerouslySetInnerHTML:generateHtml(".gatsby-image-wrapper{position:relative;overflow:hidden}.gatsby-image-wrapper img{bottom:0;height:100%;left:0;margin:0;max-width:none;padding:0;position:absolute;right:0;top:0;width:100%;object-fit:cover}.gatsby-image-wrapper [data-main-image]{opacity:0;transform:translateZ(0);transition:opacity .25s linear;will-change:opacity}.gatsby-image-wrapper-constrained{display:inline-block;vertical-align:top}")}),React__namespace.createElement("noscript",{key:"gatsby-image-style-noscript",dangerouslySetInnerHTML:generateHtml("<style>"+".gatsby-image-wrapper noscript [data-main-image]{opacity:1!important}.gatsby-image-wrapper [data-placeholder-image]{opacity:0!important}"+"</style>")}),React__namespace.createElement("script",{key:"gatsby-image-style-script",type:"module",dangerouslySetInnerHTML:generateHtml("const e=\"undefined\"!=typeof HTMLImageElement&&\"loading\"in HTMLImageElement.prototype;e&&document.body.addEventListener(\"load\",(function(e){if(void 0===e.target.dataset.mainImage)return;if(void 0===e.target.dataset.gatsbyImageSsr)return;const t=e.target;let a=null,n=t;for(;null===a&&n;)void 0!==n.parentNode.dataset.gatsbyImageWrapper&&(a=n.parentNode),n=n.parentNode;const o=a.querySelector(\"[data-placeholder-image]\"),r=new Image;r.src=t.currentSrc,r.decode().catch((()=>{})).then((()=>{t.style.opacity=1,o&&(o.style.opacity=0,o.style.transition=\"opacity 500ms linear\")}))}),!0);")})]);}exports.onRenderBody=onRenderBody;

/***/ }),

/***/ 8108:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var _interopRequireDefault=__webpack_require__(5318);var _path=_interopRequireDefault(__webpack_require__(1423));exports.favicons=[{src:"favicon-32x32.png",sizes:"32x32",type:"image/png"}];// default icons for generating icons
exports.defaultIcons=[{src:"icons/icon-48x48.png",sizes:"48x48",type:"image/png"},{src:"icons/icon-72x72.png",sizes:"72x72",type:"image/png"},{src:"icons/icon-96x96.png",sizes:"96x96",type:"image/png"},{src:"icons/icon-144x144.png",sizes:"144x144",type:"image/png"},{src:"icons/icon-192x192.png",sizes:"192x192",type:"image/png"},{src:"icons/icon-256x256.png",sizes:"256x256",type:"image/png"},{src:"icons/icon-384x384.png",sizes:"384x384",type:"image/png"},{src:"icons/icon-512x512.png",sizes:"512x512",type:"image/png"}];/**
 * @param {string} path The generic path to an icon
 * @param {string} digest The digest of the icon provided in the plugin's options.
 */exports.addDigestToPath=function(path,digest,method){if(method==="name"){var parsedPath=_path.default.parse(path);return parsedPath.dir+"/"+parsedPath.name+"-"+digest+parsedPath.ext;}if(method==="query"){return path+"?v="+digest;}return path;};

/***/ }),

/***/ 341:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var _interopRequireDefault=__webpack_require__(5318);var React=_interopRequireWildcard(__webpack_require__(2504));var _gatsby=__webpack_require__(2031);var _common=__webpack_require__(8108);var _getManifestPathname=_interopRequireDefault(__webpack_require__(1632));function _getRequireWildcardCache(nodeInterop){if(typeof WeakMap!=="function")return null;var cacheBabelInterop=new WeakMap();var cacheNodeInterop=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(nodeInterop){return nodeInterop?cacheNodeInterop:cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj,nodeInterop){if(!nodeInterop&&obj&&obj.__esModule){return obj;}if(obj===null||typeof obj!=="object"&&typeof obj!=="function"){return{default:obj};}var cache=_getRequireWildcardCache(nodeInterop);if(cache&&cache.has(obj)){return cache.get(obj);}var newObj={};var hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj){if(key!=="default"&&Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;if(desc&&(desc.get||desc.set)){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}newObj.default=obj;if(cache){cache.set(obj,newObj);}return newObj;}// TODO: remove for v3
var withPrefix=_gatsby.withAssetPrefix||_gatsby.withPrefix;exports.onRenderBody=function(_ref,_ref2){var setHeadComponents=_ref.setHeadComponents,_ref$pathname=_ref.pathname,pathname=_ref$pathname===void 0?"/":_ref$pathname;var localize=_ref2.localize,legacy=_ref2.legacy,cacheBusting=_ref2.cache_busting_mode,cacheDigest=_ref2.cacheDigest,icon=_ref2.icon,pluginIcons=_ref2.icons,insertFaviconLinkTag=_ref2.include_favicon,insertMetaTag=_ref2.theme_color_in_head,themeColor=_ref2.theme_color,_ref2$crossOrigin=_ref2.crossOrigin,crossOrigin=_ref2$crossOrigin===void 0?"anonymous":_ref2$crossOrigin;// We use this to build a final array to pass as the argument to setHeadComponents at the end of onRenderBody.
var headComponents=[];var srcIconExists=!!icon;var icons=pluginIcons||_common.defaultIcons;var manifestFileName=(0,_getManifestPathname.default)(pathname,localize);// If icons were generated, also add a favicon link.
if(srcIconExists){if(insertFaviconLinkTag){_common.favicons.forEach(function(favicon){headComponents.push(/*#__PURE__*/React.createElement("link",{key:"gatsby-plugin-manifest-icon-link-png",rel:"icon",href:withPrefix((0,_common.addDigestToPath)(favicon.src,cacheDigest,cacheBusting)),type:"image/png"}));});if(icon!==null&&icon!==void 0&&icon.endsWith(".svg")){headComponents.push(/*#__PURE__*/React.createElement("link",{key:"gatsby-plugin-manifest-icon-link-svg",rel:"icon",href:withPrefix((0,_common.addDigestToPath)("favicon.svg",cacheDigest,cacheBusting)),type:"image/svg+xml"}));}}}// Add manifest link tag.
headComponents.push(/*#__PURE__*/React.createElement("link",{key:"gatsby-plugin-manifest-link",rel:"manifest",href:(0,_gatsby.withPrefix)("/"+manifestFileName),crossOrigin:crossOrigin}));// The user has an option to opt out of the theme_color meta tag being inserted into the head.
if(themeColor&&insertMetaTag){headComponents.push(/*#__PURE__*/React.createElement("meta",{key:"gatsby-plugin-manifest-meta",name:"theme-color",content:themeColor}));}if(legacy){icons.forEach(function(icon){headComponents.push(/*#__PURE__*/React.createElement("link",{key:"gatsby-plugin-manifest-apple-touch-icon-"+icon.sizes,rel:"apple-touch-icon",sizes:icon.sizes,href:withPrefix((0,_common.addDigestToPath)(icon.src,cacheDigest,srcIconExists?cacheBusting:"none"))}));});}setHeadComponents(headComponents);return true;};

/***/ }),

/***/ 1632:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
exports.__esModule=true;exports["default"]=void 0;/**
 * Get a manifest filename depending on localized pathname
 *
 * @param {string} pathname
 * @param {Array<{start_url: string, lang: string}>} localizedManifests
 * @return string
 */var _default=function _default(pathname,localizedManifests){var defaultFilename="manifest.webmanifest";if(!Array.isArray(localizedManifests)){return defaultFilename;}var localizedManifest=localizedManifests.find(function(app){return pathname.startsWith(app.start_url);});if(!localizedManifest){return defaultFilename;}return"manifest_"+localizedManifest.lang+".webmanifest";};exports["default"]=_default;

/***/ }),

/***/ 9814:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
exports.__esModule=true;exports.onRenderBody=void 0;var _reactHelmet=__webpack_require__(4593);var onRenderBody=function onRenderBody(_ref){var setHeadComponents=_ref.setHeadComponents,setHtmlAttributes=_ref.setHtmlAttributes,setBodyAttributes=_ref.setBodyAttributes;var helmet=_reactHelmet.Helmet.renderStatic();// These action functions were added partway through the Gatsby 1.x cycle.
if(setHtmlAttributes){setHtmlAttributes(helmet.htmlAttributes.toComponent());}if(setBodyAttributes){setBodyAttributes(helmet.bodyAttributes.toComponent());}setHeadComponents([helmet.title.toComponent(),helmet.link.toComponent(),helmet.meta.toComponent(),helmet.noscript.toComponent(),helmet.script.toComponent(),helmet.style.toComponent(),helmet.base.toComponent()]);};exports.onRenderBody=onRenderBody;

/***/ }),

/***/ 6313:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var React=_interopRequireWildcard(__webpack_require__(2504));var _gatsby=__webpack_require__(2031);var _path=__webpack_require__(1423);function _getRequireWildcardCache(nodeInterop){if(typeof WeakMap!=="function")return null;var cacheBabelInterop=new WeakMap();var cacheNodeInterop=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(nodeInterop){return nodeInterop?cacheNodeInterop:cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj,nodeInterop){if(!nodeInterop&&obj&&obj.__esModule){return obj;}if(obj===null||typeof obj!=="object"&&typeof obj!=="function"){return{default:obj};}var cache=_getRequireWildcardCache(nodeInterop);if(cache&&cache.has(obj)){return cache.get(obj);}var newObj={};var hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj){if(key!=="default"&&Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;if(desc&&(desc.get||desc.set)){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}newObj.default=obj;if(cache){cache.set(obj,newObj);}return newObj;}// TODO: Remove for v3 - Fix janky path/asset prefixing
var withPrefix=_gatsby.withAssetPrefix||_gatsby.withPrefix;exports.onRenderBody=function(_ref,pluginOptions){var setHeadComponents=_ref.setHeadComponents;var output=pluginOptions.output,createLinkInHead=pluginOptions.createLinkInHead;if(!createLinkInHead){return;}setHeadComponents([/*#__PURE__*/React.createElement("link",{key:"gatsby-plugin-sitemap",rel:"sitemap",type:"application/xml",href:withPrefix(_path.posix.join(output,"/sitemap-index.xml"))})]);};

/***/ }),

/***/ 9616:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2504);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2031);
// styles
const pageStyles={color:"#232129",padding:"96px",fontFamily:"-apple-system, Roboto, sans-serif, serif"};const headingStyles={marginTop:0,marginBottom:64,maxWidth:320};const paragraphStyles={marginBottom:48};const codeStyles={color:"#8A6534",padding:4,backgroundColor:"#FFF4DB",fontSize:"1.25rem",borderRadius:4};// markup
const NotFoundPage=()=>{return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("main",{style:pageStyles},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("title",null,"Not found"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1",{style:headingStyles},"Page not found"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p",{style:paragraphStyles},"Sorry"," ",/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{role:"img","aria-label":"Pensive emoji"},"\uD83D\uDE14")," ","we couldn\u2019t find what you were looking for.",/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("br",null), false?/*#__PURE__*/0:null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("br",null),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link,{to:"/"},"Go home"),"."));};/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NotFoundPage);

/***/ }),

/***/ 104:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pages)
});

// EXTERNAL MODULE: external "/Users/mirkotorrisi/Documents/birsa-sonora/node_modules/react/index.js"
var index_js_ = __webpack_require__(2504);
var index_js_default = /*#__PURE__*/__webpack_require__.n(index_js_);
// EXTERNAL MODULE: ./public/static/svg/ondineMod_anim.svg
var ondineMod_anim = __webpack_require__(6509);
var ondineMod_anim_default = /*#__PURE__*/__webpack_require__.n(ondineMod_anim);
;// CONCATENATED MODULE: ./src/images/violin.webp
/* harmony default export */ const violin = (__webpack_require__.p + "static/violin-928250a919917442bad01f88eced8912.webp");
;// CONCATENATED MODULE: ./src/images/pianoPng.webp
/* harmony default export */ const pianoPng = (__webpack_require__.p + "static/pianoPng-591d96d74e56d70872ef258cbf3feabc.webp");
;// CONCATENATED MODULE: ./src/hooks/useOnScreen.js
const useOnScreen=ref=>{const{0:isOnScreen,1:setisOnScreen}=(0,index_js_.useState)(false);const observer=(0,index_js_.useRef)(null);(0,index_js_.useEffect)(()=>{observer.current=new IntersectionObserver(([entry])=>setisOnScreen(entry.isIntersecting),{threshold:[0.25,0.5,0.75]});},[]);(0,index_js_.useEffect)(()=>{if(!observer.current)return;observer.current.observe(ref.current);return()=>{observer.current.disconnect();};});return isOnScreen;};
;// CONCATENATED MODULE: ./src/context/NavContext.js
const NavContext=/*#__PURE__*/index_js_default().createContext();const NavProvider=({children})=>{const{0:activeNavLinkId,1:setActiveNavLinkId}=(0,index_js_.useState)("");const providerValue={activeNavLinkId,setActiveNavLinkId};return/*#__PURE__*/index_js_default().createElement(NavContext.Provider,{value:providerValue},children);};
;// CONCATENATED MODULE: ./src/hooks/useNav.js
const useNav=navLinkId=>{const ref=(0,index_js_.useRef)(null);const{setActiveNavLinkId}=(0,index_js_.useContext)(NavContext);const isOnScreen=useOnScreen(ref);(0,index_js_.useEffect)(()=>{if(isOnScreen){setActiveNavLinkId(navLinkId);}},[isOnScreen,setActiveNavLinkId,navLinkId]);return ref;};
;// CONCATENATED MODULE: ./src/images/violinIcon.webp
/* harmony default export */ const violinIcon = ("data:image/webp;base64,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");
;// CONCATENATED MODULE: ./src/images/saxIcon.webp
/* harmony default export */ const saxIcon = ("data:image/webp;base64,UklGRoIiAABXRUJQVlA4THYiAAAvXgAbEE04bNtGkmDF+51z/TecSQ0R/Z8AVeRjStKBrx3mBMgkNb0QNL0I2Aco26evB4D/9zyLJ9WRZD+SqmrQYrlQ0LaRY/6gb/2EwLaRJEV1d0/mhvD5R/YmM4hB20aS3PAHuTj2HvV/ArB6YWsXIBTCAW6gwxoWOF0gDJdBAC+vAwvgD0fdDwDCRkUAoCcIXgAgrjGiMDK2CThg1uEcwLCLn8ZQ0LaNlIQ/6/sPQURMAKgs1TbgwAUf5aRJDVBmLkamVjq7mu3t/1S5bb6/mQOLgtVKlteSIZzISZmZmZkZrnrN1fFl/wBmBqvM3DBztA6ZXa1lwa4WdWBmfoXQnqOn17OeJUlyJMnaNlb3iAQFGs4ctJvdWZ0LONRXf+is0Q5jDLvrVGYWyHA335Ik2apt25Z6ZKkVar/+/2eOS60VaiXTvdG2bdq2bWuxlNpa72OMObht27ZtHdu2bdu2rYVfx7Zt+5ylMUZna7U4DIC2bYAsSd2tB+4FdLTtUSRJvxSRUNRVzT3MzObyrjd7q/X2CMxoMZq8azEPUzMXdUJkKmSN1wfIohvZtmtbGWOute8XWD8QMiB5LfLAxdNwz56UI0lyJElq0XPwdfxTCjtdim1ty5bt931xd/fkPgC+IRBZJBvA18hkJmEDcG8fiUXy5PJLc/9cQFDkgB20JUlSJEnmWdW0e8zMzMx8X3o/sW+HT8xMwzMLw9BclS5yA98QSUGSJMFtkzVH+f/vdZDbFNtIkiRJtKjZ+/QX9yY9FLlt22SvtqfGfwBhHyMVAZB/81s1U/P7+JimkzoDEoBd2vO//tVz7Pk75p7GMsQcjReFGEvC7LVRCR27f/Bb7e7zxrdqfP6Yz72Z/t10DgXxd9QQg+KFjQXLrDxtz95/t7be5rPn755d5b0f1Pr+Hh/ci2+pJi0AIsSwmMIA8IwnAtrJS/ey7cXM3NrU/La9n7dy9Zu/g92BCYCJCfePWvMTX35WswNU2BgmJDFP5KnxBMJ3cpOSrKRgEhYPw9KDPDfuth/PIQBe/klkD1BM/P7Hzgc8tD/P+XqPMKZjSCzjzqSM+9RN1LGGOkWSMsOHTT7aIXQI1JSSQYHv3dseYEFlr/H97ULok6PCKAUmdZgIc84+aSYhDzlo1ABGKL7JYF+eaZ7AwIxAANq9ix/654DK/ACqe/WQSM4NACoimHL2Z+Yy7RIIGvWgA0MMCpwKhphaZiZPe07NYQcOeILQ77npSoDK+AAE0zba8rphQCBEZpIT/m8mqQl1lEAqGAIABAadEcBX2mZaOb97V9JWd/Jwlty8QIHI9N5GsT99NYgLQAlyAueYzGYCAAEQo0BCDQIIOTCACoTGJs3bf/k5uy3jhULrvxR23//0FgpUhg+5RAb5bjalbiwA/H30xpBpxxowAmKEEcJiwQbrIYEhAIGAximT+b39wlGhRXmJcneT9wO3ZQdQIOo097rltgkIgUBmCgAEIE4G/aYvw5zyDk1ipyVTfDRCmFCDBIIhjfHZzTd7/x7TyIXdOSr99+Z1KjOB+BpDibGW7uoGRkxeHIioKZmNMt+zkvQhB++oGFObTCWH5DCnZcgQgQiHramVty+SpBDGW+1e+i+9D/c/BrKqWSIbtP2/9pgZCEChZ7p3XAMewEpzjaxAQiQgQLwjG81w0jHny6V8NANxBDC+DNvhfMFW0J18q4uWY7z35olv/n9bVjXTBFjkv3y/sEPMnaKzCH1GDBlK/r9nvuMGmLUvbyv/yufzvzdHqBuEVNzGZ8aSZzgXJOKDuIBh45nbzzrVCHuIxIGF+V5yf910nA56NlgnweBt8y5xPlC65d4l6xipmTDcbVKhTLS+/vf1fyvTofZ8g0d++2UJb6P3hgcZtynhmOdZzgGTOkbji8fY1rZ7E60WnJrtdXHbiku/8Sff//yVt9AzCR2mtRgO/Pb3oeHwXAUhOfEQMIZJmZ1S7eG3mEb0zi17K68Ot93DvnL5e3748bt9twsOh1gr3oVacHZV29f0vq7eADGRY93wT22HXFELrVabjbjO3cHiNoZMqt8CRRYfvLALmBx2OGJCseBMafzGhJprPHD0F/nykH5LMNXtsynGorx32N+NtXWEK2qpyo7HL9v9tzQ4NsfE+Z9mdlXoh17pLdHsI1quB/uPlmtkFjvGJxjW/LvwtzxvIFCSTp94EicWSqOMi/kea7v8Wj8eRMOZadcsHVwdxdgztVVm4d4ea/3QS8mVJ+/rvf7vvViYizdT/9tUP8bWMCvhQmsh7H1g/97iJsYlIgMERIUo+c/gjT43KbwZkH7DpBXsoI5IGTPh7+/zY/vn9RqxZK9qdya87dVcezZtlFuPjmaO7gjbu6HWOLhjUjoIY/Pl0Vt5d1SWjXolC1udwdKT3ItFxHgemQECqkQ78Ps+lEcfoFUh3aZPImgBG5hUqtjc91c65aHVMaehCSMT0ZPlithViRXUxflP3vB3c7jZ4NR8q4PSDQFbap50K/aq7PB6qU6v1XZzume8XYyRt4GI9PE1BsWi+uX5/DihMxyzeembVmg5CHB6MtXq+rvrxy8a61V6bUFmz3efOB3tNTzlQHf5xOt5zHW1nnJ/gvsottr88rc0CEKHL7+Naiff4VaDHu2E9zoXEa1BY6Tf0C2TTOZHnpsUWiRmrRnAZGZ84KRM1k0BZ1b/Vsjt7vTyWcV9KyJO3y2XXu1BChq8BnfuoXe9PuKaOXiWm+PKp20dBxF8eJxW5aX8pUZhp9tD6mkWvRmI55DMIj/6HNUCjoQscQZkephyQnGwLC46Y9Zkd2cKQWqySDWokIb9LXkzODFe8rLe/pfjdhTOEGHvbw2AZI7giF6FVoUe6ER9dBv+WI/GRY4TAZn68UqyTnvqH64Hi/IAFJwAwBlJcBMJfrDB7wU2kE1p2q0ygR4wn2XvsvIuz2u15EqV6/t7b86NjQquscu8HHBJoSGJmZZQjjBJSPnW4LNQkxk0FbkH4/RpPR+CAFSeOHFEQCY+VCO1ZJN7fm5at7bPYD5Egfoq0z72M69W9PKzEmXV6XObO/sXcpYRB2pHD1s4QBGJklYg8UOapKwyoGCMSh91kps0L+dB3aInDBBSud/TPrNtPI8uQ+dUxou+5O1CH1OeAjMowL6FeeOdvb93zeUa3cq0/LncSo5j/povy0A4ABLdNIFBJQucn470b6EiQaae6dMmo63W5ANzrFSoBEnG3Cq6KZZ8wkwCt4iNmQ966uv3fcvMgLWgwOwzFf5vz9NaXm3Hth6ICrnRzHBlMQGMS4lN4hxMkMmD51WUn36PTtMCetqZtxKXcaiaoUNuFmGVUV7KxM/IkIcylBOZNHEm62Tf8vaVD/1Yffr6G3s63Hfw2hSvlnIrqsGv5u94rBJEkFhObAwoFBK69vjff8JJpF0C6jJi6r8yurmPF/2knzqV40yNpCEbP+MHWaIhkjjIUG3syabjr9SDYZr4Hz7KVGIuXh4T1vedrHQxQm6lF4/HOAzvTftNwXHcxRACB8P5VPYRbpHPR9oXz8fgo+DnR872uLxHSyUNDJjRA05wBkuly1t2r+t9/fV1v2m/X6674TeMiyRgrZX0Tpn915/d+Mi9xQw5Sq/m8RtvPLn23SfcbFzpNwkgJzX/v7VN/PHnw+5/zW3x37M/+VeVMh4gmOwd7uF63cfVewkuHA7ACpRCYjlCIHwYvkAZZalb3p33+9sxN/H+fdG7M9TIBQKwFtQJuj/NupR4bckNuUX7t6PJloe37C3ahW2tEKkCQMfDSuevO9fUcpWxIpZoINIEEV9laHAD7ufS69758boHzAUlB2IYWIObopkiwijQuWdvqiGGJEI+id5RnaI/5CnFhIyiiRwhRuTK+5WEk2vOoEaagMEd8FCPCfY5uSqu0qrOGNBe/umRaYYXGbY5dH2cl7zuAb1wxutE93XojN0AWLRFeAWgpQv2SJqnkbz+5MSTpsgeAVgLokLhHkm4r+4rBnKUleUGVGe773OHt+BIZhiWSsIxzUQzc8/lSz1tqflW4BgsriRTHKkzsUTWWYIjx+2CnDNn65FmKTRkIukNOQKwXC0js1yKzVB0hlXGXcQdNFCAtVNE6YQmMJGjxIQtl6HwVDfsvfyzYfCZB/AFM38hcpQ8wceb1+2Z/Zjs5J8c1T4bryRTHVpdSbuJG/rsSHRLFYdq/948UlKAJuwIdGKKZZy8fGdrWlbvtBsZ78X/ep8y0bsDEHOOxUBu5Wov3jhajnK1ZzIU7kEjIQKmLrPJz9+ed/76x/O6L37Lc7eP90XjvbFJpFoIcomhzmKCQTMUT7IbmRAuldz+ETh/iW8V/Kn8+DnlZ/NELMaJHsOFJPAQ8llGkWL0hCqoAN7yHYMJn+wcHxzoHtNAFDKSCQ8LuVkIHX1nAHmADIhUFZALRJ02RSiyTQBnMUZ0qN0Yp9rUMt5Ea5APfc4B1SJw+6dSSYAKqmCygcwXA9k0FFAEddABk+VkkPR22N0wR9J95hN00FNuj0CNLBEMANTILpKHKOAReAbu+TMu/o/7YAZVUQFeDiac8Sy9NoIOW852R4PKJvzOlE/vb77w/P72r/qc93KfnuvowRzRgR3AgBgjEkJHQMCgKovGuMM8V14/rsUgBxHnoFGzwvMDU3/NO5ze1nti5ANzR2u8tXsHFRA7QePU4PYjc9d1RlU0CxVp1Md48eTZ5dLUDF8YYo9JAIXJO02sFN2QME8xP58Z2AEIqCKRf/pW2nqCAmBRdb2HpQfkbtjd71JGjHgGNwUPmLBpJLtT+3tVWjGpyCUS2AnsEECciwIKqqpeHSHiquaO88H3kceXtM+NzvaNJlMkzk7PP5wfOX/Z3+2svjl6smzT6gSonRDuEYVCjJzFQABKMBDRnye+5jhR6cu1yybQzXQi22W82z915/35oZ/d+Y5cLHKMIEHsiANHetccmwKwgRGLQSVMoQSNiGcg3HS6btho7CZo6nBrTDYJYAcgwAySo0CdoCqAW7jcASkO5QKAQUMAQRk17tUp9rquHbNXMtODfpD+EITH9VGFmfPa3HeAr8lyhqpJfpa5OfeFACxJExECz553lKAYP+gGAuhQe8KlXnKXefm9LJ0eq7G39g0KsC//JED94Gfz3eFjaeTaOp/TM/A+GWpAhAdMJYwAqKqa+iIagc1Y/luPI1Az+6CVoPTK8Oqpvry/01Mvea/3XK8P9u9s1piOUMDLPz0iwKt/ke/e8/NvMRLVnVGtvvdsvPTln4TNCksoUDlSE0lAwYmK3n4FsJxNfeJnMSPBSbeDjprl8vOzipMj77cy8mGhfOwJ9gvsD9MBO1VGd+tDS4lcFRVN1BMrvKeZjYAAldF1nTYg8Iwc7qtnQQFUKii0nE39mfXEBwgzEDBJWSJHZ9xbsVG0KACE/RrDZjOe+/r2MRfEv83W4QpgXSxn0RWo1gKRDQg1ikmQNE9wAGhWRGBI9HP9aYsED7kIAKwJzESoII9LWK4yACAbNJ9l/evH7c7tz+cdDDNKgvtoBi5k4L7uXEI2ahD8KDnSmXNfwCLUm4zSQJo729ttfpA+Q7lZtjuAcXPIPK2f60tb/xDxjZojyfg12tfIGilZ9g63G7d+c/21ezs3VaskqA7hILgpwLTeeZieBRivoaJSMkJXIylQAP1Ug/mLxnX1efV7eQY+S/Lx/3O9oOwTPlvtH14ffuTw+pTf3/lu8eyww9igPQmKxAVJiOu6WHn1xNUWOgXofuGEgCpihXEqi8YpIG4D3shc6TqJGJwgVFsgbRBs3bQJh8oaFCZNMpj/Hoyz87IHQQPpPwjgNgwoukmf/Y/7zP3SN52YeegGVAu0kQsyxQanOCCYPvEWKgN5NIBJUT3mAFjKXxEabRSjRJuyRwiAwHL4/uR0XxMzw1sPD/dOpTepSXqD/pTfzmP8v/uOo9ynmdBBYCpckqq04gT34hYjNJyo9H2CQ1SXKj8SRaIco4BC6DRBSqEgqKgpSFEU1AAw398YuVR1XSb2VeHy2Gy90yvMwMd///Zug5frp49nPWCrDRNkxq7wOHWw1e5WJphenDIN6wVyKn33ZJPgeymJqJyYgARh0NIJAlgRINTx4AsYgJqifqme26Nl3Q7PO1o31vvZLVDP/vPbR63O+bbuv9d+8snfel/9b4Pc+6MhtDEzBD5o0IkD3RpLROrej7WmHKPgwAkkjlcduB7a0f78Tsxd45fnnfnPrmusivSX/HM+u5l8xfIc6Uf7Y/41/6QvRS1dlJENZRBk8BMvKgimLXUqZe2HexYRyeBAs6gqHYJACRIP0fYfslq7sdp+b7tMf/l/1repOZ9+dGOlyD9aG9kMjpqSimd4h+ehjB8qdeCMuCEcAUClerMW0br9M/adrmNVMLgFEn1SCIQAClKBAKqKiiBduDx2B9jWmF9PUst7nss4VqNX0fxn5+sg+VAymooHs/DCB5z4jc+owwHKqQACpLprE5PU2IvTMGGAKqqqT4IICEkAKjAqIAAVgFVkg3YTS6NOT9aFxtFn+WsUTmjoEd7HnIcPvOEMZpyocMJ6oMJELBCpPk7//Jk8JAMFBAKnsAoUB6oKhgSGGipKucHNH3pEgXGKZbfGv2oMEhrLX5e73DiBMMGvMa/wgQ68hDsazECtuAEViQS4pupUmkluf2T1dO6DAgKBqqobB9wpIBFiRpYxAEYZAVP5wuWLYRgw9t1vdIutiZml8dW1dxGIsLTxK2aHDyOT4RmEUHxFFSgAjRiqRZrJ7WNxtKjBKW4gMXCVaMIBEgrUiXhCIdCSNvlr0eDmD0DpZGBdbGcMErpCFJ/7hjd/cwzjF298YnbMGbMP79AOBRbZDlKAZRjBEC0CpJaswZEAIhigAqKCQNFyOSwAgmFsIVAnZ/S//3J4+uI/iPjujyY8lzwPnsVCYJ32JhJExkXJoyGWVLTHHUerOZgITTdipFJ7nAbpPj2i8Lrux4CgAilAFIRMi6gBE2XqDouHnU54f6oLBRD7CpAoLFVRseSbfzhqhFIoCA2NES6MyKbFC4ErHUDrv6SUDKgZ4HiHBsABsEQeBC0wFnVAQtKWqKNlYCjX3CHCtwL+SAAFKgDT+GfNji9KJSMCwgVuSGiogB7VjfhkVJEIQaWjgNYj8k9P7uYEArAyJJBGBkGREUp0mezEQJLcZP81BVilJQgWKGhiF981PRpVuBTCDgKjZAawIDKaFjseFJxggeVEKn3wAjVBxtFErRPAsvDRiS8foEhoKiXGTPo0eEwnlbL1IxLIi8QbFFQF2IVdY7rHUQQiGsdNYjPJ/D3dr3oyyH0skxsCElSRK+RVpaE60QION8gJU7CiKhIJjQAWRFQohmdmZk6sx5eM6z99/Iguiacv8vW3wsIUACVW9jVfigwVURwrPRlh28nB88+2yrAvy0rvdSaNI6gGFaKIQ38JUMPvAmqbUNrcMffbTrAAoBxggQwiVADKxxQ5FBrCkD3rr53zvgnROX7E457Wo84NQsFw1KYsNYVwKOJowDu8Tf329/eVfR/9/9+F//9Z+f3TvGmIu3EHQRNSbEBQBQBi2HFR+Ro5Aef5pwAuLLewSBDKhyIFZKTQlOPDXrFMCf2X81kXfb7/1NO+PF/tv67veHCOQcGFH45KVRRKVlQM5F2yYfvu95+xd4f9+vstrp2uaoNIWjxUoAKBE1BIWSAghh5B8INUh1uI6SSXEAAgMBBqwYKQgQzu8Z70rqlE19O9huT9M3s7RNAwBvY5bRQRQYEMGxYynHnA+ZqvDbBQRxrTvR6YQZAOPJoPgBd0QCp4XvTTeemQh4CoUTnKIUQ5casAJEzgwXxcQCJCAHO1nn17jHPmTK+sJ/ambkIY7xzn6Xy4OETICsWCUCHPPOfXTjJByQeY6/To3tU3wUIBQ33yAEIFPGBaW378up/26a/4JIYbODeIc29FR5MjOEChKq6alyMTEBKc4DvP+7zYbRgHXNg0OrOdM9BiutIgAoGCEiQMMElzLbMdIEyp6yHvydu5QgrMSHNcjikkACp3y3njev3s4R89HzKcrE+AJDmhCgQgEa2pUaQABuFiANV68L0PoTvehJ12Z68ckhoMcwQFvpDGB1FCBqYyYTuslNKwquvO9qr3wFtVFAJDfYpkEa51lo3rAFptHGlzXr/54+GLxDDJAAuITqIMUY6dFBWcoKq2cwEr1FwURAnMVene9w6FPTwTORM8Y42XIR+lEECsCG2MzgCYUE4IbShyqDnf7rTX7LntqiAgYGDWJ592Pkj+TFxOkINOO3H2cOVVJGEYrBK4k5Ig5QcBwLSYYggUlxqceIpEvqv3aYQ6Y0lRygZmJArGIFZzDrrNPIMcJTYxpG32J/vDQ+e5t6ftmtBRAqjjnT+cF8iPOX3YTw52vGXQErobr2QAOUQogCKnTioixcx9c4ECwGr0V4vgdgbCM6BNPUrQKAcJgyYEBILBshb08X2/dP4zaxKHMcKcJuzJubt3Ex1BCAVGG/Jh8q4f6znjcLXzDLl4qVwLtaaBNlRLOkmZyEQxVwUlAhRXjZ6Mjwsdn404gfUgFQqVCgIgkEHkSp82P+2+/m4hLHfmmdwc9DSNehRcQadNEKQUmV+SV+Z8kyRyguz98svqlfTxyfu6cKW0aiCfRA6jFhETQiLe5W/zwSmoyiQOaB+IIKgUc2KUYoClxxcCpegoOun2bX3ez/RA2sb8pIV69VYvlaSNIoqaT/es17JWVFLTqXJQu/52L73/7Yfc+tz/XR/9pP1xuRMg2uQwmENCSaJ96G/kRC5wCxP2NbkDDUQgEBAkQlYsYAARNZXCpY/Pl/fz70XpzVE3XZtqP77ThgECIqhreqcsrprPke8xp+5bfm+pDq85dlz/f8OH/YXP/N/1SbWbBoij1DDoU7gFuP2752ddlAICMGRf7B3LqZlSGEBcAgRSOEVNn4Xuv5NvvmODTnoS2uCYMFnv7voM6phPTXWqdbR3udnLeUYynfNsNHb+Y/nt/oKo5xIUiGFai11UmQ568y5Xet1/XkkJAENtTBviaNFOaRSkcQkqgksnNX3Ht/qmLHXDrwZ1Xe7Pw1b/gYhAFLid+9bJXseeRjnMr/7vHr+/OjG9chCzcMJhOn7oX/xp238Lyg5TchMRPyrn5Wc2XnPrrr892cIXwMw2GAuTCEsPnGAlEFBEUFxCh6/CHXVNS1/ONupuPq95d92SILDQ5mKlubqXar5RTO1JrTo/7Vqv7EyzmdeEUCxFydQ//LkD/UnUbUxDqMYs701u2fLytj320W9W6xhTgLXBzrABRs64WKG0FTUuRY3vUtNRqM659Xu3n81J1y3trgxwhwHDFjkZq2pYMbGrVSX93+tq/+nkvJ4V9TUJp8vSS/BE3tqBfhs1TLhBxcy9wx/7SLan7/vv+X7+dyYlQe3N4kyACNepVAkBohCJUqUoqkL1eze2ebivsyfcQTAImm027XgcbLrV/tQvc754rq234GXv+6aqT4+iqZzbP8IhXP/dgmkYMwvUaMC+dPraQTayXtvusb94oG1lQDO/b2urPSjO+M8RiqBUMkUNCJeazBerg79DLswRpGXM5bWrZhDV4SLbqeqv3RcP817XaZRUyaN6R+nhon9/Xa4v2rff2wxpldVo4Ci8u534274ovsz9nDHPfqCN7qE8Qx+YO8/EYgYK5Cjl5GCY41GLAZlLBiQEDEAFHDDEo5JIt9np7JRSUIgRAzNjnrZvzn1JD4UearclP8o1pvLXtq33Vh+gFilQdihcyaBYjnFDORfI68y/usdaHC/syV6UZ6J52kuwgwkFSZATwhwHEcxJ7AkHoIY6JCqls8a5Ccs9WccXCJuIEVnHDSejiAPWI0+P+N6iT/sC/aNMb2Ea3jg8yaA57LideFtPpHUEc7Y2n9L+Uh78YDa0FBuE1AiIk6XCmFObKcKiEcCgUzoDM3/5zdz0DDnecIlKkynYw/+zi0X3jRj98VqIa5fi2dJh8WISBOgjxtCuc422xUH7xanrHMPriO2D6N/rGeaVpQcZZClnBiEJg1tNCjKgIaevZI5zJM/xkCeDskhuMdc4i2THAFhaTC335Y6OF/t9AMgIlbVIVgfq8L6cYmwwLhEg0lg5OkyCccBhvH87ENceilgQnyi+a8gOuiMzMgycBTNVnW7VJASxAANGIJcGBDeWq2W+3xEbzZ2cGzB/2YI8QcdAg+m4v2H+O9O8e5PLgHL2frMB38C/tinG6MkIhpRMsoAErcEifjYKGTkWBgVgIXn1ZjAZv8hQJGvu0m60apKlI6nE/0QA8Zbl1mS6ht3BrD2rzyJZ4iRQgCZE6smefv/afBOreeeRy5JlPd9UUZmyn6Q/skASLUdr0lJbubiBNv4gdW6je+0Q+H9k+IS1d+Uz0dk6E7/CQc1oNlldq7XlDteYWTuXSgKsbO0z3Q3Xke1p+92l2v6zO4cq+0iixkBNpmB23GRrK05/yLLoN81IVn5LFvQflCpME9EPkAFSsz8XiHk4XfM9k4+o6CfyfKPWrXzSb+ncznSmHmbMMqotrT4LWngt7K5fA6lI1mSmb6MaPft1qNnfZtXgZpn7BND0TJtZ30P/9TnWdR8/LyW9tCIp/SR9f/4Kv/w39A///JNKPssQvU0FZIquc52okt1IFQ1bB4oGk2NxPLk4nG+1r9cDGWdVV8SBCwoEodyEUyAFgYmq0oELk9CBQQUSIngql6pgPjXr3NZc/MRm//1jr2ZCskPZKrbEir3W2r52n3/WONjk2bpMNeaATkjTQ10gu0R8q2F3S0Fz7CYkm/38/9Fjv5/2+3eMecTZWnd7EKcq2pMBkmACF1wBWCtAsAgieMhVFUMFe3rMtWNXug6zf+mm1l9I5EqXvWEHrklWLGu1vF/BrMS0Abtt9vcxNZhBB5WuYbJKxAyFi4QOyWIAyRpbzfrmtX8iyNnpATOVRzo1T+xNj1it2EhsiW5FXDA4Iatyykc+jMZSk45JVGNd0tt0z78P+vm3O6u/1ZVLw4TaW2arrWtRuQqXXGnZumath+0Muxr7F9MfyfpOrcaGROfmoxltgmJmLROzJ0ZO0qk2YLrcvVZ51NjMw6nNI5XeLS5MguEUMtZU5/8j+Q9uvU1Vb1vv/m1Lb4vKiqJ0Kd3TaXQysiM2pqy0XInKVbjONTyvkvPXXt7brTE1qDqVid+2SfiEoyFklpu9du1gr+W0NH2NqBnIbkQDKaakJi6LR84lj+hMt62k/7HW/H/ESkx0KUy4KdApKV0tkXRdnYXsjb0zZcOua1GuonUuC88/V7xZ9+5s8uxqzIfooDMBZIG3UONESOSfHt1hy5W1Uy7Z68CJJbPgsRboHVgGokEHmoIIJgTQ05lZEVTTTVLST6d662zPkC7Ya7sbNrquDckqWnKt5bp6fl6dvbW5hG2R/jc66Jn9cWiJaFPis0lPW2Wt1Tp3KV26euBsFqwHri519ig4YNNYBscOZQX6EGPPkA66sacRrM5l1kyOPRn2yXLtxTVbs2ZLLz8rsVmJW5sK2wYTmAKKCSA7voV+hP0n37v+zK3bD/n+3yrDBgkG0EZgtNYnmYwJUKD79IgaEXNIB30EqsQsmDt0MO9nf5L5LfQleuZOOREgRiCttWCwoFkLgMiD6AM66KBGIzuaptbpoNvRInNAgQJ2AImwFgTIEWggp0lNNgkAFAA6qBFwAf0o9STqNuq/z8BaUMDOIZEgnk9cSV6GIwBAWQuAWsQhKqXbpr12BBDx3ziDAIAC/j8wAA==");
;// CONCATENATED MODULE: ./src/images/pianoIcon.webp
/* harmony default export */ const pianoIcon = ("data:image/webp;base64,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");
;// CONCATENATED MODULE: ./src/images/guitarIcon.webp
/* harmony default export */ const guitarIcon = ("data:image/webp;base64,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");
;// CONCATENATED MODULE: ./src/sections/HeroSection/res.js
const instruments=[{imgSrc:pianoIcon,alt:"piano",title:"Pianoforte"},{imgSrc:violinIcon,alt:"violin",title:"Violino"},{imgSrc:saxIcon,alt:"sax",title:"Sassofono"},{imgSrc:guitarIcon,alt:"guitar",title:"Chitarra"}];const quotes=[{quote:"Il 20% dei ragazzi impara a suonare.",secondline:"Il 70% degli adulti vorrebbe averlo fatto.",author:""},{quote:"Se apprendi la musica,",secondline:"impari quasi tutto quello che c'è da conoscere.",author:"Edgar Cayce"},{quote:"Quando suoni scopri una parte di te",secondline:"che non sapevi esistesse.",author:"Bill Evans"},{quote:"E' fuori moda ammetterlo, ma suonare",secondline:"ci rende felici e ci fa sorridere.",author:"Chris Hesse"},{quote:"La terra ha musica per coloro che ascoltano.",author:"William Shakespeare"},{quote:"C'è musica in tutto, se sai come trovarla.",author:"Terry Pratchett"},{quote:"I fiori, la musica e i bambini,",secondline:"sono i gioielli della vita.",author:"Pyotr Ilyich Tchaikovsky"},{quote:"Sai cos'è la musica?",secondline:"Una connessione armonica fra tutte le creature.",author:"Maxwell Wallace"},{quote:"La musica è intorno a noi.",secondline:"Tutto ciò che devi fare è ascoltare.",author:"August Rush"}];
;// CONCATENATED MODULE: ./node_modules/gsap/gsap-core.js
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*!
 * GSAP 3.8.0
 * https://greensock.com
 *
 * @license Copyright 2008-2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var _config = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
},
    _defaults = {
  duration: .5,
  overwrite: false,
  delay: 0
},
    _suppressOverwrites,
    _bigNum = 1e8,
    _tinyNum = 1 / _bigNum,
    _2PI = Math.PI * 2,
    _HALF_PI = _2PI / 4,
    _gsID = 0,
    _sqrt = Math.sqrt,
    _cos = Math.cos,
    _sin = Math.sin,
    _isString = function _isString(value) {
  return typeof value === "string";
},
    _isFunction = function _isFunction(value) {
  return typeof value === "function";
},
    _isNumber = function _isNumber(value) {
  return typeof value === "number";
},
    _isUndefined = function _isUndefined(value) {
  return typeof value === "undefined";
},
    _isObject = function _isObject(value) {
  return typeof value === "object";
},
    _isNotFalse = function _isNotFalse(value) {
  return value !== false;
},
    _windowExists = function _windowExists() {
  return typeof window !== "undefined";
},
    _isFuncOrString = function _isFuncOrString(value) {
  return _isFunction(value) || _isString(value);
},
    _isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView || function () {},
    // note: IE10 has ArrayBuffer, but NOT ArrayBuffer.isView().
_isArray = Array.isArray,
    _strictNumExp = /(?:-?\.?\d|\.)+/gi,
    //only numbers (including negatives and decimals) but NOT relative values.
_numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
    //finds any numbers, including ones that start with += or -=, negative numbers, and ones in scientific notation like 1e-8.
_numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
    _complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
    //duplicate so that while we're looping through matches from exec(), it doesn't contaminate the lastIndex of _numExp which we use to search for colors too.
_relExp = /[+-]=-?[.\d]+/,
    _delimitedValueExp = /[^,'"\[\]\s]+/gi,
    // previously /[#\-+.]*\b[a-z\d\-=+%.]+/gi but didn't catch special characters.
_unitExp = /[\d.+\-=]+(?:e[-+]\d*)*/i,
    _globalTimeline,
    _win,
    _coreInitted,
    _doc,
    _globals = {},
    _installScope = {},
    _coreReady,
    _install = function _install(scope) {
  return (_installScope = _merge(scope, _globals)) && gsap;
},
    _missingPlugin = function _missingPlugin(property, value) {
  return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
},
    _warn = function _warn(message, suppress) {
  return !suppress && console.warn(message);
},
    _addGlobal = function _addGlobal(name, obj) {
  return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
},
    _emptyFunc = function _emptyFunc() {
  return 0;
},
    _reservedProps = {},
    _lazyTweens = [],
    _lazyLookup = {},
    _lastRenderedFrame,
    _plugins = {},
    _effects = {},
    _nextGCFrame = 30,
    _harnessPlugins = [],
    _callbackNames = "",
    _harness = function _harness(targets) {
  var target = targets[0],
      harnessPlugin,
      i;
  _isObject(target) || _isFunction(target) || (targets = [targets]);

  if (!(harnessPlugin = (target._gsap || {}).harness)) {
    // find the first target with a harness. We assume targets passed into an animation will be of similar type, meaning the same kind of harness can be used for them all (performance optimization)
    i = _harnessPlugins.length;

    while (i-- && !_harnessPlugins[i].targetTest(target)) {}

    harnessPlugin = _harnessPlugins[i];
  }

  i = targets.length;

  while (i--) {
    targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin))) || targets.splice(i, 1);
  }

  return targets;
},
    _getCache = function _getCache(target) {
  return target._gsap || _harness(toArray(target))[0]._gsap;
},
    _getProperty = function _getProperty(target, property, v) {
  return (v = target[property]) && _isFunction(v) ? target[property]() : _isUndefined(v) && target.getAttribute && target.getAttribute(property) || v;
},
    _forEachName = function _forEachName(names, func) {
  return (names = names.split(",")).forEach(func) || names;
},
    //split a comma-delimited list of names into an array, then run a forEach() function and return the split array (this is just a way to consolidate/shorten some code).
_round = function _round(value) {
  return Math.round(value * 100000) / 100000 || 0;
},
    _roundPrecise = function _roundPrecise(value) {
  return Math.round(value * 10000000) / 10000000 || 0;
},
    // increased precision mostly for timing values.
_arrayContainsAny = function _arrayContainsAny(toSearch, toFind) {
  //searches one array to find matches for any of the items in the toFind array. As soon as one is found, it returns true. It does NOT return all the matches; it's simply a boolean search.
  var l = toFind.length,
      i = 0;

  for (; toSearch.indexOf(toFind[i]) < 0 && ++i < l;) {}

  return i < l;
},
    _lazyRender = function _lazyRender() {
  var l = _lazyTweens.length,
      a = _lazyTweens.slice(0),
      i,
      tween;

  _lazyLookup = {};
  _lazyTweens.length = 0;

  for (i = 0; i < l; i++) {
    tween = a[i];
    tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
  }
},
    _lazySafeRender = function _lazySafeRender(animation, time, suppressEvents, force) {
  _lazyTweens.length && _lazyRender();
  animation.render(time, suppressEvents, force);
  _lazyTweens.length && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
},
    _numericIfPossible = function _numericIfPossible(value) {
  var n = parseFloat(value);
  return (n || n === 0) && (value + "").match(_delimitedValueExp).length < 2 ? n : _isString(value) ? value.trim() : value;
},
    _passThrough = function _passThrough(p) {
  return p;
},
    _setDefaults = function _setDefaults(obj, defaults) {
  for (var p in defaults) {
    p in obj || (obj[p] = defaults[p]);
  }

  return obj;
},
    _setKeyframeDefaults = function _setKeyframeDefaults(obj, defaults) {
  for (var p in defaults) {
    p in obj || p === "duration" || p === "ease" || (obj[p] = defaults[p]);
  }
},
    _merge = function _merge(base, toMerge) {
  for (var p in toMerge) {
    base[p] = toMerge[p];
  }

  return base;
},
    _mergeDeep = function _mergeDeep(base, toMerge) {
  for (var p in toMerge) {
    p !== "__proto__" && p !== "constructor" && p !== "prototype" && (base[p] = _isObject(toMerge[p]) ? _mergeDeep(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p]);
  }

  return base;
},
    _copyExcluding = function _copyExcluding(obj, excluding) {
  var copy = {},
      p;

  for (p in obj) {
    p in excluding || (copy[p] = obj[p]);
  }

  return copy;
},
    _inheritDefaults = function _inheritDefaults(vars) {
  var parent = vars.parent || _globalTimeline,
      func = vars.keyframes ? _setKeyframeDefaults : _setDefaults;

  if (_isNotFalse(vars.inherit)) {
    while (parent) {
      func(vars, parent.vars.defaults);
      parent = parent.parent || parent._dp;
    }
  }

  return vars;
},
    _arraysMatch = function _arraysMatch(a1, a2) {
  var i = a1.length,
      match = i === a2.length;

  while (match && i-- && a1[i] === a2[i]) {}

  return i < 0;
},
    _addLinkedListItem = function _addLinkedListItem(parent, child, firstProp, lastProp, sortBy) {
  if (firstProp === void 0) {
    firstProp = "_first";
  }

  if (lastProp === void 0) {
    lastProp = "_last";
  }

  var prev = parent[lastProp],
      t;

  if (sortBy) {
    t = child[sortBy];

    while (prev && prev[sortBy] > t) {
      prev = prev._prev;
    }
  }

  if (prev) {
    child._next = prev._next;
    prev._next = child;
  } else {
    child._next = parent[firstProp];
    parent[firstProp] = child;
  }

  if (child._next) {
    child._next._prev = child;
  } else {
    parent[lastProp] = child;
  }

  child._prev = prev;
  child.parent = child._dp = parent;
  return child;
},
    _removeLinkedListItem = function _removeLinkedListItem(parent, child, firstProp, lastProp) {
  if (firstProp === void 0) {
    firstProp = "_first";
  }

  if (lastProp === void 0) {
    lastProp = "_last";
  }

  var prev = child._prev,
      next = child._next;

  if (prev) {
    prev._next = next;
  } else if (parent[firstProp] === child) {
    parent[firstProp] = next;
  }

  if (next) {
    next._prev = prev;
  } else if (parent[lastProp] === child) {
    parent[lastProp] = prev;
  }

  child._next = child._prev = child.parent = null; // don't delete the _dp just so we can revert if necessary. But parent should be null to indicate the item isn't in a linked list.
},
    _removeFromParent = function _removeFromParent(child, onlyIfParentHasAutoRemove) {
  child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove(child);
  child._act = 0;
},
    _uncache = function _uncache(animation, child) {
  if (animation && (!child || child._end > animation._dur || child._start < 0)) {
    // performance optimization: if a child animation is passed in we should only uncache if that child EXTENDS the animation (its end time is beyond the end)
    var a = animation;

    while (a) {
      a._dirty = 1;
      a = a.parent;
    }
  }

  return animation;
},
    _recacheAncestors = function _recacheAncestors(animation) {
  var parent = animation.parent;

  while (parent && parent.parent) {
    //sometimes we must force a re-sort of all children and update the duration/totalDuration of all ancestor timelines immediately in case, for example, in the middle of a render loop, one tween alters another tween's timeScale which shoves its startTime before 0, forcing the parent timeline to shift around and shiftChildren() which could affect that next tween's render (startTime). Doesn't matter for the root timeline though.
    parent._dirty = 1;
    parent.totalDuration();
    parent = parent.parent;
  }

  return animation;
},
    _hasNoPausedAncestors = function _hasNoPausedAncestors(animation) {
  return !animation || animation._ts && _hasNoPausedAncestors(animation.parent);
},
    _elapsedCycleDuration = function _elapsedCycleDuration(animation) {
  return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
},
    // feed in the totalTime and cycleDuration and it'll return the cycle (iteration minus 1) and if the playhead is exactly at the very END, it will NOT bump up to the next cycle.
_animationCycle = function _animationCycle(tTime, cycleDuration) {
  var whole = Math.floor(tTime /= cycleDuration);
  return tTime && whole === tTime ? whole - 1 : whole;
},
    _parentToChildTotalTime = function _parentToChildTotalTime(parentTime, child) {
  return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
},
    _setEnd = function _setEnd(animation) {
  return animation._end = _roundPrecise(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
},
    _alignPlayhead = function _alignPlayhead(animation, totalTime) {
  // adjusts the animation's _start and _end according to the provided totalTime (only if the parent's smoothChildTiming is true and the animation isn't paused). It doesn't do any rendering or forcing things back into parent timelines, etc. - that's what totalTime() is for.
  var parent = animation._dp;

  if (parent && parent.smoothChildTiming && animation._ts) {
    animation._start = _roundPrecise(parent._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));

    _setEnd(animation);

    parent._dirty || _uncache(parent, animation); //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
  }

  return animation;
},

/*
_totalTimeToTime = (clampedTotalTime, duration, repeat, repeatDelay, yoyo) => {
	let cycleDuration = duration + repeatDelay,
		time = _round(clampedTotalTime % cycleDuration);
	if (time > duration) {
		time = duration;
	}
	return (yoyo && (~~(clampedTotalTime / cycleDuration) & 1)) ? duration - time : time;
},
*/
_postAddChecks = function _postAddChecks(timeline, child) {
  var t;

  if (child._time || child._initted && !child._dur) {
    //in case, for example, the _start is moved on a tween that has already rendered. Imagine it's at its end state, then the startTime is moved WAY later (after the end of this timeline), it should render at its beginning.
    t = _parentToChildTotalTime(timeline.rawTime(), child);

    if (!child._dur || _clamp(0, child.totalDuration(), t) - child._tTime > _tinyNum) {
      child.render(t, true);
    }
  } //if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly. We should also align the playhead with the parent timeline's when appropriate.


  if (_uncache(timeline, child)._dp && timeline._initted && timeline._time >= timeline._dur && timeline._ts) {
    //in case any of the ancestors had completed but should now be enabled...
    if (timeline._dur < timeline.duration()) {
      t = timeline;

      while (t._dp) {
        t.rawTime() >= 0 && t.totalTime(t._tTime); //moves the timeline (shifts its startTime) if necessary, and also enables it. If it's currently zero, though, it may not be scheduled to render until later so there's no need to force it to align with the current playhead position. Only move to catch up with the playhead.

        t = t._dp;
      }
    }

    timeline._zTime = -_tinyNum; // helps ensure that the next render() will be forced (crossingStart = true in render()), even if the duration hasn't changed (we're adding a child which would need to get rendered). Definitely an edge case. Note: we MUST do this AFTER the loop above where the totalTime() might trigger a render() because this _addToTimeline() method gets called from the Animation constructor, BEFORE tweens even record their targets, etc. so we wouldn't want things to get triggered in the wrong order.
  }
},
    _addToTimeline = function _addToTimeline(timeline, child, position, skipChecks) {
  child.parent && _removeFromParent(child);
  child._start = _roundPrecise((_isNumber(position) ? position : position || timeline !== _globalTimeline ? _parsePosition(timeline, position, child) : timeline._time) + child._delay);
  child._end = _roundPrecise(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));

  _addLinkedListItem(timeline, child, "_first", "_last", timeline._sort ? "_start" : 0);

  _isFromOrFromStart(child) || (timeline._recent = child);
  skipChecks || _postAddChecks(timeline, child);
  return timeline;
},
    _scrollTrigger = function _scrollTrigger(animation, trigger) {
  return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
},
    _attemptInitTween = function _attemptInitTween(tween, totalTime, force, suppressEvents) {
  _initTween(tween, totalTime);

  if (!tween._initted) {
    return 1;
  }

  if (!force && tween._pt && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
    _lazyTweens.push(tween);

    tween._lazy = [totalTime, suppressEvents];
    return 1;
  }
},
    _parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart(_ref) {
  var parent = _ref.parent;
  return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || _parentPlayheadIsBeforeStart(parent));
},
    // check parent's _lock because when a timeline repeats/yoyos and does its artificial wrapping, we shouldn't force the ratio back to 0
_isFromOrFromStart = function _isFromOrFromStart(_ref2) {
  var data = _ref2.data;
  return data === "isFromStart" || data === "isStart";
},
    _renderZeroDurationTween = function _renderZeroDurationTween(tween, totalTime, suppressEvents, force) {
  var prevRatio = tween.ratio,
      ratio = totalTime < 0 || !totalTime && (!tween._start && _parentPlayheadIsBeforeStart(tween) && !(!tween._initted && _isFromOrFromStart(tween)) || (tween._ts < 0 || tween._dp._ts < 0) && !_isFromOrFromStart(tween)) ? 0 : 1,
      // if the tween or its parent is reversed and the totalTime is 0, we should go to a ratio of 0. Edge case: if a from() or fromTo() stagger tween is placed later in a timeline, the "startAt" zero-duration tween could initially render at a time when the parent timeline's playhead is technically BEFORE where this tween is, so make sure that any "from" and "fromTo" startAt tweens are rendered the first time at a ratio of 1.
  repeatDelay = tween._rDelay,
      tTime = 0,
      pt,
      iteration,
      prevIteration;

  if (repeatDelay && tween._repeat) {
    // in case there's a zero-duration tween that has a repeat with a repeatDelay
    tTime = _clamp(0, tween._tDur, totalTime);
    iteration = _animationCycle(tTime, repeatDelay);
    prevIteration = _animationCycle(tween._tTime, repeatDelay);
    tween._yoyo && iteration & 1 && (ratio = 1 - ratio);

    if (iteration !== prevIteration) {
      prevRatio = 1 - ratio;
      tween.vars.repeatRefresh && tween._initted && tween.invalidate();
    }
  }

  if (ratio !== prevRatio || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
    if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents)) {
      // if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
      return;
    }

    prevIteration = tween._zTime;
    tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0); // when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

    suppressEvents || (suppressEvents = totalTime && !prevIteration); // if it was rendered previously at exactly 0 (_zTime) and now the playhead is moving away, DON'T fire callbacks otherwise they'll seem like duplicates.

    tween.ratio = ratio;
    tween._from && (ratio = 1 - ratio);
    tween._time = 0;
    tween._tTime = tTime;
    pt = tween._pt;

    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }

    tween._startAt && totalTime < 0 && tween._startAt.render(totalTime, true, true);
    tween._onUpdate && !suppressEvents && _callback(tween, "onUpdate");
    tTime && tween._repeat && !suppressEvents && tween.parent && _callback(tween, "onRepeat");

    if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
      ratio && _removeFromParent(tween, 1);

      if (!suppressEvents) {
        _callback(tween, ratio ? "onComplete" : "onReverseComplete", true);

        tween._prom && tween._prom();
      }
    }
  } else if (!tween._zTime) {
    tween._zTime = totalTime;
  }
},
    _findNextPauseTween = function _findNextPauseTween(animation, prevTime, time) {
  var child;

  if (time > prevTime) {
    child = animation._first;

    while (child && child._start <= time) {
      if (!child._dur && child.data === "isPause" && child._start > prevTime) {
        return child;
      }

      child = child._next;
    }
  } else {
    child = animation._last;

    while (child && child._start >= time) {
      if (!child._dur && child.data === "isPause" && child._start < prevTime) {
        return child;
      }

      child = child._prev;
    }
  }
},
    _setDuration = function _setDuration(animation, duration, skipUncache, leavePlayhead) {
  var repeat = animation._repeat,
      dur = _roundPrecise(duration) || 0,
      totalProgress = animation._tTime / animation._tDur;
  totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
  animation._dur = dur;
  animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _roundPrecise(dur * (repeat + 1) + animation._rDelay * repeat);
  totalProgress && !leavePlayhead ? _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress) : animation.parent && _setEnd(animation);
  skipUncache || _uncache(animation.parent, animation);
  return animation;
},
    _onUpdateTotalDuration = function _onUpdateTotalDuration(animation) {
  return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
},
    _zeroPosition = {
  _start: 0,
  endTime: _emptyFunc,
  totalDuration: _emptyFunc
},
    _parsePosition = function _parsePosition(animation, position, percentAnimation) {
  var labels = animation.labels,
      recent = animation._recent || _zeroPosition,
      clippedDuration = animation.duration() >= _bigNum ? recent.endTime(false) : animation._dur,
      //in case there's a child that infinitely repeats, users almost never intend for the insertion point of a new child to be based on a SUPER long value like that so we clip it and assume the most recently-added child's endTime should be used instead.
  i,
      offset,
      isPercent;

  if (_isString(position) && (isNaN(position) || position in labels)) {
    //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
    offset = position.charAt(0);
    isPercent = position.substr(-1) === "%";
    i = position.indexOf("=");

    if (offset === "<" || offset === ">") {
      i >= 0 && (position = position.replace(/=/, ""));
      return (offset === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0) * (isPercent ? (i < 0 ? recent : percentAnimation).totalDuration() / 100 : 1);
    }

    if (i < 0) {
      position in labels || (labels[position] = clippedDuration);
      return labels[position];
    }

    offset = parseFloat(position.charAt(i - 1) + position.substr(i + 1));

    if (isPercent && percentAnimation) {
      offset = offset / 100 * (_isArray(percentAnimation) ? percentAnimation[0] : percentAnimation).totalDuration();
    }

    return i > 1 ? _parsePosition(animation, position.substr(0, i - 1), percentAnimation) + offset : clippedDuration + offset;
  }

  return position == null ? clippedDuration : +position;
},
    _createTweenType = function _createTweenType(type, params, timeline) {
  var isLegacy = _isNumber(params[1]),
      varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1),
      vars = params[varsIndex],
      irVars,
      parent;

  isLegacy && (vars.duration = params[1]);
  vars.parent = timeline;

  if (type) {
    irVars = vars;
    parent = timeline;

    while (parent && !("immediateRender" in irVars)) {
      // inheritance hasn't happened yet, but someone may have set a default in an ancestor timeline. We could do vars.immediateRender = _isNotFalse(_inheritDefaults(vars).immediateRender) but that'd exact a slight performance penalty because _inheritDefaults() also runs in the Tween constructor. We're paying a small kb price here to gain speed.
      irVars = parent.vars.defaults || {};
      parent = _isNotFalse(parent.vars.inherit) && parent.parent;
    }

    vars.immediateRender = _isNotFalse(irVars.immediateRender);
    type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1]; // "from" vars
  }

  return new Tween(params[0], vars, params[varsIndex + 1]);
},
    _conditionalReturn = function _conditionalReturn(value, func) {
  return value || value === 0 ? func(value) : func;
},
    _clamp = function _clamp(min, max, value) {
  return value < min ? min : value > max ? max : value;
},
    getUnit = function getUnit(value) {
  if (typeof value !== "string") {
    return "";
  }

  var v = _unitExp.exec(value);

  return v ? value.substr(v.index + v[0].length) : "";
},
    // note: protect against padded numbers as strings, like "100.100". That shouldn't return "00" as the unit. If it's numeric, return no unit.
clamp = function clamp(min, max, value) {
  return _conditionalReturn(value, function (v) {
    return _clamp(min, max, v);
  });
},
    _slice = [].slice,
    _isArrayLike = function _isArrayLike(value, nonEmpty) {
  return value && _isObject(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject(value[0])) && !value.nodeType && value !== _win;
},
    _flatten = function _flatten(ar, leaveStrings, accumulator) {
  if (accumulator === void 0) {
    accumulator = [];
  }

  return ar.forEach(function (value) {
    var _accumulator;

    return _isString(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
  }) || accumulator;
},
    //takes any value and returns an array. If it's a string (and leaveStrings isn't true), it'll use document.querySelectorAll() and convert that to an array. It'll also accept iterables like jQuery objects.
toArray = function toArray(value, scope, leaveStrings) {
  return _isString(value) && !leaveStrings && (_coreInitted || !_wake()) ? _slice.call((scope || _doc).querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [value] : [];
},
    selector = function selector(value) {
  value = toArray(value)[0] || _warn("Invalid scope") || {};
  return function (v) {
    var el = value.current || value.nativeElement || value;
    return toArray(v, el.querySelectorAll ? el : el === value ? _warn("Invalid scope") || _doc.createElement("div") : value);
  };
},
    shuffle = function shuffle(a) {
  return a.sort(function () {
    return .5 - Math.random();
  });
},
    // alternative that's a bit faster and more reliably diverse but bigger:   for (let j, v, i = a.length; i; j = Math.floor(Math.random() * i), v = a[--i], a[i] = a[j], a[j] = v); return a;
//for distributing values across an array. Can accept a number, a function or (most commonly) a function which can contain the following properties: {base, amount, from, ease, grid, axis, length, each}. Returns a function that expects the following parameters: index, target, array. Recognizes the following
distribute = function distribute(v) {
  if (_isFunction(v)) {
    return v;
  }

  var vars = _isObject(v) ? v : {
    each: v
  },
      //n:1 is just to indicate v was a number; we leverage that later to set v according to the length we get. If a number is passed in, we treat it like the old stagger value where 0.1, for example, would mean that things would be distributed with 0.1 between each element in the array rather than a total "amount" that's chunked out among them all.
  ease = _parseEase(vars.ease),
      from = vars.from || 0,
      base = parseFloat(vars.base) || 0,
      cache = {},
      isDecimal = from > 0 && from < 1,
      ratios = isNaN(from) || isDecimal,
      axis = vars.axis,
      ratioX = from,
      ratioY = from;

  if (_isString(from)) {
    ratioX = ratioY = {
      center: .5,
      edges: .5,
      end: 1
    }[from] || 0;
  } else if (!isDecimal && ratios) {
    ratioX = from[0];
    ratioY = from[1];
  }

  return function (i, target, a) {
    var l = (a || vars).length,
        distances = cache[l],
        originX,
        originY,
        x,
        y,
        d,
        j,
        max,
        min,
        wrapAt;

    if (!distances) {
      wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [1, _bigNum])[1];

      if (!wrapAt) {
        max = -_bigNum;

        while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) {}

        wrapAt--;
      }

      distances = cache[l] = [];
      originX = ratios ? Math.min(wrapAt, l) * ratioX - .5 : from % wrapAt;
      originY = ratios ? l * ratioY / wrapAt - .5 : from / wrapAt | 0;
      max = 0;
      min = _bigNum;

      for (j = 0; j < l; j++) {
        x = j % wrapAt - originX;
        y = originY - (j / wrapAt | 0);
        distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
        d > max && (max = d);
        d < min && (min = d);
      }

      from === "random" && shuffle(distances);
      distances.max = max - min;
      distances.min = min;
      distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
      distances.b = l < 0 ? base - l : base;
      distances.u = getUnit(vars.amount || vars.each) || 0; //unit

      ease = ease && l < 0 ? _invertEase(ease) : ease;
    }

    l = (distances[i] - distances.min) / distances.max || 0;
    return _roundPrecise(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u; //round in order to work around floating point errors
  };
},
    _roundModifier = function _roundModifier(v) {
  //pass in 0.1 get a function that'll round to the nearest tenth, or 5 to round to the closest 5, or 0.001 to the closest 1000th, etc.
  var p = Math.pow(10, ((v + "").split(".")[1] || "").length); //to avoid floating point math errors (like 24 * 0.1 == 2.4000000000000004), we chop off at a specific number of decimal places (much faster than toFixed())

  return function (raw) {
    var n = Math.round(parseFloat(raw) / v) * v * p;
    return (n - n % 1) / p + (_isNumber(raw) ? 0 : getUnit(raw)); // n - n % 1 replaces Math.floor() in order to handle negative values properly. For example, Math.floor(-150.00000000000003) is 151!
  };
},
    snap = function snap(snapTo, value) {
  var isArray = _isArray(snapTo),
      radius,
      is2D;

  if (!isArray && _isObject(snapTo)) {
    radius = isArray = snapTo.radius || _bigNum;

    if (snapTo.values) {
      snapTo = toArray(snapTo.values);

      if (is2D = !_isNumber(snapTo[0])) {
        radius *= radius; //performance optimization so we don't have to Math.sqrt() in the loop.
      }
    } else {
      snapTo = _roundModifier(snapTo.increment);
    }
  }

  return _conditionalReturn(value, !isArray ? _roundModifier(snapTo) : _isFunction(snapTo) ? function (raw) {
    is2D = snapTo(raw);
    return Math.abs(is2D - raw) <= radius ? is2D : raw;
  } : function (raw) {
    var x = parseFloat(is2D ? raw.x : raw),
        y = parseFloat(is2D ? raw.y : 0),
        min = _bigNum,
        closest = 0,
        i = snapTo.length,
        dx,
        dy;

    while (i--) {
      if (is2D) {
        dx = snapTo[i].x - x;
        dy = snapTo[i].y - y;
        dx = dx * dx + dy * dy;
      } else {
        dx = Math.abs(snapTo[i] - x);
      }

      if (dx < min) {
        min = dx;
        closest = i;
      }
    }

    closest = !radius || min <= radius ? snapTo[closest] : raw;
    return is2D || closest === raw || _isNumber(raw) ? closest : closest + getUnit(raw);
  });
},
    random = function random(min, max, roundingIncrement, returnFunction) {
  return _conditionalReturn(_isArray(min) ? !max : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction, function () {
    return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min - roundingIncrement / 2 + Math.random() * (max - min + roundingIncrement * .99)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
  });
},
    pipe = function pipe() {
  for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }

  return function (value) {
    return functions.reduce(function (v, f) {
      return f(v);
    }, value);
  };
},
    unitize = function unitize(func, unit) {
  return function (value) {
    return func(parseFloat(value)) + (unit || getUnit(value));
  };
},
    normalize = function normalize(min, max, value) {
  return mapRange(min, max, 0, 1, value);
},
    _wrapArray = function _wrapArray(a, wrapper, value) {
  return _conditionalReturn(value, function (index) {
    return a[~~wrapper(index)];
  });
},
    wrap = function wrap(min, max, value) {
  // NOTE: wrap() CANNOT be an arrow function! A very odd compiling bug causes problems (unrelated to GSAP).
  var range = max - min;
  return _isArray(min) ? _wrapArray(min, wrap(0, min.length), max) : _conditionalReturn(value, function (value) {
    return (range + (value - min) % range) % range + min;
  });
},
    wrapYoyo = function wrapYoyo(min, max, value) {
  var range = max - min,
      total = range * 2;
  return _isArray(min) ? _wrapArray(min, wrapYoyo(0, min.length - 1), max) : _conditionalReturn(value, function (value) {
    value = (total + (value - min) % total) % total || 0;
    return min + (value > range ? total - value : value);
  });
},
    _replaceRandom = function _replaceRandom(value) {
  //replaces all occurrences of random(...) in a string with the calculated random value. can be a range like random(-100, 100, 5) or an array like random([0, 100, 500])
  var prev = 0,
      s = "",
      i,
      nums,
      end,
      isArray;

  while (~(i = value.indexOf("random(", prev))) {
    end = value.indexOf(")", i);
    isArray = value.charAt(i + 7) === "[";
    nums = value.substr(i + 7, end - i - 7).match(isArray ? _delimitedValueExp : _strictNumExp);
    s += value.substr(prev, i - prev) + random(isArray ? nums : +nums[0], isArray ? 0 : +nums[1], +nums[2] || 1e-5);
    prev = end + 1;
  }

  return s + value.substr(prev, value.length - prev);
},
    mapRange = function mapRange(inMin, inMax, outMin, outMax, value) {
  var inRange = inMax - inMin,
      outRange = outMax - outMin;
  return _conditionalReturn(value, function (value) {
    return outMin + ((value - inMin) / inRange * outRange || 0);
  });
},
    interpolate = function interpolate(start, end, progress, mutate) {
  var func = isNaN(start + end) ? 0 : function (p) {
    return (1 - p) * start + p * end;
  };

  if (!func) {
    var isString = _isString(start),
        master = {},
        p,
        i,
        interpolators,
        l,
        il;

    progress === true && (mutate = 1) && (progress = null);

    if (isString) {
      start = {
        p: start
      };
      end = {
        p: end
      };
    } else if (_isArray(start) && !_isArray(end)) {
      interpolators = [];
      l = start.length;
      il = l - 2;

      for (i = 1; i < l; i++) {
        interpolators.push(interpolate(start[i - 1], start[i])); //build the interpolators up front as a performance optimization so that when the function is called many times, it can just reuse them.
      }

      l--;

      func = function func(p) {
        p *= l;
        var i = Math.min(il, ~~p);
        return interpolators[i](p - i);
      };

      progress = end;
    } else if (!mutate) {
      start = _merge(_isArray(start) ? [] : {}, start);
    }

    if (!interpolators) {
      for (p in end) {
        _addPropTween.call(master, start, p, "get", end[p]);
      }

      func = function func(p) {
        return _renderPropTweens(p, master) || (isString ? start.p : start);
      };
    }
  }

  return _conditionalReturn(progress, func);
},
    _getLabelInDirection = function _getLabelInDirection(timeline, fromTime, backward) {
  //used for nextLabel() and previousLabel()
  var labels = timeline.labels,
      min = _bigNum,
      p,
      distance,
      label;

  for (p in labels) {
    distance = labels[p] - fromTime;

    if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
      label = p;
      min = distance;
    }
  }

  return label;
},
    _callback = function _callback(animation, type, executeLazyFirst) {
  var v = animation.vars,
      callback = v[type],
      params,
      scope;

  if (!callback) {
    return;
  }

  params = v[type + "Params"];
  scope = v.callbackScope || animation;
  executeLazyFirst && _lazyTweens.length && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.

  return params ? callback.apply(scope, params) : callback.call(scope);
},
    _interrupt = function _interrupt(animation) {
  _removeFromParent(animation);

  animation.scrollTrigger && animation.scrollTrigger.kill(false);
  animation.progress() < 1 && _callback(animation, "onInterrupt");
  return animation;
},
    _quickTween,
    _createPlugin = function _createPlugin(config) {
  config = !config.name && config["default"] || config; //UMD packaging wraps things oddly, so for example MotionPathHelper becomes {MotionPathHelper:MotionPathHelper, default:MotionPathHelper}.

  var name = config.name,
      isFunc = _isFunction(config),
      Plugin = name && !isFunc && config.init ? function () {
    this._props = [];
  } : config,
      //in case someone passes in an object that's not a plugin, like CustomEase
  instanceDefaults = {
    init: _emptyFunc,
    render: _renderPropTweens,
    add: _addPropTween,
    kill: _killPropTweensOf,
    modifier: _addPluginModifier,
    rawVars: 0
  },
      statics = {
    targetTest: 0,
    get: 0,
    getSetter: _getSetter,
    aliases: {},
    register: 0
  };

  _wake();

  if (config !== Plugin) {
    if (_plugins[name]) {
      return;
    }

    _setDefaults(Plugin, _setDefaults(_copyExcluding(config, instanceDefaults), statics)); //static methods


    _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config, statics))); //instance methods


    _plugins[Plugin.prop = name] = Plugin;

    if (config.targetTest) {
      _harnessPlugins.push(Plugin);

      _reservedProps[name] = 1;
    }

    name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin"; //for the global name. "motionPath" should become MotionPathPlugin
  }

  _addGlobal(name, Plugin);

  config.register && config.register(gsap, Plugin, PropTween);
},

/*
 * --------------------------------------------------------------------------------------
 * COLORS
 * --------------------------------------------------------------------------------------
 */
_255 = 255,
    _colorLookup = {
  aqua: [0, _255, _255],
  lime: [0, _255, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, _255],
  navy: [0, 0, 128],
  white: [_255, _255, _255],
  olive: [128, 128, 0],
  yellow: [_255, _255, 0],
  orange: [_255, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [_255, 0, 0],
  pink: [_255, 192, 203],
  cyan: [0, _255, _255],
  transparent: [_255, _255, _255, 0]
},
    _hue = function _hue(h, m1, m2) {
  h = h < 0 ? h + 1 : h > 1 ? h - 1 : h;
  return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < .5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * _255 + .5 | 0;
},
    splitColor = function splitColor(v, toHSL, forceAlpha) {
  var a = !v ? _colorLookup.black : _isNumber(v) ? [v >> 16, v >> 8 & _255, v & _255] : 0,
      r,
      g,
      b,
      h,
      s,
      l,
      max,
      min,
      d,
      wasHSL;

  if (!a) {
    if (v.substr(-1) === ",") {
      //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
      v = v.substr(0, v.length - 1);
    }

    if (_colorLookup[v]) {
      a = _colorLookup[v];
    } else if (v.charAt(0) === "#") {
      if (v.length < 6) {
        //for shorthand like #9F0 or #9F0F (could have alpha)
        r = v.charAt(1);
        g = v.charAt(2);
        b = v.charAt(3);
        v = "#" + r + r + g + g + b + b + (v.length === 5 ? v.charAt(4) + v.charAt(4) : "");
      }

      if (v.length === 9) {
        // hex with alpha, like #fd5e53ff
        a = parseInt(v.substr(1, 6), 16);
        return [a >> 16, a >> 8 & _255, a & _255, parseInt(v.substr(7), 16) / 255];
      }

      v = parseInt(v.substr(1), 16);
      a = [v >> 16, v >> 8 & _255, v & _255];
    } else if (v.substr(0, 3) === "hsl") {
      a = wasHSL = v.match(_strictNumExp);

      if (!toHSL) {
        h = +a[0] % 360 / 360;
        s = +a[1] / 100;
        l = +a[2] / 100;
        g = l <= .5 ? l * (s + 1) : l + s - l * s;
        r = l * 2 - g;
        a.length > 3 && (a[3] *= 1); //cast as number

        a[0] = _hue(h + 1 / 3, r, g);
        a[1] = _hue(h, r, g);
        a[2] = _hue(h - 1 / 3, r, g);
      } else if (~v.indexOf("=")) {
        //if relative values are found, just return the raw strings with the relative prefixes in place.
        a = v.match(_numExp);
        forceAlpha && a.length < 4 && (a[3] = 1);
        return a;
      }
    } else {
      a = v.match(_strictNumExp) || _colorLookup.transparent;
    }

    a = a.map(Number);
  }

  if (toHSL && !wasHSL) {
    r = a[0] / _255;
    g = a[1] / _255;
    b = a[2] / _255;
    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h *= 60;
    }

    a[0] = ~~(h + .5);
    a[1] = ~~(s * 100 + .5);
    a[2] = ~~(l * 100 + .5);
  }

  forceAlpha && a.length < 4 && (a[3] = 1);
  return a;
},
    _colorOrderData = function _colorOrderData(v) {
  // strips out the colors from the string, finds all the numeric slots (with units) and returns an array of those. The Array also has a "c" property which is an Array of the index values where the colors belong. This is to help work around issues where there's a mis-matched order of color/numeric data like drop-shadow(#f00 0px 1px 2px) and drop-shadow(0x 1px 2px #f00). This is basically a helper function used in _formatColors()
  var values = [],
      c = [],
      i = -1;
  v.split(_colorExp).forEach(function (v) {
    var a = v.match(_numWithUnitExp) || [];
    values.push.apply(values, a);
    c.push(i += a.length + 1);
  });
  values.c = c;
  return values;
},
    _formatColors = function _formatColors(s, toHSL, orderMatchData) {
  var result = "",
      colors = (s + result).match(_colorExp),
      type = toHSL ? "hsla(" : "rgba(",
      i = 0,
      c,
      shell,
      d,
      l;

  if (!colors) {
    return s;
  }

  colors = colors.map(function (color) {
    return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
  });

  if (orderMatchData) {
    d = _colorOrderData(s);
    c = orderMatchData.c;

    if (c.join(result) !== d.c.join(result)) {
      shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
      l = shell.length - 1;

      for (; i < l; i++) {
        result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
      }
    }
  }

  if (!shell) {
    shell = s.split(_colorExp);
    l = shell.length - 1;

    for (; i < l; i++) {
      result += shell[i] + colors[i];
    }
  }

  return result + shell[l];
},
    _colorExp = function () {
  var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",
      //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.,
  p;

  for (p in _colorLookup) {
    s += "|" + p + "\\b";
  }

  return new RegExp(s + ")", "gi");
}(),
    _hslExp = /hsl[a]?\(/,
    _colorStringFilter = function _colorStringFilter(a) {
  var combined = a.join(" "),
      toHSL;
  _colorExp.lastIndex = 0;

  if (_colorExp.test(combined)) {
    toHSL = _hslExp.test(combined);
    a[1] = _formatColors(a[1], toHSL);
    a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1])); // make sure the order of numbers/colors match with the END value.

    return true;
  }
},

/*
 * --------------------------------------------------------------------------------------
 * TICKER
 * --------------------------------------------------------------------------------------
 */
_tickerActive,
    _ticker = function () {
  var _getTime = Date.now,
      _lagThreshold = 500,
      _adjustedLag = 33,
      _startTime = _getTime(),
      _lastUpdate = _startTime,
      _gap = 1000 / 240,
      _nextTime = _gap,
      _listeners = [],
      _id,
      _req,
      _raf,
      _self,
      _delta,
      _i,
      _tick = function _tick(v) {
    var elapsed = _getTime() - _lastUpdate,
        manual = v === true,
        overlap,
        dispatch,
        time,
        frame;

    elapsed > _lagThreshold && (_startTime += elapsed - _adjustedLag);
    _lastUpdate += elapsed;
    time = _lastUpdate - _startTime;
    overlap = time - _nextTime;

    if (overlap > 0 || manual) {
      frame = ++_self.frame;
      _delta = time - _self.time * 1000;
      _self.time = time = time / 1000;
      _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
      dispatch = 1;
    }

    manual || (_id = _req(_tick)); //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.

    if (dispatch) {
      for (_i = 0; _i < _listeners.length; _i++) {
        // use _i and check _listeners.length instead of a variable because a listener could get removed during the loop, and if that happens to an element less than the current index, it'd throw things off in the loop.
        _listeners[_i](time, _delta, frame, v);
      }
    }
  };

  _self = {
    time: 0,
    frame: 0,
    tick: function tick() {
      _tick(true);
    },
    deltaRatio: function deltaRatio(fps) {
      return _delta / (1000 / (fps || 60));
    },
    wake: function wake() {
      if (_coreReady) {
        if (!_coreInitted && _windowExists()) {
          _win = _coreInitted = window;
          _doc = _win.document || {};
          _globals.gsap = gsap;
          (_win.gsapVersions || (_win.gsapVersions = [])).push(gsap.version);

          _install(_installScope || _win.GreenSockGlobals || !_win.gsap && _win || {});

          _raf = _win.requestAnimationFrame;
        }

        _id && _self.sleep();

        _req = _raf || function (f) {
          return setTimeout(f, _nextTime - _self.time * 1000 + 1 | 0);
        };

        _tickerActive = 1;

        _tick(2);
      }
    },
    sleep: function sleep() {
      (_raf ? _win.cancelAnimationFrame : clearTimeout)(_id);
      _tickerActive = 0;
      _req = _emptyFunc;
    },
    lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
      _lagThreshold = threshold || 1 / _tinyNum; //zero should be interpreted as basically unlimited

      _adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
    },
    fps: function fps(_fps) {
      _gap = 1000 / (_fps || 240);
      _nextTime = _self.time * 1000 + _gap;
    },
    add: function add(callback) {
      _listeners.indexOf(callback) < 0 && _listeners.push(callback);

      _wake();
    },
    remove: function remove(callback) {
      var i;
      ~(i = _listeners.indexOf(callback)) && _listeners.splice(i, 1) && _i >= i && _i--;
    },
    _listeners: _listeners
  };
  return _self;
}(),
    _wake = function _wake() {
  return !_tickerActive && _ticker.wake();
},
    //also ensures the core classes are initialized.

/*
* -------------------------------------------------
* EASING
* -------------------------------------------------
*/
_easeMap = {},
    _customEaseExp = /^[\d.\-M][\d.\-,\s]/,
    _quotesExp = /["']/g,
    _parseObjectInString = function _parseObjectInString(value) {
  //takes a string like "{wiggles:10, type:anticipate})" and turns it into a real object. Notice it ends in ")" and includes the {} wrappers. This is because we only use this function for parsing ease configs and prioritized optimization rather than reusability.
  var obj = {},
      split = value.substr(1, value.length - 3).split(":"),
      key = split[0],
      i = 1,
      l = split.length,
      index,
      val,
      parsedVal;

  for (; i < l; i++) {
    val = split[i];
    index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
    parsedVal = val.substr(0, index);
    obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
    key = val.substr(index + 1).trim();
  }

  return obj;
},
    _valueInParentheses = function _valueInParentheses(value) {
  var open = value.indexOf("(") + 1,
      close = value.indexOf(")"),
      nested = value.indexOf("(", open);
  return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
},
    _configEaseFromString = function _configEaseFromString(name) {
  //name can be a string like "elastic.out(1,0.5)", and pass in _easeMap as obj and it'll parse it out and call the actual function like _easeMap.Elastic.easeOut.config(1,0.5). It will also parse custom ease strings as long as CustomEase is loaded and registered (internally as _easeMap._CE).
  var split = (name + "").split("("),
      ease = _easeMap[split[0]];
  return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [_parseObjectInString(split[1])] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
},
    _invertEase = function _invertEase(ease) {
  return function (p) {
    return 1 - ease(1 - p);
  };
},
    // allow yoyoEase to be set in children and have those affected when the parent/ancestor timeline yoyos.
_propagateYoyoEase = function _propagateYoyoEase(timeline, isYoyo) {
  var child = timeline._first,
      ease;

  while (child) {
    if (child instanceof Timeline) {
      _propagateYoyoEase(child, isYoyo);
    } else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
      if (child.timeline) {
        _propagateYoyoEase(child.timeline, isYoyo);
      } else {
        ease = child._ease;
        child._ease = child._yEase;
        child._yEase = ease;
        child._yoyo = isYoyo;
      }
    }

    child = child._next;
  }
},
    _parseEase = function _parseEase(ease, defaultEase) {
  return !ease ? defaultEase : (_isFunction(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
},
    _insertEase = function _insertEase(names, easeIn, easeOut, easeInOut) {
  if (easeOut === void 0) {
    easeOut = function easeOut(p) {
      return 1 - easeIn(1 - p);
    };
  }

  if (easeInOut === void 0) {
    easeInOut = function easeInOut(p) {
      return p < .5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
    };
  }

  var ease = {
    easeIn: easeIn,
    easeOut: easeOut,
    easeInOut: easeInOut
  },
      lowercaseName;

  _forEachName(names, function (name) {
    _easeMap[name] = _globals[name] = ease;
    _easeMap[lowercaseName = name.toLowerCase()] = easeOut;

    for (var p in ease) {
      _easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p] = ease[p];
    }
  });

  return ease;
},
    _easeInOutFromOut = function _easeInOutFromOut(easeOut) {
  return function (p) {
    return p < .5 ? (1 - easeOut(1 - p * 2)) / 2 : .5 + easeOut((p - .5) * 2) / 2;
  };
},
    _configElastic = function _configElastic(type, amplitude, period) {
  var p1 = amplitude >= 1 ? amplitude : 1,
      //note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.
  p2 = (period || (type ? .3 : .45)) / (amplitude < 1 ? amplitude : 1),
      p3 = p2 / _2PI * (Math.asin(1 / p1) || 0),
      easeOut = function easeOut(p) {
    return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
  },
      ease = type === "out" ? easeOut : type === "in" ? function (p) {
    return 1 - easeOut(1 - p);
  } : _easeInOutFromOut(easeOut);

  p2 = _2PI / p2; //precalculate to optimize

  ease.config = function (amplitude, period) {
    return _configElastic(type, amplitude, period);
  };

  return ease;
},
    _configBack = function _configBack(type, overshoot) {
  if (overshoot === void 0) {
    overshoot = 1.70158;
  }

  var easeOut = function easeOut(p) {
    return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
  },
      ease = type === "out" ? easeOut : type === "in" ? function (p) {
    return 1 - easeOut(1 - p);
  } : _easeInOutFromOut(easeOut);

  ease.config = function (overshoot) {
    return _configBack(type, overshoot);
  };

  return ease;
}; // a cheaper (kb and cpu) but more mild way to get a parameterized weighted ease by feeding in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
// _weightedEase = ratio => {
// 	let y = 0.5 + ratio / 2;
// 	return p => (2 * (1 - p) * p * y + p * p);
// },
// a stronger (but more expensive kb/cpu) parameterized weighted ease that lets you feed in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
// _weightedEaseStrong = ratio => {
// 	ratio = .5 + ratio / 2;
// 	let o = 1 / 3 * (ratio < .5 ? ratio : 1 - ratio),
// 		b = ratio - o,
// 		c = ratio + o;
// 	return p => p === 1 ? p : 3 * b * (1 - p) * (1 - p) * p + 3 * c * (1 - p) * p * p + p * p * p;
// };


_forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function (name, i) {
  var power = i < 5 ? i + 1 : i;

  _insertEase(name + ",Power" + (power - 1), i ? function (p) {
    return Math.pow(p, power);
  } : function (p) {
    return p;
  }, function (p) {
    return 1 - Math.pow(1 - p, power);
  }, function (p) {
    return p < .5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
  });
});

_easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;

_insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());

(function (n, c) {
  var n1 = 1 / c,
      n2 = 2 * n1,
      n3 = 2.5 * n1,
      easeOut = function easeOut(p) {
    return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + .75 : p < n3 ? n * (p -= 2.25 / c) * p + .9375 : n * Math.pow(p - 2.625 / c, 2) + .984375;
  };

  _insertEase("Bounce", function (p) {
    return 1 - easeOut(1 - p);
  }, easeOut);
})(7.5625, 2.75);

_insertEase("Expo", function (p) {
  return p ? Math.pow(2, 10 * (p - 1)) : 0;
});

_insertEase("Circ", function (p) {
  return -(_sqrt(1 - p * p) - 1);
});

_insertEase("Sine", function (p) {
  return p === 1 ? 1 : -_cos(p * _HALF_PI) + 1;
});

_insertEase("Back", _configBack("in"), _configBack("out"), _configBack());

_easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
  config: function config(steps, immediateStart) {
    if (steps === void 0) {
      steps = 1;
    }

    var p1 = 1 / steps,
        p2 = steps + (immediateStart ? 0 : 1),
        p3 = immediateStart ? 1 : 0,
        max = 1 - _tinyNum;
    return function (p) {
      return ((p2 * _clamp(0, max, p) | 0) + p3) * p1;
    };
  }
};
_defaults.ease = _easeMap["quad.out"];

_forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function (name) {
  return _callbackNames += name + "," + name + "Params,";
});
/*
 * --------------------------------------------------------------------------------------
 * CACHE
 * --------------------------------------------------------------------------------------
 */


var GSCache = function GSCache(target, harness) {
  this.id = _gsID++;
  target._gsap = this;
  this.target = target;
  this.harness = harness;
  this.get = harness ? harness.get : _getProperty;
  this.set = harness ? harness.getSetter : _getSetter;
};
/*
 * --------------------------------------------------------------------------------------
 * ANIMATION
 * --------------------------------------------------------------------------------------
 */

var Animation = /*#__PURE__*/function () {
  function Animation(vars) {
    this.vars = vars;
    this._delay = +vars.delay || 0;

    if (this._repeat = vars.repeat === Infinity ? -2 : vars.repeat || 0) {
      // TODO: repeat: Infinity on a timeline's children must flag that timeline internally and affect its totalDuration, otherwise it'll stop in the negative direction when reaching the start.
      this._rDelay = vars.repeatDelay || 0;
      this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
    }

    this._ts = 1;

    _setDuration(this, +vars.duration, 1, 1);

    this.data = vars.data;
    _tickerActive || _ticker.wake();
  }

  var _proto = Animation.prototype;

  _proto.delay = function delay(value) {
    if (value || value === 0) {
      this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
      this._delay = value;
      return this;
    }

    return this._delay;
  };

  _proto.duration = function duration(value) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
  };

  _proto.totalDuration = function totalDuration(value) {
    if (!arguments.length) {
      return this._tDur;
    }

    this._dirty = 0;
    return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
  };

  _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
    _wake();

    if (!arguments.length) {
      return this._tTime;
    }

    var parent = this._dp;

    if (parent && parent.smoothChildTiming && this._ts) {
      _alignPlayhead(this, _totalTime);

      !parent._dp || parent.parent || _postAddChecks(parent, this); // edge case: if this is a child of a timeline that already completed, for example, we must re-activate the parent.
      //in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The start of that child would get pushed out, but one of the ancestors may have completed.

      while (parent && parent.parent) {
        if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) {
          parent.totalTime(parent._tTime, true);
        }

        parent = parent.parent;
      }

      if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) {
        //if the animation doesn't have a parent, put it back into its last parent (recorded as _dp for exactly cases like this). Limit to parents with autoRemoveChildren (like globalTimeline) so that if the user manually removes an animation from a timeline and then alters its playhead, it doesn't get added back in.
        _addToTimeline(this._dp, this, this._start - this._delay);
      }
    }

    if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
      // check for _ptLookup on a Tween instance to ensure it has actually finished being instantiated, otherwise if this.reverse() gets called in the Animation constructor, it could trigger a render() here even though the _targets weren't populated, thus when _init() is called there won't be any PropTweens (it'll act like the tween is non-functional)
      this._ts || (this._pTime = _totalTime); // otherwise, if an animation is paused, then the playhead is moved back to zero, then resumed, it'd revert back to the original time at the pause
      //if (!this._lock) { // avoid endless recursion (not sure we need this yet or if it's worth the performance hit)
      //   this._lock = 1;

      _lazySafeRender(this, _totalTime, suppressEvents); //   this._lock = 0;
      //}

    }

    return this;
  };

  _proto.time = function time(value, suppressEvents) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % (this._dur + this._rDelay) || (value ? this._dur : 0), suppressEvents) : this._time; // note: if the modulus results in 0, the playhead could be exactly at the end or the beginning, and we always defer to the END with a non-zero value, otherwise if you set the time() to the very end (duration()), it would render at the START!
  };

  _proto.totalProgress = function totalProgress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio;
  };

  _proto.progress = function progress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio;
  };

  _proto.iteration = function iteration(value, suppressEvents) {
    var cycleDuration = this.duration() + this._rDelay;

    return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
  } // potential future addition:
  // isPlayingBackwards() {
  // 	let animation = this,
  // 		orientation = 1; // 1 = forward, -1 = backward
  // 	while (animation) {
  // 		orientation *= animation.reversed() || (animation.repeat() && !(animation.iteration() & 1)) ? -1 : 1;
  // 		animation = animation.parent;
  // 	}
  // 	return orientation < 0;
  // }
  ;

  _proto.timeScale = function timeScale(value) {
    if (!arguments.length) {
      return this._rts === -_tinyNum ? 0 : this._rts; // recorded timeScale. Special case: if someone calls reverse() on an animation with timeScale of 0, we assign it -_tinyNum to remember it's reversed.
    }

    if (this._rts === value) {
      return this;
    }

    var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime; // make sure to do the parentToChildTotalTime() BEFORE setting the new _ts because the old one must be used in that calculation.
    // future addition? Up side: fast and minimal file size. Down side: only works on this animation; if a timeline is reversed, for example, its childrens' onReverse wouldn't get called.
    //(+value < 0 && this._rts >= 0) && _callback(this, "onReverse", true);
    // prioritize rendering where the parent's playhead lines up instead of this._tTime because there could be a tween that's animating another tween's timeScale in the same rendering loop (same parent), thus if the timeScale tween renders first, it would alter _start BEFORE _tTime was set on that tick (in the rendering loop), effectively freezing it until the timeScale tween finishes.

    this._rts = +value || 0;
    this._ts = this._ps || value === -_tinyNum ? 0 : this._rts; // _ts is the functional timeScale which would be 0 if the animation is paused.

    _recacheAncestors(this.totalTime(_clamp(-this._delay, this._tDur, tTime), true));

    _setEnd(this); // if parent.smoothChildTiming was false, the end time didn't get updated in the _alignPlayhead() method, so do it here.


    return this;
  };

  _proto.paused = function paused(value) {
    if (!arguments.length) {
      return this._ps;
    }

    if (this._ps !== value) {
      this._ps = value;

      if (value) {
        this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()); // if the pause occurs during the delay phase, make sure that's factored in when resuming.

        this._ts = this._act = 0; // _ts is the functional timeScale, so a paused tween would effectively have a timeScale of 0. We record the "real" timeScale as _rts (recorded time scale)
      } else {
        _wake();

        this._ts = this._rts; //only defer to _pTime (pauseTime) if tTime is zero. Remember, someone could pause() an animation, then scrub the playhead and resume(). If the parent doesn't have smoothChildTiming, we render at the rawTime() because the startTime won't get updated.

        this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== _tinyNum && (this._tTime -= _tinyNum)); // edge case: animation.progress(1).pause().play() wouldn't render again because the playhead is already at the end, but the call to totalTime() below will add it back to its parent...and not remove it again (since removing only happens upon rendering at a new time). Offsetting the _tTime slightly is done simply to cause the final render in totalTime() that'll pop it off its timeline (if autoRemoveChildren is true, of course). Check to make sure _zTime isn't -_tinyNum to avoid an edge case where the playhead is pushed to the end but INSIDE a tween/callback, the timeline itself is paused thus halting rendering and leaving a few unrendered. When resuming, it wouldn't render those otherwise.
      }
    }

    return this;
  };

  _proto.startTime = function startTime(value) {
    if (arguments.length) {
      this._start = value;
      var parent = this.parent || this._dp;
      parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
      return this;
    }

    return this._start;
  };

  _proto.endTime = function endTime(includeRepeats) {
    return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  };

  _proto.rawTime = function rawTime(wrapRepeats) {
    var parent = this.parent || this._dp; // _dp = detached parent

    return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
  };

  _proto.globalTime = function globalTime(rawTime) {
    var animation = this,
        time = arguments.length ? rawTime : animation.rawTime();

    while (animation) {
      time = animation._start + time / (animation._ts || 1);
      animation = animation._dp;
    }

    return time;
  };

  _proto.repeat = function repeat(value) {
    if (arguments.length) {
      this._repeat = value === Infinity ? -2 : value;
      return _onUpdateTotalDuration(this);
    }

    return this._repeat === -2 ? Infinity : this._repeat;
  };

  _proto.repeatDelay = function repeatDelay(value) {
    if (arguments.length) {
      var time = this._time;
      this._rDelay = value;

      _onUpdateTotalDuration(this);

      return time ? this.time(time) : this;
    }

    return this._rDelay;
  };

  _proto.yoyo = function yoyo(value) {
    if (arguments.length) {
      this._yoyo = value;
      return this;
    }

    return this._yoyo;
  };

  _proto.seek = function seek(position, suppressEvents) {
    return this.totalTime(_parsePosition(this, position), _isNotFalse(suppressEvents));
  };

  _proto.restart = function restart(includeDelay, suppressEvents) {
    return this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
  };

  _proto.play = function play(from, suppressEvents) {
    from != null && this.seek(from, suppressEvents);
    return this.reversed(false).paused(false);
  };

  _proto.reverse = function reverse(from, suppressEvents) {
    from != null && this.seek(from || this.totalDuration(), suppressEvents);
    return this.reversed(true).paused(false);
  };

  _proto.pause = function pause(atTime, suppressEvents) {
    atTime != null && this.seek(atTime, suppressEvents);
    return this.paused(true);
  };

  _proto.resume = function resume() {
    return this.paused(false);
  };

  _proto.reversed = function reversed(value) {
    if (arguments.length) {
      !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0)); // in case timeScale is zero, reversing would have no effect so we use _tinyNum.

      return this;
    }

    return this._rts < 0;
  };

  _proto.invalidate = function invalidate() {
    this._initted = this._act = 0;
    this._zTime = -_tinyNum;
    return this;
  };

  _proto.isActive = function isActive() {
    var parent = this.parent || this._dp,
        start = this._start,
        rawTime;
    return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
  };

  _proto.eventCallback = function eventCallback(type, callback, params) {
    var vars = this.vars;

    if (arguments.length > 1) {
      if (!callback) {
        delete vars[type];
      } else {
        vars[type] = callback;
        params && (vars[type + "Params"] = params);
        type === "onUpdate" && (this._onUpdate = callback);
      }

      return this;
    }

    return vars[type];
  };

  _proto.then = function then(onFulfilled) {
    var self = this;
    return new Promise(function (resolve) {
      var f = _isFunction(onFulfilled) ? onFulfilled : _passThrough,
          _resolve = function _resolve() {
        var _then = self.then;
        self.then = null; // temporarily null the then() method to avoid an infinite loop (see https://github.com/greensock/GSAP/issues/322)

        _isFunction(f) && (f = f(self)) && (f.then || f === self) && (self.then = _then);
        resolve(f);
        self.then = _then;
      };

      if (self._initted && self.totalProgress() === 1 && self._ts >= 0 || !self._tTime && self._ts < 0) {
        _resolve();
      } else {
        self._prom = _resolve;
      }
    });
  };

  _proto.kill = function kill() {
    _interrupt(this);
  };

  return Animation;
}();

_setDefaults(Animation.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: false,
  parent: null,
  _initted: false,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -_tinyNum,
  _prom: 0,
  _ps: false,
  _rts: 1
});
/*
 * -------------------------------------------------
 * TIMELINE
 * -------------------------------------------------
 */


var Timeline = /*#__PURE__*/function (_Animation) {
  _inheritsLoose(Timeline, _Animation);

  function Timeline(vars, position) {
    var _this;

    if (vars === void 0) {
      vars = {};
    }

    _this = _Animation.call(this, vars) || this;
    _this.labels = {};
    _this.smoothChildTiming = !!vars.smoothChildTiming;
    _this.autoRemoveChildren = !!vars.autoRemoveChildren;
    _this._sort = _isNotFalse(vars.sortChildren);
    _globalTimeline && _addToTimeline(vars.parent || _globalTimeline, _assertThisInitialized(_this), position);
    vars.reversed && _this.reverse();
    vars.paused && _this.paused(true);
    vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
    return _this;
  }

  var _proto2 = Timeline.prototype;

  _proto2.to = function to(targets, vars, position) {
    _createTweenType(0, arguments, this);

    return this;
  };

  _proto2.from = function from(targets, vars, position) {
    _createTweenType(1, arguments, this);

    return this;
  };

  _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
    _createTweenType(2, arguments, this);

    return this;
  };

  _proto2.set = function set(targets, vars, position) {
    vars.duration = 0;
    vars.parent = this;
    _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
    vars.immediateRender = !!vars.immediateRender;
    new Tween(targets, vars, _parsePosition(this, position), 1);
    return this;
  };

  _proto2.call = function call(callback, params, position) {
    return _addToTimeline(this, Tween.delayedCall(0, callback, params), position);
  } //ONLY for backward compatibility! Maybe delete?
  ;

  _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars.duration = duration;
    vars.stagger = vars.stagger || stagger;
    vars.onComplete = onCompleteAll;
    vars.onCompleteParams = onCompleteAllParams;
    vars.parent = this;
    new Tween(targets, vars, _parsePosition(this, position));
    return this;
  };

  _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars.runBackwards = 1;
    _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
    return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
  };

  _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
    toVars.startAt = fromVars;
    _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
    return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
  };

  _proto2.render = function render(totalTime, suppressEvents, force) {
    var prevTime = this._time,
        tDur = this._dirty ? this.totalDuration() : this._tDur,
        dur = this._dur,
        tTime = totalTime <= 0 ? 0 : _roundPrecise(totalTime),
        // if a paused timeline is resumed (or its _start is updated for another reason...which rounds it), that could result in the playhead shifting a **tiny** amount and a zero-duration child at that spot may get rendered at a different ratio, like its totalTime in render() may be 1e-17 instead of 0, for example.
    crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur),
        time,
        child,
        next,
        iteration,
        cycleDuration,
        prevPaused,
        pauseTween,
        timeScale,
        prevStart,
        prevIteration,
        yoyo,
        isYoyo;
    this !== _globalTimeline && tTime > tDur && totalTime >= 0 && (tTime = tDur);

    if (tTime !== this._tTime || force || crossingStart) {
      if (prevTime !== this._time && dur) {
        //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
        tTime += this._time - prevTime;
        totalTime += this._time - prevTime;
      }

      time = tTime;
      prevStart = this._start;
      timeScale = this._ts;
      prevPaused = !timeScale;

      if (crossingStart) {
        dur || (prevTime = this._zTime); //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

        (totalTime || !suppressEvents) && (this._zTime = totalTime);
      }

      if (this._repeat) {
        //adjust the time for repeats and yoyos
        yoyo = this._yoyo;
        cycleDuration = dur + this._rDelay;

        if (this._repeat < -1 && totalTime < 0) {
          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
        }

        time = _roundPrecise(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

        if (tTime === tDur) {
          // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
          iteration = this._repeat;
          time = dur;
        } else {
          iteration = ~~(tTime / cycleDuration);

          if (iteration && iteration === tTime / cycleDuration) {
            time = dur;
            iteration--;
          }

          time > dur && (time = dur);
        }

        prevIteration = _animationCycle(this._tTime, cycleDuration);
        !prevTime && this._tTime && prevIteration !== iteration && (prevIteration = iteration); // edge case - if someone does addPause() at the very beginning of a repeating timeline, that pause is technically at the same spot as the end which causes this._time to get set to 0 when the totalTime would normally place the playhead at the end. See https://greensock.com/forums/topic/23823-closing-nav-animation-not-working-on-ie-and-iphone-6-maybe-other-older-browser/?tab=comments#comment-113005

        if (yoyo && iteration & 1) {
          time = dur - time;
          isYoyo = 1;
        }
        /*
        make sure children at the end/beginning of the timeline are rendered properly. If, for example,
        a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
        would get translated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
        could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So
        we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
        ensure that zero-duration tweens at the very beginning or end of the Timeline work.
        */


        if (iteration !== prevIteration && !this._lock) {
          var rewinding = yoyo && prevIteration & 1,
              doesWrap = rewinding === (yoyo && iteration & 1);
          iteration < prevIteration && (rewinding = !rewinding);
          prevTime = rewinding ? 0 : dur;
          this._lock = 1;
          this.render(prevTime || (isYoyo ? 0 : _roundPrecise(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
          this._tTime = tTime; // if a user gets the iteration() inside the onRepeat, for example, it should be accurate.

          !suppressEvents && this.parent && _callback(this, "onRepeat");
          this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);

          if (prevTime && prevTime !== this._time || prevPaused !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) {
            // if prevTime is 0 and we render at the very end, _time will be the end, thus won't match. So in this edge case, prevTime won't match _time but that's okay. If it gets killed in the onRepeat, eject as well.
            return this;
          }

          dur = this._dur; // in case the duration changed in the onRepeat

          tDur = this._tDur;

          if (doesWrap) {
            this._lock = 2;
            prevTime = rewinding ? dur : -0.0001;
            this.render(prevTime, true);
            this.vars.repeatRefresh && !isYoyo && this.invalidate();
          }

          this._lock = 0;

          if (!this._ts && !prevPaused) {
            return this;
          } //in order for yoyoEase to work properly when there's a stagger, we must swap out the ease in each sub-tween.


          _propagateYoyoEase(this, isYoyo);
        }
      }

      if (this._hasPause && !this._forcing && this._lock < 2) {
        pauseTween = _findNextPauseTween(this, _roundPrecise(prevTime), _roundPrecise(time));

        if (pauseTween) {
          tTime -= time - (time = pauseTween._start);
        }
      }

      this._tTime = tTime;
      this._time = time;
      this._act = !timeScale; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

      if (!this._initted) {
        this._onUpdate = this.vars.onUpdate;
        this._initted = 1;
        this._zTime = totalTime;
        prevTime = 0; // upon init, the playhead should always go forward; someone could invalidate() a completed timeline and then if they restart(), that would make child tweens render in reverse order which could lock in the wrong starting values if they build on each other, like tl.to(obj, {x: 100}).to(obj, {x: 0}).
      }

      if (!prevTime && time && !suppressEvents) {
        _callback(this, "onStart");

        if (this._tTime !== tTime) {
          // in case the onStart triggered a render at a different spot, eject. Like if someone did animation.pause(0.5) or something inside the onStart.
          return this;
        }
      }

      if (time >= prevTime && totalTime >= 0) {
        child = this._first;

        while (child) {
          next = child._next;

          if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
              return this.render(totalTime, suppressEvents, force);
            }

            child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);

            if (time !== this._time || !this._ts && !prevPaused) {
              //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
              pauseTween = 0;
              next && (tTime += this._zTime = -_tinyNum); // it didn't finish rendering, so flag zTime as negative so that so that the next time render() is called it'll be forced (to render any remaining children)

              break;
            }
          }

          child = next;
        }
      } else {
        child = this._last;
        var adjustedTime = totalTime < 0 ? totalTime : time; //when the playhead goes backward beyond the start of this timeline, we must pass that information down to the child animations so that zero-duration tweens know whether to render their starting or ending values.

        while (child) {
          next = child._prev;

          if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
              return this.render(totalTime, suppressEvents, force);
            }

            child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force);

            if (time !== this._time || !this._ts && !prevPaused) {
              //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
              pauseTween = 0;
              next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum); // it didn't finish rendering, so adjust zTime so that so that the next time render() is called it'll be forced (to render any remaining children)

              break;
            }
          }

          child = next;
        }
      }

      if (pauseTween && !suppressEvents) {
        this.pause();
        pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;

        if (this._ts) {
          //the callback resumed playback! So since we may have held back the playhead due to where the pause is positioned, go ahead and jump to where it's SUPPOSED to be (if no pause happened).
          this._start = prevStart; //if the pause was at an earlier time and the user resumed in the callback, it could reposition the timeline (changing its startTime), throwing things off slightly, so we make sure the _start doesn't shift.

          _setEnd(this);

          return this.render(totalTime, suppressEvents, force);
        }
      }

      this._onUpdate && !suppressEvents && _callback(this, "onUpdate", true);
      if (tTime === tDur && tDur >= this.totalDuration() || !tTime && prevTime) if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) if (!this._lock) {
        (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

        if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime || !tDur)) {
          _callback(this, tTime === tDur && totalTime >= 0 ? "onComplete" : "onReverseComplete", true);

          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
        }
      }
    }

    return this;
  };

  _proto2.add = function add(child, position) {
    var _this2 = this;

    _isNumber(position) || (position = _parsePosition(this, position, child));

    if (!(child instanceof Animation)) {
      if (_isArray(child)) {
        child.forEach(function (obj) {
          return _this2.add(obj, position);
        });
        return this;
      }

      if (_isString(child)) {
        return this.addLabel(child, position);
      }

      if (_isFunction(child)) {
        child = Tween.delayedCall(0, child);
      } else {
        return this;
      }
    }

    return this !== child ? _addToTimeline(this, child, position) : this; //don't allow a timeline to be added to itself as a child!
  };

  _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
    if (nested === void 0) {
      nested = true;
    }

    if (tweens === void 0) {
      tweens = true;
    }

    if (timelines === void 0) {
      timelines = true;
    }

    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = -_bigNum;
    }

    var a = [],
        child = this._first;

    while (child) {
      if (child._start >= ignoreBeforeTime) {
        if (child instanceof Tween) {
          tweens && a.push(child);
        } else {
          timelines && a.push(child);
          nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
        }
      }

      child = child._next;
    }

    return a;
  };

  _proto2.getById = function getById(id) {
    var animations = this.getChildren(1, 1, 1),
        i = animations.length;

    while (i--) {
      if (animations[i].vars.id === id) {
        return animations[i];
      }
    }
  };

  _proto2.remove = function remove(child) {
    if (_isString(child)) {
      return this.removeLabel(child);
    }

    if (_isFunction(child)) {
      return this.killTweensOf(child);
    }

    _removeLinkedListItem(this, child);

    if (child === this._recent) {
      this._recent = this._last;
    }

    return _uncache(this);
  };

  _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
    if (!arguments.length) {
      return this._tTime;
    }

    this._forcing = 1;

    if (!this._dp && this._ts) {
      //special case for the global timeline (or any other that has no parent or detached parent).
      this._start = _roundPrecise(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
    }

    _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);

    this._forcing = 0;
    return this;
  };

  _proto2.addLabel = function addLabel(label, position) {
    this.labels[label] = _parsePosition(this, position);
    return this;
  };

  _proto2.removeLabel = function removeLabel(label) {
    delete this.labels[label];
    return this;
  };

  _proto2.addPause = function addPause(position, callback, params) {
    var t = Tween.delayedCall(0, callback || _emptyFunc, params);
    t.data = "isPause";
    this._hasPause = 1;
    return _addToTimeline(this, t, _parsePosition(this, position));
  };

  _proto2.removePause = function removePause(position) {
    var child = this._first;
    position = _parsePosition(this, position);

    while (child) {
      if (child._start === position && child.data === "isPause") {
        _removeFromParent(child);
      }

      child = child._next;
    }
  };

  _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    var tweens = this.getTweensOf(targets, onlyActive),
        i = tweens.length;

    while (i--) {
      _overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
    }

    return this;
  };

  _proto2.getTweensOf = function getTweensOf(targets, onlyActive) {
    var a = [],
        parsedTargets = toArray(targets),
        child = this._first,
        isGlobalTime = _isNumber(onlyActive),
        // a number is interpreted as a global time. If the animation spans
    children;

    while (child) {
      if (child instanceof Tween) {
        if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) {
          // note: if this is for overwriting, it should only be for tweens that aren't paused and are initted.
          a.push(child);
        }
      } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
        a.push.apply(a, children);
      }

      child = child._next;
    }

    return a;
  } // potential future feature - targets() on timelines
  // targets() {
  // 	let result = [];
  // 	this.getChildren(true, true, false).forEach(t => result.push(...t.targets()));
  // 	return result.filter((v, i) => result.indexOf(v) === i);
  // }
  ;

  _proto2.tweenTo = function tweenTo(position, vars) {
    vars = vars || {};

    var tl = this,
        endTime = _parsePosition(tl, position),
        _vars = vars,
        startAt = _vars.startAt,
        _onStart = _vars.onStart,
        onStartParams = _vars.onStartParams,
        immediateRender = _vars.immediateRender,
        initted,
        tween = Tween.to(tl, _setDefaults({
      ease: vars.ease || "none",
      lazy: false,
      immediateRender: false,
      time: endTime,
      overwrite: "auto",
      duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
      onStart: function onStart() {
        tl.pause();

        if (!initted) {
          var duration = vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale());
          tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
          initted = 1;
        }

        _onStart && _onStart.apply(tween, onStartParams || []); //in case the user had an onStart in the vars - we don't want to overwrite it.
      }
    }, vars));

    return immediateRender ? tween.render(0) : tween;
  };

  _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
    return this.tweenTo(toPosition, _setDefaults({
      startAt: {
        time: _parsePosition(this, fromPosition)
      }
    }, vars));
  };

  _proto2.recent = function recent() {
    return this._recent;
  };

  _proto2.nextLabel = function nextLabel(afterTime) {
    if (afterTime === void 0) {
      afterTime = this._time;
    }

    return _getLabelInDirection(this, _parsePosition(this, afterTime));
  };

  _proto2.previousLabel = function previousLabel(beforeTime) {
    if (beforeTime === void 0) {
      beforeTime = this._time;
    }

    return _getLabelInDirection(this, _parsePosition(this, beforeTime), 1);
  };

  _proto2.currentLabel = function currentLabel(value) {
    return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
  };

  _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = 0;
    }

    var child = this._first,
        labels = this.labels,
        p;

    while (child) {
      if (child._start >= ignoreBeforeTime) {
        child._start += amount;
        child._end += amount;
      }

      child = child._next;
    }

    if (adjustLabels) {
      for (p in labels) {
        if (labels[p] >= ignoreBeforeTime) {
          labels[p] += amount;
        }
      }
    }

    return _uncache(this);
  };

  _proto2.invalidate = function invalidate() {
    var child = this._first;
    this._lock = 0;

    while (child) {
      child.invalidate();
      child = child._next;
    }

    return _Animation.prototype.invalidate.call(this);
  };

  _proto2.clear = function clear(includeLabels) {
    if (includeLabels === void 0) {
      includeLabels = true;
    }

    var child = this._first,
        next;

    while (child) {
      next = child._next;
      this.remove(child);
      child = next;
    }

    this._dp && (this._time = this._tTime = this._pTime = 0);
    includeLabels && (this.labels = {});
    return _uncache(this);
  };

  _proto2.totalDuration = function totalDuration(value) {
    var max = 0,
        self = this,
        child = self._last,
        prevStart = _bigNum,
        prev,
        start,
        parent;

    if (arguments.length) {
      return self.timeScale((self._repeat < 0 ? self.duration() : self.totalDuration()) / (self.reversed() ? -value : value));
    }

    if (self._dirty) {
      parent = self.parent;

      while (child) {
        prev = child._prev; //record it here in case the tween changes position in the sequence...

        child._dirty && child.totalDuration(); //could change the tween._startTime, so make sure the animation's cache is clean before analyzing it.

        start = child._start;

        if (start > prevStart && self._sort && child._ts && !self._lock) {
          //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
          self._lock = 1; //prevent endless recursive calls - there are methods that get triggered that check duration/totalDuration when we add().

          _addToTimeline(self, child, start - child._delay, 1)._lock = 0;
        } else {
          prevStart = start;
        }

        if (start < 0 && child._ts) {
          //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
          max -= start;

          if (!parent && !self._dp || parent && parent.smoothChildTiming) {
            self._start += start / self._ts;
            self._time -= start;
            self._tTime -= start;
          }

          self.shiftChildren(-start, false, -1e999);
          prevStart = 0;
        }

        child._end > max && child._ts && (max = child._end);
        child = prev;
      }

      _setDuration(self, self === _globalTimeline && self._time > max ? self._time : max, 1, 1);

      self._dirty = 0;
    }

    return self._tDur;
  };

  Timeline.updateRoot = function updateRoot(time) {
    if (_globalTimeline._ts) {
      _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));

      _lastRenderedFrame = _ticker.frame;
    }

    if (_ticker.frame >= _nextGCFrame) {
      _nextGCFrame += _config.autoSleep || 120;
      var child = _globalTimeline._first;
      if (!child || !child._ts) if (_config.autoSleep && _ticker._listeners.length < 2) {
        while (child && !child._ts) {
          child = child._next;
        }

        child || _ticker.sleep();
      }
    }
  };

  return Timeline;
}(Animation);

_setDefaults(Timeline.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});

var _addComplexStringPropTween = function _addComplexStringPropTween(target, prop, start, end, setter, stringFilter, funcParam) {
  //note: we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
  var pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter),
      index = 0,
      matchIndex = 0,
      result,
      startNums,
      color,
      endNum,
      chunk,
      startNum,
      hasRandom,
      a;
  pt.b = start;
  pt.e = end;
  start += ""; //ensure values are strings

  end += "";

  if (hasRandom = ~end.indexOf("random(")) {
    end = _replaceRandom(end);
  }

  if (stringFilter) {
    a = [start, end];
    stringFilter(a, target, prop); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.

    start = a[0];
    end = a[1];
  }

  startNums = start.match(_complexStringNumExp) || [];

  while (result = _complexStringNumExp.exec(end)) {
    endNum = result[0];
    chunk = end.substring(index, result.index);

    if (color) {
      color = (color + 1) % 5;
    } else if (chunk.substr(-5) === "rgba(") {
      color = 1;
    }

    if (endNum !== startNums[matchIndex++]) {
      startNum = parseFloat(startNums[matchIndex - 1]) || 0; //these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.

      pt._pt = {
        _next: pt._pt,
        p: chunk || matchIndex === 1 ? chunk : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: startNum,
        c: endNum.charAt(1) === "=" ? parseFloat(endNum.substr(2)) * (endNum.charAt(0) === "-" ? -1 : 1) : parseFloat(endNum) - startNum,
        m: color && color < 4 ? Math.round : 0
      };
      index = _complexStringNumExp.lastIndex;
    }
  }

  pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)

  pt.fp = funcParam;

  if (_relExp.test(end) || hasRandom) {
    pt.e = 0; //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
  }

  this._pt = pt; //start the linked list with this new PropTween. Remember, we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.

  return pt;
},
    _addPropTween = function _addPropTween(target, prop, start, end, index, targets, modifier, stringFilter, funcParam) {
  _isFunction(end) && (end = end(index || 0, target, targets));
  var currentValue = target[prop],
      parsedStart = start !== "get" ? start : !_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](),
      setter = !_isFunction(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc,
      pt;

  if (_isString(end)) {
    if (~end.indexOf("random(")) {
      end = _replaceRandom(end);
    }

    if (end.charAt(1) === "=") {
      pt = parseFloat(parsedStart) + parseFloat(end.substr(2)) * (end.charAt(0) === "-" ? -1 : 1) + (getUnit(parsedStart) || 0);

      if (pt || pt === 0) {
        // to avoid isNaN, like if someone passes in a value like "!= whatever"
        end = pt;
      }
    }
  }

  if (parsedStart !== end) {
    if (!isNaN(parsedStart * end) && end !== "") {
      // fun fact: any number multiplied by "" is evaluated as the number 0!
      pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);
      funcParam && (pt.fp = funcParam);
      modifier && pt.modifier(modifier, this, target);
      return this._pt = pt;
    }

    !currentValue && !(prop in target) && _missingPlugin(prop, end);
    return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
  }
},
    //creates a copy of the vars object and processes any function-based values (putting the resulting values directly into the copy) as well as strings with "random()" in them. It does NOT process relative values.
_processVars = function _processVars(vars, index, target, targets, tween) {
  _isFunction(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));

  if (!_isObject(vars) || vars.style && vars.nodeType || _isArray(vars) || _isTypedArray(vars)) {
    return _isString(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
  }

  var copy = {},
      p;

  for (p in vars) {
    copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
  }

  return copy;
},
    _checkPlugin = function _checkPlugin(property, vars, tween, index, target, targets) {
  var plugin, pt, ptLookup, i;

  if (_plugins[property] && (plugin = new _plugins[property]()).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
    tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);

    if (tween !== _quickTween) {
      ptLookup = tween._ptLookup[tween._targets.indexOf(target)]; //note: we can't use tween._ptLookup[index] because for staggered tweens, the index from the fullTargets array won't match what it is in each individual tween that spawns from the stagger.

      i = plugin._props.length;

      while (i--) {
        ptLookup[plugin._props[i]] = pt;
      }
    }
  }

  return plugin;
},
    _overwritingTween,
    //store a reference temporarily so we can avoid overwriting itself.
_initTween = function _initTween(tween, time) {
  var vars = tween.vars,
      ease = vars.ease,
      startAt = vars.startAt,
      immediateRender = vars.immediateRender,
      lazy = vars.lazy,
      onUpdate = vars.onUpdate,
      onUpdateParams = vars.onUpdateParams,
      callbackScope = vars.callbackScope,
      runBackwards = vars.runBackwards,
      yoyoEase = vars.yoyoEase,
      keyframes = vars.keyframes,
      autoRevert = vars.autoRevert,
      dur = tween._dur,
      prevStartAt = tween._startAt,
      targets = tween._targets,
      parent = tween.parent,
      fullTargets = parent && parent.data === "nested" ? parent.parent._targets : targets,
      autoOverwrite = tween._overwrite === "auto" && !_suppressOverwrites,
      tl = tween.timeline,
      cleanVars,
      i,
      p,
      pt,
      target,
      hasPriority,
      gsData,
      harness,
      plugin,
      ptLookup,
      index,
      harnessVars,
      overwritten;
  tl && (!keyframes || !ease) && (ease = "none");
  tween._ease = _parseEase(ease, _defaults.ease);
  tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults.ease)) : 0;

  if (yoyoEase && tween._yoyo && !tween._repeat) {
    //there must have been a parent timeline with yoyo:true that is currently in its yoyo phase, so flip the eases.
    yoyoEase = tween._yEase;
    tween._yEase = tween._ease;
    tween._ease = yoyoEase;
  }

  tween._from = !tl && !!vars.runBackwards; //nested timelines should never run backwards - the backwards-ness is in the child tweens.

  if (!tl) {
    //if there's an internal timeline, skip all the parsing because we passed that task down the chain.
    harness = targets[0] ? _getCache(targets[0]).harness : 0;
    harnessVars = harness && vars[harness.prop]; //someone may need to specify CSS-specific values AND non-CSS values, like if the element has an "x" property plus it's a standard DOM element. We allow people to distinguish by wrapping plugin-specific stuff in a css:{} object for example.

    cleanVars = _copyExcluding(vars, _reservedProps);
    prevStartAt && prevStartAt.render(-1, true).kill();

    if (startAt) {
      _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults({
        data: "isStart",
        overwrite: false,
        parent: parent,
        immediateRender: true,
        lazy: _isNotFalse(lazy),
        startAt: null,
        delay: 0,
        onUpdate: onUpdate,
        onUpdateParams: onUpdateParams,
        callbackScope: callbackScope,
        stagger: 0
      }, startAt))); //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, from, to).fromTo(e, to, from);


      time < 0 && !immediateRender && !autoRevert && tween._startAt.render(-1, true); // rare edge case, like if a render is forced in the negative direction of a non-initted tween.

      if (immediateRender) {
        time > 0 && !autoRevert && (tween._startAt = 0); //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in Timeline instances where immediateRender was false or when autoRevert is explicitly set to true.

        if (dur && time <= 0) {
          time && (tween._zTime = time);
          return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a Timeline, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
        } // if (time > 0) {
        // 	autoRevert || (tween._startAt = 0); //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in Timeline instances where immediateRender was false or when autoRevert is explicitly set to true.
        // } else if (dur && !(time < 0 && prevStartAt)) {
        // 	time && (tween._zTime = time);
        // 	return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a Timeline, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
        // }

      } else if (autoRevert === false) {
        tween._startAt = 0;
      }
    } else if (runBackwards && dur) {
      //from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
      if (prevStartAt) {
        !autoRevert && (tween._startAt = 0);
      } else {
        time && (immediateRender = false); //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0

        p = _setDefaults({
          overwrite: false,
          data: "isFromStart",
          //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
          lazy: immediateRender && _isNotFalse(lazy),
          immediateRender: immediateRender,
          //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
          stagger: 0,
          parent: parent //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y:gsap.utils.wrap([-100,100])})

        }, cleanVars);
        harnessVars && (p[harness.prop] = harnessVars); // in case someone does something like .from(..., {css:{}})

        _removeFromParent(tween._startAt = Tween.set(targets, p));

        time < 0 && tween._startAt.render(-1, true); // rare edge case, like if a render is forced in the negative direction of a non-initted from() tween.

        if (!immediateRender) {
          _initTween(tween._startAt, _tinyNum); //ensures that the initial values are recorded

        } else if (!time) {
          return;
        }
      }
    }

    tween._pt = 0;
    lazy = dur && _isNotFalse(lazy) || lazy && !dur;

    for (i = 0; i < targets.length; i++) {
      target = targets[i];
      gsData = target._gsap || _harness(targets)[i]._gsap;
      tween._ptLookup[i] = ptLookup = {};
      _lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)

      index = fullTargets === targets ? i : fullTargets.indexOf(target);

      if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
        tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);

        plugin._props.forEach(function (name) {
          ptLookup[name] = pt;
        });

        plugin.priority && (hasPriority = 1);
      }

      if (!harness || harnessVars) {
        for (p in cleanVars) {
          if (_plugins[p] && (plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))) {
            plugin.priority && (hasPriority = 1);
          } else {
            ptLookup[p] = pt = _addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
          }
        }
      }

      tween._op && tween._op[i] && tween.kill(target, tween._op[i]);

      if (autoOverwrite && tween._pt) {
        _overwritingTween = tween;

        _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(time)); // make sure the overwriting doesn't overwrite THIS tween!!!


        overwritten = !tween.parent;
        _overwritingTween = 0;
      }

      tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
    }

    hasPriority && _sortPropTweensByPriority(tween);
    tween._onInit && tween._onInit(tween); //plugins like RoundProps must wait until ALL of the PropTweens are instantiated. In the plugin's init() function, it sets the _onInit on the tween instance. May not be pretty/intuitive, but it's fast and keeps file size down.
  }

  tween._onUpdate = onUpdate;
  tween._initted = (!tween._op || tween._pt) && !overwritten; // if overwrittenProps resulted in the entire tween being killed, do NOT flag it as initted or else it may render for one tick.
},
    _addAliasesToVars = function _addAliasesToVars(targets, vars) {
  var harness = targets[0] ? _getCache(targets[0]).harness : 0,
      propertyAliases = harness && harness.aliases,
      copy,
      p,
      i,
      aliases;

  if (!propertyAliases) {
    return vars;
  }

  copy = _merge({}, vars);

  for (p in propertyAliases) {
    if (p in copy) {
      aliases = propertyAliases[p].split(",");
      i = aliases.length;

      while (i--) {
        copy[aliases[i]] = copy[p];
      }
    }
  }

  return copy;
},
    _parseFuncOrString = function _parseFuncOrString(value, tween, i, target, targets) {
  return _isFunction(value) ? value.call(tween, i, target, targets) : _isString(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
},
    _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase",
    _staggerPropsToSkip = (_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger").split(",");
/*
 * --------------------------------------------------------------------------------------
 * TWEEN
 * --------------------------------------------------------------------------------------
 */


var Tween = /*#__PURE__*/function (_Animation2) {
  _inheritsLoose(Tween, _Animation2);

  function Tween(targets, vars, position, skipInherit) {
    var _this3;

    if (typeof vars === "number") {
      position.duration = vars;
      vars = position;
      position = null;
    }

    _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars)) || this;
    var _this3$vars = _this3.vars,
        duration = _this3$vars.duration,
        delay = _this3$vars.delay,
        immediateRender = _this3$vars.immediateRender,
        stagger = _this3$vars.stagger,
        overwrite = _this3$vars.overwrite,
        keyframes = _this3$vars.keyframes,
        defaults = _this3$vars.defaults,
        scrollTrigger = _this3$vars.scrollTrigger,
        yoyoEase = _this3$vars.yoyoEase,
        parent = vars.parent || _globalTimeline,
        parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber(targets[0]) : "length" in vars) ? [targets] : toArray(targets),
        tl,
        i,
        copy,
        l,
        p,
        curTarget,
        staggerFunc,
        staggerVarsToMerge;
    _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://greensock.com", !_config.nullTargetWarn) || [];
    _this3._ptLookup = []; //PropTween lookup. An array containing an object for each target, having keys for each tweening property

    _this3._overwrite = overwrite;

    if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
      vars = _this3.vars;
      tl = _this3.timeline = new Timeline({
        data: "nested",
        defaults: defaults || {}
      });
      tl.kill();
      tl.parent = tl._dp = _assertThisInitialized(_this3);
      tl._start = 0;

      if (keyframes) {
        _inheritDefaults(_setDefaults(tl.vars.defaults, {
          ease: "none"
        }));

        stagger ? parsedTargets.forEach(function (t, i) {
          return keyframes.forEach(function (frame, j) {
            return tl.to(t, frame, j ? ">" : i * stagger);
          });
        }) : keyframes.forEach(function (frame) {
          return tl.to(parsedTargets, frame, ">");
        });
      } else {
        l = parsedTargets.length;
        staggerFunc = stagger ? distribute(stagger) : _emptyFunc;

        if (_isObject(stagger)) {
          //users can pass in callbacks like onStart/onComplete in the stagger object. These should fire with each individual tween.
          for (p in stagger) {
            if (~_staggerTweenProps.indexOf(p)) {
              staggerVarsToMerge || (staggerVarsToMerge = {});
              staggerVarsToMerge[p] = stagger[p];
            }
          }
        }

        for (i = 0; i < l; i++) {
          copy = {};

          for (p in vars) {
            if (_staggerPropsToSkip.indexOf(p) < 0) {
              copy[p] = vars[p];
            }
          }

          copy.stagger = 0;
          yoyoEase && (copy.yoyoEase = yoyoEase);
          staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
          curTarget = parsedTargets[i]; //don't just copy duration or delay because if they're a string or function, we'd end up in an infinite loop because _isFuncOrString() would evaluate as true in the child tweens, entering this loop, etc. So we parse the value straight from vars and default to 0.

          copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i, curTarget, parsedTargets);
          copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;

          if (!stagger && l === 1 && copy.delay) {
            // if someone does delay:"random(1, 5)", repeat:-1, for example, the delay shouldn't be inside the repeat.
            _this3._delay = delay = copy.delay;
            _this3._start += delay;
            copy.delay = 0;
          }

          tl.to(curTarget, copy, staggerFunc(i, curTarget, parsedTargets));
        }

        tl.duration() ? duration = delay = 0 : _this3.timeline = 0; // if the timeline's duration is 0, we don't need a timeline internally!
      }

      duration || _this3.duration(duration = tl.duration());
    } else {
      _this3.timeline = 0; //speed optimization, faster lookups (no going up the prototype chain)
    }

    if (overwrite === true && !_suppressOverwrites) {
      _overwritingTween = _assertThisInitialized(_this3);

      _globalTimeline.killTweensOf(parsedTargets);

      _overwritingTween = 0;
    }

    _addToTimeline(parent, _assertThisInitialized(_this3), position);

    vars.reversed && _this3.reverse();
    vars.paused && _this3.paused(true);

    if (immediateRender || !duration && !keyframes && _this3._start === _roundPrecise(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && parent.data !== "nested") {
      _this3._tTime = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)

      _this3.render(Math.max(0, -delay)); //in case delay is negative

    }

    scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
    return _this3;
  }

  var _proto3 = Tween.prototype;

  _proto3.render = function render(totalTime, suppressEvents, force) {
    var prevTime = this._time,
        tDur = this._tDur,
        dur = this._dur,
        tTime = totalTime > tDur - _tinyNum && totalTime >= 0 ? tDur : totalTime < _tinyNum ? 0 : totalTime,
        time,
        pt,
        iteration,
        cycleDuration,
        prevIteration,
        isYoyo,
        ratio,
        timeline,
        yoyoEase;

    if (!dur) {
      _renderZeroDurationTween(this, totalTime, suppressEvents, force);
    } else if (tTime !== this._tTime || !totalTime || force || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== totalTime < 0) {
      //this senses if we're crossing over the start time, in which case we must record _zTime and force the render, but we do it in this lengthy conditional way for performance reasons (usually we can skip the calculations): this._initted && (this._zTime < 0) !== (totalTime < 0)
      time = tTime;
      timeline = this.timeline;

      if (this._repeat) {
        //adjust the time for repeats and yoyos
        cycleDuration = dur + this._rDelay;

        if (this._repeat < -1 && totalTime < 0) {
          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
        }

        time = _roundPrecise(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

        if (tTime === tDur) {
          // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
          iteration = this._repeat;
          time = dur;
        } else {
          iteration = ~~(tTime / cycleDuration);

          if (iteration && iteration === tTime / cycleDuration) {
            time = dur;
            iteration--;
          }

          time > dur && (time = dur);
        }

        isYoyo = this._yoyo && iteration & 1;

        if (isYoyo) {
          yoyoEase = this._yEase;
          time = dur - time;
        }

        prevIteration = _animationCycle(this._tTime, cycleDuration);

        if (time === prevTime && !force && this._initted) {
          //could be during the repeatDelay part. No need to render and fire callbacks.
          return this;
        }

        if (iteration !== prevIteration) {
          timeline && this._yEase && _propagateYoyoEase(timeline, isYoyo); //repeatRefresh functionality

          if (this.vars.repeatRefresh && !isYoyo && !this._lock) {
            this._lock = force = 1; //force, otherwise if lazy is true, the _attemptInitTween() will return and we'll jump out and get caught bouncing on each tick.

            this.render(_roundPrecise(cycleDuration * iteration), true).invalidate()._lock = 0;
          }
        }
      }

      if (!this._initted) {
        if (_attemptInitTween(this, totalTime < 0 ? totalTime : time, force, suppressEvents)) {
          this._tTime = 0; // in constructor if immediateRender is true, we set _tTime to -_tinyNum to have the playhead cross the starting point but we can't leave _tTime as a negative number.

          return this;
        }

        if (dur !== this._dur) {
          // while initting, a plugin like InertiaPlugin might alter the duration, so rerun from the start to ensure everything renders as it should.
          return this.render(totalTime, suppressEvents, force);
        }
      }

      this._tTime = tTime;
      this._time = time;

      if (!this._act && this._ts) {
        this._act = 1; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

        this._lazy = 0;
      }

      this.ratio = ratio = (yoyoEase || this._ease)(time / dur);

      if (this._from) {
        this.ratio = ratio = 1 - ratio;
      }

      if (time && !prevTime && !suppressEvents) {
        _callback(this, "onStart");

        if (this._tTime !== tTime) {
          // in case the onStart triggered a render at a different spot, eject. Like if someone did animation.pause(0.5) or something inside the onStart.
          return this;
        }
      }

      pt = this._pt;

      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }

      timeline && timeline.render(totalTime < 0 ? totalTime : !time && isYoyo ? -_tinyNum : timeline._dur * ratio, suppressEvents, force) || this._startAt && (this._zTime = totalTime);

      if (this._onUpdate && !suppressEvents) {
        totalTime < 0 && this._startAt && this._startAt.render(totalTime, true, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.

        _callback(this, "onUpdate");
      }

      this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback(this, "onRepeat");

      if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
        totalTime < 0 && this._startAt && !this._onUpdate && this._startAt.render(totalTime, true, true);
        (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if we're rendering at exactly a time of 0, as there could be autoRevert values that should get set on the next tick (if the playhead goes backward beyond the startTime, negative totalTime). Don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

        if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime)) {
          // if prevTime and tTime are zero, we shouldn't fire the onReverseComplete. This could happen if you gsap.to(... {paused:true}).play();
          _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);

          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
        }
      }
    }

    return this;
  };

  _proto3.targets = function targets() {
    return this._targets;
  };

  _proto3.invalidate = function invalidate() {
    this._pt = this._op = this._startAt = this._onUpdate = this._lazy = this.ratio = 0;
    this._ptLookup = [];
    this.timeline && this.timeline.invalidate();
    return _Animation2.prototype.invalidate.call(this);
  };

  _proto3.kill = function kill(targets, vars) {
    if (vars === void 0) {
      vars = "all";
    }

    if (!targets && (!vars || vars === "all")) {
      this._lazy = this._pt = 0;
      return this.parent ? _interrupt(this) : this;
    }

    if (this.timeline) {
      var tDur = this.timeline.totalDuration();
      this.timeline.killTweensOf(targets, vars, _overwritingTween && _overwritingTween.vars.overwrite !== true)._first || _interrupt(this); // if nothing is left tweening, interrupt.

      this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1); // if a nested tween is killed that changes the duration, it should affect this tween's duration. We must use the ratio, though, because sometimes the internal timeline is stretched like for keyframes where they don't all add up to whatever the parent tween's duration was set to.

      return this;
    }

    var parsedTargets = this._targets,
        killingTargets = targets ? toArray(targets) : parsedTargets,
        propTweenLookup = this._ptLookup,
        firstPT = this._pt,
        overwrittenProps,
        curLookup,
        curOverwriteProps,
        props,
        p,
        pt,
        i;

    if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
      vars === "all" && (this._pt = 0);
      return _interrupt(this);
    }

    overwrittenProps = this._op = this._op || [];

    if (vars !== "all") {
      //so people can pass in a comma-delimited list of property names
      if (_isString(vars)) {
        p = {};

        _forEachName(vars, function (name) {
          return p[name] = 1;
        });

        vars = p;
      }

      vars = _addAliasesToVars(parsedTargets, vars);
    }

    i = parsedTargets.length;

    while (i--) {
      if (~killingTargets.indexOf(parsedTargets[i])) {
        curLookup = propTweenLookup[i];

        if (vars === "all") {
          overwrittenProps[i] = vars;
          props = curLookup;
          curOverwriteProps = {};
        } else {
          curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
          props = vars;
        }

        for (p in props) {
          pt = curLookup && curLookup[p];

          if (pt) {
            if (!("kill" in pt.d) || pt.d.kill(p) === true) {
              _removeLinkedListItem(this, pt, "_pt");
            }

            delete curLookup[p];
          }

          if (curOverwriteProps !== "all") {
            curOverwriteProps[p] = 1;
          }
        }
      }
    }

    this._initted && !this._pt && firstPT && _interrupt(this); //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.

    return this;
  };

  Tween.to = function to(targets, vars) {
    return new Tween(targets, vars, arguments[2]);
  };

  Tween.from = function from(targets, vars) {
    return _createTweenType(1, arguments);
  };

  Tween.delayedCall = function delayedCall(delay, callback, params, scope) {
    return new Tween(callback, 0, {
      immediateRender: false,
      lazy: false,
      overwrite: false,
      delay: delay,
      onComplete: callback,
      onReverseComplete: callback,
      onCompleteParams: params,
      onReverseCompleteParams: params,
      callbackScope: scope
    });
  };

  Tween.fromTo = function fromTo(targets, fromVars, toVars) {
    return _createTweenType(2, arguments);
  };

  Tween.set = function set(targets, vars) {
    vars.duration = 0;
    vars.repeatDelay || (vars.repeat = 0);
    return new Tween(targets, vars);
  };

  Tween.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    return _globalTimeline.killTweensOf(targets, props, onlyActive);
  };

  return Tween;
}(Animation);

_setDefaults(Tween.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
}); //add the pertinent timeline methods to Tween instances so that users can chain conveniently and create a timeline automatically. (removed due to concerns that it'd ultimately add to more confusion especially for beginners)
// _forEachName("to,from,fromTo,set,call,add,addLabel,addPause", name => {
// 	Tween.prototype[name] = function() {
// 		let tl = new Timeline();
// 		return _addToTimeline(tl, this)[name].apply(tl, toArray(arguments));
// 	}
// });
//for backward compatibility. Leverage the timeline calls.


_forEachName("staggerTo,staggerFrom,staggerFromTo", function (name) {
  Tween[name] = function () {
    var tl = new Timeline(),
        params = _slice.call(arguments, 0);

    params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
    return tl[name].apply(tl, params);
  };
});
/*
 * --------------------------------------------------------------------------------------
 * PROPTWEEN
 * --------------------------------------------------------------------------------------
 */


var _setterPlain = function _setterPlain(target, property, value) {
  return target[property] = value;
},
    _setterFunc = function _setterFunc(target, property, value) {
  return target[property](value);
},
    _setterFuncWithParam = function _setterFuncWithParam(target, property, value, data) {
  return target[property](data.fp, value);
},
    _setterAttribute = function _setterAttribute(target, property, value) {
  return target.setAttribute(property, value);
},
    _getSetter = function _getSetter(target, property) {
  return _isFunction(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
},
    _renderPlain = function _renderPlain(ratio, data) {
  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1000000) / 1000000, data);
},
    _renderBoolean = function _renderBoolean(ratio, data) {
  return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
},
    _renderComplexString = function _renderComplexString(ratio, data) {
  var pt = data._pt,
      s = "";

  if (!ratio && data.b) {
    //b = beginning string
    s = data.b;
  } else if (ratio === 1 && data.e) {
    //e = ending string
    s = data.e;
  } else {
    while (pt) {
      s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 10000) / 10000) + s; //we use the "p" property for the text inbetween (like a suffix). And in the context of a complex string, the modifier (m) is typically just Math.round(), like for RGB colors.

      pt = pt._next;
    }

    s += data.c; //we use the "c" of the PropTween to store the final chunk of non-numeric text.
  }

  data.set(data.t, data.p, s, data);
},
    _renderPropTweens = function _renderPropTweens(ratio, data) {
  var pt = data._pt;

  while (pt) {
    pt.r(ratio, pt.d);
    pt = pt._next;
  }
},
    _addPluginModifier = function _addPluginModifier(modifier, tween, target, property) {
  var pt = this._pt,
      next;

  while (pt) {
    next = pt._next;
    pt.p === property && pt.modifier(modifier, tween, target);
    pt = next;
  }
},
    _killPropTweensOf = function _killPropTweensOf(property) {
  var pt = this._pt,
      hasNonDependentRemaining,
      next;

  while (pt) {
    next = pt._next;

    if (pt.p === property && !pt.op || pt.op === property) {
      _removeLinkedListItem(this, pt, "_pt");
    } else if (!pt.dep) {
      hasNonDependentRemaining = 1;
    }

    pt = next;
  }

  return !hasNonDependentRemaining;
},
    _setterWithModifier = function _setterWithModifier(target, property, value, data) {
  data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
},
    _sortPropTweensByPriority = function _sortPropTweensByPriority(parent) {
  var pt = parent._pt,
      next,
      pt2,
      first,
      last; //sorts the PropTween linked list in order of priority because some plugins need to do their work after ALL of the PropTweens were created (like RoundPropsPlugin and ModifiersPlugin)

  while (pt) {
    next = pt._next;
    pt2 = first;

    while (pt2 && pt2.pr > pt.pr) {
      pt2 = pt2._next;
    }

    if (pt._prev = pt2 ? pt2._prev : last) {
      pt._prev._next = pt;
    } else {
      first = pt;
    }

    if (pt._next = pt2) {
      pt2._prev = pt;
    } else {
      last = pt;
    }

    pt = next;
  }

  parent._pt = first;
}; //PropTween key: t = target, p = prop, r = renderer, d = data, s = start, c = change, op = overwriteProperty (ONLY populated when it's different than p), pr = priority, _next/_prev for the linked list siblings, set = setter, m = modifier, mSet = modifierSetter (the original setter, before a modifier was added)


var PropTween = /*#__PURE__*/function () {
  function PropTween(next, target, prop, start, change, renderer, data, setter, priority) {
    this.t = target;
    this.s = start;
    this.c = change;
    this.p = prop;
    this.r = renderer || _renderPlain;
    this.d = data || this;
    this.set = setter || _setterPlain;
    this.pr = priority || 0;
    this._next = next;

    if (next) {
      next._prev = this;
    }
  }

  var _proto4 = PropTween.prototype;

  _proto4.modifier = function modifier(func, tween, target) {
    this.mSet = this.mSet || this.set; //in case it was already set (a PropTween can only have one modifier)

    this.set = _setterWithModifier;
    this.m = func;
    this.mt = target; //modifier target

    this.tween = tween;
  };

  return PropTween;
}(); //Initialization tasks

_forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function (name) {
  return _reservedProps[name] = 1;
});

_globals.TweenMax = _globals.TweenLite = Tween;
_globals.TimelineLite = _globals.TimelineMax = Timeline;
_globalTimeline = new Timeline({
  sortChildren: false,
  defaults: _defaults,
  autoRemoveChildren: true,
  id: "root",
  smoothChildTiming: true
});
_config.stringFilter = _colorStringFilter;
/*
 * --------------------------------------------------------------------------------------
 * GSAP
 * --------------------------------------------------------------------------------------
 */

var _gsap = {
  registerPlugin: function registerPlugin() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    args.forEach(function (config) {
      return _createPlugin(config);
    });
  },
  timeline: function timeline(vars) {
    return new Timeline(vars);
  },
  getTweensOf: function getTweensOf(targets, onlyActive) {
    return _globalTimeline.getTweensOf(targets, onlyActive);
  },
  getProperty: function getProperty(target, property, unit, uncache) {
    _isString(target) && (target = toArray(target)[0]); //in case selector text or an array is passed in

    var getter = _getCache(target || {}).get,
        format = unit ? _passThrough : _numericIfPossible;

    unit === "native" && (unit = "");
    return !target ? target : !property ? function (property, unit, uncache) {
      return format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
    } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
  },
  quickSetter: function quickSetter(target, property, unit) {
    target = toArray(target);

    if (target.length > 1) {
      var setters = target.map(function (t) {
        return gsap.quickSetter(t, property, unit);
      }),
          l = setters.length;
      return function (value) {
        var i = l;

        while (i--) {
          setters[i](value);
        }
      };
    }

    target = target[0] || {};

    var Plugin = _plugins[property],
        cache = _getCache(target),
        p = cache.harness && (cache.harness.aliases || {})[property] || property,
        // in case it's an alias, like "rotate" for "rotation".
    setter = Plugin ? function (value) {
      var p = new Plugin();
      _quickTween._pt = 0;
      p.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
      p.render(1, p);
      _quickTween._pt && _renderPropTweens(1, _quickTween);
    } : cache.set(target, p);

    return Plugin ? setter : function (value) {
      return setter(target, p, unit ? value + unit : value, cache, 1);
    };
  },
  isTweening: function isTweening(targets) {
    return _globalTimeline.getTweensOf(targets, true).length > 0;
  },
  defaults: function defaults(value) {
    value && value.ease && (value.ease = _parseEase(value.ease, _defaults.ease));
    return _mergeDeep(_defaults, value || {});
  },
  config: function config(value) {
    return _mergeDeep(_config, value || {});
  },
  registerEffect: function registerEffect(_ref3) {
    var name = _ref3.name,
        effect = _ref3.effect,
        plugins = _ref3.plugins,
        defaults = _ref3.defaults,
        extendTimeline = _ref3.extendTimeline;
    (plugins || "").split(",").forEach(function (pluginName) {
      return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
    });

    _effects[name] = function (targets, vars, tl) {
      return effect(toArray(targets), _setDefaults(vars || {}, defaults), tl);
    };

    if (extendTimeline) {
      Timeline.prototype[name] = function (targets, vars, position) {
        return this.add(_effects[name](targets, _isObject(vars) ? vars : (position = vars) && {}, this), position);
      };
    }
  },
  registerEase: function registerEase(name, ease) {
    _easeMap[name] = _parseEase(ease);
  },
  parseEase: function parseEase(ease, defaultEase) {
    return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
  },
  getById: function getById(id) {
    return _globalTimeline.getById(id);
  },
  exportRoot: function exportRoot(vars, includeDelayedCalls) {
    if (vars === void 0) {
      vars = {};
    }

    var tl = new Timeline(vars),
        child,
        next;
    tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);

    _globalTimeline.remove(tl);

    tl._dp = 0; //otherwise it'll get re-activated when adding children and be re-introduced into _globalTimeline's linked list (then added to itself).

    tl._time = tl._tTime = _globalTimeline._time;
    child = _globalTimeline._first;

    while (child) {
      next = child._next;

      if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) {
        _addToTimeline(tl, child, child._start - child._delay);
      }

      child = next;
    }

    _addToTimeline(_globalTimeline, tl, 0);

    return tl;
  },
  utils: {
    wrap: wrap,
    wrapYoyo: wrapYoyo,
    distribute: distribute,
    random: random,
    snap: snap,
    normalize: normalize,
    getUnit: getUnit,
    clamp: clamp,
    splitColor: splitColor,
    toArray: toArray,
    selector: selector,
    mapRange: mapRange,
    pipe: pipe,
    unitize: unitize,
    interpolate: interpolate,
    shuffle: shuffle
  },
  install: _install,
  effects: _effects,
  ticker: _ticker,
  updateRoot: Timeline.updateRoot,
  plugins: _plugins,
  globalTimeline: _globalTimeline,
  core: {
    PropTween: PropTween,
    globals: _addGlobal,
    Tween: Tween,
    Timeline: Timeline,
    Animation: Animation,
    getCache: _getCache,
    _removeLinkedListItem: _removeLinkedListItem,
    suppressOverwrites: function suppressOverwrites(value) {
      return _suppressOverwrites = value;
    }
  }
};

_forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function (name) {
  return _gsap[name] = Tween[name];
});

_ticker.add(Timeline.updateRoot);

_quickTween = _gsap.to({}, {
  duration: 0
}); // ---- EXTRA PLUGINS --------------------------------------------------------

var _getPluginPropTween = function _getPluginPropTween(plugin, prop) {
  var pt = plugin._pt;

  while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) {
    pt = pt._next;
  }

  return pt;
},
    _addModifiers = function _addModifiers(tween, modifiers) {
  var targets = tween._targets,
      p,
      i,
      pt;

  for (p in modifiers) {
    i = targets.length;

    while (i--) {
      pt = tween._ptLookup[i][p];

      if (pt && (pt = pt.d)) {
        if (pt._pt) {
          // is a plugin
          pt = _getPluginPropTween(pt, p);
        }

        pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
      }
    }
  }
},
    _buildModifierPlugin = function _buildModifierPlugin(name, modifier) {
  return {
    name: name,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function init(target, vars, tween) {
      tween._onInit = function (tween) {
        var temp, p;

        if (_isString(vars)) {
          temp = {};

          _forEachName(vars, function (name) {
            return temp[name] = 1;
          }); //if the user passes in a comma-delimited list of property names to roundProps, like "x,y", we round to whole numbers.


          vars = temp;
        }

        if (modifier) {
          temp = {};

          for (p in vars) {
            temp[p] = modifier(vars[p]);
          }

          vars = temp;
        }

        _addModifiers(tween, vars);
      };
    }
  };
}; //register core plugins


var gsap = _gsap.registerPlugin({
  name: "attr",
  init: function init(target, vars, tween, index, targets) {
    var p, pt;

    for (p in vars) {
      pt = this.add(target, "setAttribute", (target.getAttribute(p) || 0) + "", vars[p], index, targets, 0, 0, p);
      pt && (pt.op = p);

      this._props.push(p);
    }
  }
}, {
  name: "endArray",
  init: function init(target, value) {
    var i = value.length;

    while (i--) {
      this.add(target, i, target[i] || 0, value[i]);
    }
  }
}, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap; //to prevent the core plugins from being dropped via aggressive tree shaking, we must include them in the variable declaration in this way.

Tween.version = Timeline.version = gsap.version = "3.8.0";
_coreReady = 1;
_windowExists() && _wake();
var Power0 = _easeMap.Power0,
    Power1 = _easeMap.Power1,
    Power2 = _easeMap.Power2,
    Power3 = _easeMap.Power3,
    Power4 = _easeMap.Power4,
    Linear = _easeMap.Linear,
    Quad = _easeMap.Quad,
    Cubic = _easeMap.Cubic,
    Quart = _easeMap.Quart,
    Quint = _easeMap.Quint,
    Strong = _easeMap.Strong,
    Elastic = _easeMap.Elastic,
    Back = _easeMap.Back,
    SteppedEase = _easeMap.SteppedEase,
    Bounce = _easeMap.Bounce,
    Sine = _easeMap.Sine,
    Expo = _easeMap.Expo,
    Circ = _easeMap.Circ;

 //export some internal methods/orojects for use in CSSPlugin so that we can externalize that file and allow custom builds that exclude it.


;// CONCATENATED MODULE: ./node_modules/gsap/CSSPlugin.js
/*!
 * CSSPlugin 3.8.0
 * https://greensock.com
 *
 * Copyright 2008-2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */


var CSSPlugin_win,
    CSSPlugin_doc,
    _docElement,
    _pluginInitted,
    _tempDiv,
    _tempDivStyler,
    _recentSetterPlugin,
    CSSPlugin_windowExists = function _windowExists() {
  return typeof window !== "undefined";
},
    _transformProps = {},
    _RAD2DEG = 180 / Math.PI,
    _DEG2RAD = Math.PI / 180,
    _atan2 = Math.atan2,
    CSSPlugin_bigNum = 1e8,
    _capsExp = /([A-Z])/g,
    _horizontalExp = /(?:left|right|width|margin|padding|x)/i,
    _complexExp = /[\s,\(]\S/,
    _propertyAliases = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
},
    _renderCSSProp = function _renderCSSProp(ratio, data) {
  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
},
    _renderPropWithEnd = function _renderPropWithEnd(ratio, data) {
  return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
},
    _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning(ratio, data) {
  return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u : data.b, data);
},
    //if units change, we need a way to render the original unit/value when the tween goes all the way back to the beginning (ratio:0)
_renderRoundedCSSProp = function _renderRoundedCSSProp(ratio, data) {
  var value = data.s + data.c * ratio;
  data.set(data.t, data.p, ~~(value + (value < 0 ? -.5 : .5)) + data.u, data);
},
    _renderNonTweeningValue = function _renderNonTweeningValue(ratio, data) {
  return data.set(data.t, data.p, ratio ? data.e : data.b, data);
},
    _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd(ratio, data) {
  return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
},
    _setterCSSStyle = function _setterCSSStyle(target, property, value) {
  return target.style[property] = value;
},
    _setterCSSProp = function _setterCSSProp(target, property, value) {
  return target.style.setProperty(property, value);
},
    _setterTransform = function _setterTransform(target, property, value) {
  return target._gsap[property] = value;
},
    _setterScale = function _setterScale(target, property, value) {
  return target._gsap.scaleX = target._gsap.scaleY = value;
},
    _setterScaleWithRender = function _setterScaleWithRender(target, property, value, data, ratio) {
  var cache = target._gsap;
  cache.scaleX = cache.scaleY = value;
  cache.renderTransform(ratio, cache);
},
    _setterTransformWithRender = function _setterTransformWithRender(target, property, value, data, ratio) {
  var cache = target._gsap;
  cache[property] = value;
  cache.renderTransform(ratio, cache);
},
    _transformProp = "transform",
    _transformOriginProp = _transformProp + "Origin",
    _supports3D,
    _createElement = function _createElement(type, ns) {
  var e = CSSPlugin_doc.createElementNS ? CSSPlugin_doc.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : CSSPlugin_doc.createElement(type); //some servers swap in https for http in the namespace which can break things, making "style" inaccessible.

  return e.style ? e : CSSPlugin_doc.createElement(type); //some environments won't allow access to the element's style when created with a namespace in which case we default to the standard createElement() to work around the issue. Also note that when GSAP is embedded directly inside an SVG file, createElement() won't allow access to the style object in Firefox (see https://greensock.com/forums/topic/20215-problem-using-tweenmax-in-standalone-self-containing-svg-file-err-cannot-set-property-csstext-of-undefined/).
},
    _getComputedProperty = function _getComputedProperty(target, property, skipPrefixFallback) {
  var cs = getComputedStyle(target);
  return cs[property] || cs.getPropertyValue(property.replace(_capsExp, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty(target, _checkPropPrefix(property) || property, 1) || ""; //css variables may not need caps swapped out for dashes and lowercase.
},
    _prefixes = "O,Moz,ms,Ms,Webkit".split(","),
    _checkPropPrefix = function _checkPropPrefix(property, element, preferPrefix) {
  var e = element || _tempDiv,
      s = e.style,
      i = 5;

  if (property in s && !preferPrefix) {
    return property;
  }

  property = property.charAt(0).toUpperCase() + property.substr(1);

  while (i-- && !(_prefixes[i] + property in s)) {}

  return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
},
    _initCore = function _initCore() {
  if (CSSPlugin_windowExists() && window.document) {
    CSSPlugin_win = window;
    CSSPlugin_doc = CSSPlugin_win.document;
    _docElement = CSSPlugin_doc.documentElement;
    _tempDiv = _createElement("div") || {
      style: {}
    };
    _tempDivStyler = _createElement("div");
    _transformProp = _checkPropPrefix(_transformProp);
    _transformOriginProp = _transformProp + "Origin";
    _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0"; //make sure to override certain properties that may contaminate measurements, in case the user has overreaching style sheets.

    _supports3D = !!_checkPropPrefix("perspective");
    _pluginInitted = 1;
  }
},
    _getBBoxHack = function _getBBoxHack(swapIfPossible) {
  //works around issues in some browsers (like Firefox) that don't correctly report getBBox() on SVG elements inside a <defs> element and/or <mask>. We try creating an SVG, adding it to the documentElement and toss the element in there so that it's definitely part of the rendering tree, then grab the bbox and if it works, we actually swap out the original getBBox() method for our own that does these extra steps whenever getBBox is needed. This helps ensure that performance is optimal (only do all these extra steps when absolutely necessary...most elements don't need it).
  var svg = _createElement("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
      oldParent = this.parentNode,
      oldSibling = this.nextSibling,
      oldCSS = this.style.cssText,
      bbox;

  _docElement.appendChild(svg);

  svg.appendChild(this);
  this.style.display = "block";

  if (swapIfPossible) {
    try {
      bbox = this.getBBox();
      this._gsapBBox = this.getBBox; //store the original

      this.getBBox = _getBBoxHack;
    } catch (e) {}
  } else if (this._gsapBBox) {
    bbox = this._gsapBBox();
  }

  if (oldParent) {
    if (oldSibling) {
      oldParent.insertBefore(this, oldSibling);
    } else {
      oldParent.appendChild(this);
    }
  }

  _docElement.removeChild(svg);

  this.style.cssText = oldCSS;
  return bbox;
},
    _getAttributeFallbacks = function _getAttributeFallbacks(target, attributesArray) {
  var i = attributesArray.length;

  while (i--) {
    if (target.hasAttribute(attributesArray[i])) {
      return target.getAttribute(attributesArray[i]);
    }
  }
},
    _getBBox = function _getBBox(target) {
  var bounds;

  try {
    bounds = target.getBBox(); //Firefox throws errors if you try calling getBBox() on an SVG element that's not rendered (like in a <symbol> or <defs>). https://bugzilla.mozilla.org/show_bug.cgi?id=612118
  } catch (error) {
    bounds = _getBBoxHack.call(target, true);
  }

  bounds && (bounds.width || bounds.height) || target.getBBox === _getBBoxHack || (bounds = _getBBoxHack.call(target, true)); //some browsers (like Firefox) misreport the bounds if the element has zero width and height (it just assumes it's at x:0, y:0), thus we need to manually grab the position in that case.

  return bounds && !bounds.width && !bounds.x && !bounds.y ? {
    x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]) || 0,
    y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : bounds;
},
    _isSVG = function _isSVG(e) {
  return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
},
    //reports if the element is an SVG on which getBBox() actually works
_removeProperty = function _removeProperty(target, property) {
  if (property) {
    var style = target.style;

    if (property in _transformProps && property !== _transformOriginProp) {
      property = _transformProp;
    }

    if (style.removeProperty) {
      if (property.substr(0, 2) === "ms" || property.substr(0, 6) === "webkit") {
        //Microsoft and some Webkit browsers don't conform to the standard of capitalizing the first prefix character, so we adjust so that when we prefix the caps with a dash, it's correct (otherwise it'd be "ms-transform" instead of "-ms-transform" for IE9, for example)
        property = "-" + property;
      }

      style.removeProperty(property.replace(_capsExp, "-$1").toLowerCase());
    } else {
      //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
      style.removeAttribute(property);
    }
  }
},
    _addNonTweeningPT = function _addNonTweeningPT(plugin, target, property, beginning, end, onlySetAtEnd) {
  var pt = new PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
  plugin._pt = pt;
  pt.b = beginning;
  pt.e = end;

  plugin._props.push(property);

  return pt;
},
    _nonConvertibleUnits = {
  deg: 1,
  rad: 1,
  turn: 1
},
    //takes a single value like 20px and converts it to the unit specified, like "%", returning only the numeric amount.
_convertToUnit = function _convertToUnit(target, property, value, unit) {
  var curValue = parseFloat(value) || 0,
      curUnit = (value + "").trim().substr((curValue + "").length) || "px",
      // some browsers leave extra whitespace at the beginning of CSS variables, hence the need to trim()
  style = _tempDiv.style,
      horizontal = _horizontalExp.test(property),
      isRootSVG = target.tagName.toLowerCase() === "svg",
      measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"),
      amount = 100,
      toPixels = unit === "px",
      toPercent = unit === "%",
      px,
      parent,
      cache,
      isSVG;

  if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
    return curValue;
  }

  curUnit !== "px" && !toPixels && (curValue = _convertToUnit(target, property, value, "px"));
  isSVG = target.getCTM && _isSVG(target);

  if ((toPercent || curUnit === "%") && (_transformProps[property] || ~property.indexOf("adius"))) {
    px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
    return _round(toPercent ? curValue / px * amount : curValue / 100 * px);
  }

  style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
  parent = ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;

  if (isSVG) {
    parent = (target.ownerSVGElement || {}).parentNode;
  }

  if (!parent || parent === CSSPlugin_doc || !parent.appendChild) {
    parent = CSSPlugin_doc.body;
  }

  cache = parent._gsap;

  if (cache && toPercent && cache.width && horizontal && cache.time === _ticker.time) {
    return _round(curValue / cache.width * amount);
  } else {
    (toPercent || curUnit === "%") && (style.position = _getComputedProperty(target, "position"));
    parent === target && (style.position = "static"); // like for borderRadius, if it's a % we must have it relative to the target itself but that may not have position: relative or position: absolute in which case it'd go up the chain until it finds its offsetParent (bad). position: static protects against that.

    parent.appendChild(_tempDiv);
    px = _tempDiv[measureProperty];
    parent.removeChild(_tempDiv);
    style.position = "absolute";

    if (horizontal && toPercent) {
      cache = _getCache(parent);
      cache.time = _ticker.time;
      cache.width = parent[measureProperty];
    }
  }

  return _round(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
},
    _get = function _get(target, property, unit, uncache) {
  var value;
  _pluginInitted || _initCore();

  if (property in _propertyAliases && property !== "transform") {
    property = _propertyAliases[property];

    if (~property.indexOf(",")) {
      property = property.split(",")[0];
    }
  }

  if (_transformProps[property] && property !== "transform") {
    value = _parseTransform(target, uncache);
    value = property !== "transformOrigin" ? value[property] : value.svg ? value.origin : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
  } else {
    value = target.style[property];

    if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) {
      value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || _getProperty(target, property) || (property === "opacity" ? 1 : 0); // note: some browsers, like Firefox, don't report borderRadius correctly! Instead, it only reports every corner like  borderTopLeftRadius
    }
  }

  return unit && !~(value + "").trim().indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
},
    _tweenComplexCSSString = function _tweenComplexCSSString(target, prop, start, end) {
  //note: we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
  if (!start || start === "none") {
    // some browsers like Safari actually PREFER the prefixed property and mis-report the unprefixed value like clipPath (BUG). In other words, even though clipPath exists in the style ("clipPath" in target.style) and it's set in the CSS properly (along with -webkit-clip-path), Safari reports clipPath as "none" whereas WebkitClipPath reports accurately like "ellipse(100% 0% at 50% 0%)", so in this case we must SWITCH to using the prefixed property instead. See https://greensock.com/forums/topic/18310-clippath-doesnt-work-on-ios/
    var p = _checkPropPrefix(prop, target, 1),
        s = p && _getComputedProperty(target, p, 1);

    if (s && s !== start) {
      prop = p;
      start = s;
    } else if (prop === "borderColor") {
      start = _getComputedProperty(target, "borderTopColor"); // Firefox bug: always reports "borderColor" as "", so we must fall back to borderTopColor. See https://greensock.com/forums/topic/24583-how-to-return-colors-that-i-had-after-reverse/
    }
  }

  var pt = new PropTween(this._pt, target.style, prop, 0, 1, _renderComplexString),
      index = 0,
      matchIndex = 0,
      a,
      result,
      startValues,
      startNum,
      color,
      startValue,
      endValue,
      endNum,
      chunk,
      endUnit,
      startUnit,
      relative,
      endValues;
  pt.b = start;
  pt.e = end;
  start += ""; //ensure values are strings

  end += "";

  if (end === "auto") {
    target.style[prop] = end;
    end = _getComputedProperty(target, prop) || end;
    target.style[prop] = start;
  }

  a = [start, end];

  _colorStringFilter(a); //pass an array with the starting and ending values and let the filter do whatever it needs to the values. If colors are found, it returns true and then we must match where the color shows up order-wise because for things like boxShadow, sometimes the browser provides the computed values with the color FIRST, but the user provides it with the color LAST, so flip them if necessary. Same for drop-shadow().


  start = a[0];
  end = a[1];
  startValues = start.match(_numWithUnitExp) || [];
  endValues = end.match(_numWithUnitExp) || [];

  if (endValues.length) {
    while (result = _numWithUnitExp.exec(end)) {
      endValue = result[0];
      chunk = end.substring(index, result.index);

      if (color) {
        color = (color + 1) % 5;
      } else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") {
        color = 1;
      }

      if (endValue !== (startValue = startValues[matchIndex++] || "")) {
        startNum = parseFloat(startValue) || 0;
        startUnit = startValue.substr((startNum + "").length);
        relative = endValue.charAt(1) === "=" ? +(endValue.charAt(0) + "1") : 0;

        if (relative) {
          endValue = endValue.substr(2);
        }

        endNum = parseFloat(endValue);
        endUnit = endValue.substr((endNum + "").length);
        index = _numWithUnitExp.lastIndex - endUnit.length;

        if (!endUnit) {
          //if something like "perspective:300" is passed in and we must add a unit to the end
          endUnit = endUnit || _config.units[prop] || startUnit;

          if (index === end.length) {
            end += endUnit;
            pt.e += endUnit;
          }
        }

        if (startUnit !== endUnit) {
          startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
        } //these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.


        pt._pt = {
          _next: pt._pt,
          p: chunk || matchIndex === 1 ? chunk : ",",
          //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
          s: startNum,
          c: relative ? relative * endNum : endNum - startNum,
          m: color && color < 4 || prop === "zIndex" ? Math.round : 0
        };
      }
    }

    pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)
  } else {
    pt.r = prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
  }

  _relExp.test(end) && (pt.e = 0); //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).

  this._pt = pt; //start the linked list with this new PropTween. Remember, we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within another plugin too, thus "this" would refer to the plugin.

  return pt;
},
    _keywordToPercent = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
},
    _convertKeywordsToPercentages = function _convertKeywordsToPercentages(value) {
  var split = value.split(" "),
      x = split[0],
      y = split[1] || "50%";

  if (x === "top" || x === "bottom" || y === "left" || y === "right") {
    //the user provided them in the wrong order, so flip them
    value = x;
    x = y;
    y = value;
  }

  split[0] = _keywordToPercent[x] || x;
  split[1] = _keywordToPercent[y] || y;
  return split.join(" ");
},
    _renderClearProps = function _renderClearProps(ratio, data) {
  if (data.tween && data.tween._time === data.tween._dur) {
    var target = data.t,
        style = target.style,
        props = data.u,
        cache = target._gsap,
        prop,
        clearTransforms,
        i;

    if (props === "all" || props === true) {
      style.cssText = "";
      clearTransforms = 1;
    } else {
      props = props.split(",");
      i = props.length;

      while (--i > -1) {
        prop = props[i];

        if (_transformProps[prop]) {
          clearTransforms = 1;
          prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp;
        }

        _removeProperty(target, prop);
      }
    }

    if (clearTransforms) {
      _removeProperty(target, _transformProp);

      if (cache) {
        cache.svg && target.removeAttribute("transform");

        _parseTransform(target, 1); // force all the cached values back to "normal"/identity, otherwise if there's another tween that's already set to render transforms on this element, it could display the wrong values.


        cache.uncache = 1;
      }
    }
  }
},
    // note: specialProps should return 1 if (and only if) they have a non-zero priority. It indicates we need to sort the linked list.
_specialProps = {
  clearProps: function clearProps(plugin, target, property, endValue, tween) {
    if (tween.data !== "isFromStart") {
      var pt = plugin._pt = new PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
      pt.u = endValue;
      pt.pr = -10;
      pt.tween = tween;

      plugin._props.push(property);

      return 1;
    }
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://greensock.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */

},

/*
 * --------------------------------------------------------------------------------------
 * TRANSFORMS
 * --------------------------------------------------------------------------------------
 */
_identity2DMatrix = [1, 0, 0, 1, 0, 0],
    _rotationalProperties = {},
    _isNullTransform = function _isNullTransform(value) {
  return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
},
    _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray(target) {
  var matrixString = _getComputedProperty(target, _transformProp);

  return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_numExp).map(_round);
},
    _getMatrix = function _getMatrix(target, force2D) {
  var cache = target._gsap || _getCache(target),
      style = target.style,
      matrix = _getComputedTransformMatrixAsArray(target),
      parent,
      nextSibling,
      temp,
      addedToDOM;

  if (cache.svg && target.getAttribute("transform")) {
    temp = target.transform.baseVal.consolidate().matrix; //ensures that even complex values like "translate(50,60) rotate(135,0,0)" are parsed because it mashes it into a matrix.

    matrix = [temp.a, temp.b, temp.c, temp.d, temp.e, temp.f];
    return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
  } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
    //note: if offsetParent is null, that means the element isn't in the normal document flow, like if it has display:none or one of its ancestors has display:none). Firefox returns null for getComputedStyle() if the element is in an iframe that has display:none. https://bugzilla.mozilla.org/show_bug.cgi?id=548397
    //browsers don't report transforms accurately unless the element is in the DOM and has a display value that's not "none". Firefox and Microsoft browsers have a partial bug where they'll report transforms even if display:none BUT not any percentage-based values like translate(-50%, 8px) will be reported as if it's translate(0, 8px).
    temp = style.display;
    style.display = "block";
    parent = target.parentNode;

    if (!parent || !target.offsetParent) {
      // note: in 3.3.0 we switched target.offsetParent to _doc.body.contains(target) to avoid [sometimes unnecessary] MutationObserver calls but that wasn't adequate because there are edge cases where nested position: fixed elements need to get reparented to accurately sense transforms. See https://github.com/greensock/GSAP/issues/388 and https://github.com/greensock/GSAP/issues/375
      addedToDOM = 1; //flag

      nextSibling = target.nextSibling;

      _docElement.appendChild(target); //we must add it to the DOM in order to get values properly

    }

    matrix = _getComputedTransformMatrixAsArray(target);
    temp ? style.display = temp : _removeProperty(target, "display");

    if (addedToDOM) {
      nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
    }
  }

  return force2D && matrix.length > 6 ? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]] : matrix;
},
    _applySVGOrigin = function _applySVGOrigin(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
  var cache = target._gsap,
      matrix = matrixArray || _getMatrix(target, true),
      xOriginOld = cache.xOrigin || 0,
      yOriginOld = cache.yOrigin || 0,
      xOffsetOld = cache.xOffset || 0,
      yOffsetOld = cache.yOffset || 0,
      a = matrix[0],
      b = matrix[1],
      c = matrix[2],
      d = matrix[3],
      tx = matrix[4],
      ty = matrix[5],
      originSplit = origin.split(" "),
      xOrigin = parseFloat(originSplit[0]) || 0,
      yOrigin = parseFloat(originSplit[1]) || 0,
      bounds,
      determinant,
      x,
      y;

  if (!originIsAbsolute) {
    bounds = _getBBox(target);
    xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
    yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
  } else if (matrix !== _identity2DMatrix && (determinant = a * d - b * c)) {
    //if it's zero (like if scaleX and scaleY are zero), skip it to avoid errors with dividing by zero.
    x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
    y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
    xOrigin = x;
    yOrigin = y;
  }

  if (smooth || smooth !== false && cache.smooth) {
    tx = xOrigin - xOriginOld;
    ty = yOrigin - yOriginOld;
    cache.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
    cache.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
  } else {
    cache.xOffset = cache.yOffset = 0;
  }

  cache.xOrigin = xOrigin;
  cache.yOrigin = yOrigin;
  cache.smooth = !!smooth;
  cache.origin = origin;
  cache.originIsAbsolute = !!originIsAbsolute;
  target.style[_transformOriginProp] = "0px 0px"; //otherwise, if someone sets  an origin via CSS, it will likely interfere with the SVG transform attribute ones (because remember, we're baking the origin into the matrix() value).

  if (pluginToAddPropTweensTo) {
    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);

    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);

    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);

    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
  }

  target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
},
    _parseTransform = function _parseTransform(target, uncache) {
  var cache = target._gsap || new GSCache(target);

  if ("x" in cache && !uncache && !cache.uncache) {
    return cache;
  }

  var style = target.style,
      invertedScaleX = cache.scaleX < 0,
      px = "px",
      deg = "deg",
      origin = _getComputedProperty(target, _transformOriginProp) || "0",
      x,
      y,
      z,
      scaleX,
      scaleY,
      rotation,
      rotationX,
      rotationY,
      skewX,
      skewY,
      perspective,
      xOrigin,
      yOrigin,
      matrix,
      angle,
      cos,
      sin,
      a,
      b,
      c,
      d,
      a12,
      a22,
      t1,
      t2,
      t3,
      a13,
      a23,
      a33,
      a42,
      a43,
      a32;
  x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
  scaleX = scaleY = 1;
  cache.svg = !!(target.getCTM && _isSVG(target));
  matrix = _getMatrix(target, cache.svg);

  if (cache.svg) {
    t1 = (!cache.uncache || origin === "0px 0px") && !uncache && target.getAttribute("data-svg-origin"); // if origin is 0,0 and cache.uncache is true, let the recorded data-svg-origin stay. Otherwise, whenever we set cache.uncache to true, we'd need to set element.style.transformOrigin = (cache.xOrigin - bbox.x) + "px " + (cache.yOrigin - bbox.y) + "px". Remember, to work around browser inconsistencies we always force SVG elements' transformOrigin to 0,0 and offset the translation accordingly.

    _applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, cache.smooth !== false, matrix);
  }

  xOrigin = cache.xOrigin || 0;
  yOrigin = cache.yOrigin || 0;

  if (matrix !== _identity2DMatrix) {
    a = matrix[0]; //a11

    b = matrix[1]; //a21

    c = matrix[2]; //a31

    d = matrix[3]; //a41

    x = a12 = matrix[4];
    y = a22 = matrix[5]; //2D matrix

    if (matrix.length === 6) {
      scaleX = Math.sqrt(a * a + b * b);
      scaleY = Math.sqrt(d * d + c * c);
      rotation = a || b ? _atan2(b, a) * _RAD2DEG : 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).

      skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
      skewX && (scaleY *= Math.abs(Math.cos(skewX * _DEG2RAD)));

      if (cache.svg) {
        x -= xOrigin - (xOrigin * a + yOrigin * c);
        y -= yOrigin - (xOrigin * b + yOrigin * d);
      } //3D matrix

    } else {
      a32 = matrix[6];
      a42 = matrix[7];
      a13 = matrix[8];
      a23 = matrix[9];
      a33 = matrix[10];
      a43 = matrix[11];
      x = matrix[12];
      y = matrix[13];
      z = matrix[14];
      angle = _atan2(a32, a33);
      rotationX = angle * _RAD2DEG; //rotationX

      if (angle) {
        cos = Math.cos(-angle);
        sin = Math.sin(-angle);
        t1 = a12 * cos + a13 * sin;
        t2 = a22 * cos + a23 * sin;
        t3 = a32 * cos + a33 * sin;
        a13 = a12 * -sin + a13 * cos;
        a23 = a22 * -sin + a23 * cos;
        a33 = a32 * -sin + a33 * cos;
        a43 = a42 * -sin + a43 * cos;
        a12 = t1;
        a22 = t2;
        a32 = t3;
      } //rotationY


      angle = _atan2(-c, a33);
      rotationY = angle * _RAD2DEG;

      if (angle) {
        cos = Math.cos(-angle);
        sin = Math.sin(-angle);
        t1 = a * cos - a13 * sin;
        t2 = b * cos - a23 * sin;
        t3 = c * cos - a33 * sin;
        a43 = d * sin + a43 * cos;
        a = t1;
        b = t2;
        c = t3;
      } //rotationZ


      angle = _atan2(b, a);
      rotation = angle * _RAD2DEG;

      if (angle) {
        cos = Math.cos(angle);
        sin = Math.sin(angle);
        t1 = a * cos + b * sin;
        t2 = a12 * cos + a22 * sin;
        b = b * cos - a * sin;
        a22 = a22 * cos - a12 * sin;
        a = t1;
        a12 = t2;
      }

      if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
        //when rotationY is set, it will often be parsed as 180 degrees different than it should be, and rotationX and rotation both being 180 (it looks the same), so we adjust for that here.
        rotationX = rotation = 0;
        rotationY = 180 - rotationY;
      }

      scaleX = _round(Math.sqrt(a * a + b * b + c * c));
      scaleY = _round(Math.sqrt(a22 * a22 + a32 * a32));
      angle = _atan2(a12, a22);
      skewX = Math.abs(angle) > 0.0002 ? angle * _RAD2DEG : 0;
      perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
    }

    if (cache.svg) {
      //sense if there are CSS transforms applied on an SVG element in which case we must overwrite them when rendering. The transform attribute is more reliable cross-browser, but we can't just remove the CSS ones because they may be applied in a CSS rule somewhere (not just inline).
      t1 = target.getAttribute("transform");
      cache.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp));
      t1 && target.setAttribute("transform", t1);
    }
  }

  if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
    if (invertedScaleX) {
      scaleX *= -1;
      skewX += rotation <= 0 ? 180 : -180;
      rotation += rotation <= 0 ? 180 : -180;
    } else {
      scaleY *= -1;
      skewX += skewX <= 0 ? 180 : -180;
    }
  }

  cache.x = x - ((cache.xPercent = x && (cache.xPercent || (Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0))) ? target.offsetWidth * cache.xPercent / 100 : 0) + px;
  cache.y = y - ((cache.yPercent = y && (cache.yPercent || (Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0))) ? target.offsetHeight * cache.yPercent / 100 : 0) + px;
  cache.z = z + px;
  cache.scaleX = _round(scaleX);
  cache.scaleY = _round(scaleY);
  cache.rotation = _round(rotation) + deg;
  cache.rotationX = _round(rotationX) + deg;
  cache.rotationY = _round(rotationY) + deg;
  cache.skewX = skewX + deg;
  cache.skewY = skewY + deg;
  cache.transformPerspective = perspective + px;

  if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || 0) {
    style[_transformOriginProp] = _firstTwoOnly(origin);
  }

  cache.xOffset = cache.yOffset = 0;
  cache.force3D = _config.force3D;
  cache.renderTransform = cache.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
  cache.uncache = 0;
  return cache;
},
    _firstTwoOnly = function _firstTwoOnly(value) {
  return (value = value.split(" "))[0] + " " + value[1];
},
    //for handling transformOrigin values, stripping out the 3rd dimension
_addPxTranslate = function _addPxTranslate(target, start, value) {
  var unit = getUnit(start);
  return _round(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
},
    _renderNon3DTransforms = function _renderNon3DTransforms(ratio, cache) {
  cache.z = "0px";
  cache.rotationY = cache.rotationX = "0deg";
  cache.force3D = 0;

  _renderCSSTransforms(ratio, cache);
},
    _zeroDeg = "0deg",
    _zeroPx = "0px",
    _endParenthesis = ") ",
    _renderCSSTransforms = function _renderCSSTransforms(ratio, cache) {
  var _ref = cache || this,
      xPercent = _ref.xPercent,
      yPercent = _ref.yPercent,
      x = _ref.x,
      y = _ref.y,
      z = _ref.z,
      rotation = _ref.rotation,
      rotationY = _ref.rotationY,
      rotationX = _ref.rotationX,
      skewX = _ref.skewX,
      skewY = _ref.skewY,
      scaleX = _ref.scaleX,
      scaleY = _ref.scaleY,
      transformPerspective = _ref.transformPerspective,
      force3D = _ref.force3D,
      target = _ref.target,
      zOrigin = _ref.zOrigin,
      transforms = "",
      use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true; // Safari has a bug that causes it not to render 3D transform-origin values properly, so we force the z origin to 0, record it in the cache, and then do the math here to offset the translate values accordingly (basically do the 3D transform-origin part manually)


  if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
    var angle = parseFloat(rotationY) * _DEG2RAD,
        a13 = Math.sin(angle),
        a33 = Math.cos(angle),
        cos;

    angle = parseFloat(rotationX) * _DEG2RAD;
    cos = Math.cos(angle);
    x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
    y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
    z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
  }

  if (transformPerspective !== _zeroPx) {
    transforms += "perspective(" + transformPerspective + _endParenthesis;
  }

  if (xPercent || yPercent) {
    transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
  }

  if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) {
    transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
  }

  if (rotation !== _zeroDeg) {
    transforms += "rotate(" + rotation + _endParenthesis;
  }

  if (rotationY !== _zeroDeg) {
    transforms += "rotateY(" + rotationY + _endParenthesis;
  }

  if (rotationX !== _zeroDeg) {
    transforms += "rotateX(" + rotationX + _endParenthesis;
  }

  if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
    transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
  }

  if (scaleX !== 1 || scaleY !== 1) {
    transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
  }

  target.style[_transformProp] = transforms || "translate(0, 0)";
},
    _renderSVGTransforms = function _renderSVGTransforms(ratio, cache) {
  var _ref2 = cache || this,
      xPercent = _ref2.xPercent,
      yPercent = _ref2.yPercent,
      x = _ref2.x,
      y = _ref2.y,
      rotation = _ref2.rotation,
      skewX = _ref2.skewX,
      skewY = _ref2.skewY,
      scaleX = _ref2.scaleX,
      scaleY = _ref2.scaleY,
      target = _ref2.target,
      xOrigin = _ref2.xOrigin,
      yOrigin = _ref2.yOrigin,
      xOffset = _ref2.xOffset,
      yOffset = _ref2.yOffset,
      forceCSS = _ref2.forceCSS,
      tx = parseFloat(x),
      ty = parseFloat(y),
      a11,
      a21,
      a12,
      a22,
      temp;

  rotation = parseFloat(rotation);
  skewX = parseFloat(skewX);
  skewY = parseFloat(skewY);

  if (skewY) {
    //for performance reasons, we combine all skewing into the skewX and rotation values. Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of 10 degrees.
    skewY = parseFloat(skewY);
    skewX += skewY;
    rotation += skewY;
  }

  if (rotation || skewX) {
    rotation *= _DEG2RAD;
    skewX *= _DEG2RAD;
    a11 = Math.cos(rotation) * scaleX;
    a21 = Math.sin(rotation) * scaleX;
    a12 = Math.sin(rotation - skewX) * -scaleY;
    a22 = Math.cos(rotation - skewX) * scaleY;

    if (skewX) {
      skewY *= _DEG2RAD;
      temp = Math.tan(skewX - skewY);
      temp = Math.sqrt(1 + temp * temp);
      a12 *= temp;
      a22 *= temp;

      if (skewY) {
        temp = Math.tan(skewY);
        temp = Math.sqrt(1 + temp * temp);
        a11 *= temp;
        a21 *= temp;
      }
    }

    a11 = _round(a11);
    a21 = _round(a21);
    a12 = _round(a12);
    a22 = _round(a22);
  } else {
    a11 = scaleX;
    a22 = scaleY;
    a21 = a12 = 0;
  }

  if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
    tx = _convertToUnit(target, "x", x, "px");
    ty = _convertToUnit(target, "y", y, "px");
  }

  if (xOrigin || yOrigin || xOffset || yOffset) {
    tx = _round(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
    ty = _round(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
  }

  if (xPercent || yPercent) {
    //The SVG spec doesn't support percentage-based translation in the "transform" attribute, so we merge it into the translation to simulate it.
    temp = target.getBBox();
    tx = _round(tx + xPercent / 100 * temp.width);
    ty = _round(ty + yPercent / 100 * temp.height);
  }

  temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
  target.setAttribute("transform", temp);
  forceCSS && (target.style[_transformProp] = temp); //some browsers prioritize CSS transforms over the transform attribute. When we sense that the user has CSS transforms applied, we must overwrite them this way (otherwise some browser simply won't render the  transform attribute changes!)
},
    _addRotationalPropTween = function _addRotationalPropTween(plugin, target, property, startNum, endValue, relative) {
  var cap = 360,
      isString = _isString(endValue),
      endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1),
      change = relative ? endNum * relative : endNum - startNum,
      finalValue = startNum + change + "deg",
      direction,
      pt;

  if (isString) {
    direction = endValue.split("_")[1];

    if (direction === "short") {
      change %= cap;

      if (change !== change % (cap / 2)) {
        change += change < 0 ? cap : -cap;
      }
    }

    if (direction === "cw" && change < 0) {
      change = (change + cap * CSSPlugin_bigNum) % cap - ~~(change / cap) * cap;
    } else if (direction === "ccw" && change > 0) {
      change = (change - cap * CSSPlugin_bigNum) % cap - ~~(change / cap) * cap;
    }
  }

  plugin._pt = pt = new PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
  pt.e = finalValue;
  pt.u = "deg";

  plugin._props.push(property);

  return pt;
},
    _assign = function _assign(target, source) {
  // Internet Explorer doesn't have Object.assign(), so we recreate it here.
  for (var p in source) {
    target[p] = source[p];
  }

  return target;
},
    _addRawTransformPTs = function _addRawTransformPTs(plugin, transforms, target) {
  //for handling cases where someone passes in a whole transform string, like transform: "scale(2, 3) rotate(20deg) translateY(30em)"
  var startCache = _assign({}, target._gsap),
      exclude = "perspective,force3D,transformOrigin,svgOrigin",
      style = target.style,
      endCache,
      p,
      startValue,
      endValue,
      startNum,
      endNum,
      startUnit,
      endUnit;

  if (startCache.svg) {
    startValue = target.getAttribute("transform");
    target.setAttribute("transform", "");
    style[_transformProp] = transforms;
    endCache = _parseTransform(target, 1);

    _removeProperty(target, _transformProp);

    target.setAttribute("transform", startValue);
  } else {
    startValue = getComputedStyle(target)[_transformProp];
    style[_transformProp] = transforms;
    endCache = _parseTransform(target, 1);
    style[_transformProp] = startValue;
  }

  for (p in _transformProps) {
    startValue = startCache[p];
    endValue = endCache[p];

    if (startValue !== endValue && exclude.indexOf(p) < 0) {
      //tweening to no perspective gives very unintuitive results - just keep the same perspective in that case.
      startUnit = getUnit(startValue);
      endUnit = getUnit(endValue);
      startNum = startUnit !== endUnit ? _convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
      endNum = parseFloat(endValue);
      plugin._pt = new PropTween(plugin._pt, endCache, p, startNum, endNum - startNum, _renderCSSProp);
      plugin._pt.u = endUnit || 0;

      plugin._props.push(p);
    }
  }

  _assign(endCache, startCache);
}; // handle splitting apart padding, margin, borderWidth, and borderRadius into their 4 components. Firefox, for example, won't report borderRadius correctly - it will only do borderTopLeftRadius and the other corners. We also want to handle paddingTop, marginLeft, borderRightWidth, etc.


_forEachName("padding,margin,Width,Radius", function (name, index) {
  var t = "Top",
      r = "Right",
      b = "Bottom",
      l = "Left",
      props = (index < 3 ? [t, r, b, l] : [t + l, t + r, b + r, b + l]).map(function (side) {
    return index < 2 ? name + side : "border" + side + name;
  });

  _specialProps[index > 1 ? "border" + name : name] = function (plugin, target, property, endValue, tween) {
    var a, vars;

    if (arguments.length < 4) {
      // getter, passed target, property, and unit (from _get())
      a = props.map(function (prop) {
        return _get(plugin, prop, property);
      });
      vars = a.join(" ");
      return vars.split(a[0]).length === 5 ? a[0] : vars;
    }

    a = (endValue + "").split(" ");
    vars = {};
    props.forEach(function (prop, i) {
      return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
    });
    plugin.init(target, vars, tween);
  };
});

var CSSPlugin = {
  name: "css",
  register: _initCore,
  targetTest: function targetTest(target) {
    return target.style && target.nodeType;
  },
  init: function init(target, vars, tween, index, targets) {
    var props = this._props,
        style = target.style,
        startAt = tween.vars.startAt,
        startValue,
        endValue,
        endNum,
        startNum,
        type,
        specialProp,
        p,
        startUnit,
        endUnit,
        relative,
        isTransformRelated,
        transformPropTween,
        cache,
        smooth,
        hasPriority;
    _pluginInitted || _initCore();

    for (p in vars) {
      if (p === "autoRound") {
        continue;
      }

      endValue = vars[p];

      if (_plugins[p] && _checkPlugin(p, vars, tween, index, target, targets)) {
        // plugins
        continue;
      }

      type = typeof endValue;
      specialProp = _specialProps[p];

      if (type === "function") {
        endValue = endValue.call(tween, index, target, targets);
        type = typeof endValue;
      }

      if (type === "string" && ~endValue.indexOf("random(")) {
        endValue = _replaceRandom(endValue);
      }

      if (specialProp) {
        specialProp(this, target, p, endValue, tween) && (hasPriority = 1);
      } else if (p.substr(0, 2) === "--") {
        //CSS variable
        startValue = (getComputedStyle(target).getPropertyValue(p) + "").trim();
        endValue += "";
        _colorExp.lastIndex = 0;

        if (!_colorExp.test(startValue)) {
          // colors don't have units
          startUnit = getUnit(startValue);
          endUnit = getUnit(endValue);
        }

        endUnit ? startUnit !== endUnit && (startValue = _convertToUnit(target, p, startValue, endUnit) + endUnit) : startUnit && (endValue += startUnit);
        this.add(style, "setProperty", startValue, endValue, index, targets, 0, 0, p);
        props.push(p);
      } else if (type !== "undefined") {
        if (startAt && p in startAt) {
          // in case someone hard-codes a complex value as the start, like top: "calc(2vh / 2)". Without this, it'd use the computed value (always in px)
          startValue = typeof startAt[p] === "function" ? startAt[p].call(tween, index, target, targets) : startAt[p];
          p in _config.units && !getUnit(startValue) && (startValue += _config.units[p]); // for cases when someone passes in a unitless value like {x: 100}; if we try setting translate(100, 0px) it won't work.

          _isString(startValue) && ~startValue.indexOf("random(") && (startValue = _replaceRandom(startValue));
          (startValue + "").charAt(1) === "=" && (startValue = _get(target, p)); // can't work with relative values
        } else {
          startValue = _get(target, p);
        }

        startNum = parseFloat(startValue);
        relative = type === "string" && endValue.charAt(1) === "=" ? +(endValue.charAt(0) + "1") : 0;
        relative && (endValue = endValue.substr(2));
        endNum = parseFloat(endValue);

        if (p in _propertyAliases) {
          if (p === "autoAlpha") {
            //special case where we control the visibility along with opacity. We still allow the opacity value to pass through and get tweened.
            if (startNum === 1 && _get(target, "visibility") === "hidden" && endNum) {
              //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
              startNum = 0;
            }

            _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
          }

          if (p !== "scale" && p !== "transform") {
            p = _propertyAliases[p];
            ~p.indexOf(",") && (p = p.split(",")[0]);
          }
        }

        isTransformRelated = p in _transformProps; //--- TRANSFORM-RELATED ---

        if (isTransformRelated) {
          if (!transformPropTween) {
            cache = target._gsap;
            cache.renderTransform && !vars.parseTransform || _parseTransform(target, vars.parseTransform); // if, for example, gsap.set(... {transform:"translateX(50vw)"}), the _get() call doesn't parse the transform, thus cache.renderTransform won't be set yet so force the parsing of the transform here.

            smooth = vars.smoothOrigin !== false && cache.smooth;
            transformPropTween = this._pt = new PropTween(this._pt, style, _transformProp, 0, 1, cache.renderTransform, cache, 0, -1); //the first time through, create the rendering PropTween so that it runs LAST (in the linked list, we keep adding to the beginning)

            transformPropTween.dep = 1; //flag it as dependent so that if things get killed/overwritten and this is the only PropTween left, we can safely kill the whole tween.
          }

          if (p === "scale") {
            this._pt = new PropTween(this._pt, cache, "scaleY", cache.scaleY, (relative ? relative * endNum : endNum - cache.scaleY) || 0);
            props.push("scaleY", p);
            p += "X";
          } else if (p === "transformOrigin") {
            endValue = _convertKeywordsToPercentages(endValue); //in case something like "left top" or "bottom right" is passed in. Convert to percentages.

            if (cache.svg) {
              _applySVGOrigin(target, endValue, 0, smooth, 0, this);
            } else {
              endUnit = parseFloat(endValue.split(" ")[2]) || 0; //handle the zOrigin separately!

              endUnit !== cache.zOrigin && _addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);

              _addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
            }

            continue;
          } else if (p === "svgOrigin") {
            _applySVGOrigin(target, endValue, 1, smooth, 0, this);

            continue;
          } else if (p in _rotationalProperties) {
            _addRotationalPropTween(this, cache, p, startNum, endValue, relative);

            continue;
          } else if (p === "smoothOrigin") {
            _addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);

            continue;
          } else if (p === "force3D") {
            cache[p] = endValue;
            continue;
          } else if (p === "transform") {
            _addRawTransformPTs(this, endValue, target);

            continue;
          }
        } else if (!(p in style)) {
          p = _checkPropPrefix(p) || p;
        }

        if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p in style) {
          startUnit = (startValue + "").substr((startNum + "").length);
          endNum || (endNum = 0); // protect against NaN

          endUnit = getUnit(endValue) || (p in _config.units ? _config.units[p] : startUnit);
          startUnit !== endUnit && (startNum = _convertToUnit(target, p, startValue, endUnit));
          this._pt = new PropTween(this._pt, isTransformRelated ? cache : style, p, startNum, relative ? relative * endNum : endNum - startNum, !isTransformRelated && (endUnit === "px" || p === "zIndex") && vars.autoRound !== false ? _renderRoundedCSSProp : _renderCSSProp);
          this._pt.u = endUnit || 0;

          if (startUnit !== endUnit && endUnit !== "%") {
            //when the tween goes all the way back to the beginning, we need to revert it to the OLD/ORIGINAL value (with those units). We record that as a "b" (beginning) property and point to a render method that handles that. (performance optimization)
            this._pt.b = startValue;
            this._pt.r = _renderCSSPropWithBeginning;
          }
        } else if (!(p in style)) {
          if (p in target) {
            //maybe it's not a style - it could be a property added directly to an element in which case we'll try to animate that.
            this.add(target, p, startValue || target[p], endValue, index, targets);
          } else {
            _missingPlugin(p, endValue);

            continue;
          }
        } else {
          _tweenComplexCSSString.call(this, target, p, startValue, endValue);
        }

        props.push(p);
      }
    }

    hasPriority && _sortPropTweensByPriority(this);
  },
  get: _get,
  aliases: _propertyAliases,
  getSetter: function getSetter(target, property, plugin) {
    //returns a setter function that accepts target, property, value and applies it accordingly. Remember, properties like "x" aren't as simple as target.style.property = value because they've got to be applied to a proxy object and then merged into a transform string in a renderer.
    var p = _propertyAliases[property];
    p && p.indexOf(",") < 0 && (property = p);
    return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !_isUndefined(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : _getSetter(target, property);
  },
  core: {
    _removeProperty: _removeProperty,
    _getMatrix: _getMatrix
  }
};
gsap.utils.checkPrefix = _checkPropPrefix;

(function (positionAndScale, rotation, others, aliases) {
  var all = _forEachName(positionAndScale + "," + rotation + "," + others, function (name) {
    _transformProps[name] = 1;
  });

  _forEachName(rotation, function (name) {
    _config.units[name] = "deg";
    _rotationalProperties[name] = 1;
  });

  _propertyAliases[all[13]] = positionAndScale + "," + rotation;

  _forEachName(aliases, function (name) {
    var split = name.split(":");
    _propertyAliases[split[1]] = all[split[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");

_forEachName("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (name) {
  _config.units[name] = "px";
});

gsap.registerPlugin(CSSPlugin);

;// CONCATENATED MODULE: ./node_modules/gsap/index.js


var gsapWithCSS = gsap.registerPlugin(CSSPlugin) || gsap,
    // to protect from tree shaking
TweenMaxWithCSS = gsapWithCSS.core.Tween;

;// CONCATENATED MODULE: ./src/sections/HeroSection/index.js
// import video from "../images/video.mp4";
let interval;function HeroSection(){const ref=useNav("#home");const q=gsapWithCSS.utils.selector(ref);let tl=gsapWithCSS.timeline({delay:1});const{0:index,1:setindex}=(0,index_js_.useState)(0);(0,index_js_.useEffect)(()=>{interval=setInterval(()=>{setindex(prev=>prev<quotes.length-1?prev+1:0);tl.fromTo(q(".text"),{y:"100%",letterSpacing:"15px",duration:0.5,stagger:0.25},{y:"0%",letterSpacing:"0px",duration:0.5,stagger:0.25});},5000);gsapWithCSS.to(q(".ond-even"),{x:300,opacity:0,duration:1,delay:0.5});gsapWithCSS.to(q(".ond-odd"),{x:-300,opacity:0,duration:1,delay:0.5});tl.from(q(".hero-section__title"),{opacity:0,duration:0.5});gsapWithCSS.timeline({defaults:{duration:1},scrollTrigger:{trigger:"#violin",start:"top center",end:"bottom center",scrub:true}}).fromTo(q("#violin"),{right:"20%"},{right:"-30%"});gsapWithCSS.timeline({defaults:{duration:1},scrollTrigger:{trigger:"#violin",start:"top center",end:"bottom center",scrub:true}}).fromTo(q("#piano"),{right:0,rotation:60},{right:-200,rotation:130});return()=>clearInterval(interval);},[]);return/*#__PURE__*/index_js_default().createElement("header",{className:"hero-section h-screen px-10 lg:px-36 xl:px-48",id:"hero-section"},/*#__PURE__*/index_js_default().createElement("div",{className:"hero-section__main h-full flex flex-col justify-between items-start py-36",ref:ref},/*#__PURE__*/index_js_default().createElement((ondineMod_anim_default()),{className:"ondine"}),/*#__PURE__*/index_js_default().createElement("img",{src:violin,alt:"violin",id:"violin","aria-hidden":"true",className:"hero-section__violin hidden lg:block"}),/*#__PURE__*/index_js_default().createElement("img",{src:pianoPng,alt:"piano",id:"piano","aria-hidden":"true",className:"hero-section__violin piano hidden lg:block"}),/*#__PURE__*/index_js_default().createElement("div",{className:"hero-section__title my-10"},/*#__PURE__*/index_js_default().createElement("h1",null,"Impara a ",/*#__PURE__*/index_js_default().createElement("span",null,"suonare")," con noi")),/*#__PURE__*/index_js_default().createElement("h2",{className:"hero-section__proposal  lg:mb-10"},"Prenota ora la tua lezione di prova gratuita online o in presenza"),/*#__PURE__*/index_js_default().createElement("div",{className:"hero-section__ctas "},/*#__PURE__*/index_js_default().createElement("button",{className:"hero-section__ctas__contact mt-10 lg:mt-0"},/*#__PURE__*/index_js_default().createElement("a",{href:"#contact",className:"contact_cta"},"Contattaci"))),/*#__PURE__*/index_js_default().createElement("div",{className:"hero-section__quote mt-36"},/*#__PURE__*/index_js_default().createElement("p",{className:"hero-section__subtitle hide "+(quotes[index].secondline?"":"mb-5")},/*#__PURE__*/index_js_default().createElement("span",{className:"text"},quotes[index].quote)),quotes[index].secondline&&/*#__PURE__*/index_js_default().createElement("p",{className:"hero-section__subtitle hide mb-5"},/*#__PURE__*/index_js_default().createElement("span",{className:"text"},quotes[index].secondline)),/*#__PURE__*/index_js_default().createElement("p",{className:"hero-section__subtitle__author hide mb-5"},/*#__PURE__*/index_js_default().createElement("span",{className:"text"},quotes[index].author)))));}
;// CONCATENATED MODULE: ./src/images/foto-1.webp
/* harmony default export */ const foto_1 = (__webpack_require__.p + "static/foto-1-04078be7d49a10c25d4abdb39492a027.webp");
;// CONCATENATED MODULE: ./src/images/foto-2.webp
/* harmony default export */ const foto_2 = (__webpack_require__.p + "static/foto-2-6d40e4e394de12df97063ffd6a131b6c.webp");
;// CONCATENATED MODULE: ./src/images/foto-3.webp
/* harmony default export */ const foto_3 = (__webpack_require__.p + "static/foto-3-3b8caa3d70ce505ca1e78da722320d12.webp");
;// CONCATENATED MODULE: ./src/sections/MiddleSection/res.js
const pictures=[{src:foto_1,title:"Lezioni professionali per ogni necessità",alt:"alt_foto",desc:"Le nostre lezioni sono adatte a studenti di qualsiasi livello e rispondono a qualsiasi necessità: dall'amatore che vuole scoprire un nuovo passatempo allo studente di conservatorio che ha bisogno di una mano per qualche specifica materia."},{alt:"alt_foto",src:foto_2,title:"Supporto costante e dedicato",desc:"Il nostro metodo didattico è altamente personalizzato e non si limita alla lezione frontale. Forniamo supporto per lo studio individuale con diversi strumenti, ad esempio video tutorial su youtube o inviati personalmente, foto, risorse online, messaggi audio."},{alt:"alt_foto",title:"Saggi e rassegne",src:foto_3,desc:"Organizziamo e incentiviamo esibizioni, con saggi e rassegne periodiche di ogni livello. Per ogni evento forniamo attestati di partecipazione."}];
// EXTERNAL MODULE: ./public/static/svg/vaweSvg.svg
var vaweSvg = __webpack_require__(1998);
var vaweSvg_default = /*#__PURE__*/__webpack_require__.n(vaweSvg);
;// CONCATENATED MODULE: ./src/sections/MiddleSection/index.js
function MiddleSection(){const ref=useNav("#about");const q=gsapWithCSS.utils.selector(ref);(0,index_js_.useEffect)(()=>{gsapWithCSS.timeline({scrollTrigger:{trigger:".middle-section__picture",start:"top center"}}).from(q("img"),{xPercent:-50,opacity:0},0).from(q("p"),{xPercent:50,opacity:0},0);},[]);return/*#__PURE__*/index_js_default().createElement((index_js_default()).Fragment,null,/*#__PURE__*/index_js_default().createElement("section",{className:"middle-section pt-20 px-10 lg:px-36 xl:px-48",ref:ref,id:"about"},pictures.map((pic,i)=>/*#__PURE__*/index_js_default().createElement("div",{className:"mt-20"},/*#__PURE__*/index_js_default().createElement("h2",{className:"middle-section__picture__title mb-10 mt-20 lg:mt-0"},pic.title),/*#__PURE__*/index_js_default().createElement("div",{className:`middle-section__picture items-start lg:items-center ${i!==pictures.length-1?"pb-36":""} ${i%2===0?"row-reverse":"row"} flex flex-col`,key:pic.alt+i+"o"},/*#__PURE__*/index_js_default().createElement("img",{src:pic.src,alt:pic.alt,className:`middle-section__picture__img ${i%2===0?"lg:ml-10":"lg:mr-10"}`,id:`img-${i}`}),/*#__PURE__*/index_js_default().createElement("p",{className:"middle-section__picture__desc mt-20 lg:mt-0 ",id:`p-${i}`},pic.desc))))),/*#__PURE__*/index_js_default().createElement("div",{className:"svgContainer"},/*#__PURE__*/index_js_default().createElement((vaweSvg_default()),null)));}
;// CONCATENATED MODULE: ./src/images/anninaPng.webp
/* harmony default export */ const anninaPng = (__webpack_require__.p + "static/anninaPng-fbca52c7047f27a3640a59d6130f0adf.webp");
;// CONCATENATED MODULE: ./src/images/lauraPng.webp
/* harmony default export */ const lauraPng = (__webpack_require__.p + "static/lauraPng-0a035363a7325c6f565b072509c3d3a7.webp");
;// CONCATENATED MODULE: ./src/images/giorgioPng.webp
/* harmony default export */ const giorgioPng = (__webpack_require__.p + "static/giorgioPng-e02b96b86083dc5409cb5484c510a7ee.webp");
;// CONCATENATED MODULE: ./src/images/saxPng.webp
/* harmony default export */ const saxPng = (__webpack_require__.p + "static/saxPng-1493dd2605e96f06611659fbfaeb7290.webp");
;// CONCATENATED MODULE: ./src/images/guitarPng.webp
/* harmony default export */ const guitarPng = (__webpack_require__.p + "static/guitarPng-d8b68e69fd42eefca1742d1bd674bb75.webp");
;// CONCATENATED MODULE: ./src/sections/TeachersSection/resources.js
const teachers=[{src:anninaPng,instrument:pianoPng,name:"Annalisa Pennisi",bio:"Studia pianoforte da quando ha 5 anni. Entra al Conservatorio Vincenzo Bellini di Catania conseguendo la laurea triennale e la biennale specialistica con il massimo dei voti. \n\nHa fatto parte di svariate formazioni da camera, principalmente in duo con contrabbassisti e con cantanti; è stata pianista accompagnatrice del coro lirico NAMAE diretto dal maestro Carmelo Pappalardo. Attualmente frequenta la classe di fisarmonica classica presso il Conservatorio Arcangelo Corelli di Messina con il Maestro Ivano Biscardi.",alt:"annina",altInstr:"piano"},{src:lauraPng,instrument:violin,name:"Laura Pennisi",bio:"Nata a Catania nel 1997, comincia a studiare violino all’età di 7 anni. \n\n A 15 anni entra al conservatorio di Catania conseguendo la laurea triennale nel 2019. \n\nAttualmente frequenta l’ultimo anno del biennio specialistico sempre al conservatorio di Catania. \n\nHa fatto parte di diverse importanti orchestre tra cui l’orchestra giovanile del teatro dell’opera di Roma e la prima orchestra giovanile del maestro Beppe Vessicchio.",alt:"alura",altInstr:"violin"}];
;// CONCATENATED MODULE: ./src/sections/TeachersSection/Teacher/index.js
function Teacher({teacher,instrument}){const ref=(0,index_js_.useRef)(null);const q=gsapWithCSS.utils.selector(ref);(0,index_js_.useEffect)(()=>{gsapWithCSS.timeline({scrollTrigger:{trigger:".teacher",start:"top center"}}).from(q("p"),{xPercent:50,opacity:0,stagger:0.1},0);gsapWithCSS.timeline({defaults:{duration:1},scrollTrigger:{trigger:q(".teacher"),start:"top bottom",end:"bottom top",scrub:true}}).to(q(".teachers-section__picture__instrument"),{y:"10%",x:"30%"});gsapWithCSS.timeline({defaults:{duration:1},scrollTrigger:{trigger:q(".teacher"),start:"top bottom",end:"bottom top",scrub:true}}).to(q(".teachers-section__picture__face"),{y:"10%"});},[]);return/*#__PURE__*/index_js_default().createElement("div",{className:"flex flex-col mt-20 lg:mt-0 teacher",ref:ref},/*#__PURE__*/index_js_default().createElement("h2",{className:"teachers-section__name mt-10"},/*#__PURE__*/index_js_default().createElement("img",{src:instrument.imgSrc,"aria-hidden":"true",alt:instrument.imgSrc,className:"hero-section__list__icon"}),teacher===null||teacher===void 0?void 0:teacher.name),/*#__PURE__*/index_js_default().createElement("div",{className:"flex space-between flex-col md:flex-row md:items-center"},/*#__PURE__*/index_js_default().createElement("div",{className:"mb-10 teacher-carousel",style:{perspective:"1000px",transformStyle:"preserve-3d"}},/*#__PURE__*/index_js_default().createElement("img",{src:teacher===null||teacher===void 0?void 0:teacher.instrument,alt:teacher===null||teacher===void 0?void 0:teacher.altInstr,className:`teachers-section__picture__instrument noselect`,style:{transform:`rotateY(180deg) translateX(-30%) rotateX(-200deg) translateZ(-1px)`,WebkitTransform:`rotateY(180deg)`}}),/*#__PURE__*/index_js_default().createElement("img",{src:teacher===null||teacher===void 0?void 0:teacher.src,alt:teacher===null||teacher===void 0?void 0:teacher.alt,className:`teachers-section__picture__face noselect`,style:{position:"absolute",backfaceVisibility:"hidden",margin:20,transform:`translateZ(100px) translateY(100}px)`,WebkitTransform:`translateZ(100px) translateY(100px)`,transition:"transform 0.2s"}})),/*#__PURE__*/index_js_default().createElement("div",{className:"teachers-section__desc p-10"},/*#__PURE__*/index_js_default().createElement("p",{className:"teachers-section__bio"},teacher===null||teacher===void 0?void 0:teacher.bio))));}
;// CONCATENATED MODULE: ./src/sections/TeachersSection/index.js
function TeachersSection(){return/*#__PURE__*/index_js_default().createElement("section",{className:"teachers-section  pt-36 lg:pb-10 px-10 lg:px-36 xl:px-48"},/*#__PURE__*/index_js_default().createElement("h1",{className:"title mb-10 lg:mt-20"},"I docenti"),/*#__PURE__*/index_js_default().createElement(Teacher,{teacher:teachers[0],instrument:instruments[0]}),/*#__PURE__*/index_js_default().createElement(Teacher,{teacher:teachers[1],instrument:instruments[1]}));}
// EXTERNAL MODULE: ./public/static/svg/note_with_righe.svg
var note_with_righe = __webpack_require__(5167);
var note_with_righe_default = /*#__PURE__*/__webpack_require__.n(note_with_righe);
;// CONCATENATED MODULE: ./src/sections/FindusSection/index.js
function FindusSection(){const ref=useNav("#findus");const q=gsapWithCSS.utils.selector(ref);(0,index_js_.useEffect)(()=>{gsapWithCSS.timeline({scrollTrigger:{trigger:".find-us",start:"top center"}}).from(q(".title"),{xPercent:-50,opacity:0},0).from(q("address"),{xPercent:50,opacity:0},0);gsapWithCSS.timeline({defaults:{duration:1},scrollTrigger:{trigger:".notes_cover",start:"top center",end:"bottom top",scrub:true}}).to(q(".notes_cover"),{x:"100%"});},[]);return/*#__PURE__*/index_js_default().createElement("section",{className:"find-us",id:"findus",ref:ref},/*#__PURE__*/index_js_default().createElement("div",{className:"notes_cont"},/*#__PURE__*/index_js_default().createElement("div",{className:"notes_cover"}),/*#__PURE__*/index_js_default().createElement((note_with_righe_default()),{style:{transform:"translateX(-30px)",width:"100vw",height:264}})),/*#__PURE__*/index_js_default().createElement("div",{className:"lg:pt-20 mb-5 px-10 lg:px-36 xl:px-48"},/*#__PURE__*/index_js_default().createElement("h1",{className:"title"},"Dove ci troviamo"),/*#__PURE__*/index_js_default().createElement("address",{className:"mt-10 pl-2 "},"La nostra sede \xE8 in Via Tenente Garozzo, 2 95025",/*#__PURE__*/index_js_default().createElement("p",null,"Aci Sant'Antonio (CT)"))),/*#__PURE__*/index_js_default().createElement("div",{style:{height:380,overflow:"hidden",clipPath:"polygon(0 20%, 100% 20%, 100% 100%, 0% 100%)"}},/*#__PURE__*/index_js_default().createElement("iframe",{title:"maps",src:"https://www.google.com/maps/d/u/0/embed?mid=18inuwOcaxrVr2UiiT0nQYhG3k1Ww9w8s",width:"100%",height:"380"})));}
;// CONCATENATED MODULE: ./src/commons/Navbar/NavLink.js
const NavLink=({link,children})=>{const{activeNavLinkId,setActiveNavLinkId}=(0,index_js_.useContext)(NavContext);const handleClick=()=>{setActiveNavLinkId(link);};return/*#__PURE__*/index_js_default().createElement("div",{className:"nav__item__block"},/*#__PURE__*/index_js_default().createElement("a",{href:link,className:`block nav__item p-0 py-6 lg:p-6 lg:inline-block ${activeNavLinkId===link?"activeClass":""}`,onClick:handleClick,id:link},children));};/* harmony default export */ const Navbar_NavLink = (NavLink);
;// CONCATENATED MODULE: ./src/images/logocompleto.png
/* harmony default export */ const logocompleto = (__webpack_require__.p + "static/logocompleto-056b4c3e88a80e8b4cccf1dbc5d805c7.png");
;// CONCATENATED MODULE: ./src/commons/Navbar/index.js
const Navbar=()=>{const[menuShow,setMenu]=index_js_default().useState(false);const showMenu=()=>setMenu(!menuShow);return/*#__PURE__*/index_js_default().createElement("nav",{className:"navbar flex fixed items-center justify-between flex-wrap w-screen py-4 lg:py-0 px-10 "},/*#__PURE__*/index_js_default().createElement("a",{href:"#hero-section"},/*#__PURE__*/index_js_default().createElement("img",{src:logocompleto,alt:"logo-brisa",className:"navbar__logo"})),/*#__PURE__*/index_js_default().createElement("div",{className:"flex align-center justify-between lg:hidden"},/*#__PURE__*/index_js_default().createElement("button",{"aria-label":"menu",className:"mr-10 w-0",onClick:showMenu},/*#__PURE__*/index_js_default().createElement("div",{id:"hamburger",className:"hamburglar "+(menuShow?"is-open":"is-closed")},/*#__PURE__*/index_js_default().createElement("div",{className:"burger-icon"},/*#__PURE__*/index_js_default().createElement("div",{className:"burger-container"},/*#__PURE__*/index_js_default().createElement("span",{className:"burger-bun-top"}),/*#__PURE__*/index_js_default().createElement("span",{className:"burger-filling"}),/*#__PURE__*/index_js_default().createElement("span",{className:"burger-bun-bot"}))),/*#__PURE__*/index_js_default().createElement("div",{className:"path-burger"},/*#__PURE__*/index_js_default().createElement("div",{className:"animate-path"}))))),/*#__PURE__*/index_js_default().createElement("div",{className:`w-full block lg:flex lg:items-right lg:w-auto ${menuShow?"":"h-0"} lg:h-full`},/*#__PURE__*/index_js_default().createElement("div",{className:` ${!menuShow?"hidden":""} lg:flex flex-col lg:flex-row  mt-5 lg:mt-0 lg:px-36`},/*#__PURE__*/index_js_default().createElement(Navbar_NavLink,{link:"#about"},"La scuola"),/*#__PURE__*/index_js_default().createElement(Navbar_NavLink,{link:"#contact"},"Contatti"),/*#__PURE__*/index_js_default().createElement(Navbar_NavLink,{link:"#findus"},"Dove Trovarci"),/*#__PURE__*/index_js_default().createElement(Navbar_NavLink,{link:"#video"},"Video Didattici"))));};/* harmony default export */ const commons_Navbar = (Navbar);
;// CONCATENATED MODULE: ./src/images/facebook.webp
/* harmony default export */ const facebook = ("data:image/webp;base64,UklGRi4BAABXRUJQVlA4WAoAAAAQAAAAHwAAHwAAQUxQSOEAAAABgFvbdivljQmdKhiLUQETsahDkWIqoA+V8JcijBYFUMGECn8BhE4hnjf2Pj0qiAgGbhspcpeO+R5BIMY3uTCX3HhDFbHxnUHeo5UMwjcL+Q4D6KzlirRnwOqVq/K6Oh7vamU5HA7w0ufHlBJYeLBBgPW6T7vwcQIR2W/kgUjwbYkiI1cijmTeIbezcA4+IONZdMM4vpElQZOBtXOTnQvnoVyAREeZQYVrXDKOdjYXrZK1sn5HXsubd513Q1EnEtnvCsJ7RUEjiO/1OqX0hLQD9Xeh/q7U36X6u/6v/4L6v0IAVlA4ICYAAADQAgCdASogACAAPpFCnEolo6KhqAgAsBIJaQAAPaOgAP72JAAAAA==");
;// CONCATENATED MODULE: ./src/images/instagram.webp
/* harmony default export */ const instagram = ("data:image/webp;base64,UklGRpoBAABXRUJQVlA4WAoAAAAQAAAAHwAAHwAAQUxQSEcBAAABgBtte9vmP1QagKfKOacqu+YAmkAzxIp7cBAHnkbR4VTzlOVsVAqvAwCGCSKCgdtGipJjhs48Qv49ihI9+VrguPia6CQ6EsetB3L6sGVx/wLA4mMyGAzSdDAYTD4WALzci8jWC5g4DJR4VUEYG3jZEnkAvSe53NPwIEdgco1nnUvZM3AUQZzrCMPiUmKIEgh9VK+vq//UgY6EkGgIHCqNHkCvUZGNN8yZBKAnLJTNhcZRX8hGfU9ELZgYPpzxBUi73RR4uRDLD8yCib1Xw6CmRFRtALpiMWEBA4sGDDbEcmMADYsBuPSgJo416GVShVS5qBSqHtJ/rqErHrtw/U9anEIrpR1S/ELF/0vx/+rNRR/HvjOqBRN/rlp2rloVsQlA58ylQwiJlevcxhBZdZETuy4K11Xxuixc12X0BV9fMb6+Yjx9RQAAVlA4ICwAAADQAgCdASogACAAPpFCnUolo6KhqAgAsBIJaQAAPaOgAP72KEGBduIBwAAAAA==");
;// CONCATENATED MODULE: ./src/images/youtube.webp
/* harmony default export */ const youtube = ("data:image/webp;base64,UklGRswAAABXRUJQVlA4TMAAAAAvH8AHEDU4jiRJauS/q5D4oGtmL3jPRrCNtq2JR8VZMQXDMIpZd2EG0whUVlQMYJWtPCpz+O9n5LaNI07znOruJ+oBykEIkmK0JqvN5QPwwtrA57JZTVqGIomDfGAa2FEKe1PDrqIuHHYWXNZLJu8lp0OWFrQudFJBQ9CxoZdT72DKsK5EFcpLggukqk4aB3BhoiW04YqiNZsmYdrAFWpIe7vYBJrfPNv/Lv3v2v9d9H9X/d9l93fd/1/0/1f3LwU=");
;// CONCATENATED MODULE: ./src/images/maps.webp
/* harmony default export */ const maps = ("data:image/webp;base64,UklGRhICAABXRUJQVlA4WAoAAAAQAAAAHwAAHwAAQUxQSKQBAAABkDPb2rG9+s/c88zn2LZtlLZt27aqr4ptO5/LTCrbtpPPNk5x3XgiYgJg3f7Ip8LCT0faw+ewUzSeCvOl9CNaPirrg4qgdYRy60PHPm4Rmidz5jzRRLjFiydBQNATEe9GOQcA5gi6Zbpkut0TT4KAoCfintsKwSdz5jyhXOFW+p8w/yvthiF2Q+BnuE04fFURpgjlD8Je6F6Ewe/GmSKzMXwOABaJRUCQD6pPRGJNeG/INx5qJkYN8OyqrvtC8howgZwAXCP5a3ttC+8HST6bpxCQmBgANecJSaaGmcaQ2Sc6KwA4cgSy/aF0coHpAdkcqCpGjBC1ger5/KB03ck4oOYIUb26mFQVOEcO0EWQPYAzTYW+8wGgPXlDU7+YzxQ6pyqboOzGwC2ypdhDzhoWUxg/zANQuyaAsmty43e1H0EeA1A2k0yl/LaqPCaNQe0dmZTvyNyKwCpqv5Fk9rG4qAuFJLMTqd0A7wfJ+B0t0fpELo3xm8oHDLiUS/JPwBgWRg0JgKy86Y/4MCcEsvS0m8WccGRZZVgGTHhwb4QHy5prTgBWUDggSAAAAJADAJ0BKiAAIAA+kT6aR6WjoqEwGAgAsBIJaQAAPeZtJ8yOogAA/tJ//+/Yh7oTuwJdZ7fLCY/oZ/+KxHN/kPbgNKNGrMAAAA==");
;// CONCATENATED MODULE: ./src/commons/Footer/resources.js
const socials=[{src:facebook,href:"https://www.facebook.com/brisasonorascuoladimusica"},{src:instagram,href:"https://www.instagram.com/brisasonora_corsidimusica/"},{src:youtube,href:"https://www.youtube.com/channel/UCU_019OjoMwkLuTgLX9fRnQ/"},{src:maps,href:"https://goo.gl/maps/qynhq2d1iGtmYobo9"}];
;// CONCATENATED MODULE: ./src/images/logocompleto.webp
/* harmony default export */ const images_logocompleto = (__webpack_require__.p + "static/logocompleto-b71c23deb3e03468c39a6774f4aacd18.webp");
;// CONCATENATED MODULE: ./src/commons/Footer/index.js
const Footer=()=>/*#__PURE__*/index_js_default().createElement("footer",{className:"footer flex flex-col md:flex-row items-center justify-between flex-wrap w-screen p-3 lg:px-36 xl:px-48 py-20"},/*#__PURE__*/index_js_default().createElement("div",{className:"footer__section"},/*#__PURE__*/index_js_default().createElement("img",{src:images_logocompleto,alt:"brisa sonora logo",className:"footer__section__logo"})),/*#__PURE__*/index_js_default().createElement("div",{className:"footer__section flex justify-between"},socials.map(({src,href},index)=>/*#__PURE__*/index_js_default().createElement("a",{href:href},/*#__PURE__*/index_js_default().createElement("img",{src:src,alt:href.slice(12,20),className:"footer__section__social "+(index!==0?"ml-3":"")})))),/*#__PURE__*/index_js_default().createElement("div",{className:"footer__section mt-20 md:mt-0"},"Developed by",/*#__PURE__*/index_js_default().createElement("a",{href:"https://www.linkedin.com/in/mirko-torrisi/"}," Mirko Torrisi")));/* harmony default export */ const commons_Footer = (Footer);
// EXTERNAL MODULE: ./node_modules/react-helmet/es/Helmet.js
var Helmet = __webpack_require__(4593);
// EXTERNAL MODULE: ./node_modules/axios/index.js
var axios = __webpack_require__(9669);
var axios_default = /*#__PURE__*/__webpack_require__.n(axios);
;// CONCATENATED MODULE: ./src/services/index.js
const requestSendMessage=async({input,contact})=>{try{await axios_default().post("https://f68a6169ab34ac4b4169f12776c611bc.m.pipedream.net",{input,contact});return"Grazie per averci contattato. Ti risponderemo a breve per fissare la lezione di prova!";}catch(error){return"Siamo spiacenti, qualcosa è andato storto nell'elaborare la richiesta. Prova a chiamarci o a contattarci via mail.";}};
;// CONCATENATED MODULE: ./src/sections/ContactSection/resources.js
const PHONE_NUMBER=3473208541;const LAURA_NUMBER=3461016578;const EMAIL="info.brisasonora@gmail.com";
;// CONCATENATED MODULE: ./src/sections/ContactSection/index.js
function ContactSection(){const ref=useNav("#contact");const{0:input,1:setInput}=(0,index_js_.useState)("");const{0:contact,1:setContact}=(0,index_js_.useState)("");const{0:modalMsg,1:setModalMsg}=(0,index_js_.useState)("");const handleInput=e=>setInput(e.target.value);const handleContact=e=>setContact(e.target.value);const whatsappLink=`https://wa.me/+39${PHONE_NUMBER}/?text=${input}`;const q=gsapWithCSS.utils.selector(ref);const sendMessage=async e=>{e.preventDefault();const res=await requestSendMessage({input,contact});setModalMsg(res);};(0,index_js_.useEffect)(()=>{gsapWithCSS.timeline({scrollTrigger:{trigger:".contact-section",start:"top center"}}).from(q(".title"),{xPercent:-50,opacity:0},0).from(q("textarea"),{xPercent:-50,opacity:0},0).from(q("button"),{xPercent:50,opacity:0},0).from(q("h3"),{xPercent:-50,opacity:0},0);},[]);return/*#__PURE__*/index_js_default().createElement("section",{className:"contact-section py-36 lg:py-20 px-10 lg:px-36 xl:px-48",ref:ref,id:"contact"},/*#__PURE__*/index_js_default().createElement("h1",{className:"title"},"Contattaci"),/*#__PURE__*/index_js_default().createElement("div",{className:"contact-section__form mt-20"},/*#__PURE__*/index_js_default().createElement("h3",{className:"contact-section__form__title"},"Prenota ora la tua lezione di prova gratuita, ti risponderemo il prima possibile!"),/*#__PURE__*/index_js_default().createElement("form",{className:"flex flex-col items-start mt-5",onSubmit:sendMessage},/*#__PURE__*/index_js_default().createElement("input",{type:"text",id:"contact",placeholder:"Il tuo numero o la tua email",className:"contact-section__form__email mt-5",required:true,pattern:"^([a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3})|(\\d{3}\\d{3}\\d{4})$",onChange:handleContact}),/*#__PURE__*/index_js_default().createElement("div",{className:"contact-section__form__input__container"},/*#__PURE__*/index_js_default().createElement("textarea",{id:"message",type:"text",required:true,className:`contact-section__form__input mt-10`,style:{minHeight:"3rem",height:`${input.length/10}rem`},placeholder:"Salve, vorrei avere maggiori informazioni...",ref:ref,onChange:handleInput,value:input})),/*#__PURE__*/index_js_default().createElement("input",{type:"submit",className:"contact-section__form__submit mt-10",value:"Prenota"}),/*#__PURE__*/index_js_default().createElement("p",{className:"contact-section__form__privacy"},"Cliccando su Prenota aderisci alla nostra",/*#__PURE__*/index_js_default().createElement("a",{href:"https://www.iubenda.com/privacy-policy/10563366",title:"Privacy Policy",className:"ml-2 hoverable",target:"_blank"},"Privacy Policy"))),/*#__PURE__*/index_js_default().createElement("h3",{className:"mt-20"},"In alternativa, puoi chiamare uno di questi numeri:",/*#__PURE__*/index_js_default().createElement("a",{href:`tel:${PHONE_NUMBER}`,className:"phone_number hoverable"},"+39 ",PHONE_NUMBER),/*#__PURE__*/index_js_default().createElement("a",{href:`tel:${LAURA_NUMBER}`,className:"phone_number hoverable"},"+39 ",LAURA_NUMBER),"O mandare un'email a"," ",/*#__PURE__*/index_js_default().createElement("a",{href:`mailto:${EMAIL}`,className:"phone_number hoverable"},EMAIL))),modalMsg&&/*#__PURE__*/index_js_default().createElement("div",{className:"modalContainer"},/*#__PURE__*/index_js_default().createElement("div",{className:"contactmodal"},/*#__PURE__*/index_js_default().createElement("div",{className:"overlay"},/*#__PURE__*/index_js_default().createElement("h3",{className:"modal__msg"},modalMsg),/*#__PURE__*/index_js_default().createElement("button",{className:"contact-section__form__submit mt-10",onClick:()=>setModalMsg("")},"Chiudi")))));}
;// CONCATENATED MODULE: ./src/pages/index.js
const IndexPage=()=>{return/*#__PURE__*/index_js_.createElement("main",null,/*#__PURE__*/index_js_.createElement(Helmet.Helmet,null,/*#__PURE__*/index_js_.createElement("meta",{charSet:"utf-8"}),/*#__PURE__*/index_js_.createElement("meta",{name:"description",content:"Brisa Sonora corsi di musica, lezioni di pianoforte, chitarra, violino, sassofono a Catania. associazione musicale."}),/*#__PURE__*/index_js_.createElement("meta",{name:"robots",content:"index,follow"}),/*#__PURE__*/index_js_.createElement("meta",{name:"google-site-verification",content:"1PIQqEL0OgbiTPjG0fiPZ9rOcO30wM00ZIqtViP6IWo"}),/*#__PURE__*/index_js_.createElement("meta",{name:"keywords",content:"musica lezioni corsi pianoforte violino sassofono chitarra catania san gregorio strumenti musicali aci sant'antonio paesi etnei valverde aci catena corsi di musica associazione musicale conservatorio"}),/*#__PURE__*/index_js_.createElement("title",null,"Brisa Sonora")),/*#__PURE__*/index_js_.createElement(NavProvider,null,/*#__PURE__*/index_js_.createElement(commons_Navbar,null),/*#__PURE__*/index_js_.createElement(HeroSection,null),/*#__PURE__*/index_js_.createElement(MiddleSection,null),/*#__PURE__*/index_js_.createElement(TeachersSection,null),/*#__PURE__*/index_js_.createElement(FindusSection,null),/*#__PURE__*/index_js_.createElement(ContactSection,null),/*#__PURE__*/index_js_.createElement(commons_Footer,null)));};/* harmony default export */ const pages = (IndexPage);

/***/ }),

/***/ 3631:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "BaseContext": () => (/* binding */ BaseContext),
  "Link": () => (/* binding */ Link),
  "Location": () => (/* binding */ Location),
  "LocationProvider": () => (/* binding */ LocationProvider),
  "Match": () => (/* binding */ Match),
  "Redirect": () => (/* binding */ Redirect),
  "Router": () => (/* binding */ Router),
  "ServerLocation": () => (/* binding */ ServerLocation),
  "createHistory": () => (/* reexport */ createHistory),
  "createMemorySource": () => (/* reexport */ createMemorySource),
  "globalHistory": () => (/* reexport */ globalHistory),
  "isRedirect": () => (/* binding */ isRedirect),
  "matchPath": () => (/* reexport */ match),
  "navigate": () => (/* reexport */ history_navigate),
  "redirectTo": () => (/* binding */ redirectTo),
  "useLocation": () => (/* binding */ useLocation),
  "useMatch": () => (/* binding */ useMatch),
  "useNavigate": () => (/* binding */ useNavigate),
  "useParams": () => (/* binding */ useParams)
});

// EXTERNAL MODULE: external "/Users/mirkotorrisi/Documents/birsa-sonora/node_modules/react/index.js"
var index_js_ = __webpack_require__(2504);
var index_js_default = /*#__PURE__*/__webpack_require__.n(index_js_);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(5697);
// EXTERNAL MODULE: ./node_modules/invariant/invariant.js
var invariant = __webpack_require__(6128);
var invariant_default = /*#__PURE__*/__webpack_require__.n(invariant);
// EXTERNAL MODULE: ./.cache/react-lifecycles-compat.js
var react_lifecycles_compat = __webpack_require__(3639);
;// CONCATENATED MODULE: ./node_modules/@gatsbyjs/reach-router/es/lib/utils.js


////////////////////////////////////////////////////////////////////////////////
// startsWith(string, search) - Check if `string` starts with `search`
var startsWith = function startsWith(string, search) {
  return string.substr(0, search.length) === search;
};

////////////////////////////////////////////////////////////////////////////////
// pick(routes, uri)
//
// Ranks and picks the best route to match. Each segment gets the highest
// amount of points, then the type of segment gets an additional amount of
// points where
//
//     static > dynamic > splat > root
//
// This way we don't have to worry about the order of our routes, let the
// computers do it.
//
// A route looks like this
//
//     { path, default, value }
//
// And a returned match looks like:
//
//     { route, params, uri }
//
// I know, I should use TypeScript not comments for these types.
var pick = function pick(routes, uri) {
  var match = void 0;
  var default_ = void 0;

  var _uri$split = uri.split("?"),
      uriPathname = _uri$split[0];

  var uriSegments = segmentize(uriPathname);
  var isRootUri = uriSegments[0] === "";
  var ranked = rankRoutes(routes);

  for (var i = 0, l = ranked.length; i < l; i++) {
    var missed = false;
    var route = ranked[i].route;

    if (route.default) {
      default_ = {
        route: route,
        params: {},
        uri: uri
      };
      continue;
    }

    var routeSegments = segmentize(route.path);
    var params = {};
    var max = Math.max(uriSegments.length, routeSegments.length);
    var index = 0;

    for (; index < max; index++) {
      var routeSegment = routeSegments[index];
      var uriSegment = uriSegments[index];

      if (isSplat(routeSegment)) {
        // Hit a splat, just grab the rest, and return a match
        // uri:   /files/documents/work
        // route: /files/*
        var param = routeSegment.slice(1) || "*";
        params[param] = uriSegments.slice(index).map(decodeURIComponent).join("/");
        break;
      }

      if (uriSegment === undefined) {
        // URI is shorter than the route, no match
        // uri:   /users
        // route: /users/:userId
        missed = true;
        break;
      }

      var dynamicMatch = paramRe.exec(routeSegment);

      if (dynamicMatch && !isRootUri) {
        var matchIsNotReserved = reservedNames.indexOf(dynamicMatch[1]) === -1;
        !matchIsNotReserved ?  false ? 0 : invariant_default()(false) : void 0;
        var value = decodeURIComponent(uriSegment);
        params[dynamicMatch[1]] = value;
      } else if (routeSegment !== uriSegment) {
        // Current segments don't match, not dynamic, not splat, so no match
        // uri:   /users/123/settings
        // route: /users/:id/profile
        missed = true;
        break;
      }
    }

    if (!missed) {
      match = {
        route: route,
        params: params,
        uri: "/" + uriSegments.slice(0, index).join("/")
      };
      break;
    }
  }

  return match || default_ || null;
};

////////////////////////////////////////////////////////////////////////////////
// match(path, uri) - Matches just one path to a uri, also lol
var match = function match(path, uri) {
  return pick([{ path: path }], uri);
};

////////////////////////////////////////////////////////////////////////////////
// resolve(to, basepath)
//
// Resolves URIs as though every path is a directory, no files.  Relative URIs
// in the browser can feel awkward because not only can you be "in a directory"
// you can be "at a file", too. For example
//
//     browserSpecResolve('foo', '/bar/') => /bar/foo
//     browserSpecResolve('foo', '/bar') => /foo
//
// But on the command line of a file system, it's not as complicated, you can't
// `cd` from a file, only directories.  This way, links have to know less about
// their current path. To go deeper you can do this:
//
//     <Link to="deeper"/>
//     // instead of
//     <Link to=`{${props.uri}/deeper}`/>
//
// Just like `cd`, if you want to go deeper from the command line, you do this:
//
//     cd deeper
//     # not
//     cd $(pwd)/deeper
//
// By treating every path as a directory, linking to relative paths should
// require less contextual information and (fingers crossed) be more intuitive.
var resolve = function resolve(to, base) {
  // /foo/bar, /baz/qux => /foo/bar
  if (startsWith(to, "/")) {
    return to;
  }

  var _to$split = to.split("?"),
      toPathname = _to$split[0],
      toQuery = _to$split[1];

  var _base$split = base.split("?"),
      basePathname = _base$split[0];

  var toSegments = segmentize(toPathname);
  var baseSegments = segmentize(basePathname);

  // ?a=b, /users?b=c => /users?a=b
  if (toSegments[0] === "") {
    return addQuery(basePathname, toQuery);
  }

  // profile, /users/789 => /users/789/profile
  if (!startsWith(toSegments[0], ".")) {
    var pathname = baseSegments.concat(toSegments).join("/");
    return addQuery((basePathname === "/" ? "" : "/") + pathname, toQuery);
  }

  // ./         /users/123  =>  /users/123
  // ../        /users/123  =>  /users
  // ../..      /users/123  =>  /
  // ../../one  /a/b/c/d    =>  /a/b/one
  // .././one   /a/b/c/d    =>  /a/b/c/one
  var allSegments = baseSegments.concat(toSegments);
  var segments = [];
  for (var i = 0, l = allSegments.length; i < l; i++) {
    var segment = allSegments[i];
    if (segment === "..") segments.pop();else if (segment !== ".") segments.push(segment);
  }

  return addQuery("/" + segments.join("/"), toQuery);
};

////////////////////////////////////////////////////////////////////////////////
// insertParams(path, params)

var insertParams = function insertParams(path, params) {
  var _path$split = path.split("?"),
      pathBase = _path$split[0],
      _path$split$ = _path$split[1],
      query = _path$split$ === undefined ? "" : _path$split$;

  var segments = segmentize(pathBase);
  var constructedPath = "/" + segments.map(function (segment) {
    var match = paramRe.exec(segment);
    return match ? params[match[1]] : segment;
  }).join("/");
  var _params$location = params.location;
  _params$location = _params$location === undefined ? {} : _params$location;
  var _params$location$sear = _params$location.search,
      search = _params$location$sear === undefined ? "" : _params$location$sear;

  var searchSplit = search.split("?")[1] || "";
  constructedPath = addQuery(constructedPath, query, searchSplit);
  return constructedPath;
};

var validateRedirect = function validateRedirect(from, to) {
  var filter = function filter(segment) {
    return isDynamic(segment);
  };
  var fromString = segmentize(from).filter(filter).sort().join("/");
  var toString = segmentize(to).filter(filter).sort().join("/");
  return fromString === toString;
};

////////////////////////////////////////////////////////////////////////////////
// Junk
var paramRe = /^:(.+)/;

var SEGMENT_POINTS = 4;
var STATIC_POINTS = 3;
var DYNAMIC_POINTS = 2;
var SPLAT_PENALTY = 1;
var ROOT_POINTS = 1;

var isRootSegment = function isRootSegment(segment) {
  return segment === "";
};
var isDynamic = function isDynamic(segment) {
  return paramRe.test(segment);
};
var isSplat = function isSplat(segment) {
  return segment && segment[0] === "*";
};

var rankRoute = function rankRoute(route, index) {
  var score = route.default ? 0 : segmentize(route.path).reduce(function (score, segment) {
    score += SEGMENT_POINTS;
    if (isRootSegment(segment)) score += ROOT_POINTS;else if (isDynamic(segment)) score += DYNAMIC_POINTS;else if (isSplat(segment)) score -= SEGMENT_POINTS + SPLAT_PENALTY;else score += STATIC_POINTS;
    return score;
  }, 0);
  return { route: route, score: score, index: index };
};

var rankRoutes = function rankRoutes(routes) {
  return routes.map(rankRoute).sort(function (a, b) {
    return a.score < b.score ? 1 : a.score > b.score ? -1 : a.index - b.index;
  });
};

var segmentize = function segmentize(uri) {
  return uri
  // strip starting/ending slashes
  .replace(/(^\/+|\/+$)/g, "").split("/");
};

var addQuery = function addQuery(pathname) {
  for (var _len = arguments.length, query = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    query[_key - 1] = arguments[_key];
  }

  query = query.filter(function (q) {
    return q && q.length > 0;
  });
  return pathname + (query && query.length > 0 ? "?" + query.join("&") : "");
};

var reservedNames = ["uri", "path"];

/**
 * Shallow compares two objects.
 * @param {Object} obj1 The first object to compare.
 * @param {Object} obj2 The second object to compare.
 */
var shallowCompare = function shallowCompare(obj1, obj2) {
  var obj1Keys = Object.keys(obj1);
  return obj1Keys.length === Object.keys(obj2).length && obj1Keys.every(function (key) {
    return obj2.hasOwnProperty(key) && obj1[key] === obj2[key];
  });
};

////////////////////////////////////////////////////////////////////////////////

;// CONCATENATED MODULE: ./node_modules/@gatsbyjs/reach-router/es/lib/history.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var getLocation = function getLocation(source) {
  var _source$location = source.location,
      search = _source$location.search,
      hash = _source$location.hash,
      href = _source$location.href,
      origin = _source$location.origin,
      protocol = _source$location.protocol,
      host = _source$location.host,
      hostname = _source$location.hostname,
      port = _source$location.port;
  var pathname = source.location.pathname;


  if (!pathname && href && canUseDOM) {
    var url = new URL(href);
    pathname = url.pathname;
  }

  return {
    pathname: encodeURI(decodeURI(pathname)),
    search: search,
    hash: hash,
    href: href,
    origin: origin,
    protocol: protocol,
    host: host,
    hostname: hostname,
    port: port,
    state: source.history.state,
    key: source.history.state && source.history.state.key || "initial"
  };
};

var createHistory = function createHistory(source, options) {
  var listeners = [];
  var location = getLocation(source);
  var transitioning = false;
  var resolveTransition = function resolveTransition() {};

  return {
    get location() {
      return location;
    },

    get transitioning() {
      return transitioning;
    },

    _onTransitionComplete: function _onTransitionComplete() {
      transitioning = false;
      resolveTransition();
    },
    listen: function listen(listener) {
      listeners.push(listener);

      var popstateListener = function popstateListener() {
        location = getLocation(source);
        listener({ location: location, action: "POP" });
      };

      source.addEventListener("popstate", popstateListener);

      return function () {
        source.removeEventListener("popstate", popstateListener);
        listeners = listeners.filter(function (fn) {
          return fn !== listener;
        });
      };
    },
    navigate: function navigate(to) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          state = _ref.state,
          _ref$replace = _ref.replace,
          replace = _ref$replace === undefined ? false : _ref$replace;

      if (typeof to === "number") {
        source.history.go(to);
      } else {
        state = _extends({}, state, { key: Date.now() + "" });
        // try...catch iOS Safari limits to 100 pushState calls
        try {
          if (transitioning || replace) {
            source.history.replaceState(state, null, to);
          } else {
            source.history.pushState(state, null, to);
          }
        } catch (e) {
          source.location[replace ? "replace" : "assign"](to);
        }
      }

      location = getLocation(source);
      transitioning = true;
      var transition = new Promise(function (res) {
        return resolveTransition = res;
      });
      listeners.forEach(function (listener) {
        return listener({ location: location, action: "PUSH" });
      });
      return transition;
    }
  };
};

////////////////////////////////////////////////////////////////////////////////
// Stores history entries in memory for testing or other platforms like Native
var createMemorySource = function createMemorySource() {
  var initialPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "/";

  var searchIndex = initialPath.indexOf("?");
  var initialLocation = {
    pathname: searchIndex > -1 ? initialPath.substr(0, searchIndex) : initialPath,
    search: searchIndex > -1 ? initialPath.substr(searchIndex) : ""
  };
  var index = 0;
  var stack = [initialLocation];
  var states = [null];

  return {
    get location() {
      return stack[index];
    },
    addEventListener: function addEventListener(name, fn) {},
    removeEventListener: function removeEventListener(name, fn) {},

    history: {
      get entries() {
        return stack;
      },
      get index() {
        return index;
      },
      get state() {
        return states[index];
      },
      pushState: function pushState(state, _, uri) {
        var _uri$split = uri.split("?"),
            pathname = _uri$split[0],
            _uri$split$ = _uri$split[1],
            search = _uri$split$ === undefined ? "" : _uri$split$;

        index++;
        stack.push({ pathname: pathname, search: search.length ? "?" + search : search });
        states.push(state);
      },
      replaceState: function replaceState(state, _, uri) {
        var _uri$split2 = uri.split("?"),
            pathname = _uri$split2[0],
            _uri$split2$ = _uri$split2[1],
            search = _uri$split2$ === undefined ? "" : _uri$split2$;

        stack[index] = { pathname: pathname, search: search };
        states[index] = state;
      },
      go: function go(to) {
        var newIndex = index + to;

        if (newIndex < 0 || newIndex > states.length - 1) {
          return;
        }

        index = newIndex;
      }
    }
  };
};

////////////////////////////////////////////////////////////////////////////////
// global history - uses window.history as the source if available, otherwise a
// memory history
var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var getSource = function getSource() {
  return canUseDOM ? window : createMemorySource();
};

var globalHistory = createHistory(getSource());
var history_navigate = globalHistory.navigate;

////////////////////////////////////////////////////////////////////////////////


;// CONCATENATED MODULE: ./node_modules/@gatsbyjs/reach-router/es/index.js
var es_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable jsx-a11y/anchor-has-content */







////////////////////////////////////////////////////////////////////////////////

var createNamedContext = function createNamedContext(name, defaultValue) {
  var Ctx = (0,index_js_.createContext)(defaultValue);
  Ctx.displayName = name;
  return Ctx;
};

////////////////////////////////////////////////////////////////////////////////
// Location Context/Provider
var LocationContext = createNamedContext("Location");

// sets up a listener if there isn't one already so apps don't need to be
// wrapped in some top level provider
var Location = function Location(_ref) {
  var children = _ref.children;
  return index_js_default().createElement(
    LocationContext.Consumer,
    null,
    function (context) {
      return context ? children(context) : index_js_default().createElement(
        LocationProvider,
        null,
        children
      );
    }
  );
};

var LocationProvider = function (_React$Component) {
  _inherits(LocationProvider, _React$Component);

  function LocationProvider() {
    var _temp, _this, _ret;

    _classCallCheck(this, LocationProvider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      context: _this.getContext(),
      refs: { unlisten: null }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  LocationProvider.prototype.getContext = function getContext() {
    var _props$history = this.props.history,
        navigate = _props$history.navigate,
        location = _props$history.location;

    return { navigate: navigate, location: location };
  };

  LocationProvider.prototype.componentDidCatch = function componentDidCatch(error, info) {
    if (isRedirect(error)) {
      var _navigate = this.props.history.navigate;

      _navigate(error.uri, { replace: true });
    } else {
      throw error;
    }
  };

  LocationProvider.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (prevState.context.location !== this.state.context.location) {
      this.props.history._onTransitionComplete();
    }
  };

  LocationProvider.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var refs = this.state.refs,
        history = this.props.history;

    history._onTransitionComplete();
    refs.unlisten = history.listen(function () {
      Promise.resolve().then(function () {
        // TODO: replace rAF with react deferred update API when it's ready https://github.com/facebook/react/issues/13306
        requestAnimationFrame(function () {
          if (!_this2.unmounted) {
            _this2.setState(function () {
              return { context: _this2.getContext() };
            });
          }
        });
      });
    });
  };

  LocationProvider.prototype.componentWillUnmount = function componentWillUnmount() {
    var refs = this.state.refs;

    this.unmounted = true;
    refs.unlisten();
  };

  LocationProvider.prototype.render = function render() {
    var context = this.state.context,
        children = this.props.children;

    return index_js_default().createElement(
      LocationContext.Provider,
      { value: context },
      typeof children === "function" ? children(context) : children || null
    );
  };

  return LocationProvider;
}((index_js_default()).Component);

////////////////////////////////////////////////////////////////////////////////


LocationProvider.defaultProps = {
  history: globalHistory
};
 false ? 0 : void 0;
var ServerLocation = function ServerLocation(_ref2) {
  var url = _ref2.url,
      children = _ref2.children;

  var searchIndex = url.indexOf("?");
  var searchExists = searchIndex > -1;
  var pathname = void 0;
  var search = "";
  var hash = "";

  if (searchExists) {
    pathname = url.substring(0, searchIndex);
    search = url.substring(searchIndex);
  } else {
    pathname = url;
  }

  return index_js_default().createElement(
    LocationContext.Provider,
    {
      value: {
        location: {
          pathname: pathname,
          search: search,
          hash: hash
        },
        navigate: function navigate() {
          throw new Error("You can't call navigate on the server.");
        }
      }
    },
    children
  );
};
////////////////////////////////////////////////////////////////////////////////
// Sets baseuri and basepath for nested routers and links
var BaseContext = createNamedContext("Base", {
  baseuri: "/",
  basepath: "/",
  navigate: globalHistory.navigate
});

////////////////////////////////////////////////////////////////////////////////
// The main event, welcome to the show everybody.
var Router = function Router(props) {
  return index_js_default().createElement(
    BaseContext.Consumer,
    null,
    function (baseContext) {
      return index_js_default().createElement(
        Location,
        null,
        function (locationContext) {
          return index_js_default().createElement(RouterImpl, es_extends({}, baseContext, locationContext, props));
        }
      );
    }
  );
};

var RouterImpl = function (_React$PureComponent) {
  _inherits(RouterImpl, _React$PureComponent);

  function RouterImpl() {
    _classCallCheck(this, RouterImpl);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  RouterImpl.prototype.render = function render() {
    var _props = this.props,
        location = _props.location,
        _navigate2 = _props.navigate,
        basepath = _props.basepath,
        primary = _props.primary,
        children = _props.children,
        baseuri = _props.baseuri,
        _props$component = _props.component,
        component = _props$component === undefined ? "div" : _props$component,
        domProps = _objectWithoutProperties(_props, ["location", "navigate", "basepath", "primary", "children", "baseuri", "component"]);

    var routes = index_js_default().Children.toArray(children).reduce(function (array, child) {
      var routes = createRoute(basepath)(child);
      return array.concat(routes);
    }, []);
    var pathname = location.pathname;


    var match = pick(routes, pathname);

    if (match) {
      var params = match.params,
          uri = match.uri,
          route = match.route,
          element = match.route.value;

      // remove the /* from the end for child routes relative paths

      basepath = route.default ? basepath : route.path.replace(/\*$/, "");

      var props = es_extends({}, params, {
        uri: uri,
        location: location,
        navigate: function navigate(to, options) {
          return _navigate2(resolve(to, uri), options);
        }
      });

      var clone = index_js_default().cloneElement(element, props, element.props.children ? index_js_default().createElement(
        Router,
        { location: location, primary: primary },
        element.props.children
      ) : undefined);

      // using 'div' for < 16.3 support
      var FocusWrapper = primary ? FocusHandler : component;
      // don't pass any props to 'div'
      var wrapperProps = primary ? es_extends({ uri: uri, location: location, component: component }, domProps) : domProps;

      return index_js_default().createElement(
        BaseContext.Provider,
        {
          value: { baseuri: uri, basepath: basepath, navigate: props.navigate }
        },
        index_js_default().createElement(
          FocusWrapper,
          wrapperProps,
          clone
        )
      );
    } else {
      // Not sure if we want this, would require index routes at every level
      // warning(
      //   false,
      //   `<Router basepath="${basepath}">\n\nNothing matched:\n\t${
      //     location.pathname
      //   }\n\nPaths checked: \n\t${routes
      //     .map(route => route.path)
      //     .join(
      //       "\n\t"
      //     )}\n\nTo get rid of this warning, add a default NotFound component as child of Router:
      //   \n\tlet NotFound = () => <div>Not Found!</div>
      //   \n\t<Router>\n\t  <NotFound default/>\n\t  {/* ... */}\n\t</Router>`
      // );
      return null;
    }
  };

  return RouterImpl;
}((index_js_default()).PureComponent);

RouterImpl.defaultProps = {
  primary: true
};


var FocusContext = createNamedContext("Focus");

var FocusHandler = function FocusHandler(_ref3) {
  var uri = _ref3.uri,
      location = _ref3.location,
      component = _ref3.component,
      domProps = _objectWithoutProperties(_ref3, ["uri", "location", "component"]);

  return index_js_default().createElement(
    FocusContext.Consumer,
    null,
    function (requestFocus) {
      return index_js_default().createElement(FocusHandlerImpl, es_extends({}, domProps, {
        component: component,
        requestFocus: requestFocus,
        uri: uri,
        location: location
      }));
    }
  );
};

// don't focus on initial render
var initialRender = true;
var focusHandlerCount = 0;

var FocusHandlerImpl = function (_React$Component2) {
  _inherits(FocusHandlerImpl, _React$Component2);

  function FocusHandlerImpl() {
    var _temp2, _this4, _ret2;

    _classCallCheck(this, FocusHandlerImpl);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this4 = _possibleConstructorReturn(this, _React$Component2.call.apply(_React$Component2, [this].concat(args))), _this4), _this4.state = {}, _this4.requestFocus = function (node) {
      if (!_this4.state.shouldFocus && node) {
        node.focus();
      }
    }, _temp2), _possibleConstructorReturn(_this4, _ret2);
  }

  FocusHandlerImpl.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var initial = prevState.uri == null;
    if (initial) {
      return es_extends({
        shouldFocus: true
      }, nextProps);
    } else {
      var myURIChanged = nextProps.uri !== prevState.uri;
      var navigatedUpToMe = prevState.location.pathname !== nextProps.location.pathname && nextProps.location.pathname === nextProps.uri;
      return es_extends({
        shouldFocus: myURIChanged || navigatedUpToMe
      }, nextProps);
    }
  };

  FocusHandlerImpl.prototype.componentDidMount = function componentDidMount() {
    focusHandlerCount++;
    this.focus();
  };

  FocusHandlerImpl.prototype.componentWillUnmount = function componentWillUnmount() {
    focusHandlerCount--;
    if (focusHandlerCount === 0) {
      initialRender = true;
    }
  };

  FocusHandlerImpl.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (prevProps.location !== this.props.location && this.state.shouldFocus) {
      this.focus();
    }
  };

  FocusHandlerImpl.prototype.focus = function focus() {
    if (false) {}

    var requestFocus = this.props.requestFocus;


    if (requestFocus) {
      requestFocus(this.node);
    } else {
      if (initialRender) {
        initialRender = false;
      } else if (this.node) {
        // React polyfills [autofocus] and it fires earlier than cDM,
        // so we were stealing focus away, this line prevents that.
        if (!this.node.contains(document.activeElement)) {
          this.node.focus();
        }
      }
    }
  };

  FocusHandlerImpl.prototype.render = function render() {
    var _this5 = this;

    var _props2 = this.props,
        children = _props2.children,
        style = _props2.style,
        requestFocus = _props2.requestFocus,
        _props2$component = _props2.component,
        Comp = _props2$component === undefined ? "div" : _props2$component,
        uri = _props2.uri,
        location = _props2.location,
        domProps = _objectWithoutProperties(_props2, ["children", "style", "requestFocus", "component", "uri", "location"]);

    return index_js_default().createElement(
      Comp,
      es_extends({
        style: es_extends({ outline: "none" }, style),
        tabIndex: "-1",
        ref: function ref(n) {
          return _this5.node = n;
        }
      }, domProps),
      index_js_default().createElement(
        FocusContext.Provider,
        { value: this.requestFocus },
        this.props.children
      )
    );
  };

  return FocusHandlerImpl;
}((index_js_default()).Component);

(0,react_lifecycles_compat/* polyfill */.O)(FocusHandlerImpl);

var k = function k() {};

////////////////////////////////////////////////////////////////////////////////
var forwardRef = (index_js_default()).forwardRef;

if (typeof forwardRef === "undefined") {
  forwardRef = function forwardRef(C) {
    return C;
  };
}

var Link = forwardRef(function (_ref4, ref) {
  var innerRef = _ref4.innerRef,
      props = _objectWithoutProperties(_ref4, ["innerRef"]);

  return index_js_default().createElement(
    BaseContext.Consumer,
    null,
    function (_ref5) {
      var basepath = _ref5.basepath,
          baseuri = _ref5.baseuri;
      return index_js_default().createElement(
        Location,
        null,
        function (_ref6) {
          var location = _ref6.location,
              navigate = _ref6.navigate;

          var to = props.to,
              state = props.state,
              replace = props.replace,
              _props$getProps = props.getProps,
              getProps = _props$getProps === undefined ? k : _props$getProps,
              anchorProps = _objectWithoutProperties(props, ["to", "state", "replace", "getProps"]);

          var href = resolve(to, baseuri);
          var encodedHref = encodeURI(href);
          var isCurrent = location.pathname === encodedHref;
          var isPartiallyCurrent = startsWith(location.pathname, encodedHref);

          return index_js_default().createElement("a", es_extends({
            ref: ref || innerRef,
            "aria-current": isCurrent ? "page" : undefined
          }, anchorProps, getProps({ isCurrent: isCurrent, isPartiallyCurrent: isPartiallyCurrent, href: href, location: location }), {
            href: href,
            onClick: function onClick(event) {
              if (anchorProps.onClick) anchorProps.onClick(event);
              if (shouldNavigate(event)) {
                event.preventDefault();
                var shouldReplace = replace;
                if (typeof replace !== "boolean" && isCurrent) {
                  var _location$state = es_extends({}, location.state),
                      key = _location$state.key,
                      restState = _objectWithoutProperties(_location$state, ["key"]);

                  shouldReplace = shallowCompare(es_extends({}, state), restState);
                }
                navigate(href, {
                  state: state,
                  replace: shouldReplace
                });
              }
            }
          }));
        }
      );
    }
  );
});

Link.displayName = "Link";

 false ? 0 : void 0;

////////////////////////////////////////////////////////////////////////////////
function RedirectRequest(uri) {
  this.uri = uri;
}

var isRedirect = function isRedirect(o) {
  return o instanceof RedirectRequest;
};

var redirectTo = function redirectTo(to) {
  throw new RedirectRequest(to);
};

var RedirectImpl = function (_React$Component3) {
  _inherits(RedirectImpl, _React$Component3);

  function RedirectImpl() {
    _classCallCheck(this, RedirectImpl);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  // Support React < 16 with this hook
  RedirectImpl.prototype.componentDidMount = function componentDidMount() {
    var _props3 = this.props,
        navigate = _props3.navigate,
        to = _props3.to,
        from = _props3.from,
        _props3$replace = _props3.replace,
        replace = _props3$replace === undefined ? true : _props3$replace,
        state = _props3.state,
        noThrow = _props3.noThrow,
        baseuri = _props3.baseuri,
        props = _objectWithoutProperties(_props3, ["navigate", "to", "from", "replace", "state", "noThrow", "baseuri"]);

    Promise.resolve().then(function () {
      var resolvedTo = resolve(to, baseuri);
      navigate(insertParams(resolvedTo, props), { replace: replace, state: state });
    });
  };

  RedirectImpl.prototype.render = function render() {
    var _props4 = this.props,
        navigate = _props4.navigate,
        to = _props4.to,
        from = _props4.from,
        replace = _props4.replace,
        state = _props4.state,
        noThrow = _props4.noThrow,
        baseuri = _props4.baseuri,
        props = _objectWithoutProperties(_props4, ["navigate", "to", "from", "replace", "state", "noThrow", "baseuri"]);

    var resolvedTo = resolve(to, baseuri);
    if (!noThrow) redirectTo(insertParams(resolvedTo, props));
    return null;
  };

  return RedirectImpl;
}((index_js_default()).Component);

var Redirect = function Redirect(props) {
  return index_js_default().createElement(
    BaseContext.Consumer,
    null,
    function (_ref7) {
      var baseuri = _ref7.baseuri;
      return index_js_default().createElement(
        Location,
        null,
        function (locationContext) {
          return index_js_default().createElement(RedirectImpl, es_extends({}, locationContext, { baseuri: baseuri }, props));
        }
      );
    }
  );
};

 false ? 0 : void 0;

////////////////////////////////////////////////////////////////////////////////
var Match = function Match(_ref8) {
  var path = _ref8.path,
      children = _ref8.children;
  return index_js_default().createElement(
    BaseContext.Consumer,
    null,
    function (_ref9) {
      var baseuri = _ref9.baseuri;
      return index_js_default().createElement(
        Location,
        null,
        function (_ref10) {
          var navigate = _ref10.navigate,
              location = _ref10.location;

          var resolvedPath = resolve(path, baseuri);
          var result = match(resolvedPath, location.pathname);
          return children({
            navigate: navigate,
            location: location,
            match: result ? es_extends({}, result.params, {
              uri: result.uri,
              path: path
            }) : null
          });
        }
      );
    }
  );
};

////////////////////////////////////////////////////////////////////////////////
// Hooks

var useLocation = function useLocation() {
  var context = (0,index_js_.useContext)(LocationContext);

  if (!context) {
    throw new Error("useLocation hook was used but a LocationContext.Provider was not found in the parent tree. Make sure this is used in a component that is a child of Router");
  }

  return context.location;
};

var useNavigate = function useNavigate() {
  var context = (0,index_js_.useContext)(BaseContext);

  if (!context) {
    throw new Error("useNavigate hook was used but a BaseContext.Provider was not found in the parent tree. Make sure this is used in a component that is a child of Router");
  }

  return context.navigate;
};

var useParams = function useParams() {
  var context = (0,index_js_.useContext)(BaseContext);

  if (!context) {
    throw new Error("useParams hook was used but a LocationContext.Provider was not found in the parent tree. Make sure this is used in a component that is a child of Router");
  }

  var location = useLocation();

  var results = match(context.basepath, location.pathname);

  return results ? results.params : null;
};

var useMatch = function useMatch(path) {
  if (!path) {
    throw new Error("useMatch(path: string) requires an argument of a string to match against");
  }
  var context = (0,index_js_.useContext)(BaseContext);

  if (!context) {
    throw new Error("useMatch hook was used but a LocationContext.Provider was not found in the parent tree. Make sure this is used in a component that is a child of Router");
  }

  var location = useLocation();

  var resolvedPath = resolve(path, context.baseuri);
  var result = match(resolvedPath, location.pathname);
  return result ? es_extends({}, result.params, {
    uri: result.uri,
    path: path
  }) : null;
};

////////////////////////////////////////////////////////////////////////////////
// Junk
var stripSlashes = function stripSlashes(str) {
  return str.replace(/(^\/+|\/+$)/g, "");
};

var createRoute = function createRoute(basepath) {
  return function (element) {
    if (!element) {
      return null;
    }

    if (element.type === (index_js_default()).Fragment && element.props.children) {
      return index_js_default().Children.map(element.props.children, createRoute(basepath));
    }
    !(element.props.path || element.props.default || element.type === Redirect) ?  false ? 0 : invariant_default()(false) : void 0;

    !!(element.type === Redirect && (!element.props.from || !element.props.to)) ?  false ? 0 : invariant_default()(false) : void 0;

    !!(element.type === Redirect && !validateRedirect(element.props.from, element.props.to)) ?  false ? 0 : invariant_default()(false) : void 0;

    if (element.props.default) {
      return { value: element, default: true };
    }

    var elementPath = element.type === Redirect ? element.props.from : element.props.path;

    var path = elementPath === "/" ? basepath : stripSlashes(basepath) + "/" + stripSlashes(elementPath);

    return {
      value: element,
      default: element.props.default,
      path: element.props.children ? stripSlashes(path) + "/*" : path
    };
  };
};

var shouldNavigate = function shouldNavigate(event) {
  return !event.defaultPrevented && event.button === 0 && !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
};

////////////////////////////////////////////////////////////////////////


/***/ }),

/***/ 6560:
/***/ ((module) => {

"use strict";


module.exports = (flag, argv = process.argv) => {
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const position = argv.indexOf(prefix + flag);
	const terminatorPosition = argv.indexOf('--');
	return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
};


/***/ }),

/***/ 6128:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var NODE_ENV = "production";

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;


/***/ }),

/***/ 7824:
/***/ ((module) => {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),

/***/ 2703:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(414);

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ 5697:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) { var throwOnDirectAccess, ReactIs; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(2703)();
}


/***/ }),

/***/ 414:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ 9590:
/***/ ((module) => {

/* global Map:readonly, Set:readonly, ArrayBuffer:readonly */

var hasElementType = typeof Element !== 'undefined';
var hasMap = typeof Map === 'function';
var hasSet = typeof Set === 'function';
var hasArrayBuffer = typeof ArrayBuffer === 'function' && !!ArrayBuffer.isView;

// Note: We **don't** need `envHasBigInt64Array` in fde es6/index.js

function equal(a, b) {
  // START: fast-deep-equal es6/index.js 3.1.1
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }

    // START: Modifications:
    // 1. Extra `has<Type> &&` helpers in initial condition allow es6 code
    //    to co-exist with es5.
    // 2. Replace `for of` with es5 compliant iteration using `for`.
    //    Basically, take:
    //
    //    ```js
    //    for (i of a.entries())
    //      if (!b.has(i[0])) return false;
    //    ```
    //
    //    ... and convert to:
    //
    //    ```js
    //    it = a.entries();
    //    while (!(i = it.next()).done)
    //      if (!b.has(i.value[0])) return false;
    //    ```
    //
    //    **Note**: `i` access switches to `i.value`.
    var it;
    if (hasMap && (a instanceof Map) && (b instanceof Map)) {
      if (a.size !== b.size) return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!b.has(i.value[0])) return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!equal(i.value[1], b.get(i.value[0]))) return false;
      return true;
    }

    if (hasSet && (a instanceof Set) && (b instanceof Set)) {
      if (a.size !== b.size) return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!b.has(i.value[0])) return false;
      return true;
    }
    // END: Modifications

    if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (a[i] !== b[i]) return false;
      return true;
    }

    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    // END: fast-deep-equal

    // START: react-fast-compare
    // custom handling for DOM elements
    if (hasElementType && a instanceof Element) return false;

    // custom handling for React/Preact
    for (i = length; i-- !== 0;) {
      if ((keys[i] === '_owner' || keys[i] === '__v' || keys[i] === '__o') && a.$$typeof) {
        // React-specific: avoid traversing React elements' _owner
        // Preact-specific: avoid traversing Preact elements' __v and __o
        //    __v = $_original / $_vnode
        //    __o = $_owner
        // These properties contain circular references and are not needed when
        // comparing the actual elements (and not their owners)
        // .$$typeof and ._store on just reasonable markers of elements

        continue;
      }

      // all other properties should be traversed as usual
      if (!equal(a[keys[i]], b[keys[i]])) return false;
    }
    // END: react-fast-compare

    // START: fast-deep-equal
    return true;
  }

  return a !== a && b !== b;
}
// end fast-deep-equal

module.exports = function isEqual(a, b) {
  try {
    return equal(a, b);
  } catch (error) {
    if (((error.message || '').match(/stack|recursion/i))) {
      // warn on circular references, don't crash
      // browsers give this different errors name and messages:
      // chrome/safari: "RangeError", "Maximum call stack size exceeded"
      // firefox: "InternalError", too much recursion"
      // edge: "Error", "Out of stack space"
      console.warn('react-fast-compare cannot handle circular refs');
      return false;
    }
    // some other error. we should definitely know about these
    throw error;
  }
};


/***/ }),

/***/ 4593:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "Helmet": () => (/* binding */ HelmetExport)
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5697);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_side_effect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3524);
/* harmony import */ var react_side_effect__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_side_effect__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_fast_compare__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9590);
/* harmony import */ var react_fast_compare__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_fast_compare__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2504);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var object_assign__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4852);
/* harmony import */ var object_assign__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(object_assign__WEBPACK_IMPORTED_MODULE_4__);






var ATTRIBUTE_NAMES = {
    BODY: "bodyAttributes",
    HTML: "htmlAttributes",
    TITLE: "titleAttributes"
};

var TAG_NAMES = {
    BASE: "base",
    BODY: "body",
    HEAD: "head",
    HTML: "html",
    LINK: "link",
    META: "meta",
    NOSCRIPT: "noscript",
    SCRIPT: "script",
    STYLE: "style",
    TITLE: "title"
};

var VALID_TAG_NAMES = Object.keys(TAG_NAMES).map(function (name) {
    return TAG_NAMES[name];
});

var TAG_PROPERTIES = {
    CHARSET: "charset",
    CSS_TEXT: "cssText",
    HREF: "href",
    HTTPEQUIV: "http-equiv",
    INNER_HTML: "innerHTML",
    ITEM_PROP: "itemprop",
    NAME: "name",
    PROPERTY: "property",
    REL: "rel",
    SRC: "src",
    TARGET: "target"
};

var REACT_TAG_MAP = {
    accesskey: "accessKey",
    charset: "charSet",
    class: "className",
    contenteditable: "contentEditable",
    contextmenu: "contextMenu",
    "http-equiv": "httpEquiv",
    itemprop: "itemProp",
    tabindex: "tabIndex"
};

var HELMET_PROPS = {
    DEFAULT_TITLE: "defaultTitle",
    DEFER: "defer",
    ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
    ON_CHANGE_CLIENT_STATE: "onChangeClientState",
    TITLE_TEMPLATE: "titleTemplate"
};

var HTML_TAG_MAP = Object.keys(REACT_TAG_MAP).reduce(function (obj, key) {
    obj[REACT_TAG_MAP[key]] = key;
    return obj;
}, {});

var SELF_CLOSING_TAGS = [TAG_NAMES.NOSCRIPT, TAG_NAMES.SCRIPT, TAG_NAMES.STYLE];

var HELMET_ATTRIBUTE = "data-react-helmet";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var encodeSpecialCharacters = function encodeSpecialCharacters(str) {
    var encode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (encode === false) {
        return String(str);
    }

    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};

var getTitleFromPropsList = function getTitleFromPropsList(propsList) {
    var innermostTitle = getInnermostProperty(propsList, TAG_NAMES.TITLE);
    var innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);

    if (innermostTemplate && innermostTitle) {
        // use function arg to avoid need to escape $ characters
        return innermostTemplate.replace(/%s/g, function () {
            return Array.isArray(innermostTitle) ? innermostTitle.join("") : innermostTitle;
        });
    }

    var innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);

    return innermostTitle || innermostDefaultTitle || undefined;
};

var getOnChangeClientState = function getOnChangeClientState(propsList) {
    return getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || function () {};
};

var getAttributesFromPropsList = function getAttributesFromPropsList(tagType, propsList) {
    return propsList.filter(function (props) {
        return typeof props[tagType] !== "undefined";
    }).map(function (props) {
        return props[tagType];
    }).reduce(function (tagAttrs, current) {
        return _extends({}, tagAttrs, current);
    }, {});
};

var getBaseTagFromPropsList = function getBaseTagFromPropsList(primaryAttributes, propsList) {
    return propsList.filter(function (props) {
        return typeof props[TAG_NAMES.BASE] !== "undefined";
    }).map(function (props) {
        return props[TAG_NAMES.BASE];
    }).reverse().reduce(function (innermostBaseTag, tag) {
        if (!innermostBaseTag.length) {
            var keys = Object.keys(tag);

            for (var i = 0; i < keys.length; i++) {
                var attributeKey = keys[i];
                var lowerCaseAttributeKey = attributeKey.toLowerCase();

                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
                    return innermostBaseTag.concat(tag);
                }
            }
        }

        return innermostBaseTag;
    }, []);
};

var getTagsFromPropsList = function getTagsFromPropsList(tagName, primaryAttributes, propsList) {
    // Calculate list of tags, giving priority innermost component (end of the propslist)
    var approvedSeenTags = {};

    return propsList.filter(function (props) {
        if (Array.isArray(props[tagName])) {
            return true;
        }
        if (typeof props[tagName] !== "undefined") {
            warn("Helmet: " + tagName + " should be of type \"Array\". Instead found type \"" + _typeof(props[tagName]) + "\"");
        }
        return false;
    }).map(function (props) {
        return props[tagName];
    }).reverse().reduce(function (approvedTags, instanceTags) {
        var instanceSeenTags = {};

        instanceTags.filter(function (tag) {
            var primaryAttributeKey = void 0;
            var keys = Object.keys(tag);
            for (var i = 0; i < keys.length; i++) {
                var attributeKey = keys[i];
                var lowerCaseAttributeKey = attributeKey.toLowerCase();

                // Special rule with link tags, since rel and href are both primary tags, rel takes priority
                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === TAG_PROPERTIES.REL && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === TAG_PROPERTIES.REL && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
                    primaryAttributeKey = lowerCaseAttributeKey;
                }
                // Special case for innerHTML which doesn't work lowercased
                if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === TAG_PROPERTIES.INNER_HTML || attributeKey === TAG_PROPERTIES.CSS_TEXT || attributeKey === TAG_PROPERTIES.ITEM_PROP)) {
                    primaryAttributeKey = attributeKey;
                }
            }

            if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
                return false;
            }

            var value = tag[primaryAttributeKey].toLowerCase();

            if (!approvedSeenTags[primaryAttributeKey]) {
                approvedSeenTags[primaryAttributeKey] = {};
            }

            if (!instanceSeenTags[primaryAttributeKey]) {
                instanceSeenTags[primaryAttributeKey] = {};
            }

            if (!approvedSeenTags[primaryAttributeKey][value]) {
                instanceSeenTags[primaryAttributeKey][value] = true;
                return true;
            }

            return false;
        }).reverse().forEach(function (tag) {
            return approvedTags.push(tag);
        });

        // Update seen tags with tags from this instance
        var keys = Object.keys(instanceSeenTags);
        for (var i = 0; i < keys.length; i++) {
            var attributeKey = keys[i];
            var tagUnion = object_assign__WEBPACK_IMPORTED_MODULE_4___default()({}, approvedSeenTags[attributeKey], instanceSeenTags[attributeKey]);

            approvedSeenTags[attributeKey] = tagUnion;
        }

        return approvedTags;
    }, []).reverse();
};

var getInnermostProperty = function getInnermostProperty(propsList, property) {
    for (var i = propsList.length - 1; i >= 0; i--) {
        var props = propsList[i];

        if (props.hasOwnProperty(property)) {
            return props[property];
        }
    }

    return null;
};

var reducePropsToState = function reducePropsToState(propsList) {
    return {
        baseTag: getBaseTagFromPropsList([TAG_PROPERTIES.HREF, TAG_PROPERTIES.TARGET], propsList),
        bodyAttributes: getAttributesFromPropsList(ATTRIBUTE_NAMES.BODY, propsList),
        defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
        encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
        htmlAttributes: getAttributesFromPropsList(ATTRIBUTE_NAMES.HTML, propsList),
        linkTags: getTagsFromPropsList(TAG_NAMES.LINK, [TAG_PROPERTIES.REL, TAG_PROPERTIES.HREF], propsList),
        metaTags: getTagsFromPropsList(TAG_NAMES.META, [TAG_PROPERTIES.NAME, TAG_PROPERTIES.CHARSET, TAG_PROPERTIES.HTTPEQUIV, TAG_PROPERTIES.PROPERTY, TAG_PROPERTIES.ITEM_PROP], propsList),
        noscriptTags: getTagsFromPropsList(TAG_NAMES.NOSCRIPT, [TAG_PROPERTIES.INNER_HTML], propsList),
        onChangeClientState: getOnChangeClientState(propsList),
        scriptTags: getTagsFromPropsList(TAG_NAMES.SCRIPT, [TAG_PROPERTIES.SRC, TAG_PROPERTIES.INNER_HTML], propsList),
        styleTags: getTagsFromPropsList(TAG_NAMES.STYLE, [TAG_PROPERTIES.CSS_TEXT], propsList),
        title: getTitleFromPropsList(propsList),
        titleAttributes: getAttributesFromPropsList(ATTRIBUTE_NAMES.TITLE, propsList)
    };
};

var rafPolyfill = function () {
    var clock = Date.now();

    return function (callback) {
        var currentTime = Date.now();

        if (currentTime - clock > 16) {
            clock = currentTime;
            callback(currentTime);
        } else {
            setTimeout(function () {
                rafPolyfill(callback);
            }, 0);
        }
    };
}();

var cafPolyfill = function cafPolyfill(id) {
    return clearTimeout(id);
};

var requestAnimationFrame = typeof window !== "undefined" ? window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || rafPolyfill : global.requestAnimationFrame || rafPolyfill;

var cancelAnimationFrame = typeof window !== "undefined" ? window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || cafPolyfill : global.cancelAnimationFrame || cafPolyfill;

var warn = function warn(msg) {
    return console && typeof console.warn === "function" && console.warn(msg);
};

var _helmetCallback = null;

var handleClientStateChange = function handleClientStateChange(newState) {
    if (_helmetCallback) {
        cancelAnimationFrame(_helmetCallback);
    }

    if (newState.defer) {
        _helmetCallback = requestAnimationFrame(function () {
            commitTagChanges(newState, function () {
                _helmetCallback = null;
            });
        });
    } else {
        commitTagChanges(newState);
        _helmetCallback = null;
    }
};

var commitTagChanges = function commitTagChanges(newState, cb) {
    var baseTag = newState.baseTag,
        bodyAttributes = newState.bodyAttributes,
        htmlAttributes = newState.htmlAttributes,
        linkTags = newState.linkTags,
        metaTags = newState.metaTags,
        noscriptTags = newState.noscriptTags,
        onChangeClientState = newState.onChangeClientState,
        scriptTags = newState.scriptTags,
        styleTags = newState.styleTags,
        title = newState.title,
        titleAttributes = newState.titleAttributes;

    updateAttributes(TAG_NAMES.BODY, bodyAttributes);
    updateAttributes(TAG_NAMES.HTML, htmlAttributes);

    updateTitle(title, titleAttributes);

    var tagUpdates = {
        baseTag: updateTags(TAG_NAMES.BASE, baseTag),
        linkTags: updateTags(TAG_NAMES.LINK, linkTags),
        metaTags: updateTags(TAG_NAMES.META, metaTags),
        noscriptTags: updateTags(TAG_NAMES.NOSCRIPT, noscriptTags),
        scriptTags: updateTags(TAG_NAMES.SCRIPT, scriptTags),
        styleTags: updateTags(TAG_NAMES.STYLE, styleTags)
    };

    var addedTags = {};
    var removedTags = {};

    Object.keys(tagUpdates).forEach(function (tagType) {
        var _tagUpdates$tagType = tagUpdates[tagType],
            newTags = _tagUpdates$tagType.newTags,
            oldTags = _tagUpdates$tagType.oldTags;


        if (newTags.length) {
            addedTags[tagType] = newTags;
        }
        if (oldTags.length) {
            removedTags[tagType] = tagUpdates[tagType].oldTags;
        }
    });

    cb && cb();

    onChangeClientState(newState, addedTags, removedTags);
};

var flattenArray = function flattenArray(possibleArray) {
    return Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
};

var updateTitle = function updateTitle(title, attributes) {
    if (typeof title !== "undefined" && document.title !== title) {
        document.title = flattenArray(title);
    }

    updateAttributes(TAG_NAMES.TITLE, attributes);
};

var updateAttributes = function updateAttributes(tagName, attributes) {
    var elementTag = document.getElementsByTagName(tagName)[0];

    if (!elementTag) {
        return;
    }

    var helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
    var helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
    var attributesToRemove = [].concat(helmetAttributes);
    var attributeKeys = Object.keys(attributes);

    for (var i = 0; i < attributeKeys.length; i++) {
        var attribute = attributeKeys[i];
        var value = attributes[attribute] || "";

        if (elementTag.getAttribute(attribute) !== value) {
            elementTag.setAttribute(attribute, value);
        }

        if (helmetAttributes.indexOf(attribute) === -1) {
            helmetAttributes.push(attribute);
        }

        var indexToSave = attributesToRemove.indexOf(attribute);
        if (indexToSave !== -1) {
            attributesToRemove.splice(indexToSave, 1);
        }
    }

    for (var _i = attributesToRemove.length - 1; _i >= 0; _i--) {
        elementTag.removeAttribute(attributesToRemove[_i]);
    }

    if (helmetAttributes.length === attributesToRemove.length) {
        elementTag.removeAttribute(HELMET_ATTRIBUTE);
    } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
        elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
    }
};

var updateTags = function updateTags(type, tags) {
    var headElement = document.head || document.querySelector(TAG_NAMES.HEAD);
    var tagNodes = headElement.querySelectorAll(type + "[" + HELMET_ATTRIBUTE + "]");
    var oldTags = Array.prototype.slice.call(tagNodes);
    var newTags = [];
    var indexToDelete = void 0;

    if (tags && tags.length) {
        tags.forEach(function (tag) {
            var newElement = document.createElement(type);

            for (var attribute in tag) {
                if (tag.hasOwnProperty(attribute)) {
                    if (attribute === TAG_PROPERTIES.INNER_HTML) {
                        newElement.innerHTML = tag.innerHTML;
                    } else if (attribute === TAG_PROPERTIES.CSS_TEXT) {
                        if (newElement.styleSheet) {
                            newElement.styleSheet.cssText = tag.cssText;
                        } else {
                            newElement.appendChild(document.createTextNode(tag.cssText));
                        }
                    } else {
                        var value = typeof tag[attribute] === "undefined" ? "" : tag[attribute];
                        newElement.setAttribute(attribute, value);
                    }
                }
            }

            newElement.setAttribute(HELMET_ATTRIBUTE, "true");

            // Remove a duplicate tag from domTagstoRemove, so it isn't cleared.
            if (oldTags.some(function (existingTag, index) {
                indexToDelete = index;
                return newElement.isEqualNode(existingTag);
            })) {
                oldTags.splice(indexToDelete, 1);
            } else {
                newTags.push(newElement);
            }
        });
    }

    oldTags.forEach(function (tag) {
        return tag.parentNode.removeChild(tag);
    });
    newTags.forEach(function (tag) {
        return headElement.appendChild(tag);
    });

    return {
        oldTags: oldTags,
        newTags: newTags
    };
};

var generateElementAttributesAsString = function generateElementAttributesAsString(attributes) {
    return Object.keys(attributes).reduce(function (str, key) {
        var attr = typeof attributes[key] !== "undefined" ? key + "=\"" + attributes[key] + "\"" : "" + key;
        return str ? str + " " + attr : attr;
    }, "");
};

var generateTitleAsString = function generateTitleAsString(type, title, attributes, encode) {
    var attributeString = generateElementAttributesAsString(attributes);
    var flattenedTitle = flattenArray(title);
    return attributeString ? "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\" " + attributeString + ">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">" : "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">";
};

var generateTagsAsString = function generateTagsAsString(type, tags, encode) {
    return tags.reduce(function (str, tag) {
        var attributeHtml = Object.keys(tag).filter(function (attribute) {
            return !(attribute === TAG_PROPERTIES.INNER_HTML || attribute === TAG_PROPERTIES.CSS_TEXT);
        }).reduce(function (string, attribute) {
            var attr = typeof tag[attribute] === "undefined" ? attribute : attribute + "=\"" + encodeSpecialCharacters(tag[attribute], encode) + "\"";
            return string ? string + " " + attr : attr;
        }, "");

        var tagContent = tag.innerHTML || tag.cssText || "";

        var isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;

        return str + "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\" " + attributeHtml + (isSelfClosing ? "/>" : ">" + tagContent + "</" + type + ">");
    }, "");
};

var convertElementAttributestoReactProps = function convertElementAttributestoReactProps(attributes) {
    var initProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Object.keys(attributes).reduce(function (obj, key) {
        obj[REACT_TAG_MAP[key] || key] = attributes[key];
        return obj;
    }, initProps);
};

var convertReactPropstoHtmlAttributes = function convertReactPropstoHtmlAttributes(props) {
    var initAttributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Object.keys(props).reduce(function (obj, key) {
        obj[HTML_TAG_MAP[key] || key] = props[key];
        return obj;
    }, initAttributes);
};

var generateTitleAsReactComponent = function generateTitleAsReactComponent(type, title, attributes) {
    var _initProps;

    // assigning into an array to define toString function on it
    var initProps = (_initProps = {
        key: title
    }, _initProps[HELMET_ATTRIBUTE] = true, _initProps);
    var props = convertElementAttributestoReactProps(attributes, initProps);

    return [react__WEBPACK_IMPORTED_MODULE_3___default().createElement(TAG_NAMES.TITLE, props, title)];
};

var generateTagsAsReactComponent = function generateTagsAsReactComponent(type, tags) {
    return tags.map(function (tag, i) {
        var _mappedTag;

        var mappedTag = (_mappedTag = {
            key: i
        }, _mappedTag[HELMET_ATTRIBUTE] = true, _mappedTag);

        Object.keys(tag).forEach(function (attribute) {
            var mappedAttribute = REACT_TAG_MAP[attribute] || attribute;

            if (mappedAttribute === TAG_PROPERTIES.INNER_HTML || mappedAttribute === TAG_PROPERTIES.CSS_TEXT) {
                var content = tag.innerHTML || tag.cssText;
                mappedTag.dangerouslySetInnerHTML = { __html: content };
            } else {
                mappedTag[mappedAttribute] = tag[attribute];
            }
        });

        return react__WEBPACK_IMPORTED_MODULE_3___default().createElement(type, mappedTag);
    });
};

var getMethodsForTag = function getMethodsForTag(type, tags, encode) {
    switch (type) {
        case TAG_NAMES.TITLE:
            return {
                toComponent: function toComponent() {
                    return generateTitleAsReactComponent(type, tags.title, tags.titleAttributes, encode);
                },
                toString: function toString() {
                    return generateTitleAsString(type, tags.title, tags.titleAttributes, encode);
                }
            };
        case ATTRIBUTE_NAMES.BODY:
        case ATTRIBUTE_NAMES.HTML:
            return {
                toComponent: function toComponent() {
                    return convertElementAttributestoReactProps(tags);
                },
                toString: function toString() {
                    return generateElementAttributesAsString(tags);
                }
            };
        default:
            return {
                toComponent: function toComponent() {
                    return generateTagsAsReactComponent(type, tags);
                },
                toString: function toString() {
                    return generateTagsAsString(type, tags, encode);
                }
            };
    }
};

var mapStateOnServer = function mapStateOnServer(_ref) {
    var baseTag = _ref.baseTag,
        bodyAttributes = _ref.bodyAttributes,
        encode = _ref.encode,
        htmlAttributes = _ref.htmlAttributes,
        linkTags = _ref.linkTags,
        metaTags = _ref.metaTags,
        noscriptTags = _ref.noscriptTags,
        scriptTags = _ref.scriptTags,
        styleTags = _ref.styleTags,
        _ref$title = _ref.title,
        title = _ref$title === undefined ? "" : _ref$title,
        titleAttributes = _ref.titleAttributes;
    return {
        base: getMethodsForTag(TAG_NAMES.BASE, baseTag, encode),
        bodyAttributes: getMethodsForTag(ATTRIBUTE_NAMES.BODY, bodyAttributes, encode),
        htmlAttributes: getMethodsForTag(ATTRIBUTE_NAMES.HTML, htmlAttributes, encode),
        link: getMethodsForTag(TAG_NAMES.LINK, linkTags, encode),
        meta: getMethodsForTag(TAG_NAMES.META, metaTags, encode),
        noscript: getMethodsForTag(TAG_NAMES.NOSCRIPT, noscriptTags, encode),
        script: getMethodsForTag(TAG_NAMES.SCRIPT, scriptTags, encode),
        style: getMethodsForTag(TAG_NAMES.STYLE, styleTags, encode),
        title: getMethodsForTag(TAG_NAMES.TITLE, { title: title, titleAttributes: titleAttributes }, encode)
    };
};

var Helmet = function Helmet(Component) {
    var _class, _temp;

    return _temp = _class = function (_React$Component) {
        inherits(HelmetWrapper, _React$Component);

        function HelmetWrapper() {
            classCallCheck(this, HelmetWrapper);
            return possibleConstructorReturn(this, _React$Component.apply(this, arguments));
        }

        HelmetWrapper.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return !react_fast_compare__WEBPACK_IMPORTED_MODULE_2___default()(this.props, nextProps);
        };

        HelmetWrapper.prototype.mapNestedChildrenToProps = function mapNestedChildrenToProps(child, nestedChildren) {
            if (!nestedChildren) {
                return null;
            }

            switch (child.type) {
                case TAG_NAMES.SCRIPT:
                case TAG_NAMES.NOSCRIPT:
                    return {
                        innerHTML: nestedChildren
                    };

                case TAG_NAMES.STYLE:
                    return {
                        cssText: nestedChildren
                    };
            }

            throw new Error("<" + child.type + " /> elements are self-closing and can not contain children. Refer to our API for more information.");
        };

        HelmetWrapper.prototype.flattenArrayTypeChildren = function flattenArrayTypeChildren(_ref) {
            var _babelHelpers$extends;

            var child = _ref.child,
                arrayTypeChildren = _ref.arrayTypeChildren,
                newChildProps = _ref.newChildProps,
                nestedChildren = _ref.nestedChildren;

            return _extends({}, arrayTypeChildren, (_babelHelpers$extends = {}, _babelHelpers$extends[child.type] = [].concat(arrayTypeChildren[child.type] || [], [_extends({}, newChildProps, this.mapNestedChildrenToProps(child, nestedChildren))]), _babelHelpers$extends));
        };

        HelmetWrapper.prototype.mapObjectTypeChildren = function mapObjectTypeChildren(_ref2) {
            var _babelHelpers$extends2, _babelHelpers$extends3;

            var child = _ref2.child,
                newProps = _ref2.newProps,
                newChildProps = _ref2.newChildProps,
                nestedChildren = _ref2.nestedChildren;

            switch (child.type) {
                case TAG_NAMES.TITLE:
                    return _extends({}, newProps, (_babelHelpers$extends2 = {}, _babelHelpers$extends2[child.type] = nestedChildren, _babelHelpers$extends2.titleAttributes = _extends({}, newChildProps), _babelHelpers$extends2));

                case TAG_NAMES.BODY:
                    return _extends({}, newProps, {
                        bodyAttributes: _extends({}, newChildProps)
                    });

                case TAG_NAMES.HTML:
                    return _extends({}, newProps, {
                        htmlAttributes: _extends({}, newChildProps)
                    });
            }

            return _extends({}, newProps, (_babelHelpers$extends3 = {}, _babelHelpers$extends3[child.type] = _extends({}, newChildProps), _babelHelpers$extends3));
        };

        HelmetWrapper.prototype.mapArrayTypeChildrenToProps = function mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
            var newFlattenedProps = _extends({}, newProps);

            Object.keys(arrayTypeChildren).forEach(function (arrayChildName) {
                var _babelHelpers$extends4;

                newFlattenedProps = _extends({}, newFlattenedProps, (_babelHelpers$extends4 = {}, _babelHelpers$extends4[arrayChildName] = arrayTypeChildren[arrayChildName], _babelHelpers$extends4));
            });

            return newFlattenedProps;
        };

        HelmetWrapper.prototype.warnOnInvalidChildren = function warnOnInvalidChildren(child, nestedChildren) {
            if (false) {}

            return true;
        };

        HelmetWrapper.prototype.mapChildrenToProps = function mapChildrenToProps(children, newProps) {
            var _this2 = this;

            var arrayTypeChildren = {};

            react__WEBPACK_IMPORTED_MODULE_3___default().Children.forEach(children, function (child) {
                if (!child || !child.props) {
                    return;
                }

                var _child$props = child.props,
                    nestedChildren = _child$props.children,
                    childProps = objectWithoutProperties(_child$props, ["children"]);

                var newChildProps = convertReactPropstoHtmlAttributes(childProps);

                _this2.warnOnInvalidChildren(child, nestedChildren);

                switch (child.type) {
                    case TAG_NAMES.LINK:
                    case TAG_NAMES.META:
                    case TAG_NAMES.NOSCRIPT:
                    case TAG_NAMES.SCRIPT:
                    case TAG_NAMES.STYLE:
                        arrayTypeChildren = _this2.flattenArrayTypeChildren({
                            child: child,
                            arrayTypeChildren: arrayTypeChildren,
                            newChildProps: newChildProps,
                            nestedChildren: nestedChildren
                        });
                        break;

                    default:
                        newProps = _this2.mapObjectTypeChildren({
                            child: child,
                            newProps: newProps,
                            newChildProps: newChildProps,
                            nestedChildren: nestedChildren
                        });
                        break;
                }
            });

            newProps = this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
            return newProps;
        };

        HelmetWrapper.prototype.render = function render() {
            var _props = this.props,
                children = _props.children,
                props = objectWithoutProperties(_props, ["children"]);

            var newProps = _extends({}, props);

            if (children) {
                newProps = this.mapChildrenToProps(children, newProps);
            }

            return react__WEBPACK_IMPORTED_MODULE_3___default().createElement(Component, newProps);
        };

        createClass(HelmetWrapper, null, [{
            key: "canUseDOM",


            // Component.peek comes from react-side-effect:
            // For testing, you may use a static peek() method available on the returned component.
            // It lets you get the current state without resetting the mounted instance stack.
            // Don’t use it for anything other than testing.

            /**
             * @param {Object} base: {"target": "_blank", "href": "http://mysite.com/"}
             * @param {Object} bodyAttributes: {"className": "root"}
             * @param {String} defaultTitle: "Default Title"
             * @param {Boolean} defer: true
             * @param {Boolean} encodeSpecialCharacters: true
             * @param {Object} htmlAttributes: {"lang": "en", "amp": undefined}
             * @param {Array} link: [{"rel": "canonical", "href": "http://mysite.com/example"}]
             * @param {Array} meta: [{"name": "description", "content": "Test description"}]
             * @param {Array} noscript: [{"innerHTML": "<img src='http://mysite.com/js/test.js'"}]
             * @param {Function} onChangeClientState: "(newState) => console.log(newState)"
             * @param {Array} script: [{"type": "text/javascript", "src": "http://mysite.com/js/test.js"}]
             * @param {Array} style: [{"type": "text/css", "cssText": "div { display: block; color: blue; }"}]
             * @param {String} title: "Title"
             * @param {Object} titleAttributes: {"itemprop": "name"}
             * @param {String} titleTemplate: "MySite.com - %s"
             */
            set: function set$$1(canUseDOM) {
                Component.canUseDOM = canUseDOM;
            }
        }]);
        return HelmetWrapper;
    }((react__WEBPACK_IMPORTED_MODULE_3___default().Component)), _class.propTypes = {
        base: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().object),
        bodyAttributes: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().object),
        children: prop_types__WEBPACK_IMPORTED_MODULE_0___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_0___default().node)), (prop_types__WEBPACK_IMPORTED_MODULE_0___default().node)]),
        defaultTitle: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
        defer: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().bool),
        encodeSpecialCharacters: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().bool),
        htmlAttributes: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().object),
        link: prop_types__WEBPACK_IMPORTED_MODULE_0___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_0___default().object)),
        meta: prop_types__WEBPACK_IMPORTED_MODULE_0___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_0___default().object)),
        noscript: prop_types__WEBPACK_IMPORTED_MODULE_0___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_0___default().object)),
        onChangeClientState: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().func),
        script: prop_types__WEBPACK_IMPORTED_MODULE_0___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_0___default().object)),
        style: prop_types__WEBPACK_IMPORTED_MODULE_0___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_0___default().object)),
        title: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
        titleAttributes: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().object),
        titleTemplate: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string)
    }, _class.defaultProps = {
        defer: true,
        encodeSpecialCharacters: true
    }, _class.peek = Component.peek, _class.rewind = function () {
        var mappedState = Component.rewind();
        if (!mappedState) {
            // provide fallback if mappedState is undefined
            mappedState = mapStateOnServer({
                baseTag: [],
                bodyAttributes: {},
                encodeSpecialCharacters: true,
                htmlAttributes: {},
                linkTags: [],
                metaTags: [],
                noscriptTags: [],
                scriptTags: [],
                styleTags: [],
                title: "",
                titleAttributes: {}
            });
        }

        return mappedState;
    }, _temp;
};

var NullComponent = function NullComponent() {
    return null;
};

var HelmetSideEffects = react_side_effect__WEBPACK_IMPORTED_MODULE_1___default()(reducePropsToState, handleClientStateChange, mapStateOnServer)(NullComponent);

var HelmetExport = Helmet(HelmetSideEffects);
HelmetExport.renderStatic = HelmetExport.rewind;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HelmetExport);



/***/ }),

/***/ 3524:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = __webpack_require__(2504);
var React__default = _interopDefault(React);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
function withSideEffect(reducePropsToState, handleStateChangeOnClient, mapStateOnServer) {
  if (typeof reducePropsToState !== 'function') {
    throw new Error('Expected reducePropsToState to be a function.');
  }

  if (typeof handleStateChangeOnClient !== 'function') {
    throw new Error('Expected handleStateChangeOnClient to be a function.');
  }

  if (typeof mapStateOnServer !== 'undefined' && typeof mapStateOnServer !== 'function') {
    throw new Error('Expected mapStateOnServer to either be undefined or a function.');
  }

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }

  return function wrap(WrappedComponent) {
    if (typeof WrappedComponent !== 'function') {
      throw new Error('Expected WrappedComponent to be a React component.');
    }

    var mountedInstances = [];
    var state;

    function emitChange() {
      state = reducePropsToState(mountedInstances.map(function (instance) {
        return instance.props;
      }));

      if (SideEffect.canUseDOM) {
        handleStateChangeOnClient(state);
      } else if (mapStateOnServer) {
        state = mapStateOnServer(state);
      }
    }

    var SideEffect = /*#__PURE__*/function (_PureComponent) {
      _inheritsLoose(SideEffect, _PureComponent);

      function SideEffect() {
        return _PureComponent.apply(this, arguments) || this;
      }

      // Try to use displayName of wrapped component
      // Expose canUseDOM so tests can monkeypatch it
      SideEffect.peek = function peek() {
        return state;
      };

      SideEffect.rewind = function rewind() {
        if (SideEffect.canUseDOM) {
          throw new Error('You may only call rewind() on the server. Call peek() to read the current state.');
        }

        var recordedState = state;
        state = undefined;
        mountedInstances = [];
        return recordedState;
      };

      var _proto = SideEffect.prototype;

      _proto.UNSAFE_componentWillMount = function UNSAFE_componentWillMount() {
        mountedInstances.push(this);
        emitChange();
      };

      _proto.componentDidUpdate = function componentDidUpdate() {
        emitChange();
      };

      _proto.componentWillUnmount = function componentWillUnmount() {
        var index = mountedInstances.indexOf(this);
        mountedInstances.splice(index, 1);
        emitChange();
      };

      _proto.render = function render() {
        return /*#__PURE__*/React__default.createElement(WrappedComponent, this.props);
      };

      return SideEffect;
    }(React.PureComponent);

    _defineProperty(SideEffect, "displayName", "SideEffect(" + getDisplayName(WrappedComponent) + ")");

    _defineProperty(SideEffect, "canUseDOM", canUseDOM);

    return SideEffect;
  };
}

module.exports = withSideEffect;


/***/ }),

/***/ 2130:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const os = __webpack_require__(9719);
const tty = __webpack_require__(4786);
const hasFlag = __webpack_require__(6560);

const {env} = process;

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false') ||
	hasFlag('color=never')) {
	forceColor = 0;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = 1;
}

if ('FORCE_COLOR' in env) {
	if (env.FORCE_COLOR === 'true') {
		forceColor = 1;
	} else if (env.FORCE_COLOR === 'false') {
		forceColor = 0;
	} else {
		forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
	}
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(haveStream, streamIsTTY) {
	if (forceColor === 0) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (haveStream && !streamIsTTY && forceColor === undefined) {
		return 0;
	}

	const min = forceColor || 0;

	if (env.TERM === 'dumb') {
		return min;
	}

	if (process.platform === 'win32') {
		// Windows 10 build 10586 is the first Windows release that supports 256 colors.
		// Windows 10 build 14931 is the first release that supports 16m/TrueColor.
		const osRelease = os.release().split('.');
		if (
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI', 'GITHUB_ACTIONS', 'BUILDKITE'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream, stream && stream.isTTY);
	return translateLevel(level);
}

module.exports = {
	supportsColor: getSupportLevel,
	stdout: translateLevel(supportsColor(true, tty.isatty(1))),
	stderr: translateLevel(supportsColor(true, tty.isatty(2)))
};


/***/ }),

/***/ 5167:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var React = __webpack_require__(2504);

function NoteWithRighe (props) {
    return React.createElement("svg",props,[React.createElement("path",{"d":"M92.7009 106.399C91.8542 105.019 91.325 104.147 91.325 104.147C87.6208 96.8116 83.7048 89.4045 79.683 82.0689C81.3764 81.851 83.599 81.6331 85.9274 81.6331C87.0916 81.6331 88.3616 81.7058 89.5258 81.851C90.69 81.9963 91.9601 82.2868 93.1243 82.5773C97.7811 83.8846 101.591 86.6446 102.226 91.9465C102.438 93.2538 102.438 95.7948 101.274 98.5547C100.639 99.9347 99.7919 101.387 98.4161 102.695C97.7811 103.348 96.9344 104.002 95.9818 104.656C95.0293 105.237 93.9709 105.818 92.7009 106.399ZM89.7375 107.561C87.3033 108.36 84.5515 108.941 81.0589 109.376C78.7305 109.74 75.5554 109.885 72.0628 109.74C70.2636 109.667 68.4644 109.522 66.5593 109.231C64.6543 109.013 62.6434 108.65 60.7383 108.214C53.0123 106.399 45.9212 102.549 43.8045 95.2864C42.852 91.9465 43.5928 87.8066 46.0271 83.3036C47.1913 81.0521 48.8847 78.728 50.8956 76.4038C52.9064 74.0797 55.4465 71.6829 58.4099 69.4314C60.2092 67.9789 62.7492 66.1631 65.501 64.1295C66.4535 65.7274 68.9936 70.0851 71.957 75.1691C63.0667 78.2196 56.0815 85.9909 57.7749 92.237C58.7274 95.8675 61.2675 98.5547 64.5484 100.443C67.9352 102.331 72.2745 103.276 77.143 103.421C77.143 103.421 76.8255 103.276 76.1904 102.912C75.5554 102.549 74.8146 102.114 73.862 101.46C72.0628 100.225 69.8403 98.4821 68.2527 96.5211C65.1835 92.5275 64.7601 87.3708 76.4021 83.0131C81.0589 91.2202 85.504 99.4263 89.7375 107.633V107.561ZM56.8224 35.9504C56.5049 31.8832 58.3041 28.4696 61.2675 26.0728C64.1251 23.6761 67.8294 22.2961 70.5811 22.1509C72.592 22.0782 74.1795 22.514 75.4496 23.1677C76.7196 23.894 77.5663 24.9108 78.2013 26.0002C79.4714 28.1791 79.683 30.6485 79.8947 31.8832C80.2122 34.4978 79.4714 36.6041 78.3072 38.565C77.0371 40.526 75.2379 42.1239 73.227 43.6491C69.2052 46.6269 64.2309 48.7331 61.6909 50.9846C59.1508 45.9732 57.2457 40.5987 56.8224 35.8778V35.9504ZM109.741 90.7844C109.529 87.6614 108.788 84.9741 107.412 82.65C106.142 80.3258 104.131 78.3648 101.591 76.9849C96.4052 74.1523 88.2558 72.9176 76.8255 74.1523C76.2963 74.225 75.7671 74.2976 75.2379 74.3702C72.9095 70.303 70.4753 66.1631 68.041 62.0959C72.8037 58.6097 77.9897 54.3982 81.9056 49.3868C85.9274 44.5206 88.6791 38.7829 87.8324 32.1737C87.4091 28.1791 84.6573 22.8045 80.6356 18.5204C78.6247 16.3415 76.2963 14.5258 73.7562 13.2185C71.322 11.9111 68.6761 11.2575 66.136 11.4754L64.5484 11.8385C64.5484 11.8385 59.7858 13.9448 55.5523 17.7215C51.6364 21.5698 48.3555 27.1623 50.0489 34.1347C52.0598 42.2691 55.8699 51.0573 57.8807 53.5267C55.6582 55.2698 52.5889 57.375 49.5197 59.8444C46.5563 62.3138 43.3812 65.219 40.7353 68.5599C35.4434 75.1692 32.0567 83.5941 34.9143 94.0527C36.1843 98.7 39.9944 102.404 44.4395 105.091C48.7788 107.779 53.7531 109.594 57.5632 110.466C59.4683 110.902 61.3733 111.265 63.3842 111.628C65.3951 111.919 67.406 112.209 69.3111 112.427C73.227 112.863 77.3546 112.863 81.7998 112.209C84.234 111.919 87.4091 111.047 90.9017 109.667C93.7593 114.678 96.2993 119.327 96.2993 119.327C97.0402 120.997 98.8394 125.573 98.4161 130.003C98.2044 132.182 97.4635 134.36 95.876 136.103C95.0293 136.975 94.0768 137.773 92.7009 138.355C92.0659 138.645 91.325 138.936 90.5842 139.153C89.7375 139.371 88.6791 139.662 87.6208 139.807C82.2231 140.679 76.9313 142.059 75.7671 137.773C79.048 137.556 85.8215 134.069 84.7632 129.495C83.8107 125.5 81.1647 122.886 72.4862 124.193C71.1103 124.411 69.6286 124.919 68.3586 125.718C67.0885 126.444 66.0301 127.461 65.0776 128.478C63.2784 130.584 62.4317 132.981 62.9609 134.796C63.4901 136.757 65.6068 139.299 69.5228 141.042C71.4278 141.913 73.862 142.567 76.7196 142.858C79.3655 143.221 82.3289 143.221 85.8215 142.64C86.7741 142.494 87.8324 142.276 88.8908 141.986C89.42 141.841 89.9492 141.695 90.4783 141.478C91.0075 141.332 91.4309 141.187 91.8542 140.969C93.7593 140.243 95.5585 139.226 97.0402 137.846C98.5219 136.466 99.8978 134.796 100.639 132.763C101.379 130.729 101.591 128.333 101.168 125.5C100.109 121.07 96.1935 113.153 93.4418 108.432C97.4635 106.544 101.485 104.292 104.555 101.242C105.295 100.516 106.036 99.7168 106.671 98.9179C107.306 98.119 107.836 97.32 108.259 96.4485C109.106 94.7064 109.529 92.8907 109.423 90.857L109.741 90.7844Z","fill":"#25B8C9","key":0}),React.createElement("path",{"d":"M401.528 68.1969L389.886 63.9844C387.981 63.2581 386.076 62.5319 384.065 61.8782L377.927 59.9172L365.544 56.0689L362.475 55.1247L359.3 54.2531L352.844 52.5827C335.91 48.2249 318.977 44.8113 302.044 42.0514C268.07 36.5316 234.414 33.5538 201.605 31.6655C193.456 31.1571 185.306 30.7939 177.157 30.4308C169.007 30.0676 161.175 29.7771 152.816 29.5592L140.433 29.1961L137.364 29.1234H134.083L127.627 29.0508C123.288 29.0508 119.054 28.9782 114.503 29.0508L100.85 29.414C96.2993 29.4866 91.6425 29.7771 86.9857 30.0676C82.3289 30.3581 77.6721 30.576 73.227 31.0118L59.6799 32.2465L47.0854 33.6264L40.841 34.3527L34.9142 35.079L23.0605 36.5316L0.305728 39.2915L0.0940552 38.6379L22.8489 35.878L34.7025 34.498L40.6294 33.7717L46.8737 33.0454L59.5741 31.6655L73.1211 30.4308C77.5663 29.995 82.3289 29.7771 86.9857 29.4866C91.6425 29.1961 96.2993 28.9056 100.85 28.8329L114.503 28.4698C118.948 28.3972 123.288 28.4698 127.627 28.4698L134.189 28.5424H137.47L140.539 28.615L152.922 28.9782C161.281 29.1961 169.219 29.4866 177.263 29.8497C185.306 30.2129 193.456 30.576 201.711 31.0844C234.52 32.9728 268.282 35.9506 302.255 41.543C319.295 44.3029 336.227 47.7891 353.161 52.1469L359.617 53.8174L362.792 54.6889L365.861 55.6331L378.244 59.4814L384.383 61.4424C386.394 62.0961 388.299 62.8224 390.204 63.5487L401.846 67.7612L401.528 68.1969Z","fill":"#25B8C9","key":1}),React.createElement("path",{"d":"M392.109 81.4156L380.996 77.5662C379.091 76.9126 377.292 76.2589 375.387 75.6779L369.566 73.9348L357.924 70.4486L354.96 69.577L351.997 68.8507L345.964 67.3255C329.984 63.4762 313.897 60.4258 297.704 58.029C265.318 53.2365 232.827 50.8397 200.864 49.4598C192.821 49.0966 184.883 48.8787 176.945 48.6608C169.007 48.443 161.175 48.2251 153.133 48.1524L141.068 48.0072L138.105 47.9345H135.035L128.791 48.0072C124.663 48.0798 120.536 48.0798 116.408 48.1524L103.708 48.6608C99.4743 48.7335 95.135 49.0966 90.9016 49.4598C86.6681 49.7503 82.223 50.0408 78.0954 50.4766L65.5009 51.7839L53.4355 53.3091L47.4029 54.0354L41.5819 54.8343L29.9399 56.4322L7.2909 59.5542L7.07922 58.9005L29.7282 55.7785L41.3702 54.1807L47.1912 53.3817L53.2239 52.6554L65.2892 51.1302L77.8837 49.8229C82.0113 49.3145 86.4565 49.0966 90.6899 48.8061C95.0292 48.5156 99.2627 48.1524 103.496 48.0798L116.302 47.5714C120.536 47.4988 124.558 47.4988 128.791 47.4261L135.035 47.3535H138.105L141.174 47.4261L153.239 47.5714C161.387 47.644 169.113 47.8619 177.051 48.0798C184.989 48.2977 192.926 48.5882 200.97 48.8787C232.932 50.2587 265.53 52.6554 297.916 57.5206C314.109 59.9173 330.3 62.9678 346.282 66.8897L352.314 68.415L355.278 69.1413L358.241 70.0128L369.883 73.499L375.704 75.2421C377.609 75.8231 379.408 76.5494 381.314 77.1305L392.426 80.9798L392.109 81.4156Z","fill":"#25B8C9","key":2}),React.createElement("path",{"d":"M382.69 94.6339L372 91.1477C370.201 90.5667 368.507 89.9857 366.708 89.4046L361.205 87.8794L350.198 84.829L347.446 84.0301L344.588 83.3764L338.979 82.0691C323.952 78.7281 308.606 76.0409 293.259 74.0072C262.355 69.8674 231.133 68.0517 199.912 67.2527C184.354 66.8896 168.796 66.6717 153.239 66.7443C145.407 66.7443 137.681 66.7443 129.744 66.9622C125.828 67.1075 121.912 67.1075 117.996 67.2527L106.142 67.9064C90.3725 68.9232 74.6029 70.5937 59.3625 72.9178C44.0162 75.0967 28.9874 77.5661 13.9587 79.8902L13.747 79.2366C28.7758 76.9124 43.8045 74.5157 59.1508 72.3368C74.3912 70.0126 90.2667 68.3422 106.036 67.3254L117.89 66.7443C121.806 66.5991 125.722 66.5264 129.744 66.4538C137.576 66.2359 145.407 66.2359 153.239 66.2359C168.902 66.1633 184.354 66.3812 199.912 66.817C231.028 67.6159 262.461 69.5042 293.365 73.6441C308.817 75.6777 324.164 78.365 339.191 81.7786L344.8 83.0859L347.658 83.7396L350.409 84.5385L361.416 87.5889L366.92 89.1141C368.719 89.6225 370.518 90.2762 372.318 90.8572L383.007 94.3434L382.69 94.7792V94.6339Z","fill":"#25B8C9","key":3}),React.createElement("path",{"d":"M373.27 107.851L363.11 104.728C361.416 104.22 359.723 103.639 358.03 103.203L352.844 101.896L342.578 99.2085L340.037 98.5548L337.392 97.9738L332.207 96.8843C318.131 93.9802 303.631 91.7287 289.026 90.0582C259.709 86.6446 229.546 85.4099 199.277 85.1194C191.656 85.0468 184.036 85.0468 176.416 85.1194C168.796 85.1921 161.071 85.192 153.557 85.4099L142.232 85.6278L139.375 85.7005L136.623 85.8457L131.014 86.0636C127.309 86.2089 123.605 86.3541 119.901 86.572L109 87.3709C105.295 87.5888 101.803 88.0246 98.2044 88.3877C94.6059 88.7509 91.0075 89.0414 87.4091 89.6224L76.6138 91.075L65.7126 92.8181L60.2091 93.6897L54.5998 94.6338L43.487 96.5212L20.9439 100.443L20.7322 99.7895L43.2753 95.8675L54.3881 93.9802L59.9975 93.036L65.5009 92.1644L76.5079 90.4213L87.3032 88.9688C90.9017 88.4604 94.5001 88.1698 98.0985 87.7341C101.697 87.3709 105.295 86.9352 109 86.7173L119.901 85.991C123.605 85.7731 127.309 85.7004 131.014 85.4826L136.623 85.2647L139.375 85.1194L142.232 85.0468L153.557 84.8289C161.071 84.6836 168.796 84.611 176.416 84.5384C184.036 84.4658 191.656 84.5384 199.277 84.611C229.652 84.9015 259.709 86.2089 289.132 89.6224C303.843 91.2929 318.342 93.5444 332.419 96.4486L337.709 97.538L340.355 98.119L342.895 98.7727L353.161 101.46L358.347 102.767C360.04 103.203 361.734 103.784 363.427 104.293L373.588 107.416L373.27 107.851Z","fill":"#25B8C9","key":4}),React.createElement("path",{"d":"M363.851 121.07L354.114 118.31C352.526 117.874 350.938 117.366 349.245 116.93L344.377 115.768L334.745 113.517L332.311 112.936L329.878 112.5L325.01 111.556C311.886 109.159 298.233 107.27 284.369 105.963C256.534 103.276 227.641 102.622 198.218 102.84C190.81 102.913 183.401 103.058 175.887 103.203C168.478 103.348 160.753 103.566 153.557 103.857L142.55 104.293L139.798 104.365L137.152 104.511L131.86 104.801C128.368 105.019 124.769 105.164 121.382 105.455L111.328 106.399C107.941 106.617 104.766 107.125 101.485 107.488C98.2042 107.924 95.0291 108.215 91.7482 108.796L81.9054 110.321L71.5335 112.209L66.3475 113.153L60.844 114.17L49.9429 116.204L27.5056 120.489L27.2939 119.835L49.7312 115.55L60.6323 113.517L66.1358 112.5L71.3218 111.556L81.6938 109.74L91.6424 108.215C95.0291 107.634 98.2042 107.343 101.485 106.907C104.766 106.544 107.941 106.036 111.328 105.818L121.382 104.946C124.769 104.656 128.368 104.511 131.86 104.293L137.152 104.002L139.798 103.857L142.55 103.784L153.557 103.348C160.859 103.058 168.478 102.84 175.887 102.695C183.401 102.55 190.81 102.404 198.218 102.332C227.746 102.114 256.64 102.767 284.475 105.527C298.339 106.835 312.098 108.723 325.222 111.12L330.09 112.064L332.524 112.5L334.957 113.081L344.588 115.405L349.457 116.567C351.044 117.003 352.632 117.511 354.325 117.947L364.062 120.707L363.745 121.143L363.851 121.07Z","fill":"#25B8C9","key":5}),React.createElement("path",{"d":"M-0.0133057 38.5654L4.74933 37.9844L32.4784 119.763L27.8216 120.634L-0.0133057 38.5654Z","fill":"#25B8C9","key":6}),React.createElement("path",{"d":"M708.557 205.681C701.889 204.156 695.433 202.413 689.188 200.525L684.638 199.072C683.156 198.564 681.568 198.128 679.981 197.547L670.561 194.206C657.862 189.558 645.48 184.401 633.097 178.881C608.331 167.842 584.095 155.568 559.223 142.858C546.734 136.539 534.14 130.149 521.016 123.758L511.279 119.037L502.177 114.534L483.657 105.31L464.501 95.868C461.326 94.2711 457.939 92.6733 454.658 91.1481L444.604 86.3545C441.217 84.7567 437.619 83.2315 434.232 81.6336C430.739 80.1084 427.352 78.5106 423.648 76.9854L412.641 72.4824C408.937 70.9572 405.338 69.4319 401.423 68.052L401.74 67.6162C405.656 68.9962 409.254 70.5214 412.959 72.0466L423.966 76.5496C427.564 78.0748 430.951 79.6727 434.549 81.1979C438.042 82.7957 441.534 84.3209 444.921 85.9188L454.976 90.7123C458.257 92.3101 461.643 93.908 464.818 95.5048L483.975 104.947L502.495 114.17L511.597 118.674L521.334 123.394C534.351 129.713 547.052 136.176 559.435 142.495C584.306 155.132 608.543 167.479 633.308 178.518C645.691 184.038 658.074 189.194 670.773 193.843L680.192 197.184C681.78 197.765 683.262 198.2 684.849 198.709L689.4 200.161C695.644 202.05 702.1 203.793 708.768 205.318L708.662 205.609L708.557 205.681Z","fill":"#25B8C9","key":7}),React.createElement("path",{"d":"M705.276 213.887C698.29 212.435 691.411 210.692 684.743 208.877L679.769 207.424C678.076 206.916 676.488 206.48 674.795 205.899L664.848 202.631C651.618 198.128 638.6 192.971 625.794 187.596C600.076 176.847 575.204 164.792 549.909 152.59C537.209 146.489 524.509 140.316 511.385 134.288L501.649 129.786L492.23 125.355L473.285 116.422C447.779 104.365 421.531 91.8742 392.109 81.343L392.426 80.9072C421.849 91.4385 448.202 104.002 473.603 116.059L492.548 124.992L501.967 129.422L511.703 133.925C524.72 139.953 537.527 146.126 550.227 152.227C575.522 164.429 600.499 176.484 626.112 187.306C638.918 192.68 651.936 197.765 665.165 202.34L675.112 205.608C676.806 206.19 678.393 206.625 680.087 207.134L685.061 208.586C691.729 210.401 698.608 212.071 705.593 213.597L705.487 213.887H705.276Z","fill":"#25B8C9","key":8}),React.createElement("path",{"d":"M701.995 222.095C694.692 220.642 687.389 219.044 680.298 217.229L675.006 215.776C673.207 215.268 671.515 214.832 669.716 214.323C666.223 213.234 662.731 212.217 659.238 211.128C645.374 206.698 631.827 201.687 618.597 196.385C592.032 185.854 566.314 174.088 540.596 162.323C527.684 156.44 514.877 150.557 501.755 144.819L491.912 140.534L482.175 136.249C475.719 133.416 469.263 130.512 462.807 127.607C436.983 115.986 410.842 104.221 382.583 94.6345L382.901 94.1987C411.159 103.785 437.301 115.623 463.125 127.171C469.581 130.077 476.037 132.982 482.493 135.813L492.23 140.098L502.073 144.383C515.195 150.121 528.001 156.077 540.913 161.96C566.631 173.725 592.244 185.491 618.809 196.094C632.144 201.396 645.585 206.408 659.45 210.837C662.942 211.927 666.435 213.016 669.928 214.033C671.621 214.614 673.42 215.05 675.219 215.485L680.51 216.938C687.601 218.754 694.904 220.352 702.206 221.804L702.1 222.095H701.995Z","fill":"#25B8C9","key":9}),React.createElement("path",{"d":"M698.714 230.301C690.988 228.921 683.367 227.396 675.853 225.581L670.245 224.201C668.34 223.765 666.435 223.256 664.636 222.748C661.037 221.659 657.333 220.642 653.629 219.552C639.129 215.195 625.159 210.328 611.4 205.173C583.883 194.859 557.53 183.384 531.388 172.054C518.264 166.39 505.352 160.725 492.23 155.278L482.387 151.21L472.439 146.998C465.771 144.238 459.209 141.405 452.647 138.573C426.4 127.389 400.47 116.349 373.482 107.779L373.799 107.343C400.893 115.914 426.823 127.026 453.071 138.21C459.632 141.042 466.194 143.802 472.862 146.635L482.811 150.847L492.653 154.914C505.776 160.362 518.793 166.027 531.811 171.691C557.953 183.021 584.2 194.496 611.718 204.81C625.476 209.965 639.447 214.904 653.946 219.262C657.545 220.351 661.249 221.368 664.848 222.457C666.647 223.038 668.552 223.474 670.455 223.91L676.065 225.29C683.579 227.106 691.199 228.631 698.925 230.011L698.82 230.301H698.714Z","fill":"#25B8C9","key":10}),React.createElement("path",{"d":"M695.433 238.581C687.389 237.274 679.346 235.749 671.409 234.006L665.377 232.626C663.366 232.19 661.355 231.681 659.45 231.173C655.64 230.156 651.83 229.139 648.02 228.05C632.991 223.765 618.385 218.971 604.097 213.96C575.627 203.865 548.639 192.681 522.074 181.786C508.845 176.339 495.723 170.964 482.599 165.809L472.65 161.959L462.384 157.892L442.169 149.758C415.499 139.009 389.78 128.696 363.956 121.143L364.274 120.707C390.204 128.333 415.922 138.645 442.593 149.395L462.807 157.529L473.074 161.596L483.022 165.446C496.146 170.602 509.268 175.976 522.498 181.423C549.063 192.317 576.051 203.502 604.521 213.597C618.703 218.608 633.308 223.474 648.337 227.687C652.147 228.776 655.957 229.793 659.767 230.81C661.672 231.318 663.683 231.827 665.694 232.262L671.727 233.642C679.769 235.385 687.707 236.911 695.75 238.218L695.644 238.509L695.433 238.581Z","fill":"#25B8C9","key":11}),React.createElement("path",{"d":"M401.846 67.834L402.481 68.0519L364.38 121.215L363.85 121.07L401.846 67.834Z","fill":"#25B8C9","key":12}),React.createElement("path",{"d":"M1033.89 167.915C1014.63 183.674 991.244 196.675 965.314 205.826C939.384 214.977 910.914 220.424 882.55 222.022C879.057 222.24 875.459 222.312 871.966 222.385C870.273 222.385 868.474 222.385 866.78 222.385C865.934 222.385 865.087 222.385 864.24 222.312C863.499 222.312 862.547 222.239 862.018 222.239L850.481 221.731L839.051 221.223C823.918 220.496 808.783 219.552 793.966 218.245C764.332 215.703 735.227 211.926 708.556 205.681L708.662 205.391C735.333 211.636 764.332 215.412 794.072 218.027C808.889 219.334 824.024 220.279 839.157 221.005L850.587 221.513L862.123 222.022C862.653 222.094 863.605 222.094 864.346 222.094C865.193 222.094 866.039 222.094 866.78 222.167C868.474 222.167 870.167 222.167 871.966 222.167C875.459 222.094 878.951 222.022 882.444 221.804C910.808 220.206 939.278 214.831 965.208 205.681C991.138 196.602 1014.53 183.602 1033.79 167.842L1033.89 167.915Z","fill":"#25B8C9","key":13}),React.createElement("path",{"d":"M1036.65 169.295C1017.81 185.635 994.419 199.29 968.172 209.094C942.03 218.971 912.925 225.145 883.608 227.323C879.904 227.614 876.306 227.832 872.601 227.904C869.003 228.05 865.299 228.05 862.018 227.977L850.482 227.687L838.947 227.323C823.601 226.815 808.466 226.161 793.331 225.145C763.168 223.111 733.322 219.77 705.276 213.814L705.381 213.524C733.428 219.479 763.168 222.82 793.331 224.854C808.466 225.871 823.706 226.597 838.947 227.105L850.482 227.469L862.018 227.759C865.299 227.832 869.003 227.759 872.601 227.687C876.2 227.541 879.904 227.396 883.503 227.105C912.819 224.927 941.818 218.826 968.066 208.949C994.313 199.144 1017.6 185.49 1036.54 169.149L1036.65 169.222V169.295Z","fill":"#25B8C9","key":14}),React.createElement("path",{"d":"M1039.4 170.675C1020.88 187.524 997.7 201.904 971.135 212.435C944.676 223.038 915.042 229.866 884.773 232.698C877.258 233.424 869.532 233.86 862.018 233.86C854.292 233.788 846.567 233.715 838.841 233.642C823.389 233.424 808.043 232.989 792.696 232.19C762.004 230.664 731.417 227.832 701.995 222.167L702.1 221.876C731.523 227.541 762.004 230.374 792.696 231.972C808.043 232.771 823.389 233.207 838.841 233.424C846.567 233.57 854.292 233.57 862.018 233.642C869.532 233.642 877.152 233.207 884.667 232.553C914.936 229.72 944.464 222.966 970.923 212.362C997.488 201.832 1020.66 187.451 1039.19 170.675L1039.29 170.747L1039.4 170.675Z","fill":"#25B8C9","key":15}),React.createElement("path",{"d":"M1042.04 172.054C1023.95 189.412 1000.77 204.519 973.887 215.775C947.11 227.106 916.947 234.659 885.725 238.073C881.809 238.508 877.893 238.872 873.977 239.089C869.955 239.38 866.039 239.525 861.912 239.598C854.186 239.67 846.46 239.743 838.629 239.743C823.071 239.743 807.513 239.598 791.955 239.089C760.84 238 729.406 235.676 698.608 230.301L698.714 230.011C729.512 235.385 760.84 237.782 791.955 238.872C807.513 239.38 823.071 239.598 838.629 239.598C846.354 239.598 854.186 239.525 861.912 239.453C866.039 239.38 869.955 239.235 873.977 238.944C877.893 238.654 881.809 238.363 885.725 237.927C916.947 234.514 947.004 226.96 973.781 215.703C1000.56 204.446 1023.73 189.412 1041.94 172.054L1042.04 172.126V172.054Z","fill":"#25B8C9","key":16}),React.createElement("path",{"d":"M1044.8 173.433C1027.02 191.373 1003.94 207.133 976.85 219.116C949.756 231.173 919.169 239.38 886.995 243.447C882.973 243.955 878.846 244.391 874.824 244.754C872.813 244.9 870.696 245.045 868.58 245.19C866.463 245.335 864.452 245.408 862.018 245.481L850.376 245.771L838.629 245.989C822.966 246.28 807.196 246.352 791.426 246.062C759.781 245.481 727.713 243.665 695.539 238.508L695.645 238.218C727.819 243.302 759.887 245.19 791.532 245.771C807.408 246.062 823.071 245.989 838.735 245.699L850.482 245.481L862.124 245.19C864.452 245.117 866.569 245.045 868.685 244.9C870.802 244.754 872.813 244.609 874.93 244.464C879.057 244.101 883.079 243.665 887.101 243.229C919.275 239.162 949.862 230.955 976.956 218.971C1004.05 206.988 1027.12 191.3 1044.9 173.361L1045.01 173.433H1044.8Z","fill":"#25B8C9","key":17}),React.createElement("path",{"d":"M708.662 205.463L709.297 205.608L696.068 238.653L695.433 238.581L708.662 205.463Z","fill":"#25B8C9","key":18}),React.createElement("path",{"d":"M1030.72 170.312L1033.89 167.842L1044.8 173.434L1041.94 176.194L1030.72 170.312Z","fill":"#25B8C9","key":19}),React.createElement("path",{"d":"M980.554 195.295C976.744 195.513 974.522 195.585 973.781 195.658L971.77 194.714L971.347 195.15L990.397 203.647C988.916 203.865 987.54 204.882 987.222 206.335C986.905 208.005 988.069 209.529 989.974 209.674C991.879 209.892 993.678 208.659 993.996 206.988C994.313 205.681 993.572 204.519 992.408 203.938L977.697 197.401C983.835 195.44 987.857 197.038 987.857 197.038C991.985 198.854 993.149 201.686 993.149 201.686C992.726 198.999 988.704 196.675 988.704 196.675C986.587 195.731 984.894 194.932 980.343 195.15L980.554 195.295Z","fill":"#25B8C9","key":20}),React.createElement("path",{"d":"M807.831 255.503C812.594 258.626 815.345 260.441 816.298 261.095L816.933 264L818.203 263.855L812.382 237.056C814.499 238.218 817.991 238.145 821.061 236.838C824.659 235.24 826.035 232.407 824.236 230.519C822.436 228.631 818.097 228.34 814.499 229.938C811.747 231.173 810.265 233.134 810.583 234.804L815.028 255.357C804.233 252.089 802.751 246.715 802.751 246.715C801.481 240.978 805.503 236.62 805.503 236.62C800.952 240.106 801.057 246.28 801.057 246.28C801.692 249.184 802.116 251.726 807.831 255.43V255.503Z","fill":"#25B8C9","key":21}),React.createElement("path",{"d":"M550.015 157.456C544.512 153.316 541.337 150.92 540.278 150.048L539.855 146.417L538.267 146.489L542.289 180.043C539.749 178.518 535.41 178.372 531.494 179.825C526.837 181.568 524.72 185.054 526.731 187.451C528.742 189.92 534.14 190.429 538.691 188.686C542.289 187.306 544.3 184.982 544.194 182.875L541.125 157.093C554.143 161.741 555.307 168.496 555.307 168.496C556.154 175.685 550.65 180.842 550.65 180.842C556.789 176.774 557.212 169.077 557.212 169.077C556.789 165.373 556.471 162.25 549.91 157.311L550.015 157.456Z","fill":"#25B8C9","key":22}),React.createElement("path",{"d":"M338.027 81.1244C344.588 83.0128 348.399 84.1022 349.669 84.4654L351.891 87.2253L353.161 86.7169L332.1 61.3693C334.851 61.9503 338.45 60.9335 340.672 58.8273C343.318 56.2863 343.213 53.0179 340.355 51.638C337.497 50.1854 332.946 51.1296 330.301 53.6716C328.291 55.6326 327.868 58.0283 329.138 59.6262L345.329 79.0908C332.629 78.7277 328.079 73.7162 328.079 73.7162C323.528 68.2691 325.116 62.8219 325.116 62.8219C322.47 67.5428 326.174 73.7162 326.174 73.7162C328.503 76.4762 330.408 78.8729 338.132 81.1244H338.027Z","fill":"#25B8C9","key":23}),React.createElement("path",{"d":"M197.054 24.0392C190.386 14.5258 186.47 9.00602 185.094 7.11766L187.105 0.435775L184.142 0L165.515 62.1686C162.234 58.4645 154.403 56.5771 146.254 57.8834C136.517 59.4086 130.061 64.8558 131.754 70.0125C133.448 75.1692 142.761 78.147 152.498 76.6218C160.013 75.4597 165.515 71.9735 166.891 68.0515L181.284 20.3352C201.182 33.481 198.112 46.1185 198.112 46.1185C194.091 59.4086 180.12 66.8168 180.12 66.8168C194.302 61.7328 201.182 47.9342 201.182 47.9342C203.192 41.1071 205.098 35.3694 197.16 24.0392H197.054Z","fill":"#25B8C9","key":24}),React.createElement("path",{"d":"M771.106 217.809L743.8 201.904L742.953 201.396L739.99 203.792L723.691 216.937C723.585 215.339 721.469 213.741 718.505 213.16C714.907 212.434 711.414 213.451 710.673 215.339C709.932 217.228 712.155 219.334 715.753 219.988C718.505 220.496 721.257 220.06 722.633 218.971L740.837 204.228L768.142 220.133L751.844 233.279C751.738 231.681 749.621 230.083 746.658 229.502C743.059 228.776 739.567 229.793 738.826 231.681C738.085 233.569 740.307 235.675 743.906 236.329C746.658 236.838 749.409 236.402 750.785 235.312L768.989 220.569L771.953 218.172L771.106 217.663V217.809Z","fill":"#25B8C9","key":25}),React.createElement("path",{"d":"M525.038 127.025L486.409 117.801L485.139 117.511L483.446 120.924L473.92 139.516C472.862 137.846 469.687 136.756 466.194 136.974C461.961 137.265 458.786 139.298 459.103 141.477C459.421 143.729 463.019 145.327 467.253 145.036C470.534 144.818 473.074 143.584 474.026 141.986L484.61 121.142L523.239 130.366L513.713 148.958C512.655 147.288 509.48 146.198 505.987 146.416C501.754 146.707 498.58 148.74 498.898 150.919C499.215 153.171 502.812 154.769 507.046 154.478C510.327 154.26 512.867 153.025 513.819 151.428L524.403 130.584L526.096 127.17L524.826 126.88L525.038 127.025Z","fill":"#25B8C9","key":26}),React.createElement("path",{"d":"M310.299 83.8118L270.399 62.1683L269.129 61.5146L265.001 65.0735L242.775 84.3202C242.458 82.0687 239.388 79.8898 235.155 79.1635C230.075 78.292 225.101 79.8172 224.148 82.5045C223.196 85.1918 226.476 88.0969 231.662 88.9685C235.578 89.6221 239.388 88.8958 241.399 87.298L266.271 65.7271L306.171 87.3706L283.946 106.616C283.628 104.365 280.559 102.186 276.325 101.46C271.245 100.588 266.271 102.113 265.318 104.801C264.366 107.488 267.647 110.393 272.833 111.265C276.749 111.918 280.559 111.192 282.57 109.594L307.441 88.0243L311.569 84.4655L310.299 83.8118Z","fill":"#25B8C9","key":27}),React.createElement("path",{"d":"M1025.22 204.228L1025.32 184.982C1025.43 183.892 1026.59 182.73 1028.6 182.076C1031.14 181.277 1033.89 181.713 1034.85 183.093C1035.69 184.473 1034.42 186.144 1031.88 186.943C1029.77 187.596 1027.44 187.378 1026.27 186.507L1026.17 204.228H1025.32H1025.22ZM1026.91 186.434C1027.44 186.943 1029.45 186.434 1031.25 185.345C1033.05 184.255 1034.11 183.021 1033.58 182.585C1033.05 182.076 1031.04 182.585 1029.24 183.674C1027.44 184.764 1026.38 185.998 1026.91 186.434Z","fill":"#25B8C9","key":28}),React.createElement("path",{"d":"M897.579 213.451L914.936 226.597C915.888 227.396 916.1 228.703 915.359 229.938C914.301 231.536 912.078 232.407 910.279 231.899C908.48 231.391 907.845 229.648 908.797 227.977C909.644 226.597 911.443 225.798 913.031 225.871L897.049 213.814L897.579 213.451ZM912.607 226.234C911.761 226.161 910.914 227.323 910.597 228.849C910.279 230.374 910.702 231.609 911.549 231.681C912.396 231.754 913.243 230.592 913.56 229.066C913.878 227.541 913.454 226.307 912.607 226.234Z","fill":"#25B8C9","key":29}),React.createElement("path",{"d":"M376.128 104.874L377.292 100.661L378.033 97.7558L379.197 93.5444L384.171 75.0966C384.806 73.1356 387.558 71.3925 391.262 70.7388C396.131 69.8673 400.787 71.3198 401.74 73.8619C402.693 76.4039 399.517 79.1638 394.755 80.0353C390.733 80.7616 386.817 79.8901 385.018 78.0744L380.784 93.8349L428.093 99.7895L432.962 81.3427C433.597 79.3817 436.348 77.6386 440.053 76.9849C444.921 76.1134 449.578 77.5659 450.531 80.108C451.483 82.65 448.308 85.4099 443.545 86.2814C439.524 87.0077 435.608 86.1362 433.808 84.3205L429.575 100.08L428.411 104.292L427.67 107.198L426.506 111.41L425.024 111.192L377.715 105.237L376.233 105.019L376.128 104.874ZM378.774 100.879L426.082 106.834L426.823 103.929L379.514 97.9737L378.774 100.879Z","fill":"#25B8C9","key":30}),React.createElement("path",{"d":"M853.763 254.413L853.233 252.234L852.916 250.709L852.387 248.53L850.164 238.944C849.952 237.927 850.905 236.692 852.493 235.966C854.609 235.022 857.255 235.167 858.419 236.257C859.478 237.419 858.631 239.089 856.514 240.106C854.715 240.905 852.598 240.978 851.223 240.251L853.128 248.457L877.787 245.844L875.565 236.257C875.353 235.24 876.306 234.005 877.893 233.279C880.01 232.335 882.656 232.48 883.82 233.569C884.878 234.731 884.032 236.402 881.915 237.419C880.116 238.218 877.999 238.29 876.623 237.564L878.528 245.771L879.057 247.949L879.375 249.474L879.904 251.653L879.163 251.726L854.503 254.34L853.763 254.413ZM854.08 252.161L878.74 249.547L878.422 248.022L853.763 250.636L854.08 252.161Z","fill":"#25B8C9","key":31}),React.createElement("path",{"d":"M975.262 208.15L974.733 210.11L974.416 211.418L973.887 213.379L971.558 221.876C971.241 222.748 969.971 223.619 968.277 223.837C966.055 224.2 963.938 223.547 963.515 222.385C963.091 221.223 964.573 219.915 966.796 219.552C968.701 219.262 970.5 219.625 971.241 220.496L973.252 213.306L960.022 211.563L957.694 220.061C957.376 220.932 956.106 221.804 954.413 222.022C952.19 222.385 950.074 221.731 949.65 220.569C949.227 219.407 950.709 218.1 952.931 217.736C954.836 217.446 956.635 217.809 957.376 218.681L959.387 211.49L946.158 209.747L943.829 218.245C943.512 219.116 942.242 219.988 940.548 220.206C938.326 220.569 936.209 219.915 935.786 218.753C935.362 217.591 936.844 216.284 939.067 215.921C940.972 215.63 942.771 215.993 943.512 216.865L945.523 209.675L946.052 207.715L946.369 206.407L946.899 204.446L947.639 204.519L960.869 206.262L961.504 206.335L974.733 208.078L975.474 208.15H975.262ZM959.81 209.529L960.128 208.223L946.899 206.48L946.581 207.787L959.81 209.529ZM974.098 210.038L960.869 208.296L960.551 209.602L973.781 211.345L974.098 210.038Z","fill":"#25B8C9","key":32}),React.createElement("path",{"d":"M576.368 218.535L595.419 221.513L596.372 221.658L615.422 224.636L616.375 224.781L617.327 222.021L622.407 206.915C623.466 208.15 626.112 208.804 628.757 208.44C632.038 208.005 634.261 206.189 633.732 204.446C633.203 202.703 630.133 201.686 626.958 202.122C624.418 202.485 622.619 203.574 622.09 204.882L616.48 221.731L597.43 218.753L602.51 203.647C603.568 204.882 606.108 205.535 608.86 205.172C612.141 204.736 614.364 202.921 613.834 201.177C613.305 199.434 610.236 198.418 606.955 198.853C604.415 199.216 602.616 200.306 602.087 201.613L596.477 218.462L577.427 215.484L582.507 200.379C583.565 201.613 586.211 202.267 588.857 201.904C592.138 201.468 594.361 199.652 593.831 197.909C593.302 196.166 590.233 195.149 587.058 195.585C584.518 195.948 582.719 197.038 582.189 198.345L576.58 215.194L575.628 217.954L576.58 218.099L576.368 218.535Z","fill":"#25B8C9","key":33}),React.createElement("path",{"d":"M681.357 199.508C680.933 201.541 679.663 202.631 678.287 203.793C678.287 203.793 673.207 206.988 667.282 206.698C667.282 206.698 673.631 206.335 677.547 202.848C677.547 202.848 678.499 201.977 678.711 200.234C677.335 200.524 675.747 200.67 674.161 200.597C674.161 200.597 676.276 200.452 678.817 199.725C678.922 198.055 678.499 195.803 676.488 192.898L663.789 204.083C662.308 205.318 659.344 205.899 656.275 205.39C652.359 204.737 649.713 202.558 650.454 200.452C651.195 198.345 655.005 197.183 658.921 197.837C662.202 198.345 664.53 200.016 664.848 201.759L687.918 181.423L688.871 181.931L687.283 183.311C687.389 184.038 687.707 186.216 688.342 189.993C688.977 194.496 687.283 195.949 685.167 197.692C685.167 197.692 683.685 198.636 681.357 199.435V199.508ZM681.462 198.709C682.521 198.2 683.473 197.619 684.426 196.82C684.426 196.82 687.918 193.407 683.368 186.87L680.404 189.485C680.51 190.211 680.827 192.39 681.462 196.167C681.568 197.183 681.674 197.982 681.568 198.709H681.462Z","fill":"#25B8C9","key":34})]);
}

NoteWithRighe.defaultProps = {"fill":"none"};

module.exports = NoteWithRighe;

NoteWithRighe.default = NoteWithRighe;


/***/ }),

/***/ 6509:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var React = __webpack_require__(2504);

function OndineModAnim (props) {
    return React.createElement("svg",props,[React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB2","d":"M219,114.116C258.944,87.4589,280.633,87.1312,318,114.116C358.687,140.866,381.032,141.238,420,114.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":0}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB3","d":"M419,114.731C458.944,88.0745,480.633,87.7469,518,114.731C558.687,141.482,581.032,141.854,620,114.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":1}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB4","d":"M234,166.116C273.944,139.459,295.633,139.131,333,166.116C373.687,192.866,396.032,193.238,435,166.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":2}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB5","d":"M434,166.731C473.944,140.075,495.633,139.747,533,166.731C573.687,193.482,596.032,193.854,635,166.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":3}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB6","d":"M242,219.116C281.944,192.459,303.633,192.131,341,219.116C381.687,245.866,404.032,246.238,443,219.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":4}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB7","d":"M442,219.731C481.944,193.075,503.633,192.747,541,219.731C581.687,246.482,604.032,246.854,643,219.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":5}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB8","d":"M251,273.116C290.944,246.459,312.633,246.131,350,273.116C390.687,299.866,413.032,300.238,452,273.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":6}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB9","d":"M451,273.731C490.944,247.075,512.633,246.747,550,273.731C590.687,300.482,613.032,300.854,652,273.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":7}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB10","d":"M837,107.731C876.944,81.0745,898.633,80.7469,936,107.731C976.687,134.482,999.032,134.854,1038,107.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":8}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB11","d":"M660,212.116C699.944,185.459,721.633,185.131,759,212.116C799.687,238.866,822.032,239.238,861,212.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":9}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB12","d":"M860,212.731C899.944,186.075,921.633,185.747,959,212.731C999.687,239.482,1022.03,239.854,1061,212.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":10}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB13","d":"M669,266.116C708.944,239.459,730.633,239.131,768,266.116C808.687,292.866,831.032,293.238,870,266.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":11}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB14","d":"M869,266.731C908.944,240.075,930.633,239.747,968,266.731C1008.69,293.482,1031.03,293.854,1070,266.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":12}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB15","d":"M219,114.116C258.944,87.4589,280.633,87.1312,318,114.116C358.687,140.866,381.032,141.238,420,114.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":13}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB16","d":"M419,114.731C458.944,88.0745,480.633,87.7469,518,114.731C558.687,141.482,581.032,141.854,620,114.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":14}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB17","d":"M234,166.116C273.944,139.459,295.633,139.131,333,166.116C373.687,192.866,396.032,193.238,435,166.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":15}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB18","d":"M434,166.731C473.944,140.075,495.633,139.747,533,166.731C573.687,193.482,596.032,193.854,635,166.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":16}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB19","d":"M242,219.116C281.944,192.459,303.633,192.131,341,219.116C381.687,245.866,404.032,246.238,443,219.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":17}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB20","d":"M442,219.731C481.944,193.075,503.633,192.747,541,219.731C581.687,246.482,604.032,246.854,643,219.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":18}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB21","d":"M251,273.116C290.944,246.459,312.633,246.131,350,273.116C390.687,299.866,413.032,300.238,452,273.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":19}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB22","d":"M451,273.731C490.944,247.075,512.633,246.747,550,273.731C590.687,300.482,613.032,300.854,652,273.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":20}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB23","d":"M637,107.116C676.944,80.4589,698.633,80.1312,736,107.116C776.687,133.866,799.032,134.238,838,107.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":21}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB24","d":"M652,159.116C691.944,132.459,713.633,132.131,751,159.116C791.687,185.866,814.032,186.238,853,159.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":22}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB25","d":"M660,212.116C699.944,185.459,721.633,185.131,759,212.116C799.687,238.866,822.032,239.238,861,212.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":23}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB26","d":"M272,326.116C311.944,299.459,333.633,299.131,371,326.116C411.687,352.866,434.032,353.238,473,326.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":24}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB27","d":"M487,378.731C526.944,352.075,548.633,351.747,586,378.731C626.687,405.482,649.032,405.854,688,378.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":25}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB28","d":"M495,431.731C534.944,405.075,556.633,404.747,594,431.731C634.687,458.482,657.032,458.854,696,431.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":26}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB29","d":"M504,485.731C543.944,459.075,565.633,458.747,603,485.731C643.687,512.482,666.032,512.854,705,485.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":27}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB30","d":"M890,319.731C929.944,293.075,951.633,292.747,989,319.731C1029.69,346.482,1052.03,346.854,1091,319.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":28}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB31","d":"M905,371.731C944.944,345.075,966.633,344.747,1004,371.731C1044.69,398.482,1067.03,398.854,1106,371.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":29}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB32","d":"M913,424.731C952.944,398.075,974.633,397.747,1012,424.731C1052.69,451.482,1075.03,451.854,1114,424.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":30}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB33","d":"M722,478.116C761.944,451.459,783.633,451.131,821,478.116C861.687,504.866,884.032,505.238,923,478.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":31}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB34","d":"M922,478.731C961.944,452.075,983.633,451.747,1021,478.731C1061.69,505.482,1084.03,505.854,1123,478.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":32}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB35","d":"M272,326.116C311.944,299.459,333.633,299.131,371,326.116C411.687,352.866,434.032,353.238,473,326.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":33}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB36","d":"M472,326.731C511.944,300.075,533.633,299.747,571,326.731C611.687,353.482,634.032,353.854,673,326.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":34}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB37","d":"M287,378.116C326.944,351.459,348.633,351.131,386,378.116C426.687,404.866,449.032,405.238,488,378.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":35}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB38","d":"M295,431.116C334.944,404.459,356.633,404.131,394,431.116C434.687,457.866,457.032,458.238,496,431.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":36}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB39","d":"M304,485.116C343.944,458.459,365.633,458.131,403,485.116C443.687,511.866,466.032,512.238,505,485.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":37}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB40","d":"M690,319.116C729.944,292.459,751.633,292.131,789,319.116C829.687,345.866,852.032,346.238,891,319.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":38}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB41","d":"M705,371.116C744.944,344.459,766.633,344.131,804,371.116C844.687,397.866,867.032,398.238,906,371.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":39}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB42","d":"M713,424.116C752.944,397.459,774.633,397.131,812,424.116C852.687,450.866,875.032,451.238,914,424.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":40}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB43","d":"M317,546.116C356.944,519.459,378.633,519.131,416,546.116C456.687,572.866,479.032,573.238,518,546.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":41}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB44","d":"M332,598.116C371.944,571.459,393.633,571.131,431,598.116C471.687,624.866,494.032,625.238,533,598.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":42}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB45","d":"M340,651.116C379.944,624.459,401.633,624.131,439,651.116C479.687,677.866,502.032,678.238,541,651.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":43}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB46","d":"M349,705.116C388.944,678.459,410.633,678.131,448,705.116C488.687,731.866,511.032,732.238,550,705.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":44}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB47","d":"M735,539.116C774.944,512.459,796.633,512.131,834,539.116C874.687,565.866,897.032,566.238,936,539.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":45}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB48","d":"M750,591.116C789.944,564.459,811.633,564.131,849,591.116C889.687,617.866,912.032,618.238,951,591.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":46}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB49","d":"M950,591.731C989.944,565.075,1011.63,564.747,1049,591.731C1089.69,618.482,1112.03,618.854,1151,591.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":47}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB50","d":"M758,644.116C797.944,617.459,819.633,617.131,857,644.116C897.687,670.866,920.032,671.238,959,644.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":48}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB51","d":"M958,644.731C997.944,618.075,1019.63,617.747,1057,644.731C1097.69,671.482,1120.03,671.854,1159,644.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":49}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB52","d":"M767,698.116C806.944,671.459,828.633,671.131,866,698.116C906.687,724.866,929.032,725.238,968,698.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":50}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB53","d":"M967,698.731C1006.94,672.075,1028.63,671.747,1066,698.731C1106.69,725.482,1129.03,725.854,1168,698.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":51}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB54","d":"M517,546.731C556.944,520.075,578.633,519.747,616,546.731C656.687,573.482,679.032,573.854,718,546.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":52}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB55","d":"M532,598.731C571.944,572.075,593.633,571.747,631,598.731C671.687,625.482,694.032,625.854,733,598.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":53}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB56","d":"M540,651.731C579.944,625.075,601.633,624.747,639,651.731C679.687,678.482,702.032,678.854,741,651.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":54}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB57","d":"M549,705.731C588.944,679.075,610.633,678.747,648,705.731C688.687,732.482,711.032,732.854,750,705.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":55}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB58","d":"M935,539.731C974.944,513.075,996.633,512.747,1034,539.731C1074.69,566.482,1097.03,566.854,1136,539.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":56}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB59","d":"M370,758.116C409.944,731.459,431.633,731.131,469,758.116C509.687,784.866,532.032,785.238,571,758.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":57}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB60","d":"M385,810.116C424.944,783.459,446.633,783.131,484,810.116C524.687,836.866,547.032,837.238,586,810.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":58}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB61","d":"M393,863.116C432.944,836.459,454.633,836.131,492,863.116C532.687,889.866,555.032,890.238,594,863.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":59}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB62","d":"M402,917.116C441.944,890.459,463.633,890.131,501,917.116C541.687,943.866,564.032,944.238,603,917.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":60}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB63","d":"M788,751.116C827.944,724.459,849.633,724.131,887,751.116C927.687,777.866,950.032,778.238,989,751.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":61}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB64","d":"M803,803.116C842.944,776.459,864.633,776.131,902,803.116C942.687,829.866,965.032,830.238,1004,803.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":62}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB65","d":"M1003,803.731C1042.94,777.075,1064.63,776.747,1102,803.731C1142.69,830.482,1165.03,830.854,1204,803.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":63}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB66","d":"M811,856.116C850.944,829.459,872.633,829.131,910,856.116C950.687,882.866,973.032,883.238,1012,856.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":64}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB67","d":"M1011,856.731C1050.94,830.075,1072.63,829.747,1110,856.731C1150.69,883.482,1173.03,883.854,1212,856.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":65}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB68","d":"M820,910.116C859.944,883.459,881.633,883.131,919,910.116C959.687,936.866,982.032,937.238,1021,910.116","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":66}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB69","d":"M1020,910.731C1059.94,884.075,1081.63,883.747,1119,910.731C1159.69,937.482,1182.03,937.854,1221,910.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":67}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB70","d":"M570,758.731C609.944,732.075,631.633,731.747,669,758.731C709.687,785.482,732.032,785.854,771,758.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":68}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB71","d":"M585,810.731C624.944,784.075,646.633,783.747,684,810.731C724.687,837.482,747.032,837.854,786,810.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":69}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB72","d":"M593,863.731C632.944,837.075,654.633,836.747,692,863.731C732.687,890.482,755.032,890.854,794,863.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":70}),React.createElement("path",{"className":"ond-odd","id":"eULQaNdhcVB73","d":"M602,917.731C641.944,891.075,663.633,890.747,701,917.731C741.687,944.482,764.032,944.854,803,917.731","transform":"matrix(1.051447 0 0 1 -36.141517 0)","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":71}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB74","d":"M988,751.731C1027.94,725.075,1049.63,724.747,1087,751.731C1127.69,778.482,1150.03,778.854,1189,751.731","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":72}),React.createElement("path",{"className":"ond-even","id":"eULQaNdhcVB75","d":"M988,751.731C1027.94,725.075,1049.63,724.747,1087,751.731C1127.69,778.482,1150.03,778.854,1189,751.731","transform":"matrix(1 0 0 1 -137.5 -592.615676)","fill":"none","stroke":"rgb(37,184,201)","strokeWidth":"5","key":73}),React.createElement("rect",{"id":"eULQaNdhcVB76","width":"553.165229","height":"890.139349","rx":"0","ry":"0","transform":"matrix(1.040967 0 0 0.39725 182.586626 76.202725)","fill":"rgb(238,238,238)","stroke":"none","strokeWidth":"0","key":74}),React.createElement("rect",{"id":"eULQaNdhcVB77","width":"553.165229","height":"890.139349","rx":"0","ry":"0","transform":"matrix(1.040967 0 0 0.39725 297.086646 414.357235)","fill":"rgb(238,238,238)","stroke":"none","strokeWidth":"0","key":75}),React.createElement("rect",{"id":"eULQaNdhcVB78","width":"553.165229","height":"890.139349","rx":"0","ry":"0","transform":"matrix(1.040967 0 0 0.39725 374.528875 598.161164)","fill":"rgb(238,238,238)","stroke":"none","strokeWidth":"0","key":76}),React.createElement("rect",{"id":"eULQaNdhcVB79","width":"553.165229","height":"890.139349","rx":"0","ry":"0","transform":"matrix(0.69884 0 0 0.39725 742.713006 76.202725)","fill":"rgb(238,238,238)","stroke":"none","strokeWidth":"0","key":77}),React.createElement("rect",{"id":"eULQaNdhcVB80","width":"553.165229","height":"890.139349","rx":"0","ry":"0","transform":"matrix(0.808598 0 0 0.39725 720 335.196072)","fill":"rgb(238,238,238)","stroke":"none","strokeWidth":"0","key":78}),React.createElement("rect",{"id":"eULQaNdhcVB81","width":"553.165229","height":"890.139349","rx":"0","ry":"0","transform":"matrix(0.808598 0 0 0.39725 858.5 598.776886)","fill":"rgb(238,238,238)","stroke":"none","strokeWidth":"0","key":79}),React.createElement("script",{"key":80},"!function(t,n){\"object\"==typeof exports&&\"undefined\"!=typeof module?module.exports=n(require(\"vue\")):\"function\"==typeof define&&define.amd?define([\"vue\"],n):((t=\"undefined\"!=typeof globalThis?globalThis:t||self).__SVGATOR_PLAYER__=t.__SVGATOR_PLAYER__||{},t.__SVGATOR_PLAYER__[\"5c7f360c\"]=n())}(this,(function(){\"use strict\";function t(t,n){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(t);n&&(e=e.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),r.push.apply(r,e)}return r}function n(n){for(var r=1;r<arguments.length;r++){var e=null!=arguments[r]?arguments[r]:{};r%2?t(Object(e),!0).forEach((function(t){u(n,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(e)):t(Object(e)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(e,t))}))}return n}function r(t){return(r=\"function\"==typeof Symbol&&\"symbol\"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&\"function\"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?\"symbol\":typeof t})(t)}function e(t,n){if(!(t instanceof n))throw new TypeError(\"Cannot call a class as a function\")}function i(t,n){for(var r=0;r<n.length;r++){var e=n[r];e.enumerable=e.enumerable||!1,e.configurable=!0,\"value\"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}function o(t,n,r){return n&&i(t.prototype,n),r&&i(t,r),t}function u(t,n,r){return n in t?Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r,t}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function l(t,n){return(l=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}function f(t,n){if(n&&(\"object\"==typeof n||\"function\"==typeof n))return n;if(void 0!==n)throw new TypeError(\"Derived constructors may only return object or undefined\");return function(t){if(void 0===t)throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");return t}(t)}function s(t){var n=function(){if(\"undefined\"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if(\"function\"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,e=a(t);if(n){var i=a(this).constructor;r=Reflect.construct(e,arguments,i)}else r=e.apply(this,arguments);return f(this,r)}}function c(t,n,r){return(c=\"undefined\"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,n,r){var e=function(t,n){for(;!Object.prototype.hasOwnProperty.call(t,n)&&null!==(t=a(t)););return t}(t,n);if(e){var i=Object.getOwnPropertyDescriptor(e,n);return i.get?i.get.call(r):i.value}})(t,n,r||t)}var h=v(Math.pow(10,-6));function v(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:6;if(Number.isInteger(t))return t;var r=Math.pow(10,n);return Math.round((+t+Number.EPSILON)*r)/r}function y(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:h;return Math.abs(t-n)<r}var g=Math.PI/180;function d(t){return t}function p(t,n,r){var e=1-r;return 3*r*e*(t*e+n*r)+r*r*r}function m(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,e=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1;return t<0||t>1||r<0||r>1?null:y(t,n)&&y(r,e)?d:function(i){if(i<=0)return t>0?i*n/t:0===n&&r>0?i*e/r:0;if(i>=1)return r<1?1+(i-1)*(e-1)/(r-1):1===r&&t<1?1+(i-1)*(n-1)/(t-1):1;for(var o,u=0,a=1;u<a;){var l=p(t,r,o=(u+a)/2);if(y(i,l))break;l<i?u=o:a=o}return p(n,e,o)}}function b(){return 1}function w(t){return 1===t?1:0}function x(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;if(1===t){if(0===n)return w;if(1===n)return b}var r=1/t;return function(t){return t>=1?1:(t+=n*r)-t%r}}var A=\"undefined\"!=typeof window&&/(Mac|iPhone|iPod|iPad)/i.test(window.navigator.platform);Object.freeze({Meta:A?\"Control\":\"Meta\",Ctrl:\"Control\",Down:\"ArrowDown\",Up:\"ArrowUp\",Left:\"ArrowLeft\",Right:\"ArrowRight\",Esc:\"Escape\",Delete:\"Backspace\",Space:\"Space\"});var k=Math.sin,_=Math.cos,S=Math.acos,O=Math.asin,j=Math.tan,P=Math.atan2,M=Math.PI/180,E=180/Math.PI,R=Math.sqrt,I=function(){function t(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,u=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0;e(this,t),this.m=[n,r,i,o,u,a],this.i=null,this.w=null,this.s=null}return o(t,[{key:\"determinant\",get:function(){var t=this.m;return t[0]*t[3]-t[1]*t[2]}},{key:\"isIdentity\",get:function(){if(null===this.i){var t=this.m;this.i=1===t[0]&&0===t[1]&&0===t[2]&&1===t[3]&&0===t[4]&&0===t[5]}return this.i}},{key:\"point\",value:function(t,n){var r=this.m;return{x:r[0]*t+r[2]*n+r[4],y:r[1]*t+r[3]*n+r[5]}}},{key:\"translateSelf\",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;if(!t&&!n)return this;var r=this.m;return r[4]+=r[0]*t+r[2]*n,r[5]+=r[1]*t+r[3]*n,this.w=this.s=this.i=null,this}},{key:\"rotateSelf\",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;if(t%=360){var n=k(t*=M),r=_(t),e=this.m,i=e[0],o=e[1];e[0]=i*r+e[2]*n,e[1]=o*r+e[3]*n,e[2]=e[2]*r-i*n,e[3]=e[3]*r-o*n,this.w=this.s=this.i=null}return this}},{key:\"scaleSelf\",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;if(1!==t||1!==n){var r=this.m;r[0]*=t,r[1]*=t,r[2]*=n,r[3]*=n,this.w=this.s=this.i=null}return this}},{key:\"skewSelf\",value:function(t,n){if(n%=360,(t%=360)||n){var r=this.m,e=r[0],i=r[1],o=r[2],u=r[3];t&&(t=j(t*M),r[2]+=e*t,r[3]+=i*t),n&&(n=j(n*M),r[0]+=o*n,r[1]+=u*n),this.w=this.s=this.i=null}return this}},{key:\"resetSelf\",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,e=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,u=this.m;return u[0]=t,u[1]=n,u[2]=r,u[3]=e,u[4]=i,u[5]=o,this.w=this.s=this.i=null,this}},{key:\"recomposeSelf\",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,e=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null;return this.isIdentity||this.resetSelf(),t&&(t.x||t.y)&&this.translateSelf(t.x,t.y),n&&this.rotateSelf(n),r&&(r.x&&this.skewSelf(r.x,0),r.y&&this.skewSelf(0,r.y)),!e||1===e.x&&1===e.y||this.scaleSelf(e.x,e.y),i&&(i.x||i.y)&&this.translateSelf(i.x,i.y),this}},{key:\"decompose\",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=this.m,e=r[0]*r[0]+r[1]*r[1],i=[[r[0],r[1]],[r[2],r[3]]],o=R(e);if(0===o)return{origin:{x:v(r[4]),y:v(r[5])},translate:{x:v(t),y:v(n)},scale:{x:0,y:0},skew:{x:0,y:0},rotate:0};i[0][0]/=o,i[0][1]/=o;var u=r[0]*r[3]-r[1]*r[2]<0;u&&(o=-o);var a=i[0][0]*i[1][0]+i[0][1]*i[1][1];i[1][0]-=i[0][0]*a,i[1][1]-=i[0][1]*a;var l=R(i[1][0]*i[1][0]+i[1][1]*i[1][1]);if(0===l)return{origin:{x:v(r[4]),y:v(r[5])},translate:{x:v(t),y:v(n)},scale:{x:v(o),y:0},skew:{x:0,y:0},rotate:0};i[1][0]/=l,i[1][1]/=l,a/=l;var f=0;return i[1][1]<0?(f=S(i[1][1])*E,i[0][1]<0&&(f=360-f)):f=O(i[0][1])*E,u&&(f=-f),a=P(a,R(i[0][0]*i[0][0]+i[0][1]*i[0][1]))*E,u&&(a=-a),{origin:{x:v(r[4]),y:v(r[5])},translate:{x:v(t),y:v(n)},scale:{x:v(o),y:v(l)},skew:{x:v(a),y:0},rotate:v(f)}}},{key:\"toString\",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:\" \";return null===this.s&&(this.s=\"matrix(\"+this.m.map((function(t){return v(t)})).join(t)+\")\"),this.s}}]),t}();function N(t,n,r){return t>=.5?r:n}function B(t,n,r){return 0===t||n===r?n:t*(r-n)+n}function F(t,n,r){var e=B(t,n,r);return e<=0?0:e}function T(t,n,r){var e=B(t,n,r);return e<=0?0:e>=1?1:e}function q(t,n,r){return 0===t?n:1===t?r:{x:B(t,n.x,r.x),y:B(t,n.y,r.y)}}function L(t,n,r){var e=function(t,n,r){return Math.round(B(t,n,r))}(t,n,r);return e<=0?0:e>=255?255:e}function C(t,n,r){return 0===t?n:1===t?r:{r:L(t,n.r,r.r),g:L(t,n.g,r.g),b:L(t,n.b,r.b),a:B(t,null==n.a?1:n.a,null==r.a?1:r.a)}}function D(t,n){for(var r=[],e=0;e<t;e++)r.push(n);return r}function z(t,n){if(--n<=0)return t;var r=(t=Object.assign([],t)).length;do{for(var e=0;e<r;e++)t.push(t[e])}while(--n>0);return t}var V,G=function(){function t(n){e(this,t),this.list=n,this.length=n.length}return o(t,[{key:\"setAttribute\",value:function(t,n){for(var r=this.list,e=0;e<this.length;e++)r[e].setAttribute(t,n)}},{key:\"removeAttribute\",value:function(t){for(var n=this.list,r=0;r<this.length;r++)n[r].removeAttribute(t)}},{key:\"style\",value:function(t,n){for(var r=this.list,e=0;e<this.length;e++)r[e].style[t]=n}}]),t}(),Y=/-./g,U=function(t,n){return n.toUpperCase()};function $(t){return\"function\"==typeof t?t:N}function Q(t){return t?\"function\"==typeof t?t:Array.isArray(t)?function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:d;if(!Array.isArray(t))return n;switch(t.length){case 1:return x(t[0])||n;case 2:return x(t[0],t[1])||n;case 4:return m(t[0],t[1],t[2],t[3])||n}return n}(t,null):function(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:d;switch(t){case\"linear\":return d;case\"steps\":return x(n.steps||1,n.jump||0)||r;case\"bezier\":case\"cubic-bezier\":return m(n.x1||0,n.y1||0,n.x2||0,n.y2||0)||r}return r}(t.type,t.value,null):null}function H(t,n,r){var e=arguments.length>3&&void 0!==arguments[3]&&arguments[3],i=n.length-1;if(t<=n[0].t)return e?[0,0,n[0].v]:n[0].v;if(t>=n[i].t)return e?[i,1,n[i].v]:n[i].v;var o,u=n[0],a=null;for(o=1;o<=i;o++){if(!(t>n[o].t)){a=n[o];break}u=n[o]}return null==a?e?[i,1,n[i].v]:n[i].v:u.t===a.t?e?[o,1,a.v]:a.v:(t=(t-u.t)/(a.t-u.t),u.e&&(t=u.e(t)),e?[o,t,r(t,u.v,a.v)]:r(t,u.v,a.v))}function J(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return t&&t.length?\"function\"!=typeof n?null:(\"function\"!=typeof r&&(r=null),function(e){var i=H(e,t,n);return null!=i&&r&&(i=r(i)),i}):null}function Z(t,n){return t.t-n.t}function K(t,n,e,i,o){var u,a=\"@\"===e[0],l=\"#\"===e[0],f=V[e],s=N;switch(a?(u=e.substr(1),e=u.replace(Y,U)):l&&(e=e.substr(1)),r(f)){case\"function\":if(s=f(i,o,H,Q,e,a,n,t),l)return s;break;case\"string\":s=J(i,$(f));break;case\"object\":if((s=J(i,$(f.i),f.f))&&\"function\"==typeof f.u)return f.u(n,s,e,a,t)}return s?function(t,n,r){if(arguments.length>3&&void 0!==arguments[3]&&arguments[3])return t instanceof G?function(e){return t.style(n,r(e))}:function(e){return t.style[n]=r(e)};if(Array.isArray(n)){var e=n.length;return function(i){var o=r(i);if(null==o)for(var u=0;u<e;u++)t[u].removeAttribute(n);else for(var a=0;a<e;a++)t[a].setAttribute(n,o)}}return function(e){var i=r(e);null==i?t.removeAttribute(n):t.setAttribute(n,i)}}(n,e,s,a):null}function W(t,n,e,i){if(!i||\"object\"!==r(i))return null;var o=null,u=null;return Array.isArray(i)?u=function(t){if(!t||!t.length)return null;for(var n=0;n<t.length;n++)t[n].e&&(t[n].e=Q(t[n].e));return t.sort(Z)}(i):(u=i.keys,o=i.data||null),u?K(t,n,e,u,o):null}function X(t,n,r){if(!r)return null;var e=[];for(var i in r)if(r.hasOwnProperty(i)){var o=W(t,n,i,r[i]);o&&e.push(o)}return e.length?e:null}function tt(t,n){if(!n.duration||n.duration<0)return null;var r=function(t,n){if(!n)return null;var r=[];if(Array.isArray(n))for(var e=n.length,i=0;i<e;i++){var o=n[i];if(2===o.length){var u=null;if(\"string\"==typeof o[0])u=t.getElementById(o[0]);else if(Array.isArray(o[0])){u=[];for(var a=0;a<o[0].length;a++)if(\"string\"==typeof o[0][a]){var l=t.getElementById(o[0][a]);l&&u.push(l)}u=u.length?1===u.length?u[0]:new G(u):null}if(u){var f=X(t,u,o[1]);f&&(r=r.concat(f))}}}else for(var s in n)if(n.hasOwnProperty(s)){var c=t.getElementById(s);if(c){var h=X(t,c,n[s]);h&&(r=r.concat(h))}}return r.length?r:null}(t,n.elements);return r?function(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1/0,e=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,i=arguments.length>4&&void 0!==arguments[4]&&arguments[4],o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:1,u=t.length,a=e>0?n:0;i&&r%2==0&&(a=n-a);var l=null;return function(f,s){var c=f%n,h=1+(f-c)/n;s*=e,i&&h%2==0&&(s=-s);var v=!1;if(h>r)c=a,v=!0,-1===o&&(c=e>0?0:n);else if(s<0&&(c=n-c),c===l)return!1;l=c;for(var y=0;y<u;y++)t[y](c);return v}}(r,n.duration,n.iterations||1/0,n.direction||1,!!n.alternate,n.fill||1):null}function nt(t){return+(\"0x\"+(t.replace(/[^0-9a-fA-F]+/g,\"\")||27))}function rt(t,n,r){return!t||!r||n>t.length?t:t.substring(0,n)+rt(t.substring(n+1),r,r)}function et(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:27;return!t||t%n?t%n:et(t/n,n)}function it(t,n,r){if(t&&t.length){var e=nt(r),i=nt(n),o=et(e)+5,u=rt(t,et(e,5),o);return u=u.replace(/\\x7c$/g,\"==\").replace(/\\x2f$/g,\"=\"),u=function(t,n,r){var e=+(\"0x\"+t.substring(0,4));t=t.substring(4);for(var i=n%e+r%27,o=[],u=0;u<t.length;u+=2)if(\"|\"!==t[u]){var a=+(\"0x\"+t[u]+t[u+1])-i;o.push(a)}else{var l=+(\"0x\"+t.substring(u+1,u+1+4))-i;u+=3,o.push(l)}return String.fromCharCode.apply(String,o)}(u=(u=atob(u)).replace(/[\\x41-\\x5A]/g,\"\"),i,e),u=JSON.parse(u)}}Number.isInteger||(Number.isInteger=function(t){return\"number\"==typeof t&&isFinite(t)&&Math.floor(t)===t}),Number.EPSILON||(Number.EPSILON=2220446049250313e-31);var ot=function(){function t(n,r){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};e(this,t),this._id=0,this._running=!1,this._rollingBack=!1,this._animations=n,this.duration=r.duration,this.alternate=r.alternate,this.fill=r.fill,this.iterations=r.iterations,this.direction=i.direction||1,this.speed=i.speed||1,this.fps=i.fps||100,this.offset=i.offset||0,this.rollbackStartOffset=0}return o(t,[{key:\"_rollback\",value:function(){var t=this,n=1/0,r=null;this.rollbackStartOffset=this.offset,this._rollingBack||(this._rollingBack=!0,this._running=!0);this._id=window.requestAnimationFrame((function e(i){if(t._rollingBack){null==r&&(r=i);var o=i-r,u=t.rollbackStartOffset-o,a=Math.round(u*t.speed);if(a>t.duration&&n!=1/0){var l=!!t.alternate&&a/t.duration%2>1,f=a%t.duration;a=(f+=l?t.duration:0)||t.duration}var s=t.fps?1e3/t.fps:0,c=Math.max(0,a);if(c<n-s){t.offset=c,n=c;for(var h=t._animations,v=h.length,y=0;y<v;y++)h[y](c,t.direction)}var g=!1;if(t.iterations>0&&-1===t.fill){var d=t.iterations*t.duration,p=d==a;a=p?0:a,t.offset=p?0:t.offset,g=a>d}a>0&&t.offset>=a&&!g?t._id=window.requestAnimationFrame(e):t.stop()}}))}},{key:\"_start\",value:function(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,r=-1/0,e=null,i={},o=function o(u){t._running=!0,null==e&&(e=u);var a=Math.round((u-e+n)*t.speed),l=t.fps?1e3/t.fps:0;if(a>r+l&&!t._rollingBack){t.offset=a,r=a;for(var f=t._animations,s=f.length,c=0,h=0;h<s;h++)i[h]?c++:(i[h]=f[h](a,t.direction),i[h]&&c++);if(c===s)return void t._stop()}t._id=window.requestAnimationFrame(o)};this._id=window.requestAnimationFrame(o)}},{key:\"_stop\",value:function(){this._id&&window.cancelAnimationFrame(this._id),this._running=!1,this._rollingBack=!1}},{key:\"play\",value:function(){!this._rollingBack&&this._running||(this._rollingBack=!1,this.rollbackStartOffset>this.duration&&(this.offset=this.rollbackStartOffset-(this.rollbackStartOffset-this.offset)%this.duration,this.rollbackStartOffset=0),this._start(this.offset))}},{key:\"stop\",value:function(){this._stop(),this.offset=0,this.rollbackStartOffset=0;var t=this.direction,n=this._animations;window.requestAnimationFrame((function(){for(var r=0;r<n.length;r++)n[r](0,t)}))}},{key:\"reachedToEnd\",value:function(){return this.iterations>0&&this.offset>=this.iterations*this.duration}},{key:\"restart\",value:function(){this._stop(),this.offset=0,this._start()}},{key:\"pause\",value:function(){this._stop()}},{key:\"reverse\",value:function(){this.direction=-this.direction}}],[{key:\"build\",value:function(r,e){return delete r.animationSettings,r.options=it(r.options,r.root,\"5c7f360c\"),r.animations.map((function(t){var e=it(t.s,r.root,\"5c7f360c\");for(var i in delete t.s,r.animationSettings||(r.animationSettings=n({},e)),e)e.hasOwnProperty(i)&&(t[i]=e[i])})),(r=function(t,n){if(V=n,!t||!t.root||!Array.isArray(t.animations))return null;for(var r=document.getElementsByTagName(\"svg\"),e=!1,i=0;i<r.length;i++)if(r[i].id===t.root&&!r[i].svgatorAnimation){(e=r[i]).svgatorAnimation=!0;break}if(!e)return null;var o=t.animations.map((function(t){return tt(e,t)})).filter((function(t){return!!t}));return o.length?{element:e,animations:o,animationSettings:t.animationSettings,options:t.options||void 0}:null}(r,e))?{el:r.element,options:r.options||{},player:new t(r.animations,r.animationSettings,r.options)}:null}},{key:\"push\",value:function(t){return this.build(t)}},{key:\"init\",value:function(){var t=this,n=window.__SVGATOR_PLAYER__&&window.__SVGATOR_PLAYER__[\"5c7f360c\"];Array.isArray(n)&&n.splice(0).forEach((function(n){return t.build(n)}))}}]),t}();function ut(t){return v(t)+\"\"}function at(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:\" \";return t&&t.length?t.map(ut).join(n):\"\"}function lt(t){return t?null==t.a||t.a>=1?\"rgb(\"+t.r+\",\"+t.g+\",\"+t.b+\")\":\"rgba(\"+t.r+\",\"+t.g+\",\"+t.b+\",\"+t.a+\")\":\"transparent\"}function ft(t){return t?\"url(#\"+t+\")\":\"none\"}!function(){for(var t=0,n=[\"ms\",\"moz\",\"webkit\",\"o\"],r=0;r<n.length&&!window.requestAnimationFrame;++r)window.requestAnimationFrame=window[n[r]+\"RequestAnimationFrame\"],window.cancelAnimationFrame=window[n[r]+\"CancelAnimationFrame\"]||window[n[r]+\"CancelRequestAnimationFrame\"];window.requestAnimationFrame||(window.requestAnimationFrame=function(n){var r=Date.now(),e=Math.max(0,16-(r-t)),i=window.setTimeout((function(){n(r+e)}),e);return t=r+e,i},window.cancelAnimationFrame=window.clearTimeout)}();var st={f:null,i:function(t,n,r){return 0===t?n:1===t?r:{x:F(t,n.x,r.x),y:F(t,n.y,r.y)}},u:function(t,n){return function(r){var e=n(r);t.setAttribute(\"rx\",ut(e.x)),t.setAttribute(\"ry\",ut(e.y))}}},ct={f:null,i:function(t,n,r){return 0===t?n:1===t?r:{width:F(t,n.width,r.width),height:F(t,n.height,r.height)}},u:function(t,n){return function(r){var e=n(r);t.setAttribute(\"width\",ut(e.width)),t.setAttribute(\"height\",ut(e.height))}}};Object.freeze({M:2,L:2,Z:0,H:1,V:1,C:6,Q:4,T:2,S:4,A:7});var ht={},vt=null;function yt(t){var n=function(){if(vt)return vt;if(\"object\"!==(\"undefined\"==typeof document?\"undefined\":r(document))||!document.createElementNS)return{};var t=document.createElementNS(\"http://www.w3.org/2000/svg\",\"svg\");return t&&t.style?(t.style.position=\"absolute\",t.style.opacity=\"0.01\",t.style.zIndex=\"-9999\",t.style.left=\"-9999px\",t.style.width=\"1px\",t.style.height=\"1px\",vt={svg:t}):{}}().svg;if(!n)return function(t){return null};var e=document.createElementNS(n.namespaceURI,\"path\");e.setAttributeNS(null,\"d\",t),e.setAttributeNS(null,\"fill\",\"none\"),e.setAttributeNS(null,\"stroke\",\"none\"),n.appendChild(e);var i=e.getTotalLength();return function(t){var n=e.getPointAtLength(i*t);return{x:n.x,y:n.y}}}function gt(t){return ht[t]?ht[t]:ht[t]=yt(t)}function dt(t,n,r,e){if(!t||!e)return!1;var i=[\"M\",t.x,t.y];if(n&&r&&(i.push(\"C\"),i.push(n.x),i.push(n.y),i.push(r.x),i.push(r.y)),n?!r:r){var o=n||r;i.push(\"Q\"),i.push(o.x),i.push(o.y)}return n||r||i.push(\"L\"),i.push(e.x),i.push(e.y),i.join(\" \")}function pt(t,n,r,e){var i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,o=dt(t,n,r,e),u=gt(o);try{return u(i)}catch(t){return null}}function mt(t,n,r,e){var i=1-e;return i*i*t+2*i*e*n+e*e*r}function bt(t,n,r,e){return 2*(1-e)*(n-t)+2*e*(r-n)}function wt(t,n,r,e){var i=arguments.length>4&&void 0!==arguments[4]&&arguments[4],o=pt(t,n,null,r,e);return o||(o={x:mt(t.x,n.x,r.x,e),y:mt(t.y,n.y,r.y,e)}),i&&(o.a=xt(t,n,r,e)),o}function xt(t,n,r,e){return Math.atan2(bt(t.y,n.y,r.y,e),bt(t.x,n.x,r.x,e))}function At(t,n,r,e,i){var o=i*i;return i*o*(e-t+3*(n-r))+3*o*(t+r-2*n)+3*i*(n-t)+t}function kt(t,n,r,e,i){var o=1-i;return 3*(o*o*(n-t)+2*o*i*(r-n)+i*i*(e-r))}function _t(t,n,r,e,i){var o=arguments.length>5&&void 0!==arguments[5]&&arguments[5],u=pt(t,n,r,e,i);return u||(u={x:At(t.x,n.x,r.x,e.x,i),y:At(t.y,n.y,r.y,e.y,i)}),o&&(u.a=St(t,n,r,e,i)),u}function St(t,n,r,e,i){return Math.atan2(kt(t.y,n.y,r.y,e.y,i),kt(t.x,n.x,r.x,e.x,i))}function Ot(t,n,r){return t+(n-t)*r}function jt(t,n,r){var e=arguments.length>3&&void 0!==arguments[3]&&arguments[3],i={x:Ot(t.x,n.x,r),y:Ot(t.y,n.y,r)};return e&&(i.a=Pt(t,n)),i}function Pt(t,n){return Math.atan2(n.y-t.y,n.x-t.x)}function Mt(t,n,r){var e=arguments.length>3&&void 0!==arguments[3]&&arguments[3];if(Rt(n)){if(It(r))return wt(n,r.start,r,t,e)}else if(Rt(r)){if(n.end)return wt(n,n.end,r,t,e)}else{if(n.end)return r.start?_t(n,n.end,r.start,r,t,e):wt(n,n.end,r,t,e);if(r.start)return wt(n,r.start,r,t,e)}return jt(n,r,t,e)}function Et(t,n,r){var e=Mt(t,n,r,!0);return e.a=function(t){return arguments.length>1&&void 0!==arguments[1]&&arguments[1]?t+Math.PI:t}(e.a)/g,e}function Rt(t){return!t.type||\"corner\"===t.type}function It(t){return null!=t.start&&!Rt(t)}var Nt=new I;var Bt={f:ut,i:B},Ft={f:ut,i:T};function Tt(t,n,r){return t.map((function(t){return function(t,n,r){var e=t.v;if(!e||\"g\"!==e.t||e.s||!e.v||!e.r)return t;var i=r.getElementById(e.r),o=i&&i.querySelectorAll(\"stop\")||[];return e.s=e.v.map((function(t,n){var r=o[n]&&o[n].getAttribute(\"offset\");return{c:t,o:r=v(parseInt(r)/100)}})),delete e.v,t}(t,0,r)}))}var qt={gt:\"gradientTransform\",c:{x:\"cx\",y:\"cy\"},rd:\"r\",f:{x:\"x1\",y:\"y1\"},to:{x:\"x2\",y:\"y2\"}};function Lt(t,n,e,i,o,u,a,l){return Tt(t,0,l),n=function(t,n,r){for(var e,i,o,u=t.length-1,a={},l=0;l<=u;l++)(e=t[l]).e&&(e.e=n(e.e)),e.v&&\"g\"===(i=e.v).t&&i.r&&(o=r.getElementById(i.r))&&(a[i.r]={e:o,s:o.querySelectorAll(\"stop\")});return a}(t,i,l),function(i){var o=e(i,t,Ct);if(!o)return\"none\";if(\"c\"===o.t)return lt(o.v);if(\"g\"===o.t){if(!n[o.r])return ft(o.r);var u=n[o.r];return function(t,n){for(var r=t.s,e=r.length;e<n.length;e++){var i=r[r.length-1].cloneNode();i.id=Vt(i.id),t.e.appendChild(i),r=t.s=t.e.querySelectorAll(\"stop\")}for(var o=0,u=r.length,a=n.length-1;o<u;o++)r[o].setAttribute(\"stop-color\",lt(n[Math.min(o,a)].c)),r[o].setAttribute(\"offset\",n[Math.min(o,a)].o)}(u,o.s),Object.keys(qt).forEach((function(t){if(void 0!==o[t])if(\"object\"!==r(qt[t])){var n,e=\"gt\"===t?(n=o[t],Array.isArray(n)?\"matrix(\"+n.join(\" \")+\")\":\"\"):o[t],i=qt[t];u.e.setAttribute(i,e)}else Object.keys(qt[t]).forEach((function(n){if(void 0!==o[t][n]){var r=o[t][n],e=qt[t][n];u.e.setAttribute(e,r)}}))})),ft(o.r)}return\"none\"}}function Ct(t,r,e){if(0===t)return r;if(1===t)return e;if(r&&e){var i=r.t;if(i===e.t)switch(r.t){case\"c\":return{t:i,v:C(t,r.v,e.v)};case\"g\":if(r.r===e.r){var o={t:i,s:Dt(t,r.s,e.s),r:r.r};return r.gt&&e.gt&&(o.gt=function(t,n,r){var e=n.length;if(e!==r.length)return N(t,n,r);for(var i=new Array(e),o=0;o<e;o++)i[o]=B(t,n[o],r[o]);return i}(t,r.gt,e.gt)),r.c?(o.c=q(t,r.c,e.c),o.rd=F(t,r.rd,e.rd)):r.f&&(o.f=q(t,r.f,e.f),o.to=q(t,r.to,e.to)),o}}if(\"c\"===r.t&&\"g\"===e.t||\"c\"===e.t&&\"g\"===r.t){var u=\"c\"===r.t?r:e,a=\"g\"===r.t?n({},r):n({},e),l=a.s.map((function(t){return{c:u.v,o:t.o}}));return a.s=\"c\"===r.t?Dt(t,l,a.s):Dt(t,a.s,l),a}}return N(t,r,e)}function Dt(t,n,r){if(n.length===r.length)return n.map((function(n,e){return zt(t,n,r[e])}));for(var e=Math.max(n.length,r.length),i=[],o=0;o<e;o++){var u=zt(t,n[Math.min(o,n.length-1)],r[Math.min(o,r.length-1)]);i.push(u)}return i}function zt(t,n,r){return{o:T(t,n.o,r.o||0),c:C(t,n.c,r.c||{})}}function Vt(t){return t.replace(/-fill-([0-9]+)$/,(function(t,n){return\"-fill-\"+(+n+1)}))}var Gt={fill:Lt,\"fill-opacity\":Ft,stroke:Lt,\"stroke-opacity\":Ft,\"stroke-width\":Bt,\"stroke-dashoffset\":{f:ut,i:B},\"stroke-dasharray\":{f:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:\" \";return t&&t.length>0&&(t=t.map((function(t){return v(t,4)}))),at(t,n)},i:function(t,n,r){var e,i,o,u=n.length,a=r.length;if(u!==a)if(0===u)n=D(u=a,0);else if(0===a)a=u,r=D(u,0);else{var l=(o=(e=u)*(i=a)/function(t,n){for(var r;n;)r=n,n=t%n,t=r;return t||1}(e,i))<0?-o:o;n=z(n,Math.floor(l/u)),r=z(r,Math.floor(l/a)),u=a=l}for(var f=[],s=0;s<u;s++)f.push(v(F(t,n[s],r[s])));return f}},opacity:Ft,transform:function(t,n,e,i){if(!(t=function(t,n){if(!t||\"object\"!==r(t))return null;var e=!1;for(var i in t)t.hasOwnProperty(i)&&(t[i]&&t[i].length?(t[i].forEach((function(t){t.e&&(t.e=n(t.e))})),e=!0):delete t[i]);return e?t:null}(t,i)))return null;var o=function(r,i,o){var u=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return t[r]?e(i,t[r],o):n&&n[r]?n[r]:u};return n&&n.a&&t.o?function(n){var r=e(n,t.o,Et);return Nt.recomposeSelf(r,o(\"r\",n,B,0)+r.a,o(\"k\",n,q),o(\"s\",n,q),o(\"t\",n,q)).toString()}:function(t){return Nt.recomposeSelf(o(\"o\",t,Mt,null),o(\"r\",t,B,0),o(\"k\",t,q),o(\"s\",t,q),o(\"t\",t,q)).toString()}},r:Bt,\"#size\":ct,\"#radius\":st,_:function(t,n){if(Array.isArray(t))for(var r=0;r<t.length;r++)this[t[r]]=n;else this[t]=n}},Yt=function(t){!function(t,n){if(\"function\"!=typeof n&&null!==n)throw new TypeError(\"Super expression must either be null or a function\");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&l(t,n)}(r,t);var n=s(r);function r(){return e(this,r),n.apply(this,arguments)}return o(r,null,[{key:\"build\",value:function(t){var n=c(a(r),\"build\",this).call(this,t,Gt);if(!n)return null;n.el,n.options,function(t,n,r){t.play()}(n.player)}}]),r}(ot);return Yt.init(),Yt}));\n(function(s,i,o,w){w[o]=w[o]||{};w[o][s]=w[o][s]||[];w[o][s].push(i);})('5c7f360c',{\"root\":\"eULQaNdhcVB1\",\"animations\":[{\"elements\":{\"eULQaNdhcVB76\":{\"#size\":[{\"t\":500,\"v\":{\"width\":553.165229,\"height\":890.139349}},{\"t\":1000,\"v\":{\"width\":0,\"height\":890.139349}}]},\"eULQaNdhcVB77\":{\"#size\":[{\"t\":300,\"v\":{\"width\":553.165229,\"height\":890.139349}},{\"t\":1000,\"v\":{\"width\":0,\"height\":890.139349}}]},\"eULQaNdhcVB78\":{\"#size\":[{\"t\":500,\"v\":{\"width\":553.165229,\"height\":890.139349}},{\"t\":1000,\"v\":{\"width\":0,\"height\":890.139349}}]},\"eULQaNdhcVB79\":{\"#size\":[{\"t\":300,\"v\":{\"width\":553.165229,\"height\":890.139349}},{\"t\":1000,\"v\":{\"width\":0,\"height\":890.139349}}]},\"eULQaNdhcVB80\":{\"#size\":[{\"t\":0,\"v\":{\"width\":553.165229,\"height\":890.139349}},{\"t\":1000,\"v\":{\"width\":0,\"height\":890.139349}}]},\"eULQaNdhcVB81\":{\"#size\":[{\"t\":0,\"v\":{\"width\":553.165229,\"height\":890.139349}},{\"t\":1000,\"v\":{\"width\":0,\"height\":890.139349}}]}},\"s\":\"MIDA1M2NjNzNiNWM2YzGNiMmM1YmFIYzBiZjcRzOGJKODQ4MTgxODE3FZDczYjViYVNjM2I2YEjRjNWJhYzBiZjczOGRI4Mkw3ZDczYmFjNWIO2YzNiMmM1YmFjMGJmUYzQ3MzhiODI3ZDczYKjdiYWJkYmQ3M0o4YjYgyN2Q3M2IyYmRjNWIY2YzNiZmIyYzViNjczDOGJiN2IyYmRHYzRiNYjdkNzNjNEVjMVNiNmTI2SWI1QjczOGI4MmNTl\"}],\"options\":\"MBDAxMDg4MmY4MDgxNmLU3ZjgxVDJmNDcyZjcR5N2M2ZTcxMmY4YQ|\"},'__SVGATOR_PLAYER__',window)")]);
}

OndineModAnim.defaultProps = {"id":"eULQaNdhcVB1","viewBox":"0 0 1440 1024","shapeRendering":"geometricPrecision","textRendering":"geometricPrecision"};

module.exports = OndineModAnim;

OndineModAnim.default = OndineModAnim;


/***/ }),

/***/ 1998:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var React = __webpack_require__(2504);

function VaweSvg (props) {
    return React.createElement("svg",props,React.createElement("path",{"fill":"#30b8c6","fillOpacity":"1","d":"M0,32L40,37.3C80,43,160,53,240,74.7C320,96,400,128,480,133.3C560,139,640,117,720,112C800,107,880,117,960,133.3C1040,149,1120,171,1200,186.7C1280,203,1360,213,1400,218.7L1440,224L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"}));
}

VaweSvg.defaultProps = {"width":"100%","viewBox":"0 0 1440 320"};

module.exports = VaweSvg;

VaweSvg.default = VaweSvg;


/***/ }),

/***/ 6419:
/***/ ((module) => {

"use strict";
module.exports = require("/Users/mirkotorrisi/Documents/birsa-sonora/.cache/ssr-builtin-trackers/fs");

/***/ }),

/***/ 2503:
/***/ ((module) => {

"use strict";
module.exports = require("/Users/mirkotorrisi/Documents/birsa-sonora/.cache/ssr-builtin-trackers/http");

/***/ }),

/***/ 7959:
/***/ ((module) => {

"use strict";
module.exports = require("/Users/mirkotorrisi/Documents/birsa-sonora/.cache/ssr-builtin-trackers/https");

/***/ }),

/***/ 2871:
/***/ ((module) => {

"use strict";
module.exports = require("/Users/mirkotorrisi/Documents/birsa-sonora/node_modules/react-dom/server.js");

/***/ }),

/***/ 2504:
/***/ ((module) => {

"use strict";
module.exports = require("/Users/mirkotorrisi/Documents/birsa-sonora/node_modules/react/index.js");

/***/ }),

/***/ 9084:
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ 9719:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 1423:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 8311:
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ 4786:
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ 4269:
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ 6464:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 8884:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ }),

/***/ 1741:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"_args":[["gatsby@3.14.2","/Users/mirkotorrisi/Documents/birsa-sonora"]],"_from":"gatsby@3.14.2","_id":"gatsby@3.14.2","_inBundle":false,"_integrity":"sha512-1cjyfGkQ9zXtou+RhtYBprv8nYXTPuRIs4IFzBP373vBD1CdwabAC/R8kjqHfdvyNrorzg3sqRjLjActtfU8NA==","_location":"/gatsby","_phantomChildren":{},"_requested":{"type":"version","registry":true,"raw":"gatsby@3.14.2","name":"gatsby","escapedName":"gatsby","rawSpec":"3.14.2","saveSpec":null,"fetchSpec":"3.14.2"},"_requiredBy":["/"],"_resolved":"https://registry.npmjs.org/gatsby/-/gatsby-3.14.2.tgz","_spec":"3.14.2","_where":"/Users/mirkotorrisi/Documents/birsa-sonora","author":{"name":"Kyle Mathews","email":"mathews.kyle@gmail.com"},"bin":{"gatsby":"cli.js"},"bugs":{"url":"https://github.com/gatsbyjs/gatsby/issues"},"dependencies":{"@babel/code-frame":"^7.14.0","@babel/core":"^7.15.5","@babel/eslint-parser":"^7.15.4","@babel/helper-plugin-utils":"^7.14.5","@babel/parser":"^7.15.5","@babel/runtime":"^7.15.4","@babel/traverse":"^7.15.4","@babel/types":"^7.15.4","@gatsbyjs/reach-router":"^1.3.6","@gatsbyjs/webpack-hot-middleware":"^2.25.2","@nodelib/fs.walk":"^1.2.4","@pmmmwh/react-refresh-webpack-plugin":"^0.4.3","@types/http-proxy":"^1.17.4","@typescript-eslint/eslint-plugin":"^4.29.3","@typescript-eslint/parser":"^4.29.3","@vercel/webpack-asset-relocator-loader":"^1.6.0","address":"1.1.2","anser":"^2.0.1","autoprefixer":"^10.2.4","axios":"^0.21.1","babel-loader":"^8.2.2","babel-plugin-add-module-exports":"^1.0.4","babel-plugin-dynamic-import-node":"^2.3.3","babel-plugin-lodash":"^3.3.4","babel-plugin-remove-graphql-queries":"^3.14.0","babel-preset-gatsby":"^1.14.0","better-opn":"^2.0.0","bluebird":"^3.7.2","body-parser":"^1.19.0","browserslist":"^4.12.2","cache-manager":"^2.11.1","chalk":"^4.1.2","chokidar":"^3.5.2","common-tags":"^1.8.0","compression":"^1.7.4","cookie":"^0.4.1","core-js":"^3.17.2","cors":"^2.8.5","css-loader":"^5.0.1","css-minimizer-webpack-plugin":"^2.0.0","css.escape":"^1.5.1","date-fns":"^2.14.0","debug":"^3.2.7","deepmerge":"^4.2.2","del":"^5.1.0","detect-port":"^1.3.0","devcert":"^1.1.3","dotenv":"^8.2.0","eslint":"^7.32.0","eslint-config-react-app":"^6.0.0","eslint-plugin-flowtype":"^5.9.2","eslint-plugin-graphql":"^4.0.0","eslint-plugin-import":"^2.24.2","eslint-plugin-jsx-a11y":"^6.4.1","eslint-plugin-react":"^7.25.1","eslint-plugin-react-hooks":"^4.2.0","eslint-webpack-plugin":"^2.5.4","event-source-polyfill":"^1.0.15","execa":"^5.1.1","express":"^4.17.1","express-graphql":"^0.12.0","fastest-levenshtein":"^1.0.12","fastq":"^1.10.0","file-loader":"^6.2.0","find-cache-dir":"^3.3.1","fs-exists-cached":"1.0.0","fs-extra":"^10.0.0","gatsby-cli":"^3.14.1","gatsby-core-utils":"^2.14.0","gatsby-graphiql-explorer":"^1.14.0","gatsby-legacy-polyfills":"^1.14.0","gatsby-link":"^3.14.0","gatsby-plugin-page-creator":"^3.14.0","gatsby-plugin-typescript":"^3.14.0","gatsby-plugin-utils":"^1.14.0","gatsby-react-router-scroll":"^4.14.0","gatsby-telemetry":"^2.14.0","gatsby-worker":"^0.5.0","glob":"^7.1.6","got":"^11.8.2","graphql":"^15.4.0","graphql-compose":"~7.25.0","graphql-playground-middleware-express":"^1.7.18","hasha":"^5.2.0","http-proxy":"^1.18.1","invariant":"^2.2.4","is-relative":"^1.0.0","is-relative-url":"^3.0.0","joi":"^17.2.1","json-loader":"^0.5.7","latest-version":"5.1.0","lodash":"^4.17.21","md5-file":"^5.0.0","meant":"^1.0.1","memoizee":"^0.4.15","micromatch":"^4.0.2","mime":"^2.4.6","mini-css-extract-plugin":"1.6.2","mitt":"^1.2.0","moment":"^2.27.0","multer":"^1.4.2","normalize-path":"^3.0.0","null-loader":"^4.0.1","opentracing":"^0.14.4","p-defer":"^3.0.0","parseurl":"^1.3.3","path-to-regexp":"0.1.7","physical-cpu-count":"^2.0.0","platform":"^1.3.6","postcss":"^8.3.5","postcss-flexbugs-fixes":"^5.0.2","postcss-loader":"^5.0.0","prompts":"^2.3.2","prop-types":"^15.7.2","query-string":"^6.13.1","raw-loader":"^4.0.2","react-dev-utils":"^11.0.3","react-refresh":"^0.9.0","redux":"^4.0.5","redux-thunk":"^2.3.0","resolve-from":"^5.0.0","semver":"^7.3.5","shallow-compare":"^1.2.2","signal-exit":"^3.0.3","slugify":"^1.4.4","socket.io":"3.1.1","socket.io-client":"3.1.1","source-map":"^0.7.3","source-map-support":"^0.5.19","st":"^2.0.0","stack-trace":"^0.0.10","string-similarity":"^1.2.2","strip-ansi":"^5.2.0","style-loader":"^2.0.0","terser-webpack-plugin":"^5.1.1","tmp":"^0.2.1","true-case-path":"^2.2.1","type-of":"^2.0.1","url-loader":"^4.1.1","uuid":"3.4.0","v8-compile-cache":"^2.2.0","webpack":"^5.35.0","webpack-dev-middleware":"^4.1.0","webpack-merge":"^5.7.3","webpack-stats-plugin":"^1.0.3","webpack-virtual-modules":"^0.3.2","xstate":"^4.11.0","yaml-loader":"^0.6.0"},"description":"Blazing fast modern site generator for React","devDependencies":{"@babel/cli":"^7.15.4","@babel/helper-plugin-utils":"^7.14.5","@babel/register":"^7.15.3","@types/eslint":"^7.2.6","@types/micromatch":"^4.0.1","@types/normalize-path":"^3.0.0","@types/reach__router":"^1.3.5","@types/react-dom":"^17.0.9","@types/semver":"^7.3.8","@types/signal-exit":"^3.0.0","@types/string-similarity":"^4.0.0","@types/tmp":"^0.2.0","@types/webpack-virtual-modules":"^0.1.1","babel-preset-gatsby-package":"^1.14.0","copyfiles":"^2.3.0","cross-env":"^7.0.3","documentation":"^13.1.0","enhanced-resolve":"^5.8.2","lmdb-store":"~1.5.5","react":"^16.12.0","react-dom":"^16.12.0","rimraf":"^3.0.2","typescript":"^4.3.5","xhr-mock":"^2.5.1","zipkin":"^0.22.0","zipkin-javascript-opentracing":"^3.0.0","zipkin-transport-http":"^0.22.0"},"engines":{"node":">=12.13.0"},"files":["apis.json","ipc.json","cache-dir/","cli.js","dist/","gatsby-admin-public/","graphql.js","graphql.d.ts","reporter.js","reporter.d.ts","index.d.ts","scripts/postinstall.js","utils.js","internal.js","internal.d.ts","!**/__tests__/"],"gitHead":"ea4fb54301b2cc5b5f52ef27ebe39cd70fffef33","homepage":"https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby#readme","keywords":["blog","generator","jekyll","markdown","react","ssg","website"],"license":"MIT","main":"cache-dir/commonjs/gatsby-browser-entry.js","module":"cache-dir/gatsby-browser-entry.js","name":"gatsby","peerDependencies":{"react":"^16.9.0 || ^17.0.0","react-dom":"^16.9.0 || ^17.0.0"},"repository":{"type":"git","url":"git+https://github.com/gatsbyjs/gatsby.git"},"resolutions":{"graphql":"^15.5.1","@mdx-js/mdx":"^2.0.0-next.3","@mdx-js/react":"^2.0.0-next.3","@mdx-js/runtime":"^2.0.0-next.3","remark-mdx":"^2.0.0-next.3","remark-mdxjs":"^2.0.0-next.3"},"scripts":{"build":"npm run build:types && npm run build:src && npm run build:internal-plugins && npm run build:rawfiles && npm run build:cjs","build:cjs":"babel cache-dir --out-dir cache-dir/commonjs --ignore \\"**/__tests__\\" --ignore \\"**/__mocks__\\" && copyfiles -u 1 cache-dir/**/*.json cache-dir/commonjs","build:internal-plugins":"copyfiles -u 1 src/internal-plugins/**/package.json dist","build:rawfiles":"copyfiles -u 1 src/internal-plugins/**/raw_* dist","build:src":"babel src --out-dir dist --source-maps --verbose --ignore \\"**/gatsby-cli.js,src/internal-plugins/dev-404-page/raw_dev-404-page.js,**/__tests__,**/__mocks__\\" --extensions \\".ts,.js\\"","build:types":"tsc --emitDeclarationOnly --declaration --declarationDir dist && node scripts/check-declaration.js","clean-test-bundles":"find test/ -type f -name bundle.js* -exec rm -rf {} +","postbuild":"node scripts/output-api-file.js && yarn workspace gatsby-admin build","postinstall":"node scripts/postinstall.js","prebuild":"rimraf dist && rimraf cache-dir/commonjs","prepare":"cross-env NODE_ENV=production npm run build","typecheck":"tsc --noEmit","watch":"rimraf dist && mkdir dist && npm run build:internal-plugins && npm run build:rawfiles && npm run build:src -- --watch"},"types":"index.d.ts","version":"3.14.2","yargs":{"boolean-negation":false}}');

/***/ }),

/***/ 9804:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"polyfill":["/polyfill-ebc5c18821b9d58bbece.js"],"app":["/app-efe050b83a297482f1e5.js"],"component---src-pages-404-js":["/component---src-pages-404-js-2497fcb10039df133ba7.js"],"component---src-pages-index-js":["/component---src-pages-index-js-8041603cc5a27e9ebbde.js"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sanitizeComponents": () => (/* binding */ sanitizeComponents),
/* harmony export */   "default": () => (/* binding */ staticPage)
/* harmony export */ });
const React=__webpack_require__(2504);const path=__webpack_require__(1423);const{renderToString,renderToStaticMarkup,pipeToNodeWritable}=__webpack_require__(2871);const{ServerLocation,Router,isRedirect}=__webpack_require__(3631);const merge=__webpack_require__(9996);const{StaticQueryContext}=__webpack_require__(2031);const fs=__webpack_require__(6419);const{WritableAsPromise}=__webpack_require__(1945);const{RouteAnnouncerProps}=__webpack_require__(5394);const{apiRunner,apiRunnerAsync}=__webpack_require__(9874);const syncRequires=__webpack_require__(885);const{version:gatsbyVersion}=__webpack_require__(1741);const{grabMatchParams}=__webpack_require__(8451);const chunkMapping=__webpack_require__(9804);// we want to force posix-style joins, so Windows doesn't produce backslashes for urls
const{join}=path.posix;// const testRequireError = require("./test-require-error")
// For some extremely mysterious reason, webpack adds the above module *after*
// this module so that when this code runs, testRequireError is undefined.
// So in the meantime, we'll just inline it.
const testRequireError=(moduleName,err)=>{const regex=new RegExp(`Error: Cannot find module\\s.${moduleName}`);const firstLine=err.toString().split(`\n`)[0];return regex.test(firstLine);};let Html;try{Html=__webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../src/html'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));}catch(err){if(testRequireError(`../src/html`,err)){Html=__webpack_require__(5677);}else{throw err;}}Html=Html&&Html.__esModule?Html.default:Html;const getPageDataPath=path=>{const fixedPagePath=path===`/`?`index`:path;return join(`page-data`,fixedPagePath,`page-data.json`);};const getPageDataUrl=pagePath=>{const pageDataPath=getPageDataPath(pagePath);return`${""}/${pageDataPath}`;};const getStaticQueryPath=hash=>join(`page-data`,`sq`,`d`,`${hash}.json`);const getStaticQueryUrl=hash=>`${""}/${getStaticQueryPath(hash)}`;const getAppDataUrl=()=>`${""}/${join(`page-data`,`app-data.json`)}`;const createElement=React.createElement;const sanitizeComponents=components=>{const componentsArray=[].concat(components).flat(Infinity).filter(Boolean);return componentsArray.map(component=>{// Ensure manifest is always loaded from content server
// And not asset server when an assetPrefix is used
if(false){}return component;});};function deepMerge(a,b){const combineMerge=(target,source,options)=>{const destination=target.slice();source.forEach((item,index)=>{if(typeof destination[index]===`undefined`){destination[index]=options.cloneUnlessOtherwiseSpecified(item,options);}else if(options.isMergeableObject(item)){destination[index]=merge(target[index],item,options);}else if(target.indexOf(item)===-1){destination.push(item);}});return destination;};return merge(a,b,{arrayMerge:combineMerge});}async function staticPage({pagePath,pageData,staticQueryContext,styles,scripts,reversedStyles,reversedScripts,inlinePageData=false}){// for this to work we need this function to be sync or at least ensure there is single execution of it at a time
global.unsafeBuiltinUsage=[];try{let bodyHtml=``;let headComponents=[/*#__PURE__*/React.createElement("meta",{name:"generator",content:`Gatsby ${gatsbyVersion}`,key:`generator-${gatsbyVersion}`})];let htmlAttributes={};let bodyAttributes={};let preBodyComponents=[];let postBodyComponents=[];let bodyProps={};function loadPageDataSync(_pagePath){if(_pagePath===pagePath){// no need to use fs if we are asking for pageData of current page
return pageData;}const pageDataPath=getPageDataPath(_pagePath);const pageDataFile=join(process.cwd(),`public`,pageDataPath);try{// deprecation notice
const myErrorHolder={name:`Usage of loadPageDataSync for page other than currently generated page disables incremental html generation in future builds`};Error.captureStackTrace(myErrorHolder,loadPageDataSync);global.unsafeBuiltinUsage.push(myErrorHolder.stack);const pageDataJson=fs.readFileSync(pageDataFile);return JSON.parse(pageDataJson);}catch(error){// not an error if file is not found. There's just no page data
return null;}}const replaceBodyHTMLString=body=>{bodyHtml=body;};const setHeadComponents=components=>{headComponents=headComponents.concat(sanitizeComponents(components));};const setHtmlAttributes=attributes=>{// TODO - we should remove deep merges
htmlAttributes=deepMerge(htmlAttributes,attributes);};const setBodyAttributes=attributes=>{// TODO - we should remove deep merges
bodyAttributes=deepMerge(bodyAttributes,attributes);};const setPreBodyComponents=components=>{preBodyComponents=preBodyComponents.concat(sanitizeComponents(components));};const setPostBodyComponents=components=>{postBodyComponents=postBodyComponents.concat(sanitizeComponents(components));};const setBodyProps=props=>{// TODO - we should remove deep merges
bodyProps=deepMerge({},bodyProps,props);};const getHeadComponents=()=>headComponents;const replaceHeadComponents=components=>{headComponents=sanitizeComponents(components);};const getPreBodyComponents=()=>preBodyComponents;const replacePreBodyComponents=components=>{preBodyComponents=sanitizeComponents(components);};const getPostBodyComponents=()=>postBodyComponents;const replacePostBodyComponents=components=>{postBodyComponents=sanitizeComponents(components);};const pageDataUrl=getPageDataUrl(pagePath);const{componentChunkName,staticQueryHashes=[]}=pageData;const staticQueryUrls=staticQueryHashes.map(getStaticQueryUrl);class RouteHandler extends React.Component{render(){var _pageData$result,_pageData$result$page;const props={...this.props,...pageData.result,params:{...grabMatchParams(this.props.location.pathname),...(((_pageData$result=pageData.result)===null||_pageData$result===void 0?void 0:(_pageData$result$page=_pageData$result.pageContext)===null||_pageData$result$page===void 0?void 0:_pageData$result$page.__params)||{})}};const pageElement=createElement(syncRequires.components[componentChunkName],props);const wrappedPage=apiRunner(`wrapPageElement`,{element:pageElement,props},pageElement,({result})=>{return{element:result,props};}).pop();return wrappedPage;}}const routerElement=/*#__PURE__*/React.createElement(ServerLocation,{url:`${""}${pagePath}`},/*#__PURE__*/React.createElement(Router,{id:"gatsby-focus-wrapper",baseuri:""},/*#__PURE__*/React.createElement(RouteHandler,{path:"/*"})),/*#__PURE__*/React.createElement("div",RouteAnnouncerProps));const bodyComponent=/*#__PURE__*/React.createElement(StaticQueryContext.Provider,{value:staticQueryContext},apiRunner(`wrapRootElement`,{element:routerElement,pathname:pagePath},routerElement,({result})=>{return{element:result,pathname:pagePath};}).pop());// Let the site or plugin render the page component.
await apiRunnerAsync(`replaceRenderer`,{bodyComponent,replaceBodyHTMLString,setHeadComponents,setHtmlAttributes,setBodyAttributes,setPreBodyComponents,setPostBodyComponents,setBodyProps,pathname:pagePath,pathPrefix:""});// If no one stepped up, we'll handle it.
if(!bodyHtml){try{// react 18 enabled
if(pipeToNodeWritable){const writableStream=new WritableAsPromise();const{startWriting}=pipeToNodeWritable(bodyComponent,writableStream,{onCompleteAll(){startWriting();},onError(){}});bodyHtml=await writableStream;}else{bodyHtml=renderToString(bodyComponent);}}catch(e){// ignore @reach/router redirect errors
if(!isRedirect(e))throw e;}}apiRunner(`onRenderBody`,{setHeadComponents,setHtmlAttributes,setBodyAttributes,setPreBodyComponents,setPostBodyComponents,setBodyProps,pathname:pagePath,loadPageDataSync,bodyHtml,scripts,styles,pathPrefix:""});reversedScripts.forEach(script=>{// Add preload/prefetch <link>s for scripts.
headComponents.push(/*#__PURE__*/React.createElement("link",{as:"script",rel:script.rel,key:script.name,href:`${""}/${script.name}`}));});if(pageData&&!inlinePageData){headComponents.push(/*#__PURE__*/React.createElement("link",{as:"fetch",rel:"preload",key:pageDataUrl,href:pageDataUrl,crossOrigin:"anonymous"}));}staticQueryUrls.forEach(staticQueryUrl=>headComponents.push(/*#__PURE__*/React.createElement("link",{as:"fetch",rel:"preload",key:staticQueryUrl,href:staticQueryUrl,crossOrigin:"anonymous"})));const appDataUrl=getAppDataUrl();if(appDataUrl){headComponents.push(/*#__PURE__*/React.createElement("link",{as:"fetch",rel:"preload",key:appDataUrl,href:appDataUrl,crossOrigin:"anonymous"}));}reversedStyles.forEach(style=>{// Add <link>s for styles that should be prefetched
// otherwise, inline as a <style> tag
if(style.rel===`prefetch`){headComponents.push(/*#__PURE__*/React.createElement("link",{as:"style",rel:style.rel,key:style.name,href:`${""}/${style.name}`}));}else{headComponents.unshift(/*#__PURE__*/React.createElement("style",{"data-href":`${""}/${style.name}`,"data-identity":`gatsby-global-css`,dangerouslySetInnerHTML:{__html:style.content}}));}});// Add page metadata for the current page
const windowPageData=`/*<![CDATA[*/window.pagePath="${pagePath}";${inlinePageData?`window.pageData=${JSON.stringify(pageData)};`:``}/*]]>*/`;postBodyComponents.push(/*#__PURE__*/React.createElement("script",{key:`script-loader`,id:`gatsby-script-loader`,dangerouslySetInnerHTML:{__html:windowPageData}}));// Add chunk mapping metadata
const scriptChunkMapping=`/*<![CDATA[*/window.___chunkMapping=${JSON.stringify(chunkMapping)};/*]]>*/`;postBodyComponents.push(/*#__PURE__*/React.createElement("script",{key:`chunk-mapping`,id:`gatsby-chunk-mapping`,dangerouslySetInnerHTML:{__html:scriptChunkMapping}}));let bodyScripts=[];if(chunkMapping[`polyfill`]){chunkMapping[`polyfill`].forEach(script=>{const scriptPath=`${""}${script}`;bodyScripts.push(/*#__PURE__*/React.createElement("script",{key:scriptPath,src:scriptPath,noModule:true}));});}// Filter out prefetched bundles as adding them as a script tag
// would force high priority fetching.
bodyScripts=bodyScripts.concat(scripts.filter(s=>s.rel!==`prefetch`).map(s=>{const scriptPath=`${""}/${JSON.stringify(s.name).slice(1,-1)}`;return/*#__PURE__*/React.createElement("script",{key:scriptPath,src:scriptPath,async:true});}));postBodyComponents.push(...bodyScripts);apiRunner(`onPreRenderHTML`,{getHeadComponents,replaceHeadComponents,getPreBodyComponents,replacePreBodyComponents,getPostBodyComponents,replacePostBodyComponents,pathname:pagePath,pathPrefix:""});const html=`<!DOCTYPE html>${renderToStaticMarkup(/*#__PURE__*/React.createElement(Html,Object.assign({},bodyProps,{headComponents:headComponents,htmlAttributes:htmlAttributes,bodyAttributes:bodyAttributes,preBodyComponents:preBodyComponents,postBodyComponents:postBodyComponents,body:bodyHtml,path:pagePath})))}`;return{html,unsafeBuiltinsUsage:global.unsafeBuiltinUsage};}catch(e){e.unsafeBuiltinsUsage=global.unsafeBuiltinUsage;throw e;}}
})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=render-page.js.map