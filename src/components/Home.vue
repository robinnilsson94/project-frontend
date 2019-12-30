<template>
  <div id = "home" v-if="loaded">
<h2>Welcome to the best online currency converter!</h2>
    <h3>Select the currencies you want to convert an amount from.</h3>
    <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
      <div class="form-group">
        <label for="currencyAmount">Amount</label>
        <input
                type="Number"
                id="currencyAmount"
                class="form-control"
                v-model= "convertForm.currencyAmount">


      <label for="fromCurrency">From </label>
    <select
            class="form-control"
            id="fromCurrency"
            v-model="convertForm.fromCurrency">
      <option
              v-for="fromCurrency in currencies" :key="fromCurrency"
              >{{fromCurrency}}</option>
    </select>

      <label for="toCurrency">into </label>
      <select
              class="form-control"
              id="toCurrency"
              v-model="convertForm.toCurrency">
        <option
                v-for="toCurrency in currencies" :key="toCurrency"
        >{{toCurrency}}</option>
      </select>

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
    export default {
      name: "Home",
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
            convertForm: {
                currencyAmount: '',
                fromCurrency: '',
                toCurrency: '',
            },
          currencies: [],
            result: '',
            loaded: false
        }
      },
      methods: {
        convert(){
            axios.get("http://localhost:8080/rate/?fromCode=" + this.convertForm.fromCurrency + "&toCode=" + this.convertForm.toCurrency)
            .then(({data})=>{
                this.result = this.convertForm.currencyAmount + " " + this.convertForm.fromCurrency + " equals " +
                    this.convertForm.currencyAmount * data.rate + " " + this.convertForm.toCurrency;
            })

        }
      }
    }
</script>

<style scoped>

</style>