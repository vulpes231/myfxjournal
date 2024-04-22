import React from "react";
import { MdClose } from "react-icons/md";

const Trademodal = ({ showModal, closeModal }) => {
  return (
    <div
      className={
        showModal
          ? "fixed h-screen flex flex-col items-center justify-center top-0 w-full left-0 p-6 z-10 bg-black bg-opacity-70"
          : "hidden "
      }
    >
      <form action="" className="  flex flex-col gap-4 p-4 w-full bg-white">
        <span
          onClick={closeModal}
          className="text-xl flex justify-end cursor-pointer text-black"
        >
          <MdClose />
        </span>
        <select className="w-full  p-2 text-black border-2 outline-none uppercase ">
          <option value="eur/usd">choose market</option>
          <option value="eur/usd">eur/usd</option>
          <option value="xau/usd">xau/usd</option>
          <option value="gbp/usd">gbp/usd</option>
          <option value="gbp/jpy">gbp/jpy</option>
          <option value="btc/usd">btc/usd</option>
          <option value="us30">us30</option>
        </select>
        <select className="w-full  p-2 text-black border-2 outline-none uppercase">
          <option value="">choose position</option>
          <option value="buy">buy</option>
          <option value="buy">sell</option>
        </select>
        <input
          type="text"
          placeholder="enter risk:reward ratio"
          className="w-full  p-2 text-black border-2 outline-none"
        />
        <input
          type="text"
          placeholder="risk %"
          className="w-full  p-2 text-black border-2 outline-none"
        />

        <button className="bg-blue-500 p-2 capitalize">create</button>
      </form>
    </div>
  );
};

export default Trademodal;
