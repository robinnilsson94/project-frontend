<template>
    <div id = "admin" v-if="loaded">
        <h2>Admin Settings</h2>
        <h3>Select the currency you want to edit.</h3>
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
            <div class="form-group">
                <label for="rate">Rate:</label>
                <input
                        type="Number"
                        id="rate"
                        class="form-control"
                        v-model= "rateForm.rate">
            </div>

            <label for="fromCurrency">Change rate between: </label>
            <select
                    class="form-control"
                    id="fromCurrency"
                    v-model="rateForm.fromCurrency">
                <option
                        v-for="fromCurrency in currencies" :key="fromCurrency"
                >{{fromCurrency}}</option>
            </select>

            <label for="toCurrency">and: </label>
            <select
                    class="form-control"
                    id="toCurrency"
                    v-model="rateForm.toCurrency">
                <option
                        v-for="toCurrency in currencies" :key="toCurrency"
                >{{toCurrency}}</option>
            </select>

            <button
                    class="btn btn-primary"
                    @click.prevent="changeRate">
                Change Rate
            </button>
            <h1>{{result}}</h1>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Admin",
        created() {
            axios.get("http://localhost:8080/currency/all")
                .then(({data})=>{
                    for(let i = 0; i < data.currencies.length; i++){
                        this.currencies[i] = data.currencies[i].code;
                    }
                    this.loaded = true;
                    // eslint-disable-next-line no-console
                    console.log(this.currencies)
                })
        },
        data() {
            return {
                rateForm: {
                    rate: '',
                    fromCurrency: '',
                    toCurrency: '',
                },
                currencies: [],
                result: '',
                loaded: false
            }
        },
        methods: {
            count() {
                axios.get( "http://localhost:8080/count")
                    .then(({ data })=> {
                        this.result = data.count;
                    })
                    // eslint-disable-next-line no-unused-vars
                    .catch((err)=> {})
            },
            changeRate(){
                axios.post();
            }
        }
    }
</script>

<style scoped>

</style>