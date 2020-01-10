<template>
    <div id="home" v-if="loaded">
        <h2>Welcome to the best online currency converter!</h2>
        <h3>Select the currencies you want to convert an amount from.</h3>
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
            <div class="form-group">
                <label for="currencyAmount">Amount</label>
                <input
                        type="Number"
                        id="currencyAmount"
                        class="form-control"
                        @input="$v.convertForm.currencyAmount.$touch()"
                        v-model="convertForm.currencyAmount">

                <span v-if="error">
                    <span class="error" v-if="!$v.convertForm.currencyAmount.required">Field is required</span>
                    <span class="error" v-if="!$v.convertForm.currencyAmount.minValue">Only positive numbers</span>
                </span>
                <br>
                <label for="fromCurrency">From </label>
                <select
                        class="form-control"
                        id="fromCurrency"
                        @input="$v.convertForm.fromCurrency.$touch()"
                        v-model="convertForm.fromCurrency">
                    <option
                            v-for="fromCurrency in currencies" :key="fromCurrency"
                    >{{fromCurrency}}
                    </option>
                </select>
                <span v-if="error">
                    <span class="error" v-if="!$v.convertForm.fromCurrency.required">fromCurrency field is required</span>
                    <br>
                </span>
                <label for="toCurrency">into </label>
                <select
                        class="form-control"
                        id="toCurrency"
                        @input="$v.convertForm.toCurrency.$touch()"
                        v-model="convertForm.toCurrency">
                    <option
                            v-for="toCurrency in currencies" :key="toCurrency"
                    >{{toCurrency}}
                    </option>
                </select>
                <span v-if="error">
                    <span class="error" v-if="!$v.convertForm.toCurrency.required">toCurrency field is required</span>
                    <span class="error" v-if="!$v.convertForm.fromCurrency.unique">Fields can't be identical</span>
                    <br>
                </span>
                <button
                        class="btn btn-primary"
                        @click.prevent="convert">
                    Convert
                </button>
            </div>
            <h1>{{result}}</h1>
        </div>
    </div>

</template>

<script>
    import axios from 'axios'
    import required from "vuelidate/lib/validators/required";
    import minLength from "vuelidate/lib/validators/minLength";
    import minValue from "vuelidate/lib/validators/minValue";
    import maxLength from "vuelidate/lib/validators/maxLength";
    import decimal from "vuelidate/lib/validators/decimal";
    import alpha from "vuelidate/lib/validators/alpha";
    import sameAs from "vuelidate/lib/validators/sameAs";
    import not from "vuelidate/lib/validators/not";

    export default {
        name: "Home",
        created() {
            axios.get("http://localhost:8080/currency/all")
                .then(({data}) => {
                    for (let i = 0; i < data.currencies.length; i++) {
                        this.currencies[i] = data.currencies[i].code;
                    }
                    this.loaded = true;
                })
        },
        data() {
            return {
                convertForm: {
                    currencyAmount: '',
                    fromCurrency: '',
                    toCurrency: '',
                },
                currencies: [],
                result: '',
                loaded: false,
                error: false
            }
        },
        methods: {
            convert() {
                this.$v.convertForm.$touch();
                if (this.$v.convertForm.$anyError) {
                    this.error = true;
                } else {
                    this.error = false;
                    axios.get("http://localhost:8080/rate/?fromCode=" + this.convertForm.fromCurrency + "&toCode=" + this.convertForm.toCurrency)
                        .then(({data}) => {
                            this.result = this.convertForm.currencyAmount + " " + this.convertForm.fromCurrency + " equals " +
                                this.convertForm.currencyAmount * data.rate + " " + this.convertForm.toCurrency;
                        })
                }


            }
        },
        validations: {
            convertForm:{
                currencyAmount: {
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