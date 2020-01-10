<template>
    <div class="container">
        <form>
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <h1>Enter your login credentials</h1>
                    <div class="form-group">
                        <label for="Username">Username</label>
                        <input
                                type="Username"
                                id="username"
                                class="form-control"
                                @input="$v.User.username.$touch()"
                                v-model= "User.username">
                        <span v-if="error">
                    <span class="error" v-if="!$v.User.username.required">Username field is required</span>
                    <br>
                </span>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input
                                type="password"
                                id="password"
                                class="form-control"
                                v-model= "User.password">
                        <span v-if="error">
                    <span class="error" v-if="!$v.User.password.required">Password field is required</span>
                            <span class="error" v-if="!$v.User.password.minLength">Password must be at least 8 characters</span>
                    <br>
                </span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <button
                            class="btn btn-primary"
                            @click.prevent="submit">
                        Submit!
                    </button>
                    <h3 v-if="inCorrectCredentials">Incorrect login credentials! Try again</h3>
                </div>
            </div>
        </form>
        </div>
</template>

<script>
    import axios from 'axios'
    import required from "vuelidate/lib/validators/required";
    import minLength from "vuelidate/lib/validators/minLength";
    export default {
        name: "SignUp",
        created() {
            if(this.$parent.authenticated){
                this.$router.push("/");
            }
            },
        data() {
            return{
                User:{
                    username: '',
                    password: ''
                },
                error: false,
                inCorrectCredentials: false
            }
        },
        methods: {
            submit() {
                this.$v.User.$touch();
                if (this.$v.User.$anyError) {
                    this.error = true;
                }
                else{
                    axios.post( "http://localhost:8080/admin", this.User)
                        .then(({data})=>{
                            this.$emit('authenticated', data);
                            if(data){this.$router.push("/admin");}
                            else {this.inCorrectCredentials = true;}
                        })
                    this.error = false;
                }

            }
    },
        validations: {
            User: {
                username: {required},
                password: {required, minLength: minLength(8)}
            }
        }
    }
</script>

<style>

</style>
