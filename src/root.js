import { Router, Route, RootRoute } from "@tanstack/react-router";
import IndexPage from "./pages/index";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import VenuePage from "./pages/Venue";
import VenuesPage from "./pages/Venues";
import UserPage from "./pages/User";
import Root from "./App";

const rootRoute = new RootRoute({
  component: Root
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: IndexPage
});

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage
});

const registerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage
});

const venueRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/venue/$venueId",
  component: VenuePage
});

const venuesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/venues",
  component: VenuesPage
});

const userRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/user",
  component: UserPage
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  venueRoute,
  venuesRoute,
  userRoute
]);

export const router = new Router({ routeTree });

export default router;
