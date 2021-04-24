import { watch } from "vue";
import { NavigationGuardNext, RouteLocationRaw } from "vue-router";
import { VueAuth } from ".";
import { getInstance } from "../plugins/auth0-vue";

export const authLoginGuard = (
  to: RouteLocationRaw,
  from: RouteLocationRaw,
  next: NavigationGuardNext
) => {
  const authService = getInstance();

  const fn = () => {
    // If the user is authenticated, continue with the route
    if (authService.isAuthenticated) {
      return next({ name: "Projects" });
    }

    return next();
  };

  // If loading has already finished, check our auth state using `fn()`
  if (!authService.loading) {
    return fn();
  }

  // Watch for the loading property to change before we check isAuthenticated
  watch(authService, (auth: VueAuth) => {
    if (auth.loading === false) {
      return fn();
    }
  });
};
