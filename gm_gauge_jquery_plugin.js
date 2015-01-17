//объект круговая шкала
//при создании собираем всю информацию с нашего списка значений
!function($) {
	var p={},
		dataGauge={},
		style={},
		tumbler={},
		data=[];

	var methods={
		init: function(par) {
			var self=this,
				el=this.get(0),
				minSide=null,
				insAngle=null,
				diffAngle=null,
				width=this.css('width'),
				height=this.css('height'),
				font=this.css('fontFamily'),
				fontSize=this.css('fontSize'),
				textColor=this.css('color');

			style={
				'width': ~~width.substr(0, width.length-2),
				'height': ~~height.substr(0, height.length-2),
				'font': font.substring(1, font.length - 1),
				'fontSize': fontSize,
				'textColor': textColor
			};
			
			this.addClass('gauge');

			minSide=(style.width < style.height) ? style.width : style.height;

			p=$.extend({
				'allStart': true,
				'radius': minSide/2*0.7,			//70% от 1/2 минимальной стороны
				'apert': 225,						//апертура в градусах
				'insideText': false,					//текст внутри окружности (внутри / снаружи)
				'lineWidth': 2,						//ширина линии
				'color': '#51545B',					//цвет линии
			}, p, par);

			insAngle=360-p.apert;					//исходя из заданной апертуры вычисляем обратный угол 
			diffAngle=(180-insAngle)/2;			//обратный угол делим попалам что бы уравнять углы относительно центра

			//объект тех.данных о нашей шкале 
			dataGauge={
				'el': el,
				'centerX': style.width/2,
				'centerY': style.height/2,
				'startAngle': (insAngle+diffAngle)*(Math.PI/180),		//стартовый угол в радианах
				'endAngle': diffAngle*(Math.PI/180),						//конечный угол
				'deg': 270
			};

			for (var key in p) dataGauge[key]=p[key];		//дополняем наш объект "необязательными" значениями

			data=[];		//объект с данными о значениях

			//анонимная функция, созданная для анонимности
			!function() {
				var	child=null,
					index=0,
					color=null;

				//обходим наш список значений, создавая из него массив данных (текст, цвет и текущий активный элемент)
				self.children('*').each(function(index) {
					item=jQuery(this);
					color=item.data('color') || false;
					if (item.attr('selected')!==null) dataGauge.selected=index;
					data.push({'text': item.text(), 'color': color});
				});
			}();

			!function createCanvas() {
				var canvas=jQuery('<canvas width='+style.width+' height='+style.height+' class="gaugeCanvas">');
				self.html(canvas);
				dataGauge.canvas=canvas.get(0);
				self.css({'display': 'block'});
			}();

			!function createCanvasArrow() {
				var canvasArrow=jQuery('<canvas width='+style.width+' height='+style.height+' class="gaugeArrow">');
				self.append(canvasArrow);
				dataGauge.arrow=canvasArrow.get(0);
			}();

			!function drawArc() {
				var	d=dataGauge,
					ctx=d.canvas.getContext("2d");

				ctx.clearRect(0,0, style.width, style.height);
				ctx.beginPath();
				ctx.lineWidth=d.lineWidth;
				ctx.strokeStyle=d.color;
				ctx.arc(d.centerX, d.centerY, d.radius, d.startAngle, d.endAngle, false);
				ctx.stroke();
				ctx.closePath();
			}();

			!function drawScale() {
				var d=dataGauge,
					count=data.length,
					ctx=d.canvas.getContext("2d"),
					sectorRad=(d.apert/(count-1))*(Math.PI/180),		//вычисляем сколько радиан в одном секторе
					i=null,
					x0=null,
					y0=null,
					x1=null,
					y1=null,
					sin=null,
					cos=null,
					xText=null,
					yText=null,
					dir=d.insideText ? -1 : 1,						//немного хитрая штука для определения расположения текста относительно окружности
					fPoint=20*dir,									//длина засечек и отступ текста
					lPoint=10*dir,
					tPoint=27*dir,
					firstAngle=d.startAngle,						//нужные углы на случай цветных отрезков
					nextAngle=firstAngle+sectorRad/2,
					middle=Math.floor(count/2),
					angle=null;

				ctx.beginPath();
				ctx.textBaseline="middle";
				ctx.fillStyle=style.textColor;
				ctx.font=style.fontSize+' '+style.font;
				ctx.textAlign="right";

				//обходим массив с данными, чтоб сразу можно было вытащить нужную информацию
				for (var i in data) {
					//рисуем засечки, вычисляя их координаты
					ctx.strokeStyle=d.color;
					ctx.lineWidth=d.lineWidth;
					angle=d.startAngle+sectorRad*i;
					cos=Math.cos(angle);
					sin=Math.sin(angle);
					x0=(cos*(d.radius+fPoint))+d.centerX;
					y0=(sin*(d.radius+fPoint))+d.centerY;
					x1=(cos*(d.radius+lPoint))+d.centerX;
					y1=(sin*(d.radius+lPoint))+d.centerY;

					data[i].angle=angle*(180/Math.PI);		//добовляем значение углов в наш массив данных

					//координаты для вывода значений
					xText=(cos*(d.radius+tPoint))+d.centerX;
					yText=(sin*(d.radius+tPoint))+d.centerY;

					ctx.moveTo(x0,y0);
					ctx.lineTo(x1,y1);

					//вычисляем значения радианов на случай если сектор цветной
					if (i==0) {
						firstAngle=d.startAngle;
						nextAngle=firstAngle+sectorRad/2;
					} else if (i==count-1) {
						firstAngle=nextAngle;
						nextAngle+=sectorRad/2;
					} else {
						firstAngle=nextAngle;
						nextAngle+=sectorRad;
					}

					//если у значения есть цвет, то рисуем (ра)дугу:
					if (data[i].color) {
						ctx.stroke();
						ctx.closePath();
						ctx.beginPath();
						ctx.lineWidth=4;
						ctx.strokeStyle=data[i].color;
						ctx.arc(d.centerX, d.centerY, d.radius, firstAngle, nextAngle, false);
						ctx.stroke();
						ctx.closePath();
						ctx.beginPath();
					}

					//меняем расположение текста в зависимости от текущего положения на шкале окружности (^^,)
					if (i<middle) ctx.textAlign=d.insideText ? "left" : "right";
					if (i==middle) ctx.textAlign="center";
					if (i>middle) ctx.textAlign=d.insideText ? "right" : "left";		

					ctx.fillText(data[i].text, xText, yText);
				};	//end for

				ctx.stroke();
				ctx.closePath();
			}();

			!function drawArrow() {
				var d=dataGauge,
					ctx=d.arrow.getContext("2d"),
					x=d.centerX,
					y=d.centerY;

				ctx.beginPath();
				ctx.lineWidth=1;
				ctx.fillStyle='#00C6FF';
				ctx.strokeStyle='#00C6FF';
				ctx.moveTo(x, y+3);
				ctx.lineTo(x+(d.radius/1.2), y);
				ctx.lineTo(x, y-3);
				ctx.lineTo(x, y+3);
				ctx.arc(x,y, 5, 0, 180, false);
				ctx.stroke();
				ctx.fill();
				ctx.closePath();
			}();

			methods.rotateArrow();

			if (p.allStart) {
				methods.createTumbler();
				methods.bindEvent();
			}
			return this;
		},

		createTumbler: function() {
			var el=dataGauge.el,
				tmb=jQuery('<div class="gaugeTumbler"><h3>Kuda</h3></div>'),
				select='<select>',
				options='',
				btn=jQuery('<button>GO!</button>');

			for (var i=0; i<data.length; i++) {
				var sel='';
				if (i==dataGauge.selected) sel='selected';
				options+='<option value='+data[i].angle+' '+sel+'>'+data[i].text+'</option>';
			}

			select+=options+'</select>';
			tmb.append(select, btn);
			jQuery(el).append(tmb);

			tumbler={
				'select': select,
				'button': btn,
				'tmb': tmb
			};
		},

		rotateArrow: function(deg) {
			var deg=deg || data[dataGauge.selected].angle;
			//хитрая штука для определения направления движения стрелки
			if (dataGauge.deg<deg) {
				deg=(360-deg)*(-1);
				dataGauge.deg=deg*(-1);
			} else dataGauge.deg=deg;

			jQuery(dataGauge.arrow).css({'transform': 'rotate('+deg+'deg)'});
			return this;
		},

		bindEvent: function() {
			tumbler.button.on('click', function() {
				var select=jQuery(dataGauge.el).find('select');
				deg=select.val();
				methods.rotateArrow(deg);
			});
			return this;
		}
	};

	$.fn.gauge=function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error( 'Метод с именем ' +  method + ' не существует для jQuery.gauge' );
		} 
	};
}(jQuery);

//обязательный методы поместил в анонимные функции, а необязательные сделал отдельными для вызова
//так же был введен новый необязательный параметр как 'allStart' который дополнительно рисует тумблер и вешает на него обработчик.
//если allStart: false то можно сделать свой переключатель и подцепить обработчик через доп. метод el.gauge(rotateArrow(180));