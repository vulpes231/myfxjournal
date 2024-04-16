import React, { useState } from "react";
import Infocard from "./Infocard";
import Trademodal from "./Trademodal";

const Content = () => {
  const [showModal, setshowModal] = useState(false);
  return (
    <section>
      <div>
        <button onClick={() => setshowModal((prev) => !prev)}>
          enter trade
        </button>
      </div>
      <div>
        <p>starting P/L </p>
        <p>0%</p>
      </div>

      {/* insights */}
      <div>
        <Infocard title={"account growth"} percentage={"20%"} />
        <Infocard title={"last traded pair"} percentage={"20%"} />
        <Infocard title={"last traded pair"} percentage={"20%"} />
      </div>
      {/* journal */}

      <table>
        <thead>
          <th>s/n</th>
          <th>market</th>
          <th>position</th>
          <th>rr</th>
          <th>outcome</th>
          <th>p/l</th>
        </thead>
        <tbody>
          <tr>
            <td>1.</td>
            <td>xau/usd</td>
            <td>buy</td>
            <td>1:3</td>
            <td>lost</td>
            <td>-1</td>
          </tr>
        </tbody>
      </table>
      <Trademodal />
    </section>
  );
};

export default Content;
