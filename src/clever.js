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

            this.focus = false;
            this.DOM = {};
            this.DOM.element = element;
            this.options = {
                id: null,
                class: null,
                getData: 'value',
                animation: true,
                linked: true,
                dropPositionAuto: true,
                // Methods
                cleverInit: ()=>{},
                cleverFocus: ()=>{},
                cleverChange: ()=>{}
            };
            this.options.clever = this;

            Object.assign(this.options, options);
            this._init(element);
        }

        _init (element) {
            // If has a element & and if element is not an array...
            if( element && this.DOM.element.toString() != '[object NodeList]' && this.DOM.element.init != true ) {
                this._build();
                this.options.cleverInit();
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
            // Save "this" into variable "clever"
            var clever = this;
            // Create event "change" trigger
            var triggerChange = new Event('change');

            // Define DOM variables and elements
            this.DOM.element.init = true;
            this.DOM.element.classList.add ('clever-element', 'clever--hide', 'clever-initialized');
            var options = new Array;

            // Select
            this.DOM.element.select = document.createElement ('div');
            this.DOM.element.select.classList.add ('clever', 'clever-initilized');
            if(this.options.class) this.DOM.element.select.classList.add (this.options.class);
            this.DOM.element.select.id = this.options.id;
            this.DOM.element.select.clever = this;

            // Define options variables
            this.value = this.initialOption().value;
            this.index = this.initialOption().index;
            this.DOM.element.select.currentOption = this.initialOption().value;
            this.DOM.element.select.selectOptions = this.DOM.element.querySelectorAll ('option');
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
            this.DOM.element.select.current.innerHTML = this.DOM.element.select.currentOption;

            // Dropdown
            this.DOM.element.select.dropdown = document.createElement ('div');
            this.DOM.element.select.dropdown.className = 'clever__dropdown';

            // List
            this.DOM.element.select.list = document.createElement ('ul');
            this.DOM.element.select.list.className =  'clever__list';
            // Options
            for ( var i = 0; i < this.DOM.element.select.selectOptions.length; i++ )
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
                    if (this.DOM.element.select.selectOptions[i].selected) option.classList.add ('clever--active');
                    option.dataset.value = this.DOM.element.select.selectOptions[i].getAttribute (this.options.getData);
                    option.dataset.cleverIndex = i;
                    option.innerHTML = '<i class="clever__icon  clever-icon-checked"></i>';
                    option.appendChild (optionValue);

                // Create "option" into DOM
                this.DOM.element.select.list.appendChild (option);

                // Add "option" into array "options"
                options.push (option);

                // Add event click to "option"
                option.addEventListener ('click', OptionActions);

            }


            function OptionActions () {
                var currentIndex = clever.index;

                // Remove "active" from all "option"
                for ( var i = 0; i < options.length; i++ ) {

                    options[i].classList.remove ('clever--active');
                    clever.DOM.element.select.selectOptions[i].selected = false;
                    clever.DOM.element.select.selectOptions[i].removeAttribute ('selected');

                }

                // Add "active" in the selected "option"
                this.classList.add ('clever--active');
                // If options "linked" is equal true select the option from <select> tag...
                if(clever.options.linked) clever.DOM.element.select.selectOptions[this.dataset.cleverIndex].selected = true;
                clever.DOM.element.select.currentOption = this.dataset.value;
                clever.DOM.element.select.current.innerHTML = this.querySelector('.clever__option__value').innerHTML;
                clever.DOM.element.select.dataset.value = this.dataset.value;
                // Change class values
                clever.value = this.dataset.value;
                clever.index = this.dataset.cleverIndex;

                // If selected option is diferent to current option...
                if(this.dataset.cleverIndex != currentIndex) {
                    // ...dispatch event "change"
                    clever.DOM.element.dispatchEvent(triggerChange);
                    // ...invoke callback change()
                    clever.options.cleverChange();
                }
            }

            // Appends for DOM objects
            this.DOM.element.parentNode.insertBefore (this.DOM.element.select, this.DOM.element);
            this.DOM.element.select.appendChild (this.DOM.element);
            this.DOM.element.select.appendChild (this.DOM.element.select.field);
            this.DOM.element.select.field.appendChild (this.DOM.element.select.current);
            this.DOM.element.select.field.appendChild (this.DOM.element.select.icon);
            this.DOM.element.select.appendChild (this.DOM.element.select.dropdown);
            this.DOM.element.select.dropdown.appendChild (this.DOM.element.select.list);

            // Events
            document.addEventListener('click', function() {
                clever.closeDropdown();
            });
            this.DOM.element.select.addEventListener ('click', this.openDropdown);

        }

        initialOption () {
            // If option is selected...
            if (this.DOM.element.querySelector ('option[selected]')) {
                // If option has a "data-content"...
                if (this.DOM.element.querySelector ('option[selected]').dataset.content) {
                    // ..return "dataset-content"
                    return {
                        'value': this.DOM.element.querySelector ('option[selected]').dataset.content,
                        'index': this.DOM.element.querySelector ('option[selected]').index,
                    };
                } else {
                    // ..return "option.options.getData"
                    return {
                        'value': this.DOM.element.querySelector ('option[selected]').getAttribute (this.options.getData),
                        'index': this.DOM.element.querySelector ('option[selected]').index
                    };
                }
            }
            // else...
            else {
                var opt = this.DOM.element.querySelectorAll ('option');
                    opt[0].selected = true;
                // If option has a "data-content"...
                if(opt[0].dataset.content) {
                    // ..return first "option.options.getData"
                    return {
                        'value': opt[0].dataset.content,
                        'index': opt[0].index
                    };
                } else {
                    // ..return first "option.options.getData"
                    return {
                        'value': opt[0].getAttribute (this.options.getData),
                        'index': opt[0].index
                    };
                }
            }
        }

        openDropdown () {
            var selects = document.querySelectorAll ('.clever');

            for (var i = 0; i < selects.length; i++) {
                if( selects[i].id != this.id ) {

                    selects[i].classList.remove ('clever--focus');
                    selects[i].dropdown.classList.remove ('clever--active');
                }

            }

            this.classList.toggle ('clever--focus');
            this.dropdown.classList.toggle ('clever--active');

            if(this.classList.contains('clever--focus')) {
                this.clever.focus = true;
                this.clever.options.cleverFocus();
            } else {
                this.clever.focus = false;
                this.clever.options.cleverFocus();
            }
        }

        closeDropdown () {
            console.log(event.target);

            if (event.target.closest('.clever') == null) {
                console.log(event.type);

                var selects = document.querySelectorAll ('.clever');

                for (var i = 0; i < selects.length; i++) {
                    selects[i].classList.remove ('clever--focus');
                    selects[i].dropdown.classList.remove ('clever--active');
                }

                // Changes focus value to false
                this.focus = false;
                // Invoke "cleverFocus()" method
                this.options.cleverFocus();

            } else {

            }
        }

        OptionValue (i) {
            if(this.DOM.element.select.selectOptions[i].dataset.content) {
                return this.DOM.element.select.selectOptions[i].dataset.content;
            } else {
                return this.DOM.element.select.selectOptions[i].innerHTML;
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
                var dropdownTop = clever.DOM.element.select.dropdown.getBoundingClientRect().top;
                var dropdownBottom = dropdownTop + clever.DOM.element.select.list.offsetHeight;
                var dropdownSize = dropdownTop + (clever.DOM.element.select.list.offsetHeight * 2) + clever.DOM.element.select.offsetHeight;

                // If window scroll is bigger or equal to select position...
                if(dropdownTop < 0 || dropdownSize < window.innerHeight) {

                    // ...change the dropdown position to down
                    clever.DOM.element.select.dropdown.style.top = '100%';
                    clever.DOM.element.select.dropdown.style.bottom = 'initial';

                }
                else if(dropdownBottom > window.innerHeight) {

                    // ...change the dropdown position to up
                    clever.DOM.element.select.dropdown.style.top = 'initial';
                    clever.DOM.element.select.dropdown.style.bottom = '100%';

                }
            });

        }

    };

    window.Clever = Clever;
};
