// @flow
import { mapActions, mapState } from 'vuex'
import CustomMultiSelect from '../widgets/CustomMultiSelect'
import { replaceQueryFields } from '../functions'

export default {
    components: { CustomMultiSelect },
    template: `
        <CustomMultiSelect :value='value' :options='options' :name="name" :rules="rules" @change='change' />
    `,
    props: ['fieldId'],
    computed: {
        ...mapState({
            field(state) { return state.fields[this.fieldId] },
            masterFields(state) { return state.fields }
        }),
        value() { return this.field.value },
        options() { return this.field.options },
        name (){ return this.field.Title },
        rules () {
            return {
                rules: {
                    required: this.field.IsRequire
                }
            }
        },
        query() {
            return replaceQueryFields(this.masterFields)(this.field.Query)
        }
    },
    watch: {
        query: function (query){
            this.loadFilteredOptions({ id: this.fieldId, listId: this.field.LookupList, query })
        }
    },
    methods: {
        ...mapActions(['changeField', 'loadFilteredOptions']),
        change(value) {
            this.changeField({ id: this.fieldId, value: value ? value.toString() : '' })
            this.$emit('change', value)
        }
    },
    mounted() {
        this.loadFilteredOptions({ id: this.fieldId, listId: this.field.LookupList, query: this.query })
    }
}
