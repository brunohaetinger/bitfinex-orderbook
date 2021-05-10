import { memo } from "react";
import { connect } from "react-redux";
import "./OrderBook.css";

const OrderBookBidRow = memo(({price, count, amount}) => {
  return (
    <tr key={String(price)} >
      <td>{count}</td>
      <td>{amount}</td>
      <td>{price}</td>
    </tr >
  )
})

const OrderBookAskRow = memo(({price, count, amount}) => {
  return (
    <tr key={String(price)} >
      <td>{price}</td>
      <td>{amount}</td>
      <td>{count}</td>
    </tr >
  )
})

function OrderBook({orderBook}) {
  console.log(orderBook);
  return <div className="order-book">
     {
        <table>
          <tbody>
            <tr>
                <th>Count</th>
                <th>Amount</th>
                <th>Price</th>
            </tr >
            { orderBook.bids && orderBook.bids.map(row => <OrderBookBidRow {...row} />)}
          </tbody>
        </table>
      }
      <div class="vertical-divider"></div>
      {
        <table>
          <tbody>
            <tr>
                <th>Price</th>
                <th>Amount</th>
                <th>Count</th>
            </tr >
            { orderBook.asks && orderBook.asks.map(row => <OrderBookAskRow {...row} />)}
          </tbody>
        </table>
      }
  </div>;
}

const mapStateToProps = (state) => {
  return {
    orderBook: state.orderBook,
  };
};

export default memo(connect(mapStateToProps)(OrderBook));
