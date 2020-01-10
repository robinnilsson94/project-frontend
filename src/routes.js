import SignIn from "@/components/SignIn";
import Home from "@/components/Home";
import Admin from "@/components/Admin";

export const routes = [
    {path: '', component: Home},
    {path: '/signIn', component: SignIn},
    {path: '/admin', component: Admin}
    ];