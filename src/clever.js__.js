/*!
 * clever.js
 * @author  @lamchang
 * @version 0.0.1
 * @url
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.clever = factory();
    }
}(this, function() {
    // Var for count the clever created elements
    var cleverCount = 0;

    function Select (element, options) {
        // If has a element & and if element is not an array...
        if( element && Object.prototype.toString.call(element) != '[object NodeList]' && element.init != true ) {

            // ...Config
            var defaults = {
                class: null,
                data: 'value',
                animation: true,
                linked: true
            };

            // ...Extends config
            element.opt = extend ({}, defaults, options);

            // If element is not initialized before...

            // ...buil
            _build.call (element);
            console.log(element.id);

        // Else...
        } else {
            // If element is an array...
            if(Object.prototype.toString.call(element) == '[object NodeList]') {
                console.warn("This is an Array, must to be an object for works properly");
            // else is was initilized...
            } else if (element.init == true) {
                console.error(element.tagName + '#' + element.id, " This object is already initilized before (maybe is repeat it).");
            // If there is not an element...
            } else {
                console.warn("There isn't an object selected");
            }
        }
    }
    /*
    Select.prototype.init = function () {
        if (this.clever) {
            return;
        }

        _build.call(this);
        //_bindEvents.call(this);

    }*/

    Select.prototype.destroy = function (element) {
        //console.log(element);
    }

    function _build () {

        this.init = true;
        this.classList.add ('clever--hide', 'clever-initialized');
        this.currentOption = InitialOption.call(this);
        this.allOptions = this.querySelectorAll ('option');
        var options = new Array;

        // Create a DocumentFragment to build with
        docFrag = document.createDocumentFragment ();

        // Select
        this.select = document.createElement ('div');
        this.select.classList.add ('clever', 'clever-initilized');
        if(this.opt.class) this.select.classList.add (this.opt.class);
        this.select.id = 'CleverHal' + cleverCount;
        cleverCount++;

        // Icon
        this.select.icon = document.createElement ('i');
        this.select.icon.classList.add ('clever__icon', 'clever-icon-dropdown');

        // Field
        this.select.field = document.createElement ('button');
        this.select.field.type = 'button';
        this.select.field.role = 'button';
        this.select.field.className = 'clever__field';

        // Current option
        this.select.current = document.createElement ('p');
        this.select.current.className = 'clever__current-option';
        this.select.current.innerHTML = this.currentOption;

        // Dropdown
        this.select.dropdown = document.createElement ('div');
        this.select.dropdown.className = 'clever__dropdown';

        // List
        this.select.list = document.createElement ('ul');
        this.select.list.className =  'clever__list';

        // Options
        for ( var i = 0; i < this.allOptions.length; i++ )
        {
            // OptionAnchor
            var optionValue = document.createElement ('div');
                optionValue.className = 'clever__option__value';
                optionValue.setAttribute ('role', 'option');
                optionValue.innerHTML = OptionValue (this, i);

            // Option
            var option = document.createElement ('li');
                option.parent = this;
                option.className = 'clever__option';
                if (this.allOptions[i].selected) option.classList.add ('clever--active');
                option.dataset.value = this.allOptions[i].getAttribute (this.opt.data);
                option.dataset.index = i;
                option.innerHTML = '<i class="clever__icon  clever-icon-checked"></i>';
                option.appendChild (optionValue);

            // Dibujamos "option" en el DOM
            this.select.list.appendChild (option);

            // Agregamos "option" a arreglo "options"
            options.push (option);

            // Agregamos evento click a "option"
            option.addEventListener ('click', OptionActions);

        }


        function OptionActions (e) {
            // Removemos "active" de todos los "option"
            for ( var i = 0; i < options.length; i++ ) {

                options[i].classList.remove ('clever--active');
                this.parent.allOptions[i].selected = false;
                this.parent.allOptions[i].removeAttribute ('selected');

            }

            // Agregamos "active" en "option" seleccionada
            this.classList.add ('clever--active');
            if(this.parent.opt.linked) this.parent.allOptions[this.dataset.index].selected = true;
            this.parent.currentOption = this.dataset.value;
            this.parent.select.current.innerHTML = this.querySelector('.clever__option__value').innerHTML;
            this.parent.select.dataset.value = this.dataset.value;
        }

        // Appends
        this.parentNode.insertBefore (this.select, this);
        this.select.appendChild (this);
        this.select.appendChild (this.select.field);
        this.select.field.appendChild (this.select.current);
        this.select.field.appendChild (this.select.icon);
        this.select.appendChild (this.select.dropdown);
        this.select.dropdown.appendChild (this.select.list);

        // Events
        document.addEventListener('click', HideDropdown);
        this.select.addEventListener ('click', Dropdown);
        var tempThis = this;
        this.select.addEventListener ('click', function(){
            CheckValue (tempThis);
        });
    }

    // -----------------------------------------------------------
    //  helpers
    // -----------------------------------------------------------

    function extend() {
        for (var i = 1; i < arguments.length; i++) {
            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
                    arguments[0][key] = arguments[i][key];
                }
            }
        }
        return arguments[0];
    }

    function InitialOption () {
        // If option is selected...
        if (this.querySelector ('option[selected]')) {
            // If option has a "data-content"...
            if (this.querySelector ('option[selected]').dataset.content) {
                // ..return "dataset-content"
                return this.querySelector ('option[selected]').dataset.content;
            } else {
                // ..return "option.opt.data"
                return this.querySelector ('option[selected]').getAttribute (this.opt.data);
            }
        }
        // else...
        else {
            var opt = this.querySelectorAll ('option');
                opt[0].selected = true;
            // If option has a "data-content"...
            if(opt[0].dataset.content) {
                // ..return first "option.opt.data"
                return opt[0].dataset.content;
            } else {
                // ..return first "option.opt.data"
                return opt[0].getAttribute (this.opt.data);
            }
        }
    }

    function Dropdown () {
        var selects = document.querySelectorAll ('.clever');

        for (var i = 0; i < selects.length; i++) {
            if( selects[i].id != this.id ) {

                selects[i].classList.remove ('clever--focus');
                selects[i].dropdown.classList.remove ('clever--active');
            }

        }

        this.classList.toggle ('clever--focus');
        this.dropdown.classList.toggle ('clever--active');
    }

    function HideDropdown () {
        if (event.target.closest('.clever') == null) {

            var selects = document.querySelectorAll ('.clever');

            for (var i = 0; i < selects.length; i++) {
                selects[i].classList.remove ('clever--focus');
                selects[i].dropdown.classList.remove ('clever--active');
            }

        }
    }

    function OptionValue (select, i) {
        if(select.allOptions[i].dataset.content) {
            return select.allOptions[i].dataset.content;
        } else {
            return select.allOptions[i].innerHTML;
        }
    }

    function CheckValue (element) {
        console.log(element.value);
    }

    return {
        select: Select
    }

}));
