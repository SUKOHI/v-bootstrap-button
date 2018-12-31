Vue.component('bootstrap-buttons', {
    props: [
        'options',
        'name',
        'value',
        'type',
        'size'
    ],
    template: '<div>'+
        '<div :class="groupClass">' +
        '<button v-for="(label, key) in options" type="button" :class="btnClass" :data-key="key" @click="setValue(key)" v-html="label"></button>' +
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

            }

        },
        setValue(value) {

            this.$emit('input', value);

        }
    },
    computed: {
        btnClass() {

            var type = (this.type === undefined) ? 'btn-default' : 'btn-'+ this.type;
            var size = (this.size === undefined) ? 'btn-md' : 'btn-'+ this.size;
            return ['btn', type, size];

        },
        groupClass() {

            return ['btn-group', 'btn-group-'+ this.size];

        },
        valueString() {

            return (this.value) ? this.value.toString() : '';

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