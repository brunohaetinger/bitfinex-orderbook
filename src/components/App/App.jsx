import OrderBook from "../OrderBook/OrderBook";
import { Provider } from "react-redux";
import "./App.css";
import { wsConnect } from "../../utils/websocket";
import { useEffect } from "react";
import { customCreateStore } from "../../utils/store";

const store = customCreateStore();

function App() {
  useEffect(() => {
    wsConnect(store.dispatch);
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <p>Bitfinex Order Book</p>
        </header>
        <OrderBook />
      </div>
    </Provider>
  );
}

export default App;
