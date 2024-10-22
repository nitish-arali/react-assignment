import "./App.css";

import AppRoutes from "./Routes";
import { Provider } from "react-redux";
import { store } from "./ReduxStore/store.js";

function App() {
  return (
    <>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </>
  );
}

export default App;
