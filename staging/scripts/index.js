/**
 * @fileOverview 主页的操作逻辑
 * 使用 IndexUI 类实现，其中两个静态方法只是作为工具使用，除了属于主页逻辑，与其它方法关系不大
 */
/**
 * @see module: ajax
 */
"use strict";

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ajax = require('./ajax.js');
/**
 * UI控制
 */

var IndexUI = function () {
    function IndexUI() {
        var _this = this;

        (0, _classCallCheck3.default)(this, IndexUI);

        this.slim = function () {
            if (innerWidth > 767) {
                _this.navClsTgl('remove');
                window.removeEventListener('resize', _this.slim);
                window.addEventListener('resize', _this.fat);
            }
        };

        this.fat = function () {
            if (innerWidth < 768) {
                window.removeEventListener('resize', _this.fat);
                window.addEventListener('resize', _this.slim);
            }
        };

        this.scroll = function (e) {
            if (e.target.tagName === 'LI') {
                _this.navClsTgl('remove');
                document.querySelector('' + e.target.className).scrollIntoView();
            }
        };

        this.navClick = function () {
            if (_this.ext_above.classList.contains('active-ext-above')) _this.navClsTgl('remove');else _this.navClsTgl('add');
        };

        this.showDetail = function (ele, idx) {
            ele.addEventListener('click', function (e) {
                if (e.target.classList.contains('roll')) // 避免点击'收起'时因文章过长位置过于靠下
                    window.scrollBy(0, -parseInt(window.getComputedStyle(_this.texts[idx]).getPropertyValue("height")));
                _this.texts[idx].classList.toggle('show-text');
                if (_this.texts[idx].classList.contains('show-text')) {
                    _this.rolls[idx].style.display = 'block';
                    _this.toggles[idx].innerHTML = "收起总结";
                } else {
                    _this.rolls[idx].style.display = "none";
                    _this.toggles[idx].innerHTML = "查看总结";
                }
            });
        };

        this.toggles = (0, _from2.default)(document.querySelectorAll('.toggle')); // Edge 的 forEach 不支持类数组，转换成数组或许也有性能上的优势
        this.texts = (0, _from2.default)(document.querySelectorAll('.text-box')); // Array.from 兼容性很差，必须要 Babel 的 'transfer-runtime' 插件
        this.rolls = (0, _from2.default)(document.querySelectorAll('.roll'));
        this.ext_below = document.querySelector('.ext-below');
        this.ext_above = document.querySelector('.ext-above');
        this.in_below = document.querySelector('.below-span');
        this.in_above = document.querySelector('.above-span');
        this.menu = document.querySelector('.anchor-mobile');
        this.nav = document.querySelector('.nav');
        this.weather = document.querySelector('.weather');
        this.html = document.querySelector('html');
    }

    /**
     * 天气请求的回调函数
     * @param data {string|buffer}, 服务端返回的数据
     * @TODO 待优化，与服务端配合使用 buffer
     */


    (0, _createClass3.default)(IndexUI, [{
        key: 'navClsTgl',


        /**
         * 负责移动端页面导航菜单的展开闭合逻辑
         * @param change {string} chang='add'|'remove'
         */
        value: function navClsTgl(change) {
            this.ext_above.classList[change]('active-ext-above');
            this.ext_below.classList[change]('active-ext-below');
            this.in_above.classList[change]('active-above-span');
            this.in_below.classList[change]('active-below-span');
            this.menu.classList[change]('show-menu');
            document.body.classList[change]('block-scroll');
            this.html.classList[change]('block-scroll');
            this.nav.style.backgroundColor = change === 'add' ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.8)';
            this.weather.style.display = change === 'add' ? 'none' : 'block';
        }

        /**
         * 视口宽度大于767时的回调函数，一般无必要，为了应对有人在桌面端缩小窗口后点开菜单再拉大窗口，fat同理
         */

        /**
         * 点击遮罩上的菜单根据锚点跳转，所有的回调函数均统一使用箭头函数以避免 this 意外更改
         * @param e {event}
         */

        /**
         * The motion when click the top-left box while viewpoint < 767
         */

        /**
         * 项目总结的收起与打开，总结并不包含图像（也许以后会包含），手动加载是为了让界面看起来更干净。这个函数只提供给 forEach 方法
         * @param ele {node} DOM 节点数组的元素
         * @param idx {int} index
         */

    }], [{
        key: 'weather',
        value: function weather(data) {
            var weather = document.querySelector('.temper');
            var city = document.querySelector('.city');
            data = JSON.parse(data);
            weather.style.backgroundImage = 'url(../images/3d_60/' + data.code + '.png)';
            weather.innerHTML = data.temp + '\u5EA6';
            city.innerHTML = data.city;
        }

        /**
         * 获取读书笔记的文件大小，由服务端读取文件后传回
         * @param data {string|buffer}
         */

    }, {
        key: 'fileSize',
        value: function fileSize(data) {
            data = JSON.parse(data);
            var entries = (0, _from2.default)(document.querySelectorAll('.stuff-entry'));
            entries.forEach(function (e) {
                var filename = decodeURI(e.children[0].href);
                var index = filename.lastIndexOf('/') + 1;
                if (index) filename = filename.slice(index);
                e.children[1].innerHTML = data[filename];
            });
        }
    }]);
    return IndexUI;
}();

var UIHandle = new IndexUI();
UIHandle.toggles.forEach(UIHandle.showDetail);
UIHandle.rolls.forEach(UIHandle.showDetail);
UIHandle.menu.addEventListener('click', UIHandle.scroll);
UIHandle.ext_above.addEventListener('click', UIHandle.navClick);
window.addEventListener('resize', UIHandle.slim);
ajax("GET", "https://www.rustinz.com/Weather", IndexUI.weather);
ajax("GET", "https://www.rustinz.com/FileSize", IndexUI.fileSize);
//# sourceMappingURL=index.js.map
