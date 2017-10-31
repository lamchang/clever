/*!
 * clever.js
 * @author  @lamchang
 * @version 0.0.1
 * @url
 */
{
    var cleverCount = 0;

    class Clever {
        constructor(element, options) {
            var classs = this;
            this.DOM = {};
            this.DOM.element = element;
            this.options = {
                class: null,
                data: 'value',
                animation: true,
                linked: true,
                changePosition: true
            };
            Object.assign(this.options, options);

            // If has a element & and if element is not an array...
            if( element && this.DOM.element.toString() != '[object NodeList]' && this.DOM.element.init != true ) {
                this._build();
                if(this.options.changePosition) this.AutoPosition();
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
            this.DOM.element.classList.add ('clever--hide', 'clever-initialized');
            this.DOM.element.currentOption = this.InitialOption();
            this.DOM.element.allOptions = this.DOM.element.querySelectorAll ('option');
            var options = new Array;

            // Select
            this.DOM.element.select = document.createElement ('div');
            this.DOM.element.select.classList.add ('clever', 'clever-initilized');
            if(this.options.class) this.DOM.element.select.classList.add (this.options.class);
            this.DOM.element.select.id = 'CleverHal' + cleverCount;
            cleverCount++;

            // Icon
            this.DOM.element.select.icon = document.createElement ('i');
            this.DOM.element.select.icon.classList.add ('clever__icon', 'clever-icon-dropdown');

            // Field
            this.DOM.element.select.field = document.createElement ('button');
            this.DOM.element.select.field.type = 'button';
            this.DOM.element.select.field.role = 'button';
            this.DOM.element.select.field.className = 'clever__field';

            // Current option
            this.DOM.element.select.current = document.createElement ('p');
            this.DOM.element.select.current.className = 'clever__current-option';
            this.DOM.element.select.current.innerHTML = this.DOM.element.currentOption;

            // Dropdown
            this.DOM.element.select.dropdown = document.createElement ('div');
            this.DOM.element.select.dropdown.className = 'clever__dropdown';

            // List
            this.DOM.element.select.list = document.createElement ('ul');
            this.DOM.element.select.list.className =  'clever__list';

            // Options
            for ( var i = 0; i < this.DOM.element.allOptions.length; i++ )
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
                    if (this.DOM.element.allOptions[i].selected) option.classList.add ('clever--active');
                    option.dataset.value = this.DOM.element.allOptions[i].getAttribute (this.options.data);
                    option.dataset.index = i;
                    option.innerHTML = '<i class="clever__icon  clever-icon-checked"></i>';
                    option.appendChild (optionValue);

                // Dibujamos "option" en el DOM
                this.DOM.element.select.list.appendChild (option);

                // Agregamos "option" a arreglo "options"
                options.push (option);

                // Agregamos evento click a "option"
                option.addEventListener ('click', OptionActions);

            }


            function OptionActions (thisDom) {
                // Removemos "active" de todos los "option"
                for ( var i = 0; i < options.length; i++ ) {

                    options[i].classList.remove ('clever--active');
                    this.parent.DOM.element.allOptions[i].selected = false;
                    this.parent.DOM.element.allOptions[i].removeAttribute ('selected');

                }

                // Agregamos "active" en "option" seleccionada
                this.classList.add ('clever--active');
                if(this.parent.options.linked) this.parent.DOM.element.allOptions[this.dataset.index].selected = true;
                this.parent.DOM.element.currentOption = this.dataset.value;
                this.parent.DOM.element.select.current.innerHTML = this.querySelector('.clever__option__value').innerHTML;
                this.parent.DOM.element.select.dataset.value = this.dataset.value;
            }

            // Appends
            this.DOM.element.parentNode.insertBefore (this.DOM.element.select, this.DOM.element);
            this.DOM.element.select.appendChild (this.DOM.element);
            this.DOM.element.select.appendChild (this.DOM.element.select.field);
            this.DOM.element.select.field.appendChild (this.DOM.element.select.current);
            this.DOM.element.select.field.appendChild (this.DOM.element.select.icon);
            this.DOM.element.select.appendChild (this.DOM.element.select.dropdown);
            this.DOM.element.select.dropdown.appendChild (this.DOM.element.select.list);

            // Events
            document.addEventListener('click', this.HideDropdown);
            this.DOM.element.select.addEventListener ('click', this.Dropdown);
            var tempThis = this;
            var tempEl = this.DOM.element
            this.DOM.element.select.addEventListener ('click', function(){
                tempThis.CheckValue (tempEl);
            });

            var classs = this;

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

        Dropdown () {
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

        HideDropdown () {
            if (event.target.closest('.clever') == null) {

                var selects = document.querySelectorAll ('.clever');

                for (var i = 0; i < selects.length; i++) {
                    selects[i].classList.remove ('clever--focus');
                    selects[i].dropdown.classList.remove ('clever--active');
                }

            }
        }

        OptionValue (i) {
            if(this.DOM.element.allOptions[i].dataset.content) {
                return this.DOM.element.allOptions[i].dataset.content;
            } else {
                return this.DOM.element.allOptions[i].innerHTML;
            }
        }

        CheckValue (element) {
            console.log(element.value);
        }

        // Change de dropdown position
        AutoPosition () {
            var clever = this;

            // Catch event "scroll"
            window.addEventListener('scroll', function() {

                // If window scroll is bigger or equal to select position...
                if( window.pageYOffset > clever.DOM.element.select.dropdown.getBoundingClientRect().top ) {

                    // ...change the dropdown position
                    clever.DOM.element.select.dropdown.style.top = '100%';
                    clever.DOM.element.select.dropdown.style.bottom = 'initial';

                }
                else if(window.pageYOffset < clever.DOM.element.select.dropdown.getBoundingClientRect().top + clever.DropdownSize()) {

                    // ...change the dropdown position
                    clever.DOM.element.select.dropdown.style.top = 'initial';
                    clever.DOM.element.select.dropdown.style.bottom = '100%';
                    
                }
            });
            
        }

        DropdownSize () {
            var optionsCount = this.DOM.element.allOptions.length;
            var optionHeight = this.DOM.element.select.list.querySelector('.clever__option:first-of-type').offsetHeight;
            
            return optionsCount * optionHeight;
        }

    };

    window.Clever = Clever;
};
