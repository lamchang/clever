clever
-------

[1]: <https://github.com/lamchang/clever>

_has que tu etiqueta `<select>` lusca increible!_

clever es una clase creada con JavaScript para permitir la customización de las etiquetas `<select>` creando un equivalente con otras etiquetas html.

#### Tabla de contenido
1. [Demo](#demo)
1. [Empezar](#empezar)
1. [Invocar clever](#invocar-clever)
1. [Settings](#settings)

#### Demo

[https://https://github.com/lamchang/clever](https://https://github.com/lamchang/clever)

#### Empezar

##### Agregar clever

Si deseas tenes la aparencia por defecto de clever puedes agregar los estilos dentro de la etiqueta `<head>`:

```html
  ...
  ...
  <link href="css/clever.min.css" rel="stylesheet" type="text/css">
</head>
```

Para utilizar *clever* es necesario colocar el archivo *clever.min.js* antes del cierre de la etiqueta `</body>` como se muestra a continuación:

```html
  ...
  ...
  <!-- Agregamos clever.min.js al documento -->
  <script src="js/clever.min.js"></script>
  <!-- El código que invoca a la clase clever debe ir después de que este sea declarado -->
</body>
```

##### Invocar clever

Primero asegurate de que tu `<select>` tenga la siguiente estructura:

```html
<select>
  <option value="DeLorean">DeLorean</option>
  <option value="MillenniumFalcon">Millennium Falcon</option>
  <option value="Enterprise">Enterprise</option>
</select>
```

Invocamos clever tal como se muestra a continuación:

```js
// Invocamos la clase Clever
var selectVehicle = new Clever( document.getElementById('selectVehicle') );
```

y es posible modificar sus opciones:

Para modificar las opciones desde el html es necesario agregar el atributo `data-clever` de la siguiente forma: `<select data-clever="{class: 'my-class', animation: false}">`, o desde JavaScript como se muestra abajo:

```js
// Invocamos la clase Clever y modificamos sus opciones
var selectVehicle = new Clever( document.getElementById('selectVehicle', {class: 'my-select'}) );
```


#### Settings

Option | Type | Default | Descripción
------ | ---- | ------- | -----------
class | string | '' | Permite agregar una clase con el nombre que se desee.
data | string | 'value' | Especifica de que atributo tomara _clever_ el valor, ejemplo: `<option value="DeLorean" car="DeLorean">DeLorean</option>` para esta estructura modificamos la opción para que tome el atributo `car` de la siguiente manera `var selectVehicle = new Clever( document.getElementById('selectVehicle', {data: 'car'}) );`.
animation | boolean | true | Activa o desactiva las animaciones por defecto.
linked | boolean | true | Liga la estructura HTML de clever con el `<select>`.
changePosition | boolean | true | Cambia automaticamente la posición del _dropdown_ dependiendo de la posición del scroll.



