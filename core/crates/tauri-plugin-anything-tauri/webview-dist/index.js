function e(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{u(r.next(e))}catch(e){i(e)}}function c(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,c)}u((r=r.apply(e,t||[])).next())}))}function t(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(c){return function(u){return function(c){if(n)throw new TypeError("Generator is already executing.");for(;i&&(i=0,c[0]&&(a=0)),a;)try{if(n=1,r&&(o=2&c[0]?r.return:c[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,c[1])).done)return o;switch(r=0,o&&(c=[2&c[0],o.value]),c[0]){case 0:case 1:o=c;break;case 4:return a.label++,{value:c[1],done:!1};case 5:a.label++,r=c[1],c=[0];continue;case 7:c=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==c[0]&&2!==c[0])){a=0;continue}if(3===c[0]&&(!o||c[1]>o[0]&&c[1]<o[3])){a.label=c[1];break}if(6===c[0]&&a.label<o[1]){a.label=o[1],o=c;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(c);break}o[2]&&a.ops.pop(),a.trys.pop();continue}c=t.call(e,a)}catch(e){c=[6,e],r=0}finally{n=o=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,u])}}}"function"==typeof SuppressedError&&SuppressedError;var n=Object.defineProperty;function r(e,t=!1){let n=window.crypto.getRandomValues(new Uint32Array(1))[0],r=`_${n}`;return Object.defineProperty(window,r,{value:n=>(t&&Reflect.deleteProperty(window,r),e?.(n)),writable:!1,configurable:!0}),n}async function o(e,t={}){return new Promise(((n,o)=>{let i=r((e=>{n(e),Reflect.deleteProperty(window,`_${a}`)}),!0),a=r((e=>{o(e),Reflect.deleteProperty(window,`_${i}`)}),!0);window.__TAURI_IPC__({cmd:e,callback:i,error:a,...t})}))}function i(e,t="asset"){return window.__TAURI__.convertFileSrc(e,t)}((e,t)=>{for(var r in t)n(e,r,{get:t[r],enumerable:!0})})({},{convertFileSrc:()=>i,invoke:()=>o,transformCallback:()=>r});var a=function(){function n(e){this.path=e}return n.prototype.stop=function(){return e(this,void 0,void 0,(function(){return t(this,(function(e){switch(e.label){case 0:return[4,o("plugin:anything-tauri|stop",{})];case 1:return[2,e.sent()]}}))}))},n.prototype.getFlows=function(){return e(this,void 0,void 0,(function(){return t(this,(function(e){switch(e.label){case 0:return[4,o("plugin:anything|get_flows",{path:this.path})];case 1:return[2,e.sent()]}}))}))},n.prototype.createFlow=function(n){var r=n.flowName,i=n.flowId;return e(this,void 0,void 0,(function(){return t(this,(function(e){switch(e.label){case 0:return console.log("Called createFlow in API",i,r),[4,o("plugin:anything|create_flow",{path:this.path,flow_name:r,flow_id:i})];case 1:return[2,e.sent()]}}))}))},n}();export{a as Anything};
