// @flow

export default {
    inject: ['$validator'],
    template: `
    <el-tooltip :disabled="!hasError" class="item" effect="dark" :content="firstError" placement="top-end">
        <el-select
            v-validate="rules"
            :class="{'error-box': hasError}"
            :name='name'
            filterable
            v-model="model"
            multiple
            placeholder="انتخاب"
            @change="change"
        >
            <el-option
                v-for="item in options"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
        </el-select>
    </el-tooltip>
    `,
    props: ['options', 'value', 'name', 'rules'],
    data () {
        return {
            model: []
        }
    },
    computed: {
        hasError() { return this.$validator.errors.has(this.name) },
        firstError() { return this.$validator.errors.first(this.name) }
    },
    methods: {
        change(value) {
            this.$emit('input', value)
            this.$emit('change', value)
        }
    },
    mounted() {
        this.model = this.value || []
    }
}
