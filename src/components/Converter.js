import React, { useEffect, useState } from "react";
import { Card, Select, Input, Form } from "antd";
import { RiCoinsLine } from "react-icons/ri"; // react-icons import (fa = font Awesome) (ri = react icon)

function Converter() {
  const apiUrl = "https://api.coingecko.com/api/v3/exchange_rates";

  const defaultFirstSelectValue = "Bitcoin";
  const defaultSecondSelectValue = "Ether";

  const [cryptoList, setCryptoList] = useState([]);
  const [inputValue, setInputValue] = useState("0");
  const [firstSelect, setFirstSelect] = useState(defaultFirstSelectValue);
  const [secondSelect, setSecondSeclect] = useState(defaultSecondSelectValue);
  const [result, setResult] = useState("0");

  /*   const names = [
    { value: "jack", label: "Jack" },
    { value: "lucy", label: "Lucy" },
    { value: "Yiminghe", label: "yiminghe" },
  ]; */

  useEffect(() => {
    fetchApi();
  }, []);

  useEffect(() => {
    if (cryptoList.length == 0) return; // at first during cryptoList is an empty array before fetching
    const firstSelectRate = cryptoList.find((item) => {
      return item.value === firstSelect;
    }).rate;
    const secondSelectRate = cryptoList.find((item) => {
      return item.value === secondSelect;
    }).rate;
    // console.log(firstSelectRate, secondSelectRate);

    const resultValue = (inputValue * secondSelectRate) / firstSelectRate;
    setResult(resultValue.toFixed(4));
  }, [inputValue, firstSelect, secondSelect]);

  async function fetchApi() {
    const response = await fetch(apiUrl);
    const jsonData = await response.json();

    const data = jsonData.rates;

    // method - 1
    /*     const tempArray = [];
    Object.entries(data).forEach((item) => {
      const tempObj = {
        value: item[1].name,
        label: item[1].name,
        rate: item[1].value,
      };
      tempArray.push(tempObj);
    });
    console.log(tempArray); */

    // method - 2
    const tempArray = Object.entries(data).map((item) => {
      return {
        value: item[1].name,
        label: item[1].name,
        rate: item[1].value,
      };
    });
    //  console.log(tempArray);
    setCryptoList(tempArray);
  }
  return (
    <div className="container">
      <Card
        className="crypto-card"
        title={
          <h1 className="logo-title">
            <RiCoinsLine />
            Crypto Converter
          </h1>
        }
      >
        <Form size="large">
          <Form.Item>
            <Input
              className="input"
              onChange={(event) => {
                setInputValue(event.target.value);
              }}
            />
          </Form.Item>
        </Form>
        <div className="selectBox">
          <Select
            className="input"
            style={{ width: "200px" }}
            defaultValue={defaultFirstSelectValue}
            options={cryptoList}
            onChange={(value) => {
              setFirstSelect(value);
            }}
          />
          <Select
            className="input"
            style={{ width: "200px" }}
            defaultValue={defaultSecondSelectValue}
            options={cryptoList}
            onChange={(value) => {
              setSecondSeclect(value);
            }}
          />
        </div>
        <p style={{ textAlign: "center", fontSize: "1.1rem" }}>
          {inputValue} {firstSelect} = {result} {secondSelect}
        </p>
      </Card>
    </div>
  );
}

export default Converter;
