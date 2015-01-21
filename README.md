# GM_gauge

Построение круговой шкалы из HTML списка (блоков). Отрисовка через элемент canvas, анимация поворота стрелки через css3 анимацию. Две версии скрипта: как отдельный javascript класс (без зависимостей) и как jquery плагин. 

  - Декларативный подход (html список как основа графика)
  - Высокая скорость отрисовки и выполнения (Firefox 35 | 3.5ms)
  - Рисуется canvas элементом
  - Поддержка интернет браузерами и IE9+

![круговая шкала](https://raw.github.com/GM2mars/GM_gauge/master/gauge.png)
### Установка
```
$ component install GM2mars/GM_gauge
```
###Пример
```
//CSS
//задаем размер и стиль шрифта для значений
#gauge {
	width: 450px;
	height: 450px;
	color: #40434A;
	font-size: 14px;
	font-family: "Tahoma";
}
//HTML
//родительский элемент как контейнер, а дочерние как единицы значения на шкале.
//data-color атрибут указывает цвет отрезка
//свойство selected указывает текущий выбранный элемент
<ul id="gauge">
	<li data-color='#6DD346'>ноль</li>
	<li>1</li>
	<li>два</li>
	<li>3</li>
	<li data-color='#65C2DE' selected >четыре</li>
	<li data-color='#59506A'>5</li>
	<li data-color='#E56C6C'>шесть</li>
</ul>

<script>
//js
//в круглых скобках необязательные параметры
var gauge=new Gauge('gauge', {'apert': 320, 'lineWidth': 6});
gauge.runDrawGauge();

//jQuery
jQuery(document).ready(function() {
	var el=jQuery('#gauge');
	el.gauge();
});
</script>

### Параметры JS

(в скобках параметры по умолчанию)
- apert - "апертура" шкалы в градусах \[int\] (225)
- radius - радиус шкалы \[int\] (70% от меньшей стороны блока)
- insideText - расположение текста со значением внутри шкалы \[bool\] (false)
- lineWidth - толщина линии шкалы \[int\] (2)
- color - цвет линий шкалы \[hex code\] (#51545B)

для jquery дополнительно
- allStart - создает тумблер и вешает на него обработчик \[bool\] (true) | если false, то можно сделать свой переключатель и через метод rotateArrow(deg) поворачивать стрелку.

### Параметры CSS
- width - длина шкалы/блока
- height - высота шкалы/блока
- color - цвет текста значений
- font-size - размер шрифта
- font-family - семейство шрифта
