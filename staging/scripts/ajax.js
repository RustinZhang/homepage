/**
 * @fileOverview 因为功能简单，不想引入太多依赖，做了一个比较简陋的 Ajax 类
 */
"use strict";
/**
 * module ajax
 */

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Ajax = function () {
    (0, _createClass3.default)(Ajax, null, [{
        key: "request",

        /**
         * 直接调用 Ajax.request(),每次调用生成新的实例，实际上相当于一个空的只有static request的父类再加一个子类，比较非典型，或许会换成更直观的方法
         * @param {string} method HTTP method
         * @param {string} url
         * @param {function} callback
         * @param {string|buffer} [data=undefined] only need while method==='POST'
         */
        value: function request(method, url, callback, data) {
            var ajax = new Ajax();
            ajax.request(method, url, callback, data);
        }
    }]);

    function Ajax() {
        (0, _classCallCheck3.default)(this, Ajax);

        this.req = new XMLHttpRequest();
    }

    (0, _createClass3.default)(Ajax, [{
        key: "write",
        value: function write(method, url, data) {
            this.req.open(method.toUpperCase(), url);
            // TODO: 接受buffer数据
            if (method.toLowerCase() === "post") {
                this.req.send(data);
            } else {
                this.req.send();
            }
        }
    }, {
        key: "request",
        value: function request(method, url, callback, data) {
            var _this = this;

            this.write(method, url, data);
            this.req.onreadystatechange = function () {
                if (_this.req.readyState === 4) {
                    if (_this.req.status === 200) {
                        callback(_this.req.response);
                    }
                }
            };
        }
    }]);
    return Ajax;
}();

module.exports = Ajax.request;
//# sourceMappingURL=ajax.js.map
