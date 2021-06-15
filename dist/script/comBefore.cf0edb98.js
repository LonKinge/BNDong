(self.webpackChunkCnblogs_Theme_SimpleMemory=self.webpackChunkCnblogs_Theme_SimpleMemory||[]).push([[3304],{5307:function(t,i,e){"use strict";e.r(i),e.d(i,{default:function(){return b}});var s={};!function(){var t=s.util={},i=Array.prototype.concat,e=Array.prototype.slice;t.bind=function(t,s){var n=e.call(arguments,2);return function(){t.apply(s,i.call(n,e.call(arguments)))}},t.extend=function(t,i){for(var e in i)i.hasOwnProperty(e)&&(t[e]=i[e])};var n=s.SpringSystem=function(t){this._springRegistry={},this._activeSprings=[],this.listeners=[],this._idleSpringIndices=[],this.looper=t||new l,this.looper.springSystem=this};t.extend(n.prototype,{_springRegistry:null,_isIdle:!0,_lastTimeMillis:-1,_activeSprings:null,listeners:null,_idleSpringIndices:null,setLooper:function(t){this.looper=t,t.springSystem=this},createSpring:function(t,i){var e;return e=void 0===t||void 0===i?a.DEFAULT_ORIGAMI_SPRING_CONFIG:a.fromOrigamiTensionAndFriction(t,i),this.createSpringWithConfig(e)},createSpringWithBouncinessAndSpeed:function(t,i){var e;return e=void 0===t||void 0===i?a.DEFAULT_ORIGAMI_SPRING_CONFIG:a.fromBouncinessAndSpeed(t,i),this.createSpringWithConfig(e)},createSpringWithConfig:function(t){var i=new r(this);return this.registerSpring(i),i.setSpringConfig(t),i},getIsIdle:function(){return this._isIdle},getSpringById:function(t){return this._springRegistry[t]},getAllSprings:function(){var t=[];for(var i in this._springRegistry)this._springRegistry.hasOwnProperty(i)&&t.push(this._springRegistry[i]);return t},registerSpring:function(t){this._springRegistry[t.getId()]=t},deregisterSpring:function(t){p(this._activeSprings,t),delete this._springRegistry[t.getId()]},advance:function(t,i){for(;this._idleSpringIndices.length>0;)this._idleSpringIndices.pop();for(var e=0,s=this._activeSprings.length;e<s;e++){var n=this._activeSprings[e];n.systemShouldAdvance()?n.advance(t/1e3,i/1e3):this._idleSpringIndices.push(this._activeSprings.indexOf(n))}for(;this._idleSpringIndices.length>0;){var r=this._idleSpringIndices.pop();r>=0&&this._activeSprings.splice(r,1)}},loop:function(t){var i;-1===this._lastTimeMillis&&(this._lastTimeMillis=t-1);var e=t-this._lastTimeMillis;this._lastTimeMillis=t;var s=0,n=this.listeners.length;for(s=0;s<n;s++)(i=this.listeners[s]).onBeforeIntegrate&&i.onBeforeIntegrate(this);for(this.advance(t,e),0===this._activeSprings.length&&(this._isIdle=!0,this._lastTimeMillis=-1),s=0;s<n;s++)(i=this.listeners[s]).onAfterIntegrate&&i.onAfterIntegrate(this);this._isIdle||this.looper.run()},activateSpring:function(t){var i=this._springRegistry[t];-1==this._activeSprings.indexOf(i)&&this._activeSprings.push(i),this.getIsIdle()&&(this._isIdle=!1,this.looper.run())},addListener:function(t){this.listeners.push(t)},removeListener:function(t){p(this.listeners,t)},removeAllListeners:function(){this.listeners=[]}});var r=s.Spring=function t(i){this._id="s"+t._ID++,this._springSystem=i,this.listeners=[],this._currentState=new o,this._previousState=new o,this._tempState=new o};t.extend(r,{_ID:0,MAX_DELTA_TIME_SEC:.064,SOLVER_TIMESTEP_SEC:.001}),t.extend(r.prototype,{_id:0,_springConfig:null,_overshootClampingEnabled:!1,_currentState:null,_previousState:null,_tempState:null,_startValue:0,_endValue:0,_wasAtRest:!0,_restSpeedThreshold:.001,_displacementFromRestThreshold:.001,listeners:null,_timeAccumulator:0,_springSystem:null,destroy:function(){this.listeners=[],this.frames=[],this._springSystem.deregisterSpring(this)},getId:function(){return this._id},setSpringConfig:function(t){return this._springConfig=t,this},getSpringConfig:function(){return this._springConfig},setCurrentValue:function(t,i){return this._startValue=t,this._currentState.position=t,i||this.setAtRest(),this.notifyPositionUpdated(!1,!1),this},getStartValue:function(){return this._startValue},getCurrentValue:function(){return this._currentState.position},getCurrentDisplacementDistance:function(){return this.getDisplacementDistanceForState(this._currentState)},getDisplacementDistanceForState:function(t){return Math.abs(this._endValue-t.position)},setEndValue:function(t){if(this._endValue==t&&this.isAtRest())return this;this._startValue=this.getCurrentValue(),this._endValue=t,this._springSystem.activateSpring(this.getId());for(var i=0,e=this.listeners.length;i<e;i++){var s=this.listeners[i].onSpringEndStateChange;s&&s(this)}return this},getEndValue:function(){return this._endValue},setVelocity:function(t){return t===this._currentState.velocity||(this._currentState.velocity=t,this._springSystem.activateSpring(this.getId())),this},getVelocity:function(){return this._currentState.velocity},setRestSpeedThreshold:function(t){return this._restSpeedThreshold=t,this},getRestSpeedThreshold:function(){return this._restSpeedThreshold},setRestDisplacementThreshold:function(t){this._displacementFromRestThreshold=t},getRestDisplacementThreshold:function(){return this._displacementFromRestThreshold},setOvershootClampingEnabled:function(t){return this._overshootClampingEnabled=t,this},isOvershootClampingEnabled:function(){return this._overshootClampingEnabled},isOvershooting:function(){var t=this._startValue,i=this._endValue;return this._springConfig.tension>0&&(t<i&&this.getCurrentValue()>i||t>i&&this.getCurrentValue()<i)},advance:function(t,i){var e=this.isAtRest();if(!e||!this._wasAtRest){var s=i;i>r.MAX_DELTA_TIME_SEC&&(s=r.MAX_DELTA_TIME_SEC),this._timeAccumulator+=s;for(var n,o,a,l,h,c,d,_,u=this._springConfig.tension,p=this._springConfig.friction,g=this._currentState.position,m=this._currentState.velocity,f=this._tempState.position,v=this._tempState.velocity;this._timeAccumulator>=r.SOLVER_TIMESTEP_SEC;)this._timeAccumulator-=r.SOLVER_TIMESTEP_SEC,this._timeAccumulator<r.SOLVER_TIMESTEP_SEC&&(this._previousState.position=g,this._previousState.velocity=m),n=m,o=u*(this._endValue-f)-p*m,f=g+n*r.SOLVER_TIMESTEP_SEC*.5,a=v=m+o*r.SOLVER_TIMESTEP_SEC*.5,l=u*(this._endValue-f)-p*v,f=g+a*r.SOLVER_TIMESTEP_SEC*.5,h=v=m+l*r.SOLVER_TIMESTEP_SEC*.5,c=u*(this._endValue-f)-p*v,f=g+h*r.SOLVER_TIMESTEP_SEC*.5,d=v=m+c*r.SOLVER_TIMESTEP_SEC*.5,_=1/6*(o+2*(l+c)+(u*(this._endValue-f)-p*v)),g+=1/6*(n+2*(a+h)+d)*r.SOLVER_TIMESTEP_SEC,m+=_*r.SOLVER_TIMESTEP_SEC;this._tempState.position=f,this._tempState.velocity=v,this._currentState.position=g,this._currentState.velocity=m,this._timeAccumulator>0&&this._interpolate(this._timeAccumulator/r.SOLVER_TIMESTEP_SEC),(this.isAtRest()||this._overshootClampingEnabled&&this.isOvershooting())&&(this._springConfig.tension>0?(this._startValue=this._endValue,this._currentState.position=this._endValue):(this._endValue=this._currentState.position,this._startValue=this._endValue),this.setVelocity(0),e=!0);var b=!1;this._wasAtRest&&(this._wasAtRest=!1,b=!0);var y=!1;e&&(this._wasAtRest=!0,y=!0),this.notifyPositionUpdated(b,y)}},notifyPositionUpdated:function(t,i){for(var e=0,s=this.listeners.length;e<s;e++){var n=this.listeners[e];t&&n.onSpringActivate&&n.onSpringActivate(this),n.onSpringUpdate&&n.onSpringUpdate(this),i&&n.onSpringAtRest&&n.onSpringAtRest(this)}},systemShouldAdvance:function(){return!this.isAtRest()||!this.wasAtRest()},wasAtRest:function(){return this._wasAtRest},isAtRest:function(){return Math.abs(this._currentState.velocity)<this._restSpeedThreshold&&(this.getDisplacementDistanceForState(this._currentState)<=this._displacementFromRestThreshold||0===this._springConfig.tension)},setAtRest:function(){return this._endValue=this._currentState.position,this._tempState.position=this._currentState.position,this._currentState.velocity=0,this},_interpolate:function(t){this._currentState.position=this._currentState.position*t+this._previousState.position*(1-t),this._currentState.velocity=this._currentState.velocity*t+this._previousState.velocity*(1-t)},getListeners:function(){return this.listeners},addListener:function(t){return this.listeners.push(t),this},removeListener:function(t){return p(this.listeners,t),this},removeAllListeners:function(){return this.listeners=[],this},currentValueIsApproximately:function(t){return Math.abs(this.getCurrentValue()-t)<=this.getRestDisplacementThreshold()}});var o=function(){};t.extend(o.prototype,{position:0,velocity:0});var a=s.SpringConfig=function(t,i){this.tension=t,this.friction=i},l=s.AnimationLooper=function(){this.springSystem=null;var i=this,e=function(){i.springSystem.loop(Date.now())};this.run=function(){t.onFrame(e)}};s.SimulationLooper=function(t){this.springSystem=null;var i=0,e=!1;t=t||16.667,this.run=function(){if(!e){for(e=!0;!this.springSystem.getIsIdle();)this.springSystem.loop(i+=t);e=!1}}},s.SteppingSimulationLooper=function(t){this.springSystem=null;var i=0;this.run=function(){},this.step=function(t){this.springSystem.loop(i+=t)}};var h=s.OrigamiValueConverter={tensionFromOrigamiValue:function(t){return 3.62*(t-30)+194},origamiValueFromTension:function(t){return(t-194)/3.62+30},frictionFromOrigamiValue:function(t){return 3*(t-8)+25},origamiFromFriction:function(t){return(t-25)/3+8}},c=s.BouncyConversion=function(t,i){this.bounciness=t,this.speed=i;var e=this.normalize(t/1.7,0,20);e=this.projectNormal(e,0,.8);var s=this.normalize(i/1.7,0,20);this.bouncyTension=this.projectNormal(s,.5,200),this.bouncyFriction=this.quadraticOutInterpolation(e,this.b3Nobounce(this.bouncyTension),.01)};t.extend(c.prototype,{normalize:function(t,i,e){return(t-i)/(e-i)},projectNormal:function(t,i,e){return i+t*(e-i)},linearInterpolation:function(t,i,e){return t*e+(1-t)*i},quadraticOutInterpolation:function(t,i,e){return this.linearInterpolation(2*t-t*t,i,e)},b3Friction1:function(t){return 7e-4*Math.pow(t,3)-.031*Math.pow(t,2)+.64*t+1.28},b3Friction2:function(t){return 44e-6*Math.pow(t,3)-.006*Math.pow(t,2)+.36*t+2},b3Friction3:function(t){return 45e-8*Math.pow(t,3)-332e-6*Math.pow(t,2)+.1078*t+5.84},b3Nobounce:function(t){return t<=18?this.b3Friction1(t):t>18&&t<=44?this.b3Friction2(t):this.b3Friction3(t)}}),t.extend(a,{fromOrigamiTensionAndFriction:function(t,i){return new a(h.tensionFromOrigamiValue(t),h.frictionFromOrigamiValue(i))},fromBouncinessAndSpeed:function(t,i){var e=new s.BouncyConversion(t,i);return this.fromOrigamiTensionAndFriction(e.bouncyTension,e.bouncyFriction)},coastingConfigWithOrigamiFriction:function(t){return new a(0,h.frictionFromOrigamiValue(t))}}),a.DEFAULT_ORIGAMI_SPRING_CONFIG=a.fromOrigamiTensionAndFriction(40,7),t.extend(a.prototype,{friction:0,tension:0});var d={};t.hexToRGB=function(t){if(d[t])return d[t];3===(t=t.replace("#","")).length&&(t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]);var i=t.match(/.{2}/g),e={r:parseInt(i[0],16),g:parseInt(i[1],16),b:parseInt(i[2],16)};return d[t]=e,e},t.rgbToHex=function(t,i,e){return t=t.toString(16),i=i.toString(16),e=e.toString(16),"#"+(t=t.length<2?"0"+t:t)+(i=i.length<2?"0"+i:i)+(e=e.length<2?"0"+e:e)};var _,u=s.MathUtil={mapValueInRange:function(t,i,e,s,n){return s+(t-i)/(e-i)*(n-s)},interpolateColor:function(i,e,s,n,r,o){n=void 0===n?0:n,r=void 0===r?1:r,e=t.hexToRGB(e),s=t.hexToRGB(s);var a=Math.floor(t.mapValueInRange(i,n,r,e.r,s.r)),l=Math.floor(t.mapValueInRange(i,n,r,e.g,s.g)),h=Math.floor(t.mapValueInRange(i,n,r,e.b,s.b));return o?"rgb("+a+","+l+","+h+")":t.rgbToHex(a,l,h)},degreesToRadians:function(t){return t*Math.PI/180},radiansToDegrees:function(t){return 180*t/Math.PI}};function p(t,i){var e=t.indexOf(i);-1!=e&&t.splice(e,1)}t.extend(t,u),"undefined"!=typeof window&&(_=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}),_||"undefined"==typeof process||"node"!==process.title||(_=setImmediate),t.onFrame=function(t){return _(t)},"undefined"!=typeof exports?t.extend(exports,s):"undefined"!=typeof window&&(window.rebound=s)}();var n=function(){function t(t,i){for(var e=0;e<i.length;e++){var s=i[e];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(i,e,s){return e&&t(i.prototype,e),s&&t(i,s),i}}(),r=function(){function t(){var i=arguments.length<=0||void 0===arguments[0]?100:arguments[0],e=arguments.length<=1||void 0===arguments[1]?3:arguments[1],s=arguments.length<=2||void 0===arguments[2]?0:arguments[2],n=arguments[3];o(this,t),this._radius=i,this._sides=e,this._depth=s,this._colors=n,this._x=0,this._y=0,this.rotation=0,this.scale=1,this.points=this._getRegularPolygonPoints()}return n(t,[{key:"_getRegularPolygonPoints",value:function(){for(var t=[],i=0;i<this._sides;){var e=-this._radius*Math.sin(2*i*Math.PI/this._sides),s=this._radius*Math.cos(2*i*Math.PI/this._sides);t.push({x:e,y:s}),i++}return t}},{key:"_getInscribedPoints",value:function(t,i){var e=this,s=[];return t.forEach((function(n,r){var o=n,a=t[r+1];a||(a=t[0]);var l=e._getInterpolatedPoint(o,a,i);s.push(l)})),s}},{key:"_getInterpolatedPoint",value:function(t,i,e){var s=t.x,n=t.y;return{x:s+(i.x-s)*e,y:n+(i.y-n)*e}}},{key:"_getUpdatedChildren",value:function(t){for(var i=[],e=0;e<this._depth;e++){var s=i[e-1]||this.points,n=this._getInscribedPoints(s,t);i.push(n)}return i}},{key:"renderChildren",value:function(t,i){var e=this,n=this._getUpdatedChildren(i);n.forEach((function(i,r){t.beginPath(),i.forEach((function(i){return t.lineTo(i.x,i.y)})),t.closePath();var o=e._colors.stroke,a=e._colors.child;if(o&&(t.strokeStyle=o,t.stroke()),a){var l=s.util.hexToRGB(a),h=1/n.length,c=h+h*r,d="rgba("+l.r+", "+l.g+", "+l.b+", "+c+")";t.fillStyle=d,t.shadowColor="rgba(0,0,0, 0.1)",t.shadowBlur=10,t.shadowOffsetX=0,t.shadowOffsetY=0,t.fill()}}))}},{key:"render",value:function(t){t.save(),t.translate(this._x,this._y),0!==this.rotation&&t.rotate(s.MathUtil.degreesToRadians(this.rotation)),1!==this.scale&&t.scale(this.scale,this.scale),t.beginPath(),this.points.forEach((function(i){return t.lineTo(i.x,i.y)})),t.closePath();var i=this._colors.stroke,e=this._colors.base;i&&(t.strokeStyle=i,t.stroke()),e&&(t.fillStyle=e,t.fill()),t.restore()}}]),t}();n=function(){function t(t,i){for(var e=0;e<i.length;e++){var s=i[e];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(i,e,s){return e&&t(i.prototype,e),s&&t(i,s),i}}();function o(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}var a=function(){function t(i){o(this,t);i.id;var e=i.radius,s=i.sides,n=i.depth,a=i.colors,l=i.alwaysForward,h=i.restAt,c=i.renderBase;s<3&&(console.warn("At least 3 sides required."),s=3),this._canvas=document.createElement("canvas"),this._canvas.style.backgroundColor=a.background,this._canvas.style.zIndex=1100,this._canvasW=null,this._canvasH=null,this._canvasOpacity=1,this._centerX=null,this._centerY=null,this._alwaysForward=l,this._restThreshold=h,this._renderBase=c,this._springRangeLow=0,this._springRangeHigh=this._restThreshold||1,this._basePolygon=new r(e,s,n,a),this._progress=0,this._isAutoSpin=null,this._isCompleting=null}return n(t,[{key:"init",value:function(t,i){this._addCanvas(),this._spring=t,this._addSpringListener(),this._isAutoSpin=i,i?this._spin():(this._spring.setEndValue(0),this.render())}},{key:"_addCanvas",value:function(){document.body.appendChild(this._canvas),this._context=this._canvas.getContext("2d"),this._setCanvasSize()}},{key:"_setCanvasSize",value:function(){this._canvasW=this._canvas.width=window.innerWidth,this._canvasH=this._canvas.height=window.innerHeight,this._canvas.style.position="fixed",this._canvas.style.top=0,this._canvas.style.left=0,this._centerX=this._canvasW/2,this._centerY=this._canvasH/2}},{key:"_addSpringListener",value:function(){var t=this;this._spring.addListener({onSpringUpdate:function(i){var e=i.getCurrentValue(),n=t._springRangeLow,r=t._springRangeHigh;e=s.MathUtil.mapValueInRange(e,0,1,n,r),t.render(e)}})}},{key:"setComplete",value:function(){this._isCompleting=!0}},{key:"_completeAnimation",value:function(){this._canvasOpacity-=.1,this._canvas.style.opacity=this._canvasOpacity,this._canvasOpacity<=0&&(this._isAutoSpin=!1,this._spring.setAtRest(),this._canvas.remove())}},{key:"_spin",value:function(){if(this._alwaysForward){var t=this._spring.getCurrentValue();this._restThreshold&&1===t&&this._switchSpringRange(),1===t&&this._spring.setCurrentValue(0).setAtRest()}this._spring.setEndValue(1===this._spring.getCurrentValue()?0:1)}},{key:"_switchSpringRange",value:function(){var t=this._restThreshold;this._springRangeLow=this._springRangeLow===t?0:t,this._springRangeHigh=this._springRangeHigh===t?1:t}},{key:"render",value:function(t){t&&(this._progress=Math.round(1e4*t)/1e4),this._isAutoSpin&&this._spring.isAtRest()&&this._spin(),this._isCompleting&&this._completeAnimation(),this._context.clearRect(0,0,this._canvasW,this._canvasH),this._context.save(),this._context.translate(this._centerX,this._centerY),this._context.lineWidth=1.5,this._renderBase&&this._basePolygon.render(this._context),this._basePolygon.renderChildren(this._context,this._progress),this._context.restore()}}]),t}();var l=e(2596),h=e.n(l),c=e(9046),d=e.n(c);function _(){let t=document.body,i=document.querySelector(".content-wrap"),e=document.getElementById("open-button"),s=document.getElementById("close-button"),n=!1,r=function(){function t(t){return new RegExp("(^|\\s+)"+t+"(\\s+|$)")}let i,e,s;function n(t,n){(i(t,n)?s:e)(t,n)}return"classList"in document.documentElement?(i=function(t,i){return t.classList.contains(i)},e=function(t,i){t.classList.add(i)},s=function(t,i){t.classList.remove(i)}):(i=function(i,e){return t(e).test(i.className)},e=function(t,e){i(t,e)||(t.className=t.className+" "+e)},s=function(i,e){i.className=i.className.replace(t(e)," ")}),{hasClass:i,addClass:e,removeClass:s,toggleClass:n,has:i,add:e,remove:s,toggle:n}}(),o=document.getElementById("morph-shape"),a=h()(o.querySelector("svg")).select("path"),l=a.attr("d"),c=o.getAttribute("data-morph-open").split(";"),_=c.length,u=!1,p=new(d())(document.querySelector("#menuWrap"),{preventParentScroll:!0,forceScrollbars:!0});function g(){if(u)return!1;u=!0,$(".menu-wrap").show();let i=$("#home").css("margin-left");if(i=parseFloat(i.replace(/px/g,"")),n)$(t).removeClass("show-menu"),$("#content-wrap").fadeOut(300),$(t).css("overflow","auto"),$("#mainContent").off("touchmove"),setTimeout((function(){a.attr("d",l),u=!1}),300);else{r.add(t,"show-menu");let i=0,e=function(t){t>_-1?u=!1:(a.animate({path:c[t]},0===t?400:500,0===t?mina.easein:mina.elastic,(function(){e(t)})),t++)};$("#content-wrap").fadeIn(300),$("body").css("overflow","hidden"),p.scrollTo(!1,"top"),e(i)}n=!n}e.addEventListener("click",g),s&&s.addEventListener("click",g),i.addEventListener("click",(function(t){let i=t.target;n&&i!==e&&g()}))}var u=e(7522),p=e(3513);function g(t){$("#blog-news").prepend('<div class="container"> <div class="menu-wrap optiscroll" id="menuWrap" style="display:none"> <nav class="menu"> <div class="introduce-box"> <div class="introduce-head"> <div class="introduce-via" id="menuBlogAvatar"></div> </div> <div id="introduce"></div> </div> <div class="nav-title"></div> <div class="icon-list"> <ul id="m-nav-list"> </ul> </div> <span id="calendar-box"></span> <div class="m-list-title"><span>找找看</span></div> <div class="m-icon-list" id="sb-sidebarSearchBox"></div> <div class="m-list-title"><span>积分排名<span class="iconfont icon-select m-list-title-select"></span></span> </div> <div class="m-icon-list" id="sb-sidebarScorerank"></div> <span id="menuCustomList"></span> <div class="m-list-title"><span>最新随笔<span class="iconfont icon-select m-list-title-select"></span></span> </div> <div class="m-icon-list" id="sb-sidebarRecentposts"></div> <div class="m-list-title"><span>我的标签<span class="iconfont icon-select m-list-title-select"></span></span> </div> <div class="m-icon-list" id="sb-toptags"></div> <div class="m-list-title"><span>随笔分类<span class="iconfont icon-select m-list-title-select"></span></span> </div> <div class="m-icon-list" id="sb-classify"></div> <div class="m-list-title"><span>文章分类<span class="iconfont icon-select m-list-title-select"></span></span> </div> <div class="m-icon-list" id="sb-ArticleCategory"></div> <div class="m-list-title"><span>阅读排行<span class="iconfont icon-select m-list-title-select"></span></span> </div> <div class="m-icon-list" id="sb-topview"></div> <div class="m-list-title"><span>推荐排行<span class="iconfont icon-select m-list-title-select"></span></span> </div> <div class="m-icon-list" id="sb-topDiggPosts"></div> <div class="m-list-title"><span>最新评论<span class="iconfont icon-select m-list-title-select"></span></span> </div> <div class="m-icon-list" id="sb-recentComments"></div> <div class="m-list-title"><span>文章档案<span class="iconfont icon-select m-list-title-select"></span></span> </div> <div class="m-icon-list" id="sb-articlearchive"></div> <div class="m-list-title"><span>随笔档案<span class="iconfont icon-select m-list-title-select"></span></span> </div> <div class="m-icon-list" id="sb-record"></div> </nav> <button class="close-button" id="close-button">Close Menu</button> <div class="morph-shape" id="morph-shape" data-morph-open="M-7.312,0H15c0,0,66,113.339,66,399.5C81,664.006,15,800,15,800H-7.312V0z;M-7.312,0H100c0,0,0,113.839,0,400c0,264.506,0,400,0,400H-7.312V0z"> <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 800" preserveAspectRatio="none"> <path d="M-7.312,0H0c0,0,0,113.839,0,400c0,264.506,0,400,0,400h-7.312V0z"/> </svg> </div> </div> <button class="menu-button" id="open-button">MENU</button> <div class="content-wrap" id="content-wrap"></div> </div>'),_(),(()=>{let i=t.__tools.tempReplacement('<li> <a href="https://www.cnblogs.com/##user##" target="_self"> <i class="iconfont icon-homepage_fill"></i>首页 </a> </li> <li> <a href="https://msg.cnblogs.com/send/##user##" target="_blank"> <i class="iconfont icon-zhifeiji"></i>联系 </a> </li> <li> <a href="javascript:void(0)" onclick=\'$("#blog_nav_rss").trigger("click")\' data-rss="https://www.cnblogs.com/##user##/rss/"> <i class="iconfont icon-qinmifu"></i>订阅 </a> </li> <li> <a href="https://i.cnblogs.com/" target="_blank"> <i class="iconfont icon-setup_fill"></i>管理 </a> </li>',"user",t.__status.user),e=t.__config.sidebar.navList;e.length>0&&$.each(e,(function(t){let s=e[t].length>2?e[t][2]:"icon-qianzishenhe";i+='<li><a href="'+e[t][1]+'" target="_blank"><i class="iconfont '+s+'"></i>'+e[t][0]+"</a></li>"})),$("#m-nav-list").append(i);let s=t.__config.info.avatar?t.__config.info.avatar:u;$("#menuBlogAvatar").append("<img src='"+s+"'>")})(),(()=>{let i=t.__config.sidebar.infoBackground?t.__config.sidebar.infoBackground:p;$(".introduce-box").css({background:"#000 url('"+i+"') center no-repeat","background-size":"100%"})})(),(()=>{let i=1e3;function e(i,e,s,n){i.length>0&&""===e.html()&&(e.html(function(t,i){let e="<div><ul>",s=/^[1-9]+[0-9]*$/;return t.each((n=>{let r=$(t[n]),o=r.text()===r.html()?{}:$(r.html()),a=$.trim(r.text()).split(".");s.test(a[0])&&a.splice(0,1);let l=$.trim(a.join(".")),h='<span class="iconfont '+i+'" style="color: #888;font-size: 14px;margin-right: 5px;"></span>';o.length>0&&o.html(h+l),e+="<li>"+(o.length>0?o.prop("outerHTML"):"<a href='javascript:void(0);'>"+h+l+"</a>")+"</li>"})),e+="</ul></div>",e}(i,s)).prev(".m-list-title").show(),t.__tools.clearIntervalTimeId(n))}t.__timeIds.introduceTId=window.setInterval((()=>{let i=$("#profile_block").html(),e=$("#introduce");"string"==typeof i&&""===e.html()&&(e.html(t.__tools.htmlFiltrationScript(i)),t.__tools.clearIntervalTimeId(t.__timeIds.introduceTId))}),i),t.__timeIds.calendarTId=window.setInterval((()=>{let i=$("#blogCalendar"),e=$("#blog-calendar"),s=$("#calendar-box");if(i.length>0&&""===s.html()){let i='<div id="blog-calendar">'+e.html()+"</div>";e.remove(),s.html(i),$("#blog-calendar").css("visibility","visible"),t.__tools.clearIntervalTimeId(t.__timeIds.calendarTId)}}),i),t.__timeIds.searchTId=window.setInterval((()=>{let i=$("#sidebar_search_box"),e=$("#sb-sidebarSearchBox");i.length>0&&""===e.html()&&(e.html('<div id="sb_widget_my_zzk" class="div_my_zzk"><input id="q" type="text" onkeydown="return zzk_go_enter(event);" class="input_my_zzk"></div>').prev(".m-list-title").show(),t.__tools.clearIntervalTimeId(t.__timeIds.searchTId))}),i),t.__timeIds.scorerankTId=window.setInterval((()=>{e($("#sidebar_scorerank ul li"),$("#sb-sidebarScorerank"),"icon-collection_fill",t.__timeIds.scorerankTId)}),i),t.__timeIds.newEssayTId=window.setInterval((()=>{e($("#sidebar_recentposts ul li"),$("#sb-sidebarRecentposts"),"icon-time_fill",t.__timeIds.newEssayTId)}),i),t.__timeIds.topTagsTId=window.setInterval((()=>{e($("#sidebar_toptags ul li"),$("#sb-toptags"),"icon-label_fill",t.__timeIds.topTagsTId)}),i),t.__timeIds.classifyTId=window.setInterval((()=>{e($("#sidebar_postcategory ul li"),$("#sb-classify"),"icon-marketing_fill",t.__timeIds.classifyTId)}),i),t.__timeIds.articleCategoryTId=window.setInterval((()=>{e($("#sidebar_articlecategory ul li"),$("#sb-ArticleCategory"),"icon-marketing_fill",t.__timeIds.articleCategoryTId)}),i),t.__timeIds.recordTId=window.setInterval((()=>{e($("#sidebar_postarchive ul li"),$("#sb-record"),"icon-task_fill",t.__timeIds.recordTId)}),i),t.__timeIds.articleTId=window.setInterval((()=>{e($("#sidebar_articlearchive ul li"),$("#sb-articlearchive"),"icon-document_fill",t.__timeIds.articleTId)}),i),t.__timeIds.topViewTId=window.setInterval((()=>{e($("#TopViewPostsBlock ul li"),$("#sb-topview"),"icon-browse_fill",t.__timeIds.topViewTId)}),i),t.__timeIds.topDiggPostsTId=window.setInterval((()=>{e($("#TopDiggPostsBlock ul li"),$("#sb-topDiggPosts"),"icon-like_fill",t.__timeIds.topDiggPostsTId)}),i),t.__timeIds.commentsTId=window.setInterval((()=>{let i=$("#sidebar_recentcomments ul"),e=$("#sb-recentComments");i.length>0&&""===e.html()&&(e.html(((t,i)=>{let e,s,n,r="<div><ul>",o=/^[1-9]+[0-9]*$/;if(t.find("li").length>2){if(e=t.find("li.recent_comment_title"),s=t.find("li.recent_comment_body"),n=t.find("li.recent_comment_author"),e.length!==s.length||e.length!==n.length)return;e.each((t=>{let a=$(e[t]),l=a.text()===a.html()?{}:$(a.html()),h=$.trim(a.text()).split(".");o.test(h[0])&&h.splice(0,1);let c=$.trim(h.join(".")),d='<span class="iconfont '+i+'" style="color: #888;font-size: 15px;margin-right: 5px;"></span>';l.length>0&&l.html(d+c),r+="<li>"+(l.length>0?l.prop("outerHTML"):"<a href='javascript:void(0);'>"+d+c+"</a>")+'<div style="padding-left: 1.5em;color: #777;position: relative;top: -5px;">'+$(s[t]).text()+'</div><div style="text-align: right;color: #444;position: relative;top: -10px;">'+$(n[t]).text()+"</div></li>"}))}return r+="</ul></div>",r})(i,"icon-pinglunzu")).prev(".m-list-title").show(),t.__tools.clearIntervalTimeId(t.__timeIds.commentsTId))}),i),(()=>{let i=t.__config.sidebar.customList;Object.keys(i).length>0&&$.each(i,((t,i)=>{let e='<div class="m-list-title" style="display: block;"><span>'+t+'<span class="iconfont icon-select m-list-title-select"></span></span></div>';e+='<div class="m-icon-list"><div><ul>',$.each(i.data,((t,s)=>{e+='<li><a href="'+s[1]+'">',e+='<span class="iconfont '+i.icon+'" style="color: #888;font-size: 14px;margin-right: 5px;"></span>',e+=s[0]+"</a></li>"})),e+="</ul></div></div>",$("#menuCustomList").append(e)}))})()})(),$(".m-list-title-select").click((function(){$(this).parents(".m-list-title").next(".m-icon-list").slideToggle(350)}))}var m=e(2348),f=e(1905);var v=e(434);e(4921),e(9258);function b(t){e.e(3353).then(e.bind(e,5726)),e.e(7732).then(e.bind(e,3651));let i=function(t){return new function(){let i=this;this.config=t.__config.loading,this.spring=null,this.spinner=null,this.initRebound=()=>{let t=i.config.rebound,e=new s.SpringSystem;i.spring=e.createSpring(t.tension,t.friction)},this.initSpinner=()=>{let t=i.config.spinner;i.spinner=new a(t)},this.start=()=>{!function(t){"function"==typeof t.__config.hooks.beforeLoading&&t.__config.hooks.beforeLoading(t)}(t),$("#blog-news").prepend('<div id="loading"></div>'),i.initRebound(),i.initSpinner(),i.spinner.init(i.spring,!0)},this.stop=()=>{$("body").css("overflow","auto"),i.spinner.setComplete(),$("div#loading").hide(),$('a[name="top"]').hide(),function(t){"function"==typeof t.__config.hooks.afterLoading&&t.__config.hooks.afterLoading(t)}(t)}}}(t);i.start(),setTimeout((()=>{$.each(t.__timeIds,(i=>{null!=t.__timeIds[i]&&window.clearInterval(t.__timeIds[i])}))}),3e4),(0,v.Z)(t).init(),g(t),function(t){$("#blog-news").prepend('<div class="main-header"> <div id="nhBannerAnimation"> <ul class="circles"> <li></li> <li></li> <li></li> <li></li> <li></li> <li></li> <li></li> <li></li> <li></li> <li></li> </ul> </div> <div class="vertical"> <div class="main-header-content inner"> <h1 class="page-title" id="homeTopTitle"><span></span></h1> <h2 class="page-description" id="hitokoto"></h2> <h3 class="page-author" id="hitokotoAuthor"></h3> <h1 class="sb-title" id="sbTitle"> <span id="sbTitleText"></span> <span id="sbTitleConsole"></span> </h1> <p class="article-info" id="articleInfo"></p> </div> </div> <a class="scroll-down" href="javascript:void(0);" data-offset="-45"> <span class="hidden">Scroll Down</span> <i class="scroll-down-icon iconfont icon-fanhui"></i> </a> </div>'),(()=>{let i,e,s,n=$(".main-header");"home"===t.__status.pageType?i=t.__config.banner.home.background.length>0?t.__config.banner.home.background:[m]:(i=t.__config.banner.article.background.length>0?t.__config.banner.article.background:[f],s="40vh",$("#homeTopTitle").hide(),$(".scroll-down").hide(),$("#home").css("margin-top","40vh"),$("#cb_post_title_url").addClass("post-del-title")),e=i.length>0?i.length>1?i[t.__tools.randomNum(0,i.length-1)]:i[0]:"",n.css({background:"#222 url('"+encodeURI(e)+"')  center center no-repeat","background-size":"cover"}),s&&n.css("height",s)})(),t.__event.scroll.handle.push((()=>{let i=$("#open-button");t.__event.scroll.temScroll<t.__event.scroll.docScroll?t.__event.scroll.homeScroll<=t.__event.scroll.docScroll&&(i.hasClass("menu-button-scroll")||(i.addClass("menu-button-scroll"),i.text(""))):t.__event.scroll.homeScroll>=t.__event.scroll.docScroll&&i.hasClass("menu-button-scroll")&&(i.removeClass("menu-button-scroll"),i.text("MENU"))}))}(t),""!==t.__config.fontIconExtend&&t.__tools.dynamicLoadingCss(t.__config.fontIconExtend),i.stop()}},7522:function(t,i,e){"use strict";t.exports=e.p+"images/53abc64338825f4038d6.webp"},2348:function(t,i,e){"use strict";t.exports=e.p+"images/e58d9f9d0eee6d9b9add.webp"},3513:function(t,i,e){"use strict";t.exports=e.p+"images/82deab5871314fe2ef83.webp"},1905:function(t,i,e){"use strict";t.exports=e.p+"images/6d995b207bae4175ff28.webp"},4921:function(t,i,e){"use strict";t.exports=e.p+"images/48be92afda99734e94c9.webp"},9258:function(){(function(k){for(var d,f,l=document.getElementsByTagName("head")[0].style,h=["transformProperty","WebkitTransform","OTransform","msTransform","MozTransform"],g=0;g<h.length;g++)void 0!==l[h[g]]&&(d=h[g]);var a;d&&(f=d.replace(/[tT]ransform/,"TransformOrigin"),"T"==f[0]&&(f[0]="t")),eval('IE = "v"=="\v"'),jQuery.fn.extend({rotate:function(t){if(0!==this.length&&void 0!==t){"number"==typeof t&&(t={angle:t});for(var i=[],e=0,s=this.length;e<s;e++){if((r=this.get(e)).Wilq32&&r.Wilq32.PhotoEffect)r.Wilq32.PhotoEffect._handleRotation(t);else{var n=k.extend(!0,{},t),r=new Wilq32.PhotoEffect(r,n)._rootObj;i.push(k(r))}}return i}},getRotateAngle:function(){for(var t=[],i=0,e=this.length;i<e;i++){var s=this.get(i);s.Wilq32&&s.Wilq32.PhotoEffect&&(t[i]=s.Wilq32.PhotoEffect._angle)}return t},stopRotate:function(){for(var t=0,i=this.length;t<i;t++){var e=this.get(t);e.Wilq32&&e.Wilq32.PhotoEffect&&clearTimeout(e.Wilq32.PhotoEffect._timer)}}}),Wilq32=window.Wilq32||{},Wilq32.PhotoEffect=d?function(t,i){t.Wilq32={PhotoEffect:this},this._img=this._rootObj=this._eventObj=t,this._handleRotation(i)}:function(t,i){if(this._img=t,this._onLoadDelegate=[i],this._rootObj=document.createElement("span"),this._rootObj.style.display="inline-block",this._rootObj.Wilq32={PhotoEffect:this},t.parentNode.insertBefore(this._rootObj,t),t.complete)this._Loader();else{var e=this;jQuery(this._img).bind("load",(function(){e._Loader()}))}},Wilq32.PhotoEffect.prototype={_setupParameters:function(t){this._parameters=this._parameters||{},"number"!=typeof this._angle&&(this._angle=0),"number"==typeof t.angle&&(this._angle=t.angle),this._parameters.animateTo="number"==typeof t.animateTo?t.animateTo:this._angle,this._parameters.step=t.step||this._parameters.step||null,this._parameters.easing=t.easing||this._parameters.easing||this._defaultEasing,this._parameters.duration=t.duration||this._parameters.duration||1e3,this._parameters.callback=t.callback||this._parameters.callback||this._emptyFunction,this._parameters.center=t.center||this._parameters.center||["50%","50%"],this._rotationCenterX="string"==typeof this._parameters.center[0]?parseInt(this._parameters.center[0],10)/100*this._imgWidth*this._aspectW:this._parameters.center[0],this._rotationCenterY="string"==typeof this._parameters.center[1]?parseInt(this._parameters.center[1],10)/100*this._imgHeight*this._aspectH:this._parameters.center[1],t.bind&&t.bind!=this._parameters.bind&&this._BindEvents(t.bind)},_emptyFunction:function(){},_defaultEasing:function(t,i,e,s,n){return-s*((i=i/n-1)*i*i*i-1)+e},_handleRotation:function(t,i){d||this._img.complete||i?(this._setupParameters(t),this._angle==this._parameters.animateTo?this._rotate(this._angle):this._animateStart()):this._onLoadDelegate.push(t)},_BindEvents:function(t){if(t&&this._eventObj){if(this._parameters.bind){var i,e=this._parameters.bind;for(i in e)e.hasOwnProperty(i)&&jQuery(this._eventObj).unbind(i,e[i])}for(i in this._parameters.bind=t,t)t.hasOwnProperty(i)&&jQuery(this._eventObj).bind(i,t[i])}},_Loader:IE?function(){var t=this._img.width,i=this._img.height;for(this._imgWidth=t,this._imgHeight=i,this._img.parentNode.removeChild(this._img),this._vimage=this.createVMLNode("image"),this._vimage.src=this._img.src,this._vimage.style.height=i+"px",this._vimage.style.width=t+"px",this._vimage.style.position="absolute",this._vimage.style.top="0px",this._vimage.style.left="0px",this._aspectW=this._aspectH=1,this._container=this.createVMLNode("group"),this._container.style.width=t,this._container.style.height=i,this._container.style.position="absolute",this._container.style.top="0px",this._container.style.left="0px",this._container.setAttribute("coordsize",t-1+","+(i-1)),this._container.appendChild(this._vimage),this._rootObj.appendChild(this._container),this._rootObj.style.position="relative",this._rootObj.style.width=t+"px",this._rootObj.style.height=i+"px",this._rootObj.setAttribute("id",this._img.getAttribute("id")),this._rootObj.className=this._img.className,this._eventObj=this._rootObj;t=this._onLoadDelegate.shift();)this._handleRotation(t,!0)}:function(){this._rootObj.setAttribute("id",this._img.getAttribute("id")),this._rootObj.className=this._img.className,this._imgWidth=this._img.naturalWidth,this._imgHeight=this._img.naturalHeight;var t=Math.sqrt(this._imgHeight*this._imgHeight+this._imgWidth*this._imgWidth);for(this._width=3*t,this._height=3*t,this._aspectW=this._img.offsetWidth/this._img.naturalWidth,this._aspectH=this._img.offsetHeight/this._img.naturalHeight,this._img.parentNode.removeChild(this._img),this._canvas=document.createElement("canvas"),this._canvas.setAttribute("width",this._width),this._canvas.style.position="relative",this._canvas.style.left=-this._img.height*this._aspectW+"px",this._canvas.style.top=-this._img.width*this._aspectH+"px",this._canvas.Wilq32=this._rootObj.Wilq32,this._rootObj.appendChild(this._canvas),this._rootObj.style.width=this._img.width*this._aspectW+"px",this._rootObj.style.height=this._img.height*this._aspectH+"px",this._eventObj=this._canvas,this._cnv=this._canvas.getContext("2d");t=this._onLoadDelegate.shift();)this._handleRotation(t,!0)},_animateStart:function(){this._timer&&clearTimeout(this._timer),this._animateStartTime=+new Date,this._animateStartAngle=this._angle,this._animate()},_animate:function(){var t=+new Date,i=t-this._animateStartTime>this._parameters.duration;if(i&&!this._parameters.animatedGif)clearTimeout(this._timer);else{(this._canvas||this._vimage||this._img)&&(t=this._parameters.easing(0,t-this._animateStartTime,this._animateStartAngle,this._parameters.animateTo-this._animateStartAngle,this._parameters.duration),this._rotate(~~(10*t)/10)),this._parameters.step&&this._parameters.step(this._angle);var e=this;this._timer=setTimeout((function(){e._animate.call(e)}),10)}this._parameters.callback&&i&&(this._angle=this._parameters.animateTo,this._rotate(this._angle),this._parameters.callback.call(this._rootObj))},_rotate:(a=Math.PI/180,IE?function(t){this._angle=t,this._container.style.rotation=t%360+"deg",this._vimage.style.top=-(this._rotationCenterY-this._imgHeight/2)+"px",this._vimage.style.left=-(this._rotationCenterX-this._imgWidth/2)+"px",this._container.style.top=this._rotationCenterY-this._imgHeight/2+"px",this._container.style.left=this._rotationCenterX-this._imgWidth/2+"px"}:d?function(t){this._angle=t,this._img.style[d]="rotate("+t%360+"deg)",this._img.style[f]=this._parameters.center.join(" ")}:function(t){this._angle=t,t=t%360*a,this._canvas.width=this._width,this._canvas.height=this._height,this._cnv.translate(this._imgWidth*this._aspectW,this._imgHeight*this._aspectH),this._cnv.translate(this._rotationCenterX,this._rotationCenterY),this._cnv.rotate(t),this._cnv.translate(-this._rotationCenterX,-this._rotationCenterY),this._cnv.scale(this._aspectW,this._aspectH),this._cnv.drawImage(this._img,0,0)})},IE&&(Wilq32.PhotoEffect.prototype.createVMLNode=function(){document.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)");try{return!document.namespaces.rvml&&document.namespaces.add("rvml","urn:schemas-microsoft-com:vml"),function(t){return document.createElement("<rvml:"+t+' class="rvml">')}}catch(t){return function(t){return document.createElement("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')}}}())})(jQuery)}}]);