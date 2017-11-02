/*!
 * clever.js
 * @author  @lamchang
 * @version 0.0.1
 * @url
 */
{

    var cleverCount = 0;
    var clever;

    class Clever {

        constructor(element, options) {

            clever = this;

            this.DOM = {};
            this.DOM.element = element;
            this.options = {
                class: null,
                data: 'value',
                animation: true,
                linked: true,
                dropPositionAuto: true
            };
            Object.assign(this.options, options);

            // If has a element & and if element is not an array...
            if( element && this.DOM.element.toString() != '[object NodeList]' && this.DOM.element.init != true ) {
                this._build();
                if(this.options.dropPositionAuto) this.dropPositionAuto();
            // Else...
            } else {
                // If element is an array...
                if(this.DOM.element.toString() == '[object NodeList]') {
                    console.warn("This is an Array, must to be an object for works properly");
                // else is was initilized...
                } else if (this.DOM.element.init == true) {
                    console.error(this.DOM.element.tagName + '#' + this.DOM.element.id, " This object is already initilized before (maybe is repeat it).");
                // If there is not an element...
                } else {
                    console.warn("There isn't an object selected");
                }
            }
        }

        // Build
        _build () {
            this.DOM.element.init = true;
            this.DOM.element.classList.add ('clever-element', 'clever--hide', 'clever-initialized');
            this.DOM.element.currentOption = this.InitialOption();
            this.DOM.element.selectOptions = this.DOM.element.querySelectorAll ('option');
            var options = new Array;

            // Select
            this.DOM.element.select = document.createElement ('div');
            this.DOM.element.select.classList.add ('clever', 'clever-initilized');
            if(this.options.class) this.DOM.element.select.classList.add (this.options.class);
            this.DOM.element.select.id = 'CleverHal' + cleverCount;
            cleverCount++;

            // Icon
            this.DOM.element.icon = document.createElement ('i');
            this.DOM.element.icon.classList.add ('clever__icon', 'clever-icon-dropdown');

            // Field
            this.DOM.element.field = document.createElement ('button');
            this.DOM.element.field.type = 'button';
            this.DOM.element.field.role = 'button';
            this.DOM.element.field.className = 'clever__field';

            // Current option
            this.DOM.element.current = document.createElement ('p');
            this.DOM.element.current.className = 'clever__current-option';
            this.DOM.element.current.innerHTML = this.DOM.element.currentOption;

            // Dropdown
            this.DOM.element.dropdown = document.createElement ('div');
            this.DOM.element.dropdown.className = 'clever__dropdown';

            // List
            this.DOM.element.list = document.createElement ('ul');
            this.DOM.element.list.className =  'clever__list';

            // Options
            for ( var i = 0; i < this.DOM.element.selectOptions.length; i++ )
            {
                // OptionAnchor
                var optionValue = document.createElement ('div');
                    optionValue.className = 'clever__option__value';
                    optionValue.setAttribute ('role', 'option');
                    optionValue.innerHTML = this.OptionValue (i);

                // Option
                var option = document.createElement ('li');
                    option.parent = this;
                    option.className = 'clever__option';
                    if (this.DOM.element.selectOptions[i].selected) option.classList.add ('clever--active');
                    option.dataset.value = this.DOM.element.selectOptions[i].getAttribute (this.options.data);
                    option.dataset.index = i;
                    option.innerHTML = '<i class="clever__icon  clever-icon-checked"></i>';
                    option.appendChild (optionValue);

                // Dibujamos "option" en el DOM
                this.DOM.element.list.appendChild (option);

                // Agregamos "option" a arreglo "options"
                options.push (option);

                // Agregamos evento click a "option"
                option.addEventListener ('click', OptionActions);

            }


            function OptionActions (thisDom) {
                // Removemos "active" de todos los "option"
                for ( var i = 0; i < options.length; i++ ) {

                    options[i].classList.remove ('clever--active');
                    this.parent.DOM.element.selectOptions[i].selected = false;
                    this.parent.DOM.element.selectOptions[i].removeAttribute ('selected');

                }

                // Agregamos "active" en "option" seleccionada
                this.classList.add ('clever--active');
                if(this.parent.options.linked) this.parent.DOM.element.selectOptions[this.dataset.index].selected = true;
                this.parent.DOM.element.currentOption = this.dataset.value;
                this.parent.DOM.element.current.innerHTML = this.querySelector('.clever__option__value').innerHTML;
                this.parent.DOM.element.select.dataset.value = this.dataset.value;
            }

            // Appends
            this.DOM.element.parentNode.insertBefore (this.DOM.element.select, this.DOM.element);
            this.DOM.element.select.appendChild (this.DOM.element);
            this.DOM.element.select.appendChild (this.DOM.element.field);
            this.DOM.element.field.appendChild (this.DOM.element.current);
            this.DOM.element.field.appendChild (this.DOM.element.icon);
            this.DOM.element.select.appendChild (this.DOM.element.dropdown);
            this.DOM.element.dropdown.appendChild (this.DOM.element.list);

            // Events
            document.addEventListener('click', this.closeDropdown);
            this.DOM.element.select.addEventListener ('click', this.openDropdown);

        }

        InitialOption () {
            // If option is selected...
            if (this.DOM.element.querySelector ('option[selected]')) {
                // If option has a "data-content"...
                if (this.DOM.element.querySelector ('option[selected]').dataset.content) {
                    // ..return "dataset-content"
                    return this.DOM.element.querySelector ('option[selected]').dataset.content;
                } else {
                    // ..return "option.options.data"
                    return this.DOM.element.querySelector ('option[selected]').getAttribute (this.options.data);
                }
            }
            // else...
            else {
                var opt = this.DOM.element.querySelectorAll ('option');
                    opt[0].selected = true;
                // If option has a "data-content"...
                if(opt[0].dataset.content) {
                    // ..return first "option.options.data"
                    return opt[0].dataset.content;
                } else {
                    // ..return first "option.options.data"
                    return opt[0].getAttribute (this.options.data);
                }
            }
        }

        openDropdown () {
            var selects = document.querySelectorAll ('.clever-element');

            for (var i = 0; i < selects.length; i++) {
                if( selects[i].id != this.id ) {

                    selects[i].classList.remove ('clever--focus');
                    selects[i].dropdown.classList.remove ('clever--active');
                }

            }

            this.parentNode.querySelector('select').select.classList.toggle ('clever--focus');
            this.parentNode.querySelector('select').dropdown.classList.toggle ('clever--active');
        }

        closeDropdown () {
            if (event.target.closest('.clever') == null) {

                var selects = document.querySelectorAll ('.clever');

                for (var i = 0; i < selects.length; i++) {
                    selects[i].classList.remove ('clever--focus');
                    selects[i].querySelector('select').dropdown.classList.remove ('clever--active');
                }

            }
        }

        OptionValue (i) {
            if(this.DOM.element.selectOptions[i].dataset.content) {
                return this.DOM.element.selectOptions[i].dataset.content;
            } else {
                return this.DOM.element.selectOptions[i].innerHTML;
            }
        }

        CheckValue (element) {
            console.log(element.value);
        }

        // Change de dropdown position
        dropPositionAuto () {

            var clever = this;

            // Catch event "scroll"
            window.addEventListener('scroll', function() {
                var dropdownTop = clever.DOM.element.dropdown.getBoundingClientRect().top;
                var dropdownBottom = dropdownTop + clever.DOM.element.list.offsetHeight;
                var dropdownSize = dropdownTop + (clever.DOM.element.list.offsetHeight * 2) + clever.DOM.element.select.offsetHeight;

                // If window scroll is bigger or equal to select position...
                if(dropdownTop < 0 || dropdownSize < window.innerHeight) {

                    // ...change the dropdown position to down
                    clever.DOM.element.dropdown.style.top = '100%';
                    clever.DOM.element.dropdown.style.bottom = 'initial';

                }
                else if(dropdownBottom > window.innerHeight) {

                    // ...change the dropdown position to up
                    clever.DOM.element.dropdown.style.top = 'initial';
                    clever.DOM.element.dropdown.style.bottom = '100%';

                }
            });

        }

    };

    window.Clever = Clever;
};
