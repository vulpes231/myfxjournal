import React, { useState } from "react";
import Infocard from "./Infocard";
import Trademodal from "./Trademodal";

const Content = () => {
  const [showModal, setshowModal] = useState(false);

  const closeModal = () => {
    setshowModal(false);
  };

  return (
    <section className="w-full p-6 flex flex-col gap-6">
      <div className="flex justify-end ">
        <button
          className="bg-blue-500 p-2 capitalize rounded-md"
          onClick={() => setshowModal(true)}
        >
          enter trade
        </button>
      </div>
      <div className="bg-slate-200 rounded-md text-black flex flex-col items-center capitalize p-4">
        <p className="font-bold">Starting Balance</p>
        <p>5000</p>
      </div>

      {/* insights */}
      <div className="flex justify-between capitalize gap-4">
        <Infocard title={"number of trades"} percentage={"0"} />
        <Infocard title={"win rate"} percentage={"0%"} />
        <Infocard title={"returns"} percentage={"+0r"} />
      </div>
      {/* journal */}

      <table className="text-center mt-5">
        <thead className="bg-slate-200 text-black capitalize">
          <tr>
            <th>s/n</th>
            <th>market</th>
            <th>position</th>
            <th className="uppercase">rr</th>
            <th>risk</th>
            <th>outcome</th>
            <th>reward</th>
          </tr>
        </thead>
        <tbody className="uppercase font-thin">
          <tr>
            <td>1.</td>
            <td>xau/usd</td>
            <td>buy</td>
            <td>1:3</td>
            <td>0.25%</td>
            <td>lost</td>
            <td>-1</td>
          </tr>
        </tbody>
      </table>
      <Trademodal showModal={showModal} closeModal={closeModal} />
    </section>
  );
};

export default Content;
