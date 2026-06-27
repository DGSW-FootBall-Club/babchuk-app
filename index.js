import { registerRootComponent } from "expo";

import App from "./app/App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App)
// and sets up the Expo environment for both native and web.
registerRootComponent(App);
