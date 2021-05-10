import {
  upsertBid,
  upsertAsk,
  deleteBid,
  deleteAsk,
} from "../actions/orderBookActions";

export const wsConnect = (dispatch) => {
  let ws = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
  let print = 0;
  // websocket onopen event listener
  ws.onopen = () => {
    console.log("connected websocket component");
    let msg = JSON.stringify({
      event: "subscribe",
      channel: "book",
      prec: "R0",
      freq: "F1",
      symbol: "tBTCUSD",
    });
    ws.send(msg);
  };

  // websocket onclose event listener
  ws.onclose = (e) => {
    console.log(`Socket is closed.`, e.reason);
  };

  // websocket onerror event listener
  ws.onerror = (err) => {
    console.error("Socket encountered error: ", err, "Closing socket");

    ws.close();
  };

  ws.onmessage = (ev) => {
    const data = JSON.parse(ev.data);
    if (print < 10) {
      if (data[1] && Array.isArray(data[1][0])) {
        data[1][0].forEach((row) => updateBookRow(row));
      } else if (data[1] && Array.isArray(data[1])) {
        updateBookRow(data[1]);
      }
    }
  };

  const updateBookRow = (rowData) => {
    if (rowData.length === 3) {
      const rowItem = {
        price: rowData[0],
        count: rowData[1],
        amount: Math.abs(rowData[2]),
      };

      if (rowItem.count > 0) {
        if (rowData[2] > 0) {
          dispatch(upsertBid(rowItem));
        } else {
          dispatch(upsertAsk(rowItem));
        }
      } else if (rowItem.count === 0) {
        if (rowData[2] === 1) {
          dispatch(deleteBid(rowItem));
        } else {
          dispatch(deleteAsk(rowItem));
        }
      }
    }
  };
};
