jQuery(document).ready(function($) {

    $('ul#mainNav li.state-ifsub > a,ul#mainNav li.state-actifsub > a').click(function(e, slideUpOnly) {
        e.preventDefault();

        $('#mainNavRow').addClass('open');
        $('#b_header').addClass('open');

        $('.search-toggle').removeClass('open');
        $('#searchWrap').stop().slideUp();

        $(this).parent().parent().find('li').not($(this).parent()).removeClass('open');
        if ($(this).parent('li').hasClass('open') || $(window).innerWidth() < 500) {
            $(this).parent('li').toggleClass('open');
        } else {
            $(this).parent('li').addClass('open').find('.state-actifsub').addClass('open');
        }


        level = $(this).parents('ul').length;
        $('#mainNav').attr('class','navLevel'+level);

        // get highest ul to adjust nav height
        var maxHeight = 0;
        if($(window).innerWidth() < 500) {
            maxHeight = $('#mainNav ul:visible').last().outerHeight() + $('#headerNav').outerHeight();
            $('#mainNavRow').stop().animate({ height: maxHeight}, 300);
            $('#headerNav').animate({ top: maxHeight + "px" }, 300);
        } else {
            $('#mainNav ul:visible').each(function () {
                var thisH = $(this).outerHeight();
                if (thisH > maxHeight) {
                    maxHeight = thisH;
                }
            });
            $('#mainNav').stop().animate({
                height: maxHeight ? maxHeight + 150 : $('#mainNav li:first').outerHeight()
            }, 300, maxHeight ? $.noop() : function () {
                $('#mainNavRow').removeClass('open');
                if(!slideUpOnly) {
                    $('#b_header').removeClass('open');
                }
            });
        }

        // maxHeight = maxHeight;
        // if(maxHeight == 0){
        //     maxHeight = 66;
        //     var callback = function () {
        //         $('#mainNavRow').removeClass('open');
        //         if(!slideUpOnly) {
        //             $('#b_header').removeClass('open');
        //         }
        //     };
        // }
        // $('#mainNavRow').stop().animate({ height: maxHeight}, 300); //, callback || jQuery.noop);
    });

    // $('ul#mainNav li.state-ifsub > a,ul#mainNav li.state-actifsub > a').each(function(index, el) {
    //     content = $(this).html();
    //     url = $(this).attr('href');
    //     backLink = '<li class="back"><a data-url="'+url+'" href="#">back</a></li>';
    //     overviewLink = '<li class="overview"><a href="'+url+'">'+content+'</a></li>';
    //     $(this).parent().find('ul').first().prepend(backLink+overviewLink);
    // });

    $('ul#mainNav li.back a').click(function(e) {
        e.preventDefault();
        window.setTimeout($.proxy(function () {
            $(this).parents('li.open').first().removeClass('open');
        }, this), 300);

        // url = $(this).attr('data-url');
        // $('#mainNav a[href$="'+url+'"]').parent().removeClass('open');

        level = $('#mainNav').attr('class').replace('navLevel','')-1;
        $('#mainNav').attr('class','navLevel'+level);

        // get highest ul to adjust nav height
        var maxHeight = 0;
        if($(window).innerWidth() < 500) {
            maxHeight = $('#mainNav').add('#mainNav ul:visible').eq(-2).outerHeight() + $('#headerNav').outerHeight();
            $('#mainNavRow').stop().animate({ height: maxHeight}, 300);
            $('#headerNav').animate({ top: maxHeight + "px" }, 300);
        } else {
            $('#mainNav ul:visible').each(function () {
                var thisH = $(this).outerHeight();
                if (thisH > maxHeight) {
                    maxHeight = thisH;
                }
            });
            $('#mainNav').stop().animate({
                height: maxHeight ? maxHeight + 150 : $('#mainNav li:first').outerHeight()
            }, 300, maxHeight ? $.noop() : function () {
                $('#mainNavRow').removeClass('open');
                if(!slideUpOnly) {
                    $('#b_header').removeClass('open');
                }
            });
        }

        // maxHeight = maxHeight;
        // if(maxHeight == 0){
        //     maxHeight = 66;
        //     var callback = function () {
        //         $('#mainNavRow').removeClass('open');
        //         if(!slideUpOnly) {
        //             $('#b_header').removeClass('open');
        //         }
        //     };
        // }
        // $('#mainNavRow').stop().animate({ height: maxHeight}, 300); //, callback || jQuery.noop);
    });

    $('body').on('click', function(e) {
        if(!$('#b_header').is(e.target) && !$('#b_header').has(e.target).length) {
            $('#mainNav').children('.open').children('a:first').trigger('click');
        }
    });

    $('.menu-toggle').click(function(e) {
        var $this = $(this);
        if(!$this.hasClass('open')) {
            $this.add('#b_header').addClass('open');
            $('#mainNavRow').css('display', 'block');

            var maxHeight = $('#mainNav').add('#mainNav li.open > ul').last().outerHeight() + $('#headerNav').outerHeight();
            $('#headerNav').css('top', maxHeight + "px");
            $('#mainNavRow').stop().animate({ height: maxHeight}, 300);
        } else {
            $this.add('#b_header').removeClass('open');
            $('#mainNavRow').stop().slideUp(function () {
                $('#mainNavRow').removeAttr('style');
            });
        }
        $('#searchWrap').slideUp();
    });


    $('.search-toggle').click(function(e) {
       $(this).toggleClass('open');
        if($('#searchWrap').is(':visible')) {
            var callback = function () {
                $('#b_header').removeClass('open');
            }
        } else if($('#b_header').hasClass('open')) {
            $('#mainNav').children('.open').children('a').trigger('click', [ true ]);
        } else {
            $('#b_header').addClass('open');
        }
       $('#searchWrap').stop().slideToggle(callback || jQuery.noop);
       if($(window).width()<600){
        $('#mainNavRow').slideUp();
       }

    });



    $('.b_languageSwitch').click(function(e) {
       $(this).toggleClass('open');
       if($(window).width() < 500) {
           var maxHeight = $('#mainNav').add('#mainNav li.open > ul').last().outerHeight() + $('#headerNav').outerHeight();
           $('#mainNavRow').stop().animate({height: maxHeight}, 300);
       }
    });


    $('#footerSharingLinks > a').click(function(e) {
        e.preventDefault();
        $(this).parent().toggleClass('open');
    });


    $('.b_contentMenu.bJS_contentMenu li a').off().on('click',function(e) {
        e.preventDefault();
        accID = $(this).attr('href').replace('#bJS_section-','');
        $('.b_section').not($('#c'+accID+' .b_section')).slideUp();
        $('.b_section','#c'+accID).slideDown();
        
    });

    var $firstElement = $('.b_row-content > .col-xs-24 > .b_is-firstElement');
    if($firstElement.children('.csc-textpic').length) {
        var $secondElement = $firstElement.next('.csc-default');
        if($secondElement.children('h1:first-child').length) {
            $firstElement.prepend($secondElement.children('h1:first-child'));
        }
    }
});








var jaaulde=window.jaaulde||{};jaaulde.utils=jaaulde.utils||{};jaaulde.utils.cookies=(function(){var resolveOptions,assembleOptionsString,parseCookies,constructor,defaultOptions={expiresAt:null,path:'/',domain:null,secure:false};resolveOptions=function(options){var returnValue,expireDate;if(typeof options!=='object'||options===null){returnValue=defaultOptions;}else
{returnValue={expiresAt:defaultOptions.expiresAt,path:defaultOptions.path,domain:defaultOptions.domain,secure:defaultOptions.secure};if(typeof options.expiresAt==='object'&&options.expiresAt instanceof Date){returnValue.expiresAt=options.expiresAt;}else if(typeof options.hoursToLive==='number'&&options.hoursToLive!==0){expireDate=new Date();expireDate.setTime(expireDate.getTime()+(options.hoursToLive*60*60*1000));returnValue.expiresAt=expireDate;}if(typeof options.path==='string'&&options.path!==''){returnValue.path=options.path;}if(typeof options.domain==='string'&&options.domain!==''){returnValue.domain=options.domain;}if(options.secure===true){returnValue.secure=options.secure;}}return returnValue;};assembleOptionsString=function(options){options=resolveOptions(options);return((typeof options.expiresAt==='object'&&options.expiresAt instanceof Date?'; expires='+options.expiresAt.toGMTString():'')+'; path='+options.path+(typeof options.domain==='string'?'; domain='+options.domain:'')+(options.secure===true?'; secure':''));};parseCookies=function(){var cookies={},i,pair,name,value,separated=document.cookie.split(';'),unparsedValue;for(i=0;i<separated.length;i=i+1){pair=separated[i].split('=');name=pair[0].replace(/^\s*/,'').replace(/\s*$/,'');try
{value=decodeURIComponent(pair[1]);}catch(e1){value=pair[1];}if(typeof JSON==='object'&&JSON!==null&&typeof JSON.parse==='function'){try
{unparsedValue=value;value=JSON.parse(value);}catch(e2){value=unparsedValue;}}cookies[name]=value;}return cookies;};constructor=function(){};constructor.prototype.get=function(cookieName){var returnValue,item,cookies=parseCookies();if(typeof cookieName==='string'){returnValue=(typeof cookies[cookieName]!=='undefined')?cookies[cookieName]:null;}else if(typeof cookieName==='object'&&cookieName!==null){returnValue={};for(item in cookieName){if(typeof cookies[cookieName[item]]!=='undefined'){returnValue[cookieName[item]]=cookies[cookieName[item]];}else
{returnValue[cookieName[item]]=null;}}}else
{returnValue=cookies;}return returnValue;};constructor.prototype.filter=function(cookieNameRegExp){var cookieName,returnValue={},cookies=parseCookies();if(typeof cookieNameRegExp==='string'){cookieNameRegExp=new RegExp(cookieNameRegExp);}for(cookieName in cookies){if(cookieName.match(cookieNameRegExp)){returnValue[cookieName]=cookies[cookieName];}}return returnValue;};constructor.prototype.set=function(cookieName,value,options){if(typeof options!=='object'||options===null){options={};}if(typeof value==='undefined'||value===null){value='';options.hoursToLive=-8760;}else if(typeof value!=='string'){if(typeof JSON==='object'&&JSON!==null&&typeof JSON.stringify==='function'){value=JSON.stringify(value);}else
{throw new Error('cookies.set() received non-string value and could not serialize.');}}var optionsString=assembleOptionsString(options);document.cookie=cookieName+'='+encodeURIComponent(value)+optionsString;};constructor.prototype.del=function(cookieName,options){var allCookies={},name;if(typeof options!=='object'||options===null){options={};}if(typeof cookieName==='boolean'&&cookieName===true){allCookies=this.get();}else if(typeof cookieName==='string'){allCookies[cookieName]=true;}for(name in allCookies){if(typeof name==='string'&&name!==''){this.set(name,null,options);}}};constructor.prototype.test=function(){var returnValue=false,testName='cT',testValue='data';this.set(testName,testValue);if(this.get(testName)===testValue){this.del(testName);returnValue=true;}return returnValue;};constructor.prototype.setOptions=function(options){if(typeof options!=='object'){options=null;}defaultOptions=resolveOptions(options);};return new constructor();})();(function(){if(window.jQuery){(function($){$.cookies=jaaulde.utils.cookies;var extensions={cookify:function(options){return this.each(function(){var i,nameAttrs=['name','id'],name,$this=$(this),value;for(i in nameAttrs){if(!isNaN(i)){name=$this.attr(nameAttrs[i]);if(typeof name==='string'&&name!==''){if($this.is(':checkbox, :radio')){if($this.attr('checked')){value=$this.val();}}else if($this.is(':input')){value=$this.val();}else
{value=$this.html();}if(typeof value!=='string'||value===''){value=null;}$.cookies.set(name,value,options);break;}}}});},cookieFill:function(){return this.each(function(){var n,getN,nameAttrs=['name','id'],name,$this=$(this),value;getN=function(){n=nameAttrs.pop();return!!n;};while(getN()){name=$this.attr(n);if(typeof name==='string'&&name!==''){value=$.cookies.get(name);if(value!==null){if($this.is(':checkbox, :radio')){if($this.val()===value){$this.attr('checked','checked');}else
{$this.removeAttr('checked');}}else if($this.is(':input')){$this.val(value);}else
{$this.html(value);}}break;}}});},cookieBind:function(options){return this.each(function(){var $this=$(this);$this.cookieFill().change(function(){$this.cookify(options);});});}};$.each(extensions,function(i){$.fn[i]=this;});})(window.jQuery);}})();








/*!
 * jQuery Transit - CSS3 transitions and transformations
 * (c) 2011-2012 Rico Sta. Cruz <rico@ricostacruz.com>
 * MIT Licensed.
 *
 * http://ricostacruz.com/jquery.transit
 * http://github.com/rstacruz/jquery.transit
 */
(function(k){k.transit={version:"0.9.9",propertyMap:{marginLeft:"margin",marginRight:"margin",marginBottom:"margin",marginTop:"margin",paddingLeft:"padding",paddingRight:"padding",paddingBottom:"padding",paddingTop:"padding"},enabled:true,useTransitionEnd:false};var d=document.createElement("div");var q={};function b(v){if(v in d.style){return v}var u=["Moz","Webkit","O","ms"];var r=v.charAt(0).toUpperCase()+v.substr(1);if(v in d.style){return v}for(var t=0;t<u.length;++t){var s=u[t]+r;if(s in d.style){return s}}}function e(){d.style[q.transform]="";d.style[q.transform]="rotateY(90deg)";return d.style[q.transform]!==""}var a=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;q.transition=b("transition");q.transitionDelay=b("transitionDelay");q.transform=b("transform");q.transformOrigin=b("transformOrigin");q.transform3d=e();var i={transition:"transitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd"};var f=q.transitionEnd=i[q.transition]||null;for(var p in q){if(q.hasOwnProperty(p)&&typeof k.support[p]==="undefined"){k.support[p]=q[p]}}d=null;k.cssEase={_default:"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"};k.cssHooks["transit:transform"]={get:function(r){return k(r).data("transform")||new j()},set:function(s,r){var t=r;if(!(t instanceof j)){t=new j(t)}if(q.transform==="WebkitTransform"&&!a){s.style[q.transform]=t.toString(true)}else{s.style[q.transform]=t.toString()}k(s).data("transform",t)}};k.cssHooks.transform={set:k.cssHooks["transit:transform"].set};if(k.fn.jquery<"1.8"){k.cssHooks.transformOrigin={get:function(r){return r.style[q.transformOrigin]},set:function(r,s){r.style[q.transformOrigin]=s}};k.cssHooks.transition={get:function(r){return r.style[q.transition]},set:function(r,s){r.style[q.transition]=s}}}n("scale");n("translate");n("rotate");n("rotateX");n("rotateY");n("rotate3d");n("perspective");n("skewX");n("skewY");n("x",true);n("y",true);function j(r){if(typeof r==="string"){this.parse(r)}return this}j.prototype={setFromString:function(t,s){var r=(typeof s==="string")?s.split(","):(s.constructor===Array)?s:[s];r.unshift(t);j.prototype.set.apply(this,r)},set:function(s){var r=Array.prototype.slice.apply(arguments,[1]);if(this.setter[s]){this.setter[s].apply(this,r)}else{this[s]=r.join(",")}},get:function(r){if(this.getter[r]){return this.getter[r].apply(this)}else{return this[r]||0}},setter:{rotate:function(r){this.rotate=o(r,"deg")},rotateX:function(r){this.rotateX=o(r,"deg")},rotateY:function(r){this.rotateY=o(r,"deg")},scale:function(r,s){if(s===undefined){s=r}this.scale=r+","+s},skewX:function(r){this.skewX=o(r,"deg")},skewY:function(r){this.skewY=o(r,"deg")},perspective:function(r){this.perspective=o(r,"px")},x:function(r){this.set("translate",r,null)},y:function(r){this.set("translate",null,r)},translate:function(r,s){if(this._translateX===undefined){this._translateX=0}if(this._translateY===undefined){this._translateY=0}if(r!==null&&r!==undefined){this._translateX=o(r,"px")}if(s!==null&&s!==undefined){this._translateY=o(s,"px")}this.translate=this._translateX+","+this._translateY}},getter:{x:function(){return this._translateX||0},y:function(){return this._translateY||0},scale:function(){var r=(this.scale||"1,1").split(",");if(r[0]){r[0]=parseFloat(r[0])}if(r[1]){r[1]=parseFloat(r[1])}return(r[0]===r[1])?r[0]:r},rotate3d:function(){var t=(this.rotate3d||"0,0,0,0deg").split(",");for(var r=0;r<=3;++r){if(t[r]){t[r]=parseFloat(t[r])}}if(t[3]){t[3]=o(t[3],"deg")}return t}},parse:function(s){var r=this;s.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,function(t,v,u){r.setFromString(v,u)})},toString:function(t){var s=[];for(var r in this){if(this.hasOwnProperty(r)){if((!q.transform3d)&&((r==="rotateX")||(r==="rotateY")||(r==="perspective")||(r==="transformOrigin"))){continue}if(r[0]!=="_"){if(t&&(r==="scale")){s.push(r+"3d("+this[r]+",1)")}else{if(t&&(r==="translate")){s.push(r+"3d("+this[r]+",0)")}else{s.push(r+"("+this[r]+")")}}}}}return s.join(" ")}};function m(s,r,t){if(r===true){s.queue(t)}else{if(r){s.queue(r,t)}else{t()}}}function h(s){var r=[];k.each(s,function(t){t=k.camelCase(t);t=k.transit.propertyMap[t]||k.cssProps[t]||t;t=c(t);if(k.inArray(t,r)===-1){r.push(t)}});return r}function g(s,v,x,r){var t=h(s);if(k.cssEase[x]){x=k.cssEase[x]}var w=""+l(v)+" "+x;if(parseInt(r,10)>0){w+=" "+l(r)}var u=[];k.each(t,function(z,y){u.push(y+" "+w)});return u.join(", ")}k.fn.transition=k.fn.transit=function(z,s,y,C){var D=this;var u=0;var w=true;if(typeof s==="function"){C=s;s=undefined}if(typeof y==="function"){C=y;y=undefined}if(typeof z.easing!=="undefined"){y=z.easing;delete z.easing}if(typeof z.duration!=="undefined"){s=z.duration;delete z.duration}if(typeof z.complete!=="undefined"){C=z.complete;delete z.complete}if(typeof z.queue!=="undefined"){w=z.queue;delete z.queue}if(typeof z.delay!=="undefined"){u=z.delay;delete z.delay}if(typeof s==="undefined"){s=k.fx.speeds._default}if(typeof y==="undefined"){y=k.cssEase._default}s=l(s);var E=g(z,s,y,u);var B=k.transit.enabled&&q.transition;var t=B?(parseInt(s,10)+parseInt(u,10)):0;if(t===0){var A=function(F){D.css(z);if(C){C.apply(D)}if(F){F()}};m(D,w,A);return D}var x={};var r=function(H){var G=false;var F=function(){if(G){D.unbind(f,F)}if(t>0){D.each(function(){this.style[q.transition]=(x[this]||null)})}if(typeof C==="function"){C.apply(D)}if(typeof H==="function"){H()}};if((t>0)&&(f)&&(k.transit.useTransitionEnd)){G=true;D.bind(f,F)}else{window.setTimeout(F,t)}D.each(function(){if(t>0){this.style[q.transition]=E}k(this).css(z)})};var v=function(F){this.offsetWidth;r(F)};m(D,w,v);return this};function n(s,r){if(!r){k.cssNumber[s]=true}k.transit.propertyMap[s]=q.transform;k.cssHooks[s]={get:function(v){var u=k(v).css("transit:transform");return u.get(s)},set:function(v,w){var u=k(v).css("transit:transform");u.setFromString(s,w);k(v).css({"transit:transform":u})}}}function c(r){return r.replace(/([A-Z])/g,function(s){return"-"+s.toLowerCase()})}function o(s,r){if((typeof s==="string")&&(!s.match(/^[\-0-9\.]+$/))){return s}else{return""+s+r}}function l(s){var r=s;if(k.fx.speeds[r]){r=k.fx.speeds[r]}return o(r,"ms")}k.transit.getTransitionValue=g})(jQuery);

























/*!
 * Chart.js
 * http://chartjs.org/
 *
 * Copyright 2013 Nick Downie
 * Released under the MIT license
 * https://github.com/nnnick/Chart.js/blob/master/LICENSE.md
 */

//Define the global Chart Variable as a class.
window.Chart = function(context){

    var chart = this;
    
    
    //Easing functions adapted from Robert Penner's easing equations
    //http://www.robertpenner.com/easing/
    
    var animationOptions = {
        linear : function (t){
            return t;
        },
        easeInQuad: function (t) {
            return t*t;
        },
        easeOutQuad: function (t) {
            return -1 *t*(t-2);
        },
        easeInOutQuad: function (t) {
            if ((t/=1/2) < 1) return 1/2*t*t;
            return -1/2 * ((--t)*(t-2) - 1);
        },
        easeInCubic: function (t) {
            return t*t*t;
        },
        easeOutCubic: function (t) {
            return 1*((t=t/1-1)*t*t + 1);
        },
        easeInOutCubic: function (t) {
            if ((t/=1/2) < 1) return 1/2*t*t*t;
            return 1/2*((t-=2)*t*t + 2);
        },
        easeInQuart: function (t) {
            return t*t*t*t;
        },
        easeOutQuart: function (t) {
            return -1 * ((t=t/1-1)*t*t*t - 1);
        },
        easeInOutQuart: function (t) {
            if ((t/=1/2) < 1) return 1/2*t*t*t*t;
            return -1/2 * ((t-=2)*t*t*t - 2);
        },
        easeInQuint: function (t) {
            return 1*(t/=1)*t*t*t*t;
        },
        easeOutQuint: function (t) {
            return 1*((t=t/1-1)*t*t*t*t + 1);
        },
        easeInOutQuint: function (t) {
            if ((t/=1/2) < 1) return 1/2*t*t*t*t*t;
            return 1/2*((t-=2)*t*t*t*t + 2);
        },
        easeInSine: function (t) {
            return -1 * Math.cos(t/1 * (Math.PI/2)) + 1;
        },
        easeOutSine: function (t) {
            return 1 * Math.sin(t/1 * (Math.PI/2));
        },
        easeInOutSine: function (t) {
            return -1/2 * (Math.cos(Math.PI*t/1) - 1);
        },
        easeInExpo: function (t) {
            return (t==0) ? 1 : 1 * Math.pow(2, 10 * (t/1 - 1));
        },
        easeOutExpo: function (t) {
            return (t==1) ? 1 : 1 * (-Math.pow(2, -10 * t/1) + 1);
        },
        easeInOutExpo: function (t) {
            if (t==0) return 0;
            if (t==1) return 1;
            if ((t/=1/2) < 1) return 1/2 * Math.pow(2, 10 * (t - 1));
            return 1/2 * (-Math.pow(2, -10 * --t) + 2);
            },
        easeInCirc: function (t) {
            if (t>=1) return t;
            return -1 * (Math.sqrt(1 - (t/=1)*t) - 1);
        },
        easeOutCirc: function (t) {
            return 1 * Math.sqrt(1 - (t=t/1-1)*t);
        },
        easeInOutCirc: function (t) {
            if ((t/=1/2) < 1) return -1/2 * (Math.sqrt(1 - t*t) - 1);
            return 1/2 * (Math.sqrt(1 - (t-=2)*t) + 1);
        },
        easeInElastic: function (t) {
            var s=1.70158;var p=0;var a=1;
            if (t==0) return 0;  if ((t/=1)==1) return 1;  if (!p) p=1*.3;
            if (a < Math.abs(1)) { a=1; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (1/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*1-s)*(2*Math.PI)/p ));
        },
        easeOutElastic: function (t) {
            var s=1.70158;var p=0;var a=1;
            if (t==0) return 0;  if ((t/=1)==1) return 1;  if (!p) p=1*.3;
            if (a < Math.abs(1)) { a=1; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (1/a);
            return a*Math.pow(2,-10*t) * Math.sin( (t*1-s)*(2*Math.PI)/p ) + 1;
        },
        easeInOutElastic: function (t) {
            var s=1.70158;var p=0;var a=1;
            if (t==0) return 0;  if ((t/=1/2)==2) return 1;  if (!p) p=1*(.3*1.5);
            if (a < Math.abs(1)) { a=1; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (1/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*1-s)*(2*Math.PI)/p ));
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*1-s)*(2*Math.PI)/p )*.5 + 1;
        },
        easeInBack: function (t) {
            var s = 1.70158;
            return 1*(t/=1)*t*((s+1)*t - s);
        },
        easeOutBack: function (t) {
            var s = 1.70158;
            return 1*((t=t/1-1)*t*((s+1)*t + s) + 1);
        },
        easeInOutBack: function (t) {
            var s = 1.70158; 
            if ((t/=1/2) < 1) return 1/2*(t*t*(((s*=(1.525))+1)*t - s));
            return 1/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2);
        },
        easeInBounce: function (t) {
            return 1 - animationOptions.easeOutBounce (1-t);
        },
        easeOutBounce: function (t) {
            if ((t/=1) < (1/2.75)) {
                return 1*(7.5625*t*t);
            } else if (t < (2/2.75)) {
                return 1*(7.5625*(t-=(1.5/2.75))*t + .75);
            } else if (t < (2.5/2.75)) {
                return 1*(7.5625*(t-=(2.25/2.75))*t + .9375);
            } else {
                return 1*(7.5625*(t-=(2.625/2.75))*t + .984375);
            }
        },
        easeInOutBounce: function (t) {
            if (t < 1/2) return animationOptions.easeInBounce (t*2) * .5;
            return animationOptions.easeOutBounce (t*2-1) * .5 + 1*.5;
        }
    };

    //Variables global to the chart
    var width = context.canvas.width;
    var height = context.canvas.height;


    //High pixel density displays - multiply the size of the canvas height/width by the device pixel ratio, then scale.
    if (window.devicePixelRatio) {
        context.canvas.style.width = width + "px";
        context.canvas.style.height = height + "px";
        context.canvas.height = height * window.devicePixelRatio;
        context.canvas.width = width * window.devicePixelRatio;
        context.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    this.PolarArea = function(data,options){
    
        chart.PolarArea.defaults = {
            scaleOverlay : true,
            scaleOverride : false,
            scaleSteps : null,
            scaleStepWidth : null,
            scaleStartValue : null,
            scaleShowLine : true,
            scaleLineColor : "rgba(0,0,0,.1)",
            scaleLineWidth : 1,
            scaleShowLabels : true,
            scaleLabel : "<%=value%>",
            scaleFontFamily : "'Arial'",
            scaleFontSize : 12,
            scaleFontStyle : "normal",
            scaleFontColor : "#666",
            scaleShowLabelBackdrop : true,
            scaleBackdropColor : "rgba(255,255,255,0.75)",
            scaleBackdropPaddingY : 2,
            scaleBackdropPaddingX : 2,
            segmentShowStroke : true,
            segmentStrokeColor : "#fff",
            segmentStrokeWidth : 2,
            animation : true,
            animationSteps : 100,
            animationEasing : "easeOutBounce",
            animateRotate : true,
            animateScale : false,
            onAnimationComplete : null
        };
        
        var config = (options)? mergeChartConfig(chart.PolarArea.defaults,options) : chart.PolarArea.defaults;
        
        return new PolarArea(data,config,context);
    };

    this.Radar = function(data,options){
    
        chart.Radar.defaults = {
            scaleOverlay : false,
            scaleOverride : false,
            scaleSteps : null,
            scaleStepWidth : null,
            scaleStartValue : null,
            scaleShowLine : true,
            scaleLineColor : "rgba(0,0,0,.1)",
            scaleLineWidth : 1,
            scaleShowLabels : false,
            scaleLabel : "<%=value%>",
            scaleFontFamily : "'Arial'",
            scaleFontSize : 12,
            scaleFontStyle : "normal",
            scaleFontColor : "#666",
            scaleShowLabelBackdrop : true,
            scaleBackdropColor : "rgba(255,255,255,0.75)",
            scaleBackdropPaddingY : 2,
            scaleBackdropPaddingX : 2,
            angleShowLineOut : true,
            angleLineColor : "rgba(0,0,0,.1)",
            angleLineWidth : 1,         
            pointLabelFontFamily : "'Arial'",
            pointLabelFontStyle : "normal",
            pointLabelFontSize : 12,
            pointLabelFontColor : "#666",
            pointDot : true,
            pointDotRadius : 3,
            pointDotStrokeWidth : 1,
            datasetStroke : true,
            datasetStrokeWidth : 2,
            datasetFill : true,
            animation : true,
            animationSteps : 60,
            animationEasing : "easeOutQuart",
            onAnimationComplete : null
        };
        
        var config = (options)? mergeChartConfig(chart.Radar.defaults,options) : chart.Radar.defaults;

        return new Radar(data,config,context);
    };
    
    this.Pie = function(data,options){
        chart.Pie.defaults = {
            segmentShowStroke : true,
            segmentStrokeColor : "#fff",
            segmentStrokeWidth : 2,
            animation : true,
            animationSteps : 100,
            animationEasing : "easeOutBounce",
            animateRotate : true,
            animateScale : false,
            onAnimationComplete : null
        };      

        var config = (options)? mergeChartConfig(chart.Pie.defaults,options) : chart.Pie.defaults;
        
        return new Pie(data,config,context);                
    };
    
    this.Doughnut = function(data,options){
    
        chart.Doughnut.defaults = {
            segmentShowStroke : true,
            segmentStrokeColor : "#fff",
            segmentStrokeWidth : 2,
            percentageInnerCutout : 50,
            animation : true,
            animationSteps : 100,
            animationEasing : "easeOutBounce",
            animateRotate : true,
            animateScale : false,
            onAnimationComplete : null
        };      

        var config = (options)? mergeChartConfig(chart.Doughnut.defaults,options) : chart.Doughnut.defaults;
        
        return new Doughnut(data,config,context);           
        
    };

    this.Line = function(data,options){
    
        chart.Line.defaults = {
            scaleOverlay : false,
            scaleOverride : false,
            scaleSteps : null,
            scaleStepWidth : null,
            scaleStartValue : null,
            scaleLineColor : "rgba(0,0,0,.1)",
            scaleLineWidth : 1,
            scaleShowLabels : true,
            scaleLabel : "<%=value%>",
            scaleFontFamily : "'Arial'",
            scaleFontSize : 12,
            scaleFontStyle : "normal",
            scaleFontColor : "#666",
            scaleShowGridLines : true,
            scaleGridLineColor : "rgba(0,0,0,.05)",
            scaleGridLineWidth : 1,
            bezierCurve : true,
            pointDot : true,
            pointDotRadius : 4,
            pointDotStrokeWidth : 2,
            datasetStroke : true,
            datasetStrokeWidth : 2,
            datasetFill : true,
            animation : true,
            animationSteps : 60,
            animationEasing : "easeOutQuart",
            onAnimationComplete : null
        };      
        var config = (options) ? mergeChartConfig(chart.Line.defaults,options) : chart.Line.defaults;
        
        return new Line(data,config,context);
    }
    
    this.Bar = function(data,options){
        chart.Bar.defaults = {
            scaleOverlay : false,
            scaleOverride : false,
            scaleSteps : null,
            scaleStepWidth : null,
            scaleStartValue : null,
            scaleLineColor : "rgba(0,0,0,.1)",
            scaleLineWidth : 1,
            scaleShowLabels : true,
            scaleLabel : "<%=value%>",
            scaleFontFamily : "'Arial'",
            scaleFontSize : 12,
            scaleFontStyle : "normal",
            scaleFontColor : "#666",
            scaleShowGridLines : true,
            scaleGridLineColor : "rgba(0,0,0,.05)",
            scaleGridLineWidth : 1,
            barShowStroke : true,
            barStrokeWidth : 2,
            barValueSpacing : 5,
            barDatasetSpacing : 1,
            animation : true,
            animationSteps : 60,
            animationEasing : "easeOutQuart",
            onAnimationComplete : null
        };      
        var config = (options) ? mergeChartConfig(chart.Bar.defaults,options) : chart.Bar.defaults;
        
        return new Bar(data,config,context);        
    }
    
    var clear = function(c){
        c.clearRect(0, 0, width, height);
    };

    var PolarArea = function(data,config,ctx){
        var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString;     
        
        
        calculateDrawingSizes();
        
        valueBounds = getValueBounds();

        labelTemplateString = (config.scaleShowLabels)? config.scaleLabel : null;

        //Check and set the scale
        if (!config.scaleOverride){
            
            calculatedScale = calculateScale(scaleHeight,valueBounds.maxSteps,valueBounds.minSteps,valueBounds.maxValue,valueBounds.minValue,labelTemplateString);
        }
        else {
            calculatedScale = {
                steps : config.scaleSteps,
                stepValue : config.scaleStepWidth,
                graphMin : config.scaleStartValue,
                labels : []
            }
            populateLabels(labelTemplateString, calculatedScale.labels,calculatedScale.steps,config.scaleStartValue,config.scaleStepWidth);
        }
        
        scaleHop = maxSize/(calculatedScale.steps);

        //Wrap in an animation loop wrapper
        animationLoop(config,drawScale,drawAllSegments,ctx);

        function calculateDrawingSizes(){
            maxSize = (Min([width,height])/2);
            //Remove whatever is larger - the font size or line width.
            
            maxSize -= Max([config.scaleFontSize*0.5,config.scaleLineWidth*0.5]);
            
            labelHeight = config.scaleFontSize*2;
            //If we're drawing the backdrop - add the Y padding to the label height and remove from drawing region.
            if (config.scaleShowLabelBackdrop){
                labelHeight += (2 * config.scaleBackdropPaddingY);
                maxSize -= config.scaleBackdropPaddingY*1.5;
            }
            
            scaleHeight = maxSize;
            //If the label height is less than 5, set it to 5 so we don't have lines on top of each other.
            labelHeight = Default(labelHeight,5);
        }
        function drawScale(){
            for (var i=0; i<calculatedScale.steps; i++){
                //If the line object is there
                if (config.scaleShowLine){
                    ctx.beginPath();
                    ctx.arc(width/2, height/2, scaleHop * (i + 1), 0, (Math.PI * 2), true);
                    ctx.strokeStyle = config.scaleLineColor;
                    ctx.lineWidth = config.scaleLineWidth;
                    ctx.stroke();
                }

                if (config.scaleShowLabels){
                    ctx.textAlign = "center";
                    ctx.font = config.scaleFontStyle + " " + config.scaleFontSize + "px " + config.scaleFontFamily;
                    var label =  calculatedScale.labels[i];
                    //If the backdrop object is within the font object
                    if (config.scaleShowLabelBackdrop){
                        var textWidth = ctx.measureText(label).width;
                        ctx.fillStyle = config.scaleBackdropColor;
                        ctx.beginPath();
                        ctx.rect(
                            Math.round(width/2 - textWidth/2 - config.scaleBackdropPaddingX),     //X
                            Math.round(height/2 - (scaleHop * (i + 1)) - config.scaleFontSize*0.5 - config.scaleBackdropPaddingY),//Y
                            Math.round(textWidth + (config.scaleBackdropPaddingX*2)), //Width
                            Math.round(config.scaleFontSize + (config.scaleBackdropPaddingY*2)) //Height
                        );
                        ctx.fill();
                    }
                    ctx.textBaseline = "middle";
                    ctx.fillStyle = config.scaleFontColor;
                    ctx.fillText(label,width/2,height/2 - (scaleHop * (i + 1)));
                }
            }
        }
        function drawAllSegments(animationDecimal){
            var startAngle = -Math.PI/2,
            angleStep = (Math.PI*2)/data.length,
            scaleAnimation = 1,
            rotateAnimation = 1;
            if (config.animation) {
                if (config.animateScale) {
                    scaleAnimation = animationDecimal;
                }
                if (config.animateRotate){
                    rotateAnimation = animationDecimal;
                }
            }

            for (var i=0; i<data.length; i++){

                ctx.beginPath();
                ctx.arc(width/2,height/2,scaleAnimation * calculateOffset(data[i].value,calculatedScale,scaleHop),startAngle, startAngle + rotateAnimation*angleStep, false);
                ctx.lineTo(width/2,height/2);
                ctx.closePath();
                ctx.fillStyle = data[i].color;
                ctx.fill();

                if(config.segmentShowStroke){
                    ctx.strokeStyle = config.segmentStrokeColor;
                    ctx.lineWidth = config.segmentStrokeWidth;
                    ctx.stroke();
                }
                startAngle += rotateAnimation*angleStep;
            }
        }
        function getValueBounds() {
            var upperValue = Number.MIN_VALUE;
            var lowerValue = Number.MAX_VALUE;
            for (var i=0; i<data.length; i++){
                if (data[i].value > upperValue) {upperValue = data[i].value;}
                if (data[i].value < lowerValue) {lowerValue = data[i].value;}
            };

            var maxSteps = Math.floor((scaleHeight / (labelHeight*0.66)));
            var minSteps = Math.floor((scaleHeight / labelHeight*0.5));
            
            return {
                maxValue : upperValue,
                minValue : lowerValue,
                maxSteps : maxSteps,
                minSteps : minSteps
            };
            

        }
    }

    var Radar = function (data,config,ctx) {
        var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString; 
            
        //If no labels are defined set to an empty array, so referencing length for looping doesn't blow up.
        if (!data.labels) data.labels = [];
        
        calculateDrawingSizes();

        var valueBounds = getValueBounds();

        labelTemplateString = (config.scaleShowLabels)? config.scaleLabel : null;

        //Check and set the scale
        if (!config.scaleOverride){
            
            calculatedScale = calculateScale(scaleHeight,valueBounds.maxSteps,valueBounds.minSteps,valueBounds.maxValue,valueBounds.minValue,labelTemplateString);
        }
        else {
            calculatedScale = {
                steps : config.scaleSteps,
                stepValue : config.scaleStepWidth,
                graphMin : config.scaleStartValue,
                labels : []
            }
            populateLabels(labelTemplateString, calculatedScale.labels,calculatedScale.steps,config.scaleStartValue,config.scaleStepWidth);
        }
        
        scaleHop = maxSize/(calculatedScale.steps);
        
        animationLoop(config,drawScale,drawAllDataPoints,ctx);
        
        //Radar specific functions.
        function drawAllDataPoints(animationDecimal){
            var rotationDegree = (2*Math.PI)/data.datasets[0].data.length;

            ctx.save();
            //translate to the centre of the canvas.
            ctx.translate(width/2,height/2);
            
            //We accept multiple data sets for radar charts, so show loop through each set
            for (var i=0; i<data.datasets.length; i++){
                ctx.beginPath();

                ctx.moveTo(0,animationDecimal*(-1*calculateOffset(data.datasets[i].data[0],calculatedScale,scaleHop)));
                for (var j=1; j<data.datasets[i].data.length; j++){
                    ctx.rotate(rotationDegree); 
                    ctx.lineTo(0,animationDecimal*(-1*calculateOffset(data.datasets[i].data[j],calculatedScale,scaleHop)));
            
                }
                ctx.closePath();
                
                
                ctx.fillStyle = data.datasets[i].fillColor;
                ctx.strokeStyle = data.datasets[i].strokeColor;
                ctx.lineWidth = config.datasetStrokeWidth;
                ctx.fill();
                ctx.stroke();
                
                                
                if (config.pointDot){
                    ctx.fillStyle = data.datasets[i].pointColor;
                    ctx.strokeStyle = data.datasets[i].pointStrokeColor;
                    ctx.lineWidth = config.pointDotStrokeWidth;
                    for (var k=0; k<data.datasets[i].data.length; k++){
                        ctx.rotate(rotationDegree);
                        ctx.beginPath();
                        ctx.arc(0,animationDecimal*(-1*calculateOffset(data.datasets[i].data[k],calculatedScale,scaleHop)),config.pointDotRadius,2*Math.PI,false);
                        ctx.fill();
                        ctx.stroke();
                    }                   
                    
                }
                ctx.rotate(rotationDegree);
                
            }
            ctx.restore();
            
            
        }
        function drawScale(){
            var rotationDegree = (2*Math.PI)/data.datasets[0].data.length;
            ctx.save();
            ctx.translate(width / 2, height / 2);   
            
            if (config.angleShowLineOut){
                ctx.strokeStyle = config.angleLineColor;                    
                ctx.lineWidth = config.angleLineWidth;
                for (var h=0; h<data.datasets[0].data.length; h++){
                    
                    ctx.rotate(rotationDegree);
                    ctx.beginPath();
                    ctx.moveTo(0,0);
                    ctx.lineTo(0,-maxSize);
                    ctx.stroke();
                }
            }

            for (var i=0; i<calculatedScale.steps; i++){
                ctx.beginPath();
                
                if(config.scaleShowLine){
                    ctx.strokeStyle = config.scaleLineColor;
                    ctx.lineWidth = config.scaleLineWidth;
                    ctx.moveTo(0,-scaleHop * (i+1));                    
                    for (var j=0; j<data.datasets[0].data.length; j++){
                        ctx.rotate(rotationDegree);
                        ctx.lineTo(0,-scaleHop * (i+1));
                    }
                    ctx.closePath();
                    ctx.stroke();           
                            
                }
                
                if (config.scaleShowLabels){                
                    ctx.textAlign = 'center';
                    ctx.font = config.scaleFontStyle + " " + config.scaleFontSize+"px " + config.scaleFontFamily; 
                    ctx.textBaseline = "middle";
                    
                    if (config.scaleShowLabelBackdrop){
                        var textWidth = ctx.measureText(calculatedScale.labels[i]).width;
                        ctx.fillStyle = config.scaleBackdropColor;
                        ctx.beginPath();
                        ctx.rect(
                            Math.round(- textWidth/2 - config.scaleBackdropPaddingX),     //X
                            Math.round((-scaleHop * (i + 1)) - config.scaleFontSize*0.5 - config.scaleBackdropPaddingY),//Y
                            Math.round(textWidth + (config.scaleBackdropPaddingX*2)), //Width
                            Math.round(config.scaleFontSize + (config.scaleBackdropPaddingY*2)) //Height
                        );
                        ctx.fill();
                    }                       
                    ctx.fillStyle = config.scaleFontColor;
                    ctx.fillText(calculatedScale.labels[i],0,-scaleHop*(i+1));
                }

            }
            for (var k=0; k<data.labels.length; k++){               
            ctx.font = config.pointLabelFontStyle + " " + config.pointLabelFontSize+"px " + config.pointLabelFontFamily;
            ctx.fillStyle = config.pointLabelFontColor;
                var opposite = Math.sin(rotationDegree*k) * (maxSize + config.pointLabelFontSize);
                var adjacent = Math.cos(rotationDegree*k) * (maxSize + config.pointLabelFontSize);
                
                if(rotationDegree*k == Math.PI || rotationDegree*k == 0){
                    ctx.textAlign = "center";
                }
                else if(rotationDegree*k > Math.PI){
                    ctx.textAlign = "right";
                }
                else{
                    ctx.textAlign = "left";
                }
                
                ctx.textBaseline = "middle";
                
                ctx.fillText(data.labels[k],opposite,-adjacent);
                
            }
            ctx.restore();
        };
        function calculateDrawingSizes(){
            maxSize = (Min([width,height])/2);

            labelHeight = config.scaleFontSize*2;
            
            var labelLength = 0;
            for (var i=0; i<data.labels.length; i++){
                ctx.font = config.pointLabelFontStyle + " " + config.pointLabelFontSize+"px " + config.pointLabelFontFamily;
                var textMeasurement = ctx.measureText(data.labels[i]).width;
                if(textMeasurement>labelLength) labelLength = textMeasurement;
            }
            
            //Figure out whats the largest - the height of the text or the width of what's there, and minus it from the maximum usable size.
            maxSize -= Max([labelLength,((config.pointLabelFontSize/2)*1.5)]);              
            
            maxSize -= config.pointLabelFontSize;
            maxSize = CapValue(maxSize, null, 0);
            scaleHeight = maxSize;
            //If the label height is less than 5, set it to 5 so we don't have lines on top of each other.
            labelHeight = Default(labelHeight,5);
        };
        function getValueBounds() {
            var upperValue = Number.MIN_VALUE;
            var lowerValue = Number.MAX_VALUE;
            
            for (var i=0; i<data.datasets.length; i++){
                for (var j=0; j<data.datasets[i].data.length; j++){
                    if (data.datasets[i].data[j] > upperValue){upperValue = data.datasets[i].data[j]}
                    if (data.datasets[i].data[j] < lowerValue){lowerValue = data.datasets[i].data[j]}
                }
            }

            var maxSteps = Math.floor((scaleHeight / (labelHeight*0.66)));
            var minSteps = Math.floor((scaleHeight / labelHeight*0.5));
            
            return {
                maxValue : upperValue,
                minValue : lowerValue,
                maxSteps : maxSteps,
                minSteps : minSteps
            };
            

        }
    }

    var Pie = function(data,config,ctx){
        var segmentTotal = 0;
        
        //In case we have a canvas that is not a square. Minus 5 pixels as padding round the edge.
        var pieRadius = Min([height/2,width/2]) - 5;
        
        for (var i=0; i<data.length; i++){
            segmentTotal += data[i].value;
        }
        
        
        animationLoop(config,null,drawPieSegments,ctx);
                
        function drawPieSegments (animationDecimal){
            var cumulativeAngle = -Math.PI/2,
            scaleAnimation = 1,
            rotateAnimation = 1;
            if (config.animation) {
                if (config.animateScale) {
                    scaleAnimation = animationDecimal;
                }
                if (config.animateRotate){
                    rotateAnimation = animationDecimal;
                }
            }
            for (var i=0; i<data.length; i++){
                var segmentAngle = rotateAnimation * ((data[i].value/segmentTotal) * (Math.PI*2));
                ctx.beginPath();
                ctx.arc(width/2,height/2,scaleAnimation * pieRadius,cumulativeAngle,cumulativeAngle + segmentAngle);
                ctx.lineTo(width/2,height/2);
                ctx.closePath();
                ctx.fillStyle = data[i].color;
                ctx.fill();
                
                if(config.segmentShowStroke){
                    ctx.lineWidth = config.segmentStrokeWidth;
                    ctx.strokeStyle = config.segmentStrokeColor;
                    ctx.stroke();
                }
                cumulativeAngle += segmentAngle;
            }           
        }       
    }

    var Doughnut = function(data,config,ctx){
        var segmentTotal = 0;
        
        //In case we have a canvas that is not a square. Minus 5 pixels as padding round the edge.
        var doughnutRadius = Min([height/2,width/2]) - 5;
        
        var cutoutRadius = doughnutRadius * (config.percentageInnerCutout/100);
        
        for (var i=0; i<data.length; i++){
            segmentTotal += data[i].value;
        }
        
        
        animationLoop(config,null,drawPieSegments,ctx);
        
        
        function drawPieSegments (animationDecimal){
            var cumulativeAngle = -Math.PI/2,
            scaleAnimation = 1,
            rotateAnimation = 1;
            if (config.animation) {
                if (config.animateScale) {
                    scaleAnimation = animationDecimal;
                }
                if (config.animateRotate){
                    rotateAnimation = animationDecimal;
                }
            }
            for (var i=0; i<data.length; i++){
                var segmentAngle = rotateAnimation * ((data[i].value/segmentTotal) * (Math.PI*2));
                ctx.beginPath();
                ctx.arc(width/2,height/2,scaleAnimation * doughnutRadius,cumulativeAngle,cumulativeAngle + segmentAngle,false);
                ctx.arc(width/2,height/2,scaleAnimation * cutoutRadius,cumulativeAngle + segmentAngle,cumulativeAngle,true);
                ctx.closePath();
                ctx.fillStyle = data[i].color;
                ctx.fill();
                
                if(config.segmentShowStroke){
                    ctx.lineWidth = config.segmentStrokeWidth;
                    ctx.strokeStyle = config.segmentStrokeColor;
                    ctx.stroke();
                }
                cumulativeAngle += segmentAngle;
            }           
        }           
        
        
        
    }

    var Line = function(data,config,ctx){
        var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString, valueHop,widestXLabel, xAxisLength,yAxisPosX,xAxisPosY, rotateLabels = 0;
            
        calculateDrawingSizes();
        
        valueBounds = getValueBounds();
        //Check and set the scale
        labelTemplateString = (config.scaleShowLabels)? config.scaleLabel : "";
        if (!config.scaleOverride){
            
            calculatedScale = calculateScale(scaleHeight,valueBounds.maxSteps,valueBounds.minSteps,valueBounds.maxValue,valueBounds.minValue,labelTemplateString);
        }
        else {
            calculatedScale = {
                steps : config.scaleSteps,
                stepValue : config.scaleStepWidth,
                graphMin : config.scaleStartValue,
                labels : []
            }
            populateLabels(labelTemplateString, calculatedScale.labels,calculatedScale.steps,config.scaleStartValue,config.scaleStepWidth);
        }
        
        scaleHop = Math.floor(scaleHeight/calculatedScale.steps);
        calculateXAxisSize();
        animationLoop(config,drawScale,drawLines,ctx);      
        
        function drawLines(animPc){
            for (var i=0; i<data.datasets.length; i++){
                ctx.strokeStyle = data.datasets[i].strokeColor;
                ctx.lineWidth = config.datasetStrokeWidth;
                ctx.beginPath();
                ctx.moveTo(yAxisPosX, xAxisPosY - animPc*(calculateOffset(data.datasets[i].data[0],calculatedScale,scaleHop)))

                for (var j=1; j<data.datasets[i].data.length; j++){
                    if (config.bezierCurve){
                        ctx.bezierCurveTo(xPos(j-0.5),yPos(i,j-1),xPos(j-0.5),yPos(i,j),xPos(j),yPos(i,j));
                    }
                    else{
                        ctx.lineTo(xPos(j),yPos(i,j));
                    }
                }
                ctx.stroke();
                if (config.datasetFill){
                    ctx.lineTo(yAxisPosX + (valueHop*(data.datasets[i].data.length-1)),xAxisPosY);
                    ctx.lineTo(yAxisPosX,xAxisPosY);
                    ctx.closePath();
                    ctx.fillStyle = data.datasets[i].fillColor;
                    ctx.fill();
                }
                else{
                    ctx.closePath();
                }
                if(config.pointDot){
                    ctx.fillStyle = data.datasets[i].pointColor;
                    ctx.strokeStyle = data.datasets[i].pointStrokeColor;
                    ctx.lineWidth = config.pointDotStrokeWidth;
                    for (var k=0; k<data.datasets[i].data.length; k++){
                        ctx.beginPath();
                        ctx.arc(yAxisPosX + (valueHop *k),xAxisPosY - animPc*(calculateOffset(data.datasets[i].data[k],calculatedScale,scaleHop)),config.pointDotRadius,0,Math.PI*2,true);
                        ctx.fill();
                        ctx.stroke();
                    }
                }
            }
            
            function yPos(dataSet,iteration){
                return xAxisPosY - animPc*(calculateOffset(data.datasets[dataSet].data[iteration],calculatedScale,scaleHop));           
            }
            function xPos(iteration){
                return yAxisPosX + (valueHop * iteration);
            }
        }
        function drawScale(){
            //X axis line
            ctx.lineWidth = config.scaleLineWidth;
            ctx.strokeStyle = config.scaleLineColor;
            ctx.beginPath();
            ctx.moveTo(width-widestXLabel/2+5,xAxisPosY);
            ctx.lineTo(width-(widestXLabel/2)-xAxisLength-5,xAxisPosY);
            ctx.stroke();
            
            
            if (rotateLabels > 0){
                ctx.save();
                ctx.textAlign = "right";
            }
            else{
                ctx.textAlign = "center";
            }
            ctx.fillStyle = config.scaleFontColor;
            for (var i=0; i<data.labels.length; i++){
                ctx.save();
                if (rotateLabels > 0){
                    ctx.translate(yAxisPosX + i*valueHop,xAxisPosY + config.scaleFontSize);
                    ctx.rotate(-(rotateLabels * (Math.PI/180)));
                    ctx.fillText(data.labels[i], 0,0);
                    ctx.restore();
                }
                
                else{
                    ctx.fillText(data.labels[i], yAxisPosX + i*valueHop,xAxisPosY + config.scaleFontSize+3);                    
                }

                ctx.beginPath();
                ctx.moveTo(yAxisPosX + i * valueHop, xAxisPosY+3);
                
                //Check i isnt 0, so we dont go over the Y axis twice.
                if(config.scaleShowGridLines && i>0){
                    ctx.lineWidth = config.scaleGridLineWidth;
                    ctx.strokeStyle = config.scaleGridLineColor;                    
                    ctx.lineTo(yAxisPosX + i * valueHop, 5);
                }
                else{
                    ctx.lineTo(yAxisPosX + i * valueHop, xAxisPosY+3);              
                }
                ctx.stroke();
            }
            
            //Y axis
            ctx.lineWidth = config.scaleLineWidth;
            ctx.strokeStyle = config.scaleLineColor;
            ctx.beginPath();
            ctx.moveTo(yAxisPosX,xAxisPosY+5);
            ctx.lineTo(yAxisPosX,5);
            ctx.stroke();
            
            ctx.textAlign = "right";
            ctx.textBaseline = "middle";
            for (var j=0; j<calculatedScale.steps; j++){
                ctx.beginPath();
                ctx.moveTo(yAxisPosX-3,xAxisPosY - ((j+1) * scaleHop));
                if (config.scaleShowGridLines){
                    ctx.lineWidth = config.scaleGridLineWidth;
                    ctx.strokeStyle = config.scaleGridLineColor;
                    ctx.lineTo(yAxisPosX + xAxisLength + 5,xAxisPosY - ((j+1) * scaleHop));                 
                }
                else{
                    ctx.lineTo(yAxisPosX-0.5,xAxisPosY - ((j+1) * scaleHop));
                }
                
                ctx.stroke();
                
                if (config.scaleShowLabels){
                    ctx.fillText(calculatedScale.labels[j],yAxisPosX-8,xAxisPosY - ((j+1) * scaleHop));
                }
            }
            
            
        }
        function calculateXAxisSize(){
            var longestText = 1;
            //if we are showing the labels
            if (config.scaleShowLabels){
                ctx.font = config.scaleFontStyle + " " + config.scaleFontSize+"px " + config.scaleFontFamily;
                for (var i=0; i<calculatedScale.labels.length; i++){
                    var measuredText = ctx.measureText(calculatedScale.labels[i]).width;
                    longestText = (measuredText > longestText)? measuredText : longestText;
                }
                //Add a little extra padding from the y axis
                longestText +=10;
            }
            xAxisLength = width - longestText - widestXLabel;
            valueHop = Math.floor(xAxisLength/(data.labels.length-1));  
                
            yAxisPosX = width-widestXLabel/2-xAxisLength;
            xAxisPosY = scaleHeight + config.scaleFontSize/2;               
        }       
        function calculateDrawingSizes(){
            maxSize = height;

            //Need to check the X axis first - measure the length of each text metric, and figure out if we need to rotate by 45 degrees.
            ctx.font = config.scaleFontStyle + " " + config.scaleFontSize+"px " + config.scaleFontFamily;
            widestXLabel = 1;
            for (var i=0; i<data.labels.length; i++){
                var textLength = ctx.measureText(data.labels[i]).width;
                //If the text length is longer - make that equal to longest text!
                widestXLabel = (textLength > widestXLabel)? textLength : widestXLabel;
            }
            if (width/data.labels.length < widestXLabel){
                rotateLabels = 45;
                if (width/data.labels.length < Math.cos(rotateLabels) * widestXLabel){
                    rotateLabels = 90;
                    maxSize -= widestXLabel; 
                }
                else{
                    maxSize -= Math.sin(rotateLabels) * widestXLabel;
                }
            }
            else{
                maxSize -= config.scaleFontSize;
            }
            
            //Add a little padding between the x line and the text
            maxSize -= 5;
            
            
            labelHeight = config.scaleFontSize;
            
            maxSize -= labelHeight;
            //Set 5 pixels greater than the font size to allow for a little padding from the X axis.
            
            scaleHeight = maxSize;
            
            //Then get the area above we can safely draw on.
            
        }       
        function getValueBounds() {
            var upperValue = Number.MIN_VALUE;
            var lowerValue = Number.MAX_VALUE;
            for (var i=0; i<data.datasets.length; i++){
                for (var j=0; j<data.datasets[i].data.length; j++){
                    if ( data.datasets[i].data[j] > upperValue) { upperValue = data.datasets[i].data[j] };
                    if ( data.datasets[i].data[j] < lowerValue) { lowerValue = data.datasets[i].data[j] };
                }
            };
    
            var maxSteps = Math.floor((scaleHeight / (labelHeight*0.66)));
            var minSteps = Math.floor((scaleHeight / labelHeight*0.5));
            
            return {
                maxValue : upperValue,
                minValue : lowerValue,
                maxSteps : maxSteps,
                minSteps : minSteps
            };
            
    
        }

        
    }
    
    var Bar = function(data,config,ctx){
        var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString, valueHop,widestXLabel, xAxisLength,yAxisPosX,xAxisPosY,barWidth, rotateLabels = 0;
            
        calculateDrawingSizes();
        
        valueBounds = getValueBounds();
        //Check and set the scale
        labelTemplateString = (config.scaleShowLabels)? config.scaleLabel : "";
        if (!config.scaleOverride){
            
            calculatedScale = calculateScale(scaleHeight,valueBounds.maxSteps,valueBounds.minSteps,valueBounds.maxValue,valueBounds.minValue,labelTemplateString);
        }
        else {
            calculatedScale = {
                steps : config.scaleSteps,
                stepValue : config.scaleStepWidth,
                graphMin : config.scaleStartValue,
                labels : []
            }
            populateLabels(labelTemplateString, calculatedScale.labels,calculatedScale.steps,config.scaleStartValue,config.scaleStepWidth);
        }
        
        scaleHop = Math.floor(scaleHeight/calculatedScale.steps);
        calculateXAxisSize();
        animationLoop(config,drawScale,drawBars,ctx);       
        
        function drawBars(animPc){
            ctx.lineWidth = config.barStrokeWidth;
            for (var i=0; i<data.datasets.length; i++){
                    ctx.fillStyle = data.datasets[i].fillColor;
                    ctx.strokeStyle = data.datasets[i].strokeColor;
                for (var j=0; j<data.datasets[i].data.length; j++){
                    var barOffset = yAxisPosX + config.barValueSpacing + valueHop*j + barWidth*i + config.barDatasetSpacing*i + config.barStrokeWidth*i;
                    
                    ctx.beginPath();
                    ctx.moveTo(barOffset, xAxisPosY);
                    ctx.lineTo(barOffset, xAxisPosY - animPc*calculateOffset(data.datasets[i].data[j],calculatedScale,scaleHop)+(config.barStrokeWidth/2));
                    ctx.lineTo(barOffset + barWidth, xAxisPosY - animPc*calculateOffset(data.datasets[i].data[j],calculatedScale,scaleHop)+(config.barStrokeWidth/2));
                    ctx.lineTo(barOffset + barWidth, xAxisPosY);
                    if(config.barShowStroke){
                        ctx.stroke();
                    }
                    ctx.closePath();
                    ctx.fill();
                }
            }
            
        }
        function drawScale(){
            //X axis line
            ctx.lineWidth = config.scaleLineWidth;
            ctx.strokeStyle = config.scaleLineColor;
            ctx.beginPath();
            ctx.moveTo(width-widestXLabel/2+5,xAxisPosY);
            ctx.lineTo(width-(widestXLabel/2)-xAxisLength-5,xAxisPosY);
            ctx.stroke();
            
            
            if (rotateLabels > 0){
                ctx.save();
                ctx.textAlign = "right";
            }
            else{
                ctx.textAlign = "center";
            }
            ctx.fillStyle = config.scaleFontColor;
            for (var i=0; i<data.labels.length; i++){
                ctx.save();
                if (rotateLabels > 0){
                    ctx.translate(yAxisPosX + i*valueHop,xAxisPosY + config.scaleFontSize);
                    ctx.rotate(-(rotateLabels * (Math.PI/180)));
                    ctx.fillText(data.labels[i], 0,0);
                    ctx.restore();
                }
                
                else{
                    ctx.fillText(data.labels[i], yAxisPosX + i*valueHop + valueHop/2,xAxisPosY + config.scaleFontSize+3);                   
                }

                ctx.beginPath();
                ctx.moveTo(yAxisPosX + (i+1) * valueHop, xAxisPosY+3);
                
                //Check i isnt 0, so we dont go over the Y axis twice.
                    ctx.lineWidth = config.scaleGridLineWidth;
                    ctx.strokeStyle = config.scaleGridLineColor;                    
                    ctx.lineTo(yAxisPosX + (i+1) * valueHop, 5);
                ctx.stroke();
            }
            
            //Y axis
            ctx.lineWidth = config.scaleLineWidth;
            ctx.strokeStyle = config.scaleLineColor;
            ctx.beginPath();
            ctx.moveTo(yAxisPosX,xAxisPosY+5);
            ctx.lineTo(yAxisPosX,5);
            ctx.stroke();
            
            ctx.textAlign = "right";
            ctx.textBaseline = "middle";
            for (var j=0; j<calculatedScale.steps; j++){
                ctx.beginPath();
                ctx.moveTo(yAxisPosX-3,xAxisPosY - ((j+1) * scaleHop));
                if (config.scaleShowGridLines){
                    ctx.lineWidth = config.scaleGridLineWidth;
                    ctx.strokeStyle = config.scaleGridLineColor;
                    ctx.lineTo(yAxisPosX + xAxisLength + 5,xAxisPosY - ((j+1) * scaleHop));                 
                }
                else{
                    ctx.lineTo(yAxisPosX-0.5,xAxisPosY - ((j+1) * scaleHop));
                }
                
                ctx.stroke();
                if (config.scaleShowLabels){
                    ctx.fillText(calculatedScale.labels[j],yAxisPosX-8,xAxisPosY - ((j+1) * scaleHop));
                }
            }
            
            
        }
        function calculateXAxisSize(){
            var longestText = 1;
            //if we are showing the labels
            if (config.scaleShowLabels){
                ctx.font = config.scaleFontStyle + " " + config.scaleFontSize+"px " + config.scaleFontFamily;
                for (var i=0; i<calculatedScale.labels.length; i++){
                    var measuredText = ctx.measureText(calculatedScale.labels[i]).width;
                    longestText = (measuredText > longestText)? measuredText : longestText;
                }
                //Add a little extra padding from the y axis
                longestText +=10;
            }
            xAxisLength = width - longestText - widestXLabel;
            valueHop = Math.floor(xAxisLength/(data.labels.length));    
            
            barWidth = (valueHop - config.scaleGridLineWidth*2 - (config.barValueSpacing*2) - (config.barDatasetSpacing*data.datasets.length-1) - ((config.barStrokeWidth/2)*data.datasets.length-1))/data.datasets.length;
            
            yAxisPosX = width-widestXLabel/2-xAxisLength;
            xAxisPosY = scaleHeight + config.scaleFontSize/2;               
        }       
        function calculateDrawingSizes(){
            maxSize = height;

            //Need to check the X axis first - measure the length of each text metric, and figure out if we need to rotate by 45 degrees.
            ctx.font = config.scaleFontStyle + " " + config.scaleFontSize+"px " + config.scaleFontFamily;
            widestXLabel = 1;
            for (var i=0; i<data.labels.length; i++){
                var textLength = ctx.measureText(data.labels[i]).width;
                //If the text length is longer - make that equal to longest text!
                widestXLabel = (textLength > widestXLabel)? textLength : widestXLabel;
            }
            if (width/data.labels.length < widestXLabel){
                rotateLabels = 45;
                if (width/data.labels.length < Math.cos(rotateLabels) * widestXLabel){
                    rotateLabels = 90;
                    maxSize -= widestXLabel; 
                }
                else{
                    maxSize -= Math.sin(rotateLabels) * widestXLabel;
                }
            }
            else{
                maxSize -= config.scaleFontSize;
            }
            
            //Add a little padding between the x line and the text
            maxSize -= 5;
            
            
            labelHeight = config.scaleFontSize;
            
            maxSize -= labelHeight;
            //Set 5 pixels greater than the font size to allow for a little padding from the X axis.
            
            scaleHeight = maxSize;
            
            //Then get the area above we can safely draw on.
            
        }       
        function getValueBounds() {
            var upperValue = Number.MIN_VALUE;
            var lowerValue = Number.MAX_VALUE;
            for (var i=0; i<data.datasets.length; i++){
                for (var j=0; j<data.datasets[i].data.length; j++){
                    if ( data.datasets[i].data[j] > upperValue) { upperValue = data.datasets[i].data[j] };
                    if ( data.datasets[i].data[j] < lowerValue) { lowerValue = data.datasets[i].data[j] };
                }
            };
    
            var maxSteps = Math.floor((scaleHeight / (labelHeight*0.66)));
            var minSteps = Math.floor((scaleHeight / labelHeight*0.5));
            
            return {
                maxValue : upperValue,
                minValue : lowerValue,
                maxSteps : maxSteps,
                minSteps : minSteps
            };
            
    
        }
    }
    
    function calculateOffset(val,calculatedScale,scaleHop){
        var outerValue = calculatedScale.steps * calculatedScale.stepValue;
        var adjustedValue = val - calculatedScale.graphMin;
        var scalingFactor = CapValue(adjustedValue/outerValue,1,0);
        return (scaleHop*calculatedScale.steps) * scalingFactor;
    }
    
    function animationLoop(config,drawScale,drawData,ctx){
        var animFrameAmount = (config.animation)? 1/CapValue(config.animationSteps,Number.MAX_VALUE,1) : 1,
            easingFunction = animationOptions[config.animationEasing],
            percentAnimComplete =(config.animation)? 0 : 1;
        
    
        
        if (typeof drawScale !== "function") drawScale = function(){};
        
        requestAnimFrame(animLoop);
        
        function animateFrame(){
            var easeAdjustedAnimationPercent =(config.animation)? CapValue(easingFunction(percentAnimComplete),null,0) : 1;
            clear(ctx);
            if(config.scaleOverlay){
                drawData(easeAdjustedAnimationPercent);
                drawScale();
            } else {
                drawScale();
                drawData(easeAdjustedAnimationPercent);
            }               
        }
        function animLoop(){
            //We need to check if the animation is incomplete (less than 1), or complete (1).
                percentAnimComplete += animFrameAmount;
                animateFrame(); 
                //Stop the loop continuing forever
                if (percentAnimComplete <= 1){
                    requestAnimFrame(animLoop);
                }
                else{
                    if (typeof config.onAnimationComplete == "function") config.onAnimationComplete();
                }
            
        }       
        
    }

    //Declare global functions to be called within this namespace here.
    
    
    // shim layer with setTimeout fallback
    var requestAnimFrame = (function(){
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    function calculateScale(drawingHeight,maxSteps,minSteps,maxValue,minValue,labelTemplateString){
            var graphMin,graphMax,graphRange,stepValue,numberOfSteps,valueRange,rangeOrderOfMagnitude,decimalNum;
            
            valueRange = maxValue - minValue;
            
            rangeOrderOfMagnitude = calculateOrderOfMagnitude(valueRange);

            graphMin = Math.floor(minValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude);
            
            graphMax = Math.ceil(maxValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude);
            
            graphRange = graphMax - graphMin;
            
            stepValue = Math.pow(10, rangeOrderOfMagnitude);
            
            numberOfSteps = Math.round(graphRange / stepValue);
            
            //Compare number of steps to the max and min for that size graph, and add in half steps if need be.         
            while(numberOfSteps < minSteps || numberOfSteps > maxSteps) {
                if (numberOfSteps < minSteps){
                    stepValue /= 2;
                    numberOfSteps = Math.round(graphRange/stepValue);
                }
                else{
                    stepValue *=2;
                    numberOfSteps = Math.round(graphRange/stepValue);
                }
            };

            var labels = [];
            populateLabels(labelTemplateString, labels, numberOfSteps, graphMin, stepValue);
        
            return {
                steps : numberOfSteps,
                stepValue : stepValue,
                graphMin : graphMin,
                labels : labels             
                
            }
        
            function calculateOrderOfMagnitude(val){
              return Math.floor(Math.log(val) / Math.LN10);
            }       


    }

    //Populate an array of all the labels by interpolating the string.
    function populateLabels(labelTemplateString, labels, numberOfSteps, graphMin, stepValue) {
        if (labelTemplateString) {
            //Fix floating point errors by setting to fixed the on the same decimal as the stepValue.
            for (var i = 1; i < numberOfSteps + 1; i++) {
                labels.push(tmpl(labelTemplateString, {value: (graphMin + (stepValue * i)).toFixed(getDecimalPlaces(stepValue))}));
            }
        }
    }
    
    //Max value from array
    function Max( array ){
        return Math.max.apply( Math, array );
    };
    //Min value from array
    function Min( array ){
        return Math.min.apply( Math, array );
    };
    //Default if undefined
    function Default(userDeclared,valueIfFalse){
        if(!userDeclared){
            return valueIfFalse;
        } else {
            return userDeclared;
        }
    };
    //Is a number function
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    //Apply cap a value at a high or low number
    function CapValue(valueToCap, maxValue, minValue){
        if(isNumber(maxValue)) {
            if( valueToCap > maxValue ) {
                return maxValue;
            }
        }
        if(isNumber(minValue)){
            if ( valueToCap < minValue ){
                return minValue;
            }
        }
        return valueToCap;
    }
    function getDecimalPlaces (num){
        var numberOfDecimalPlaces;
        if (num%1!=0){
            return num.toString().split(".")[1].length
        }
        else{
            return 0;
        }
        
    } 
    
    function mergeChartConfig(defaults,userDefined){
        var returnObj = {};
        for (var attrname in defaults) { returnObj[attrname] = defaults[attrname]; }
        for (var attrname in userDefined) { returnObj[attrname] = userDefined[attrname]; }
        return returnObj;
    }
    
    //Javascript micro templating by John Resig - source at http://ejohn.org/blog/javascript-micro-templating/
      var cache = {};
     
      function tmpl(str, data){
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
        var fn = !/\W/.test(str) ?
          cache[str] = cache[str] ||
            tmpl(document.getElementById(str).innerHTML) :
         
          // Generate a reusable function that will serve as a template
          // generator (and which will be cached).
          new Function("obj",
            "var p=[],print=function(){p.push.apply(p,arguments);};" +
           
            // Introduce the data as local variables using with(){}
            "with(obj){p.push('" +
           
            // Convert the template into pure JavaScript
            str
              .replace(/[\r\t\n]/g, " ")
              .split("<%").join("\t")
              .replace(/((^|%>)[^\t]*)'/g, "$1\r")
              .replace(/\t=(.*?)%>/g, "',$1,'")
              .split("\t").join("');")
              .split("%>").join("p.push('")
              .split("\r").join("\\'")
          + "');}return p.join('');");
       
        // Provide some basic currying to the user
        return data ? fn( data ) : fn;
      };
};

















/* Tooltipster v3.2.6 */;(function(e,t,n){function s(t,n){this.bodyOverflowX;this.callbacks={hide:[],show:[]};this.checkInterval=null;this.Content;this.$el=e(t);this.$elProxy;this.elProxyPosition;this.enabled=true;this.options=e.extend({},i,n);this.mouseIsOverProxy=false;this.namespace="tooltipster-"+Math.round(Math.random()*1e5);this.Status="hidden";this.timerHide=null;this.timerShow=null;this.$tooltip;this.options.iconTheme=this.options.iconTheme.replace(".","");this.options.theme=this.options.theme.replace(".","");this._init()}function o(t,n){var r=true;e.each(t,function(e,i){if(typeof n[e]==="undefined"||t[e]!==n[e]){r=false;return false}});return r}function f(){return!a&&u}function l(){var e=n.body||n.documentElement,t=e.style,r="transition";if(typeof t[r]=="string"){return true}v=["Moz","Webkit","Khtml","O","ms"],r=r.charAt(0).toUpperCase()+r.substr(1);for(var i=0;i<v.length;i++){if(typeof t[v[i]+r]=="string"){return true}}return false}var r="tooltipster",i={animation:"fade",arrow:true,arrowColor:"",autoClose:true,content:null,contentAsHTML:false,contentCloning:true,debug:true,delay:200,minWidth:0,maxWidth:null,functionInit:function(e,t){},functionBefore:function(e,t){t()},functionReady:function(e,t){},functionAfter:function(e){},icon:"(?)",iconCloning:true,iconDesktop:false,iconTouch:false,iconTheme:"tooltipster-icon",interactive:false,interactiveTolerance:350,multiple:false,offsetX:0,offsetY:0,onlyOne:false,position:"top",positionTracker:false,speed:350,timer:0,theme:"tooltipster-default",touchDevices:true,trigger:"hover",updateAnimation:true};s.prototype={_init:function(){var t=this;if(n.querySelector){if(t.options.content!==null){t._content_set(t.options.content)}else{var r=t.$el.attr("title");if(typeof r==="undefined")r=null;t._content_set(r)}var i=t.options.functionInit.call(t.$el,t.$el,t.Content);if(typeof i!=="undefined")t._content_set(i);t.$el.removeAttr("title").addClass("tooltipstered");if(!u&&t.options.iconDesktop||u&&t.options.iconTouch){if(typeof t.options.icon==="string"){t.$elProxy=e('<span class="'+t.options.iconTheme+'"></span>');t.$elProxy.text(t.options.icon)}else{if(t.options.iconCloning)t.$elProxy=t.options.icon.clone(true);else t.$elProxy=t.options.icon}t.$elProxy.insertAfter(t.$el)}else{t.$elProxy=t.$el}if(t.options.trigger=="hover"){t.$elProxy.on("mouseenter."+t.namespace,function(){if(!f()||t.options.touchDevices){t.mouseIsOverProxy=true;t._show()}}).on("mouseleave."+t.namespace,function(){if(!f()||t.options.touchDevices){t.mouseIsOverProxy=false}});if(u&&t.options.touchDevices){t.$elProxy.on("touchstart."+t.namespace,function(){t._showNow()})}}else if(t.options.trigger=="click"){t.$elProxy.on("click."+t.namespace,function(){if(!f()||t.options.touchDevices){t._show()}})}}},_show:function(){var e=this;if(e.Status!="shown"&&e.Status!="appearing"){if(e.options.delay){e.timerShow=setTimeout(function(){if(e.options.trigger=="click"||e.options.trigger=="hover"&&e.mouseIsOverProxy){e._showNow()}},e.options.delay)}else e._showNow()}},_showNow:function(n){var r=this;r.options.functionBefore.call(r.$el,r.$el,function(){if(r.enabled&&r.Content!==null){if(n)r.callbacks.show.push(n);r.callbacks.hide=[];clearTimeout(r.timerShow);r.timerShow=null;clearTimeout(r.timerHide);r.timerHide=null;if(r.options.onlyOne){e(".tooltipstered").not(r.$el).each(function(t,n){var r=e(n),i=r.data("tooltipster-ns");e.each(i,function(e,t){var n=r.data(t),i=n.status(),s=n.option("autoClose");if(i!=="hidden"&&i!=="disappearing"&&s){n.hide()}})})}var i=function(){r.Status="shown";e.each(r.callbacks.show,function(e,t){t.call(r.$el)});r.callbacks.show=[]};if(r.Status!=="hidden"){var s=0;if(r.Status==="disappearing"){r.Status="appearing";if(l()){r.$tooltip.clearQueue().removeClass("tooltipster-dying").addClass("tooltipster-"+r.options.animation+"-show");if(r.options.speed>0)r.$tooltip.delay(r.options.speed);r.$tooltip.queue(i)}else{r.$tooltip.stop().fadeIn(i)}}else if(r.Status==="shown"){i()}}else{r.Status="appearing";var s=r.options.speed;r.bodyOverflowX=e("body").css("overflow-x");e("body").css("overflow-x","hidden");var o="tooltipster-"+r.options.animation,a="-webkit-transition-duration: "+r.options.speed+"ms; -webkit-animation-duration: "+r.options.speed+"ms; -moz-transition-duration: "+r.options.speed+"ms; -moz-animation-duration: "+r.options.speed+"ms; -o-transition-duration: "+r.options.speed+"ms; -o-animation-duration: "+r.options.speed+"ms; -ms-transition-duration: "+r.options.speed+"ms; -ms-animation-duration: "+r.options.speed+"ms; transition-duration: "+r.options.speed+"ms; animation-duration: "+r.options.speed+"ms;",f=r.options.minWidth?"min-width:"+Math.round(r.options.minWidth)+"px;":"",c=r.options.maxWidth?"max-width:"+Math.round(r.options.maxWidth)+"px;":"",h=r.options.interactive?"pointer-events: auto;":"";r.$tooltip=e('<div class="tooltipster-base '+r.options.theme+'" style="'+f+" "+c+" "+h+" "+a+'"><div class="tooltipster-content"></div></div>');if(l())r.$tooltip.addClass(o);r._content_insert();r.$tooltip.appendTo("body");r.reposition();r.options.functionReady.call(r.$el,r.$el,r.$tooltip);if(l()){r.$tooltip.addClass(o+"-show");if(r.options.speed>0)r.$tooltip.delay(r.options.speed);r.$tooltip.queue(i)}else{r.$tooltip.css("display","none").fadeIn(r.options.speed,i)}r._interval_set();e(t).on("scroll."+r.namespace+" resize."+r.namespace,function(){r.reposition()});if(r.options.autoClose){e("body").off("."+r.namespace);if(r.options.trigger=="hover"){if(u){setTimeout(function(){e("body").on("touchstart."+r.namespace,function(){r.hide()})},0)}if(r.options.interactive){if(u){r.$tooltip.on("touchstart."+r.namespace,function(e){e.stopPropagation()})}var p=null;r.$elProxy.add(r.$tooltip).on("mouseleave."+r.namespace+"-autoClose",function(){clearTimeout(p);p=setTimeout(function(){r.hide()},r.options.interactiveTolerance)}).on("mouseenter."+r.namespace+"-autoClose",function(){clearTimeout(p)})}else{r.$elProxy.on("mouseleave."+r.namespace+"-autoClose",function(){r.hide()})}}else if(r.options.trigger=="click"){setTimeout(function(){e("body").on("click."+r.namespace+" touchstart."+r.namespace,function(){r.hide()})},0);if(r.options.interactive){r.$tooltip.on("click."+r.namespace+" touchstart."+r.namespace,function(e){e.stopPropagation()})}}}}if(r.options.timer>0){r.timerHide=setTimeout(function(){r.timerHide=null;r.hide()},r.options.timer+s)}}})},_interval_set:function(){var t=this;t.checkInterval=setInterval(function(){if(e("body").find(t.$el).length===0||e("body").find(t.$elProxy).length===0||t.Status=="hidden"||e("body").find(t.$tooltip).length===0){if(t.Status=="shown"||t.Status=="appearing")t.hide();t._interval_cancel()}else{if(t.options.positionTracker){var n=t._repositionInfo(t.$elProxy),r=false;if(o(n.dimension,t.elProxyPosition.dimension)){if(t.$elProxy.css("position")==="fixed"){if(o(n.position,t.elProxyPosition.position))r=true}else{if(o(n.offset,t.elProxyPosition.offset))r=true}}if(!r){t.reposition()}}}},200)},_interval_cancel:function(){clearInterval(this.checkInterval);this.checkInterval=null},_content_set:function(e){if(typeof e==="object"&&e!==null&&this.options.contentCloning){e=e.clone(true)}this.Content=e},_content_insert:function(){var e=this,t=this.$tooltip.find(".tooltipster-content");if(typeof e.Content==="string"&&!e.options.contentAsHTML){t.text(e.Content)}else{t.empty().append(e.Content)}},_update:function(e){var t=this;t._content_set(e);if(t.Content!==null){if(t.Status!=="hidden"){t._content_insert();t.reposition();if(t.options.updateAnimation){if(l()){t.$tooltip.css({width:"","-webkit-transition":"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms","-moz-transition":"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms","-o-transition":"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms","-ms-transition":"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms",transition:"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms"}).addClass("tooltipster-content-changing");setTimeout(function(){if(t.Status!="hidden"){t.$tooltip.removeClass("tooltipster-content-changing");setTimeout(function(){if(t.Status!=="hidden"){t.$tooltip.css({"-webkit-transition":t.options.speed+"ms","-moz-transition":t.options.speed+"ms","-o-transition":t.options.speed+"ms","-ms-transition":t.options.speed+"ms",transition:t.options.speed+"ms"})}},t.options.speed)}},t.options.speed)}else{t.$tooltip.fadeTo(t.options.speed,.5,function(){if(t.Status!="hidden"){t.$tooltip.fadeTo(t.options.speed,1)}})}}}}else{t.hide()}},_repositionInfo:function(e){return{dimension:{height:e.outerHeight(false),width:e.outerWidth(false)},offset:e.offset(),position:{left:parseInt(e.css("left")),top:parseInt(e.css("top"))}}},hide:function(n){var r=this;if(n)r.callbacks.hide.push(n);r.callbacks.show=[];clearTimeout(r.timerShow);r.timerShow=null;clearTimeout(r.timerHide);r.timerHide=null;var i=function(){e.each(r.callbacks.hide,function(e,t){t.call(r.$el)});r.callbacks.hide=[]};if(r.Status=="shown"||r.Status=="appearing"){r.Status="disappearing";var s=function(){r.Status="hidden";if(typeof r.Content=="object"&&r.Content!==null){r.Content.detach()}r.$tooltip.remove();r.$tooltip=null;e(t).off("."+r.namespace);e("body").off("."+r.namespace).css("overflow-x",r.bodyOverflowX);e("body").off("."+r.namespace);r.$elProxy.off("."+r.namespace+"-autoClose");r.options.functionAfter.call(r.$el,r.$el);i()};if(l()){r.$tooltip.clearQueue().removeClass("tooltipster-"+r.options.animation+"-show").addClass("tooltipster-dying");if(r.options.speed>0)r.$tooltip.delay(r.options.speed);r.$tooltip.queue(s)}else{r.$tooltip.stop().fadeOut(r.options.speed,s)}}else if(r.Status=="hidden"){i()}return r},show:function(e){this._showNow(e);return this},update:function(e){return this.content(e)},content:function(e){if(typeof e==="undefined"){return this.Content}else{this._update(e);return this}},reposition:function(){var n=this;if(e("body").find(n.$tooltip).length!==0){n.$tooltip.css("width","");n.elProxyPosition=n._repositionInfo(n.$elProxy);var r=null,i=e(t).width(),s=n.elProxyPosition,o=n.$tooltip.outerWidth(false),u=n.$tooltip.innerWidth()+1,a=n.$tooltip.outerHeight(false);if(n.$elProxy.is("area")){var f=n.$elProxy.attr("shape"),l=n.$elProxy.parent().attr("name"),c=e('img[usemap="#'+l+'"]'),h=c.offset().left,p=c.offset().top,d=n.$elProxy.attr("coords")!==undefined?n.$elProxy.attr("coords").split(","):undefined;if(f=="circle"){var v=parseInt(d[0]),m=parseInt(d[1]),g=parseInt(d[2]);s.dimension.height=g*2;s.dimension.width=g*2;s.offset.top=p+m-g;s.offset.left=h+v-g}else if(f=="rect"){var v=parseInt(d[0]),m=parseInt(d[1]),y=parseInt(d[2]),b=parseInt(d[3]);s.dimension.height=b-m;s.dimension.width=y-v;s.offset.top=p+m;s.offset.left=h+v}else if(f=="poly"){var w=[],E=[],S=0,x=0,T=0,N=0,C="even";for(var k=0;k<d.length;k++){var L=parseInt(d[k]);if(C=="even"){if(L>T){T=L;if(k===0){S=T}}if(L<S){S=L}C="odd"}else{if(L>N){N=L;if(k==1){x=N}}if(L<x){x=L}C="even"}}s.dimension.height=N-x;s.dimension.width=T-S;s.offset.top=p+x;s.offset.left=h+S}else{s.dimension.height=c.outerHeight(false);s.dimension.width=c.outerWidth(false);s.offset.top=p;s.offset.left=h}}var A=0,O=0,M=0,_=parseInt(n.options.offsetY),D=parseInt(n.options.offsetX),P=n.options.position;function H(){var n=e(t).scrollLeft();if(A-n<0){r=A-n;A=n}if(A+o-n>i){r=A-(i+n-o);A=i+n-o}}function B(n,r){if(s.offset.top-e(t).scrollTop()-a-_-12<0&&r.indexOf("top")>-1){P=n}if(s.offset.top+s.dimension.height+a+12+_>e(t).scrollTop()+e(t).height()&&r.indexOf("bottom")>-1){P=n;M=s.offset.top-a-_-12}}if(P=="top"){var j=s.offset.left+o-(s.offset.left+s.dimension.width);A=s.offset.left+D-j/2;M=s.offset.top-a-_-12;H();B("bottom","top")}if(P=="top-left"){A=s.offset.left+D;M=s.offset.top-a-_-12;H();B("bottom-left","top-left")}if(P=="top-right"){A=s.offset.left+s.dimension.width+D-o;M=s.offset.top-a-_-12;H();B("bottom-right","top-right")}if(P=="bottom"){var j=s.offset.left+o-(s.offset.left+s.dimension.width);A=s.offset.left-j/2+D;M=s.offset.top+s.dimension.height+_+12;H();B("top","bottom")}if(P=="bottom-left"){A=s.offset.left+D;M=s.offset.top+s.dimension.height+_+12;H();B("top-left","bottom-left")}if(P=="bottom-right"){A=s.offset.left+s.dimension.width+D-o;M=s.offset.top+s.dimension.height+_+12;H();B("top-right","bottom-right")}if(P=="left"){A=s.offset.left-D-o-12;O=s.offset.left+D+s.dimension.width+12;var F=s.offset.top+a-(s.offset.top+s.dimension.height);M=s.offset.top-F/2-_;if(A<0&&O+o>i){var I=parseFloat(n.$tooltip.css("border-width"))*2,q=o+A-I;n.$tooltip.css("width",q+"px");a=n.$tooltip.outerHeight(false);A=s.offset.left-D-q-12-I;F=s.offset.top+a-(s.offset.top+s.dimension.height);M=s.offset.top-F/2-_}else if(A<0){A=s.offset.left+D+s.dimension.width+12;r="left"}}if(P=="right"){A=s.offset.left+D+s.dimension.width+12;O=s.offset.left-D-o-12;var F=s.offset.top+a-(s.offset.top+s.dimension.height);M=s.offset.top-F/2-_;if(A+o>i&&O<0){var I=parseFloat(n.$tooltip.css("border-width"))*2,q=i-A-I;n.$tooltip.css("width",q+"px");a=n.$tooltip.outerHeight(false);F=s.offset.top+a-(s.offset.top+s.dimension.height);M=s.offset.top-F/2-_}else if(A+o>i){A=s.offset.left-D-o-12;r="right"}}if(n.options.arrow){var R="tooltipster-arrow-"+P;if(n.options.arrowColor.length<1){var U=n.$tooltip.css("background-color")}else{var U=n.options.arrowColor}if(!r){r=""}else if(r=="left"){R="tooltipster-arrow-right";r=""}else if(r=="right"){R="tooltipster-arrow-left";r=""}else{r="left:"+Math.round(r)+"px;"}if(P=="top"||P=="top-left"||P=="top-right"){var z=parseFloat(n.$tooltip.css("border-bottom-width")),W=n.$tooltip.css("border-bottom-color")}else if(P=="bottom"||P=="bottom-left"||P=="bottom-right"){var z=parseFloat(n.$tooltip.css("border-top-width")),W=n.$tooltip.css("border-top-color")}else if(P=="left"){var z=parseFloat(n.$tooltip.css("border-right-width")),W=n.$tooltip.css("border-right-color")}else if(P=="right"){var z=parseFloat(n.$tooltip.css("border-left-width")),W=n.$tooltip.css("border-left-color")}else{var z=parseFloat(n.$tooltip.css("border-bottom-width")),W=n.$tooltip.css("border-bottom-color")}if(z>1){z++}var X="";if(z!==0){var V="",J="border-color: "+W+";";if(R.indexOf("bottom")!==-1){V="margin-top: -"+Math.round(z)+"px;"}else if(R.indexOf("top")!==-1){V="margin-bottom: -"+Math.round(z)+"px;"}else if(R.indexOf("left")!==-1){V="margin-right: -"+Math.round(z)+"px;"}else if(R.indexOf("right")!==-1){V="margin-left: -"+Math.round(z)+"px;"}X='<span class="tooltipster-arrow-border" style="'+V+" "+J+';"></span>'}n.$tooltip.find(".tooltipster-arrow").remove();var K='<div class="'+R+' tooltipster-arrow" style="'+r+'">'+X+'<span style="border-color:'+U+';"></span></div>';n.$tooltip.append(K)}n.$tooltip.css({top:Math.round(M)+"px",left:Math.round(A)+"px"})}return n},enable:function(){this.enabled=true;return this},disable:function(){this.hide();this.enabled=false;return this},destroy:function(){var t=this;t.hide();if(t.$el[0]!==t.$elProxy[0])t.$elProxy.remove();t.$el.removeData(t.namespace).off("."+t.namespace);var n=t.$el.data("tooltipster-ns");if(n.length===1){var r=typeof t.Content==="string"?t.Content:e("<div></div>").append(t.Content).html();t.$el.removeClass("tooltipstered").attr("title",r).removeData(t.namespace).removeData("tooltipster-ns").off("."+t.namespace)}else{n=e.grep(n,function(e,n){return e!==t.namespace});t.$el.data("tooltipster-ns",n)}return t},elementIcon:function(){return this.$el[0]!==this.$elProxy[0]?this.$elProxy[0]:undefined},elementTooltip:function(){return this.$tooltip?this.$tooltip[0]:undefined},option:function(e,t){if(typeof t=="undefined")return this.options[e];else{this.options[e]=t;return this}},status:function(){return this.Status}};e.fn[r]=function(){var t=arguments;if(this.length===0){if(typeof t[0]==="string"){var n=true;switch(t[0]){case"setDefaults":e.extend(i,t[1]);break;default:n=false;break}if(n)return true;else return this}else{return this}}else{if(typeof t[0]==="string"){var r="#*$~&";this.each(function(){var n=e(this).data("tooltipster-ns"),i=n?e(this).data(n[0]):null;if(i){if(typeof i[t[0]]==="function"){var s=i[t[0]](t[1],t[2])}else{throw new Error('Unknown method .tooltipster("'+t[0]+'")')}if(s!==i){r=s;return false}}else{throw new Error("You called Tooltipster's \""+t[0]+'" method on an uninitialized element')}});return r!=="#*$~&"?r:this}else{var o=[],u=t[0]&&typeof t[0].multiple!=="undefined",a=u&&t[0].multiple||!u&&i.multiple,f=t[0]&&typeof t[0].debug!=="undefined",l=f&&t[0].debug||!f&&i.debug;this.each(function(){var n=false,r=e(this).data("tooltipster-ns"),i=null;if(!r){n=true}else if(a){n=true}else if(l){console.log('Tooltipster: one or more tooltips are already attached to this element: ignoring. Use the "multiple" option to attach more tooltips.')}if(n){i=new s(this,t[0]);if(!r)r=[];r.push(i.namespace);e(this).data("tooltipster-ns",r);e(this).data(i.namespace,i)}o.push(i)});if(a)return o;else return this}}};var u=!!("ontouchstart"in t);var a=false;e("body").one("mousemove",function(){a=true})})(jQuery,window,document);















$(window).load(function(){



        // Delegate .transition() calls to .animate()
// if the browser can't do CSS transitions.
if (!$.support.transition)
  $.fn.transition = $.fn.animate;


function animationTeleserviceGSM(){
    

    //show text
    function showText(text){
        $(text).fadeIn();
    }

    //Alarm Button
    function alarmButton(){
        $('.alarmButton').transition({
            width:23,
            height:23,
            marginLeft:2,
            marginTop:2
        },300,function(){
            $(this).transition({
                width:27,
                height:27,
                marginLeft:0,
                marginTop:0
            })
        })
    }

    //show arrow
    function showArrow01(){
        $('.elevator .arrow').transition({
            height:145
        },750,function(){
            $(this).transition({
                width:35
            },300)
        })
    }

    //explain GSM
    function explainGSM(){
        $('.arrow.gsmModul').transition({
            width: 205
        },750,function(){
            $(this).transition({
                height: 37
            },200)
        })
    }

    //GSM signal waves
    function animateWave($wave){
        $($wave).transition({
            'width':20,
            'height':70,
            'top':0,
            'right':200
        },2500,'linear',function(){
            $(this).remove();
        });

        $('.inner',$wave).transition({
            'width':70,
            'height':70
        },2500,'linear');
    }
    function addWave(){
        var $wave = '<div class="wave"><div class="inner"></div></div>';
        $('.gsmSignal').append($wave);
        animateWave($('.gsmSignal .wave').last());
    }
    function startWaves(){
        waveAnimation = setInterval(addWave,160)
    }

    //circle grow
    function circleGrow(circle,size){
        $(circle).transition({
            width:size,
            height:size,
            marginLeft:0,
            marginTop:0
        },1000);
    }

    //show arrow
    function showArrow02(){
        $('.arrow.down').transition({
            height: 122
        },750)
        $('.arrow.down').delay(50).transition({
            width: 140
        },750)
    }

    //reset animation
    function resetStyles(){
        $('.TKanimation#teleservice *').each(function(){
            $(this).removeAttr('style');
        })
        clearInterval(waveAnimation);
        $('.wave').remove();
    }



    //Start animation
    setTimeout(alarmButton,500);
    setTimeout(showArrow01,1500);
    setTimeout(explainGSM,3000);
    setTimeout(function() {
        circleGrow('.circle.gsmModul',184)
    }, 3500);
    
    setTimeout(function() {
        showText('.cap.gsmModul')
    }, 4000);
    
    setTimeout(startWaves,5000);
    
    setTimeout(function() {
        showText('.cap.gsmSig')
    }, 5500);

    setTimeout(function() {
        circleGrow('.circle.serviceCenter',114)
    }, 7000);

    setTimeout(function() {
        showText('.cap.serviceCenter')
    }, 8000);

    setTimeout(showArrow02,9000);
    
    setTimeout(function() {
        circleGrow('.circle.technic',114)
    }, 10500);

    setTimeout(function() {
        showText('.cap.technic')
    }, 11500);


    setTimeout(function() {
        showText('.playAgain')
    }, 18000);


    //restart animation
    /*setTimeout(resetStyles,20000);
    setTimeout(animationTeleserviceGSM,21000)*/
        
    $('.playAgain').click(function(){
        resetStyles();
        setTimeout(animationTeleserviceGSM,1000)
    })

}







function animationServiceCircle(elementID,elementIndex){

    /*var colors = [
        "#0087b8","#45a0c9","#8ebedb","#c9deed"
    ];*/

    var colors = [
        "#0087b8","#0087b8","#0087b8","#0087b8"
    ];

    var cutout = [
        88,85,80,68
    ];

    number = $(elementID).data('segments');

    elementIndex = $('.circle').length - elementIndex -1;


    doughnutOptions = {
        segmentShowStroke : true,
        segmentStrokeColor : "#ededed",
        segmentStrokeWidth : 1,
        percentageInnerCutout : cutout[elementIndex],
        //animation : Modernizr.canvas,
        animationSteps : 80,
        animationEasing : "easeOutQuad",
        animateRotate : true,
        animateScale : false,
        onAnimationComplete : null
    }

    var doughnutChartData = []

    for (i = 0; i < number; i++) {
        var item={
           value: 10,
           color:colors[elementIndex],
           label: ""
        }

        doughnutChartData.push(item);
    }

    for (i = 0; i < 22-number; i++) {
        var item={
           value: 10,
           color:"#ededed",
           label: ""
        }

        doughnutChartData.push(item);
    }
    
    var ctx = $(elementID).get(0).getContext("2d");
    new Chart(ctx).Doughnut(doughnutChartData,doughnutOptions);

    elementIndex++;
    $('.acc[data-rel=circle0'+elementIndex+']').fadeIn(200,function(){
        $('.accHead',this).trigger('click')
    });


    $('canvas.circle').click(function(e){

        if($('.serviceCircle').hasClass('animationDone')){

            if(e.handled !== true) // This will prevent event triggering more then once
            {
                //alert('Clicked');
                e.handled = true;

                $('.circle').removeClass('active').not($(this)).addClass('inactive')
                $(this).removeClass('inactive').addClass('active');

                accRel = $(this).attr('class');
                accRel = accRel.replace("circle ", "");
                accRel = accRel.replace("inactive ", "");
                accRel = accRel.replace("border", "");
                accRel = accRel.replace("active", "");
                accRel = accRel.replace(" ", "");
                

                $('.acc[data-rel='+accRel+'] .accHead').not('.acc.open .accHead').trigger('click');
            }
        }
        
    })

    setTimeout(function(){
        $('.TKanimation.serviceCircle').addClass('animationDone');
    },11000)

    
    

}





if($('.TKanimation#teleservice').length){
    setTimeout(animationTeleserviceGSM,1000)
}


if($('.TKanimation.serviceCircle').length){

    circleClass = 'circlesLength'+$('.circle').length;
    $('.serviceCircle').addClass(circleClass)

    $($(".circle").get().reverse()).each(function (index) {
          var self = this
          setTimeout(function () {
                animationServiceCircle($(self),index)
          }, index*3000);
    });

    setTimeout(function(){
        $('.acc').first().find('.accHead').trigger('click')
    },12000)
}


$('.accHead').click(function(){
    
    doNotTrigger = false;
    if($(this).parent().hasClass('open')){
        doNotTrigger = true;
    }

    $('.acc.open .accContent').not($(this).parent().find('.accContent')).slideToggle().parent().removeClass('open');
    $(this).parent().find('.accContent').slideToggle().parent().toggleClass('open');

    relCircle = $(this).parent().attr('data-rel');
    
    if($('.serviceCircle').hasClass('animationDone') &! doNotTrigger){
        $('.'+relCircle).trigger('click');
    }
    if(doNotTrigger){
        $('.circle').removeClass('active inactive')
    }
    
})



$('.TKanimation.hotspots').not('.hotspotsOverlay').each(function(index, el) {

    currentAnim = $(this)
    if($(this).hasClass('blueText')){
        $('body').addClass('blueText')
    }

    aspectRatio = parseInt($('.hotspotBg',currentAnim).height())/parseInt($('.hotspotBg',currentAnim).width());
    heightHelperPadding = aspectRatio * 100;

    $('.heightHelper',currentAnim).css({
        'padding-bottom':heightHelperPadding+'%'
    })

    customTrigger = $(this).data('trigger');

    $('.hotspot',currentAnim).each(function(index){
        content = $('.hotspotContent').eq(index).html();
        position = 'bottom-left';
        offsetX = 10;

        if($(this).offset().left >300){
            position ='bottom-right'
            offsetX = -10;
        }
        
        $(this).tooltipster({
            content: content,
            contentAsHTML:true,
            interactive: true,
            position: position,
            trigger: customTrigger,
            offsetY: -25,
            maxWidth:350,
            offsetX: offsetX,
            functionReady: function(){
                $(this).addClass('open')
            },
            functionAfter: function(){
               $(this).removeClass('open')
            }
        })

        if($(this).hasClass('opened')){
            $(this).tooltipster('show');
        }

    })

    if(customTrigger=='hover'){
        $('.hotspot',currentAnim).hover(function(){
            $('.hotspot.opened',currentAnim).tooltipster('hide');
            $('.hotspot.opened',currentAnim).removeClass('opened')
        })
    }

    $('.hotspot',currentAnim).click(function(){
        $('.hotspot.opened',currentAnim).tooltipster('hide');
        $('.hotspot.opened',currentAnim).removeClass('opened')
    })

    

    if($(this).data('animation')==true){
        hotspotsLength = $('.hotspot',currentAnim).length;

        for (var i = 1; i <= hotspotsLength/2; i++) {

            setTimeout(function () { 
                randomHotspot = Math.floor((Math.random()*hotspotsLength));
                $('.hotspot:eq('+randomHotspot+')',currentAnim).addClass('animated pulse')
            }, 500 * i);

            
        }
        
    }
});

//if($('.TKanimation.hotspots').length){

    


    

//}



$('.TKanimation.hotspotsOverlay').each(function(index){
    
    currentAnimation = $(this);

    $(currentAnimation).addClass('lorem'+index)



     $('.hotspotContent .close',currentAnimation).click(function(e){
        $(this).parent().fadeOut();
     }) 
})



$('.hotspot').click(function(e){

    currentAnimation = $(this).parent();

        e.preventDefault();
        hotspotIndex = $(this,currentAnimation).index()+1;

        $('.hotspotContent'+hotspotIndex,currentAnimation).fadeIn();

    })



if($('.TKanimation.service24').length){

    $('#headlineS24').fadeIn(300,function(){
        $('#p1').delay(600).fadeIn(300,function(){
            $('#p2').fadeIn(300,function(){
                $('#number0800').delay(1000).fadeIn(300,function(){
                    $('#number365').delay(600).fadeIn(150,function(){
                        $('#number7').delay(600).fadeIn(150,function(){
                            $('#number24').delay(600).fadeIn(150,function(){
                                $('#number0').delay(600).fadeIn(150,function(){
                                    showText();
                                })
                            })
                        })
                    })
                })
            })
        })
    });


    function showText(){
        $('#textdays').delay(600).fadeIn(300,function(){
            $('#textdays').delay(3000).fadeOut(300,function(){
                $('#textdays2').delay(500).fadeIn(300,function(){
                    $('#textdays2').delay(3000).fadeOut(300,function(){
                        $('#texthours').delay(500).fadeIn(300,function(){
                            $('#texthours').delay(3000).fadeOut(300,function(){
                                $('#textcosts').delay(500).fadeIn(300,function(){
                                    $('#textcosts').delay(3000).fadeOut(300);
                                    setTimeout(showText,15000)
                                })
                            })
                        })
                    })
                })
            })
        })
    }
}











        /*if($('#topicSelect').length){
            $('#topicSelect').ddslick();
        }*/







        if($('body').hasClass('pJS_home')){


            // if(!$.cookies.get('intro')){
            //
            //     function showImageTeasers(){
            //         $('#b_mainContent-startpage .b_imageTeaser').each(function(index){
            //           var self = this
            //           setTimeout(function () {
            //                $(self).addClass('animated bounceInSoft')
            //           }, index*300);
            //         });
            //
            //         setTimeout(function() {
            //             $('.pJS_home #b_header').addClass('animated fadeIn');
            //         }, 1500)
            //
            //         setTimeout(function() {
            //             $('#b_mainContent-startpage .b_imageTeaser').removeClass('bounceInSoft');
            //         }, 2000)
            //     }
            //
            //
            //     $('.b_startpage-imageGallery').addClass('animated bounceInSoft');
            //     setTimeout(showImageTeasers,500);
            //
            //
            //
            //     var time = new Date();
            //     time.setDate(time.getDate()+1);
            //
            //     var cookieOptions = {
            //         expiresAt: new Date(time)
            //     }
            //
            //
            //     $.cookies.set('intro','true',cookieOptions);
            //
            //
            // }else{
                /*$('#b_mainContent-startpage .b_imageTeaser,.b_startpage-imageGallery,.pJS_home #b_header').css({
                    'visibility':'visible'
                })*/

                $('#b_mainContent-startpage .b_imageTeaser,.b_startpage-imageGallery,.pJS_home #b_header').addClass('visible');

            // }

        }


        $('.b_imageTeaser').each(function(){
                hoverImage = $('img',this).attr('data-alt');
                if(hoverImage){
                    $('a',this).append('<img class="hoverImage" src="'+hoverImage+'">');
                }
            })


        $('.b_imageTeaser').hover(function() {
            $('img',this).addClass('animated pulseIn').removeClass('pulseOut')
        }, function() {
            $('img',this).addClass('animated pulseOut').removeClass('pulseIn')
        });

	contatcInputPlaceHolder = 'PLZ / Ort';

	
	if($('html').attr('lang') == 'en'){
		contatcInputPlaceHolder = 'zip / city';
	}

    if($('html').attr('lang') == 'fr'){
        contatcInputPlaceHolder = 'Code postal';
    }
	
	if($('html').attr('lang') == 'nl'){
        contatcInputPlaceHolder = 'Postcode/Plaats';
    }
	
	if($('html').attr('lang') == 'se'){
        contatcInputPlaceHolder = 'Postnummer/Stad';
    }
	
	if($('html').attr('lang') == 'da'){
        contatcInputPlaceHolder = 'Postnummer/By';
    }
	
	if($('html').attr('lang') == 'fi'){
        contatcInputPlaceHolder = 'Postinumero'; /*Postinumero / kaupunki*/
    }
	
	if($('html').attr('lang') == 'no'){
        contatcInputPlaceHolder = 'Postnr/By';
    }
        
        contactInput = '<div class="b_btnHeader b_contentBigShadow"><div class=""><form method="get" action="#" class="static b_contactform form-inline" name="contactform" role="form" id="contactFormHome"><div class="input-group"><div class="input-group-addon"><i class="b_icon-search"></i></div><input type="text" id="contact_search" class="form-control b_inputTransparent b_noFocus ui-autocomplete-input" name="tx_kesearch_pi1[sword]" value="" placeholder="'+contatcInputPlaceHolder+'" autocomplete="off"></div><button name="submit" class="submitbutt" type="submit"><i class="b_icon-arrowTeaser"></i></button></form></div></div>';
        $('.pJS_home .b_imageTeaserStartPage').first().append(contactInput);

    


        $('body').on('submit','form#contactFormHome',function(e){
            e.preventDefault();
            searchUrl = $('.b_imageTeaser').first().find('a').attr('href')+'?search='+$('#contact_search').val();
            window.location.href = searchUrl;
        })
        
        
        if($('.contenttable').length){
       		console.log('table')
		$('.contenttable tr:odd').addClass('odd');
		$('.contenttable tr:even').addClass('even');
	}
})



$(window).load(function() {
   if(window.location.hash) {
        hash = window.location.hash;
        console.log(hash);

        $('a.b_collapsible-item[href$='+hash+']').trigger('click');

        elTop = $('a.b_collapsible-item[href="'+hash+'"]').offset().top-100;
        console.log(elTop);

        $('html, body').animate({
            scrollTop: elTop
        }, 1500);


        //$('a.b_collapsible-item[href="'+hash+'"]').trigger('click')

    }  
});





/** 
 * Open all external links in a new window
 */
 /*
jQuery(document).ready(function($) {
	$('a')
		.filter('[href^="http"], [href^="//"]')
		.not('[href*="' + window.location.host + '"]')
		.attr('rel', 'noopener noreferrer')
		.attr('target', '_blank');
});
*/