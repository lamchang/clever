clever
_______

[1]: <https://github.com/lamchang/clever>

_has que tu etiqueta `<select>` lusca increible!_

clever es una clase creada con JavaScript para permitir la customización de las etiquetas `<select>` creando un equivalente con otras etiquetas html.

#### Demo

[https://https://github.com/lamchang/clever](https://https://github.com/lamchang/clever)

#### Instrucciones

_Agregar clever_

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

_Invocar clever_

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

