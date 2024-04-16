import React from "react";

const Trademodal = () => {
  return (
    <div>
      <form action="">
        <select>
          <option value="eur/usd">eur/usd</option>
          <option value="xau/usd">xau/usd</option>
          <option value="gbp/usd">gbp/usd</option>
          <option value="gbp/jpy">gbp/jpy</option>
          <option value="btc/usd">btc/usd</option>
          <option value="us30">us30</option>
        </select>
        <select>
          <option value=""></option>
          <option value="buy">buy</option>
          <option value="buy">sell</option>
        </select>
        <input type="text" placeholder="enter risk:reward" />

        <button>create</button>
      </form>
    </div>
  );
};

export default Trademodal;
