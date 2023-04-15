import React, { useState, useEffect } from "react";
import "./moneyExchange.css";
import { Card, Form, Input, Select } from "antd";
import { BsCurrencyExchange } from "react-icons/bs";

function CurrencyConverter() {
  const apiUrl = "https://open.er-api.com/v6/latest/USD";

  const defaultFirstSelectValue = "USD";
  const defaultSecondSelectValue = "INR";

  let timeUpdated;

  const [time, setTime] = useState();
  const [moneyExchange, setMoneyExchange] = useState([]);
  const [inputValue, setInputValue] = useState("0");
  //  const [secondInputValue, setSecondInputValue] = useState("0");
  const [firstSelect, setFirstSelect] = useState(defaultFirstSelectValue);
  const [secondSelect, setSecondSeclect] = useState(defaultSecondSelectValue);
  const [result, setResult] = useState("0");
  //  const [secondResult, setSecondResult] = useState("0");

  useEffect(() => {
    fetchApi();
  }, []);

  useEffect(() => {
    if (moneyExchange.length == 0) return;

    const firstSelectRate = moneyExchange.find((item) => {
      return item.value === firstSelect;
    }).rate;
    const secondSelectRate = moneyExchange.find((item) => {
      return item.value === secondSelect;
    }).rate;
    //   console.log(firstSelectRate, secondSelectRate);

    const resultValue = (inputValue * secondSelectRate) / firstSelectRate;
    setResult(resultValue.toFixed(5));
    /* const secondResultValue =
      (secondInputValue * secondSelectRate) / firstSelectRate;
    setSecondResult(secondResultValue); */
  }, [inputValue, firstSelect, secondSelect]);

  async function fetchApi() {
    const response = await fetch(apiUrl);
    const jsonData = await response.json();

    const time = jsonData.time_last_update_utc;
    setTime(time);
    const data = jsonData.rates;
    const objectLength = Object.keys(data).length;
    //  console.log(objectLength);

    const tempArray = [];
    for (let key in data) {
      const tempObj = {
        value: key,
        rate: data[key],
      };
      tempArray.push(tempObj);
    }
    // console.log(tempArray);
    setMoneyExchange(tempArray);
  }
  console.log(timeUpdated);
  return (
    <div>
      <Card
        title={
          <h1 className="logo-title">
            <BsCurrencyExchange /> Currency Convertor
          </h1>
        }
      >
        <Form className="form">
          <div className="select-input">
            <Input
              //       value={secondResult}
              onChange={(event) => {
                setInputValue(event.target.value);
              }}
            />
            <Select
              style={{ width: 120 }}
              defaultValue={defaultFirstSelectValue}
              options={moneyExchange}
              onChange={(value) => {
                setFirstSelect(value);
              }}
            />
          </div>
          <div className="select-input">
            <Input
              value={result}
              /*               onChange={(value) => {
                setSecondInputValue(value);
              }} */
            />
            <Select
              style={{ width: 120 }}
              defaultValue={defaultSecondSelectValue}
              options={moneyExchange}
              onChange={(value) => {
                setSecondSeclect(value);
              }}
            />
          </div>
        </Form>
      </Card>
      <p
        style={{ textAlign: "end", fontSize: "0.8rem", marginInlineEnd: "5px" }}
      >
        * updated as on <span style={{ color: "#7d7d7d" }}>{time}</span>
      </p>
    </div>
  );
}

export default CurrencyConverter;
