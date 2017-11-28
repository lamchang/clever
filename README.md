clever
-------

[1]: <https://github.com/lamchang/clever>

_Has que tu etiqueta `<select>` lusca increible!_

Clever es una clase creada con JavaScript para permitir la customización de las etiquetas `<select>` creando un equivalente con otras etiquetas html.

#### Tabla de contenido
1. [Demo](#demo)
1. [Empezar](#empezar)
1. [Incluir clever](#agregar-clever)
1. [Invocar clever](#invocar-clever)
1. [Settings](#settings)

#### Demo

[https://https://github.com/lamchang/clever](https://https://github.com/lamchang/clever)

Empezar

Archivos necesarios:
1. clever.min.css (opcional)
2. clever.min.js

Para empezar con el uso de clever siguie los siguientes pasos:

##### Incluir clever

(Opcional) Si deseas tener la aparencia por defecto de clever puedes agregar el archivo `clever.min.css` dentro de la etiqueta `<head>`:

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
  <!-- Se agrega clever.min.js al documento -->
  <script src="js/clever.min.js"></script>
  <!-- El código crea una instacia de la clase Clever debe ir después de que esta sea declarada -->
</body>
```

##### Instanciar clever

Primero asegurate de que tu `<select>` tenga la siguiente estructura:

```html
<select id="SelectVehicle">
  <option value="DeLorean">DeLorean</option>
  <option value="MillenniumFalcon">Millennium Falcon</option>
  <option value="Enterprise">Enterprise</option>
</select>
```

Se instancia clever tal como se muestra a continuación:

```js
// Se crea una instacia de la clase Clever
var selectVehicle = new Clever( document.getElementById('selectVehicle') );
```

y es posible modificar sus opciones desde el html agregando el atributo `data-clever` de la siguiente forma: 
```js
<select id="SelectVehicle" data-clever="{class: 'my-class', appenTo: document.body}">
  ...
</select>
```
o desde JavaScript como se muestra abajo:

```js
// Se crea una instacia de la clase Clever y se modifican sus opciones
var selectVehicle = new Clever( document.getElementById('selectVehicle'), {
    class: 'my-select',
    appenTo: document.body
  }
);
```

### Uso de métodos

Para ejecutar _scripts_ existen 3 métodos que serán de utilidad `onInit`, `onClick` y `onChange`.

`onInit`. Se invoca después de que la estructura HTML de _Clever_ sea construida.

```js
// Uso de método "onInit"
var selectVehicle = new Clever( document.getElementById('selectVehicle'), {
    onInit: function(){

      // Se invoca el método "toggleDropdown" para desplegar dropdown después construirse la estructura
      this.toggleDropdown();

    }
  }
);

```

`onClick`. Éste método es invocado al hacer click en el objeto `select` o cuando es invocado el método `toggleDropdown`, por lo que se ejecutara sin importar si el _dropdown_ esta deplegado o no.

```js
// Uso de método "onInit"
var selectVehicle = new Clever( document.getElementById('selectVehicle'), {
    onClick: function(){

      // Si el valor de "selectVehicle" es igual a "true"...
      if(this.focus == true) {
        // ... Se imprime en la consola
        console.log('El dropdown esta desplegado');
      }
      // ...en otro caso...
      else {
        // ... Se imprime en la consola
        console.log('El dropdown no esta desplegado');
      }

    }
  }
);

// Se imprimirá en consola 
Si es igual a true: El dropdown esta desplegado
Si es igual a false: El dropdown no esta desplegado

```

`onChange`. Es invocado cuando el valor del objeto `select` cambia.

```js
// Uso de método "onInit"
var selectVehicle = new Clever( document.getElementById('selectVehicle'), {
    onChange: function(){

      // ... Se imprime en la consola
      console.log('Cambiaste la opción por ' + this.value);

    }
  }
);

// Se imprimirá en consola 
Cambiaste la opción por MillenniumFalcon

```

#### Settings

Option | Type | Default | Descripción
------ | ---- | ------- | -----------
class | string | '' | Permite agregar una clase al objet Clever.
getData | string | 'value' | Especifica de que atributo tomara _clever_ el valor, ejemplo: `<option value="DeLorean" car="DeLorean">DeLorean</option>` para esta estructura modificamos la opción para que tome el atributo `car` de la siguiente manera `var selectVehicle = new Clever( document.getElementById('SelectVehicle', {data: 'car'}) );`.
linked | boolean | true | Liga la estructura HTML de clever con el `<select>`.
dropPositionAuto | boolean | true | Cambia automaticamente la posición del _dropdown_ dependiendo de la posición del scroll.
appendTo | DOM object | null | Define el objeto del DOM dónde se creará el _dropdown_.

Method | Argument | Descripción
------ | -------- | -----------
`onInit` | function | Es invocado después de la contrucción de la estructura `HTML` de _Clever_, se puede utilizar `this` para acceder a la clase.
`onClick` | function | Es invocado al desplegar las opciones del `select`, se puede utilizar `this` para acceder a la clase.
`onChange` | function | Es invocado cuando se elige una opción diferente a la ya seleccionada, se puede utilizar `this` para acceder a la clase.
`toggleDropdown` | | Muestra u oculta el _dropdown_.
`destroy` | | Destruye Clever.




