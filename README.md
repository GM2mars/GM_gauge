# GM_gauge

Круговая шкала со стрелкой.

  - Без зависимостей, чистый javascript
  - Шкала строится на основе HTML блоков
  - Удобное конфигурирование через css файл стилей
  - Рисуется canvas элементом

### Установка
### Параметры JS
(в скобках параметры по умолчанию)
- apert - "апертура" шкалы в градусах \[int\] (225)
- radius - радиус шкалы \[int\] (70% от меньшей стороны блока)
- insideText - расположение текста со значением внутри шкалы \[bool\] (false)
- lineWidth - толщина линии шкалы \[int\] (2)
- color - цвет линий шкалы \[hex code\] (#51545B)

### Параметры CSS
- width - длина шкалы/блока
-	height - высота шкалы/блока
-	color - цвет текста значений
-	font-size - размер шрифта
-	font-family - семейство шрифта

###Пример
HTML блоки как основа. Родительский блок - главный блок, который конфигурируется в css файле, а id указывается при создании круговой шкалы.
Дочерние блоки - список значений, data-color атрибут - это цвет сектора значения, а свойство "selected" указывает на активное значение шкалы.
```
//CSS
#gauge {
	width: 450px;
	height: 450px;
	color: #40434A;
	font-size: 14px;
	font-family: "Tahoma";
}
//HTML
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
var gauge=new Gauge('gauge', {'apert': 320, 'lineWidth': 6});
gauge.runDrawGauge();
</script>
