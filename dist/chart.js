function B(t,i){function e(){}for(var n in e.prototype=i.prototype,t.ha=i.prototype,t.prototype=new e,t.prototype.constructor=t,i)if("prototype"!=n)if(Object.defineProperties){var h=Object.getOwnPropertyDescriptor(i,n);h&&Object.defineProperty(t,n,h)}else t[n]=i[n]}var F="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this;function G(){G=function(){},F.Symbol||(F.Symbol=L)}var M=0;function L(t){return"jscomp_symbol_"+(t||"")+M++}!function(t){function i(n){if(e[n])return e[n].L;var h=e[n]={ga:n,ba:!1,L:{}};return t[n].call(h.L,h,h.L,i),h.ba=!0,h.L}var e={};i.l=t,i.a=e,i.d=function(t,e,n){i.b(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){G(),G(),"undefined"!=typeof Symbol&&Symbol.toStringTag&&(G(),Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})),Object.defineProperty(t,"__esModule",{value:!0})},i.i=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.$)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var h in t)i.d(n,h,function(i){return t[i]}.bind(null,h));return n},i.c=function(t){var e=t&&t.$?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.b=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},i.g="",i(i.m=0)}([function(t,i,e){function n(t){this.a=t,this.x=0}function h(t,i,e){this.h=t,this.J=new o(t,i),this.O=e}function s(t,i){return{x:u(t.x,i),y:u(t.y,i),width:A(t.width),height:A(t.height)}}function r(t,i){this.b=t,this.s=this.a(i),this.rect({width:i.width,height:i.height,fill:"transparent"}),this.s.style["-webkit-user-select"]="none",this.s.style["-moz-user-select"]="none",this.s.style["-ms-user-select"]="none",this.s.style["user-select"]="none"}function o(t,i,e){var n=this,h=i.columns[0].slice(1),s={min:h[0],max:h[h.length-1]};this.h=t,this.A=i.columns.slice(1).map(function(t){var e=t[0];return new d(n,h,t.slice(1),{name:i.names[e],color:i.colors[e],ea:i.strokeWidth})}),this.mode=e||"day",this.N=new l(this,"x",s,i.xAxisHidden),this.I=new a(this,"y",this.M(),i.yAxisHidden),this.U=function(t){var i,e,n=!1;return function h(){n?(i=arguments,e=this):(t.apply(this,arguments),n=!0,setTimeout(function(){n=!1,i&&(h.apply(e,i),i=e=null)},300))}}(function(){var t=n.M(),i={min:n.I.J(t.min),max:n.I.J(t.max)};n.A.map(function(t){t.da(i)}),n.I.H(i)})}function a(t){return p.apply(this,arguments)||this}function u(t,i){return i=(i||0)-t%1,.5<Math.abs(i)&&(i-=0<i?1:-1),t+i}function c(t,i){return f(f({},t),i)}function f(t,i){for(var e in i)!t[e]&&(t[e]=i[e]);return t}function l(t){return p.apply(this,arguments)||this}function p(t,i,e,n){this.a=t,this.type=i,this.g=this.D=e,this.Y=n,this.O=this.v()}function d(t,i,e,n){this.c=t,this.a=[],t=0;for(var h=i.length;t<h;t++)this.a.push({x:i[t],y:e[t]});this.K=n,this.translate=[0,0],this.scale=[1,1],this.opacity=1,this.visible=!0}function m(t,i){var e=v(10,i,0),n=v(10,0,1);!function i(){var h=e.f,s=n.f;null!==h&&(g(i),t.setAttribute("transform","translate("+h+",0)"),t.setAttribute("opacity",s))}()}function y(t,i){var e=v(10,0,i),n=v(10,.5,0);!function i(){var h=e.f,s=n.f;null!==h&&(g(i),t.setAttribute("transform","translate("+h+",0)"),t.setAttribute("opacity",s)),null===h&&t.parentNode.removeChild(t)}()}function v(t,i,e){return{step:0,get f(){if(this.step===t)return null;var n=this.step++/t;return(e-i)*n+i}}}e.r(i);var g=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame;d.prototype.toggle=function(){return this.visible=!this.visible,this.P=!0,this.visible},d.prototype.j=function(t){var i=this.c.N,e=this.c.I,n=this.a;this.b=t;for(var h=[],s=0,r=n.length;s<r;s++){var o=n[s];h.push((s?"L":"M")+(t.x+i.R(o.x)*t.width)+" "+(t.y+(1-e.R(o.y))*t.height))}return this.path=this.c.h.path({d:h.join(" "),stroke:this.K.color,"stroke-width":this.K.ea,"vector-effect":"non-scaling-stroke",fill:"none",transition:"all 0.5s"})},d.prototype.ca=function(t){this.scale[0]=1/(t.max-t.min),this.translate[0]=-this.b.width*t.min,this.setTransform()},d.prototype.da=function(t){var i=1/(t.max-t.min);t=-this.b.height*(1-t.max),this.g&&this.g(),this.g=function(t,i,e){var n,h,s=v(20,t.translate[1],i),r=v(20,t.scale[1],e);return t.P&&(n=v(20,t.visible?0:1,t.visible?1:0)),function o(){var a=s.f,u=r.f;null===a||h||(g(o),t.translate[1]=a,t.scale[1]=u,t.P&&(t.opacity=n.f)),null===a&&(t.translate[1]=i,t.scale[1]=e,t.opacity=t.visible?1:0,t.P=!1),t.setTransform()}(),function(){return h=!0}}(this,t,i)},d.prototype.setTransform=function(){this.path.setAttribute("transform","scale("+this.scale.join(" ")+") translate("+this.translate.join(" ")+")"),this.path.setAttribute("opacity",this.opacity)},d.prototype.M=function(t){for(var i=this.a,e={min:1/0,max:-1/0},n=0,h=i.length;n<h;n++){var s=i[n];s.x>t.min&&s.x<t.max&&((s=s.y)<e.min&&(e.min=s),s>e.max&&(e.max=s))}return e};var x="Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),b={day:"lightgray",night:"gray"},w={day:"gray",night:"lightgray"};p.prototype.R=function(t){var i=this.g;return(t-i.min)/(i.max-i.min)},p.prototype.w=function(t){var i=this.D;return t*(i.max-i.min)+i.min},p.prototype.Z=function(t){var i=this.g;return t*(i.max-i.min)+i.min},p.prototype.J=function(t){var i=this.D;return(t-i.min)/(i.max-i.min)},p.prototype.j=function(t){if(this.b={x:t.x,y:t.y,width:t.width,height:t.height},!this.Y)return t=this.l=this.C(),this.B(t),this.i},p.prototype.H=function(t){var i=(t={min:this.w(t.min),max:this.w(t.max)}).min-this.g.min,e=t.max-this.g.max,n=this.g.max/t.max;if(this.V=1<n?n:1/n,i&&e)i=0<e?1:-1,e="c";else{if(!i&&!e)return;i=0<(e||i)?1:-1,e=e?"r":"l"}e&&this.control!==e&&this.control&&this.W(),this.direction=i,this.control=e,this.g=t,this.B()},p.prototype.W=function(){this.c.map(function(t){t.o&&t.o.parentNode.removeChild(t.o)}),this.c=[]},p.prototype.v=function(){return this.a.h.aa({fill:w[this.a.mode]},this.O)},p.prototype.F=function(t){var i=(t=this.a.h.text(this.m(this.w(t)),{x:0,y:0})).getBBox();return t.parentNode.removeChild(t),{fa:-i.y,T:i.height+i.y,height:i.height,width:i.width}},B(l,p),l.prototype.B=function(){function t(){for(var t=[],i=0;6>i;i++)t.push({f:e.min+i*h});return t}var i=this.l,e=this.g,n=this.b,h=(e.max-e.min)/5;if(this.c){var s=this.u(this.c,h,function(t){return t>=e.min-h&&t<=e.max+h});if(s.length){var r=s.length,o=s[1]?s[1].f-s[0].f:h;if(0>this.direction&&"c"===this.control||"l"===this.control)for(var a=s[0].f-o;6>r;)s.unshift({f:a}),r++,a-=o;else if(0<this.direction&&"c"===this.control||"r"===this.control)for(a=s[s.length-1].f+o;6>r;)s.push({f:a}),r++,a+=o;this.c=s}else this.c=t()}else this.c=t(),this.i=this.v(),s=l.b(i),this.a.h.rect({x:n.x,y:n.y+n.height-s,height:s,width:n.width,fill:"none"},this.i);for(s=n.y+n.height-i.T-5,r=w[this.a.mode],o=0,a=this.c.length;o<a;o++){var u=this.c[o],c=u.f,f={x:n.x+this.R(c)*n.width+i.width*(.5-2*o/a),y:s,fill:r};c=this.m(c),u.o?this.a.h.S(u.o,f):(u.o=this.a.h.text(c,f,this.i),this.direction&&m(u.o,this.direction*this.l.width))}},l.prototype.u=function(t,i,e){function n(t){return t<1.2*i&&t>i/1.2}if(!t.length)return t;var h=[];if(0>this.direction&&"c"===this.control||"r"===this.control){h.push(t[0]);for(var s=1;s<t.length;s++){var r=t[s];e(r.f)&&n(r.f-t[s-1].f)?h.push(r):y(r.o,this.direction*this.l.width*-1)}}else{if(!(0<this.direction&&"c"===this.control||"l"===this.control))return t;for(h.push(t[t.length-1]),s=t.length-2;0<=s;s--)e((r=t[s]).f)&&n(t[s+1].f-r.f)?h.unshift(r):y(r.o,this.direction*this.l.width*-1)}return h},l.prototype.m=function(t){return t=new Date(t),x[t.getMonth()]+" "+t.getDate()},l.prototype.C=function(){return this.F(0)},l.b=function(t){return 10+t.height},B(a,p),a.prototype.B=function(){this.X(),this.G&&function t(i,e,n){var h=v(20,n,0),s=v(20,0,-n),r=v(20,0,1),o=v(20,1,0);t.b=!0,function n(){var a=h.f,u=s.f,c=r.f,f=o.f;null!==a&&(g(n),e.setAttribute("transform","translate(0,"+a+")"),e.setAttribute("opacity",c),i&&(i.setAttribute("transform","translate(0,"+u+")"),i.setAttribute("opacity",f))),null===a&&(i&&i.parentNode.removeChild(i),e.setAttribute("transform","translate(0,0)"),e.setAttribute("opacity",1),t.b=!1)}()}(this.u,this.i,this.G*this.direction*-1)},a.prototype.C=function(){return this.F(1)},a.prototype.X=function(){var t=this.b,i=this.l;this.u=this.i,this.c=this.c||[];var e=this.i=this.v(),n=t.height-l.b(i);this.a.h.rect({x:t.x,y:0,height:t.height,width:10+i.width,fill:"none"},e);for(var h=n/6,s=0;6>s;s++)if(s||!this.u){var r=this.a.h.text(this.m(this.Z(1/6*s)),{x:t.x+5,y:t.y+n-h*s-i.T,fill:w[this.a.mode]},s?e:void 0);this.c.push(r)}for(i=0;6>i;i++)!i&&this.u||this.a.h.path({d:"M"+t.x+" "+u(t.y+n-h*i,.5)+" h"+t.width,fill:"none",stroke:b[this.a.mode]},i?e:void 0);this.G=this.V*t.height/6},a.prototype.m=function(t){return Math.round(t).toString()},o.prototype.M=function(){var t=this,i=1/0,e=-1/0;return this.A.map(function(n,h){(n.visible||h===t.A.length-1)&&(n=n.M(t.N.g),i>n.min&&(i=n.min),e<n.max&&(e=n.max))}),{min:0,max:e}},o.prototype.j=function(t){var i={x:t.x+5,y:t.y+5,width:t.width-10,height:t.height-10};this.I.j(i),(t=this.N.j(i))&&(i.height-=t.getBBox().height),this.A.map(function(t){return t.j(i)})},o.prototype.b=function(t){this.A.map(function(i){i.ca(t)}),this.U(),this.N.H(t)},r.prototype.create=function(t,i,e){return t=document.createElementNS("http://www.w3.org/2000/svg",t),i&&this.S(t,i),(e||this.s||this.b).appendChild(t),t},r.prototype.S=function(t,i){for(var e in i)t.setAttribute(e,i[e])},r.prototype.a=function(t){return this.create("svg",t,void 0)},r.prototype.path=function(t,i){return this.create("path",t,i)},r.prototype.aa=function(t,i){return this.create("g",t,i)},r.prototype.rect=function(t,i){return this.create("rect",t,i)},r.prototype.text=function(t,i,e){return(i=this.create("text",i,e)).innerHTML=t,i};var A=Math.round;h.prototype.j=function(t){function i(e){var n=e.clientX-i.x;h.a+n>t.x&&h.c+n<t.x+t.width&&(i.x=e.clientX,h.m(h.a+n),h.v(h.c+n),h.i())}function e(i){var n=i.clientX-e.x;h.a<h.c+n-50&&h.c+n<t.x+t.width&&(e.x=i.clientX,h.v(h.c+n),h.i())}function n(i){var e=i.clientX-n.x;h.a+e+50<h.c&&h.a+e>t.x&&(n.x=i.clientX,h.m(h.a+e),h.i())}var h=this;h.J.j(t),h.b=t;var s=this.a=t.x+.5*t.width,r=this.c=t.x+1*t.width;h.i(),h.m(s),h.v(r);var o=h.h.s;this.u.addEventListener("mousedown",function(t){n.x=t.clientX,o.addEventListener("mousemove",n)}),this.C.addEventListener("mousedown",function(t){e.x=t.clientX,o.addEventListener("mousemove",e)}),this.l.addEventListener("mousedown",function(t){i.x=t.clientX,o.addEventListener("mousemove",i)}),this.h.s.addEventListener("mouseup",function(){o.removeEventListener("mousemove",n),o.removeEventListener("mousemove",e),o.removeEventListener("mousemove",i)}),this.h.s.addEventListener("mouseleave",function(){o.removeEventListener("mousemove",n),o.removeEventListener("mousemove",e),o.removeEventListener("mousemove",i)})},h.prototype.i=function(){var t=this.b,i=s({x:this.a,y:t.y,width:this.c-this.a,height:t.height},0);this.l?this.l.setAttribute("d",this.g(i)):this.l=this.h.path({d:this.g(i),fill:"transparent",stroke:"none",cursor:"pointer"}),i=["M",i.x,i.y,"h",i.width,"v",i.height,"h","-"+i.width,"Z M",i.x+6,i.y+2,"h",i.width-12,"v",i.height-4,"h","-"+(i.width-12),"Z"].join(" "),this.w?this.w.setAttribute("d",i):this.w=this.h.path({d:i,fill:"lightgray",stroke:"none",cursor:"pointer","fill-rule":"evenodd",opacity:.5}),this.O({min:(this.a-t.x)/t.width,max:(this.c-t.x)/t.width})},h.prototype.m=function(t){var i=this.b;this.a=t,i=s({x:i.x,y:i.y,width:t-i.x,height:i.height}),t=s(this.B(t)),this.H?(this.H.setAttribute("d",this.g(i)),this.u.setAttribute("d",this.g(t))):(this.H=this.G(i),this.u=this.F(t))},h.prototype.v=function(t){var i=this.b;this.c=t,i=s({x:t,y:i.y,width:i.width-t,height:i.height}),t=s(this.B(t)),this.D?(this.D.setAttribute("d",this.g(i)),this.C.setAttribute("d",this.g(t))):(this.D=this.G(i),this.C=this.F(t))},h.prototype.g=function(t){return["M",t.x,t.y,"h",t.width,"v",t.height,"h","-"+t.width,"Z"].join(" ")},h.prototype.G=function(t){return this.h.path({d:this.g(t),fill:"dodgerblue",opacity:.1,stroke:"none"})},h.prototype.F=function(t){return this.h.path({d:this.g(t),fill:"transparent",cursor:"pointer"})},h.prototype.B=function(t){return{x:t-8,y:this.b.y,width:16,height:this.b.height}};var j={day:"#333333",night:"lightgray"},M={day:"lightgray",night:"gray"};n.prototype.j=function(t){var i=this;this.b=t,this.a.A.map(function(t){i.c(t,function(){i.a.U()})})},n.prototype.c=function(t,i){var e=this.a.h.path({fill:t.K.color,d:"M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z",stroke:"none",transform:"translate("+u(this.b.x+this.x+8+15,void 0)+" "+u(this.b.y+8+15,void 0)+")"});this.title=this.a.h.text(t.K.name,{fill:j[this.a.mode],stroke:"none","font-size":"16px",transform:"translate("+u(this.b.x+this.x+34+8+15,void 0)+" "+u(this.b.y+18+8+15,void 0)+")"});var n=this.title.getBBox().width,h=n+34-20;this.a.h.path({d:"M20,0 h"+h+" a20,20 0 0 1 20,20 a20,20 0 0 1 -20,20 h-"+h+" a20,20 0 0 1 -20,-20 a20,20 0 0 1 20,-20 z",fill:"transparent",cursor:"pointer",stroke:M[this.a.mode],transform:"translate("+u(this.b.x+this.x+15,void 0)+" "+u(this.b.y+15,.5)+")"}).addEventListener("click",function(){var n=t.toggle();e.setAttribute("d",n?"M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z":"M12 0c-6.623 0-12 5.377-12 12s5.377 12 12 12 12-5.377 12-12-5.377-12-12-12zm0 22c-5.519 0-10-4.48-10-10 0-5.519 4.481-10 10-10 5.52 0 10 4.481 10 10 0 5.52-4.48 10-10 10z"),function(t){var i=v(10,0,1);!function e(){var n=i.f;null!==n&&(g(e),t.setAttribute("opacity",n))}()}(e),i(!0)}),this.x+=34+n+30},window.tgc={Chart:function(t,i,e){var s=this;this.i=t,this.a=i,this.width=i.width||600,this.height=i.height||400,this.h=new r(this.i,{width:this.width,height:this.height,"font-family":"Avenir","font-size":"14px"}),this.b=new o(this.h,c(this.a,{strokeWidth:2}),e),this.g=new h(this.h,c(this.a,{strokeWidth:1,xAxisHidden:!0,yAxisHidden:!0}),function(t){s.b.b(t)}),this.c=new n(this.b),this.b.j({x:0,y:0,width:this.width,height:this.height-80-60}),this.g.j({x:0,y:this.height-80-60,width:this.width,height:80}),this.c.j({x:0,y:this.height-60,width:this.width,height:60})}}}]);