!function(t){var k={},h={},l,q,x,y,z,u,m=[],g={init:function(e){var n=this,B=this.get(0),c=null,f=c=null,c=this.css("width"),f=this.css("height"),p=this.css("fontFamily"),v=this.css("fontSize"),u=this.css("color");l=~~c.substr(0,c.length-2);q=~~f.substr(0,f.length-2);x=p.substring(1,p.length-1);y=v;z=u;this.addClass("gauge");c=l<q?l:q;k=t.extend({allStart:!0,radius:c/2*.7,apert:225,insideText:!1,lineWidth:2,color:"#51545B"},k,e);c=360-k.apert;f=(180-c)/2;h={el:B,centerX:l/2,centerY:q/2,startAngle:Math.PI/
180*(c+f),endAngle:Math.PI/180*f,deg:270};for(var A in k)h[A]=k[A];m=[];!function(){var a=null,d=null;n.children("*").each(function(b){a=jQuery(this);d=a.data("color")||!1;null!==this.getAttribute("selected")&&(h.selected=b);m.push({text:a.text(),color:d})})}();!function(){var a=jQuery("<canvas width="+l+" height="+q+' class="gaugeCanvas">');n.html(a);h.canvas=a.get(0);n.css({display:"block"})}();!function(){var a=jQuery("<canvas width="+l+" height="+q+' class="gaugeArrow">');n.append(a);h.arrow=
a.get(0)}();!function(){var a=h,d=a.canvas.getContext("2d");d.clearRect(0,0,l,q);d.beginPath();d.lineWidth=a.lineWidth;d.strokeStyle=a.color;d.arc(a.centerX,a.centerY,a.radius,a.startAngle,a.endAngle,!1);d.stroke();d.closePath()}();!function(){var a=h,d=m.length,b=a.canvas.getContext("2d"),e=a.apert/(d-1)*(Math.PI/180),c=null,f=null,p=null,l=null,q=null,n=null,g=null,n=g=null,k=a.insideText?-1:1,u=20*k,v=10*k,k=27*k,f=a.startAngle,r=f+e/2,t=Math.floor(d/2),w=null;b.beginPath();b.textBaseline="middle";
b.fillStyle=z;b.font=y+" "+x;b.textAlign="right";for(c in m)b.strokeStyle=a.color,b.lineWidth=a.lineWidth,w=a.startAngle+e*c,g=Math.cos(w),n=Math.sin(w),f=g*(a.radius+u)+a.centerX,p=n*(a.radius+u)+a.centerY,l=g*(a.radius+v)+a.centerX,q=n*(a.radius+v)+a.centerY,m[c].angle=180/Math.PI*w,g=g*(a.radius+k)+a.centerX,n=n*(a.radius+k)+a.centerY,b.moveTo(f,p),b.lineTo(l,q),0==c?(f=a.startAngle,r=f+e/2):c==d-1?(f=r,r+=e/2):(f=r,r+=e),m[c].color&&(b.stroke(),b.closePath(),b.beginPath(),b.lineWidth=4,b.strokeStyle=
m[c].color,b.arc(a.centerX,a.centerY,a.radius,f,r,!1),b.stroke(),b.closePath(),b.beginPath()),c<t&&(b.textAlign=a.insideText?"left":"right"),c==t&&(b.textAlign="center"),c>t&&(b.textAlign=a.insideText?"right":"left"),b.fillText(m[c].text,g,n);b.stroke();b.closePath()}();!function(){var a=h,d=a.arrow.getContext("2d"),b=a.centerX,c=a.centerY;d.beginPath();d.lineWidth=1;d.fillStyle="#00C6FF";d.strokeStyle="#00C6FF";d.moveTo(b,c+3);d.lineTo(b+a.radius/1.2,c);d.lineTo(b,c-3);d.lineTo(b,c+3);d.arc(b,c,
5,0,180,!1);d.stroke();d.fill();d.closePath()}();g.rotateArrow();k.allStart&&(g.createTumbler(),g.bindEvent());return this},createTumbler:function(){for(var e=h.el,g=jQuery('<div class="gaugeTumbler"><h3>Kuda</h3></div>'),k="<select>",c="",f=jQuery("<button>GO!</button>"),p=0;p<m.length;p++){var l="";p==h.selected&&(l="selected");c+="<option value="+m[p].angle+" "+l+">"+m[p].text+"</option>"}g.append(k+(c+"</select>"),f);jQuery(e).append(g);u=f},rotateArrow:function(e){e=e||m[h.selected].angle;h.deg<
e?(e=-1*(360-e),h.deg=-1*e):h.deg=e;jQuery(h.arrow).css({transform:"rotate("+e+"deg)"});return this},bindEvent:function(){u.on("click",function(){deg=jQuery(h.el).find("select").val();g.rotateArrow(deg)});return this}};t.fn.gauge=function(e){if(g[e])return g[e].apply(this,Array.prototype.slice.call(arguments,1));if("object"!==typeof e&&e)t.error("\u041c\u0435\u0442\u043e\u0434 \u0441 \u0438\u043c\u0435\u043d\u0435\u043c "+e+" \u043d\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442 \u0434\u043b\u044f jQuery.gauge");
else return g.init.apply(this,arguments)}}(jQuery);