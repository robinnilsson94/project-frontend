<template>
    <div id = "admin" v-if="loaded">
        <h2>Admin Settings</h2>
        <h3>Select the currencies you want to update.</h3>
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
            <label for="fromCurrency">1</label>
            <select
                    class="form-control"
                    id="fromCurrency"
                    v-model="rateForm.fromCurrency">
                <option
                        v-for="fromCurrency in currencies" :key="fromCurrency"
                >{{fromCurrency}}</option>
            </select>
            <div class="form-group">
                <label for="rate">equals</label>
                <input
                        type="Number"
                        id="rate"
                        class="form-control"
                        v-model= "rateForm.rate">
            </div>
            <label for="toCurrency"></label>
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
            <h2 v-if="putSuccess">Rate has been updated!</h2>
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
                loaded: false,
                putSuccess: false
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
                axios.put("http://localhost:8080/rate", this.rateForm)
                .then(()=>{
                    this.putSuccess = true;
                })
            }
        }
    }
</script>

<style scoped>
</style>