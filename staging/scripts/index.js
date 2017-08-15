/**
 * @fileOverview 主页的操作逻辑
 * 使用 IndexUI 类实现，其中两个静态方法只是作为工具使用，除了属于主页逻辑，与其它方法关系不大
 */
/**
 * index模块，由IndexUI一个类构成，详见该类
 * @module index
 * @see module: ajax
 */
'use strict';

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

        this.itemChoose = function (event) {
            if (event.target.tagName === 'LI' && !event.target.classList.contains('on-top')) {
                var item = document.querySelector('#' + event.target.classList[0]);
                if (event.target.parentNode.classList.contains('proj-ch')) {
                    var ele = document.querySelector('.proj-ch .on-top');
                    var article = document.querySelector('.project.show');
                    ele.classList.remove('on-top');
                    article.classList.remove('show');
                    article.classList.remove('show-counts');
                } else if (event.target.parentNode.classList.contains('path-ch')) {
                    var _ele = document.querySelector('.path-ch .on-top');
                    var _article = document.querySelector('.stuff.show');
                    _ele.classList.remove('on-top');
                    _article.classList.remove('show');
                    _article.classList.remove('show-counts');
                }
                event.target.classList.add('on-top');
                item.classList.add('show');
                item.classList.add('show-counts');
            }
        };

        this.pageChoose = function (e) {
            if (e.target.tagName === 'LI') {
                _this.showPage(e.target.id);
            }
        };

        this.bottomFlip = function (e) {
            switch (e.target.className) {
                case 'flip-over':
                    _this.showPage('page1');
                    break;
                case 'flip-over-learn':
                    _this.showPage('page2');
                    break;
            }
        };

        this.showDetail = function (ele, idx) {
            ele.addEventListener('click', function (e) {
                if (window.innerWidth < 768) {
                    window.scrollBy(0, -parseInt(window.getComputedStyle(_this.texts[idx]).getPropertyValue('height')));
                }
                _this.projects[idx].classList.toggle('show-text');
                if (_this.projects[idx].classList.contains('show-text')) {
                    _this.texts[idx].classList.toggle('expand');
                    _this.toggles[idx].innerHTML = '<<收起';
                } else {
                    _this.texts[idx].classList.toggle('expand');
                    _this.toggles[idx].innerHTML = '>>更多';
                }
            });
        };

        this.drawerControl = function () {
            if (!_this.content.classList.contains('block-scroll')) {
                _this.content.classList.add('show-menu');
                _this.mob.classList.add('show-menu');
                _this.content.classList.add('block-scroll');
            } else {
                _this.content.classList.remove('show-menu');
                _this.mob.classList.remove('show-menu');
                _this.content.classList.remove('block-scroll');
            }
        };

        this.slim = function () {
            if (innerWidth > 767) {
                _this.content.classList.remove('show-menu');
                _this.mob.classList.remove('show-menu');
                _this.content.classList.remove('block-scroll');
                switch (_this.status[0].id) {
                    case 'info':
                        _this.showPage('page0');
                        break;
                    case 'project_item':
                        _this.showPage('page1');
                        break;
                    case 'learn':
                        _this.showPage('page2');
                        break;
                }
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

        this.mobSelect = function (e) {
            var target = document.querySelector('#' + e.target.classList[0]);
            if (e.target.tagName === 'LI') {
                if (!target.classList.contains('show')) {
                    var last = _this.status.shift();
                    last.classList.remove('show');
                    last.classList.remove('show-article');
                    target.classList.add('show');
                    _this.status.push(target);
                    window.scrollTo(0, 0);
                }
            }
            _this.drawerControl();
        };

        this.fixSafariScrolling = function () {
            if (window.innerWidth < 768) {
                _this.content.style.overflowY = 'hidden';
                setTimeout(function () {
                    _this.content.style.overflowY = 'scroll';
                }, 0);
            }
        };

        this.toggles = (0, _from2.default)(document.querySelectorAll('.toggle-text')); // Edge 的 forEach 不支持类数组，转换成数组或许也有性能上的优势
        this.texts = (0, _from2.default)(document.querySelectorAll('.text-box')); // Array.from 兼容性很差，必须要 Babel 的 'transfer-runtime' 插件
        this.proj_container = document.querySelector('#project_item');
        this.learn_path = document.querySelector('#learn');
        this.info_page = document.querySelector('.information-page');
        this.flip = document.querySelector('.flip-over');
        this.entry_choose = document.querySelector('.entry-choose');
        this.anchor = document.querySelector('.anchor');
        this.projects = (0, _from2.default)(document.querySelectorAll('.project'));
        this.stuff = (0, _from2.default)(document.querySelectorAll('.stuff'));
        this.nav = document.querySelector('.nav');
        this.weather = document.querySelector('.weather');
        this.html = document.querySelector('html');
        this.proj_list = document.querySelector('.proj-ch');
        this.learn_list = document.querySelector('.path-ch');
        this.proj_entries = (0, _from2.default)(document.querySelectorAll('.proj-ch .entry-chosen'));
        this.learn_entries = (0, _from2.default)(document.querySelectorAll('.path-ch .entry-chosen'));
        this.status = [this.info_page];
        this.mob_drawer = document.querySelector('.menu-button');
        this.content = document.querySelector('.content');
        this.mob_nav = document.querySelector('.nav-menu-mobile');
        this.flip_learn = document.querySelector('.flip-over-learn');
        this.mob = document.querySelector('.nav-mobile');
    }

    /**
     * 天气请求的回调函数
     * 目前首页暂时去掉了天气版块
     * @param data {string|buffer}, 服务端返回的数据
     * @TODO 待优化，与服务端配合使用 buffer
     */


    (0, _createClass3.default)(IndexUI, [{
        key: 'showPage',


        /**
         * 切换二级标题的逻辑控制函数
         * @param id {string} 标记页码的id
         * @returns {*} 无返回值
         */
        value: function showPage(id) {
            var _this2 = this;

            if (window.innerWidth >= 768) {
                if (document.querySelector('#' + id).classList.contains('nav-chosen')) return void 0;
                document.querySelector('.nav-chosen').classList.remove('nav-chosen');
            }
            this.status.shift();
            (0, _from2.default)(document.querySelectorAll('.projects-container.show,.information-page.show,.path.show,.proj-ch.show,.path-ch.show')).forEach(function (e) {
                e.classList.remove('show'); // IE not support multiple classes one time
                e.classList.remove('show-counts');
                e.classList.remove('show-article');
            });
            (0, _from2.default)(document.querySelectorAll('.show-counts')).forEach(function (e) {
                e.classList.remove('show-counts');
            });
            switch (id) {
                case 'page0':
                    this.status.push(this.info_page);
                    this.status[0].classList.add('show');
                    this.status[0].classList.add('show-article');
                    page0.classList.add('nav-chosen');
                    break;
                case 'page1':
                    page1.classList.add('nav-chosen');
                    this.status.push(this.proj_container);
                    if (window.innerWidth >= 768) {
                        this.proj_list.classList.add('show');
                        this.proj_list.classList.add('show-counts');
                        this.proj_list.addEventListener('animationend', function () {
                            _this2.status[0].classList.add('show');
                            _this2.status[0].classList.add('show-article');
                        });
                    } else {
                        this.status[0].classList.add('show');
                        window.scrollTo(0, 0);
                        this.status[0].classList.add('show-article');
                    }
                    break;
                case 'page2':
                    page2.classList.add('nav-chosen');
                    this.status.push(this.learn_path);
                    if (window.innerWidth >= 768) {
                        this.learn_list.classList.add('show');
                        this.learn_list.classList.add('show-counts');
                        this.learn_list.addEventListener('animationend', function () {
                            _this2.status[0].classList.add('show');
                            _this2.status[0].classList.add('show-article');
                        });
                    } else {
                        this.status[0].classList.add('show');
                        window.scrollTo(0, 0);
                        this.status[0].classList.add('show-article');
                    }
                    break;
            }
        }

        /**
         * 选中三级标题（具体的文章），仅在桌面端有效
         * @param event {event}
         */

        /**
         * 导航菜单的事件回调，仅在桌面端有效
         * @param e {event}
         */

        /**
         * 页面底部的翻页按钮回调
         * @param e {event}
         */

        /**
         * 项目总结的收起与打开按钮节点的事件绑定函数
         * @param ele {node} DOM 节点数组的元素
         * @param idx {int} index
         */

        /**
         * 移动端导航菜单的打开与闭合逻辑
         */

        /**
         * 监控视口宽度变化是否跨越阈值。
         */

        /**
         * 监控视口宽度变化是否跨越阈值。
         */

        /**
         * 移动端导航菜单逻辑
         * @param e {event}
         */

        /**
         * 桌面Safari在animation后经过的地方滚动失效bug修正
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
UIHandle.flip.addEventListener('click', UIHandle.bottomFlip);
UIHandle.anchor.addEventListener('click', UIHandle.pageChoose);
UIHandle.entry_choose.addEventListener('click', UIHandle.itemChoose);
UIHandle.mob_drawer.addEventListener('click', UIHandle.drawerControl);
UIHandle.mob_nav.addEventListener('click', UIHandle.mobSelect);
UIHandle.flip_learn.addEventListener('click', UIHandle.bottomFlip);
UIHandle.content.addEventListener('webkitAnimationEnd', UIHandle.fixSafariScrolling);
window.addEventListener('resize', UIHandle.slim);
ajax('GET', 'https://www.rustinz.com/FileSize', IndexUI.fileSize);
//# sourceMappingURL=index.js.map
