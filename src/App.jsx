import React, { useEffect, useState } from "react";
import "./App.css";
import { FaArrowTrendDown } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";
import axios from "axios";
const App = () => {
  const currency = ["USD", "EUR", "GBP", "JPY"];
  const [curr, setCurr] = useState(0);
  const [selectCurrency, setSelectCurrency] = useState("usd");
  const [convertCurrency, setConvertCurrency] = useState(0);
  const [isUp, setIsUp] = useState(true);
  const [diff, setDiff] = useState(0);
  const handelChange = (e) => {
    const currData = e.target.value;
    setCurr(currData);
  };
  const handelCurrencyType = (e) => {
    const typeCurrency = e.target.value;
    // console.log(typeCurrency);
    setSelectCurrency(typeCurrency);
  };
  const fetchCurrencyInfo = async () => {
    try {
      const url = `https://api.frontendeval.com/fake/crypto/${selectCurrency}`;
      const currInfo = await axios.get(url);
      const value = currInfo.data.value;
      const currValue = curr * value;
      setConvertCurrency(currValue.toFixed(2));
      const prevValue = window.sessionStorage.getItem('prevVal');

      const diff = currValue.toFixed(2) - prevValue;
      diff < 0 ? setIsUp(false) : setIsUp(true);
      setDiff(diff.toFixed(2));
      window.sessionStorage.setItem('prevVal',currValue.toFixed(2));
      // console.log(currValue);
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    let time;
    time = setInterval(() => {
      fetchCurrencyInfo();
    }, 3000);
    return ()=>{
      clearInterval(time)
    }
    
  }, [curr , selectCurrency]);
  return (
    <div className="main-container">
      <h1>CRYPTO-CONVERTOR</h1>
      <div className="main-wapper">
        <input
          type="number"
          placeholder="Enter Amount"
          value={curr}
          onChange={handelChange}
        />
        <select
          onChange={handelCurrencyType}
          name="currency"
          value={selectCurrency}
        >
          {currency?.map((item, i) => {
            return (
              <option key={i} value={item}>
                {item.toUpperCase()}
              </option>
            );
          })}
        </select>
      </div>
      <div className="item-info">
        <div>{convertCurrency}</div>
        <div>WUC ({selectCurrency})</div>
        <div className={isUp ? "green" : "red"}>
          <span>{isUp ? <FaArrowTrendUp/> : <FaArrowTrendDown/>}</span>
          <span>{diff}</span>
        </div>
      </div>
    </div>
  );
};

export default App;
