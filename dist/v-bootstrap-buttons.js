"use strict";

Vue.component('v-bootstrap-buttons', {
  props: ['options', 'name', 'value', 'type', 'size', 'collection'],
  template: '<div>' + '<div :class="groupClass">' + '<button v-for="(option,key) of options" type="button" :class="btnClass" :data-key="getItemKey(key)" @click="setValue(key)" v-html="getItemLabel(key)"></button>' + '</div>' + '<input :name="name" type="hidden" :value="value">' + '</div>',
  methods: {
    active: function active() {
      var buttons = this.$el.querySelectorAll('button');

      for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];

        if (this.valueString === button.getAttribute('data-key').toString()) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }

        button.blur();
      }
    },
    setValue: function setValue(key) {
      if (this.isCollection) {
        key = this.getCollectionKey(key);
      }

      this.$emit('input', key);
    },
    getItemKey: function getItemKey(key) {
      if (this.isCollection) {
        return this.getCollectionKey(key);
      }

      return key;
    },
    getItemLabel: function getItemLabel(key) {
      if (this.isCollection) {
        return this.getCollectionLabel(key);
      }

      return this.options[key];
    },
    getCollectionKey: function getCollectionKey(index) {
      if (this.options[index]) {
        return this.options[index][this.collectionKeys.key];
      }

      return '';
    },
    getCollectionLabel: function getCollectionLabel(index) {
      return this.options[index][this.collectionKeys.value];
    }
  },
  computed: {
    btnClass: function btnClass() {
      var type = this.type === undefined ? 'btn-default' : 'btn-' + this.type;
      var size = this.size === undefined ? 'btn-md' : 'btn-' + this.size;
      return ['btn', type, size];
    },
    groupClass: function groupClass() {
      return ['btn-group', 'btn-group-' + this.size];
    },
    valueString: function valueString() {
      return this.value ? this.value.toString() : '';
    },
    isCollection: function isCollection() {
      return this.collection !== undefined && this.collection !== '';
    },
    collectionKeys: function collectionKeys() {
      var keys = this.collection.split('|');
      return {
        key: keys[0],
        value: keys[1]
      };
    }
  },
  mounted: function mounted() {
    this.active();
  },
  watch: {
    value: function value(_value) {
      if (_value !== undefined) {
        _value = this.valueString;
      }

      this.active();
      this.$emit('select', _value, this.options[_value]);
    },
    options: function options(values) {
      var keys = Object.keys(values);

      if (keys.indexOf(this.value) === -1) {
        this.setValue(undefined);
      }
    }
  }
});