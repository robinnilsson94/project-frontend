import SignUp from "@/components/SignUp";
import Home from "@/components/Home";
import Admin from "@/components/Admin";

export const routes = [
    {path: '', component: Home},
    {path: '/signup', component: SignUp},
    {path: '/admin', component: Admin}
    ];