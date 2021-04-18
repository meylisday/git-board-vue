import { reactive } from "vue";
import { Auth0Options, RedirectCallback, VueAuth } from "../auth";

type Auth0PluginOptions = {
  onRedirectCallback: RedirectCallback;
  domain: string;
  clientId: string;
  audience?: string;
  [key: string]: string | RedirectCallback | undefined;
};

/** Define a default action to perform after authentication */
const DEFAULT_REDIRECT_CALLBACK = (appState: any) =>
  window.history.replaceState({}, document.title, window.location.pathname);

let instance: any;

/** Returns the current instance of the SDK */
export const getInstance = () => instance;

/** Creates an instance of the Auth0 SDK. If one has already been created, it returns that instance */
export const useAuth0 = ({
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  redirectUri = window.location.origin,
  ...options
}) => {
  if (instance) return instance;

  instance = reactive(new VueAuth());
  instance.init(onRedirectCallback, redirectUri, options as Auth0Options);
  return instance;
};

// Create a simple Vue plugin to expose the wrapper object throughout the application
export const Auth0Plugin = {
  install(app: any, options: Auth0PluginOptions) {
    const auth = useAuth0(options);

    app.config.globalProperties.$auth = auth;
    app.provide("auth", auth);
  }
};
