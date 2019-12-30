<template>
    <div class="container">
        <form>
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <h1>Register an admin user</h1>
                    <div class="form-group">
                        <label for="Username">Username</label>
                        <input
                                type="Username"
                                id="username"
                                class="form-control"
                                v-model= "User.username">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input
                                type="password"
                                id="password"
                                class="form-control"
                                v-model= "User.password">
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
                </div>
            </div>
        </form>
        <h3>{{User.username}} | {{User.password}}</h3>
        </div>

</template>

<script>
    import axios from 'axios'
    export default {
        name: "SignUp",
        data() {
            return{
                User:{
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            submit() {
                axios.post( "", this.User)
                .then()
                // eslint-disable-next-line no-console
                console.log("Success!")
            }
    }
    }
</script>

<style>

</style>
