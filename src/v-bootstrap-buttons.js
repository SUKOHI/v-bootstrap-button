Vue.component('v-bootstrap-buttons', {
    props: [
        'options',
        'name',
        'value',
        'type',
        'size',
        'collection'
    ],
    template: '<div>'+
        '<div :class="groupClass">' +
        '<button v-for="(option,key) of options" type="button" :class="btnClass" :data-key="getItemKey(key)" @click="setValue(key)" v-html="getItemLabel(key)"></button>' +
        '</div>' +
        '<input :name="name" type="hidden" :value="value">'+
        '</div>',
    methods: {
        active() {

            var buttons = this.$el.querySelectorAll('button');

            for(var i = 0 ; i < buttons.length ; i++) {

                var button = buttons[i];

                if(this.valueString === button.getAttribute('data-key').toString()) {

                    button.classList.add('active');

                } else {

                    button.classList.remove('active');

                }

                button.blur();

            }

        },
        setValue(key) {

            if(this.isCollection) {

                key = this.getCollectionKey(key);

            }

            if(typeof key === 'number') {

                key = key.toString();

            }

            this.$emit('input', key);

        },
        getItemKey(key) {

            if(this.isCollection) {

                return this.getCollectionKey(key);

            }

            return key;

        },
        getItemLabel(key) {

            if(this.isCollection) {

                return this.getCollectionLabel(key);

            }

            return this.options[key];

        },
        getCollectionKey(index) {

            if(this.options[index]) {

                return this.options[index][this.collectionKeys.key];

            }

            return '';

        },
        getCollectionLabel(index) {

            return this.options[index][this.collectionKeys.value];

        }
    },
    computed: {
        btnClass() {

            const type = (this.type === undefined) ? 'btn-default' : 'btn-'+ this.type;
            const size = (this.size === undefined) ? 'btn-md' : 'btn-'+ this.size;
            return ['btn', type, size];

        },
        groupClass() {

            return ['btn-group', 'btn-group-'+ this.size];

        },
        valueString() {

            return (this.value) ? this.value.toString() : '';

        },
        isCollection() {

            return (
                this.collection !== undefined &&
                this.collection !== ''
            );

        },
        collectionKeys() {

            const keys = this.collection.split('|');
            return {
                key: keys[0],
                value: keys[1]
            };

        }
    },
    mounted() {

        this.active();

    },
    watch: {
        value(value) {

            if(value !== undefined) {

                value = this.valueString;

            }

            this.active();
            this.$emit('select', value, this.options[value]);

        },
        options(values) {

            var keys = Object.keys(values);

            if(keys.indexOf(this.value) === -1) {

                this.setValue(undefined);

            }

        }
    }
});