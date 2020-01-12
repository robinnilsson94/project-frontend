<template>
    <div id = "admin" v-if="loaded">
        <h2>Admin Settings</h2>
        <h3>Select the currencies you want to update.</h3>
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
            <label for="fromCurrency">1</label>
            <select
                    class="form-control"
                    id="fromCurrency"
                    @input="$v.rateForm.fromCurrency.$touch()"
                    v-model="rateForm.fromCurrency">
                <option
                        v-for="fromCurrency in currencies" :key="fromCurrency"
                >{{fromCurrency}}</option>
            </select>
            <span v-if="error">
                    <span class="error" v-if="!$v.rateForm.fromCurrency.required">fromCurrency field is required</span>
                    <br>
                </span>
            <div class="form-group">
                <label for="rate">equals</label>
                <input
                        type="Number"
                        id="rate"
                        class="form-control"
                        @input="$v.rateForm.rate.$touch()"
                        v-model= "rateForm.rate">
                <span v-if="error">
                    <span class="error" v-if="!$v.rateForm.rate.required">Rate field is required</span>
                    <span class="error" v-if="!$v.rateForm.rate.minValue">Only positive numbers</span>
                    <br>
                </span>
            </div>
            <label for="toCurrency"></label>
            <select
                    class="form-control"
                    id="toCurrency"
                    @input="$v.rateForm.toCurrency.$touch()"
                    v-model="rateForm.toCurrency">
                <option
                        v-for="toCurrency in currencies" :key="toCurrency"
                >{{toCurrency}}</option>
            </select>
            <span v-if="error">
                    <span class="error" v-if="!$v.rateForm.toCurrency.required">toCurrency field is required</span>
                    <span class="error" v-if="!$v.rateForm.fromCurrency.unique">Fields can't be identical</span>
                    <br>
                </span>
            <button
                    class="btn btn-primary"
                    @click.prevent="changeRate">
                Change Rate
            </button>
            <h3>Number of conversions made: {{counter}}</h3>
            <h2 v-if="putSuccess">Rate has been updated!</h2>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import required from "vuelidate/lib/validators/required";
    import decimal from "vuelidate/lib/validators/decimal";
    import minValue from "vuelidate/lib/validators/minValue";
    import minLength from "vuelidate/lib/validators/minLength";
    import alpha from "vuelidate/lib/validators/alpha";
    import maxLength from "vuelidate/lib/validators/maxLength";
    import not from "vuelidate/lib/validators/not";
    import sameAs from "vuelidate/lib/validators/sameAs";
    export default {
        name: "Admin",
        created() {
            if(!this.$parent.authenticated){
                this.$router.push("/");
            }
            axios.get("http://localhost:8080/currency/all")
                .then(({data})=>{
                    for(let i = 0; i < data.currencies.length; i++){
                        this.currencies[i] = data.currencies[i].code;
                    }
                    this.loaded = true;
                })
            axios.get( "http://localhost:8080/count")
                .then(({ data })=> {
                    this.counter = data.count;
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
                putSuccess: false,
                error: false,
                counter: 0
            }
        },
        methods: {
            changeRate(){
                this.$v.rateForm.$touch();
                if (this.$v.rateForm.$anyError) {
                    this.error = true;
                }
                else{
                    this.error = false;
                    axios.put("http://localhost:8080/rate", this.rateForm)
                        .then(()=>{
                            this.putSuccess = true;
                        })
                }

            }
        },
        validations: {
            rateForm: {
                rate: {
                    required,
                    decimal: decimal,
                    minValue: minValue(0),
                    minLength: minLength(1)
                },
                fromCurrency: {
                    required,
                    alpha: alpha,
                    minLength: minLength(3),
                    maxLength: maxLength(3),
                    unique: not(sameAs('toCurrency'))
                },
                toCurrency: {
                    required,
                    alpha: alpha,
                    minLength: minLength(3),
                    maxLength: maxLength(3)
                }
            }
        }
    }
</script>

<style scoped>
</style>