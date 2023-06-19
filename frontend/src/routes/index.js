import Home from "../Components/Home.js";

const authProtectedRoutes = [
  {
    path: "/",
    component: Home,
  },
];

export { authProtectedRoutes };
