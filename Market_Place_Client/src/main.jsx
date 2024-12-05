import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

import { Provider } from "react-redux";
import store from "./store/store.js";

if (import.meta.env.VITE_MODE === "production") {
  disableReactDevTools();
}
const persistor = persistStore(store);

persistor.purge().then(() => {
  console.log("State purged!");
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
