import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/auth/Login.vue";
import Home from "../components/Home/Home.vue";
import Signup from "../components/auth/Signup.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/home",
      name: "home",
      component: Home,
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
    },
  ],
});

export default router;
