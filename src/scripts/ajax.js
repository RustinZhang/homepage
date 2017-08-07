/**
 * @fileOverview 因为功能简单，不想引入太多依赖，做了一个比较简陋的 Ajax 类
 */
"use strict";
/**
 * module ajax
 */

class Ajax {
    /**
     * 直接调用 Ajax.request(),每次调用生成新的实例，实际上相当于一个空的只有static request的父类再加一个子类，比较非典型，或许会换成更直观的方法
     * @param {string} method HTTP method
     * @param {string} url
     * @param {function} callback
     * @param {string|buffer} [data=undefined] only need while method==='POST'
     */
    static request (method,url,callback,data){
        let ajax=new Ajax();
        ajax.request(method,url,callback,data);
    }
    constructor (){
        this.req=new XMLHttpRequest();
    }
    write (method, url, data){
        this.req.open(method.toUpperCase(), url);
        // TODO: 接受buffer数据
        if (method.toLowerCase() === "post") {
            this.req.send(data);
        } else {
            this.req.send();
        }
    }
    request(method,url,callback,data){
        this.write(method,url,data);
        this.req.onreadystatechange= ()=>{
            if(this.req.readyState===4){
                if(this.req.status===200){
                    callback(this.req.response);
                }
            }
        }
    }
    
}
module.exports=Ajax.request;
