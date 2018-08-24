!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.SPie=e()}(this,function(){"use strict";var t=function(){function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}}(),c=function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var n=[],i=!0,r=!1,o=void 0;try{for(var s,a=t[Symbol.iterator]();!(i=(s=a.next()).done)&&(n.push(s.value),!e||n.length!==e);i=!0);}catch(t){r=!0,o=t}finally{try{!i&&a.return&&a.return()}finally{if(r)throw o}}return n}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")},u=50;return function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.el=t,this.id=this.random,this.max=0,this.highest=0,this.min=800,this.lowest=799.9}return t(e,[{key:"setOption",value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};this.option=this.defaultOption,this._extend(t,this.option),this._pretreatRadius()._processRadius(),this._processStartPoint();var e=this._getTemplate(this.option);return this.el.innerHTML=e,this}},{key:"getOption",value:function(){return this.option}},{key:"setData",value:function(t){var e=this,n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0;t=this._percent2number(t),setTimeout(function(){return e._setPercent(t)},1e3*n)}},{key:"_extend",value:function(e,n){var i=this;Object.keys(e).forEach(function(t){"Object"===i._typeOf(e[t])?i._extend(e[t],n[t]):n[t]=e[t]})}},{key:"_typeOf",value:function(t){return Object.prototype.toString.call(t).slice(8,-1)}},{key:"_getTemplate",value:function(t){var e=t.sw,n=t.bgc,i=t.color,r=t.r,o=t.rotateDeg,s=t.clockwise,a=t.animation;this._checkRepeat();var c=50*e;return'\n            <div class="svg-pie">\n                <svg viewBox="0 0 100 100" transtion="salce()" class="svg-pie-circle">\n                    <defs>\n                        <filter\n                            id="shadow-'+this.id+'"\n                            x="-1"\n                            y="-1"\n                            width="300%"\n                            height="300%">\n                            <feDropShadow\n                                dx="0" dy="0"\n                                stdDeviation="4"\n                                flood-color="'+i+'"\n                                flood-opacity="0.3"/>\n                        </filter>\n                    </defs>\n                    <circle\n                        id="circle-'+this.id+'"\n                        cx="'+u+'"\n                        cy="'+u+'"\n                        r="'+r*u+'"\n                        stroke="'+n+'"\n                        stroke-width="'+(c+.5)+'"\n                        fill="none"\n                    />\n                    <circle\n                        id="arc-'+this.id+'"\n                        cx="'+u+'"\n                        cy="'+u+'"\n                        r="'+r*u+'"\n                        stroke="'+i+'"\n                        stroke-width="'+c+'"\n                        stroke-linecap="round"\n                        stroke-dasharray="800"\n                        style="stroke-dashoffset:'+this.min+";\n                        transform-origin:50% 50% 0;\n                        transform:rotate("+o+"deg)\n                        "+(s?"":"scaleY(-1)")+";\n                        "+(a.show?"transition:all "+a.duration+"s "+a.easing:"none")+'"\n                        fill="none"\n                        filter="url(#shadow-'+this.id+')"\n                    />\n                </svg>\n            </div>'}},{key:"_checkRepeat",value:function(){document.getElementById("circle-"+this.id)&&(this.id=this.random,this._checkRepeat())}},{key:"_percent2number",value:function(t){return"string"==typeof t&&(t=+t.slice(0,-1)/100),t}},{key:"_pretreatRadius",value:function(){var e=this,t=this.option.radius;return this.option.radius=t.map(function(t){return e._percent2number(t)}),this}},{key:"_processRadius",value:function(){var t=c(this.option.radius,2),e=t[0],n=t[1];n=n||e;var i=Math.abs(e-n)||this.option.sw,r=e+n,o=r/2,s=r*Math.PI;this.max=800-s*u;var a=2*Math.asin(i/2/o)*o*u;this.highest=this.max+a,this.option.sw=i,this.option.r=o}},{key:"_processStartPoint",value:function(){var e=this.option.startingPoint;if("string"==typeof e)try{if("deg"===e.slice(-3).toLowerCase())e=+e.slice(0,-3);else if("rad"===e.slice(-3).toLowerCase()){e=+e.slice(0,-3)*(180/Math.PI)}}catch(t){e=0}this.option.rotateDeg=e-90}},{key:"_getRad",value:function(t){var e=0|+this.option.precision;if(!t)return this.min;if(e<=0)return 1<=t?this.max:this.lowest-t*(this.lowest-this.highest);var n=(5*Math.pow(.1,e)).toFixed(e);return t<n?this.min:1-n<=t?this.max:this.lowest-t*(this.lowest-this.highest)}},{key:"_setPercent",value:function(t){document.getElementById("arc-"+this.id).style.strokeDashoffset=this._getRad(t)}},{key:"defaultOption",get:function(){return{color:"#108cee",bgc:"#fff",radius:[.6,.8],precision:4,startingPoint:0,clockwise:!0,animation:{show:!0,duration:1,easing:"ease-in-out"},sw:.2}}},{key:"random",get:function(){return Math.random().toString(36).substr(2)}}],[{key:"init",value:function(t){return new e(t)}}]),e}()});
