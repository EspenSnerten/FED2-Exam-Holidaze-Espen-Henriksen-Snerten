import { Router, Route, RootRoute } from "@tanstack/react-router";
import IndexPage from "./pages/index";
import Root from "./App";

const rootRoute = new RootRoute({
  component: Root,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: IndexPage,
});


const routeTree = rootRoute.addChildren([
  indexRoute,
]);

export const router = new Router({ routeTree });

export default router;