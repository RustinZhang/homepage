/**
 * @fileOverview 主页的操作逻辑
 * 使用 IndexUI 类实现，其中两个静态方法只是作为工具使用，除了属于主页逻辑，与其它方法关系不大
 */
/**
 * @see module: ajax
 */
"use strict"
const ajax=require('./ajax.js');
/**
 * UI控制
 */
class IndexUI {
    constructor() {
        this.toggles = Array.from(document.querySelectorAll('.toggle')); // Edge 的 forEach 不支持类数组，转换成数组或许也有性能上的优势
        this.texts = Array.from(document.querySelectorAll('.text-box')); // Array.from 兼容性很差，必须要 Babel 的 'transfer-runtime' 插件
        this.rolls = Array.from(document.querySelectorAll('.roll'));
        this.ext_below = document.querySelector('.ext-below');
        this.ext_above = document.querySelector('.ext-above');
        this.in_below = document.querySelector('.below-span');
        this.in_above = document.querySelector('.above-span');
        this.menu = document.querySelector('.anchor-mobile');
        this.nav = document.querySelector('.nav');
        this.weather= document.querySelector('.weather');
        this.html=document.querySelector('html')
    }
    
    /**
     * 天气请求的回调函数
     * @param data {string|buffer}, 服务端返回的数据
     * @TODO 待优化，与服务端配合使用 buffer
     */
    static weather(data) {
        let weather = document.querySelector('.temper')
        let city = document.querySelector('.city')
        data = JSON.parse(data);
        weather.style.backgroundImage = `url(../images/3d_60/${data.code}.png)`;
        weather.innerHTML = `${data.temp}度`;
        city.innerHTML = data.city;
    }
    
    /**
     * 获取读书笔记的文件大小，由服务端读取文件后传回
     * @param data {string|buffer}
     */
    static fileSize(data) {
        data = JSON.parse(data);
        let entries = Array.from(document.querySelectorAll('.stuff-entry'));
        entries.forEach((e) => {
            let filename = decodeURI(e.children[0].href);
            let index = filename.lastIndexOf('/') + 1;
            if (index) filename = filename.slice(index);
            e.children[1].innerHTML = data[filename];
        })
    }
    
    /**
     * 负责移动端页面导航菜单的展开闭合逻辑
     * @param change {string} chang='add'|'remove'
     */
    navClsTgl(change) {
        this.ext_above.classList[change]('active-ext-above');
        this.ext_below.classList[change]('active-ext-below');
        this.in_above.classList[change]('active-above-span');
        this.in_below.classList[change]('active-below-span');
        this.menu.classList[change]('show-menu');
        document.body.classList[change]('block-scroll');
        this.html.classList[change]('block-scroll')
        this.nav.style.backgroundColor=(change==='add')?'rgba(0,0,0,1)':'rgba(0,0,0,0.8)';
        this.weather.style.display=(change==='add')?'none':'block';
    }
    
    /**
     * 视口宽度大于767时的回调函数，一般无必要，为了应对有人在桌面端缩小窗口后点开菜单再拉大窗口，fat同理
     */
    slim = () => {
        if (innerWidth > 767) {
            this.navClsTgl('remove')
            window.removeEventListener('resize', this.slim)
            window.addEventListener('resize', this.fat)
        }
    }
    
    fat = () => {
        if (innerWidth < 768) {
            window.removeEventListener('resize', this.fat);
            window.addEventListener('resize', this.slim)
        }
    }
    /**
     * 点击遮罩上的菜单根据锚点跳转，所有的回调函数均统一使用箭头函数以避免 this 意外更改
     * @param e {event}
     */
    scroll = (e) => {
        if (e.target.tagName === 'LI') {
            this.navClsTgl('remove');
            document.querySelector(`${e.target.className}`).scrollIntoView();
        }
    }
    /**
     * The motion when click the top-left box while viewpoint < 767
     */
    navClick = () => {
        if (this.ext_above.classList.contains('active-ext-above'))
            this.navClsTgl('remove');
        else
            this.navClsTgl('add');
    }
    /**
     * 项目总结的收起与打开，总结并不包含图像（也许以后会包含），手动加载是为了让界面看起来更干净。这个函数只提供给 forEach 方法
     * @param ele {node} DOM 节点数组的元素
     * @param idx {int} index
     */
    showDetail = (ele, idx) => {
        ele.addEventListener('click', (e) => {
            if(e.target.classList.contains('roll')) // 避免点击'收起'时因文章过长位置过于靠下
            window.scrollBy(0,-parseInt(window.getComputedStyle(this.texts[idx]).getPropertyValue("height")));
            this.texts[idx].classList.toggle('show-text');
            if (this.texts[idx].classList.contains('show-text')) {
                this.rolls[idx].style.display = 'block';
                this.toggles[idx].innerHTML = "收起总结";
            } else {
                this.rolls[idx].style.display = "none";
                this.toggles[idx].innerHTML = "查看总结";
            }
        })
    }
}

let UIHandle = new IndexUI();
UIHandle.toggles.forEach(UIHandle.showDetail);
UIHandle.rolls.forEach(UIHandle.showDetail);
UIHandle.menu.addEventListener('click', UIHandle.scroll);
UIHandle.ext_above.addEventListener('click', UIHandle.navClick);
window.addEventListener('resize', UIHandle.slim);
ajax("GET", "https://www.rustinz.com/Weather", IndexUI.weather);
ajax("GET", "https://www.rustinz.com/FileSize", IndexUI.fileSize);
