import React, { useState, useEffect } from "react";
import { Card, Form, Input, Select } from "antd";
import "./moneyExchange.css";

function MoneyExchange() {
  const apiUrl = "https://open.er-api.com/v6/latest/USD";

  const [moneyExchange, setMoneyExchange] = useState([]);
  const [input, setInput] = useState(0);
  const [firstSelect, setFirstSelect] = useState();
  const [secondSelect, setSecondSeclect] = useState();
  const [result, setResult] = useState();

  useEffect(() => {
    fetchApi();
  }, []);

  useEffect(() => {
    if (moneyExchange.length == 0) return;

    const firstSelectRate = moneyExchange.find((item) => {
      return item.currency === firstSelect;
    }).rate;
    const secondSelectRate = moneyExchange.find((item) => {
      return item.currency === secondSelect;
    }).rate;
    console.log(firstSelectRate, secondSelectRate);
  }, [input, firstSelect, secondSelect]);

  async function fetchApi() {
    const response = await fetch(apiUrl);
    const jsonData = await response.json();

    //  console.log(jsonData.rates);

    /* const tempArray = Object.entries(jsonData.rates);
    console.log(tempArray); */
    const tempArray = Object.entries(jsonData.rates).map((item) => {
      return {
        currency: item[0],
        rate: item[1],
      };
    });
    setMoneyExchange(tempArray);
  }
  fetchApi();
  return (
    <div>
      <Card title={<h1>Currency Convertor</h1>}>
        <Form className="form">
          <div className="select-input">
            <Input></Input>
            <Select
              style={{ width: 120 }}
              options={moneyExchange}
              onChange={(value) => {
                setFirstSelect(value);
              }}
            />
          </div>
          <div className="select-input">
            <Input></Input>
            <Select
              style={{ width: 120 }}
              options={moneyExchange.currency}
              onChange={(value) => {
                setSecondSeclect(value);
              }}
            />
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default MoneyExchange;
