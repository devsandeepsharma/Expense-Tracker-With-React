import { Provider } from "react-redux";

import Layout from "./components/Layout/Layout";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
};

export default App;