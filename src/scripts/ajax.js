/**
 * @fileOverview 因为功能简单，不想引入太多依赖，做了一个比较简陋的 Ajax 类
 */
'use strict';
/**
 * 一个简易的Ajax模块,由一个Ajax类组成，详见该类
 *@module ajax
 */
/**
 * Ajax类
 */
class Ajax {
    /**
     * 直接调用 Ajax.request(),每次调用生成新的实例，实际上相当于一个空的只有static request的父类再加一个子类，比较非典型，或许会换成更直观的方法
     * @param {string} method HTTP method
     * @param {string} url
     * @param {function} callback
     * @param {string} [data=undefined] only need while method==='POST' for now string only
     */
    static request( method, url, callback, data ) {
        let ajax = new Ajax();
        ajax.request( method, url, callback, data );
    }

    constructor() {
        this.req = new XMLHttpRequest();
    }

    /**
     * 仅供内部调用，发送数据
     * @param method {string} http方法
     * @param url {string}
     * @param [data] {string} 目前只能字符串，将来与服务器一起改成buffer
     */
    write( method, url, data ) {
        this.req.open( method.toUpperCase(), url );
        if ( method.toLowerCase() === 'post' ) {
            this.req.send( data );
        }
        else {
            this.req.send();
        }
    }

    /**
     * 仅供内部调用，处理请求
     * @param method {string} http method
     * @param url {string}
     * @param callback {function}
     * @param [data] {string}
     */
    request( method, url, callback, data ) {
        this.write( method, url, data );
        this.req.onreadystatechange = () => {
            if ( this.req.readyState === 4 ) {
                if ( this.req.status === 200 ) {
                    callback( this.req.response );
                }
            }
        };
    }
}
/**
 * 导出静态方法可直接调用
 * @type {Ajax.request}
 */
module.exports = Ajax.request;
