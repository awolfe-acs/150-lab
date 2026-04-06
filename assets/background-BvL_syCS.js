const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/performanceDetector-D0hC93nr.js","assets/logger-2Ii2FPkr.js"])))=>i.map(i=>d[i]);
import{_ as Vt}from"./index-BSJj6e4k.js";import le from"./performanceDetector-D0hC93nr.js";import{l as A}from"./logger-2Ii2FPkr.js";import uo from"./aemModeDetector-DID0UQIE.js";import"./vendor-gsap-B2uKOqL4.js";function $i(i){if(!(typeof window>"u")){var e=document.createElement("style");return e.setAttribute("type","text/css"),e.innerHTML=i,document.head.appendChild(e),i}}function Qe(i,e){var t=i.__state.conversionName.toString(),n=Math.round(i.r),a=Math.round(i.g),d=Math.round(i.b),h=i.a,v=Math.round(i.h),g=i.s.toFixed(1),O=i.v.toFixed(1);if(e||t==="THREE_CHAR_HEX"||t==="SIX_CHAR_HEX"){for(var L=i.hex.toString(16);L.length<6;)L="0"+L;return"#"+L}else{if(t==="CSS_RGB")return"rgb("+n+","+a+","+d+")";if(t==="CSS_RGBA")return"rgba("+n+","+a+","+d+","+h+")";if(t==="HEX")return"0x"+i.hex.toString(16);if(t==="RGB_ARRAY")return"["+n+","+a+","+d+"]";if(t==="RGBA_ARRAY")return"["+n+","+a+","+d+","+h+"]";if(t==="RGB_OBJ")return"{r:"+n+",g:"+a+",b:"+d+"}";if(t==="RGBA_OBJ")return"{r:"+n+",g:"+a+",b:"+d+",a:"+h+"}";if(t==="HSV_OBJ")return"{h:"+v+",s:"+g+",v:"+O+"}";if(t==="HSVA_OBJ")return"{h:"+v+",s:"+g+",v:"+O+",a:"+h+"}"}return"unknown format"}var Jo=Array.prototype.forEach,dt=Array.prototype.slice,p={BREAK:{},extend:function(e){return this.each(dt.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach(function(a){this.isUndefined(t[a])||(e[a]=t[a])}.bind(this))},this),e},defaults:function(e){return this.each(dt.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach(function(a){this.isUndefined(e[a])&&(e[a]=t[a])}.bind(this))},this),e},compose:function(){var e=dt.call(arguments);return function(){for(var t=dt.call(arguments),n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},each:function(e,t,n){if(e){if(Jo&&e.forEach&&e.forEach===Jo)e.forEach(t,n);else if(e.length===e.length+0){var a=void 0,d=void 0;for(a=0,d=e.length;a<d;a++)if(a in e&&t.call(n,e[a],a)===this.BREAK)return}else for(var h in e)if(t.call(n,e[h],h)===this.BREAK)return}},defer:function(e){setTimeout(e,0)},debounce:function(e,t,n){var a=void 0;return function(){var d=this,h=arguments;function v(){a=null,n||e.apply(d,h)}var g=n||!a;clearTimeout(a),a=setTimeout(v,t),g&&e.apply(d,h)}},toArray:function(e){return e.toArray?e.toArray():dt.call(e)},isUndefined:function(e){return e===void 0},isNull:function(e){return e===null},isNaN:(function(i){function e(t){return i.apply(this,arguments)}return e.toString=function(){return i.toString()},e})(function(i){return isNaN(i)}),isArray:Array.isArray||function(i){return i.constructor===Array},isObject:function(e){return e===Object(e)},isNumber:function(e){return e===e+0},isString:function(e){return e===e+""},isBoolean:function(e){return e===!1||e===!0},isFunction:function(e){return e instanceof Function}},Yi=[{litmus:p.isString,conversions:{THREE_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString()+t[1].toString()+t[2].toString()+t[2].toString()+t[3].toString()+t[3].toString(),0)}},write:Qe},SIX_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9]{6})$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString(),0)}},write:Qe},CSS_RGB:{read:function(e){var t=e.match(/^rgb\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3])}},write:Qe},CSS_RGBA:{read:function(e){var t=e.match(/^rgba\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3]),a:parseFloat(t[4])}},write:Qe}}},{litmus:p.isNumber,conversions:{HEX:{read:function(e){return{space:"HEX",hex:e,conversionName:"HEX"}},write:function(e){return e.hex}}}},{litmus:p.isArray,conversions:{RGB_ARRAY:{read:function(e){return e.length!==3?!1:{space:"RGB",r:e[0],g:e[1],b:e[2]}},write:function(e){return[e.r,e.g,e.b]}},RGBA_ARRAY:{read:function(e){return e.length!==4?!1:{space:"RGB",r:e[0],g:e[1],b:e[2],a:e[3]}},write:function(e){return[e.r,e.g,e.b,e.a]}}}},{litmus:p.isObject,conversions:{RGBA_OBJ:{read:function(e){return p.isNumber(e.r)&&p.isNumber(e.g)&&p.isNumber(e.b)&&p.isNumber(e.a)?{space:"RGB",r:e.r,g:e.g,b:e.b,a:e.a}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b,a:e.a}}},RGB_OBJ:{read:function(e){return p.isNumber(e.r)&&p.isNumber(e.g)&&p.isNumber(e.b)?{space:"RGB",r:e.r,g:e.g,b:e.b}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b}}},HSVA_OBJ:{read:function(e){return p.isNumber(e.h)&&p.isNumber(e.s)&&p.isNumber(e.v)&&p.isNumber(e.a)?{space:"HSV",h:e.h,s:e.s,v:e.v,a:e.a}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v,a:e.a}}},HSV_OBJ:{read:function(e){return p.isNumber(e.h)&&p.isNumber(e.s)&&p.isNumber(e.v)?{space:"HSV",h:e.h,s:e.s,v:e.v}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v}}}}}],ct=void 0,It=void 0,go=function(){It=!1;var e=arguments.length>1?p.toArray(arguments):arguments[0];return p.each(Yi,function(t){if(t.litmus(e))return p.each(t.conversions,function(n,a){if(ct=n.read(e),It===!1&&ct!==!1)return It=ct,ct.conversionName=a,ct.conversion=n,p.BREAK}),p.BREAK}),It},Qo=void 0,Ut={hsv_to_rgb:function(e,t,n){var a=Math.floor(e/60)%6,d=e/60-Math.floor(e/60),h=n*(1-t),v=n*(1-d*t),g=n*(1-(1-d)*t),O=[[n,g,h],[v,n,h],[h,n,g],[h,v,n],[g,h,n],[n,h,v]][a];return{r:O[0]*255,g:O[1]*255,b:O[2]*255}},rgb_to_hsv:function(e,t,n){var a=Math.min(e,t,n),d=Math.max(e,t,n),h=d-a,v=void 0,g=void 0;if(d!==0)g=h/d;else return{h:NaN,s:0,v:0};return e===d?v=(t-n)/h:t===d?v=2+(n-e)/h:v=4+(e-t)/h,v/=6,v<0&&(v+=1),{h:v*360,s:g,v:d/255}},rgb_to_hex:function(e,t,n){var a=this.hex_with_component(0,2,e);return a=this.hex_with_component(a,1,t),a=this.hex_with_component(a,0,n),a},component_from_hex:function(e,t){return e>>t*8&255},hex_with_component:function(e,t,n){return n<<(Qo=t*8)|e&~(255<<Qo)}},ji=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(i){return typeof i}:function(i){return i&&typeof Symbol=="function"&&i.constructor===Symbol&&i!==Symbol.prototype?"symbol":typeof i},_e=function(i,e){if(!(i instanceof e))throw new TypeError("Cannot call a class as a function")},ye=(function(){function i(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}})(),Le=function i(e,t,n){e===null&&(e=Function.prototype);var a=Object.getOwnPropertyDescriptor(e,t);if(a===void 0){var d=Object.getPrototypeOf(e);return d===null?void 0:i(d,t,n)}else{if("value"in a)return a.value;var h=a.get;return h===void 0?void 0:h.call(n)}},Re=function(i,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);i.prototype=Object.create(e&&e.prototype,{constructor:{value:i,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(i,e):i.__proto__=e)},Ie=function(i,e){if(!i)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:i},Z=(function(){function i(){if(_e(this,i),this.__state=go.apply(this,arguments),this.__state===!1)throw new Error("Failed to interpret color arguments");this.__state.a=this.__state.a||1}return ye(i,[{key:"toString",value:function(){return Qe(this)}},{key:"toHexString",value:function(){return Qe(this,!0)}},{key:"toOriginal",value:function(){return this.__state.conversion.write(this)}}]),i})();function Co(i,e,t){Object.defineProperty(i,e,{get:function(){return this.__state.space==="RGB"?this.__state[e]:(Z.recalculateRGB(this,e,t),this.__state[e])},set:function(a){this.__state.space!=="RGB"&&(Z.recalculateRGB(this,e,t),this.__state.space="RGB"),this.__state[e]=a}})}function So(i,e){Object.defineProperty(i,e,{get:function(){return this.__state.space==="HSV"?this.__state[e]:(Z.recalculateHSV(this),this.__state[e])},set:function(n){this.__state.space!=="HSV"&&(Z.recalculateHSV(this),this.__state.space="HSV"),this.__state[e]=n}})}Z.recalculateRGB=function(i,e,t){if(i.__state.space==="HEX")i.__state[e]=Ut.component_from_hex(i.__state.hex,t);else if(i.__state.space==="HSV")p.extend(i.__state,Ut.hsv_to_rgb(i.__state.h,i.__state.s,i.__state.v));else throw new Error("Corrupted color state")};Z.recalculateHSV=function(i){var e=Ut.rgb_to_hsv(i.r,i.g,i.b);p.extend(i.__state,{s:e.s,v:e.v}),p.isNaN(e.h)?p.isUndefined(i.__state.h)&&(i.__state.h=0):i.__state.h=e.h};Z.COMPONENTS=["r","g","b","h","s","v","hex","a"];Co(Z.prototype,"r",2);Co(Z.prototype,"g",1);Co(Z.prototype,"b",0);So(Z.prototype,"h");So(Z.prototype,"s");So(Z.prototype,"v");Object.defineProperty(Z.prototype,"a",{get:function(){return this.__state.a},set:function(e){this.__state.a=e}});Object.defineProperty(Z.prototype,"hex",{get:function(){return this.__state.space!=="HEX"&&(this.__state.hex=Ut.rgb_to_hex(this.r,this.g,this.b),this.__state.space="HEX"),this.__state.hex},set:function(e){this.__state.space="HEX",this.__state.hex=e}});var Ue=(function(){function i(e,t){_e(this,i),this.initialValue=e[t],this.domElement=document.createElement("div"),this.object=e,this.property=t,this.__onChange=void 0,this.__onFinishChange=void 0}return ye(i,[{key:"onChange",value:function(t){return this.__onChange=t,this}},{key:"onFinishChange",value:function(t){return this.__onFinishChange=t,this}},{key:"setValue",value:function(t){return this.object[this.property]=t,this.__onChange&&this.__onChange.call(this,t),this.updateDisplay(),this}},{key:"getValue",value:function(){return this.object[this.property]}},{key:"updateDisplay",value:function(){return this}},{key:"isModified",value:function(){return this.initialValue!==this.getValue()}}]),i})(),Xi={HTMLEvents:["change"],MouseEvents:["click","mousemove","mousedown","mouseup","mouseover"],KeyboardEvents:["keydown"]},di={};p.each(Xi,function(i,e){p.each(i,function(t){di[t]=e})});var qi=/(\d+(\.\d+)?)px/;function xe(i){if(i==="0"||p.isUndefined(i))return 0;var e=i.match(qi);return p.isNull(e)?0:parseFloat(e[1])}var c={makeSelectable:function(e,t){e===void 0||e.style===void 0||(e.onselectstart=t?function(){return!1}:function(){},e.style.MozUserSelect=t?"auto":"none",e.style.KhtmlUserSelect=t?"auto":"none",e.unselectable=t?"on":"off")},makeFullscreen:function(e,t,n){var a=n,d=t;p.isUndefined(d)&&(d=!0),p.isUndefined(a)&&(a=!0),e.style.position="absolute",d&&(e.style.left=0,e.style.right=0),a&&(e.style.top=0,e.style.bottom=0)},fakeEvent:function(e,t,n,a){var d=n||{},h=di[t];if(!h)throw new Error("Event type "+t+" not supported.");var v=document.createEvent(h);switch(h){case"MouseEvents":{var g=d.x||d.clientX||0,O=d.y||d.clientY||0;v.initMouseEvent(t,d.bubbles||!1,d.cancelable||!0,window,d.clickCount||1,0,0,g,O,!1,!1,!1,!1,0,null);break}case"KeyboardEvents":{var L=v.initKeyboardEvent||v.initKeyEvent;p.defaults(d,{cancelable:!0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,keyCode:void 0,charCode:void 0}),L(t,d.bubbles||!1,d.cancelable,window,d.ctrlKey,d.altKey,d.shiftKey,d.metaKey,d.keyCode,d.charCode);break}default:{v.initEvent(t,d.bubbles||!1,d.cancelable||!0);break}}p.defaults(v,a),e.dispatchEvent(v)},bind:function(e,t,n,a){var d=a||!1;return e.addEventListener?e.addEventListener(t,n,d):e.attachEvent&&e.attachEvent("on"+t,n),c},unbind:function(e,t,n,a){var d=a||!1;return e.removeEventListener?e.removeEventListener(t,n,d):e.detachEvent&&e.detachEvent("on"+t,n),c},addClass:function(e,t){if(e.className===void 0)e.className=t;else if(e.className!==t){var n=e.className.split(/ +/);n.indexOf(t)===-1&&(n.push(t),e.className=n.join(" ").replace(/^\s+/,"").replace(/\s+$/,""))}return c},removeClass:function(e,t){if(t)if(e.className===t)e.removeAttribute("class");else{var n=e.className.split(/ +/),a=n.indexOf(t);a!==-1&&(n.splice(a,1),e.className=n.join(" "))}else e.className=void 0;return c},hasClass:function(e,t){return new RegExp("(?:^|\\s+)"+t+"(?:\\s+|$)").test(e.className)||!1},getWidth:function(e){var t=getComputedStyle(e);return xe(t["border-left-width"])+xe(t["border-right-width"])+xe(t["padding-left"])+xe(t["padding-right"])+xe(t.width)},getHeight:function(e){var t=getComputedStyle(e);return xe(t["border-top-width"])+xe(t["border-bottom-width"])+xe(t["padding-top"])+xe(t["padding-bottom"])+xe(t.height)},getOffset:function(e){var t=e,n={left:0,top:0};if(t.offsetParent)do n.left+=t.offsetLeft,n.top+=t.offsetTop,t=t.offsetParent;while(t);return n},isActive:function(e){return e===document.activeElement&&(e.type||e.href)}},ci=(function(i){Re(e,i);function e(t,n){_e(this,e);var a=Ie(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),d=a;a.__prev=a.getValue(),a.__checkbox=document.createElement("input"),a.__checkbox.setAttribute("type","checkbox");function h(){d.setValue(!d.__prev)}return c.bind(a.__checkbox,"change",h,!1),a.domElement.appendChild(a.__checkbox),a.updateDisplay(),a}return ye(e,[{key:"setValue",value:function(n){var a=Le(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),this.__prev=this.getValue(),a}},{key:"updateDisplay",value:function(){return this.getValue()===!0?(this.__checkbox.setAttribute("checked","checked"),this.__checkbox.checked=!0,this.__prev=!0):(this.__checkbox.checked=!1,this.__prev=!1),Le(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e})(Ue),Ki=(function(i){Re(e,i);function e(t,n,a){_e(this,e);var d=Ie(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),h=a,v=d;if(d.__select=document.createElement("select"),p.isArray(h)){var g={};p.each(h,function(O){g[O]=O}),h=g}return p.each(h,function(O,L){var M=document.createElement("option");M.innerHTML=L,M.setAttribute("value",O),v.__select.appendChild(M)}),d.updateDisplay(),c.bind(d.__select,"change",function(){var O=this.options[this.selectedIndex].value;v.setValue(O)}),d.domElement.appendChild(d.__select),d}return ye(e,[{key:"setValue",value:function(n){var a=Le(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),a}},{key:"updateDisplay",value:function(){return c.isActive(this.__select)?this:(this.__select.value=this.getValue(),Le(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this))}}]),e})(Ue),Zi=(function(i){Re(e,i);function e(t,n){_e(this,e);var a=Ie(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),d=a;function h(){d.setValue(d.__input.value)}function v(){d.__onFinishChange&&d.__onFinishChange.call(d,d.getValue())}return a.__input=document.createElement("input"),a.__input.setAttribute("type","text"),c.bind(a.__input,"keyup",h),c.bind(a.__input,"change",h),c.bind(a.__input,"blur",v),c.bind(a.__input,"keydown",function(g){g.keyCode===13&&this.blur()}),a.updateDisplay(),a.domElement.appendChild(a.__input),a}return ye(e,[{key:"updateDisplay",value:function(){return c.isActive(this.__input)||(this.__input.value=this.getValue()),Le(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e})(Ue);function ei(i){var e=i.toString();return e.indexOf(".")>-1?e.length-e.indexOf(".")-1:0}var fi=(function(i){Re(e,i);function e(t,n,a){_e(this,e);var d=Ie(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),h=a||{};return d.__min=h.min,d.__max=h.max,d.__step=h.step,p.isUndefined(d.__step)?d.initialValue===0?d.__impliedStep=1:d.__impliedStep=Math.pow(10,Math.floor(Math.log(Math.abs(d.initialValue))/Math.LN10))/10:d.__impliedStep=d.__step,d.__precision=ei(d.__impliedStep),d}return ye(e,[{key:"setValue",value:function(n){var a=n;return this.__min!==void 0&&a<this.__min?a=this.__min:this.__max!==void 0&&a>this.__max&&(a=this.__max),this.__step!==void 0&&a%this.__step!==0&&(a=Math.round(a/this.__step)*this.__step),Le(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,a)}},{key:"min",value:function(n){return this.__min=n,this}},{key:"max",value:function(n){return this.__max=n,this}},{key:"step",value:function(n){return this.__step=n,this.__impliedStep=n,this.__precision=ei(n),this}}]),e})(Ue);function Ji(i,e){var t=Math.pow(10,e);return Math.round(i*t)/t}var Nt=(function(i){Re(e,i);function e(t,n,a){_e(this,e);var d=Ie(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,a));d.__truncationSuspended=!1;var h=d,v=void 0;function g(){var V=parseFloat(h.__input.value);p.isNaN(V)||h.setValue(V)}function O(){h.__onFinishChange&&h.__onFinishChange.call(h,h.getValue())}function L(){O()}function M(V){var z=v-V.clientY;h.setValue(h.getValue()+z*h.__impliedStep),v=V.clientY}function I(){c.unbind(window,"mousemove",M),c.unbind(window,"mouseup",I),O()}function K(V){c.bind(window,"mousemove",M),c.bind(window,"mouseup",I),v=V.clientY}return d.__input=document.createElement("input"),d.__input.setAttribute("type","text"),c.bind(d.__input,"change",g),c.bind(d.__input,"blur",L),c.bind(d.__input,"mousedown",K),c.bind(d.__input,"keydown",function(V){V.keyCode===13&&(h.__truncationSuspended=!0,this.blur(),h.__truncationSuspended=!1,O())}),d.updateDisplay(),d.domElement.appendChild(d.__input),d}return ye(e,[{key:"updateDisplay",value:function(){return this.__input.value=this.__truncationSuspended?this.getValue():Ji(this.getValue(),this.__precision),Le(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e})(fi);function ti(i,e,t,n,a){return n+(a-n)*((i-e)/(t-e))}var vo=(function(i){Re(e,i);function e(t,n,a,d,h){_e(this,e);var v=Ie(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,{min:a,max:d,step:h})),g=v;v.__background=document.createElement("div"),v.__foreground=document.createElement("div"),c.bind(v.__background,"mousedown",O),c.bind(v.__background,"touchstart",I),c.addClass(v.__background,"slider"),c.addClass(v.__foreground,"slider-fg");function O(z){document.activeElement.blur(),c.bind(window,"mousemove",L),c.bind(window,"mouseup",M),L(z)}function L(z){z.preventDefault();var $=g.__background.getBoundingClientRect();return g.setValue(ti(z.clientX,$.left,$.right,g.__min,g.__max)),!1}function M(){c.unbind(window,"mousemove",L),c.unbind(window,"mouseup",M),g.__onFinishChange&&g.__onFinishChange.call(g,g.getValue())}function I(z){z.touches.length===1&&(c.bind(window,"touchmove",K),c.bind(window,"touchend",V),K(z))}function K(z){var $=z.touches[0].clientX,J=g.__background.getBoundingClientRect();g.setValue(ti($,J.left,J.right,g.__min,g.__max))}function V(){c.unbind(window,"touchmove",K),c.unbind(window,"touchend",V),g.__onFinishChange&&g.__onFinishChange.call(g,g.getValue())}return v.updateDisplay(),v.__background.appendChild(v.__foreground),v.domElement.appendChild(v.__background),v}return ye(e,[{key:"updateDisplay",value:function(){var n=(this.getValue()-this.__min)/(this.__max-this.__min);return this.__foreground.style.width=n*100+"%",Le(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e})(fi),ui=(function(i){Re(e,i);function e(t,n,a){_e(this,e);var d=Ie(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),h=d;return d.__button=document.createElement("div"),d.__button.innerHTML=a===void 0?"Fire":a,c.bind(d.__button,"click",function(v){return v.preventDefault(),h.fire(),!1}),c.addClass(d.__button,"button"),d.domElement.appendChild(d.__button),d}return ye(e,[{key:"fire",value:function(){this.__onChange&&this.__onChange.call(this),this.getValue().call(this.object),this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue())}}]),e})(Ue),_o=(function(i){Re(e,i);function e(t,n){_e(this,e);var a=Ie(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));a.__color=new Z(a.getValue()),a.__temp=new Z(0);var d=a;a.domElement=document.createElement("div"),c.makeSelectable(a.domElement,!1),a.__selector=document.createElement("div"),a.__selector.className="selector",a.__saturation_field=document.createElement("div"),a.__saturation_field.className="saturation-field",a.__field_knob=document.createElement("div"),a.__field_knob.className="field-knob",a.__field_knob_border="2px solid ",a.__hue_knob=document.createElement("div"),a.__hue_knob.className="hue-knob",a.__hue_field=document.createElement("div"),a.__hue_field.className="hue-field",a.__input=document.createElement("input"),a.__input.type="text",a.__input_textShadow="0 1px 1px ",c.bind(a.__input,"keydown",function(z){z.keyCode===13&&M.call(this)}),c.bind(a.__input,"blur",M),c.bind(a.__selector,"mousedown",function(){c.addClass(this,"drag").bind(window,"mouseup",function(){c.removeClass(d.__selector,"drag")})}),c.bind(a.__selector,"touchstart",function(){c.addClass(this,"drag").bind(window,"touchend",function(){c.removeClass(d.__selector,"drag")})});var h=document.createElement("div");p.extend(a.__selector.style,{width:"122px",height:"102px",padding:"3px",backgroundColor:"#222",boxShadow:"0px 1px 3px rgba(0,0,0,0.3)"}),p.extend(a.__field_knob.style,{position:"absolute",width:"12px",height:"12px",border:a.__field_knob_border+(a.__color.v<.5?"#fff":"#000"),boxShadow:"0px 1px 3px rgba(0,0,0,0.5)",borderRadius:"12px",zIndex:1}),p.extend(a.__hue_knob.style,{position:"absolute",width:"15px",height:"2px",borderRight:"4px solid #fff",zIndex:1}),p.extend(a.__saturation_field.style,{width:"100px",height:"100px",border:"1px solid #555",marginRight:"3px",display:"inline-block",cursor:"pointer"}),p.extend(h.style,{width:"100%",height:"100%",background:"none"}),oi(h,"top","rgba(0,0,0,0)","#000"),p.extend(a.__hue_field.style,{width:"15px",height:"100px",border:"1px solid #555",cursor:"ns-resize",position:"absolute",top:"3px",right:"3px"}),en(a.__hue_field),p.extend(a.__input.style,{outline:"none",textAlign:"center",color:"#fff",border:0,fontWeight:"bold",textShadow:a.__input_textShadow+"rgba(0,0,0,0.7)"}),c.bind(a.__saturation_field,"mousedown",v),c.bind(a.__saturation_field,"touchstart",v),c.bind(a.__field_knob,"mousedown",v),c.bind(a.__field_knob,"touchstart",v),c.bind(a.__hue_field,"mousedown",g),c.bind(a.__hue_field,"touchstart",g);function v(z){K(z),c.bind(window,"mousemove",K),c.bind(window,"touchmove",K),c.bind(window,"mouseup",O),c.bind(window,"touchend",O)}function g(z){V(z),c.bind(window,"mousemove",V),c.bind(window,"touchmove",V),c.bind(window,"mouseup",L),c.bind(window,"touchend",L)}function O(){c.unbind(window,"mousemove",K),c.unbind(window,"touchmove",K),c.unbind(window,"mouseup",O),c.unbind(window,"touchend",O),I()}function L(){c.unbind(window,"mousemove",V),c.unbind(window,"touchmove",V),c.unbind(window,"mouseup",L),c.unbind(window,"touchend",L),I()}function M(){var z=go(this.value);z!==!1?(d.__color.__state=z,d.setValue(d.__color.toOriginal())):this.value=d.__color.toString()}function I(){d.__onFinishChange&&d.__onFinishChange.call(d,d.__color.toOriginal())}a.__saturation_field.appendChild(h),a.__selector.appendChild(a.__field_knob),a.__selector.appendChild(a.__saturation_field),a.__selector.appendChild(a.__hue_field),a.__hue_field.appendChild(a.__hue_knob),a.domElement.appendChild(a.__input),a.domElement.appendChild(a.__selector),a.updateDisplay();function K(z){z.type.indexOf("touch")===-1&&z.preventDefault();var $=d.__saturation_field.getBoundingClientRect(),J=z.touches&&z.touches[0]||z,Me=J.clientX,re=J.clientY,de=(Me-$.left)/($.right-$.left),Oe=1-(re-$.top)/($.bottom-$.top);return Oe>1?Oe=1:Oe<0&&(Oe=0),de>1?de=1:de<0&&(de=0),d.__color.v=Oe,d.__color.s=de,d.setValue(d.__color.toOriginal()),!1}function V(z){z.type.indexOf("touch")===-1&&z.preventDefault();var $=d.__hue_field.getBoundingClientRect(),J=z.touches&&z.touches[0]||z,Me=J.clientY,re=1-(Me-$.top)/($.bottom-$.top);return re>1?re=1:re<0&&(re=0),d.__color.h=re*360,d.setValue(d.__color.toOriginal()),!1}return a}return ye(e,[{key:"updateDisplay",value:function(){var n=go(this.getValue());if(n!==!1){var a=!1;p.each(Z.COMPONENTS,function(v){if(!p.isUndefined(n[v])&&!p.isUndefined(this.__color.__state[v])&&n[v]!==this.__color.__state[v])return a=!0,{}},this),a&&p.extend(this.__color.__state,n)}p.extend(this.__temp.__state,this.__color.__state),this.__temp.a=1;var d=this.__color.v<.5||this.__color.s>.5?255:0,h=255-d;p.extend(this.__field_knob.style,{marginLeft:100*this.__color.s-7+"px",marginTop:100*(1-this.__color.v)-7+"px",backgroundColor:this.__temp.toHexString(),border:this.__field_knob_border+"rgb("+d+","+d+","+d+")"}),this.__hue_knob.style.marginTop=(1-this.__color.h/360)*100+"px",this.__temp.s=1,this.__temp.v=1,oi(this.__saturation_field,"left","#fff",this.__temp.toHexString()),this.__input.value=this.__color.toString(),p.extend(this.__input.style,{backgroundColor:this.__color.toHexString(),color:"rgb("+d+","+d+","+d+")",textShadow:this.__input_textShadow+"rgba("+h+","+h+","+h+",.7)"})}}]),e})(Ue),Qi=["-moz-","-o-","-webkit-","-ms-",""];function oi(i,e,t,n){i.style.background="",p.each(Qi,function(a){i.style.cssText+="background: "+a+"linear-gradient("+e+", "+t+" 0%, "+n+" 100%); "})}function en(i){i.style.background="",i.style.cssText+="background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);",i.style.cssText+="background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",i.style.cssText+="background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",i.style.cssText+="background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",i.style.cssText+="background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"}var tn={load:function(e,t){var n=t||document,a=n.createElement("link");a.type="text/css",a.rel="stylesheet",a.href=e,n.getElementsByTagName("head")[0].appendChild(a)},inject:function(e,t){var n=t||document,a=document.createElement("style");a.type="text/css",a.innerHTML=e;var d=n.getElementsByTagName("head")[0];try{d.appendChild(a)}catch{}}},on=`<div id="dg-save" class="dg dialogue">

  Here's the new load parameter for your <code>GUI</code>'s constructor:

  <textarea id="dg-new-constructor"></textarea>

  <div id="dg-save-locally">

    <input id="dg-local-storage" type="checkbox"/> Automatically save
    values to <code>localStorage</code> on exit.

    <div id="dg-local-explain">The values saved to <code>localStorage</code> will
      override those passed to <code>dat.GUI</code>'s constructor. This makes it
      easier to work incrementally, but <code>localStorage</code> is fragile,
      and your friends may not see the same values you do.

    </div>

  </div>

</div>`,nn=function(e,t){var n=e[t];return p.isArray(arguments[2])||p.isObject(arguments[2])?new Ki(e,t,arguments[2]):p.isNumber(n)?p.isNumber(arguments[2])&&p.isNumber(arguments[3])?p.isNumber(arguments[4])?new vo(e,t,arguments[2],arguments[3],arguments[4]):new vo(e,t,arguments[2],arguments[3]):p.isNumber(arguments[4])?new Nt(e,t,{min:arguments[2],max:arguments[3],step:arguments[4]}):new Nt(e,t,{min:arguments[2],max:arguments[3]}):p.isString(n)?new Zi(e,t):p.isFunction(n)?new ui(e,t,""):p.isBoolean(n)?new ci(e,t):null};function an(i){setTimeout(i,1e3/60)}var rn=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||an,sn=(function(){function i(){_e(this,i),this.backgroundElement=document.createElement("div"),p.extend(this.backgroundElement.style,{backgroundColor:"rgba(0,0,0,0.8)",top:0,left:0,display:"none",zIndex:"1000",opacity:0,WebkitTransition:"opacity 0.2s linear",transition:"opacity 0.2s linear"}),c.makeFullscreen(this.backgroundElement),this.backgroundElement.style.position="fixed",this.domElement=document.createElement("div"),p.extend(this.domElement.style,{position:"fixed",display:"none",zIndex:"1001",opacity:0,WebkitTransition:"-webkit-transform 0.2s ease-out, opacity 0.2s linear",transition:"transform 0.2s ease-out, opacity 0.2s linear"}),document.body.appendChild(this.backgroundElement),document.body.appendChild(this.domElement);var e=this;c.bind(this.backgroundElement,"click",function(){e.hide()})}return ye(i,[{key:"show",value:function(){var t=this;this.backgroundElement.style.display="block",this.domElement.style.display="block",this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)",this.layout(),p.defer(function(){t.backgroundElement.style.opacity=1,t.domElement.style.opacity=1,t.domElement.style.webkitTransform="scale(1)"})}},{key:"hide",value:function(){var t=this,n=function a(){t.domElement.style.display="none",t.backgroundElement.style.display="none",c.unbind(t.domElement,"webkitTransitionEnd",a),c.unbind(t.domElement,"transitionend",a),c.unbind(t.domElement,"oTransitionEnd",a)};c.bind(this.domElement,"webkitTransitionEnd",n),c.bind(this.domElement,"transitionend",n),c.bind(this.domElement,"oTransitionEnd",n),this.backgroundElement.style.opacity=0,this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)"}},{key:"layout",value:function(){this.domElement.style.left=window.innerWidth/2-c.getWidth(this.domElement)/2+"px",this.domElement.style.top=window.innerHeight/2-c.getHeight(this.domElement)/2+"px"}}]),i})(),ln=$i(`.dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .cr.function .property-name{width:100%}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}
`);tn.inject(ln);var ii="dg",ni=72,ai=20,mt="Default",ut=(function(){try{return!!window.localStorage}catch{return!1}})(),ht=void 0,ri=!0,Ze=void 0,ho=!1,hi=[],U=function i(e){var t=this,n=e||{};this.domElement=document.createElement("div"),this.__ul=document.createElement("ul"),this.domElement.appendChild(this.__ul),c.addClass(this.domElement,ii),this.__folders={},this.__controllers=[],this.__rememberedObjects=[],this.__rememberedObjectIndecesToControllers=[],this.__listening=[],n=p.defaults(n,{closeOnTop:!1,autoPlace:!0,width:i.DEFAULT_WIDTH}),n=p.defaults(n,{resizable:n.autoPlace,hideable:n.autoPlace}),p.isUndefined(n.load)?n.load={preset:mt}:n.preset&&(n.load.preset=n.preset),p.isUndefined(n.parent)&&n.hideable&&hi.push(this),n.resizable=p.isUndefined(n.parent)&&n.resizable,n.autoPlace&&p.isUndefined(n.scrollable)&&(n.scrollable=!0);var a=ut&&localStorage.getItem(Je(this,"isLocal"))==="true",d=void 0,h=void 0;if(Object.defineProperties(this,{parent:{get:function(){return n.parent}},scrollable:{get:function(){return n.scrollable}},autoPlace:{get:function(){return n.autoPlace}},closeOnTop:{get:function(){return n.closeOnTop}},preset:{get:function(){return t.parent?t.getRoot().preset:n.load.preset},set:function(I){t.parent?t.getRoot().preset=I:n.load.preset=I,un(this),t.revert()}},width:{get:function(){return n.width},set:function(I){n.width=I,wo(t,I)}},name:{get:function(){return n.name},set:function(I){n.name=I,h&&(h.innerHTML=n.name)}},closed:{get:function(){return n.closed},set:function(I){n.closed=I,n.closed?c.addClass(t.__ul,i.CLASS_CLOSED):c.removeClass(t.__ul,i.CLASS_CLOSED),this.onResize(),t.__closeButton&&(t.__closeButton.innerHTML=I?i.TEXT_OPEN:i.TEXT_CLOSED)}},load:{get:function(){return n.load}},useLocalStorage:{get:function(){return a},set:function(I){ut&&(a=I,I?c.bind(window,"unload",d):c.unbind(window,"unload",d),localStorage.setItem(Je(t,"isLocal"),I))}}}),p.isUndefined(n.parent)){if(this.closed=n.closed||!1,c.addClass(this.domElement,i.CLASS_MAIN),c.makeSelectable(this.domElement,!1),ut&&a){t.useLocalStorage=!0;var v=localStorage.getItem(Je(this,"gui"));v&&(n.load=JSON.parse(v))}this.__closeButton=document.createElement("div"),this.__closeButton.innerHTML=i.TEXT_CLOSED,c.addClass(this.__closeButton,i.CLASS_CLOSE_BUTTON),n.closeOnTop?(c.addClass(this.__closeButton,i.CLASS_CLOSE_TOP),this.domElement.insertBefore(this.__closeButton,this.domElement.childNodes[0])):(c.addClass(this.__closeButton,i.CLASS_CLOSE_BOTTOM),this.domElement.appendChild(this.__closeButton)),c.bind(this.__closeButton,"click",function(){t.closed=!t.closed})}else{n.closed===void 0&&(n.closed=!0);var g=document.createTextNode(n.name);c.addClass(g,"controller-name"),h=xo(t,g);var O=function(I){return I.preventDefault(),t.closed=!t.closed,!1};c.addClass(this.__ul,i.CLASS_CLOSED),c.addClass(h,"title"),c.bind(h,"click",O),n.closed||(this.closed=!1)}n.autoPlace&&(p.isUndefined(n.parent)&&(ri&&(Ze=document.createElement("div"),c.addClass(Ze,ii),c.addClass(Ze,i.CLASS_AUTO_PLACE_CONTAINER),document.body.appendChild(Ze),ri=!1),Ze.appendChild(this.domElement),c.addClass(this.domElement,i.CLASS_AUTO_PLACE)),this.parent||wo(t,n.width)),this.__resizeHandler=function(){t.onResizeDebounced()},c.bind(window,"resize",this.__resizeHandler),c.bind(this.__ul,"webkitTransitionEnd",this.__resizeHandler),c.bind(this.__ul,"transitionend",this.__resizeHandler),c.bind(this.__ul,"oTransitionEnd",this.__resizeHandler),this.onResize(),n.resizable&&fn(this),d=function(){ut&&localStorage.getItem(Je(t,"isLocal"))==="true"&&localStorage.setItem(Je(t,"gui"),JSON.stringify(t.getSaveObject()))},this.saveToLocalStorageIfPossible=d;function L(){var M=t.getRoot();M.width+=1,p.defer(function(){M.width-=1})}n.parent||L()};U.toggleHide=function(){ho=!ho,p.each(hi,function(i){i.domElement.style.display=ho?"none":""})};U.CLASS_AUTO_PLACE="a";U.CLASS_AUTO_PLACE_CONTAINER="ac";U.CLASS_MAIN="main";U.CLASS_CONTROLLER_ROW="cr";U.CLASS_TOO_TALL="taller-than-window";U.CLASS_CLOSED="closed";U.CLASS_CLOSE_BUTTON="close-button";U.CLASS_CLOSE_TOP="close-top";U.CLASS_CLOSE_BOTTOM="close-bottom";U.CLASS_DRAG="drag";U.DEFAULT_WIDTH=245;U.TEXT_CLOSED="Close Controls";U.TEXT_OPEN="Open Controls";U._keydownHandler=function(i){document.activeElement.type!=="text"&&(i.which===ni||i.keyCode===ni)&&U.toggleHide()};c.bind(window,"keydown",U._keydownHandler,!1);p.extend(U.prototype,{add:function(e,t){return pt(this,e,t,{factoryArgs:Array.prototype.slice.call(arguments,2)})},addColor:function(e,t){return pt(this,e,t,{color:!0})},remove:function(e){this.__ul.removeChild(e.__li),this.__controllers.splice(this.__controllers.indexOf(e),1);var t=this;p.defer(function(){t.onResize()})},destroy:function(){if(this.parent)throw new Error("Only the root GUI should be removed with .destroy(). For subfolders, use gui.removeFolder(folder) instead.");this.autoPlace&&Ze.removeChild(this.domElement);var e=this;p.each(this.__folders,function(t){e.removeFolder(t)}),c.unbind(window,"keydown",U._keydownHandler,!1),si(this)},addFolder:function(e){if(this.__folders[e]!==void 0)throw new Error('You already have a folder in this GUI by the name "'+e+'"');var t={name:e,parent:this};t.autoPlace=this.autoPlace,this.load&&this.load.folders&&this.load.folders[e]&&(t.closed=this.load.folders[e].closed,t.load=this.load.folders[e]);var n=new U(t);this.__folders[e]=n;var a=xo(this,n.domElement);return c.addClass(a,"folder"),n},removeFolder:function(e){this.__ul.removeChild(e.domElement.parentElement),delete this.__folders[e.name],this.load&&this.load.folders&&this.load.folders[e.name]&&delete this.load.folders[e.name],si(e);var t=this;p.each(e.__folders,function(n){e.removeFolder(n)}),p.defer(function(){t.onResize()})},open:function(){this.closed=!1},close:function(){this.closed=!0},hide:function(){this.domElement.style.display="none"},show:function(){this.domElement.style.display=""},onResize:function(){var e=this.getRoot();if(e.scrollable){var t=c.getOffset(e.__ul).top,n=0;p.each(e.__ul.childNodes,function(a){e.autoPlace&&a===e.__save_row||(n+=c.getHeight(a))}),window.innerHeight-t-ai<n?(c.addClass(e.domElement,U.CLASS_TOO_TALL),e.__ul.style.height=window.innerHeight-t-ai+"px"):(c.removeClass(e.domElement,U.CLASS_TOO_TALL),e.__ul.style.height="auto")}e.__resize_handle&&p.defer(function(){e.__resize_handle.style.height=e.__ul.offsetHeight+"px"}),e.__closeButton&&(e.__closeButton.style.width=e.width+"px")},onResizeDebounced:p.debounce(function(){this.onResize()},50),remember:function(){if(p.isUndefined(ht)&&(ht=new sn,ht.domElement.innerHTML=on),this.parent)throw new Error("You can only call remember on a top level GUI.");var e=this;p.each(Array.prototype.slice.call(arguments),function(t){e.__rememberedObjects.length===0&&cn(e),e.__rememberedObjects.indexOf(t)===-1&&e.__rememberedObjects.push(t)}),this.autoPlace&&wo(this,this.width)},getRoot:function(){for(var e=this;e.parent;)e=e.parent;return e},getSaveObject:function(){var e=this.load;return e.closed=this.closed,this.__rememberedObjects.length>0&&(e.preset=this.preset,e.remembered||(e.remembered={}),e.remembered[this.preset]=Wt(this)),e.folders={},p.each(this.__folders,function(t,n){e.folders[n]=t.getSaveObject()}),e},save:function(){this.load.remembered||(this.load.remembered={}),this.load.remembered[this.preset]=Wt(this),yo(this,!1),this.saveToLocalStorageIfPossible()},saveAs:function(e){this.load.remembered||(this.load.remembered={},this.load.remembered[mt]=Wt(this,!0)),this.load.remembered[e]=Wt(this),this.preset=e,bo(this,e,!0),this.saveToLocalStorageIfPossible()},revert:function(e){p.each(this.__controllers,function(t){this.getRoot().load.remembered?pi(e||this.getRoot(),t):t.setValue(t.initialValue),t.__onFinishChange&&t.__onFinishChange.call(t,t.getValue())},this),p.each(this.__folders,function(t){t.revert(t)}),e||yo(this.getRoot(),!1)},listen:function(e){var t=this.__listening.length===0;this.__listening.push(e),t&&mi(this.__listening)},updateDisplay:function(){p.each(this.__controllers,function(e){e.updateDisplay()}),p.each(this.__folders,function(e){e.updateDisplay()})}});function xo(i,e,t){var n=document.createElement("li");return e&&n.appendChild(e),t?i.__ul.insertBefore(n,t):i.__ul.appendChild(n),i.onResize(),n}function si(i){c.unbind(window,"resize",i.__resizeHandler),i.saveToLocalStorageIfPossible&&c.unbind(window,"unload",i.saveToLocalStorageIfPossible)}function yo(i,e){var t=i.__preset_select[i.__preset_select.selectedIndex];e?t.innerHTML=t.value+"*":t.innerHTML=t.value}function dn(i,e,t){if(t.__li=e,t.__gui=i,p.extend(t,{options:function(h){if(arguments.length>1){var v=t.__li.nextElementSibling;return t.remove(),pt(i,t.object,t.property,{before:v,factoryArgs:[p.toArray(arguments)]})}if(p.isArray(h)||p.isObject(h)){var g=t.__li.nextElementSibling;return t.remove(),pt(i,t.object,t.property,{before:g,factoryArgs:[h]})}},name:function(h){return t.__li.firstElementChild.firstElementChild.innerHTML=h,t},listen:function(){return t.__gui.listen(t),t},remove:function(){return t.__gui.remove(t),t}}),t instanceof vo){var n=new Nt(t.object,t.property,{min:t.__min,max:t.__max,step:t.__step});p.each(["updateDisplay","onChange","onFinishChange","step","min","max"],function(d){var h=t[d],v=n[d];t[d]=n[d]=function(){var g=Array.prototype.slice.call(arguments);return v.apply(n,g),h.apply(t,g)}}),c.addClass(e,"has-slider"),t.domElement.insertBefore(n.domElement,t.domElement.firstElementChild)}else if(t instanceof Nt){var a=function(h){if(p.isNumber(t.__min)&&p.isNumber(t.__max)){var v=t.__li.firstElementChild.firstElementChild.innerHTML,g=t.__gui.__listening.indexOf(t)>-1;t.remove();var O=pt(i,t.object,t.property,{before:t.__li.nextElementSibling,factoryArgs:[t.__min,t.__max,t.__step]});return O.name(v),g&&O.listen(),O}return h};t.min=p.compose(a,t.min),t.max=p.compose(a,t.max)}else t instanceof ci?(c.bind(e,"click",function(){c.fakeEvent(t.__checkbox,"click")}),c.bind(t.__checkbox,"click",function(d){d.stopPropagation()})):t instanceof ui?(c.bind(e,"click",function(){c.fakeEvent(t.__button,"click")}),c.bind(e,"mouseover",function(){c.addClass(t.__button,"hover")}),c.bind(e,"mouseout",function(){c.removeClass(t.__button,"hover")})):t instanceof _o&&(c.addClass(e,"color"),t.updateDisplay=p.compose(function(d){return e.style.borderLeftColor=t.__color.toString(),d},t.updateDisplay),t.updateDisplay());t.setValue=p.compose(function(d){return i.getRoot().__preset_select&&t.isModified()&&yo(i.getRoot(),!0),d},t.setValue)}function pi(i,e){var t=i.getRoot(),n=t.__rememberedObjects.indexOf(e.object);if(n!==-1){var a=t.__rememberedObjectIndecesToControllers[n];if(a===void 0&&(a={},t.__rememberedObjectIndecesToControllers[n]=a),a[e.property]=e,t.load&&t.load.remembered){var d=t.load.remembered,h=void 0;if(d[i.preset])h=d[i.preset];else if(d[mt])h=d[mt];else return;if(h[n]&&h[n][e.property]!==void 0){var v=h[n][e.property];e.initialValue=v,e.setValue(v)}}}}function pt(i,e,t,n){if(e[t]===void 0)throw new Error('Object "'+e+'" has no property "'+t+'"');var a=void 0;if(n.color)a=new _o(e,t);else{var d=[e,t].concat(n.factoryArgs);a=nn.apply(i,d)}n.before instanceof Ue&&(n.before=n.before.__li),pi(i,a),c.addClass(a.domElement,"c");var h=document.createElement("span");c.addClass(h,"property-name"),h.innerHTML=a.property;var v=document.createElement("div");v.appendChild(h),v.appendChild(a.domElement);var g=xo(i,v,n.before);return c.addClass(g,U.CLASS_CONTROLLER_ROW),a instanceof _o?c.addClass(g,"color"):c.addClass(g,ji(a.getValue())),dn(i,g,a),i.__controllers.push(a),a}function Je(i,e){return document.location.href+"."+e}function bo(i,e,t){var n=document.createElement("option");n.innerHTML=e,n.value=e,i.__preset_select.appendChild(n),t&&(i.__preset_select.selectedIndex=i.__preset_select.length-1)}function li(i,e){e.style.display=i.useLocalStorage?"block":"none"}function cn(i){var e=i.__save_row=document.createElement("li");c.addClass(i.domElement,"has-save"),i.__ul.insertBefore(e,i.__ul.firstChild),c.addClass(e,"save-row");var t=document.createElement("span");t.innerHTML="&nbsp;",c.addClass(t,"button gears");var n=document.createElement("span");n.innerHTML="Save",c.addClass(n,"button"),c.addClass(n,"save");var a=document.createElement("span");a.innerHTML="New",c.addClass(a,"button"),c.addClass(a,"save-as");var d=document.createElement("span");d.innerHTML="Revert",c.addClass(d,"button"),c.addClass(d,"revert");var h=i.__preset_select=document.createElement("select");if(i.load&&i.load.remembered?p.each(i.load.remembered,function(M,I){bo(i,I,I===i.preset)}):bo(i,mt,!1),c.bind(h,"change",function(){for(var M=0;M<i.__preset_select.length;M++)i.__preset_select[M].innerHTML=i.__preset_select[M].value;i.preset=this.value}),e.appendChild(h),e.appendChild(t),e.appendChild(n),e.appendChild(a),e.appendChild(d),ut){var v=document.getElementById("dg-local-explain"),g=document.getElementById("dg-local-storage"),O=document.getElementById("dg-save-locally");O.style.display="block",localStorage.getItem(Je(i,"isLocal"))==="true"&&g.setAttribute("checked","checked"),li(i,v),c.bind(g,"change",function(){i.useLocalStorage=!i.useLocalStorage,li(i,v)})}var L=document.getElementById("dg-new-constructor");c.bind(L,"keydown",function(M){M.metaKey&&(M.which===67||M.keyCode===67)&&ht.hide()}),c.bind(t,"click",function(){L.innerHTML=JSON.stringify(i.getSaveObject(),void 0,2),ht.show(),L.focus(),L.select()}),c.bind(n,"click",function(){i.save()}),c.bind(a,"click",function(){var M=prompt("Enter a new preset name.");M&&i.saveAs(M)}),c.bind(d,"click",function(){i.revert()})}function fn(i){var e=void 0;i.__resize_handle=document.createElement("div"),p.extend(i.__resize_handle.style,{width:"6px",marginLeft:"-3px",height:"200px",cursor:"ew-resize",position:"absolute"});function t(d){return d.preventDefault(),i.width+=e-d.clientX,i.onResize(),e=d.clientX,!1}function n(){c.removeClass(i.__closeButton,U.CLASS_DRAG),c.unbind(window,"mousemove",t),c.unbind(window,"mouseup",n)}function a(d){return d.preventDefault(),e=d.clientX,c.addClass(i.__closeButton,U.CLASS_DRAG),c.bind(window,"mousemove",t),c.bind(window,"mouseup",n),!1}c.bind(i.__resize_handle,"mousedown",a),c.bind(i.__closeButton,"mousedown",a),i.domElement.insertBefore(i.__resize_handle,i.domElement.firstElementChild)}function wo(i,e){i.domElement.style.width=e+"px",i.__save_row&&i.autoPlace&&(i.__save_row.style.width=e+"px"),i.__closeButton&&(i.__closeButton.style.width=e+"px")}function Wt(i,e){var t={};return p.each(i.__rememberedObjects,function(n,a){var d={},h=i.__rememberedObjectIndecesToControllers[a];p.each(h,function(v,g){d[g]=e?v.initialValue:v.getValue()}),t[a]=d}),t}function un(i){for(var e=0;e<i.__preset_select.length;e++)i.__preset_select[e].value===i.preset&&(i.__preset_select.selectedIndex=e)}function mi(i){i.length!==0&&rn.call(window,function(){mi(i)}),p.each(i,function(e){e.updateDisplay()})}var hn=U;const pn="/150-lab/assets/models/globe-hd.glb";class mn{constructor(e,t=60){this.animateCallback=e,this.targetFPS=Math.min(t,60),this.baseTargetFPS=this.targetFPS,this.frameInterval=1e3/this.targetFPS,this.lastFrameTime=0,this.isVisible=!0,this.isRunning=!1,this.rafId=null,this.pausedByTimeline=!1,this.inTimeline=!1,this.frameCount=0,this.fpsCheckInterval=1e3,this.lastFPSCheck=performance.now(),this.currentFPS=this.targetFPS,this.isDegraded=!1,this.minFPS=30,this.currentCanvasId="shaderBackground",this.observers=new Map,this.isScrolling=!1,this.isMobile=le.isMobile(),this.scrollThrottleFPS=this.isMobile?30:45,this.setupVisibilityObserver(this.currentCanvasId),this.setupPageVisibilityListener(),this.setupDegradationListener(),this.setupScrollListener()}setupScrollListener(){le.onScrollStateChange(({isScrolling:e})=>{if(this.isScrolling=e,e){const t=Math.min(this.scrollThrottleFPS,this.baseTargetFPS);this.setTargetFPS(t)}else this.setTargetFPS(this.baseTargetFPS)})}setupDegradationListener(){le.onDegradation(e=>{e.tier==="low"&&!this.isDegraded&&(A.log("[Adaptive Renderer] Received degradation signal - reducing to 30fps"),this.isDegraded=!0,this.setTargetFPS(e.targetFPS||this.minFPS))}),le.onFpsCapChange(e=>{if(A.log(`[Adaptive Renderer] Received FPS cap signal: ${e.cap}fps (${e.reason})`),e.reason==="performance_improved"&&e.cap>this.baseTargetFPS){A.log(`[Adaptive Renderer] Performance improved - upgrading from ${this.baseTargetFPS}fps to ${e.cap}fps`),this.baseTargetFPS=e.cap,this.isDegraded=!1,this.scrollThrottleFPS=this.isMobile?30:45,this.isScrolling||this.setTargetFPS(e.cap);return}e.cap<this.baseTargetFPS&&(this.baseTargetFPS=e.cap,A.log(`[Adaptive Renderer] Updated base target FPS to ${e.cap}fps`)),e.cap===30&&(this.scrollThrottleFPS=30,this.isDegraded=!0),e.cap<this.targetFPS&&!this.isScrolling&&this.setTargetFPS(e.cap)})}setupVisibilityObserver(e){const t=document.getElementById(e);if(!t){A.warn(`[Adaptive Renderer] Canvas #${e} not found for observation`);return}const n={root:null,rootMargin:"50px",threshold:.1},a=new IntersectionObserver(d=>{d.forEach(h=>{h.target.id===this.currentCanvasId&&(this.isVisible=h.isIntersecting,this.isVisible&&this.isRunning||this.isVisible)})},n);a.observe(t),this.observers.set(e,a)}setupPageVisibilityListener(){document.addEventListener("visibilitychange",()=>{document.hidden?this.pause():this.resume()})}start(){this.isRunning||(this.isRunning=!0,this.lastFrameTime=performance.now(),this.lastFPSCheck=performance.now(),this.frameCount=0,this.loop())}loop(){if(!this.isRunning)return;this.rafId=requestAnimationFrame(()=>this.loop());const e=performance.now(),t=e-this.lastFrameTime;e-this.lastFPSCheck>=this.fpsCheckInterval&&(this.currentFPS=this.frameCount,this.frameCount=0,this.lastFPSCheck=e,!this.pausedByTimeline&&this.isVisible&&!document.hidden&&le.recordFpsSample(this.currentFPS)),!(t<this.frameInterval)&&(!this.isVisible||this.pausedByTimeline||document.hidden||(this.lastFrameTime=e-t%this.frameInterval,this.frameCount++,this.animateCallback&&this.animateCallback(t)))}pause(){this.isRunning=!1,this.rafId&&(cancelAnimationFrame(this.rafId),this.rafId=null)}resume(){this.isRunning||this.start()}setPausedByTimeline(e){this.pausedByTimeline=e,e&&this.currentCanvasId==="shaderBackground"&&(this.frameCount=0,this.lastFPSCheck=performance.now())}setInTimeline(e){this.inTimeline!==e&&(this.inTimeline=e,e?this.switchCanvasMonitoring("timeline-shader-bg"):this.switchCanvasMonitoring("shaderBackground"))}switchCanvasMonitoring(e){this.currentCanvasId!==e&&(this.currentCanvasId=e,this.observers.has(e)||this.setupVisibilityObserver(e),this.frameCount=0,this.lastFPSCheck=performance.now())}setTargetFPS(e){this.targetFPS=e,this.frameInterval=1e3/e}getCurrentFPS(){return this.currentFPS}destroy(){this.pause(),this.observers.forEach(e=>e.disconnect()),this.observers.clear()}}class gn{constructor(){this.metrics={fps:0,frameTime:0,memory:0,drawCalls:0,triangles:0,geometries:0,textures:0},this.frameCount=0,this.lastTime=performance.now(),this.fpsHistory=[],this.maxHistoryLength=60,this.warningThreshold={fps:30,frameTime:33,memory:200},this.onWarning=null,this.lastWarningTime=0,this.warningCooldown=6e4,this.warningHistory=new Map,this.consecutiveLowFps=0,this.persistenceThreshold=5}update(e){const t=performance.now(),n=t-this.lastTime;if(this.frameCount++,n>=1e3){if(this.metrics.fps=Math.round(this.frameCount*1e3/n),this.metrics.frameTime=n/this.frameCount,this.fpsHistory.push(this.metrics.fps),this.fpsHistory.length>this.maxHistoryLength&&this.fpsHistory.shift(),e&&e.info){const a=e.info;this.metrics.drawCalls=a.render.calls,this.metrics.triangles=a.render.triangles,this.metrics.geometries=a.memory.geometries,this.metrics.textures=a.memory.textures}performance.memory&&(this.metrics.memory=Math.round(performance.memory.usedJSHeapSize/1048576)),this.checkWarnings(),this.frameCount=0,this.lastTime=t}}checkWarnings(){const e=performance.now();if(this.metrics.fps<this.warningThreshold.fps&&this.getAverageFPS()<this.warningThreshold.fps?this.consecutiveLowFps++:this.consecutiveLowFps=Math.max(0,this.consecutiveLowFps-1),e-this.lastWarningTime<this.warningCooldown)return;const t=[];if(this.consecutiveLowFps>=this.persistenceThreshold&&this.metrics.fps<this.warningThreshold.fps&&this.getAverageFPS()<this.warningThreshold.fps&&(!this.warningHistory.has("fps")||e-this.warningHistory.get("fps")>this.warningCooldown)&&(t.push(`Persistent low FPS: ${this.metrics.fps} (avg: ${this.getAverageFPS()}, streak: ${this.consecutiveLowFps})`),this.warningHistory.set("fps",e)),this.metrics.memory>this.warningThreshold.memory*1.5){const n="memory";(!this.warningHistory.has(n)||e-this.warningHistory.get(n)>this.warningCooldown)&&(t.push(`High memory usage: ${this.metrics.memory}MB (threshold: ${this.warningThreshold.memory}MB)`),this.warningHistory.set(n,e))}t.length>0&&this.onWarning&&(this.lastWarningTime=e,this.onWarning(t))}getAverageFPS(){if(this.fpsHistory.length===0)return 0;const e=this.fpsHistory.reduce((t,n)=>t+n,0);return Math.round(e/this.fpsHistory.length)}getMetrics(){return{...this.metrics}}log(){A.log("[Performance Monitor]",{fps:this.metrics.fps,avgFPS:this.getAverageFPS(),frameTime:`${this.metrics.frameTime.toFixed(1)}ms`,memory:`${this.metrics.memory}MB`,drawCalls:this.metrics.drawCalls,triangles:this.metrics.triangles,geometries:this.metrics.geometries,textures:this.metrics.textures})}createDebugOverlay(){const e=document.createElement("div");return e.id="perf-monitor-overlay",e.style.cssText=`
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.8);
      color: #0f0;
      font-family: monospace;
      font-size: 12px;
      padding: 10px;
      border-radius: 4px;
      z-index: 999999;
      min-width: 200px;
    `,document.body.appendChild(e),setInterval(()=>{const t=this.getMetrics();e.innerHTML=`
        <div style="font-weight: bold; margin-bottom: 5px;">Performance Monitor</div>
        <div>FPS: ${t.fps} (avg: ${this.getAverageFPS()})</div>
        <div>Frame Time: ${t.frameTime.toFixed(1)}ms</div>
        <div>Memory: ${t.memory}MB</div>
        <div>Draw Calls: ${t.drawCalls}</div>
        <div>Triangles: ${t.triangles}</div>
        <div>Geometries: ${t.geometries}</div>
        <div>Textures: ${t.textures}</div>
      `},1e3),e}removeDebugOverlay(){const e=document.getElementById("perf-monitor-overlay");e&&e.remove()}createFpsCounter(){return Vt(()=>import("./performanceDetector-D0hC93nr.js"),__vite__mapDeps([0,1])).then(e=>{const t=e.default,n=document.createElement("div");n.id="fps-counter",n.style.cssText=`
        position: fixed;
        bottom: 10px;
        left: 10px;
        background: rgba(0, 0, 0, 0.7);
        color: #0f0;
        font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
        font-size: 11px;
        padding: 4px 8px;
        border-radius: 4px;
        z-index: 999999;
        pointer-events: none;
        user-select: none;
        min-width: 60px;
        text-align: center;
      `,document.body.appendChild(n);let a=null;t.onFpsCapChange(M=>{a=M.cap});let d=0,h=performance.now(),v=60,g=[];const O=10,L=()=>{if(!document.getElementById("fps-counter"))return;d++;const M=performance.now(),I=M-h;if(I>=1e3){v=Math.round(d*1e3/I),d=0,h=M,g.push(v),g.length>O&&g.shift();const K=Math.round(g.reduce((re,de)=>re+de,0)/g.length);let V="#0f0";const z=a||60,$=z*.8,J=z*.5;v<J?V="#f00":v<$&&(V="#ff0"),n.style.color=V;let Me="";if(a){const re=a===30?"#f80":"#0af",de=a===30?"cap:30 (degraded)":`cap:${a}`;Me=` <span style="color: ${re}; font-size: 9px;">${de}</span>`}n.innerHTML=`${v} FPS <span style="color: #888; font-size: 9px;">(avg: ${K})</span>${Me}`}requestAnimationFrame(L)};requestAnimationFrame(L)}),document.getElementById("fps-counter")}removeFpsCounter(){const e=document.getElementById("fps-counter");e&&e.remove(),this.fpsCounterInterval&&(clearInterval(this.fpsCounterInterval),this.fpsCounterInterval=null)}setWarningCallback(e){this.onWarning=e}}class vn{constructor(){this.disposables=new Set,this.textures=new Set,this.geometries=new Set,this.materials=new Set}track(e,t="disposable"){if(e)switch(t){case"texture":this.textures.add(e);break;case"geometry":this.geometries.add(e);break;case"material":this.materials.add(e);break;default:this.disposables.add(e)}}dispose(e){if(e)try{e.dispose&&typeof e.dispose=="function"&&e.dispose(),this.disposables.delete(e),this.textures.delete(e),this.geometries.delete(e),this.materials.delete(e)}catch(t){A.warn("[Memory Manager] Error disposing resource:",t)}}disposeAll(){let e=0;return this.textures.forEach(t=>{try{t&&t.dispose&&(t.dispose(),e++)}catch(n){A.warn("[Memory Manager] Error disposing texture:",n)}}),this.textures.clear(),this.geometries.forEach(t=>{try{t&&t.dispose&&(t.dispose(),e++)}catch(n){A.warn("[Memory Manager] Error disposing geometry:",n)}}),this.geometries.clear(),this.materials.forEach(t=>{try{t&&t.dispose&&(t.dispose(),e++)}catch(n){A.warn("[Memory Manager] Error disposing material:",n)}}),this.materials.clear(),this.disposables.forEach(t=>{try{t&&t.dispose&&(t.dispose(),e++)}catch(n){A.warn("[Memory Manager] Error disposing resource:",n)}}),this.disposables.clear(),A.log(`[Memory Manager] Disposed ${e} resources`),e}disposeObject(e){e&&(e.children&&e.children.forEach(t=>this.disposeObject(t)),e.geometry&&this.dispose(e.geometry),e.material&&(Array.isArray(e.material)?e.material.forEach(t=>{this.disposeMaterial(t)}):this.disposeMaterial(e.material)),e.parent&&e.parent.remove(e))}disposeMaterial(e){if(!e)return;["map","lightMap","bumpMap","normalMap","specularMap","envMap","alphaMap","aoMap","displacementMap","emissiveMap","gradientMap","metalnessMap","roughnessMap"].forEach(n=>{e[n]&&this.dispose(e[n])}),this.dispose(e)}getStats(){return{textures:this.textures.size,geometries:this.geometries.size,materials:this.materials.size,disposables:this.disposables.size,total:this.textures.size+this.geometries.size+this.materials.size+this.disposables.size}}forceGC(){try{if(window.gc)window.gc(),A.log("[Memory Manager] Forced garbage collection");else{const e=new Array(1e6);e.fill(0),e.length=0}}catch{}}}const ft=new vn;class _n{constructor(){this.overlay=null,this.isRunning=!1,this.frameIndex=0,this.animationFrameId=null,this.targetFPS=8,this.frameInterval=1e3/this.targetFPS,this.lastFrameTime=0,this.frames=[],this.frameCount=4,this.grainIntensity=.5,this.grainSize=1,this.opacity=.25,this.textureWidth=48,this.textureHeight=48,this.noiseBuffer=null,this.noiseBufferSize=256*256}init(){if(this.overlay)return;const e=performance.now();this.generateNoiseBuffer(),this.preGenerateFrames(),this.overlay=document.createElement("div"),this.overlay.id="mobile-film-grain",this.overlay.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      opacity: ${this.opacity};
      mix-blend-mode: overlay;
      background-repeat: repeat;
      background-size: ${Math.round(this.textureWidth*this.grainSize)}px ${Math.round(this.textureHeight*this.grainSize)}px;
      image-rendering: pixelated;
    `,this.frames.length>0&&(this.overlay.style.backgroundImage=`url(${this.frames[0]})`);const t=document.getElementById("shaderBackground");t&&t.parentNode?t.parentNode.insertBefore(this.overlay,t):document.body.appendChild(this.overlay);const n=performance.now()-e;A.log(`[Mobile Film Grain] Initialized in ${n.toFixed(1)}ms with ${this.frameCount} pre-generated frames`)}generateNoiseBuffer(){this.noiseBuffer=new Uint8Array(this.noiseBufferSize);for(let e=0;e<this.noiseBufferSize;e++)this.noiseBuffer[e]=Math.random()*255}preGenerateFrames(){const e=document.createElement("canvas");e.width=this.textureWidth,e.height=this.textureHeight;const t=e.getContext("2d",{alpha:!0}),n=this.grainIntensity*255,a=this.textureWidth*this.textureHeight;for(let d=0;d<this.frameCount;d++){const h=t.createImageData(this.textureWidth,this.textureHeight),v=h.data,g=d*7919;for(let O=0;O<a;O++){const L=O*4,M=(O+g)%this.noiseBufferSize,V=((this.noiseBuffer[M]*31+g)%256-128)*(n/128);v[L]=128+V,v[L+1]=128+V,v[L+2]=128+V,v[L+3]=120}t.putImageData(h,0,0),this.frames.push(e.toDataURL("image/png"))}e.width=0,e.height=0}animate(e){if(!this.isRunning||(this.animationFrameId=requestAnimationFrame(n=>this.animate(n)),document.hidden))return;const t=e-this.lastFrameTime;t<this.frameInterval||(this.lastFrameTime=e-t%this.frameInterval,this.frameIndex=(this.frameIndex+1)%this.frameCount,this.overlay&&this.frames[this.frameIndex]&&(this.overlay.style.backgroundImage=`url(${this.frames[this.frameIndex]})`))}start(){this.isRunning||(this.init(),this.isRunning=!0,this.lastFrameTime=performance.now(),this.animationFrameId=requestAnimationFrame(e=>this.animate(e)),A.log(`[Mobile Film Grain] Started at ~${this.targetFPS}fps`))}stop(){this.isRunning=!1,this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null)}pauseForScroll(){this.overlay&&(this.overlay.style.display="none")}resumeAfterScroll(){this.overlay&&(this.overlay.style.display="block")}show(){this.overlay&&(this.overlay.style.display="block")}hide(){this.overlay&&(this.overlay.style.display="none")}setIntensity(e){this.grainIntensity=Math.max(0,Math.min(1,e))}setOpacity(e){this.opacity=Math.max(0,Math.min(1,e)),this.overlay&&(this.overlay.style.opacity=this.opacity)}destroy(){this.stop(),this.overlay&&this.overlay.parentNode&&this.overlay.parentNode.removeChild(this.overlay),this.overlay=null,this.frames=[],this.noiseBuffer=null,A.log("[Mobile Film Grain] Destroyed")}}const Ht=new _n;let w,gi,vi;async function yn(){if(!w){console.log("[background.js] Loading Three.js dependencies...");try{const[i,e,t]=await Promise.all([Vt(()=>import("./vendor-three-B90GZkEf.js").then(n=>n.t),[]),Vt(()=>import("./vendor-three-B90GZkEf.js").then(n=>n.G),[]),Vt(()=>import("./vendor-three-B90GZkEf.js").then(n=>n.D),[])]);w=i,gi=e.GLTFLoader,vi=t.DRACOLoader}catch(i){throw console.error("[background.js] Failed to load Three.js dependencies:",i),i}}}function bn(i,e){if(window.PRELOADED_ASSETS&&window.PRELOADED_ASSETS[i]){const t=window.PRELOADED_ASSETS[i];if(t instanceof ArrayBuffer){const n=new Blob([t]);return URL.createObjectURL(n)}}return e}async function wn(){if(window.shaderBackgroundInitialized){A.warn("Shader background already initialized. Skipping...");return}await yn();const i=uo.detect(),e=uo.getSettings();if(e.mode==="fallback"||!e.enableBackground){A.log("[Background Init] Skipping initialization - AEM fallback mode detected"),A.log("[Background Init] AEM Mode:",i),uo.applyStaticBackground(),window.shaderBackgroundInitialized=!0;return}const t=await le.detect(),n=le.getSettings();A.log("[Background Init] AEM Mode:",i),A.log("[Background Init] Performance Tier:",t),A.log("[Background Init] Settings:",n),window.colorPhase=1,window.specialColorsActive=!1,window.particlesFullyHidden=!1,window.particlesMovementPaused=!1;let a=Date.now();const d=6e9,h=document.querySelector("#events");let v=!0;h&&(v=h.getBoundingClientRect().top>window.innerHeight*1.2,window.addEventListener("scroll",()=>{v=h.getBoundingClientRect().top>window.innerHeight*1.2},{passive:!0}));const g=document.getElementById("shaderBackground");if(!g)return;function O(){try{const o=document.createElement("canvas");return!!(o.getContext("webgl")||o.getContext("experimental-webgl"))}catch{return!1}}if(!O()){A.warn("WebGL is not supported on this device/browser. Skipping shader background initialization."),g.style.display="none",document.body.style.backgroundColor="#1a1a2e";return}window.specialColorsActive=!1,window.colorPhase=0;function L(o,r){let l,f,m,u,C,y,k,F;if(!document.querySelector("#video-travel-area")){A.warn("Could not find #video-travel-area element for shader animation");return}if(s&&s.color1&&s.color2&&(l=s.color1.value.clone(),f=s.color2.value.clone(),m=s.waveSpeed.value,u=s.waveAmplitude.value,C=s.waveFrequency.value,y=s.ambientLight.value,k=s.directionalLight.value,F=s.yOffset.value),o.timeline({scrollTrigger:{trigger:"#intro-text-travel-area",start:"35% top",end:"45% top",scrub:!0,markers:!1,invalidateOnRefresh:!0,onUpdate:j=>{s&&s.colorDarkness&&(s.colorDarkness.value=j.progress*2,s.colorDarkness.value>=1.95?window.colorPhase===1?(s.color1&&s.color1.value.set(l),s.color2&&s.color2.value.set(f),window.specialColorsActive=!0):window.colorPhase===0&&(s.color1&&s.color1.value.set("#e2e2e2"),s.color2&&s.color2.value.set("#515151"),window.specialColorsActive=!0):l&&f&&(window.colorPhase===1?(s.color1&&s.color1.value.copy(l),s.color2&&s.color2.value.copy(f),window.specialColorsActive=!1):window.colorPhase===0&&(s.color1&&s.color1.value.set("#e2e2e2"),s.color2&&s.color2.value.set("#515151"),window.specialColorsActive=!1)),I())}}}),setTimeout(()=>{M(o)},100),!document.querySelector("#get-involved")){A.warn("Could not find #get-involved element for globe opacity animation");return}r.create({trigger:"#get-involved",start:"top bottom",end:"bottom top",onEnter:()=>{window.backgroundPaused&&(window.backgroundPaused=!1),Ce&&(Ce.setPausedByTimeline(!1),Ce.isVisible=!0)},onEnterBack:()=>{window.backgroundPaused&&(window.backgroundPaused=!1),Ce&&(Ce.setPausedByTimeline(!1),Ce.isVisible=!0)}}),o.timeline({scrollTrigger:{trigger:"#get-involved",start:"top bottom",end:"#get-involved-earth center center",scrub:!0,markers:!1,onUpdate:j=>{const E=j.progress;if(_&&(E>.01&&!_.visible?(_.visible=!0,T.visible=!0,z()):E<=.01&&_.visible&&(_.visible=!1,T.visible=!1,z()),_.visible)){_._cachedMeshes||(_._cachedMeshes=[],_.traverse(B=>{B.isMesh&&B.material&&_._cachedMeshes.push(B)}));for(const B of _._cachedMeshes)B.material.transparent=!0,B.material.opacity=E;T.opacity=E,V()}D&&(E>.01&&!D.visible?(D.visible=!0,N.enabled=!0,$()):E<=.01&&D.visible&&(D.visible=!1,N.enabled=!1,$()),H&&H.uniforms&&(E>.01&&D.visible?(H.uniforms.startOpacity.value=N.startOpacity*E,H.uniforms.endOpacity.value=N.endOpacity*E):(H.uniforms.startOpacity.value=0,H.uniforms.endOpacity.value=0)))}}}),o.timeline({scrollTrigger:{trigger:"#get-involved",start:"top 90%",end:"bottom top",scrub:.5,markers:!1,onUpdate:j=>{const E=j.progress,B=.15;if(!window.particlesFullyHidden&&E>=B?(window.particlesFullyHidden=!0,window.particlesMovementPaused=!0):window.particlesFullyHidden&&E<B*.8&&(window.particlesFullyHidden=!1,window.particlesMovementPaused=!1),window.particlesFullyHidden){R&&R.uniforms&&R.uniforms.opacity&&(R.uniforms.opacity.value=0,Zo());return}const oe=1-Math.min(E/B,1),Rt=.5*Math.pow(oe,3);R&&R.uniforms&&R.uniforms.opacity&&(R.uniforms.opacity.value=Rt,Zo())}}}),o.timeline({scrollTrigger:{trigger:"#get-involved-earth",start:"top bottom",end:"bottom top",scrub:.3,markers:!1,onUpdate:j=>{const E=j.progress;if(We){if(window.innerWidth<=768){We.position.y=0;return}const B=-322,X=120,oe=1-Math.pow(1-E,3),Be=B+X*oe;if(We.position.y=Be,b&&b.__folders["Globe Model Controls"]){const Lt=b.__folders["Globe Model Controls"].__folders.Position;if(Lt&&Lt.__controllers){for(let Rt of Lt.__controllers)if(Rt.property==="positionY"){Rt.updateDisplay();break}}}}}}});const st=new w.Color("#e2e2e2"),Hi=new w.Color("#515151"),Vi=new w.Color("#32c2d6"),Ui=new w.Color("#004199"),No=new w.Color,Go=new w.Color;let $o=-1,Tt=null;const co=document.querySelector("#hero-travel-area");if(!co){A.warn("[Background] #hero-travel-area not found - color animations will not work");return}A.log("[Background] #hero-travel-area found, creating color ScrollTriggers"),o.timeline({scrollTrigger:{trigger:co,start:"top bottom",end:"top top",scrub:1,markers:!1,fastScrollEnd:!0,onUpdate:j=>{if(!s||!s.color1||!s.color2)return;const E=Math.round(j.progress*100)/100;if(E!==$o&&($o=E,No.copy(st).lerp(Vi,E),Go.copy(Hi).lerp(Ui,E),s.color1.value.copy(No),s.color2.value.copy(Go),E>.9?window.colorPhase=1:E<.1?window.colorPhase=0:window.colorPhase=.5,window.specialColorsActive=!0,Tt||(Tt=document.querySelector("#cover-area-overlay")),Tt)){const B=Math.round((1-E)*10)/10,X=Math.round((1+E*1.2)*5)/5;Tt.style.cssText=`opacity: ${B}; filter: saturate(${X})`}}}});const Yo=new w.Color("#32c2d6"),jo=new w.Color("#004199"),Xo=new w.Color("#B225B1"),qo=new w.Color("#FCC72D"),Ni=new w.Color("#DA281C"),Gi=new w.Color("#FCC72D"),Dt=new w.Color,zt=new w.Color;let Ko=-1,lt=null,Bt=null,fo=!1;o.timeline({scrollTrigger:{trigger:co,start:"top top",end:"bottom bottom",scrub:1,markers:!1,fastScrollEnd:!0,onUpdate:j=>{if(!s||!s.color1||!s.color2)return;const E=Math.round(j.progress*100)/100;if(E!==Ko){if(Ko=E,E<=.4)Dt.copy(Yo);else if(E<=.8){const B=(E-.4)/.4;Dt.copy(Yo).lerp(Xo,B)}else{const B=(E-.8)/.2;Dt.copy(Xo).lerp(Ni,B)}if(E<=.6)zt.copy(jo);else if(E<=.8){const B=(E-.6)/.2;zt.copy(jo).lerp(qo,B)}else{const B=(E-.8)/.2;zt.copy(qo).lerp(Gi,B)}if(s.color1.value.copy(Dt),s.color2.value.copy(zt),fo||(Bt||(Bt=document.getElementById("shaderBackground")),Bt&&(Bt.style.filter="hue-rotate(0deg)",fo=!0)),E>.9?window.colorPhase=2:E<.1?window.colorPhase=1:window.colorPhase=1.5,a=Date.now(),window.specialColorsActive=!0,lt||(lt=document.querySelector("#cover-area-overlay")),lt){let B=0;if(E>=.3){const oe=(E-.3)/.7;B=Math.min(.5,oe*.5)}const X=1+E*1.2;lt.style.opacity=B,lt.style.filter=`saturate(${X})`}}},onLeaveBack:()=>{fo=!1}}}),requestAnimationFrame(()=>{r&&typeof r.refresh=="function"&&(r.refresh(),A.log("[Background] ScrollTrigger refreshed after color animation setup"))}),o.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top top",end:"bottom top",scrub:!1,markers:!1,onEnter:()=>{s&&s.color1&&s.color2&&(s.color1.value.set("#DA281C"),s.color2.value.set("#FCC72D"),window.colorPhase=2,window.specialColorsActive=!0,K())},onLeaveBack:()=>{}}}),o.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top bottom",end:"top 66.67%",scrub:!0,markers:!1,onUpdate:j=>{const E=j.progress,B=document.querySelector("#cover-area-overlay");if(B){const X=.5-E*.5;B.style.opacity=X,B.style.filter="saturate(2.2)"}}}}),o.timeline({scrollTrigger:{trigger:"#get-involved-cards",start:"top 50%",end:"top -10%",scrub:!0,markers:!1,onUpdate:j=>{if(!s||!s.color1||!s.color2)return;const E=j.progress;if(E>.1)s.color1.value.set("#8300ff"),s.color2.value.set("#14d15f"),s.yOffset&&(s.yOffset.value=-.05),s.ambientLight.value=.4,s.directionalLight.value=.4,s.waveAmplitude.value=1.2,s.waveFrequency.value=2.2,window.colorPhase=3,window.specialColorsActive=!0,K(),po(),mo();else if(E<=.1&&window.colorPhase===3){const B=s.time.value+s.colorCycleOffset.value;s.colorCycleOffset.value=B,s.time.value=0,s.color1.value.set("#DA281C"),s.color2.value.set("#FCC72D"),s.yOffset&&F!==void 0&&(s.yOffset.value=F),y!==void 0&&(s.ambientLight.value=y),k!==void 0&&(s.directionalLight.value=k),s.waveSpeed.value=1,u!==void 0&&(s.waveAmplitude.value=u),C!==void 0&&(s.waveFrequency.value=C),window.colorPhase=2,a=Date.now(),window.specialColorsActive=!0,K(),po(),mo()}I()}}}),o.timeline({scrollTrigger:{trigger:"#get-involved-cards",start:"top 50%",end:"top -10%",scrub:1,markers:!1,onUpdate:j=>{const B=1-j.progress,X=Math.pow(B,3);if(_){_.visible=!0,_._cachedMeshes||(_._cachedMeshes=[],_.traverse(oe=>{oe.isMesh&&oe.material&&_._cachedMeshes.push(oe)}));for(const oe of _._cachedMeshes)Array.isArray(oe.material)?oe.material.forEach(Be=>{Be.transparent=!0,Be.opacity=X,Be.depthWrite=X>.1,Be.blending=w.NormalBlending,Be.needsUpdate=!0}):(oe.material.transparent=!0,oe.material.opacity=X,oe.material.depthWrite=X>.1,oe.material.blending=w.NormalBlending,oe.material.needsUpdate=!0);X<.01&&(_.visible=!1),T.opacity=X,T.rotationPaused=X<.01,V()}D&&H&&H.uniforms&&(D.visible=X>.01,H.uniforms.startOpacity.value=N.startOpacity*X,H.uniforms.endOpacity.value=N.endOpacity*X,N.enabled=X>.01,$())}}}),o.timeline({scrollTrigger:{trigger:"#get-involved",start:"bottom bottom",end:"top top",scrub:!0,markers:!1,onUpdate:j=>{j.progress<=.1&&m!==void 0&&window.colorPhase===1&&(s.waveSpeed&&(s.waveSpeed.value=m),s.waveAmplitude&&(s.waveAmplitude.value=u),s.waveFrequency&&(s.waveFrequency.value=C),s.yOffset&&(s.yOffset.value=F),po(),mo())}}});function Zo(j){if(typeof b<"u"&&b&&b.__folders&&b.__folders["Particle System"]){const E=b.__folders["Particle System"];if(E&&E.__controllers){for(let B of E.__controllers)if(B.property==="value"&&B.object===R.uniforms.opacity){B.updateDisplay();break}}}}}function M(o,r,l,f){if(!document.querySelector("#events")){document.addEventListener("DOMContentLoaded",()=>{M(o)});return}const u=new w.Color("#8300ff"),C=new w.Color("#dcfff6");o.timeline({scrollTrigger:{trigger:"#get-involved-cards",start:"top 50%",end:"bottom 50%",scrub:!0,markers:!1,onUpdate:y=>{if(s&&s.colorDarkness)if(s.colorDarkness.value=1.5-y.progress*2,window.colorPhase===3){const k=y.progress;s.color1&&(s.color1.value.r=u.r+(C.r-u.r)*k,s.color1.value.g=u.g+(C.g-u.g)*k,s.color1.value.b=u.b+(C.b-u.b)*k),s.color2&&s.color2.value.set("#14d15f"),s.ambientLight.value=.4,s.directionalLight.value=.4,s.waveSpeed.value=.9,s.waveAmplitude.value=1.2,window.specialColorsActive=!0}else window.colorPhase===2?(s.color1&&s.color1.value.set("#da281c"),s.color2&&s.color2.value.set("#FCC72D"),window.specialColorsActive=!0):window.colorPhase===1?(s.color1&&s.color1.value.set("#32c2d6"),s.color2&&s.color2.value.set("#004199"),window.specialColorsActive=!0):(s.color1&&s.color1.value.set("#e2e2e2"),s.color2&&s.color2.value.set("#515151"),window.specialColorsActive=!0)}}})}function I(){const o=window.gui,r=window.uniforms;if(typeof o<"u"&&o&&o.__folders&&o.__folders["Color Controls"]){const l=o.__folders["Color Controls"];if(l&&l.__controllers){for(let f of l.__controllers)if(f.property==="value"&&f.object===r.colorDarkness){f.updateDisplay();break}}}}function K(){const o=window.gui,r=window.uniforms;if(typeof o<"u"&&o&&o.__folders&&o.__folders["Color Controls"]){const l=o.__folders["Color Controls"];l&&l.__controllers&&l.__controllers.forEach(f=>{if(f.property==="color"&&f.__color){if(f.property==="color"&&f.__li&&f.__li.querySelector(".property-name").textContent==="Color 1"){const u="#"+r.color1.value.getHexString();f.setValue(u)}else if(f.property==="color"&&f.__li&&f.__li.querySelector(".property-name").textContent==="Color 2"){const u="#"+r.color2.value.getHexString();f.setValue(u)}}})}}function V(){if(typeof b<"u"&&b&&b.__folders&&b.__folders["Globe Model Controls"]&&b.__folders["Globe Model Controls"].__folders&&b.__folders["Globe Model Controls"].__folders.Material){const o=b.__folders["Globe Model Controls"].__folders.Material;if(o&&o.__controllers)for(let r of o.__controllers)r.property==="opacity"&&r.updateDisplay()}}function z(){if(typeof b<"u"&&b&&b.__folders&&b.__folders["Globe Model Controls"]){const o=b.__folders["Globe Model Controls"];if(o&&o.__controllers){for(let r of o.__controllers)if(r.property==="visible"){r.updateDisplay();break}}}}function $(){if(typeof b<"u"&&b&&b.__folders&&b.__folders["Gradient Overlay Controls"]){const o=b.__folders["Gradient Overlay Controls"];if(o&&o.__controllers){for(let r of o.__controllers)if(r.property==="enabled"){r.updateDisplay();break}}}}function J(){return Math.max(window.innerHeight,document.documentElement.clientHeight)}const Me=window.innerWidth,re=J();g.style.position="fixed",g.style.top="0",g.style.left="0",g.style.width=`${Me}px`,g.style.height=`${re}px`,g.style.zIndex="-1";const de=/^((?!chrome|android).)*safari/i.test(navigator.userAgent),Oe=window.innerWidth<640,gt=1.5,Mo=Oe&&!de;Mo?(g.style.transform=`translateZ(0) scaleX(${gt})`,g.style.transformOrigin="center center",A.log(`[Background Init] Mobile shader widening enabled: ${gt}x width`),console.log(`%c[ShaderBackground] Mobile widening ACTIVE - CSS scaleX(${gt})`,"color: orange; font-weight: bold")):(g.style.transform="translateZ(0)",de&&Oe&&A.log("[Background Init] Safari detected - mobile shader widening DISABLED to prevent stretch")),g.style.transformStyle="preserve-3d",g.style.willChange="transform",window._mobileShaderScale=Mo?gt:1,window._isSafariBrowser=de;let ce;try{ce=new w.WebGLRenderer({canvas:g,alpha:!0,antialias:n.antialias,powerPreference:t==="high"?"high-performance":"default",failIfMajorPerformanceCaveat:!1}),ce.setSize(Me,re),ce.setPixelRatio(n.pixelRatio),A.log("[Background Init] Renderer pixel ratio:",n.pixelRatio)}catch(o){A.error("Failed to create WebGL renderer:",o),A.warn("Falling back to fallback background. WebGL initialization failed."),g.style.display="none",document.body.style.backgroundColor="#1a1a2e",document.body.style.background="linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)";return}window.shaderBackgroundInitialized=!0,window.addEventListener("beforeunload",o=>{if(window._isMailtoOperation||window._preventBackgroundCleanup){A.log("[Background] Skipping cleanup for mailto/non-navigation action");return}A.log("[Background] Cleaning up resources before page unload"),window.shaderBackgroundRenderer&&window.shaderBackgroundRenderer.pause(),le.isMobile()&&Ht.destroy();const r=ft.disposeAll();A.log(`[Background] Disposed ${r} Three.js resources`),ce&&(ce.dispose(),ce.forceContextLoss()),ft.forceGC()}),g.addEventListener("webglcontextlost",function(o){A.warn("WebGL context lost. Attempting to restore..."),o.preventDefault(),window.shaderBackgroundInitialized=!1}),g.addEventListener("webglcontextrestored",function(){setTimeout(()=>{if(!window.shaderBackgroundReinitializing){window.shaderBackgroundReinitializing=!0;try{wn()}catch(o){A.error("Failed to reinitialize shader background after context restore:",o)}finally{window.shaderBackgroundReinitializing=!1}}},100)});const Ne=new w.Scene,Gt=new w.Scene;let Ge=0;const Ae={zoom:2.471,zPosition:1},P=new w.OrthographicCamera(-window.innerWidth/2,window.innerWidth/2,window.innerHeight/2,-window.innerHeight/2,-1e3,1e3);P.position.z=Ae.zPosition,P.zoom=Ae.zoom,P.updateProjectionMatrix();const We=new w.Group;We.position.y=-322,We.frustumCulled=!0,Ne.add(We);let H,D;const N={enabled:!1,startOpacity:0,endOpacity:1,offsetY:.05,height:2.5,color:"#000000",yOffset:.09};function _i(){H=new w.ShaderMaterial({transparent:!0,uniforms:{startOpacity:{value:N.startOpacity},endOpacity:{value:N.endOpacity},overlayColor:{value:new w.Color(N.color)},offsetY:{value:N.offsetY},heightMultiplier:{value:N.height}},vertexShader:`
        varying vec2 vUv;
        
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform float startOpacity;
        uniform float endOpacity;
        uniform float offsetY;
        uniform float heightMultiplier;
        uniform vec3 overlayColor;
        varying vec2 vUv;
        
        void main() {
          // Calculate y position with offset and height multiplier
          // Use vUv.y directly (0 at bottom, 1 at top)
          float y = (vUv.y - offsetY) * heightMultiplier;
          
          // Clamp y between 0 and 1
          y = clamp(y, 0.0, 1.0);
          
          // Linear gradient from bottom to top
          // endOpacity at bottom (y=0), startOpacity at top (y=1)
          float opacity = mix(endOpacity, startOpacity, y);
          
          gl_FragColor = vec4(overlayColor, opacity);
        }
      `,depthTest:!1,depthWrite:!1,side:w.DoubleSide});const o=window.innerHeight,r=P.right-P.left,l=P.top-P.bottom,f=o*.66*(l/o),m=new w.PlaneGeometry(r,f);D=new w.Mesh(m,H),D.rotation.set(0,0,0),D.position.x=0,D.position.y=N.yOffset*l,D.position.z=-100,D.frustumCulled=!1,D.renderOrder=9999,D.visible=N.enabled,Ne.add(D)}function et(){if(!D)return;D.rotation.set(0,0,0),D.position.x=0;const o=P.top-P.bottom;D.position.y=N.yOffset*o,D.position.z=-100}_i();const T={visible:!1,scale:25,positionX:0,positionY:-280,positionZ:0,rotationX:0,rotationY:0,rotationZ:0,autoRotate:!0,autoRotateSpeed:.05,baseRotateSpeed:.05,scrollRotateSpeed:.075,responsive:!0,baseScale:25,opacity:0,rotationPaused:!1},Ao=new gi,$t=new vi;$t.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/"),$t.setDecoderConfig({type:"js"}),Ao.setDRACOLoader($t);let _,Yt=1;function $e(o){if(!_)return;Yt=o;const r=window.innerWidth,l=window._mobileShaderScale||1;if(r<640&&l>1){const m=1/l,u=o*m;_.scale.set(u,o,o),console.log(`%c[Globe Compensation] shaderScale: ${l}, compensation: ${m.toFixed(4)}`,"color: cyan; font-weight: bold"),console.log(`%c[Globe Compensation] Applied scale - X: ${u.toFixed(2)}, Y: ${o.toFixed(2)}, Z: ${o.toFixed(2)}`,"color: cyan"),console.log(`%c[Globe Compensation] Visual after CSS: X: ${(u*l).toFixed(2)}, Y: ${o.toFixed(2)} (should match)`,"color: lime"),A.log(`[Globe] Logical scale: ${o.toFixed(2)}, Applied X: ${u.toFixed(2)} (comp: ${m.toFixed(4)})`)}else _.scale.set(o,o,o)}function jt(){!_||Yt<=0||$e(Yt)}const yi=t==="low"||le.isAEMEmbedded(),bi=o=>{_=o.scene;let l=new w.Box3().setFromObject(_).getCenter(new w.Vector3),f=new w.Group;f.add(_),_.position.set(-l.x,-l.y,-l.z),_=f,_.visible=T.visible,_.frustumCulled=!0,_.traverse(C=>{C.isMesh&&(C.frustumCulled=!0)}),We.add(_),_.position.set(T.positionX,T.positionY,T.positionZ),_.rotation.set(T.rotationX*Math.PI/180,T.rotationY*Math.PI/180,T.rotationZ*Math.PI/180),T.responsive?(Te(),window.innerWidth<640&&window._mobileShaderScale>1&&setTimeout(()=>{_&&(jt(),A.log("[Globe] Reapplied scale compensation after delay"))},100)):($e(T.scale),je());const m=q.addFolder("Material");let u=0;_.traverse(C=>{if(C.isMesh&&C.material){const y=C.material;if(u++,y.isMeshStandardMaterial||y.isMeshPhongMaterial){y.metalness!==void 0&&m.add({metalness:y.metalness},"metalness",0,1).name(`Metalness${u>1?" "+u:""}`).onChange(F=>{y.metalness=F}),y.roughness!==void 0&&m.add({roughness:y.roughness},"roughness",0,1).name(`Roughness${u>1?" "+u:""}`).onChange(F=>{y.roughness=F}),y.shininess!==void 0&&m.add({shininess:y.shininess},"shininess",0,100).name(`Shininess${u>1?" "+u:""}`).onChange(F=>{y.shininess=F}),m.add({opacity:y.opacity},"opacity",0,1).name(`Opacity${u>1?" "+u:""}`).onChange(F=>{y.opacity=F,y.transparent=F<1});const k=y.emissive?"#"+y.emissive.getHexString():"#000000";m.addColor({color:k},"color").name(`Emissive Color${u>1?" "+u:""}`).onChange(F=>{y.emissive&&y.emissive.set(F)})}}})},Xt=()=>{const o=bn("globe-hd.glb",pn);A.log("[Background Init] Loading globe model..."),Ao.load(o,bi,r=>{if(r.lengthComputable){const l=r.loaded/r.total*100;l%25===0&&A.log(`[Background Init] Globe loading: ${l.toFixed(0)}%`)}},r=>{A.error("Error loading globe model:",r)})};yi?(A.log("[Background Init] Deferring globe model load for performance"),"requestIdleCallback"in window?requestIdleCallback(()=>Xt(),{timeout:2e3}):setTimeout(()=>Xt(),1e3)):Xt(),window.uniforms={time:{value:0},resolution:{value:new w.Vector2(window.innerWidth,window.innerHeight)},mainSpeed:{value:12e-5},waveSpeed:{value:1},noiseSpeed:{value:.45},colorCycleSpeed:{value:2},colorCycleOffset:{value:0},color1:{value:new w.Color("#e2e2e2")},color2:{value:new w.Color("#515151")},colorDarkness:{value:0},colorWaveInfluence:{value:0},colorFrequencyShift:{value:0},colorAmplitudeEffect:{value:0},waveAmplitude:{value:.8},waveFrequency:{value:4},waveDepth:{value:.6},flowDirection:{value:new w.Vector2(-.7,.82)},noiseScale:{value:2.5},noiseInfluence:{value:0},layerOffset:{value:.4},yOffset:{value:.29},topEdgeSoftness:{value:1},bottomEdgeSoftness:{value:1},leftEdgeSoftness:{value:.2},rightEdgeSoftness:{value:.5},fadeWidth:{value:1},leftCornerRoundness:{value:.8},rightCornerRoundness:{value:1},edgeNoiseAmount:{value:.12},edgeNoiseScale:{value:3},edgeDepth:{value:.9},edgeContrast:{value:2},bottomWaveEnabled:{value:!0},bottomWaveDepth:{value:.117},bottomWaveWidth:{value:6.475},bottomWaveSpeed:{value:0},bottomWaveOffset:{value:-2.207},filmNoiseIntensity:{value:le.isMobile()?0:.056},filmNoiseSpeed:{value:28e-7},filmGrainSize:{value:6},filmScratchIntensity:{value:0},filmGrainEnabled:{value:!le.isMobile()},lightDirection:{value:new w.Vector3(.5,.5,1).normalize()},ambientLight:{value:.6},directionalLight:{value:.6},specularStrength:{value:0},shininess:{value:128},displacementStrength:{value:0},displacementScale:{value:1e-4},displacementDepth:{value:0},xOffset:{value:-.104}};const s=window.uniforms,Eo=()=>{typeof window.gsap<"u"&&window.gsap.ScrollTrigger?(A.log("[Background] GSAP and ScrollTrigger ready, initializing color animations"),L(window.gsap,window.gsap.ScrollTrigger)):A.warn("GSAP or ScrollTrigger not found on window object - ScrollTrigger animations may not work")};if(window.gsapReady&&window.gsap&&window.gsap.ScrollTrigger)Eo();else{let o=0;const r=20,l=()=>{o++,window.gsapReady&&window.gsap&&window.gsap.ScrollTrigger?Eo():o<r?setTimeout(l,100):A.error("[Background] GSAP not available after waiting - color animations disabled")};setTimeout(l,50)}le.isMobile()&&(Ht.setIntensity(.06),Ht.setOpacity(.8),Ht.start(),A.log("[Background Init] Using lightweight mobile film grain"));const wi=`
    uniform float time;
    uniform float waveSpeed;
    uniform float noiseSpeed;
    uniform vec2 resolution;
    uniform float yOffset;
    uniform float xOffset;
    varying vec2 vUv;
    varying vec3 vViewPosition;
    varying vec3 vNormal;
    
    void main() {
      vUv = uv;
      
      // Apply xOffset and yOffset to the entire mesh by shifting the position
      vec3 positionWithOffset = position;
      positionWithOffset.y += yOffset * resolution.y; // Scale by resolution for pixel-based offset
      positionWithOffset.x += xOffset * resolution.x; // Scale by resolution for pixel-based offset
      
      // Pass normal and view position for lighting calculations
      vNormal = normalMatrix * normal;
      vec4 mvPosition = modelViewMatrix * vec4(positionWithOffset, 1.0);
      vViewPosition = -mvPosition.xyz;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(positionWithOffset, 1.0);
    }
  `,Ci=`
    uniform float time;
    uniform vec2 resolution;
    uniform float yOffset;
    uniform float xOffset;
    uniform float topEdgeSoftness;
    uniform float bottomEdgeSoftness;
    uniform float leftEdgeSoftness;
    uniform float rightEdgeSoftness;
    uniform float fadeWidth;
    uniform float leftCornerRoundness;
    uniform float rightCornerRoundness;
    uniform float edgeNoiseAmount;
    uniform float edgeNoiseScale;
    uniform float edgeDepth;
    uniform float edgeContrast;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform float colorDarkness;
    uniform float colorWaveInfluence;
    uniform float colorFrequencyShift;
    uniform float colorAmplitudeEffect;
    uniform float noiseScale;
    uniform float waveAmplitude;
    uniform float waveFrequency;
    uniform float waveDepth;
    uniform vec2 flowDirection;
    uniform float noiseInfluence;
    uniform float layerOffset;
    uniform vec3 lightDirection;
    uniform float ambientLight;
    uniform float directionalLight;
    uniform float specularStrength;
    uniform float shininess;
    uniform float colorCycleSpeed;
    uniform float colorCycleOffset;
    uniform float noiseSpeed;
    uniform float waveSpeed;
    uniform float filmNoiseIntensity;
    uniform float filmNoiseSpeed;
    uniform float filmGrainSize;
    uniform float filmScratchIntensity;
    uniform bool filmGrainEnabled; // Flag to completely disable film grain for performance
    uniform bool bottomWaveEnabled;
    uniform float bottomWaveDepth;
    uniform float bottomWaveWidth;
    uniform float bottomWaveSpeed;
    uniform float bottomWaveOffset;
    varying vec2 vUv;
    varying vec3 vViewPosition;
    varying vec3 vNormal;
    
    // Pseudo-random function
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }
    
    // Improved 2D noise function with smoother transitions
    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      
      // Four corners in 2D of a tile
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      
      // Cubic Hermite interpolation for smoother transitions
      vec2 u = f * f * (3.0 - 2.0 * f);
      
      // Mix 4 corners with smoother interpolation
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }
    
    // Enhanced Fractal Brownian Motion (FBM) for smoother noise
    float fbm(vec2 st) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;
      
      // Loop of octaves with more iterations for smoother detail
      for (int i = 0; i < 4; i++) {
        value += amplitude * noise(st * frequency);
        st += st * 0.2; // Domain warping for more organic patterns
        frequency *= 2.0;
        amplitude *= 0.5;
      }
      
      return value;
    }
    
    // Smooth interpolation function
    float smoothInterpolation(float edge0, float edge1, float x) {
      // Hermite interpolation for smoother transitions
      float t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
      return t * t * (3.0 - 2.0 * t);
    }
    
    // Extract color intensity (brightness) from a color
    float getColorIntensity(vec3 color) {
      // Use luminance formula to get perceived brightness
      return dot(color, vec3(0.299, 0.587, 0.114));
    }
    
    // Extract color hue from RGB
    float getColorHue(vec3 color) {
      float minVal = min(min(color.r, color.g), color.b);
      float maxVal = max(max(color.r, color.g), color.b);
      float delta = maxVal - minVal;
      
      float hue = 0.0;
      if (delta > 0.0) {
        if (maxVal == color.r) {
          hue = (color.g - color.b) / delta;
          if (hue < 0.0) hue += 6.0;
        } else if (maxVal == color.g) {
          hue = 2.0 + (color.b - color.r) / delta;
        } else {
          hue = 4.0 + (color.r - color.g) / delta;
        }
        hue /= 6.0;
      }
      return hue;
    }
    
    // Function to create a wave pattern with depth effect and color influence
    float wavePattern(vec2 uv, float depth, vec3 localColor) {
      // Extract color properties to influence the wave
      float colorIntensity = getColorIntensity(localColor);
      float colorHue = getColorHue(localColor);
      
      // Create flow direction based on time, modified by color
      vec2 colorModifiedFlow = flowDirection;
      // Make flow direction respond to color hue
      colorModifiedFlow += vec2(cos(colorHue * 6.28), sin(colorHue * 6.28)) * colorWaveInfluence * 0.5;
      
      // Apply waveSpeed to the time component of the sine waves to control actual wave speed
      // Use continuous time for perfectly smooth wave motion
      float timeComponent = time * waveSpeed;
      
      // Create a depth-dependent time component for better synergy between depth and color cycling
      // This makes different depth layers cycle at slightly different rates
      float depthTimeComponent = timeComponent * (1.0 - depth * 0.3);
      
      // Reduce the flow direction influence for less translation and more morphing
      // This creates a moving coordinate system that flows in the specified direction but with less movement
      vec2 flowUv = uv + colorModifiedFlow * depthTimeComponent * 0.3;
      
      // Add time-based distortion to create organic morphing effect
      // This creates bulging and receding areas that change over time
      // Make the morphing respond to depth for better synergy
      float morphStrength = 0.05 * (1.0 - depth * 0.3);
      vec2 morphUv = flowUv;
      morphUv.x += sin(uv.y * 3.0 + depthTimeComponent * 0.7) * morphStrength;
      morphUv.y += cos(uv.x * 2.5 + depthTimeComponent * 0.6) * morphStrength;
      
      // Modify frequency based on color
      float frequencyMod = waveFrequency * (1.0 + (colorHue - 0.5) * colorFrequencyShift);
      
      // Create multiple wave layers with different frequencies for depth
      // Use color intensity to modify wave phase
      float colorPhaseShift = colorIntensity * colorWaveInfluence * 3.0;
      
      // Color cycling is now handled separately in the main function
      // Wave patterns use only regular time to prevent speed accumulation
      
      // Create pulsing amplitude effect over time for more organic movement
      // Make the pulse effect respond to depth for better synergy
      float pulseEffect = sin(depthTimeComponent * 0.2) * 0.2 + 0.8;
      
      // Generate waves with more organic variation
      // Make the waves directly respond to the depth parameter for better depth-color synergy
      float depthFactor = 1.0 - depth * 0.5; // Higher value for foreground
      
      // Use depth to influence wave frequency and phase for better synergy
      // Create wave patterns that are independent of color cycling to prevent speed accumulation
      float wave1 = sin(morphUv.x * frequencyMod * (4.0 + depth) + depthTimeComponent * depthFactor + colorPhaseShift) * 0.5 + 0.5;
      float wave2 = sin(morphUv.y * frequencyMod * (3.0 + depth * 0.5) + depthTimeComponent * 0.7 * depthFactor + colorPhaseShift * 0.8) * 0.5 + 0.5;
      float wave3 = sin((morphUv.x + morphUv.y) * frequencyMod * (2.0 + depth * 0.3) + depthTimeComponent * 1.3 * depthFactor + colorPhaseShift * 0.6) * 0.5 + 0.5;
      
      // Apply depth offset to create parallax effect
      float depthOffset = depth * layerOffset;
      
      // Combine waves with weighted averaging for a more complex pattern
      // Use color components as weights for a more direct relationship between color and wave pattern
      float rWeight = localColor.r * 0.33 + 0.22; // Weight influenced by red component
      float gWeight = localColor.g * 0.33 + 0.22; // Weight influenced by green component
      float bWeight = localColor.b * 0.33 + 0.22; // Weight influenced by blue component
      
      // Normalize weights to ensure they sum to 1.0
      float totalWeight = rWeight + gWeight + bWeight;
      rWeight /= totalWeight;
      gWeight /= totalWeight;
      bWeight /= totalWeight;
      
      float wave = wave1 * rWeight + wave2 * gWeight + wave3 * bWeight;
      
      // Apply noise influence for organic movement with more variation
      // Use a more dynamic noise pattern that changes over time
      // Make noise pattern respond to depth for better synergy
      float noiseTimeComponent = time * 0.1 * noiseSpeed * (1.0 - depth * 0.3);
      float noiseValue = fbm((uv + vec2(sin(timeComponent * 0.1), cos(timeComponent * 0.15))) * noiseScale + noiseTimeComponent);
      
      // Use color intensity to control noise mixing with more influence
      float noiseMix = noiseInfluence * depthFactor * (1.0 + colorIntensity * colorWaveInfluence);
      wave = mix(wave, noiseValue, clamp(noiseMix, 0.0, 1.0));
      
      // Apply color-based amplitude modulation with time-based pulsing
      // Make amplitude modulation respond to depth for better synergy
      float amplitudeMod = pulseEffect * (1.0 + (colorIntensity - 0.5) * colorAmplitudeEffect * depthFactor);
      wave = 0.5 + (wave - 0.5) * amplitudeMod;
      
      return clamp(wave, 0.0, 1.0);
    }
    
    // Function to calculate normal based on wave height field
    vec3 calculateNormal(vec2 uv, float center, vec3 localColor) {
      float epsilon = 0.01;
      
      // Sample wave heights at nearby points
      float right = wavePattern(uv + vec2(epsilon, 0.0), 0.5, localColor);
      float top = wavePattern(uv + vec2(0.0, epsilon), 0.5, localColor);
      
      // Calculate gradient
      // Use color intensity to affect the wave amplitude with time-based variation
      float colorIntensity = getColorIntensity(localColor);
      float timeComponent = time * waveSpeed;
      float pulseEffect = sin(timeComponent * 0.2) * 0.2 + 0.8;
      
      // Apply a more dynamic amplitude modulation for the normal calculation
      float amplitudeMod = waveAmplitude * pulseEffect * (1.0 + (colorIntensity - 0.5) * colorAmplitudeEffect);
      
      // Create more pronounced normals for a stronger 3D effect
      vec3 dx = vec3(epsilon, 0.0, (right - center) * amplitudeMod * 1.5);
      vec3 dy = vec3(0.0, epsilon, (top - center) * amplitudeMod * 1.5);
      
      // Cross product to get normal
      return normalize(cross(dx, dy));
    }
    
    // Function to calculate a non-linear edge fade with corner rounding
    float calculateEdgeFade(vec2 uv) {
      // Calculate distance from center (0.5, 0.5)
      vec2 centeredUV = uv - 0.5;
      
      // Calculate vertical distance for top/bottom fade with different handling for top vs bottom
      float verticalDist;
      if (centeredUV.y < 0.0) {
        // Bottom half - use full edgeDepth to ensure visibility
        if (bottomWaveEnabled) {
          // Create a wave pattern for the bottom edge
          float waveX = uv.x + bottomWaveOffset + time * bottomWaveSpeed * 0.1;
          float wave = sin(waveX * bottomWaveWidth) * bottomWaveDepth;
          
          // Adjust the vertical distance based on the wave pattern
          // This creates a wave-like bottom edge
          float waveOffset = wave * 0.5 * edgeDepth; // Scale the wave by edgeDepth
          verticalDist = (abs(centeredUV.y) - waveOffset) / (0.5 * edgeDepth);
          verticalDist = max(verticalDist, 0.0); // Ensure we don't go negative
        } else {
          // Standard bottom edge without wave
          verticalDist = abs(centeredUV.y) / (0.5 * edgeDepth);
        }
      } else {
        // Top half - adjust for corner roundness to prevent cutting off
        verticalDist = abs(centeredUV.y) / (0.5 * edgeDepth);
      }
      
      // Calculate horizontal distance for left/right fade
      float horizontalDist;
      if (centeredUV.x < 0.0) {
        // Left side
        horizontalDist = abs(centeredUV.x) / (0.5 * edgeDepth);
      } else {
        // Right side
        horizontalDist = abs(centeredUV.x) / (0.5 * edgeDepth);
      }
      
      // Create a radial distance for corner rounding
      // Adjust the denominator to prevent cutting off at high corner roundness values
      float radialDist = length(centeredUV) / (0.7071 * edgeDepth);
      
      // Determine if we're on the left or right side
      float cornerRoundness = (centeredUV.x < 0.0) ? leftCornerRoundness : rightCornerRoundness;
      
      // Modify corner blending based on whether we're in the top or bottom half
      float cornerBlend;
      if (centeredUV.y < 0.0) {
        // Bottom half - full corner blending
        cornerBlend = smoothstep(0.0, 1.0, pow(horizontalDist, 1.5));
      } else {
        // Top half - reduce corner blending effect as we approach the top edge
        // This prevents the top edge from being cut off with high corner roundness
        float topFactor = smoothstep(0.3, 0.5, abs(centeredUV.y) / 0.5);
        cornerBlend = smoothstep(0.0, 1.0, pow(horizontalDist, 1.5)) * (1.0 - topFactor * cornerRoundness * 0.5);
      }
      
      // Blend between vertical and radial distance
      float distanceField = mix(verticalDist, radialDist, cornerBlend * cornerRoundness);
      
      // Apply noise to the edge for a more organic, burn-in look
      float edgeNoise = noise((uv + time * 0.01) * edgeNoiseScale) * edgeNoiseAmount;
      distanceField = distanceField + (edgeNoise - edgeNoiseAmount * 0.5) * 0.2;
      
      // Apply contrast to the edge
      distanceField = pow(distanceField, edgeContrast);
      
      return distanceField;
    }
    
    // Function to generate film grain noise (optimized)
    float filmGrain(vec2 uv, float grainTime) {
      // Single random call instead of two for better performance
      // Pre-multiply by filmGrainSize to reduce per-pixel calculations
      return random(uv * filmGrainSize + grainTime) * 2.0 - 1.0;
    }
    
    // Function to generate film scratches
    float filmScratches(vec2 uv, float time) {
      // Vertical scratches
      float scratch = 0.0;
      
      // Create a few random scratches
      for (int i = 0; i < 3; i++) {
        float seed = float(i) * 1.3;
        float xPos = fract(sin(time * 0.01 + seed) * 43758.5453);
        float height = fract(sin(time * 0.01 + seed + 1.0) * 43758.5453) * 0.5 + 0.5;
        float width = 0.002 * (sin(time * 0.1 + seed) * 0.5 + 0.5);
        
        // Check if we're within a scratch
        if (abs(uv.x - xPos) < width && random(vec2(uv.y * 100.0, time + seed)) > 0.3) {
          scratch += 1.0 - smoothstep(0.0, width, abs(uv.x - xPos));
        }
      }
      
      // Add some horizontal scratches too
      for (int i = 0; i < 2; i++) {
        float seed = float(i) * 2.7 + 10.0;
        float yPos = fract(sin(time * 0.005 + seed) * 43758.5453);
        float width = 0.001 * (sin(time * 0.2 + seed) * 0.5 + 0.5);
        
        if (abs(uv.y - yPos) < width && random(vec2(uv.x * 100.0, time + seed)) > 0.7) {
          scratch += 1.0 - smoothstep(0.0, width, abs(uv.y - yPos));
        }
      }
      
      return clamp(scratch, 0.0, 1.0);
    }
    
    // Function to apply film noise effects (optimized)
    vec3 applyFilmNoise(vec3 color, vec2 uv) {
      // Early exit if film grain is disabled or intensity is zero
      if (!filmGrainEnabled || (filmNoiseIntensity == 0.0 && filmScratchIntensity == 0.0)) {
        return color;
      }
      
      // Cache time calculation (single operation instead of multiple)
      float grainTime = time * filmNoiseSpeed * 10.0;
      
      // Apply grain only if intensity > 0
      if (filmNoiseIntensity > 0.0) {
        float grain = filmGrain(uv, grainTime);
        color += grain * filmNoiseIntensity;
      }
      
      // Apply scratches only if intensity > 0 (scratches are disabled by default)
      if (filmScratchIntensity > 0.0) {
        float scratches = filmScratches(uv, grainTime * 0.5);
        color += scratches * filmScratchIntensity;
      }
      
      return color;
    }
    
    void main() {
      vec2 uv = vUv;
      
      // Get initial color blend for feedback
      // Create a time-varying color mix for more dynamic effects
      // Make the color mix factor respond to the wave depth for better synergy
      float waveDepthFactor = waveDepth * (1.0 + sin(time * 0.3) * 0.1);
      
      // Create a more dynamic color mix that's influenced by the wave depth
      // Use separate time for color cycling to prevent wave intensity accumulation
      float colorCycleTime = time + colorCycleOffset;
      float colorCyclePhase = colorCycleTime * colorCycleSpeed;
      float colorMixFactor = sin(colorCyclePhase * 0.1) * 0.1 + 0.5;
      
      // Create initial color blend
      vec3 initialColor = mix(color1, color2, colorMixFactor);
      
      // Create multiple depth layers for parallax effect with consistent color influence
      float foregroundWave = wavePattern(uv, 0.0, initialColor); // Foreground layer
      float middleWave = wavePattern(uv, 0.5, initialColor);     // Middle layer
      float backgroundWave = wavePattern(uv, 1.0, initialColor); // Background layer
      
      // Create more dynamic depth-based color mixing
      // Use the wave patterns to create more interesting color blends
      // Make the color mixing directly respond to the wave amplitude
      
      // Create a more dynamic color transition based on wave patterns
      // This creates a more direct relationship between wave height and color
      float foregroundColorMix = mix(0.3, 0.7, foregroundWave);
      float backgroundColorMix = mix(0.7, 0.3, backgroundWave);
      
      // Apply color cycling that's synchronized with the wave patterns
      // Reduce the influence of colorCyclePhase to minimize optical motion during scrubbing
      float reducedCycleInfluence = waveDepthFactor * 0.2; // Reduced from 0.5 to 0.2
      foregroundColorMix = mix(foregroundColorMix, sin(colorCyclePhase + foregroundWave * 3.14) * 0.5 + 0.5, reducedCycleInfluence);
      backgroundColorMix = mix(backgroundColorMix, sin(colorCyclePhase + backgroundWave * 3.14 + 1.57) * 0.5 + 0.5, reducedCycleInfluence);
      
      vec3 foregroundColor = mix(color1, color2, foregroundColorMix);
      vec3 backgroundColor = mix(color2, color1, backgroundColorMix);
      
      // Add subtle color variations that are synchronized with the wave patterns
      // Reduce the intensity of color variations to minimize optical motion during scrubbing
      // Use colorCycleTime for color variations to maintain continuity
      float waveSyncFactor = sin(time * waveSpeed * 0.2) * 0.5 + 0.5;
      foregroundColor += vec3(sin(colorCycleTime * 0.5) * 0.015, cos(colorCycleTime * 0.6) * 0.015, sin(colorCycleTime * 0.7) * 0.015) * foregroundWave;
      backgroundColor += vec3(cos(colorCycleTime * 0.4) * 0.015, sin(colorCycleTime * 0.5) * 0.015, cos(colorCycleTime * 0.6) * 0.015) * backgroundWave;
      
      // Create a more dynamic depth blend that's influenced by the wave depth parameter
      // This creates a stronger connection between the depth parameter and the visual effect
      float depthBlendRange = 0.3 + waveDepthFactor * 0.4; // Dynamic blend range based on wave depth
      float depthBlendMin = 0.5 - depthBlendRange * 0.5;
      float depthBlendMax = 0.5 + depthBlendRange * 0.5;
      float depthBlend = smoothInterpolation(depthBlendMin, depthBlendMax, middleWave);
      
      // Make the depth blend more responsive to the wave pattern
      depthBlend = mix(depthBlend, middleWave, waveDepthFactor * 0.5);
      
      // Create a more dynamic color blend based on wave patterns
      vec3 baseColor = mix(backgroundColor, foregroundColor, depthBlend);
      
      // Apply a subtle color shift based on the wave pattern
      // This creates a more direct relationship between wave height and color
      float colorShiftAmount = waveDepthFactor * 0.2;
      vec3 shiftedColor = mix(baseColor, 
                             vec3(baseColor.r * (1.0 + middleWave * 0.1),
                                  baseColor.g * (1.0 + foregroundWave * 0.1),
                                  baseColor.b * (1.0 + backgroundWave * 0.1)),
                             colorShiftAmount);
      baseColor = shiftedColor;
      
      // Apply darkness to the colors with slight time variation for "breathing" effect
      // Synchronize the darkness variation with the wave pattern, reduced intensity for less optical motion
      // Keep using time for wave-related breathing effect
      float darknessVariation = colorDarkness * (1.0 + sin(time * 0.2) * 0.025 + middleWave * 0.05);
      baseColor = mix(baseColor, vec3(0.0, 0.0, 0.0), darknessVariation);
      
      // Calculate lighting based on wave normal with consistent color influence
      vec3 waveNormal = calculateNormal(uv, middleWave, initialColor);
      
      // Blend between the wave normal and the surface normal for subtle effect
      // Make the normal blend more dynamic with time and directly tied to the wave depth
      // Use the wave pattern to directly influence the normal calculation
      float normalBlendFactor = waveDepthFactor * (0.5 + middleWave * 0.5);
      // Add variation to the normal based on the wave pattern
      vec3 modifiedWaveNormal = waveNormal;
      modifiedWaveNormal.xy += vec2(sin(foregroundWave * 6.28) * 0.1, cos(backgroundWave * 6.28) * 0.1) * waveDepthFactor;
      modifiedWaveNormal = normalize(modifiedWaveNormal);
      
      vec3 normal = normalize(mix(vNormal, modifiedWaveNormal, normalBlendFactor));
      
      // Lighting calculations
      vec3 viewDir = normalize(vViewPosition);
      vec3 lightDir = normalize(lightDirection);
      
      // Add subtle movement to the light direction for more dynamic lighting
      // Synchronize light movement with wave patterns for better synergy, reduced intensity
      // Make the light direction respond directly to the wave pattern (keep using time for wave-related motion)
      lightDir.x += sin(time * 0.2) * 0.025 * middleWave;
      lightDir.y += cos(time * 0.25) * 0.025 * middleWave;
      // Add a subtle rotation to the light direction based on the wave pattern
      float lightRotation = (foregroundWave - 0.5) * waveDepthFactor * 0.2;
      // Small-angle optimization: cos(x)≈1, sin(x)≈x for |x| < 0.2
      vec3 rotatedLightDir = vec3(
          lightDir.x - lightDir.y * lightRotation,
          lightDir.x * lightRotation + lightDir.y,
          lightDir.z
      );
      lightDir = normalize(rotatedLightDir);
      
      // Ambient lighting with subtle color variation
      // Make the ambient color variation respond to the wave pattern, reduced intensity
      // Create a more dynamic ambient color that's influenced by the wave pattern (keep using time for wave-related motion)
      vec3 ambientVariation = vec3(sin(time * 0.3) * 0.015, cos(time * 0.4) * 0.015, sin(time * 0.5) * 0.015) * middleWave;
      // Add color cycling to the ambient lighting
      ambientVariation += (foregroundColor - backgroundColor) * foregroundWave * 0.05 * waveDepthFactor;
      vec3 ambientColor = baseColor * (1.0 + ambientVariation);
      vec3 ambient = ambientLight * ambientColor;
      
      // Diffuse lighting with enhanced contrast
      // Make the diffuse lighting more responsive to the wave pattern
      float diff = max(dot(normal, lightDir), 0.0);
      // Add variation to the diffuse lighting based on the wave pattern
      diff = pow(diff, 1.2 + foregroundWave * 0.3); // Add contrast to the diffuse lighting
      // Enhance diffuse lighting based on wave height for better synergy
      diff *= 1.0 + middleWave * waveDepthFactor * 0.5;
      // Add a subtle color shift to the diffuse lighting based on the wave pattern
      vec3 diffuseColor = baseColor;
      diffuseColor = mix(diffuseColor, foregroundColor, foregroundWave * waveDepthFactor * 0.2);
      vec3 diffuse = directionalLight * diff * diffuseColor;
      
      // Specular lighting (Blinn-Phong) with time-based variation
      vec3 halfwayDir = normalize(lightDir + viewDir);
      // Make the specular power respond to the wave pattern
      float specPower = shininess * (1.0 + foregroundWave * waveDepthFactor * 2.0);
      float spec = pow(max(dot(normal, halfwayDir), 0.0), specPower);
      // Add time-based variation to the specular highlights
      // Synchronize specular highlights with wave patterns, reduced intensity (keep using time for wave-related motion)
      float specularVariation = 1.0 + sin(time * 0.5) * 0.1 * foregroundWave;
      // Add color to the specular highlights based on the wave pattern
      vec3 specularColor = mix(vec3(1.0), foregroundColor * 1.5, foregroundWave * waveDepthFactor * 0.3);
      vec3 specular = specularStrength * specularVariation * spec * specularColor;
      
      // Combine lighting components
      vec3 color = ambient + diffuse + specular;
      
      // Add highlights based on wave height for extra depth with more variation
      // Make highlights directly respond to the wave pattern for better synergy, reduced intensity (keep using time for wave-related motion)
      float highlightIntensity = smoothInterpolation(0.4, 0.6, foregroundWave) * waveDepthFactor * (1.0 + sin(time * 0.4) * 0.1);
      // Add color tint to highlights based on the wave pattern
      // Create a more dynamic highlight color that's influenced by the wave pattern
      vec3 highlightColor = mix(vec3(0.1, 0.1, 0.15), mix(color1, color2, foregroundWave) * 0.5, waveDepthFactor * 0.5);
      // Add variation to the highlight color based on the wave pattern
      highlightColor = mix(highlightColor, foregroundColor * 0.7, middleWave * 0.5);
      color += highlightColor * highlightIntensity;
      
      // Apply film noise effects
      color = applyFilmNoise(color, uv);
      
      // Calculate non-linear edge fade with corner rounding
      float distanceField = calculateEdgeFade(uv);
      
      // Apply different softness to all edges
      float alpha = 1.0;
      
      // Vertical edges (top/bottom)
      if (uv.y >= 0.5) {
        // Top half
        float normalizedDist = (distanceField - 0.5) / 0.5; // Normalize to 0-1 range for top half
        alpha *= 1.0 - smoothInterpolation(1.0 - topEdgeSoftness, 1.0, normalizedDist);
      } else {
        // Bottom half
        float normalizedDist = (distanceField - 0.5) / 0.5; // Normalize to 0-1 range for bottom half
        alpha *= 1.0 - smoothInterpolation(1.0 - bottomEdgeSoftness, 1.0, normalizedDist);
      }
      
      // Horizontal edges (left/right)
      if (uv.x >= 0.5) {
        // Right half
        float normalizedDist = (abs(uv.x - 0.5) / 0.5) / edgeDepth;
        alpha *= 1.0 - smoothInterpolation(1.0 - rightEdgeSoftness, 1.0, normalizedDist);
      } else {
        // Left half
        float normalizedDist = (abs(uv.x - 0.5) / 0.5) / edgeDepth;
        alpha *= 1.0 - smoothInterpolation(1.0 - leftEdgeSoftness, 1.0, normalizedDist);
      }
      
      // Add subtle noise to alpha for a more organic edge (keep using time for wave-related motion)
      float edgeNoise = noise(uv * noiseScale * 2.0 + time * 0.05 * noiseSpeed);
      alpha *= 0.95 + edgeNoise * 0.05;

      gl_FragColor = vec4(color, alpha);
    }
  `,Si=new w.PlaneGeometry(window.innerWidth,window.innerHeight,32,18),xi=new w.ShaderMaterial({vertexShader:wi,fragmentShader:Ci,uniforms:s,transparent:!0,side:w.DoubleSide}),tt=new w.Mesh(Si,xi);Ne.add(tt),window.gui=new hn({width:300,closed:!0});const b=window.gui;b.domElement.style.position="absolute",b.domElement.style.top="10px",b.domElement.style.right="10px";const qt=b.domElement.querySelector(".close-button");qt&&(qt.innerHTML="Open Controls",qt.addEventListener("click",function(){setTimeout(()=>{this.innerHTML=b.closed?"Open Controls":"Close Controls"},50)}));const Po=b.addFolder("Camera Controls");Po.add(Ae,"zoom",.1,5).name("Zoom Level").step(.001).onChange(o=>{P.zoom=o,P.updateProjectionMatrix()}),Po.close();const Ye=b.addFolder("Animation Speed Controls");Ye.add(s.mainSpeed,"value",1e-4,.1).name("Main Speed").step(1e-4).onChange(o=>{s.mainSpeed.value=o}),Ye.add(s.waveSpeed,"value",1e-4,5).name("Wave Speed").step(1e-4).onChange(o=>{s.waveSpeed.value=o}),Ye.add(s.noiseSpeed,"value",1e-4,5).name("Noise Speed").step(1e-4).onChange(o=>{s.noiseSpeed.value=o}),Ye.add(s.colorCycleSpeed,"value",1e-6,5).name("Color Cycle Speed").step(1e-6).onChange(o=>{s.colorCycleSpeed.value=o}),Ye.add(s.colorCycleOffset,"value",0,6.28).name("Color Cycle Offset").step(.01).onChange(o=>{s.colorCycleOffset.value=o}),Ye.open();const He=b.addFolder("Color Controls"),Mi="#"+s.color1.value.getHexString(),Ai="#"+s.color2.value.getHexString();He.addColor({color:Mi},"color").name("Color 1").onChange(o=>{typeof o=="string"?s.color1.value.set(o):s.color1.value.setRGB(o.r/255,o.g/255,o.b/255)}),He.addColor({color:Ai},"color").name("Color 2").onChange(o=>{typeof o=="string"?s.color2.value.set(o):s.color2.value.setRGB(o.r/255,o.g/255,o.b/255)}),He.add(s.colorDarkness,"value",0,2).name("Color Darkness").step(.001).onChange(o=>{s.colorDarkness.value=o}),He.add(s.colorWaveInfluence,"value",0,1).name("Color → Wave Influence").onChange(o=>{s.colorWaveInfluence.value=o}),He.add(s.colorFrequencyShift,"value",0,1).name("Color → Frequency Effect").onChange(o=>{s.colorFrequencyShift.value=o}),He.add(s.colorAmplitudeEffect,"value",0,1).name("Color → Amplitude Effect").onChange(o=>{s.colorAmplitudeEffect.value=o}),He.open();const Ve=b.addFolder("Wave Controls");Ve.add(s.waveAmplitude,"value",0,12).step(1e-4).name("Wave Amplitude").onChange(o=>{s.waveAmplitude.value=o}),Ve.add(s.waveFrequency,"value",.1,5).name("Wave Frequency").onChange(o=>{s.waveFrequency.value=o}),Ve.add(s.waveDepth,"value",0,1).name("Wave Depth Effect").onChange(o=>{s.waveDepth.value=o}),Ve.add(s.noiseScale,"value",0,5).name("Noise Scale").onChange(o=>{s.noiseScale.value=o}),Ve.add(s.noiseInfluence,"value",0,1).name("Noise Influence").onChange(o=>{s.noiseInfluence.value=o}),Ve.add(s.layerOffset,"value",0,1).name("Layer Depth Offset").onChange(o=>{s.layerOffset.value=o});const ko=Ve.addFolder("Flow Direction");ko.add(s.flowDirection.value,"x",-2,2).name("Horizontal Flow").onChange(o=>{s.flowDirection.value.x=o}),ko.add(s.flowDirection.value,"y",-2,2).name("Vertical Flow").onChange(o=>{s.flowDirection.value.y=o});const fe=b.addFolder("Appearance Controls"),vt=b.addFolder("Film Noise Controls");vt.add(s.filmNoiseIntensity,"value",0,1).name("Noise Intensity").onChange(o=>{s.filmNoiseIntensity.value=o}),vt.add({speed:s.filmNoiseSpeed.value*1e6},"speed",1,8).name("Noise Speed (×1e-6)").step(.1).onChange(o=>{s.filmNoiseSpeed.value=o*1e-6}),vt.add(s.filmGrainSize,"value",.5,50).name("Grain Size").onChange(o=>{s.filmGrainSize.value=o}),vt.add(s.filmScratchIntensity,"value",0,.1).name("Scratch Intensity").onChange(o=>{s.filmScratchIntensity.value=o}),fe.add(s.xOffset,"value",-1,1).step(.001).name("X Position").onChange(o=>{s.xOffset.value=o}),fe.add(s.yOffset,"value",-1,1).step(.001).name("Y Position").onChange(o=>{s.yOffset.value=o}),fe.add(s.fadeWidth,"value",.1,1).name("Visible Area Size").onChange(o=>{s.fadeWidth.value=o}),fe.add(s.topEdgeSoftness,"value",0,1).name("Top Edge Softness").onChange(o=>{s.topEdgeSoftness.value=o}),fe.add(s.bottomEdgeSoftness,"value",0,1).name("Bottom Edge Softness").onChange(o=>{s.bottomEdgeSoftness.value=o}),fe.add(s.leftEdgeSoftness,"value",0,1).name("Left Edge Softness").onChange(o=>{s.leftEdgeSoftness.value=o}),fe.add(s.rightEdgeSoftness,"value",0,1).name("Right Edge Softness").onChange(o=>{s.rightEdgeSoftness.value=o}),fe.add(s.leftCornerRoundness,"value",0,1).name("Left Corner Roundness").onChange(o=>{s.leftCornerRoundness.value=o}),fe.add(s.rightCornerRoundness,"value",0,1).name("Right Corner Roundness").onChange(o=>{s.rightCornerRoundness.value=o}),fe.add(s.edgeDepth,"value",.1,3).name("Edge Burn-in Depth").onChange(o=>{s.edgeDepth.value=o}),fe.add(s.edgeContrast,"value",.5,3).name("Edge Contrast").onChange(o=>{s.edgeContrast.value=o}),fe.add(s.edgeNoiseAmount,"value",0,1).name("Edge Noise Amount").onChange(o=>{s.edgeNoiseAmount.value=o}),fe.add(s.edgeNoiseScale,"value",.5,10).name("Edge Noise Scale").onChange(o=>{s.edgeNoiseScale.value=o});const ot=b.addFolder("Bottom Wave Edge Controls");ot.add(s.bottomWaveEnabled,"value").name("Enable Bottom Wave").onChange(o=>{s.bottomWaveEnabled.value=o,_&&T.responsive&&je()}),ot.add(s.bottomWaveDepth,"value",0,.5).name("Wave Depth").step(.001).onChange(o=>{s.bottomWaveDepth.value=o,_&&T.responsive&&je()}),ot.add(s.bottomWaveWidth,"value",1,20).name("Wave Width").step(.001).onChange(o=>{s.bottomWaveWidth.value=o}),ot.add(s.bottomWaveSpeed,"value",0,5).name("Wave Speed").step(.001).onChange(o=>{s.bottomWaveSpeed.value=o}),ot.add(s.bottomWaveOffset,"value",-5,5).name("Wave Offset").step(.001).onChange(o=>{s.bottomWaveOffset.value=o});const it=b.addFolder("Lighting Controls");it.add(s.ambientLight,"value",0,1).name("Ambient Light").onChange(o=>{s.ambientLight.value=o}),it.add(s.directionalLight,"value",0,1).name("Directional Light").step(.001).onChange(o=>{s.directionalLight.value=o}),it.add(s.specularStrength,"value",0,1).step(.001).name("Specular Strength").onChange(o=>{s.specularStrength.value=o}),it.add(s.shininess,"value",1,128).name("Shininess").onChange(o=>{s.shininess.value=o});const Kt=it.addFolder("Light Direction");Kt.add(s.lightDirection.value,"x",-1,1).name("X").onChange(()=>{s.lightDirection.value.normalize()}),Kt.add(s.lightDirection.value,"y",-1,1).name("Y").onChange(()=>{s.lightDirection.value.normalize()}),Kt.add(s.lightDirection.value,"z",0,1).name("Z").onChange(()=>{s.lightDirection.value.normalize()});const q=b.addFolder("Globe Model Controls"),_t=new w.DirectionalLight(16777215,10);_t.position.set(1,1,1),Ne.add(_t);const Zt=new w.AmbientLight(16777215,.5);Ne.add(Zt);const Fo=q.addFolder("Lighting");Fo.add({intensity:3},"intensity",0,5).name("Direct Light").onChange(o=>{_t.intensity=o}),_t.intensity=3,Fo.add({intensity:Zt.intensity},"intensity",0,5).name("Ambient Light").onChange(o=>{Zt.intensity=o}),q.add(T,"visible").name("Show Globe").onChange(o=>{_&&(_.visible=o)}),q.add(T,"scale",.1,50).name("Size").step(.1).onChange(o=>{_&&(T.baseScale=o,$e(o))}),q.add(T,"responsive").name("Responsive Size").onChange(o=>{!o&&_?$e(T.baseScale):o&&Te()}),q.add({resizeGlobe:function(){_&&Te()}},"resizeGlobe").name("Force Resize"),q.add({positionBehindWave:function(){_&&je()}},"positionBehindWave").name("Position Behind Wave");function je(){if(!_)return;const o=window.innerWidth;if(o<=768){_.position.y=0,_.position.z=-10;for(let f=0;f<ve.__controllers.length;f++){const m=ve.__controllers[f];m.property==="positionY"?m.setValue(0):m.property==="positionZ"&&m.setValue(-10)}return}if(o>768&&o<=1024){_.position.y=192,_.position.z=-10;for(let m=0;m<ve.__controllers.length;m++){const u=ve.__controllers[m];u.property==="positionY"?u.setValue(192):u.property==="positionZ"&&u.setValue(-10)}return}const r=-40,l=-10;_.position.y=r,_.position.z=l;for(let f=0;f<ve.__controllers.length;f++){const m=ve.__controllers[f];m.property==="positionY"?m.setValue(r):m.property==="positionZ"&&m.setValue(l)}}function Te(){if(!_||!T.responsive)return;const o=window.innerWidth;if(o>1024){$e(40);for(let m=0;m<q.__controllers.length;m++)if(q.__controllers[m].property==="scale"){q.__controllers[m].setValue(40);break}je();return}let r;o<=768?r=o*1.2:r=o*.9;const l={x:_.scale.x,y:_.scale.y,z:_.scale.z};try{_.scale.set(1,1,1),_.updateMatrixWorld(!0);const f=new w.Box3().setFromObject(_),m=f.max.x-f.min.x;_.scale.set(l.x,l.y,l.z);const C=(P.right-P.left)/P.zoom/o,k=r*C/m;$e(k);for(let F=0;F<q.__controllers.length;F++)if(q.__controllers[F].property==="scale"){q.__controllers[F].setValue(k);break}je()}catch(f){A.error("Error updating globe size:",f),_.scale.set(l.x,l.y,l.z)}}const ve=q.addFolder("Position");ve.add(T,"positionX",-500,500).name("X Position").step(1).onChange(o=>{_&&(_.position.x=o)}),ve.add(T,"positionY",-500,500).name("Y Position").step(1).onChange(o=>{_&&(_.position.y=o)}),ve.add(T,"positionZ",-500,500).name("Z Position").step(1).onChange(o=>{_&&(_.position.z=o)});const Jt=q.addFolder("Rotation");Jt.add(T,"rotationX",0,360).name("X Rotation").step(1).onChange(o=>{_&&(_.rotation.x=o*Math.PI/180)}),Jt.add(T,"rotationY",0,360).name("Y Rotation").step(1).onChange(o=>{_&&(_.rotation.y=o*Math.PI/180)}),Jt.add(T,"rotationZ",0,360).name("Z Rotation").step(1).onChange(o=>{_&&(_.rotation.z=o*Math.PI/180)}),q.add(T,"autoRotate").name("Auto Rotate").onChange(o=>{T.autoRotate=o}),q.add(T,"baseRotateSpeed",.05,1).name("Base Rotation Speed").step(.01).onChange(o=>{T.baseRotateSpeed=o}),q.add(T,"scrollRotateSpeed",.05,1).name("Scroll Rotation Speed").step(.01).onChange(o=>{T.scrollRotateSpeed=o}),q.open();const Ee=b.addFolder("Gradient Overlay Controls");Ee.add(N,"enabled").name("Show Overlay").onChange(o=>{D&&(D.visible=o)});const Ei=Ee.add(N,"startOpacity",0,1).name("Top Opacity").step(.01).onChange(o=>{H&&(H.uniforms.startOpacity.value=o)});Ei.__li.querySelector(".property-name").innerHTML="Top Opacity (Top Edge)";const Pi=Ee.add(N,"endOpacity",0,1).name("Bottom Opacity").step(.01).onChange(o=>{H&&(H.uniforms.endOpacity.value=o)});Pi.__li.querySelector(".property-name").innerHTML="Bottom Opacity (Bottom Edge)",Ee.add(N,"yOffset",-2,2).name("Vertical Position (moves only)").step(.01).onChange(o=>{D&&et()}),Ee.add(N,"offsetY",-1,1).name("Gradient Shift").step(.01).onChange(o=>{H&&(H.uniforms.offsetY.value=o)}),Ee.add(N,"height",.1,5).name("Gradient Distribution (not size)").step(.1).onChange(o=>{H&&(H.uniforms.heightMultiplier.value=o)}),Ee.addColor(N,"color").name("Color").onChange(o=>{H&&H.uniforms.overlayColor.value.set(o)}),Ee.add({debugOverlay:function(){if(H){const o=H.uniforms.startOpacity.value,r=H.uniforms.endOpacity.value;H.uniforms.startOpacity.value=1,H.uniforms.endOpacity.value=1,H.uniforms.overlayColor.value.set("#FF00FF"),setTimeout(()=>{H.uniforms.startOpacity.value=o,H.uniforms.endOpacity.value=r,H.uniforms.overlayColor.value.set(N.color)},2e3)}}},"debugOverlay").name("Debug Visibility"),Ee.open();let Y=n.particleCount;A.log("[Background Init] Using particle count:",Y);let be=new Float32Array(Y*3),pe=new Float32Array(Y*3),Q=new Float32Array(Y*3),Qt=0,eo=0;const x={scrollSpeed:.005,verticalSpread:1,horizontalSpread:.56,damping:.95,depthRange:1e3,sizeMin:1.1,sizeMax:4,floatSpeed:.8,verticalOffset:0};let me=window.innerHeight*x.verticalSpread,we=window.innerWidth*x.horizontalSpread;function Xe(){const o=new Float32Array(Y),r=new w.Color(bt.color);for(let l=0;l<Y;l++){const f=l*3,m=Math.random(),u=x.sizeMin+m*(x.sizeMax-x.sizeMin);o[l]=u/R.uniforms.baseSize.value;const C=.8+m*.6;Q[f]=r.r*C,Q[f+1]=r.g*C,Q[f+2]=r.b*C}W.setAttribute("size",new w.BufferAttribute(o,1)),W.attributes.position.needsUpdate=!0,W.attributes.color.needsUpdate=!0,W.attributes.size.needsUpdate=!0}for(let o=0;o<Y;o++){const r=o*3;be[r]=(Math.random()-.5)*we,be[r+1]=(Math.random()-.5)*me+x.verticalOffset,be[r+2]=Math.random()*500-250,pe[r]=(Math.random()-.5)*.5,pe[r+1]=(Math.random()-.5)*.5,pe[r+2]=(Math.random()-.5)*.2;const l=new w.Color("#25e5ff");Q[r]=l.r,Q[r+1]=l.g,Q[r+2]=l.b}const W=new w.BufferGeometry;W.setAttribute("position",new w.BufferAttribute(be,3)),W.setAttribute("color",new w.BufferAttribute(Q,3)),ft.track(W,"geometry");const to=ki();ft.track(to,"texture");function ki(){const o=document.createElement("canvas");o.width=256,o.height=256;const r=o.getContext("2d"),l=r.createRadialGradient(o.width/2,o.height/2,0,o.width/2,o.height/2,o.width/2);l.addColorStop(0,"rgba(255, 255, 255, 1.0)"),l.addColorStop(.05,"rgba(255, 255, 255, 1.0)"),l.addColorStop(.2,"rgba(255, 255, 255, 0.9)"),l.addColorStop(.4,"rgba(255, 255, 255, 0.5)"),l.addColorStop(.6,"rgba(255, 255, 255, 0.3)"),l.addColorStop(.8,"rgba(255, 255, 255, 0.1)"),l.addColorStop(1,"rgba(255, 255, 255, 0)"),r.fillStyle=l,r.fillRect(0,0,o.width,o.height),r.beginPath(),r.moveTo(o.width/2,o.width*.3),r.lineTo(o.width/2,o.width*.7),r.moveTo(o.width*.3,o.height/2),r.lineTo(o.width*.7,o.height/2),r.moveTo(o.width*.35,o.height*.35),r.lineTo(o.width*.65,o.height*.65),r.moveTo(o.width*.65,o.height*.35),r.lineTo(o.width*.35,o.height*.65),r.strokeStyle="rgba(255, 255, 255, 1.0)",r.lineWidth=4,r.stroke();const f=r.createRadialGradient(o.width/2,o.height/2,o.width*.2,o.width/2,o.height/2,o.width*.7);f.addColorStop(0,"rgba(255, 255, 255, 0.3)"),f.addColorStop(.5,"rgba(255, 255, 255, 0.1)"),f.addColorStop(1,"rgba(255, 255, 255, 0)"),r.globalCompositeOperation="lighter",r.fillStyle=f,r.fillRect(0,0,o.width,o.height);const m=new w.Texture(o);return m.needsUpdate=!0,m}const Oo=window.innerWidth<640&&window._mobileShaderScale>1?1/window._mobileShaderScale:1,R=new w.ShaderMaterial({uniforms:{baseSize:{value:6},opacity:{value:0},map:{value:to},brightness:{value:1.4},haloStrength:{value:1.4},haloSize:{value:1.3},aspectCompensation:{value:Oo}},vertexShader:`
      attribute vec3 color;
      attribute float size;
      uniform float baseSize;
      uniform float haloSize;
      
      varying vec3 vColor;
      varying float vSize;
      
      void main() {
        vColor = color;
        vSize = size;
        
        // Calculate position in clip space
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        
        // Apply individual size attribute without attenuation
        // Multiply by haloSize to make room for the glow effect
        gl_PointSize = size * baseSize * haloSize;
      }
    `,fragmentShader:`
      uniform sampler2D map;
      uniform float opacity;
      uniform float brightness;
      uniform float haloStrength;
      uniform float aspectCompensation; // 1.0 = no compensation, < 1.0 = squish X to counteract CSS stretch
      
      varying vec3 vColor;
      varying float vSize;
      
      void main() {
        // Compensate for CSS scaleX stretch by squishing UV coordinates in X
        // When CSS applies scaleX(1.5), we need to use aspectCompensation = 0.667
        // This makes the particle appear circular despite the stretched canvas
        vec2 compensatedUV = gl_PointCoord - 0.5;
        compensatedUV.x *= (1.0 / aspectCompensation); // Stretch X in UV space to counteract CSS squish
        
        // Calculate distance from center using compensated coordinates
        float dist = length(compensatedUV) * 2.0; // 0 at center, 1 at edge
        
        // Sample the texture with compensated UVs
        vec2 texUV = compensatedUV + 0.5;
        vec4 texColor = texture2D(map, texUV);
        
        // Discard pixels outside the circular area (important for stretched particles)
        if (dist > 1.0) discard;
        
        // Apply color, opacity and brightness
        vec3 brightColor = vColor * brightness;
        
        // Create a halo effect by boosting brightness near the center
        // and adding a subtle color shift toward white for the halo
        float haloFactor = max(0.0, 1.0 - dist);
        haloFactor = pow(haloFactor, 1.5); // Adjust power for halo shape
        
        // Boost the core brightness
        float coreBrightness = 1.0 + haloFactor * haloStrength;
        
        // Blend toward white for the halo (subtle color shift)
        vec3 haloColor = mix(brightColor, vec3(1.0, 1.0, 1.0), haloFactor * 0.3);
        
        // Apply the halo effect
        vec3 finalColor = haloColor * coreBrightness;
        
        // Apply color and opacity with enhanced brightness and halo
        gl_FragColor = vec4(finalColor, texColor.a * opacity);
        
        // Discard transparent pixels
        if (gl_FragColor.a < 0.05) discard;
      }
    `,transparent:!0,blending:w.AdditiveBlending,depthWrite:!1,depthTest:!1}),yt=new w.Points(W,R);yt.frustumCulled=!0,Gt.add(yt);function oo(){const o=window.innerWidth,r=window._mobileShaderScale||1;if(o<640&&r>1){const f=1/r;yt.scale.set(f,1,1),R.uniforms.aspectCompensation.value=f,console.log(`%c[Particles] Applied compensation: scale=${f.toFixed(4)}, shader=${f.toFixed(4)}`,"color: cyan")}else yt.scale.set(1,1,1),R.uniforms.aspectCompensation.value=1}oo();const ee=b.addFolder("Particle System"),Fi={count:Y};ee.add(Fi,"count",100,1e3,10).name("Particle Count").onChange(o=>{Y=Math.floor(o);const r=new Float32Array(Y*3),l=new Float32Array(Y*3),f=new Float32Array(Y*3);for(let m=0;m<Y;m++){const u=m*3;if(m<be.length/3)r[u]=be[u],r[u+1]=be[u+1],r[u+2]=be[u+2],l[u]=pe[u],l[u+1]=pe[u+1],l[u+2]=pe[u+2],f[u]=Q[u],f[u+1]=Q[u+1],f[u+2]=Q[u+2];else{r[u]=(Math.random()-.5)*we,r[u+1]=(Math.random()-.5)*me+x.verticalOffset,r[u+2]=Math.random()*500-250,l[u]=(Math.random()-.5)*.5,l[u+1]=(Math.random()-.5)*.5,l[u+2]=(Math.random()-.5)*.2;const C=new w.Color(bt.color);f[u]=C.r,f[u+1]=C.g,f[u+2]=C.b}}be=r,pe=l,Q=f,W.attributes.position&&(W.attributes.position.array=null),W.attributes.color&&(W.attributes.color.array=null),W.setAttribute("position",new w.BufferAttribute(be,3)),W.setAttribute("color",new w.BufferAttribute(Q,3)),W.attributes.position.needsUpdate=!0,W.attributes.color.needsUpdate=!0,Xe()});const bt={color:"#25e5ff"};ee.addColor(bt,"color").name("Particle Color").onChange(o=>{const r=new w.Color(o);for(let l=0;l<Y;l++){const f=l*3;Q[f]=r.r,Q[f+1]=r.g,Q[f+2]=r.b}W.attributes.color?(W.attributes.color.array.set(Q),W.attributes.color.needsUpdate=!0):W.setAttribute("color",new w.BufferAttribute(Q,3))}),ee.add(R.uniforms.baseSize,"value",2,15,.5).name("Base Particle Size").onChange(o=>{Xe()}),ee.add(R.uniforms.opacity,"value",0,1,.1).name("Opacity"),ee.add(R.uniforms.brightness,"value",1,3,.1).name("Brightness").onChange(o=>{R.uniforms.brightness.value=o});const Oi={intensity:1.5};ee.add(Oi,"intensity",.1,3,.1).name("Sparkle Intensity").onChange(o=>{R.uniforms.opacity.value=o});const Ti={enabled:!1},Di=ee.add(Ti,"enabled").name("Size Attenuation").onChange(o=>{o?R.vertexShader=`
          attribute vec3 color;
          attribute float size;
          uniform float baseSize;
          
          varying vec3 vColor;
          
          void main() {
            vColor = color;
            
            // Calculate position in clip space
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            
            // Apply size attenuation based on distance
            float distance = length(mvPosition.xyz);
            gl_PointSize = size * baseSize * (300.0 / distance);
          }
        `:R.vertexShader=`
          attribute vec3 color;
          attribute float size;
          uniform float baseSize;
          
          varying vec3 vColor;
          
          void main() {
            vColor = color;
            
            // Calculate position in clip space
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            
            // Apply individual size attribute without attenuation
            gl_PointSize = size * baseSize;
          }
        `,R.needsUpdate=!0,Xe()}),ae=document.createElement("div");ae.className="gui-tooltip",ae.textContent="When enabled, particles appear smaller as they move further away",ae.style.position="absolute",ae.style.backgroundColor="rgba(0,0,0,0.8)",ae.style.color="#fff",ae.style.padding="5px",ae.style.borderRadius="3px",ae.style.fontSize="11px",ae.style.zIndex="10000",ae.style.display="none",document.body.appendChild(ae);const io=Di.domElement;io.addEventListener("mouseenter",o=>{const r=io.getBoundingClientRect();ae.style.left=r.right+"px",ae.style.top=r.top+"px",ae.style.display="block"}),io.addEventListener("mouseleave",()=>{ae.style.display="none"});let To=0;window.addEventListener("scroll",()=>{Qt=window.scrollY});let ie=[],se={x:0,y:0},wt={x:0,y:0},Do=0,qe=0,De=!1,Ct=250,nt=10,St=new Float32Array(nt),ge=0,ze=0,Pe,ke=!1,Fe=[];const S={enabled:!1,mobileDisabled:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768||window.matchMedia&&window.matchMedia("(hover: none)").matches||"ontouchstart"in window||!n.mouseParticles,spawnRate:t==="high"?.52:t==="medium"?.35:0,maxParticles:t==="high"?150:t==="medium"?75:0,baseSize:1.9,fadeInSpeed:.62,fadeOutSpeed:.88,trailLength:5e-4,speedVariation:.2,jitterAmount:.08,spawnOffsetMin:.08,spawnOffsetMax:.8,minLifetime:1.5,maxLifetime:3.5,drawnLife:12};Pe=S.spawnOffsetMin,window.enableMouseParticles=function(){S.mobileDisabled||(S.enabled=!0)};const G=new w.BufferGeometry;ft.track(G,"geometry");const xt=new w.ShaderMaterial({uniforms:{baseSize:{value:S.baseSize},map:{value:to},brightness:{value:1.4},haloStrength:{value:1.4},haloSize:{value:1.3},aspectCompensation:{value:Oo}},vertexShader:`
      attribute vec3 color;
      attribute float size;
      attribute float opacity;
      uniform float baseSize;
      uniform float haloSize;
      
      varying vec3 vColor;
      varying float vOpacity;
      varying float vSize;
      
      void main() {
        vColor = color;
        vOpacity = opacity;
        vSize = size;
        
        // Convert mouse coordinates to world coordinates
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        
        // Apply size with opacity influence for fading effect
        gl_PointSize = size * baseSize * haloSize;
      }
    `,fragmentShader:`
      uniform sampler2D map;
      uniform float brightness;
      uniform float haloStrength;
      uniform float aspectCompensation;
      
      varying vec3 vColor;
      varying float vOpacity;
      
      void main() {
        // Compensate for CSS scaleX stretch by adjusting UV coordinates
        vec2 compensatedUV = gl_PointCoord - 0.5;
        compensatedUV.x *= (1.0 / aspectCompensation);
        
        // Calculate distance using compensated coordinates
        float dist = length(compensatedUV) * 2.0;
        
        // Sample the texture with compensated UVs
        vec2 texUV = compensatedUV + 0.5;
        vec4 texColor = texture2D(map, texUV);
        
        // Discard pixels outside the circular area
        if (dist > 1.0) discard;
        
        // Apply color and brightness
        vec3 brightColor = vColor * brightness;
        
        // Create halo effect
        float haloFactor = max(0.0, 1.0 - dist);
        haloFactor = pow(haloFactor, 1.5);
        
        // Boost core brightness
        float coreBrightness = 1.0 + haloFactor * haloStrength;
        
        // Blend toward white for halo
        vec3 haloColor = mix(brightColor, vec3(1.0, 1.0, 1.0), haloFactor * 0.3);
        
        // Apply the halo effect
        vec3 finalColor = haloColor * coreBrightness;
        
        // Apply opacity and texture alpha
        float finalOpacity = texColor.a * vOpacity;
        gl_FragColor = vec4(finalColor, finalOpacity);
        
        // Discard transparent pixels
        if (gl_FragColor.a < 0.01) discard;
      }
    `,transparent:!0,blending:w.AdditiveBlending,depthWrite:!1,depthTest:!1}),no=new w.Points(G,xt);Gt.add(no);function ao(){const o=window.innerWidth,r=window._mobileShaderScale||1;if(o<640&&r>1){const f=1/r;no.scale.set(f,1,1),xt.uniforms.aspectCompensation.value=f}else no.scale.set(1,1,1),xt.uniforms.aspectCompensation.value=1}ao();function at(o,r){const l=o/window.innerWidth*2-1,f=-(r/window.innerHeight)*2+1,m=l*(P.right-P.left)/2/P.zoom,u=f*(P.top-P.bottom)/2/P.zoom;return{x:m,y:u}}function zo(o,r){return{id:Do++,position:{x:o,y:r,z:Math.random()*100-50},targetPosition:{x:o,y:r},velocity:{x:0,y:0},size:.8+Math.random()*.4,opacity:0,targetOpacity:1,life:0,maxLife:S.minLifetime+Math.random()*(S.maxLifetime-S.minLifetime),color:{r:.145,g:.898,b:1},trailSpeed:.05+Math.random()*.03,fadePhase:"in"}}function Bo(o,r){return{id:Do++,position:{x:o,y:r,z:Math.random()*100-50},originalPosition:{x:o,y:r},targetPosition:{x:o,y:r},velocity:{x:0,y:0},size:.8+Math.random()*.4,opacity:0,baseOpacity:0,targetOpacity:1,life:0,maxLife:S.drawnLife,color:{r:1,g:.647,b:0},trailSpeed:0,fadePhase:"in",isDrawn:!0,twinklePhase:Math.random()*Math.PI*2,twinkleSpeed:.8+Math.random()*.4,twinkleRadius:2+Math.random()*3}}let Mt=0;function At(){const o=[...ie,...Fe],r=o.length;if(r===0){if(Mt===0)return;G.deleteAttribute("position"),G.deleteAttribute("color"),G.deleteAttribute("size"),G.deleteAttribute("opacity"),Mt=0;return}const l=new Float32Array(r*3),f=new Float32Array(r*3),m=new Float32Array(r),u=new Float32Array(r);for(let y=0;y<r;y++){const k=o[y],F=y*3;l[F]=k.position.x,l[F+1]=k.position.y,l[F+2]=k.position.z,f[F]=k.color.r,f[F+1]=k.color.g,f[F+2]=k.color.b,m[y]=k.size,u[y]=k.opacity}r!==Mt?(G.attributes.position&&(G.deleteAttribute("position"),G.deleteAttribute("color"),G.deleteAttribute("size"),G.deleteAttribute("opacity")),G.setAttribute("position",new w.BufferAttribute(l,3)),G.setAttribute("color",new w.BufferAttribute(f,3)),G.setAttribute("size",new w.BufferAttribute(m,1)),G.setAttribute("opacity",new w.BufferAttribute(u,1)),Mt=r):(G.attributes.position.array.set(l),G.attributes.color.array.set(f),G.attributes.size.array.set(m),G.attributes.opacity.array.set(u),G.attributes.position.needsUpdate=!0,G.attributes.color.needsUpdate=!0,G.attributes.size.needsUpdate=!0,G.attributes.opacity.needsUpdate=!0)}window.addEventListener("mousemove",o=>{if(!S.enabled||S.mobileDisabled)return;wt.x=se.x,wt.y=se.y,se.x=o.clientX,se.y=o.clientY;const r=se.x-wt.x,l=se.y-wt.y,f=Math.sqrt(r*r+l*l);if(De||(qe+=f,qe>=Ct&&(De=!0)),St[ze]=f,ze=(ze+1)%nt,ge<nt&&ge++,ge>0){let m=0;for(let k=0;k<ge;k++)m+=St[k];const u=m/ge,y=Math.min(u/20,1);Pe=S.spawnOffsetMin+(S.spawnOffsetMax-S.spawnOffsetMin)*y}if(De&&f>1&&ie.length<S.maxParticles&&Math.random()<S.spawnRate){const m=at(se.x,se.y),u=Pe*50,C=Math.random()*Math.PI*2,y=Math.cos(C)*u*Math.random(),k=Math.sin(C)*u*Math.random(),F=zo(m.x+y,m.y+k);ie.push(F)}if(ke&&ie.length<S.maxParticles&&Math.random()<.8){const m=at(se.x,se.y),u=10,C=Math.random()*Math.PI*2,y=Math.cos(C)*u*Math.random(),k=Math.sin(C)*u*Math.random(),F=Bo(m.x+y,m.y+k);Fe.push(F)}}),window.addEventListener("mousedown",o=>{!S.enabled||S.mobileDisabled||o.button===0&&(ke=!0)}),window.addEventListener("mouseup",o=>{o.button===0&&(ke=!1)});let Ke={x:0,y:0},ne={x:0,y:0},Et=!1;window.addEventListener("touchstart",o=>{if(!S.enabled||S.mobileDisabled)return;const r=o.target;r.tagName==="BUTTON"||r.tagName==="A"||r.closest("button")||r.closest("a")||r.closest("header")||r.closest("nav")||o.preventDefault();const f=o.touches[0];ne.x=f.clientX,ne.y=f.clientY,Ke.x=ne.x,Ke.y=ne.y,Et=!0,ke=!0},{passive:!1}),window.addEventListener("touchmove",o=>{if(!S.enabled||S.mobileDisabled||!Et)return;const r=o.target;r.tagName==="BUTTON"||r.tagName==="A"||r.closest("button")||r.closest("a")||r.closest("header")||r.closest("nav")||o.preventDefault();const f=o.touches[0];Ke.x=ne.x,Ke.y=ne.y,ne.x=f.clientX,ne.y=f.clientY,se.x=ne.x,se.y=ne.y;const m=ne.x-Ke.x,u=ne.y-Ke.y,C=Math.sqrt(m*m+u*u);if(De||(qe+=C,qe>=Ct&&(De=!0)),St[ze]=C,ze=(ze+1)%nt,ge<nt&&ge++,ge>0){let y=0;for(let he=0;he<ge;he++)y+=St[he];const k=y/ge,ue=Math.min(k/20,1);Pe=S.spawnOffsetMin+(S.spawnOffsetMax-S.spawnOffsetMin)*ue}if(De&&C>1&&ie.length<S.maxParticles&&Math.random()<S.spawnRate){const y=at(ne.x,ne.y),k=Pe*50,F=Math.random()*Math.PI*2,ue=Math.cos(F)*k*Math.random(),he=Math.sin(F)*k*Math.random(),st=zo(y.x+ue,y.y+he);ie.push(st)}if(ke&&ie.length<S.maxParticles&&Math.random()<.8){const y=at(ne.x,ne.y),k=10,F=Math.random()*Math.PI*2,ue=Math.cos(F)*k*Math.random(),he=Math.sin(F)*k*Math.random(),st=Bo(y.x+ue,y.y+he);Fe.push(st)}},{passive:!1}),window.addEventListener("touchend",o=>{Et=!1,ke=!1}),window.addEventListener("touchcancel",o=>{Et=!1,ke=!1});function zi(){if(ie.length===0&&Fe.length===0||S.mobileDisabled)return;const o=at(se.x,se.y);for(let r=ie.length-1;r>=0;r--){const l=ie[r];if(l.life+=.016,!l.isDrawn){l.targetPosition.x=o.x,l.targetPosition.y=o.y;const m=l.trailSpeed*S.trailLength;l.position.x+=(l.targetPosition.x-l.position.x)*m,l.position.y+=(l.targetPosition.y-l.position.y)*m,l.position.x+=(Math.random()-.5)*2*S.jitterAmount,l.position.y+=(Math.random()-.5)*2*S.jitterAmount}const f=l.life/l.maxLife;if(f<.15){l.fadePhase="in";const m=f/.15,u=1-Math.pow(1-m,2);l.opacity=u*S.fadeInSpeed}else if(f<.65)l.fadePhase="hold",l.opacity=S.fadeInSpeed;else{l.fadePhase="out";const m=(f-.65)/.35,u=Math.pow(1-m,2);l.opacity=u*S.fadeInSpeed*S.fadeOutSpeed}(l.life>=l.maxLife||l.opacity<=0)&&ie.splice(r,1)}for(let r=Fe.length-1;r>=0;r--){const l=Fe[r];l.life+=.016,l.twinklePhase+=.016*l.twinkleSpeed;const f=Math.sin(l.twinklePhase)*l.twinkleRadius*.4,m=Math.cos(l.twinklePhase*1.05)*l.twinkleRadius*.4;l.position.x=l.originalPosition.x+f,l.position.y=l.originalPosition.y+m;const u=l.life/l.maxLife;if(u<.15){l.fadePhase="in";const y=u/.15,k=1-Math.pow(1-y,2);l.baseOpacity=k*S.fadeInSpeed}else if(u<.85)l.fadePhase="hold",l.baseOpacity=S.fadeInSpeed;else{l.fadePhase="out";const y=(u-.85)/.15,k=Math.pow(1-y,2);l.baseOpacity=k*S.fadeInSpeed*S.fadeOutSpeed}const C=.7+.3*Math.sin(l.twinklePhase*2);l.opacity=l.baseOpacity*C,(l.life>=l.maxLife||l.opacity<=0)&&Fe.splice(r,1)}At(),Lo.currentOffset=Pe}const te=b.addFolder("Mouse Follow Particles");te.add({mobileDetected:S.mobileDisabled},"mobileDetected").name("Mobile Detected (Disabled)").listen(),te.add(S,"enabled").name("Enable Mouse Particles").onChange(o=>{o||(ie=[],Fe=[],At(),De=!1,qe=0,ge=0,ze=0,Pe=S.spawnOffsetMin,ke=!1)}),te.add(S,"spawnRate",.1,1,.1).name("Spawn Rate").onChange(o=>{S.spawnRate=o}),te.add(S,"maxParticles",10,50,1).name("Max Particles").onChange(o=>{for(S.maxParticles=o;ie.length>o;)ie.pop();At()}),te.add(S,"baseSize",2,10,.5).name("Particle Size").onChange(o=>{xt.uniforms.baseSize.value=o}),te.add(S,"trailLength",.1,1,.1).name("Trail Length").onChange(o=>{S.trailLength=o}),te.add(S,"speedVariation",0,1,.1).name("Speed Variation").onChange(o=>{S.speedVariation=o}),te.add(S,"jitterAmount",0,1,.05).name("Jitter Amount").onChange(o=>{S.jitterAmount=o}),te.add(S,"spawnOffsetMin",0,1,.05).name("Spawn Offset Min").onChange(o=>{S.spawnOffsetMin=o}),te.add(S,"spawnOffsetMax",0,1,.05).name("Spawn Offset Max").onChange(o=>{S.spawnOffsetMax=o});const Lo={currentOffset:Pe};te.add(Lo,"currentOffset",0,1).name("Current Offset (Dynamic)").listen(),te.add(S,"fadeInSpeed",.1,1,.01).name("Max Opacity").onChange(o=>{S.fadeInSpeed=o}),te.add(S,"fadeOutSpeed",.1,1,.01).name("Fade Strength").onChange(o=>{S.fadeOutSpeed=o}),te.add(S,"drawnLife",1,10,.1).name("Drawn Particle Life").onChange(o=>{S.drawnLife=o}),te.add({movementThreshold:Ct},"movementThreshold",100,400,10).name("Initial Movement Needed").onChange(o=>{Ct=o}),te.add({resetActivation:function(){De=!1,qe=0,ge=0,ze=0,Pe=S.spawnOffsetMin,ie=[],Fe=[],ke=!1,At()}},"resetActivation").name("Reset Activation"),te.close();function Bi(){const o=W.attributes.position.array,r=x.previousOffset||0,l=x.verticalOffset-r;x.previousOffset=x.verticalOffset;for(let f=0;f<Y;f++){const m=f*3;o[m+1]+=l;const u=o[m+1]-x.verticalOffset,C=me/2;u>C?o[m+1]=-C+x.verticalOffset:u<-C&&(o[m+1]=C+x.verticalOffset)}W.attributes.position.needsUpdate=!0}const Pt=new w.Color;let Ro=1e3/(le.isMobile()?20:40),Io=0,ro=0;const Li=2;function Wo(){requestAnimationFrame(Wo);const o=performance.now(),r=o-Io;if(r<Ro||document.hidden||window.backgroundPaused)return;Io=o-r%Ro;const l=W.attributes.position.array,f=W.attributes.color.array,m=W.attributes.size?W.attributes.size.array:null;To+=.01;const u=(Qt-eo)*x.scrollSpeed;if(eo=Qt*(1-x.damping)+eo*x.damping,!window.particlesMovementPaused){for(let C=0;C<Y;C++){const y=C*3,k=m?(m[C]-x.sizeMin)/(x.sizeMax-x.sizeMin):.5,F=x.floatSpeed*(.5+k*.5);l[y]+=pe[y]*F,l[y+1]+=pe[y+1]*F,l[y+2]+=pe[y+2]*F,l[y+1]+=u*(.5+k*.5),Math.abs(l[y])>we/2&&(pe[y]*=-1);const ue=l[y+1]-x.verticalOffset,he=me/2;ue>he?l[y+1]=-he+x.verticalOffset:ue<-he&&(l[y+1]=he+x.verticalOffset),Math.abs(l[y+2])>250&&(pe[y+2]*=-1)}W.attributes.position.needsUpdate=!0}if(ro++,ro>=Li){ro=0,Pt.set(bt.color);for(let C=0;C<Y;C++){const y=C*3,k=m?(m[C]-x.sizeMin)/(x.sizeMax-x.sizeMin):.5,F=.2*Math.sin(To+C*.1)+.9,ue=.8+k*.6;f[y]=Pt.r*F*ue,f[y+1]=Pt.g*F*ue,f[y+2]=Pt.b*F*ue}W.attributes.color.needsUpdate=!0}}Wo();const Ri=le.isMobile();let Ho=!1;function Ii(o){if(window.backgroundPaused)return;const r=Ri?5e-4:.001;if(s.time.value+=r,v&&Date.now()-a>d){const f=s.time.value+s.colorCycleOffset.value;s.colorCycleOffset.value=f,s.time.value=0,a=Date.now()}if(zi(),!window.particlesFullyHidden&&R.uniforms.opacity.value<Ge&&(R.uniforms.opacity.value+=.001,R.uniforms.opacity.value>Ge&&(R.uniforms.opacity.value=Ge)),window.particlesFullyHidden&&R.uniforms.opacity.value>0&&(R.uniforms.opacity.value=0),_&&T.autoRotate&&!T.rotationPaused){const l=T.baseRotateSpeed;_.rotation.y+=l*.01}if(D&&(D.rotation.set(0,0,0),et()),ce.autoClear=!0,ce.render(Ne,P),!Ho){Ho=!0;const l=document.querySelector("#cover-area-overlay");if(window.gsap){const f=l?[g,l]:g;window.gsap.to(f,{opacity:1,duration:.8,ease:"power2.out"})}else g.style.opacity="1",l&&(l.style.opacity="1")}(!window.particlesFullyHidden||ie.length>0&&S.enabled)&&(ce.autoClear=!1,ce.render(Gt,P))}const kt=new gn;window.shaderBackgroundPerfMonitor=kt,new URLSearchParams(window.location.search).has("debugPerf")&&(kt.createDebugOverlay(),A.log("[Background Init] Full performance monitoring enabled")),kt.setWarningCallback(o=>{A.warn("[Performance Warning]",o)});const Ce=new mn(o=>{Ii(),kt.update(ce)},n.targetFPS);Ce.start(),window.shaderBackgroundRenderer=Ce,Object.defineProperty(window,"backgroundPaused",{get(){return this._backgroundPaused||!1},set(o){this._backgroundPaused=o,Ce&&Ce.setPausedByTimeline(o)}}),window.addEventListener("timeline:backgroundPaused",o=>{s&&s.filmGrainEnabled&&(s.filmGrainEnabled.value=!o.detail.paused)}),document.addEventListener("veryEarlyParticleFade",()=>{Ge=.3,R&&R.uniforms&&R.uniforms.opacity&&R.uniforms.opacity.value<.1&&(R.uniforms.opacity.value=.05)}),document.addEventListener("particleFadeStart",()=>{Ge=.3}),document.addEventListener("heroAnimationComplete",()=>{Ge=.5});function Ft(){if(D){const o=window.innerHeight,r=P.right-P.left,f=(P.top-P.bottom)/o,m=r,u=o*.66*f;D.geometry.dispose(),D.geometry=new w.PlaneGeometry(m,u),D.rotation.set(0,0,0),et()}}let Ot,Se;const so=1.5;function rt(){const o=window.innerWidth,r=J();g.style.width=`${o}px`,g.style.height=`${r}px`;const l=o<640,f=window._mobileShaderScale&&window._mobileShaderScale>1,m=window._isSafariBrowser;if(l&&!f&&!m?(g.style.transform=`translateZ(0) scaleX(${so})`,g.style.transformOrigin="center center",window._mobileShaderScale=so,A.log(`[Background Resize] Mobile shader widening enabled: ${so}x width`),jt(),oo(),ao()):!l&&f&&(g.style.transform="translateZ(0)",window._mobileShaderScale=1,A.log("[Background Resize] Mobile shader widening disabled"),jt(),oo(),ao()),ce.setSize(o,r),P.left=-o/2,P.right=o/2,P.top=r/2,P.bottom=-r/2,P.updateProjectionMatrix(),s.resolution.value.set(o,r),tt.geometry.dispose(),tt.geometry=new w.PlaneGeometry(o,r,32,18),me=r*x.verticalSpread,we=o*x.horizontalSpread,typeof b<"u"&&b&&b.__folders["Particle System"]){const u=b.__folders["Particle System"];if(u&&u.__controllers){for(let C=0;C<u.__controllers.length;C++)if(u.__controllers[C].property==="verticalOffset"){u.__controllers[C].min(-r*3),u.__controllers[C].max(r*2);break}}}if(_&&T.responsive){clearTimeout(Se),Se=setTimeout(()=>{Te()},150);for(let u=0;u<ve.__controllers.length;u++){const C=ve.__controllers[u];C.property==="positionX"?(C.min(-o/2),C.max(o/2)):C.property==="positionY"&&(C.min(-r/2),C.max(r/2))}}Ft()}window.addEventListener("resize",()=>{clearTimeout(Ot),clearTimeout(Se),_&&T.responsive&&(Se=setTimeout(()=>{Te()},150)),Ot=setTimeout(rt,150)}),window.addEventListener("orientationchange",()=>{clearTimeout(Ot),clearTimeout(Se),_&&T.responsive&&(Se=setTimeout(()=>{Te()},300)),Ot=setTimeout(rt,300)}),document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"){clearTimeout(Se);const o=window.innerWidth,r=J();window.lastKnownDimensions||(window.lastKnownDimensions={width:o,height:r});const l=Math.abs(o-window.lastKnownDimensions.width)/window.lastKnownDimensions.width,f=Math.abs(r-window.lastKnownDimensions.height)/window.lastKnownDimensions.height;(l>.05||f>.05)&&(window.lastKnownDimensions.width=o,window.lastKnownDimensions.height=r,_&&T.responsive&&(Se=setTimeout(()=>{Te()},150)),setTimeout(rt,100))}else window.lastKnownDimensions={width:window.innerWidth,height:J()}});let Vo=J();function Uo(){const o=J();Math.abs(o-Vo)>50&&(rt(),Vo=o),requestAnimationFrame(Uo)}Uo(),window.addEventListener("keydown",o=>{if((o.key==="+"||o.key==="=")&&(Ae.zoom=Math.min(Ae.zoom+.1,5),P.zoom=Ae.zoom,P.updateProjectionMatrix(),typeof b<"u"&&b&&b.__folders["Camera Controls"])){const r=b.__folders["Camera Controls"];if(r&&r.__controllers){for(let l=0;l<r.__controllers.length;l++)if(r.__controllers[l].property==="zoom"){r.__controllers[l].updateDisplay();break}}}if((o.key==="-"||o.key==="_")&&(Ae.zoom=Math.max(Ae.zoom-.1,.1),P.zoom=Ae.zoom,P.updateProjectionMatrix(),typeof b<"u"&&b&&b.__folders["Camera Controls"])){const r=b.__folders["Camera Controls"];if(r&&r.__controllers){for(let l=0;l<r.__controllers.length;l++)if(r.__controllers[l].property==="zoom"){r.__controllers[l].updateDisplay();break}}}}),ee.add(x,"scrollSpeed",.001,.05,.018).name("Scroll Sensitivity").step(.001).onChange(o=>{x.scrollSpeed=o}),ee.add(x,"damping",.8,.99,.01).name("Scroll Damping").onChange(o=>{x.damping=o}),ee.add(x,"verticalSpread",1,5,.5).name("Vertical Spread").onChange(o=>{const r=me;me=window.innerHeight*o;const l=me/r,f=W.attributes.position.array;for(let m=0;m<Y;m++){const u=m*3,y=(f[u+1]-x.verticalOffset)*l;f[u+1]=y+x.verticalOffset,Math.abs(y)>me/2&&(f[u+1]=(Math.random()-.5)*me+x.verticalOffset)}W.attributes.position.needsUpdate=!0}),ee.add(x,"horizontalSpread",.02,5,.01).name("Horizontal Spread").onChange(o=>{const r=we;we=window.innerWidth*o;const l=we/r,f=W.attributes.position.array;for(let m=0;m<Y;m++){const u=m*3,y=f[u]*l;f[u]=y,Math.abs(y)>we/2&&(f[u]=(Math.random()-.5)*we)}W.attributes.position.needsUpdate=!0}),ee.add(x,"verticalOffset",-window.innerHeight*3,window.innerHeight*2,10).name("Vertical Position").onChange(o=>{x.previousOffset===void 0&&(x.previousOffset=0),x.verticalOffset=o,Bi()}),ee.add(x,"sizeMin",1,5,.01).name("Min Particle Size").onChange(o=>{if(x.sizeMin=o,x.sizeMin>=x.sizeMax&&(x.sizeMax=x.sizeMin+1,typeof b<"u"&&b&&b.__folders["Particle System"])){const r=b.__folders["Particle System"];if(r&&r.__controllers){for(let l=0;l<r.__controllers.length;l++)if(r.__controllers[l].property==="sizeMax"){r.__controllers[l].updateDisplay();break}}}Xe()}),ee.add(x,"sizeMax",5,10,.01).name("Max Particle Size").onChange(o=>{if(x.sizeMax=o,x.sizeMax<=x.sizeMin&&(x.sizeMin=x.sizeMax-1,typeof b<"u"&&b&&b.__folders["Particle System"])){const r=b.__folders["Particle System"];if(r&&r.__controllers){for(let l=0;l<r.__controllers.length;l++)if(r.__controllers[l].property==="sizeMin"){r.__controllers[l].updateDisplay();break}}}Xe()}),ee.add(x,"floatSpeed",.1,3,.1).name("Float Speed").onChange(o=>{x.floatSpeed=o}),Xe();const Wi=W.attributes.position.array;for(let o=0;o<Y;o++){const r=o*3;Wi[r+1]=(Math.random()-.5)*me+x.verticalOffset}W.attributes.position.needsUpdate=!0,ee.add(R.uniforms.haloStrength,"value",0,2,.1).name("Halo Intensity").onChange(o=>{R.uniforms.haloStrength.value=o}),ee.add(R.uniforms.haloSize,"value",1,2,.1).name("Halo Size").onChange(o=>{R.uniforms.haloSize.value=o});let lo;window.addEventListener("scroll",()=>{lo&&clearTimeout(lo),lo=setTimeout(()=>{},150)})}function po(){const i=window.gui,e=window.uniforms;if(typeof i>"u"||!i||!i.__folders||!i.__folders["Lighting Controls"])return;const t=i.__folders["Lighting Controls"];for(let n=0;n<t.__controllers.length;n++){const a=t.__controllers[n];a.property==="value"&&a.object===e.ambientLight&&a.setValue(e.ambientLight.value),a.property==="value"&&a.object===e.directionalLight&&a.setValue(e.directionalLight.value)}}function mo(){const i=window.gui,e=window.uniforms;if(i.__folders["Animation Speed Controls"]){const t=i.__folders["Animation Speed Controls"];for(let n=0;n<t.__controllers.length;n++){const a=t.__controllers[n];if(a.property==="value"&&a.object===e.waveSpeed){a.setValue(e.waveSpeed.value);break}}}if(i.__folders["Wave Controls"]){const t=i.__folders["Wave Controls"];for(let n=0;n<t.__controllers.length;n++){const a=t.__controllers[n];a.property==="value"&&a.object===e.waveAmplitude&&a.setValue(e.waveAmplitude.value),a.property==="value"&&a.object===e.waveFrequency&&a.setValue(e.waveFrequency.value)}}}export{wn as initShaderBackground};
