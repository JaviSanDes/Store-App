(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./node_modules/core-js/internals/string-repeat.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/string-repeat.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar toInteger = __webpack_require__(/*! ../internals/to-integer */ \"./node_modules/core-js/internals/to-integer.js\");\nvar requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ \"./node_modules/core-js/internals/require-object-coercible.js\");\n\n// `String.prototype.repeat` method implementation\n// https://tc39.github.io/ecma262/#sec-string.prototype.repeat\nmodule.exports = ''.repeat || function repeat(count) {\n  var str = String(requireObjectCoercible(this));\n  var result = '';\n  var n = toInteger(count);\n  if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');\n  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;\n  return result;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/string-repeat.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/this-number-value.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/this-number-value.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var classof = __webpack_require__(/*! ../internals/classof-raw */ \"./node_modules/core-js/internals/classof-raw.js\");\n\n// `thisNumberValue` abstract operation\n// https://tc39.github.io/ecma262/#sec-thisnumbervalue\nmodule.exports = function (value) {\n  if (typeof value != 'number' && classof(value) != 'Number') {\n    throw TypeError('Incorrect invocation');\n  }\n  return +value;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/this-number-value.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.number.to-fixed.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es.number.to-fixed.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js/internals/export.js\");\nvar toInteger = __webpack_require__(/*! ../internals/to-integer */ \"./node_modules/core-js/internals/to-integer.js\");\nvar thisNumberValue = __webpack_require__(/*! ../internals/this-number-value */ \"./node_modules/core-js/internals/this-number-value.js\");\nvar repeat = __webpack_require__(/*! ../internals/string-repeat */ \"./node_modules/core-js/internals/string-repeat.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\n\nvar nativeToFixed = 1.0.toFixed;\nvar floor = Math.floor;\n\nvar pow = function (x, n, acc) {\n  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);\n};\n\nvar log = function (x) {\n  var n = 0;\n  var x2 = x;\n  while (x2 >= 4096) {\n    n += 12;\n    x2 /= 4096;\n  }\n  while (x2 >= 2) {\n    n += 1;\n    x2 /= 2;\n  } return n;\n};\n\nvar FORCED = nativeToFixed && (\n  0.00008.toFixed(3) !== '0.000' ||\n  0.9.toFixed(0) !== '1' ||\n  1.255.toFixed(2) !== '1.25' ||\n  1000000000000000128.0.toFixed(0) !== '1000000000000000128'\n) || !fails(function () {\n  // V8 ~ Android 4.3-\n  nativeToFixed.call({});\n});\n\n// `Number.prototype.toFixed` method\n// https://tc39.github.io/ecma262/#sec-number.prototype.tofixed\n$({ target: 'Number', proto: true, forced: FORCED }, {\n  // eslint-disable-next-line max-statements\n  toFixed: function toFixed(fractionDigits) {\n    var number = thisNumberValue(this);\n    var fractDigits = toInteger(fractionDigits);\n    var data = [0, 0, 0, 0, 0, 0];\n    var sign = '';\n    var result = '0';\n    var e, z, j, k;\n\n    var multiply = function (n, c) {\n      var index = -1;\n      var c2 = c;\n      while (++index < 6) {\n        c2 += n * data[index];\n        data[index] = c2 % 1e7;\n        c2 = floor(c2 / 1e7);\n      }\n    };\n\n    var divide = function (n) {\n      var index = 6;\n      var c = 0;\n      while (--index >= 0) {\n        c += data[index];\n        data[index] = floor(c / n);\n        c = (c % n) * 1e7;\n      }\n    };\n\n    var dataToString = function () {\n      var index = 6;\n      var s = '';\n      while (--index >= 0) {\n        if (s !== '' || index === 0 || data[index] !== 0) {\n          var t = String(data[index]);\n          s = s === '' ? t : s + repeat.call('0', 7 - t.length) + t;\n        }\n      } return s;\n    };\n\n    if (fractDigits < 0 || fractDigits > 20) throw RangeError('Incorrect fraction digits');\n    // eslint-disable-next-line no-self-compare\n    if (number != number) return 'NaN';\n    if (number <= -1e21 || number >= 1e21) return String(number);\n    if (number < 0) {\n      sign = '-';\n      number = -number;\n    }\n    if (number > 1e-21) {\n      e = log(number * pow(2, 69, 1)) - 69;\n      z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);\n      z *= 0x10000000000000;\n      e = 52 - e;\n      if (e > 0) {\n        multiply(0, z);\n        j = fractDigits;\n        while (j >= 7) {\n          multiply(1e7, 0);\n          j -= 7;\n        }\n        multiply(pow(10, j, 1), 0);\n        j = e - 1;\n        while (j >= 23) {\n          divide(1 << 23);\n          j -= 23;\n        }\n        divide(1 << j);\n        multiply(1, 1);\n        divide(2);\n        result = dataToString();\n      } else {\n        multiply(0, z);\n        multiply(1 << -e, 0);\n        result = dataToString() + repeat.call('0', fractDigits);\n      }\n    }\n    if (fractDigits > 0) {\n      k = result.length;\n      result = sign + (k <= fractDigits\n        ? '0.' + repeat.call('0', fractDigits - k) + result\n        : result.slice(0, k - fractDigits) + '.' + result.slice(k - fractDigits));\n    } else {\n      result = sign + result;\n    } return result;\n  }\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.number.to-fixed.js?");

/***/ }),

/***/ "./src/app/static/imagenes-productos sync recursive ^\\.\\/.*$":
/*!*********************************************************!*\
  !*** ./src/app/static/imagenes-productos sync ^\.\/.*$ ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./7up.jpg\": \"./src/app/static/imagenes-productos/7up.jpg\",\n\t\"./DrPepper.jpg\": \"./src/app/static/imagenes-productos/DrPepper.jpg\",\n\t\"./M&Ms_XL_pouch.jpg\": \"./src/app/static/imagenes-productos/M&Ms_XL_pouch.jpg\",\n\t\"./alimentos.jpg\": \"./src/app/static/imagenes-productos/alimentos.jpg\",\n\t\"./apple.jpg\": \"./src/app/static/imagenes-productos/apple.jpg\",\n\t\"./asparagus.jpg\": \"./src/app/static/imagenes-productos/asparagus.jpg\",\n\t\"./avocado.jpg\": \"./src/app/static/imagenes-productos/avocado.jpg\",\n\t\"./banana.jpg\": \"./src/app/static/imagenes-productos/banana.jpg\",\n\t\"./bass.jpg\": \"./src/app/static/imagenes-productos/bass.jpg\",\n\t\"./beans_with_vegetables.jpg\": \"./src/app/static/imagenes-productos/beans_with_vegetables.jpg\",\n\t\"./beef_entrecote.jpg\": \"./src/app/static/imagenes-productos/beef_entrecote.jpg\",\n\t\"./bin.png\": \"./src/app/static/imagenes-productos/bin.png\",\n\t\"./bolognesa.jpg\": \"./src/app/static/imagenes-productos/bolognesa.jpg\",\n\t\"./breaded_squid.jpg\": \"./src/app/static/imagenes-productos/breaded_squid.jpg\",\n\t\"./brocoli.jpg\": \"./src/app/static/imagenes-productos/brocoli.jpg\",\n\t\"./burgerMenu.png\": \"./src/app/static/imagenes-productos/burgerMenu.png\",\n\t\"./burger_meat.jpg\": \"./src/app/static/imagenes-productos/burger_meat.jpg\",\n\t\"./carrot.jpg\": \"./src/app/static/imagenes-productos/carrot.jpg\",\n\t\"./chicken.jpg\": \"./src/app/static/imagenes-productos/chicken.jpg\",\n\t\"./chicken_breast.jpg\": \"./src/app/static/imagenes-productos/chicken_breast.jpg\",\n\t\"./chicken_rice.jpg\": \"./src/app/static/imagenes-productos/chicken_rice.jpg\",\n\t\"./chicken_wings.jpg\": \"./src/app/static/imagenes-productos/chicken_wings.jpg\",\n\t\"./chickpeas.jpg\": \"./src/app/static/imagenes-productos/chickpeas.jpg\",\n\t\"./chickpeas_in_sauce.jpg\": \"./src/app/static/imagenes-productos/chickpeas_in_sauce.jpg\",\n\t\"./chickpeas_with_spinach.jpg\": \"./src/app/static/imagenes-productos/chickpeas_with_spinach.jpg\",\n\t\"./chopped_onion.jpg\": \"./src/app/static/imagenes-productos/chopped_onion.jpg\",\n\t\"./chopped_pepper.jpg\": \"./src/app/static/imagenes-productos/chopped_pepper.jpg\",\n\t\"./cocacola0.jpg\": \"./src/app/static/imagenes-productos/cocacola0.jpg\",\n\t\"./coche.jpg\": \"./src/app/static/imagenes-productos/coche.jpg\",\n\t\"./cranberry_sauce.jpg\": \"./src/app/static/imagenes-productos/cranberry_sauce.jpg\",\n\t\"./cut_beef.jpg\": \"./src/app/static/imagenes-productos/cut_beef.jpg\",\n\t\"./cut_turkey.jpg\": \"./src/app/static/imagenes-productos/cut_turkey.jpg\",\n\t\"./fanta fruits.jpg\": \"./src/app/static/imagenes-productos/fanta fruits.jpg\",\n\t\"./french_fries.jpg\": \"./src/app/static/imagenes-productos/french_fries.jpg\",\n\t\"./fruittella_duo_stix.jpg\": \"./src/app/static/imagenes-productos/fruittella_duo_stix.jpg\",\n\t\"./garofalo.jpg\": \"./src/app/static/imagenes-productos/garofalo.jpg\",\n\t\"./gluten_free_macaroni.jpg\": \"./src/app/static/imagenes-productos/gluten_free_macaroni.jpg\",\n\t\"./gravy_chicken_sauce.jpg\": \"./src/app/static/imagenes-productos/gravy_chicken_sauce.jpg\",\n\t\"./gravy_sauce.jpg\": \"./src/app/static/imagenes-productos/gravy_sauce.jpg\",\n\t\"./green_beans.jpg\": \"./src/app/static/imagenes-productos/green_beans.jpg\",\n\t\"./green_peas.jpg\": \"./src/app/static/imagenes-productos/green_peas.jpg\",\n\t\"./haddock_filetes.jpg\": \"./src/app/static/imagenes-productos/haddock_filetes.jpg\",\n\t\"./hamburger.jpg\": \"./src/app/static/imagenes-productos/hamburger.jpg\",\n\t\"./haribo_starmix.jpg\": \"./src/app/static/imagenes-productos/haribo_starmix.jpg\",\n\t\"./heineken.jpg\": \"./src/app/static/imagenes-productos/heineken.jpg\",\n\t\"./heinz_beans.jpg\": \"./src/app/static/imagenes-productos/heinz_beans.jpg\",\n\t\"./heinz_beanz_fiery_chilli.jpg\": \"./src/app/static/imagenes-productos/heinz_beanz_fiery_chilli.jpg\",\n\t\"./heinz_creationz_mexican_beanz.jpg\": \"./src/app/static/imagenes-productos/heinz_creationz_mexican_beanz.jpg\",\n\t\"./home.png\": \"./src/app/static/imagenes-productos/home.png\",\n\t\"./integral_macaroni.jpg\": \"./src/app/static/imagenes-productos/integral_macaroni.jpg\",\n\t\"./integral_spaghetti.jpg\": \"./src/app/static/imagenes-productos/integral_spaghetti.jpg\",\n\t\"./italian_sauce.jpg\": \"./src/app/static/imagenes-productos/italian_sauce.jpg\",\n\t\"./ketchup.jpg\": \"./src/app/static/imagenes-productos/ketchup.jpg\",\n\t\"./kinder_choco-Bons.jpg\": \"./src/app/static/imagenes-productos/kinder_choco-Bons.jpg\",\n\t\"./kiwi.jpg\": \"./src/app/static/imagenes-productos/kiwi.jpg\",\n\t\"./langostinos.jpg\": \"./src/app/static/imagenes-productos/langostinos.jpg\",\n\t\"./lasana.jpg\": \"./src/app/static/imagenes-productos/lasana.jpg\",\n\t\"./lemon.jpg\": \"./src/app/static/imagenes-productos/lemon.jpg\",\n\t\"./lentils.jpg\": \"./src/app/static/imagenes-productos/lentils.jpg\",\n\t\"./limonada.jpg\": \"./src/app/static/imagenes-productos/limonada.jpg\",\n\t\"./loch_fyne_hake.jpg\": \"./src/app/static/imagenes-productos/loch_fyne_hake.jpg\",\n\t\"./macarroni.jpg\": \"./src/app/static/imagenes-productos/macarroni.jpg\",\n\t\"./mars_M&M_cookies.jpg\": \"./src/app/static/imagenes-productos/mars_M&M_cookies.jpg\",\n\t\"./maynards_assetts_jelly_babies.jpg\": \"./src/app/static/imagenes-productos/maynards_assetts_jelly_babies.jpg\",\n\t\"./mushroom.jpg\": \"./src/app/static/imagenes-productos/mushroom.jpg\",\n\t\"./naranjas pack.jpg\": \"./src/app/static/imagenes-productos/naranjas pack.jpg\",\n\t\"./offer.jpg\": \"./src/app/static/imagenes-productos/offer.jpg\",\n\t\"./offer.png\": \"./src/app/static/imagenes-productos/offer.png\",\n\t\"./onion.jpg\": \"./src/app/static/imagenes-productos/onion.jpg\",\n\t\"./orange.jpg\": \"./src/app/static/imagenes-productos/orange.jpg\",\n\t\"./oreo_minis.jpg\": \"./src/app/static/imagenes-productos/oreo_minis.jpg\",\n\t\"./pepsi.jpg\": \"./src/app/static/imagenes-productos/pepsi.jpg\",\n\t\"./pineapple.jpg\": \"./src/app/static/imagenes-productos/pineapple.jpg\",\n\t\"./pork_sirloin.jpg\": \"./src/app/static/imagenes-productos/pork_sirloin.jpg\",\n\t\"./potato_wedges.jpg\": \"./src/app/static/imagenes-productos/potato_wedges.jpg\",\n\t\"./prawns.jpg\": \"./src/app/static/imagenes-productos/prawns.jpg\",\n\t\"./rabioli.jpg\": \"./src/app/static/imagenes-productos/rabioli.jpg\",\n\t\"./red_beans.jpg\": \"./src/app/static/imagenes-productos/red_beans.jpg\",\n\t\"./red_fruits.jpg\": \"./src/app/static/imagenes-productos/red_fruits.jpg\",\n\t\"./redbull.jpg\": \"./src/app/static/imagenes-productos/redbull.jpg\",\n\t\"./rice_three_delicacies.jpg\": \"./src/app/static/imagenes-productos/rice_three_delicacies.jpg\",\n\t\"./risotto.jpg\": \"./src/app/static/imagenes-productos/risotto.jpg\",\n\t\"./salad.jpg\": \"./src/app/static/imagenes-productos/salad.jpg\",\n\t\"./salmon.jpg\": \"./src/app/static/imagenes-productos/salmon.jpg\",\n\t\"./salsa_brava.jpg\": \"./src/app/static/imagenes-productos/salsa_brava.jpg\",\n\t\"./sauteed_vegetables.jpg\": \"./src/app/static/imagenes-productos/sauteed_vegetables.jpg\",\n\t\"./schweps.jpg\": \"./src/app/static/imagenes-productos/schweps.jpg\",\n\t\"./sea_bream.jpg\": \"./src/app/static/imagenes-productos/sea_bream.jpg\",\n\t\"./snickers_bites_pouch.jpg\": \"./src/app/static/imagenes-productos/snickers_bites_pouch.jpg\",\n\t\"./spaghetti.jpg\": \"./src/app/static/imagenes-productos/spaghetti.jpg\",\n\t\"./spinach.jpg\": \"./src/app/static/imagenes-productos/spinach.jpg\",\n\t\"./sprite.jpg\": \"./src/app/static/imagenes-productos/sprite.jpg\",\n\t\"./squid.jpg\": \"./src/app/static/imagenes-productos/squid.jpg\",\n\t\"./strawberries.jpg\": \"./src/app/static/imagenes-productos/strawberries.jpg\",\n\t\"./tabasco.jpg\": \"./src/app/static/imagenes-productos/tabasco.jpg\",\n\t\"./tagliatelle.jpg\": \"./src/app/static/imagenes-productos/tagliatelle.jpg\",\n\t\"./tangerine.jpg\": \"./src/app/static/imagenes-productos/tangerine.jpg\",\n\t\"./tick.png\": \"./src/app/static/imagenes-productos/tick.png\",\n\t\"./tikka_masala_sauce.jpg\": \"./src/app/static/imagenes-productos/tikka_masala_sauce.jpg\",\n\t\"./tomate_chili.jpg\": \"./src/app/static/imagenes-productos/tomate_chili.jpg\",\n\t\"./tricolor_macaroni.jpg\": \"./src/app/static/imagenes-productos/tricolor_macaroni.jpg\",\n\t\"./trolley.png\": \"./src/app/static/imagenes-productos/trolley.png\",\n\t\"./trolley2.png\": \"./src/app/static/imagenes-productos/trolley2.png\",\n\t\"./tuna.jpg\": \"./src/app/static/imagenes-productos/tuna.jpg\",\n\t\"./turkey_breast.jpg\": \"./src/app/static/imagenes-productos/turkey_breast.jpg\",\n\t\"./twix_bites_pouch_bag.jpg\": \"./src/app/static/imagenes-productos/twix_bites_pouch_bag.jpg\",\n\t\"./user.png\": \"./src/app/static/imagenes-productos/user.png\",\n\t\"./vegetable_skewers.jpg\": \"./src/app/static/imagenes-productos/vegetable_skewers.jpg\",\n\t\"./vegetables_cream.jpg\": \"./src/app/static/imagenes-productos/vegetables_cream.jpg\",\n\t\"./waitrose_sardine_al_limone.jpg\": \"./src/app/static/imagenes-productos/waitrose_sardine_al_limone.jpg\",\n\t\"./watermelon.jpg\": \"./src/app/static/imagenes-productos/watermelon.jpg\",\n\t\"./werther's_original.jpg\": \"./src/app/static/imagenes-productos/werther's_original.jpg\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./src/app/static/imagenes-productos sync recursive ^\\\\.\\\\/.*$\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos_sync_^\\.\\/.*$?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/7up.jpg":
/*!***************************************************!*\
  !*** ./src/app/static/imagenes-productos/7up.jpg ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/567ae547e051f52c0f3e5ae401447c70.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/7up.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/DrPepper.jpg":
/*!********************************************************!*\
  !*** ./src/app/static/imagenes-productos/DrPepper.jpg ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/5bb0d3e9b66fb4d368b28375e019d2bd.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/DrPepper.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/M&Ms_XL_pouch.jpg":
/*!*************************************************************!*\
  !*** ./src/app/static/imagenes-productos/M&Ms_XL_pouch.jpg ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/9737ac6f453094126dbc5ba8eeeb4976.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/M&Ms_XL_pouch.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/alimentos.jpg":
/*!*********************************************************!*\
  !*** ./src/app/static/imagenes-productos/alimentos.jpg ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/f5c7d5cd3e5e33f1e77cfb5813c479c3.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/alimentos.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/apple.jpg":
/*!*****************************************************!*\
  !*** ./src/app/static/imagenes-productos/apple.jpg ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/8d69c5530b692a8465b211dc97dc89b7.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/apple.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/asparagus.jpg":
/*!*********************************************************!*\
  !*** ./src/app/static/imagenes-productos/asparagus.jpg ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/76abfd8c253d2390ad4fd3e5d18a0539.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/asparagus.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/avocado.jpg":
/*!*******************************************************!*\
  !*** ./src/app/static/imagenes-productos/avocado.jpg ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/b0f3b72761d09f7a6a3bfcc0147a6ab3.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/avocado.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/banana.jpg":
/*!******************************************************!*\
  !*** ./src/app/static/imagenes-productos/banana.jpg ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/9902e11d2ffeb7f10876d464b6386c18.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/banana.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/bass.jpg":
/*!****************************************************!*\
  !*** ./src/app/static/imagenes-productos/bass.jpg ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/bdfcf4abd374c17e4a422a546413767e.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/bass.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/beans_with_vegetables.jpg":
/*!*********************************************************************!*\
  !*** ./src/app/static/imagenes-productos/beans_with_vegetables.jpg ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/c6719c3441ce5a01fc1aff1875748a6c.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/beans_with_vegetables.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/beef_entrecote.jpg":
/*!**************************************************************!*\
  !*** ./src/app/static/imagenes-productos/beef_entrecote.jpg ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/6f03f3a5249ae93fa74febc45ad8f59d.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/beef_entrecote.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/bin.png":
/*!***************************************************!*\
  !*** ./src/app/static/imagenes-productos/bin.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/67c1e28f1bc7503889a3cfeb2d0f700a.png\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/bin.png?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/bolognesa.jpg":
/*!*********************************************************!*\
  !*** ./src/app/static/imagenes-productos/bolognesa.jpg ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/644cf31ef4c239925c079350bd3659e8.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/bolognesa.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/breaded_squid.jpg":
/*!*************************************************************!*\
  !*** ./src/app/static/imagenes-productos/breaded_squid.jpg ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/caac060c8a53d73dd44c8716756da818.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/breaded_squid.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/brocoli.jpg":
/*!*******************************************************!*\
  !*** ./src/app/static/imagenes-productos/brocoli.jpg ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/8ae5106fd7a8fb753b927bff32632c1a.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/brocoli.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/burgerMenu.png":
/*!**********************************************************!*\
  !*** ./src/app/static/imagenes-productos/burgerMenu.png ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/79b18a5d205cdebc264fc06817b73584.png\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/burgerMenu.png?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/burger_meat.jpg":
/*!***********************************************************!*\
  !*** ./src/app/static/imagenes-productos/burger_meat.jpg ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/3d2060b2dd10de990b5223488e369090.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/burger_meat.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/carrot.jpg":
/*!******************************************************!*\
  !*** ./src/app/static/imagenes-productos/carrot.jpg ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/6170377780cd7f830f8124cabda78e49.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/carrot.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/chicken.jpg":
/*!*******************************************************!*\
  !*** ./src/app/static/imagenes-productos/chicken.jpg ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/e10e5634daef975f8a24ba2b33a87492.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/chicken.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/chicken_breast.jpg":
/*!**************************************************************!*\
  !*** ./src/app/static/imagenes-productos/chicken_breast.jpg ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/1833db525a3133823b0f5c8f1d3ee495.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/chicken_breast.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/chicken_rice.jpg":
/*!************************************************************!*\
  !*** ./src/app/static/imagenes-productos/chicken_rice.jpg ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/f49c7fd13f6cd2ae36c5efc40d3d3290.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/chicken_rice.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/chicken_wings.jpg":
/*!*************************************************************!*\
  !*** ./src/app/static/imagenes-productos/chicken_wings.jpg ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/aed5fd7e952c55a75cbd312012474767.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/chicken_wings.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/chickpeas.jpg":
/*!*********************************************************!*\
  !*** ./src/app/static/imagenes-productos/chickpeas.jpg ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/474fe7735ab2defd3bef88f14356b81d.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/chickpeas.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/chickpeas_in_sauce.jpg":
/*!******************************************************************!*\
  !*** ./src/app/static/imagenes-productos/chickpeas_in_sauce.jpg ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/4f5e0d91011a7a161d4c72a46ca56967.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/chickpeas_in_sauce.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/chickpeas_with_spinach.jpg":
/*!**********************************************************************!*\
  !*** ./src/app/static/imagenes-productos/chickpeas_with_spinach.jpg ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/160b0a2be81381a6160d6167083bb249.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/chickpeas_with_spinach.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/chopped_onion.jpg":
/*!*************************************************************!*\
  !*** ./src/app/static/imagenes-productos/chopped_onion.jpg ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/a76d0e6bffdb209f1b9f17bfb30de0f8.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/chopped_onion.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/chopped_pepper.jpg":
/*!**************************************************************!*\
  !*** ./src/app/static/imagenes-productos/chopped_pepper.jpg ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/df505b1295b7720e879eb4cd401eb117.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/chopped_pepper.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/cocacola0.jpg":
/*!*********************************************************!*\
  !*** ./src/app/static/imagenes-productos/cocacola0.jpg ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/283ad6e8408e04ffecd9faacc18919e7.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/cocacola0.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/coche.jpg":
/*!*****************************************************!*\
  !*** ./src/app/static/imagenes-productos/coche.jpg ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/2c98c95db9a5cea3908e85ab2f965d4e.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/coche.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/cranberry_sauce.jpg":
/*!***************************************************************!*\
  !*** ./src/app/static/imagenes-productos/cranberry_sauce.jpg ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/11e6b4da5b58c945c9c5a5e9c9f1335f.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/cranberry_sauce.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/cut_beef.jpg":
/*!********************************************************!*\
  !*** ./src/app/static/imagenes-productos/cut_beef.jpg ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/a479354a935bac997a5aa9e2e9d35272.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/cut_beef.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/cut_turkey.jpg":
/*!**********************************************************!*\
  !*** ./src/app/static/imagenes-productos/cut_turkey.jpg ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/3a1db1538c74a0dd5f2703f4a716fc16.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/cut_turkey.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/fanta fruits.jpg":
/*!************************************************************!*\
  !*** ./src/app/static/imagenes-productos/fanta fruits.jpg ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/d4adccffebec6d9b2b307646c0a82b41.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/fanta_fruits.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/french_fries.jpg":
/*!************************************************************!*\
  !*** ./src/app/static/imagenes-productos/french_fries.jpg ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/9be731c8ee3bd56bd3dacc6b2f8bd33b.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/french_fries.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/fruittella_duo_stix.jpg":
/*!*******************************************************************!*\
  !*** ./src/app/static/imagenes-productos/fruittella_duo_stix.jpg ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/30536c0879c1be3ad5940a0256596458.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/fruittella_duo_stix.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/garofalo.jpg":
/*!********************************************************!*\
  !*** ./src/app/static/imagenes-productos/garofalo.jpg ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/080a69d6fb146c162474d78a7d3babeb.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/garofalo.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/gluten_free_macaroni.jpg":
/*!********************************************************************!*\
  !*** ./src/app/static/imagenes-productos/gluten_free_macaroni.jpg ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/9f36a4b64a33f690689fc64b13053696.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/gluten_free_macaroni.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/gravy_chicken_sauce.jpg":
/*!*******************************************************************!*\
  !*** ./src/app/static/imagenes-productos/gravy_chicken_sauce.jpg ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/cf2b91a677d5740fa6764453840ba96f.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/gravy_chicken_sauce.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/gravy_sauce.jpg":
/*!***********************************************************!*\
  !*** ./src/app/static/imagenes-productos/gravy_sauce.jpg ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/6df91ec685dac6de7be368a5566b9a02.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/gravy_sauce.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/green_beans.jpg":
/*!***********************************************************!*\
  !*** ./src/app/static/imagenes-productos/green_beans.jpg ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/aaf793cd5913a2e69ef24029722eeb3f.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/green_beans.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/green_peas.jpg":
/*!**********************************************************!*\
  !*** ./src/app/static/imagenes-productos/green_peas.jpg ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/3f47390c272511c0cd9cc2c6d65e0a33.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/green_peas.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/haddock_filetes.jpg":
/*!***************************************************************!*\
  !*** ./src/app/static/imagenes-productos/haddock_filetes.jpg ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/f0eec5dcadeeb80600bbc3d5bf378c7b.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/haddock_filetes.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/hamburger.jpg":
/*!*********************************************************!*\
  !*** ./src/app/static/imagenes-productos/hamburger.jpg ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/4cacc6cbf36effb6791ac638b4df5294.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/hamburger.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/haribo_starmix.jpg":
/*!**************************************************************!*\
  !*** ./src/app/static/imagenes-productos/haribo_starmix.jpg ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/7f01ea5f65b5d1f4bdbf1284ffcdbe0c.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/haribo_starmix.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/heineken.jpg":
/*!********************************************************!*\
  !*** ./src/app/static/imagenes-productos/heineken.jpg ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/8f246a6c0c9546a9e935794d5cfef25c.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/heineken.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/heinz_beans.jpg":
/*!***********************************************************!*\
  !*** ./src/app/static/imagenes-productos/heinz_beans.jpg ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/e5eb9432a428af225a3afd8496ecedc0.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/heinz_beans.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/heinz_beanz_fiery_chilli.jpg":
/*!************************************************************************!*\
  !*** ./src/app/static/imagenes-productos/heinz_beanz_fiery_chilli.jpg ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/68e211203dde886640eb9a5e8da59ff9.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/heinz_beanz_fiery_chilli.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/heinz_creationz_mexican_beanz.jpg":
/*!*****************************************************************************!*\
  !*** ./src/app/static/imagenes-productos/heinz_creationz_mexican_beanz.jpg ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/25873edc77440b0f6ac879cf4f49a349.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/heinz_creationz_mexican_beanz.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/home.png":
/*!****************************************************!*\
  !*** ./src/app/static/imagenes-productos/home.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/dd5d807771ccea4bac03181374e03fcc.png\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/home.png?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/integral_macaroni.jpg":
/*!*****************************************************************!*\
  !*** ./src/app/static/imagenes-productos/integral_macaroni.jpg ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/4cda22497dda526ba99a2ff48ba0e96f.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/integral_macaroni.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/integral_spaghetti.jpg":
/*!******************************************************************!*\
  !*** ./src/app/static/imagenes-productos/integral_spaghetti.jpg ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/3d54eb360a5eb217b0ac917d0c9dc3be.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/integral_spaghetti.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/italian_sauce.jpg":
/*!*************************************************************!*\
  !*** ./src/app/static/imagenes-productos/italian_sauce.jpg ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/59de6f2ad6efcb2ce8e48575fd2cde13.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/italian_sauce.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/ketchup.jpg":
/*!*******************************************************!*\
  !*** ./src/app/static/imagenes-productos/ketchup.jpg ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/23eb4167f0c184796ffc3500e85d0115.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/ketchup.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/kinder_choco-Bons.jpg":
/*!*****************************************************************!*\
  !*** ./src/app/static/imagenes-productos/kinder_choco-Bons.jpg ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/3cffd1ab42128d843ee80adceb450c95.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/kinder_choco-Bons.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/kiwi.jpg":
/*!****************************************************!*\
  !*** ./src/app/static/imagenes-productos/kiwi.jpg ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/6b71cfdc7704c18f933d9433f29a5691.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/kiwi.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/langostinos.jpg":
/*!***********************************************************!*\
  !*** ./src/app/static/imagenes-productos/langostinos.jpg ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/752a2d168e37cad9fea404c81f140465.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/langostinos.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/lasana.jpg":
/*!******************************************************!*\
  !*** ./src/app/static/imagenes-productos/lasana.jpg ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/7ad6686347dbcbbf43f23eae0168d9e8.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/lasana.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/lemon.jpg":
/*!*****************************************************!*\
  !*** ./src/app/static/imagenes-productos/lemon.jpg ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/6284b529a1467ba0952f6a64a2614b28.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/lemon.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/lentils.jpg":
/*!*******************************************************!*\
  !*** ./src/app/static/imagenes-productos/lentils.jpg ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/152ea8061117afd1d3b585115d38cc3a.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/lentils.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/limonada.jpg":
/*!********************************************************!*\
  !*** ./src/app/static/imagenes-productos/limonada.jpg ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/984e7913ba10fbdb691b2e15ccf655e5.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/limonada.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/loch_fyne_hake.jpg":
/*!**************************************************************!*\
  !*** ./src/app/static/imagenes-productos/loch_fyne_hake.jpg ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/92f7500af165ba1b3a4ae2a4d5c5a8f9.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/loch_fyne_hake.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/macarroni.jpg":
/*!*********************************************************!*\
  !*** ./src/app/static/imagenes-productos/macarroni.jpg ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/264c21ad301487a7c2368c6edadd7fc2.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/macarroni.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/mars_M&M_cookies.jpg":
/*!****************************************************************!*\
  !*** ./src/app/static/imagenes-productos/mars_M&M_cookies.jpg ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/09aae639a17a1db29a87f2b0d47153da.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/mars_M&M_cookies.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/maynards_assetts_jelly_babies.jpg":
/*!*****************************************************************************!*\
  !*** ./src/app/static/imagenes-productos/maynards_assetts_jelly_babies.jpg ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/63146cb5833212bfdf3cf9eff970f115.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/maynards_assetts_jelly_babies.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/mushroom.jpg":
/*!********************************************************!*\
  !*** ./src/app/static/imagenes-productos/mushroom.jpg ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/df6d49036bf512fe39c1d37395c9b1d6.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/mushroom.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/naranjas pack.jpg":
/*!*************************************************************!*\
  !*** ./src/app/static/imagenes-productos/naranjas pack.jpg ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/cd57d6e6aa014f56948c2d1639f80bc2.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/naranjas_pack.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/offer.jpg":
/*!*****************************************************!*\
  !*** ./src/app/static/imagenes-productos/offer.jpg ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/5b73ac6a887ae8e08e239b4a3f42355b.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/offer.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/offer.png":
/*!*****************************************************!*\
  !*** ./src/app/static/imagenes-productos/offer.png ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/eb25ee74d68f68d80fc98689a39b8423.png\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/offer.png?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/onion.jpg":
/*!*****************************************************!*\
  !*** ./src/app/static/imagenes-productos/onion.jpg ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/693a7415d7e238ec98c06b75075fb861.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/onion.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/orange.jpg":
/*!******************************************************!*\
  !*** ./src/app/static/imagenes-productos/orange.jpg ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/c8b091a5484856d0adec97af49f5f8bb.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/orange.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/oreo_minis.jpg":
/*!**********************************************************!*\
  !*** ./src/app/static/imagenes-productos/oreo_minis.jpg ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/7f68dee34761181fa87889fd393de03a.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/oreo_minis.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/pepsi.jpg":
/*!*****************************************************!*\
  !*** ./src/app/static/imagenes-productos/pepsi.jpg ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/5f745aa7ae200cb3992bbf9148033d7f.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/pepsi.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/pineapple.jpg":
/*!*********************************************************!*\
  !*** ./src/app/static/imagenes-productos/pineapple.jpg ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/2a260f95688f1b391b4891a079fdc74d.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/pineapple.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/pork_sirloin.jpg":
/*!************************************************************!*\
  !*** ./src/app/static/imagenes-productos/pork_sirloin.jpg ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/d75ab5951e7246c02d7a77da8421bf4a.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/pork_sirloin.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/potato_wedges.jpg":
/*!*************************************************************!*\
  !*** ./src/app/static/imagenes-productos/potato_wedges.jpg ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/df570ce8a7abb9a6b0eaec3c0fa7e335.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/potato_wedges.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/prawns.jpg":
/*!******************************************************!*\
  !*** ./src/app/static/imagenes-productos/prawns.jpg ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/3fbca9b28d23bc6552d4917ad34415ec.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/prawns.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/rabioli.jpg":
/*!*******************************************************!*\
  !*** ./src/app/static/imagenes-productos/rabioli.jpg ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/06a5fa670e37cc43d4381a6c39b58125.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/rabioli.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/red_beans.jpg":
/*!*********************************************************!*\
  !*** ./src/app/static/imagenes-productos/red_beans.jpg ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/420e7d88c15a85c0b30a8dacab278b75.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/red_beans.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/red_fruits.jpg":
/*!**********************************************************!*\
  !*** ./src/app/static/imagenes-productos/red_fruits.jpg ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/030fa4b551af025fdf626e3051f729ca.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/red_fruits.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/redbull.jpg":
/*!*******************************************************!*\
  !*** ./src/app/static/imagenes-productos/redbull.jpg ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/874b37fb5dd0671a2c27adee5524f57a.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/redbull.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/rice_three_delicacies.jpg":
/*!*********************************************************************!*\
  !*** ./src/app/static/imagenes-productos/rice_three_delicacies.jpg ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/b316c856c21b2b616e40508900ae068d.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/rice_three_delicacies.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/risotto.jpg":
/*!*******************************************************!*\
  !*** ./src/app/static/imagenes-productos/risotto.jpg ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/bf8a4188fccd0fd9670eba3605fd9110.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/risotto.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/salad.jpg":
/*!*****************************************************!*\
  !*** ./src/app/static/imagenes-productos/salad.jpg ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/2b35f6de812031adb2eb45396d4e214a.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/salad.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/salmon.jpg":
/*!******************************************************!*\
  !*** ./src/app/static/imagenes-productos/salmon.jpg ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/2cab7221ed74ffe1087103d1b185a749.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/salmon.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/salsa_brava.jpg":
/*!***********************************************************!*\
  !*** ./src/app/static/imagenes-productos/salsa_brava.jpg ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/23489f27c9f5b1d7552e422967ff96aa.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/salsa_brava.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/sauteed_vegetables.jpg":
/*!******************************************************************!*\
  !*** ./src/app/static/imagenes-productos/sauteed_vegetables.jpg ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/27456ea7fdedd4f5f960ad37baaf1dda.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/sauteed_vegetables.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/schweps.jpg":
/*!*******************************************************!*\
  !*** ./src/app/static/imagenes-productos/schweps.jpg ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/2a095c66150e6b09a155f5795dbb1952.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/schweps.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/sea_bream.jpg":
/*!*********************************************************!*\
  !*** ./src/app/static/imagenes-productos/sea_bream.jpg ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/dcbeb88b30c0db6e75b88255c4d25a15.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/sea_bream.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/snickers_bites_pouch.jpg":
/*!********************************************************************!*\
  !*** ./src/app/static/imagenes-productos/snickers_bites_pouch.jpg ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/5205e72001d98b219b9f7a73da391035.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/snickers_bites_pouch.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/spaghetti.jpg":
/*!*********************************************************!*\
  !*** ./src/app/static/imagenes-productos/spaghetti.jpg ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/7182b099d0be02c62c47db4c2ff5ddf9.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/spaghetti.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/spinach.jpg":
/*!*******************************************************!*\
  !*** ./src/app/static/imagenes-productos/spinach.jpg ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/29c6b64f47c2fc0e1b130c5eb667167e.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/spinach.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/sprite.jpg":
/*!******************************************************!*\
  !*** ./src/app/static/imagenes-productos/sprite.jpg ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/b127ff1fab6e08e06c893f8789b6b03b.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/sprite.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/squid.jpg":
/*!*****************************************************!*\
  !*** ./src/app/static/imagenes-productos/squid.jpg ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/08275dd57720d8385d284494439b21b5.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/squid.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/strawberries.jpg":
/*!************************************************************!*\
  !*** ./src/app/static/imagenes-productos/strawberries.jpg ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/b840e53fee34b1b948ba73c33ea1430c.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/strawberries.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/tabasco.jpg":
/*!*******************************************************!*\
  !*** ./src/app/static/imagenes-productos/tabasco.jpg ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/00304c514143981e335e4e91d145d123.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/tabasco.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/tagliatelle.jpg":
/*!***********************************************************!*\
  !*** ./src/app/static/imagenes-productos/tagliatelle.jpg ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/0072f9412bdb758e7969c68af2688e5a.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/tagliatelle.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/tangerine.jpg":
/*!*********************************************************!*\
  !*** ./src/app/static/imagenes-productos/tangerine.jpg ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/bfcf3a1254e0ac8bab3dad24926beba5.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/tangerine.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/tick.png":
/*!****************************************************!*\
  !*** ./src/app/static/imagenes-productos/tick.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/41e8a965aec5e792358b08ce886c0362.png\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/tick.png?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/tikka_masala_sauce.jpg":
/*!******************************************************************!*\
  !*** ./src/app/static/imagenes-productos/tikka_masala_sauce.jpg ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/de6e5da9b389a0887fe98f9d26fbb28e.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/tikka_masala_sauce.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/tomate_chili.jpg":
/*!************************************************************!*\
  !*** ./src/app/static/imagenes-productos/tomate_chili.jpg ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/ee6ce66b4674b07a57fbb3bdc18e46a5.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/tomate_chili.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/tricolor_macaroni.jpg":
/*!*****************************************************************!*\
  !*** ./src/app/static/imagenes-productos/tricolor_macaroni.jpg ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/4dfc6420a7cf038c84a5e80305c9f311.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/tricolor_macaroni.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/trolley.png":
/*!*******************************************************!*\
  !*** ./src/app/static/imagenes-productos/trolley.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/e7729b5133092b5213b708f9d4f5cf47.png\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/trolley.png?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/trolley2.png":
/*!********************************************************!*\
  !*** ./src/app/static/imagenes-productos/trolley2.png ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/8707955103a03a5cb3a9a22f19d8e158.png\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/trolley2.png?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/tuna.jpg":
/*!****************************************************!*\
  !*** ./src/app/static/imagenes-productos/tuna.jpg ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/367f966435f2e3e9513e8e9f2c1eb5a9.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/tuna.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/turkey_breast.jpg":
/*!*************************************************************!*\
  !*** ./src/app/static/imagenes-productos/turkey_breast.jpg ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/69625130a78dde9e0b118d211e664e29.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/turkey_breast.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/twix_bites_pouch_bag.jpg":
/*!********************************************************************!*\
  !*** ./src/app/static/imagenes-productos/twix_bites_pouch_bag.jpg ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/aebd916638c5b5c288ba95303a62f30c.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/twix_bites_pouch_bag.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/user.png":
/*!****************************************************!*\
  !*** ./src/app/static/imagenes-productos/user.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/ce14d64d9212c455e4495252453d3d59.png\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/user.png?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/vegetable_skewers.jpg":
/*!*****************************************************************!*\
  !*** ./src/app/static/imagenes-productos/vegetable_skewers.jpg ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/1752da74c27228328c48c11da8edac4d.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/vegetable_skewers.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/vegetables_cream.jpg":
/*!****************************************************************!*\
  !*** ./src/app/static/imagenes-productos/vegetables_cream.jpg ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/d26ab23fa48faf676ee096ed3f66aac5.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/vegetables_cream.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/waitrose_sardine_al_limone.jpg":
/*!**************************************************************************!*\
  !*** ./src/app/static/imagenes-productos/waitrose_sardine_al_limone.jpg ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/9a95fe6b956d0243713c799e2c070048.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/waitrose_sardine_al_limone.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/watermelon.jpg":
/*!**********************************************************!*\
  !*** ./src/app/static/imagenes-productos/watermelon.jpg ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/3d2d492c4a1f89150da53b4f805f6d41.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/watermelon.jpg?");

/***/ }),

/***/ "./src/app/static/imagenes-productos/werther's_original.jpg":
/*!******************************************************************!*\
  !*** ./src/app/static/imagenes-productos/werther's_original.jpg ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/98041221e5818f1aba2de785ecee510a.jpg\";\n\n//# sourceURL=webpack:///./src/app/static/imagenes-productos/werther's_original.jpg?");

/***/ })

}]);