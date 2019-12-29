<template>
  <div id = "home">
<h2>Welcome to the best online currency converter!</h2>
    <h3>Select the currencies you want to convert an amount from.</h3>
    <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
      <div class="form-group">
        <label for="currencyAmount">Amount:</label>
        <input
                type="Number"
                id="currencyAmount"
                class="form-control"
                v-model= "convertForm.currencyAmount">
      </div>

      <label for="fromCurrency">Convert from: </label>
    <select
            class="form-control"
            id="fromCurrency"
            v-model="convertForm.fromCurrency">
      <option
              v-for="fromCurrency in currencies" :key="fromCurrency"
              >{{fromCurrency}}</option>
    </select>

      <label for="toCurrency">into: </label>
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
        <h1>{{result}}</h1>
      </div>
  </div>

</template>

<script>
    import axios from 'axios'
    export default {
      name: "Home",
      data() {
        return {
            convertForm: {
                currencyAmount: '',
                fromCurrency: '',
                toCurrency: '',
            },
          currencies: ['SEK', 'USD', 'CNY', 'EUR'],
            result: ''
        }
      },
      methods: {
        count() {
            const response = axios.get( "http://localhost:8080/count")
                .then(({ data })=> {
                    this.result = data.count;
                })
                // eslint-disable-next-line no-unused-vars
                .catch((err)=> {})
            // eslint-disable-next-line no-console
            console.log(response)
        },

        convert(){
            axios.get("http://localhost:8080/rate/?fromCode=" + this.convertForm.fromCurrency + "&toCode=" + this.convertForm.toCurrency)
            .then(({data})=>{
                // eslint-disable-next-line no-console
                console.log(data);
                this.result = this.convertForm.currencyAmount + " " + this.convertForm.fromCurrency + " equals " +
                    this.convertForm.currencyAmount * data.rate + " " + this.convertForm.toCurrency;
            })

        }
      }
    }
</script>

<style scoped>

</style>