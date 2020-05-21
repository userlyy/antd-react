import Login from "../pages/login";
import Index from "../pages/admin/dashboard/Index";
import List from "../pages/admin/products/List.js";
import Edit from "../pages/admin/products/Edit.js";
import PageNotFound from "../pages/pagenotfound";

export const mainRoutes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/404",
    component: PageNotFound,
  },
];

export const adminRoutes = [
  {
    path: "/admin/dashboard",
    component: Index,
    isShow: true,
    title: "panel",
  },
  {
    path: "/admin/products",
    component: List,
    exact: true,
    isShow: true,
    title: "products manage",
  },
  {
    path: "/admin/products/edit/:id?",
    component: Edit,
    isShow: false,
  },
];
