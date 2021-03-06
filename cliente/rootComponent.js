/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(7)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
			STATE_NEW : 0,
			STATE_READ : 1,
			STATE_UPDATE : 2
});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_root_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ca5e97f0_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_root_vue__ = __webpack_require__(34);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(5)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_root_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ca5e97f0_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_root_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components\\root.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] root.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ca5e97f0", Component.options)
  } else {
    hotAPI.reload("data-v-ca5e97f0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("20195051", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ca5e97f0\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./root.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ca5e97f0\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./root.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__masterPeliculas_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__masterEntradas_vue__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__detailPeliculas_vue__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__detailEntradas_vue__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tabs_vue__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants_js__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ __webpack_exports__["a"] = ({
	components: {
		masterPeliculas: __WEBPACK_IMPORTED_MODULE_0__masterPeliculas_vue__["a" /* default */],
		masterEntradas: __WEBPACK_IMPORTED_MODULE_1__masterEntradas_vue__["a" /* default */],
		detailPeliculas: __WEBPACK_IMPORTED_MODULE_2__detailPeliculas_vue__["a" /* default */],
		detailEntradas: __WEBPACK_IMPORTED_MODULE_3__detailEntradas_vue__["a" /* default */],
		tabs: __WEBPACK_IMPORTED_MODULE_4__tabs_vue__["a" /* default */]
	},
	data() {
		return {
			showDetail: false,
			enableButtons: false,
			itemIndex: "",
			detailMode: __WEBPACK_IMPORTED_MODULE_5__constants_js__["a" /* default */].STATE_NEW,
			menuChoice: "Pelicula",
			read: true
		};
	},
	computed: {
		showDetailEntradas: function () {
			return this.showDetail && this.menuChoice == "Entrada";
		},
		showDetailPeliculas: function () {
			return this.showDetail && this.menuChoice == "Pelicula";
		}
	},
	methods: {
		setNew(newState) {
			this.showDetail = true;
			this.enableButtons = false;
			this.read = false;
			this.detailMode = __WEBPACK_IMPORTED_MODULE_5__constants_js__["a" /* default */].STATE_NEW;
		},
		readIndex(index) {
			this.itemIndex = index;
			this.showDetail = true;
			this.detailMode = __WEBPACK_IMPORTED_MODULE_5__constants_js__["a" /* default */].STATE_READ;
			this.enableButtons = false;
		},
		updateIndex(index) {
			this.itemIndex = index;
			this.showDetail = true;
			this.enableButtons = false;
			this.detailMode = __WEBPACK_IMPORTED_MODULE_5__constants_js__["a" /* default */].STATE_UPDATE;
		},
		changeTab(option) {
			this.menuChoice = option;
			this.showDetail = false;
		}

	}
});

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_masterPeliculas_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_45277902_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_masterPeliculas_vue__ = __webpack_require__(13);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(10)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_masterPeliculas_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_45277902_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_masterPeliculas_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components\\masterPeliculas.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] masterPeliculas.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-45277902", Component.options)
  } else {
    hotAPI.reload("data-v-45277902", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("0ac17b96", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-45277902\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./masterPeliculas.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-45277902\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./masterPeliculas.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\ndiv.master-div-row {\n\tborder-size:1px;\n\tborder-style:solid;\n\tborder-color:black;\n\tmargin:10px;\n\tpadding:3px;\n}\ndiv.master-div {\n\twidth:70%;\n\tfloat: left;\n}\ndiv.selected {\n\tbackground-color: #81F7F3;\n}\np.nameParagraph {\n\tdisplay:inline-block;\n}\nbutton.masterButton {\n\theight:50px;\n\twidth:50px;\n\talign-content: center;\n}\nimg.buttonImage {\n\theight:30px;\n\twidth:30px\t;\n}\n", ""]);

// exports


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var baseURL = "http://localhost:53765/api/";
/* harmony default export */ __webpack_exports__["a"] = ({
	name: 'master',
	data() {
		return {
			lista: []

		};
	},
	props: ['menuChoice'],
	computed: {
		computedClass() {}
	},
	methods: {
		makeGetListRequest: function () {
			$.ajax({
				url: baseURL + this.menuChoice,
				method: "GET" }).done(this.submitGetListValues);
		},
		submitGetListValues: function (datos) {
			this.lista = datos;
		},
		deleteItem: function (index) {
			$.ajax({ url: baseURL + this.menuChoice + "/" + index,
				method: "DELETE" }).done(this.makeGetListRequest).fail(function () {
				alert("ELEMENTO NO BORRADO");
			});
		},
		newDetail: function () {
			this.$emit('isNew', true);
		},
		readDetail: function (index) {
			this.$emit('readDetail', index);
		},
		updateDetail: function (index) {
			this.$emit('updateDetail', index);
		}

	},
	created() {
		this.makeGetListRequest();
	}

});

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "master-div",
    attrs: {
      "id": "Master"
    }
  }, [_c('h1', [_vm._v("MASTER: " + _vm._s(_vm.menuChoice))]), _vm._v(" "), _vm._l((_vm.lista), function(item, index) {
    return _c('div', {
      staticClass: "master-div-row",
      class: _vm.computedClass,
      on: {
        "click": function($event) {
          _vm.readDetail(item.Id)
        }
      }
    }, [_c('p', {
      staticClass: "nameParagraph"
    }, [_vm._v(_vm._s(index) + "    ")]), _vm._v(" "), _c('p', {
      staticClass: "nameParagraph"
    }, [_vm._v(_vm._s(item.Nombre))]), _vm._v(" "), _c('div', {
      staticClass: "rowButtonsContainer"
    }, [_c('button', {
      staticClass: "masterButton",
      on: {
        "click": function($event) {
          _vm.updateDetail(item.Id)
        }
      }
    }, [_c('img', {
      staticClass: "buttonImage",
      attrs: {
        "src": "images/update.png"
      }
    })]), _vm._v(" "), _c('button', {
      staticClass: "masterButton",
      on: {
        "click": function($event) {
          _vm.deleteItem(item.Id)
        }
      }
    }, [_c('img', {
      staticClass: "buttonImage",
      attrs: {
        "src": "images/delete.png"
      }
    })])])])
  }), _vm._v(" "), _c('button', {
    staticClass: "masterButton buttonNew",
    on: {
      "click": function($event) {
        _vm.newDetail()
      }
    }
  }, [_c('img', {
    staticClass: "buttonImage",
    attrs: {
      "src": "images/new.png"
    }
  })])], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-45277902", esExports)
  }
}

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_masterEntradas_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1311dd24_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_masterEntradas_vue__ = __webpack_require__(18);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(15)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_masterEntradas_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1311dd24_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_masterEntradas_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components\\masterEntradas.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] masterEntradas.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1311dd24", Component.options)
  } else {
    hotAPI.reload("data-v-1311dd24", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(16);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("3d7dc1ba", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1311dd24\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./masterEntradas.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1311dd24\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./masterEntradas.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\ndiv.master-div-row {\n\tborder-size:1px;\n\tborder-style:solid;\n\tborder-color:black;\n\tmargin:10px;\n\tpadding:3px;\n}\ndiv.master-div {\n\twidth:70%;\n\tfloat: left;\n}\ndiv.selected {\n\tbackground-color: #81F7F3;\n}\np.nameParagraph {\n\tdisplay:inline-block;\n}\nbutton.masterButton {\n\theight:50px;\n\twidth:50px;\n\talign-content: center;\n}\nimg.buttonImage {\n\theight:30px;\n\twidth:30px\t;\n}\n", ""]);

// exports


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var baseURL = "http://localhost:53765/api/";
/* harmony default export */ __webpack_exports__["a"] = ({
	name: 'master',
	data() {
		return {
			lista: []

		};
	},
	props: ['menuChoice'],
	computed: {
		computedClass() {}
	},
	methods: {
		makeGetListRequest: function () {
			$.ajax({
				url: baseURL + this.menuChoice,
				method: "GET" }).done(this.submitGetListValues);
		},
		submitGetListValues: function (datos) {
			this.lista = datos;
		},
		deleteItem: function (index) {
			$.ajax({ url: baseURL + this.menuChoice + "/" + index,
				method: "DELETE" }).done(this.makeGetListRequest).fail(function () {
				alert("ELEMENTO NO BORRADO");
			});
		},
		newDetail: function () {
			this.$emit('isNew', true);
		},
		readDetail: function (index) {
			this.$emit('readDetail', index);
		},
		updateDetail: function (index) {
			this.$emit('updateDetail', index);
		}

	},
	created() {
		this.makeGetListRequest();
	}

});

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "master-div",
    attrs: {
      "id": "Master"
    }
  }, [_c('h1', [_vm._v("MASTER: " + _vm._s(_vm.menuChoice))]), _vm._v(" "), _vm._l((_vm.lista), function(item, index) {
    return _c('div', {
      staticClass: "master-div-row",
      class: _vm.computedClass
    }, [_c('p', {
      staticClass: "nameParagraph"
    }, [_vm._v(_vm._s(index) + "    ")]), _vm._v(" "), _c('p', {
      staticClass: "nameParagraph"
    }, [_vm._v(_vm._s(item.Pelicula))]), _vm._v(" "), _c('p', {
      staticClass: "nameParagraph"
    }, [_vm._v(_vm._s(item.Hora))]), _vm._v(" "), _c('div', {
      staticClass: "rowButtonsContainer"
    }, [_c('button', {
      staticClass: "masterButton",
      on: {
        "click": function($event) {
          _vm.readDetail(item.Id)
        }
      }
    }, [_c('img', {
      staticClass: "buttonImage",
      attrs: {
        "src": "images/read.png"
      }
    })]), _vm._v(" "), _c('button', {
      staticClass: "masterButton",
      on: {
        "click": function($event) {
          _vm.updateDetail(item.Id)
        }
      }
    }, [_c('img', {
      staticClass: "buttonImage",
      attrs: {
        "src": "images/update.png"
      }
    })]), _vm._v(" "), _c('button', {
      staticClass: "masterButton",
      on: {
        "click": function($event) {
          _vm.deleteItem(item.Id)
        }
      }
    }, [_c('img', {
      staticClass: "buttonImage",
      attrs: {
        "src": "images/delete.png"
      }
    })])])])
  }), _vm._v(" "), _c('button', {
    staticClass: "masterButton buttonNew",
    on: {
      "click": function($event) {
        _vm.newDetail()
      }
    }
  }, [_c('img', {
    staticClass: "buttonImage",
    attrs: {
      "src": "images/new.png"
    }
  })])], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1311dd24", esExports)
  }
}

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_detailPeliculas_vue__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_68fa311a_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_detailPeliculas_vue__ = __webpack_require__(23);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(20)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-68fa311a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_detailPeliculas_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_68fa311a_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_detailPeliculas_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components\\detailPeliculas.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] detailPeliculas.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-68fa311a", Component.options)
  } else {
    hotAPI.reload("data-v-68fa311a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(21);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("81ccfdcc", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-68fa311a\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./detailPeliculas.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-68fa311a\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./detailPeliculas.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* CSS here\n * by including `scoped`, we ensure that all CSS\n * is scoped to this component!\n */\n", ""]);

// exports


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_js__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var baseURL = "http://localhost:53765/api/";

/* harmony default export */ __webpack_exports__["a"] = ({
	name: "Detail",
	data() {
		return {
			currentPelicula: {
				Titulo: undefined,
				Director: undefined,
				Duracion: "",
				Pais: undefined

			},
			previousPelicula: {
				Titulo: undefined,
				Director: undefined,
				Duracion: "",
				Pais: undefined }
		};
	},
	props: ['readIndex', 'enableButtons', 'detailMode', 'menuChoice', 'read'],
	computed: {
		enableCleanButton: function () {
			if (this.detailMode == __WEBPACK_IMPORTED_MODULE_0__constants_js__["a" /* default */].STATE_READ) {
				return true;
			} else {
				if (this.currentPelicula.Titulo != undefined) {
					return false;
				} else if (this.currentPelicula.Director != undefined) {
					return false;
				} else if (this.currentPelicula.Duracion != "") {
					return false;
				} else if (this.currentPelicula.Pais != undefined) {
					return false;
				} else {
					return true;
				}
			}
		},
		enableResetButton: function () {
			if (this.detailMode == __WEBPACK_IMPORTED_MODULE_0__constants_js__["a" /* default */].STATE_READ) {
				return true;
			} else {
				return false;
			}
		},
		enableAcceptButton: function () {
			if (this.detailMode == __WEBPACK_IMPORTED_MODULE_0__constants_js__["a" /* default */].STATE_READ) {
				return true;
			} else if (this.detailMode == __WEBPACK_IMPORTED_MODULE_0__constants_js__["a" /* default */].STATE_UPDATE) {

				if (this.currentPelicula.Titulo != undefined) {
					return false;
				} else if (this.currentPelicula.Director != undefined) {
					return false;
				} else if (this.currentPelicula.Duracion != "") {
					return false;
				} else if (this.currentPelicula.Pais != undefined) {
					return false;
				} else {
					return true;
				}
			}
		},
		updateMode: function () {
			if (this.detailMode == __WEBPACK_IMPORTED_MODULE_0__constants_js__["a" /* default */].STATE_READ) {
				this.readDetail();
			} else if (this.detailMode == __WEBPACK_IMPORTED_MODULE_0__constants_js__["a" /* default */].STATE_NEW) {
				this.currentPelicula = {};
				this.previousPelicula = {};
			}
		}

	},
	methods: {
		// all code for my component goes here
		makeGetRequest: function () {
			$.ajax({ url: baseURL + this.menuChoice + "/" + this.readIndex,
				method: "GET" }).done(this.submitDetailValues);
		},
		submitDetailValues: function (data) {
			this.currentPelicula = data;
		},
		readDetail: function () {
			this.makeGetRequest(this.readIndex);
			this.read = true;
		},
		updateDetail: function (index) {
			this.makeGetRequest(index);
			this.previousPerson.index = this.currentPerson.index;
			this.previousPerson.name = this.currentPerson.name;
			this.previousPerson.surname = this.currentPerson.surname;
			this.previousPerson.age = this.currentPerson.age;
			this.read = false;
		},
		newDetail: function (index) {
			this.read = false;
			this.currentPerson.index = "";
			this.currentPerson.name = "";
			this.currentPerson.surname = "";
			this.currentPerson.age = "";
		},
		buttonClean: function () {
			this.currentPelicula = {};
			this.previousPelicula = {};
		},
		deleteItem: function (index) {
			$.ajax({ url: baseURL + this.menuChoice + "/" + index,
				method: "DELETE" }).done(this.makeGetListRequest).fail(function () {
				alert("ELEMENTO NO BORRADO");
			});
		}
	},
	mounted() {
		if (this.detailMode == __WEBPACK_IMPORTED_MODULE_0__constants_js__["a" /* default */].STATE_READ) {
			this.readDetail();
		} else if (this.detailMode == __WEBPACK_IMPORTED_MODULE_0__constants_js__["a" /* default */].STATE_NEW) {
			this.currentPelicula = { Titulo: undefined,
				Director: undefined,
				Duracion: 0,
				Pais: undefined };
			this.previousPelicula = { Titulo: undefined,
				Director: undefined,
				Duracion: 0,
				Pais: undefined };
		}
	}
});

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "detail-div",
    attrs: {
      "id": "Detail"
    }
  }, [_c('h1', [_vm._v("DETAIL:")]), _vm._v(" "), _c('div', {
    staticClass: "Formulario",
    attrs: {
      "id": "FormularioUsuarios"
    }
  }, [_c('label', [_vm._v("Titulo:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.currentPelicula.Titulo),
      expression: "currentPelicula.Titulo"
    }],
    attrs: {
      "disabled": _vm.read,
      "type": "text",
      "id": "nombreInput",
      "placeholder": "Titulo"
    },
    domProps: {
      "value": (_vm.currentPelicula.Titulo)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.currentPelicula.Titulo = $event.target.value
      }
    }
  }), _vm._v(" "), _c('br'), _vm._v(" "), _c('label', [_vm._v("Director:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.currentPelicula.Director),
      expression: "currentPelicula.Director"
    }],
    attrs: {
      "disabled": _vm.read,
      "type": "text",
      "id": "apellidoInput",
      "placeholder": "Director"
    },
    domProps: {
      "value": (_vm.currentPelicula.Director)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.currentPelicula.Director = $event.target.value
      }
    }
  }), _vm._v(" "), _c('br'), _vm._v(" "), _c('label', [_vm._v("Duracion:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.currentPelicula.Duracion),
      expression: "currentPelicula.Duracion"
    }],
    attrs: {
      "disabled": _vm.read,
      "type": "number",
      "id": "edadInput",
      "placeholder": "Duracion"
    },
    domProps: {
      "value": (_vm.currentPelicula.Duracion)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.currentPelicula.Duracion = $event.target.value
      }
    }
  }), _vm._v(" "), _c('br'), _vm._v(" "), _c('label', [_vm._v("País:")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.currentPelicula.Pais),
      expression: "currentPelicula.Pais"
    }],
    attrs: {
      "disabled": _vm.read
    },
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.currentPelicula.Pais = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": "España"
    }
  }, [_vm._v("España")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "Francia"
    }
  }, [_vm._v("Francia")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "Alemania"
    }
  }, [_vm._v("Alemania")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "EEUU"
    }
  }, [_vm._v("EEUU")])]), _vm._v(" "), _c('div', {
    staticClass: "buttonContainer"
  }, [_c('button', {
    attrs: {
      "disabled": this.enableAcceptButton,
      "id": "acceptButton"
    },
    on: {
      "click": _vm.buttonAccept
    }
  }, [_vm._v("ACEPTAR")]), _vm._v(" "), _c('button', {
    attrs: {
      "disabled": this.enableCleanButton,
      "id": "limpiarButton"
    },
    on: {
      "click": _vm.buttonClean
    }
  }, [_vm._v("LIMPIAR")]), _vm._v(" "), _c('button', {
    attrs: {
      "disabled": this.enableResetButton,
      "id": "resetButton"
    },
    on: {
      "click": _vm.buttonReset
    }
  }, [_vm._v("RESET")])])])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-68fa311a", esExports)
  }
}

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_detailEntradas_vue__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d97346da_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_detailEntradas_vue__ = __webpack_require__(28);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(25)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-d97346da"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_detailEntradas_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d97346da_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_detailEntradas_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components\\detailEntradas.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] detailEntradas.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d97346da", Component.options)
  } else {
    hotAPI.reload("data-v-d97346da", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(26);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("565876df", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d97346da\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./detailEntradas.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d97346da\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./detailEntradas.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* CSS here\n * by including `scoped`, we ensure that all CSS\n * is scoped to this component!\n */\n", ""]);

// exports


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var baseURL = "http://localhost:53765/api/";
/* harmony default export */ __webpack_exports__["a"] = ({
	name: "Detail",
	data() {
		a;
		return {
			currentObject: [],
			index: ""
		};
	},
	props: ['readIndex', 'enableButtons', 'detailMode', 'menuChoice'],
	computed: {
		calculateButtons: function () {},
		getData: function () {
			readDetail();
		}
	},
	methods: {
		// all code for my component goes here
		makeGetRequest: function (id) {
			$.ajax(url = baseURL + this.menuChoice + "/" + id, method = "GET").done(this.submitDetailValues);
		},
		readDetail: function () {
			this.makeGetRequest(this.readIndex);
			this.read = true;
		},
		updateDetail: function (index) {
			this.makeGetRequest(index);
			this.previousPerson.index = this.currentPerson.index;
			this.previousPerson.name = this.currentPerson.name;
			this.previousPerson.surname = this.currentPerson.surname;
			this.previousPerson.age = this.currentPerson.age;
			this.read = false;
		},
		newDetail: function (index) {
			this.read = false;
			this.currentPerson.index = "";
			this.currentPerson.name = "";
			this.currentPerson.surname = "";
			this.currentPerson.age = "";
		},
		deleteItem: function (index) {
			$.ajax({ url: baseURL + this.menuChoice + "/" + index,
				method: "DELETE" }).done(this.makeGetListRequest).fail(function () {
				alert("ELEMENTO NO BORRADO");
			});
		}
	},
	mounted() {
		console.log('Component mounted.');
	}
});

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "detail-div",
    attrs: {
      "id": "Detail"
    }
  }, [_c('h1', [_vm._v("DETAIL:")]), _vm._v(" "), _c('div', {
    staticClass: "Formulario",
    attrs: {
      "id": "FormularioUsuarios"
    }
  }, [_c('label', [_vm._v("Hora:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.currentObject.property1),
      expression: "currentObject.property1"
    }],
    attrs: {
      "disabled": _vm.read,
      "type": "time",
      "id": "horaInput",
      "placeholder": "Hora"
    },
    domProps: {
      "value": (_vm.currentObject.property1)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.currentObject.property1 = $event.target.value
      }
    }
  }), _vm._v(" "), _c('br'), _vm._v(" "), _c('label', [_vm._v("Precio:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.currentObject.property2),
      expression: "currentObject.property2"
    }],
    attrs: {
      "disabled": _vm.read,
      "type": "number",
      "id": "precioInput",
      "placeholder": "Precio"
    },
    domProps: {
      "value": (_vm.currentObject.property2)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.currentObject.property2 = $event.target.value
      }
    }
  }), _vm._v(" "), _c('br'), _vm._v(" "), _c('label', [_vm._v("Pelicula:")]), _vm._v(" "), _c('select', {
    attrs: {
      "disabled": _vm.read
    }
  }, [_c('option', {
    attrs: {
      "value": "p1"
    }
  }, [_vm._v("Pelicula1")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "p2"
    }
  }, [_vm._v("Pelicula2")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "p3"
    }
  }, [_vm._v("Pelicula3")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "p4"
    }
  }, [_vm._v("Pelicula4")])]), _vm._v(" "), _c('div', {
    staticClass: "buttonContainer"
  }, [_c('button', {
    attrs: {
      "disabled": !this.enableButtons,
      "id": "acceptButton"
    },
    on: {
      "click": _vm.buttonAccept
    }
  }, [_vm._v("ACEPTAR")]), _vm._v(" "), _c('button', {
    attrs: {
      "id": "limpiarButton"
    },
    on: {
      "click": _vm.buttonClean
    }
  }, [_vm._v("LIMPIAR")]), _vm._v(" "), _c('button', {
    attrs: {
      "disabled": !this.enableButtons,
      "id": "resetButton"
    },
    on: {
      "click": _vm.buttonReset
    }
  }, [_vm._v("RESET")])])])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-d97346da", esExports)
  }
}

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_tabs_vue__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6fbeb8a4_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_tabs_vue__ = __webpack_require__(33);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(30)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_tabs_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6fbeb8a4_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_tabs_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components\\tabs.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] tabs.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6fbeb8a4", Component.options)
  } else {
    hotAPI.reload("data-v-6fbeb8a4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(31);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("d5e88eca", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6fbeb8a4\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./tabs.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6fbeb8a4\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./tabs.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\na.anchorMenu{\n\tdisplay:inline-block;\n\tpadding: 10px;\n\tmargin: 0px;\n}\na.anchorSelected{\n\tborder-top: solid;\n\tborder-right: solid;\n\tborder-left: solid;\n\tbackground-color:\n}\na.anchorNotSelected{\n\tborder: solid;\n}\n", ""]);

// exports


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
	name: "Tabs",
	data() {
		return {};
	},
	props: ['menuChoice'],
	computed: {
		anchorClass: function () {}
	},
	methods: {
		chooseMenu: function (option) {
			this.$emit('changeTab', option);
		}

	}

});

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "Menu"
    }
  }, [_c('a', {
    class: _vm.anchorClass,
    on: {
      "click": function($event) {
        _vm.chooseMenu('Pelicula')
      }
    }
  }, [_vm._v("Películas")]), _vm._v(" "), _c('a', {
    class: _vm.anchorClass,
    on: {
      "click": function($event) {
        _vm.chooseMenu('Entrada')
      }
    }
  }, [_vm._v("Entradas")])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6fbeb8a4", esExports)
  }
}

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "root-div",
    attrs: {
      "id": "Root"
    }
  }, [_c('tabs', {
    attrs: {
      "menuChoice": this.menuChoice
    },
    on: {
      "changeTab": _vm.changeTab
    }
  }), _vm._v(" "), (this.menuChoice == 'Pelicula') ? _c('masterPeliculas', {
    attrs: {
      "menuChoice": this.menuChoice
    },
    on: {
      "isNew": _vm.setNew,
      "readDetail": _vm.readIndex,
      "updateDetail": _vm.updateIndex
    }
  }) : _vm._e(), _vm._v(" "), (this.menuChoice == 'Entrada') ? _c('masterEntradas', {
    attrs: {
      "menuChoice": this.menuChoice
    },
    on: {
      "isNew": _vm.setNew,
      "readDetail": _vm.readIndex,
      "updateDetail": _vm.updateIndex
    }
  }) : _vm._e(), _vm._v(" "), (_vm.showDetailEntradas) ? _c('detailEntradas', {
    attrs: {
      "readIndex": this.itemIndex,
      "detailMode": _vm.detailMode,
      "enableButtons": _vm.enableButtons,
      "menuChoice": this.menuChoice
    }
  }) : _vm._e(), _vm._v(" "), (_vm.showDetailPeliculas) ? _c('detailPeliculas', {
    attrs: {
      "read": this.read,
      "readIndex": this.itemIndex,
      "detailMode": _vm.detailMode,
      "enableButtons": _vm.enableButtons,
      "menuChoice": this.menuChoice
    }
  }) : _vm._e()], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-ca5e97f0", esExports)
  }
}

/***/ })
/******/ ]);