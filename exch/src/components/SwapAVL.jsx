import React, { useState } from "react";
import { ethers } from "ethers";
import "./Swap.css";
import { useGlobalContextAvl } from "../contextAvl";
const SwapAVL = () => {
  const {
    l643Contract,
    l784Contract,
    l840Contract,
    l949Contract,
    usdtContract,
    usdcContract,
    busdContract,
    wavaxContract,
    DexContract,
    walletAddress,
  } = useGlobalContextAvl();
  const [fromCurrency, setFromCurrency] = useState("USDT");
  const [toCurrency, setToCurrency] = useState("L643");
  const [amount, setAmount] = useState(0);
  const [rate, setRate] = useState(0);
  const [transactionData, setTransactionData] = useState("");
  const [balanceFrom, setBalanceFrom] = useState(0);
  const [balanceTo, setBalanceTo] = useState(0);
  const KEY = "0x6d6164654279566164696d47414b5553454953454e534549";
  const handleSwap = (e) => {
    e.preventDefault();
    _swapToken();
  };
  const handleFromCurrencyChange = async (e) => {
    setFromCurrency(e.target.value);
    setTransactionData("");
  };
  const handleFromBalanceChange = async () => {
    try {
      if (fromCurrency == "USDT") {
        const response = await usdtContract.balanceOf(walletAddress);
        setBalanceFrom(ethers.utils.formatUnits(response, 6));
      }
      if (fromCurrency == "USDC") {
        const response = await usdcContract.balanceOf(walletAddress);
        setBalanceFrom(ethers.utils.formatUnits(response, 6));
      }
      if (fromCurrency == "BUSD") {
        const response = await busdContract.balanceOf(walletAddress);
        setBalanceFrom(ethers.utils.formatUnits(response, 18));
      }
      if (fromCurrency == "AVAX") {
        const response = await wavaxContract.balanceOf(walletAddress);
        setBalanceFrom(ethers.utils.formatUnits(response, 18));
      }
      if (fromCurrency == "L643") {
        const response = await l643Contract.balanceOf(walletAddress);
        setBalanceFrom(ethers.utils.formatUnits(response, 6));
      }
      if (fromCurrency == "L949") {
        const response = await l949Contract.balanceOf(walletAddress);
        setBalanceFrom(ethers.utils.formatUnits(response, 6));
      }
      if (fromCurrency == "L840") {
        const response = await l840Contract.balanceOf(walletAddress);
        setBalanceFrom(ethers.utils.formatUnits(response, 6));
      }
      if (fromCurrency == "L784") {
        const response = await l784Contract.balanceOf(walletAddress);
        setBalanceFrom(ethers.utils.formatUnits(response, 6));
      }
    } catch (err) {
      console.log(err);
    }
    fetch(
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${tickers[fromCurrency]}&tsyms=${tickers[toCurrency]}`
    )
      .then((response) => response.json())
      .then((data) => setRate(findValue(data.RAW, "PRICE").toFixed(2)));
  };
  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
    setTransactionData("");
  };

  const handleToBalanceChange = async () => {
    try {
      if (toCurrency == "USDT") {
        const response = await usdtContract.balanceOf(walletAddress);
        setBalanceTo(ethers.utils.formatUnits(response, 6));
      }
      if (toCurrency == "USDC") {
        const response = await usdcContract.balanceOf(walletAddress);
        setBalanceTo(ethers.utils.formatUnits(response, 6));
      }
      if (toCurrency == "USDC") {
        const response = await busdContract.balanceOf(walletAddress);
        setBalanceTo(ethers.utils.formatUnits(response, 18));
      }
      if (toCurrency == "AVAX") {
        const response = await wavaxContract.balanceOf(walletAddress);
        setBalanceTo(ethers.utils.formatUnits(response, 18));
      }
      if (toCurrency == "L643") {
        const response = await l643Contract.balanceOf(walletAddress);
        setBalanceTo(ethers.utils.formatUnits(response, 6));
      }
      if (toCurrency == "L949") {
        const response = await l949Contract.balanceOf(walletAddress);
        setBalanceTo(ethers.utils.formatUnits(response, 6));
      }
      if (toCurrency == "L840") {
        const response = await l840Contract.balanceOf(walletAddress);
        setBalanceTo(ethers.utils.formatUnits(response, 6));
      }
      if (toCurrency == "L784") {
        const response = await l784Contract.balanceOf(walletAddress);
        setBalanceTo(ethers.utils.formatUnits(response, 6));
      }
    } catch (err) {
      console.log(err);
    }
    fetch(
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${tickers[fromCurrency]}&tsyms=${tickers[toCurrency]}`
    )
      .then((response) => response.json())
      .then((data) => setRate(findValue(data.RAW, "PRICE").toFixed(2)));
    console.log(rate);
  };

  const tickers = {
    L643: "RUB",
    L784: "AED",
    L840: "USD",
    L949: "TRY",
    USDT: "USDT",
    USDC: "USDC",
    BUSD: "BUSD",
    AVAX: "AVAX",
  };

  const countDecimals = (value) => {
    if (Math.floor(value) !== value)
      return value.toString().split(".")[1].length || 0;
    return 0;
  };

  const findValue = (obj, key) => {
    for (var k in obj) {
      if (k === key) {
        return obj[k];
      }
      if (typeof obj[k] === "object") {
        var val = findValue(obj[k], key);
        if (val !== undefined) {
          return val;
        }
      }
    }
  };

  const handleAmountChange = async (e) => {
    setAmount(e.target.value);
    fetch(
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${tickers[fromCurrency]}&tsyms=${tickers[toCurrency]}`
    )
      .then((response) => response.json())
      .then((data) => setRate(findValue(data.RAW, "PRICE").toFixed(2)));
    console.log(rate);
  };

  const _swapToken = async () => {
    const fromTicker = ethers.utils.formatBytes32String(fromCurrency);
    const toTicker = ethers.utils.formatBytes32String(toCurrency);

    if (fromCurrency == "L643") {
      try {
        await l643Contract.approve(
          "0x20d2Ff8720AA26F778957610111D070a9BeA7DDC", // address of dex contract
          amount * 10 ** 6
        );
      } catch (err) {
        console.log(err);
      }
    }
    if (fromCurrency == "USDT") {
      try {
        await usdtContract.approve(
          "0x20d2Ff8720AA26F778957610111D070a9BeA7DDC",
          amount * 10 ** 6
        );
      } catch (err) {
        console.log(err);
      }
    }
    if (fromCurrency == "USDC") {
      try {
        await usdcContract.approve(
          "0x20d2Ff8720AA26F778957610111D070a9BeA7DDC",
          amount * 10 ** 6
        );
      } catch (err) {
        console.log(err);
      }
    }
    if (fromCurrency == "BUSD") {
      try {
        await busdContract.approve(
          "0x20d2Ff8720AA26F778957610111D070a9BeA7DDC",
          amount * 10 ** 18
        );
      } catch (err) {
        console.log(err);
      }
    }
    if (fromCurrency == "AVAX") {
      try {
        await wavaxContract.approve(
          "0x20d2Ff8720AA26F778957610111D070a9BeA7DDC",
          amount * 10 ** 18
        );
      } catch (err) {
        console.log(err);
      }
    }
    if (fromCurrency == "L784") {
      try {
        await l784Contract.approve(
          "0x20d2Ff8720AA26F778957610111D070a9BeA7DDC",
          amount * 10 ** 6
        );
      } catch (err) {
        console.log(err);
      }
    }
    if (fromCurrency == "L949") {
      try {
        await l949Contract.approve(
          "0x20d2Ff8720AA26F778957610111D070a9BeA7DDC",
          amount * 10 ** 6
        );
      } catch (err) {
        console.log(err);
      }
    }
    if (fromCurrency == "L840") {
      try {
        await l840Contract.approve(
          "0x20d2Ff8720AA26F778957610111D070a9BeA7DDC",
          amount * 10 ** 6
        );
      } catch (err) {
        console.log(err);
      }
    }
    if (fromCurrency == "AVAX" || fromCurrency == "BUSD") {
      try {
        const messageHash1 = ethers.utils.solidityKeccak256(
          ["uint256", "string", "uint256"],
          [`${amount * 10 ** 18}`, KEY, Math.floor(rate * 10 ** 6)]
        );
        const response = await DexContract.swapToken(
          18,
          fromTicker,
          amount * 10 ** 18,
          toTicker,
          Math.floor(rate * 10 ** 6),
          messageHash1
        );
        setTransactionData(response.hash);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const messageHash1 = ethers.utils.solidityKeccak256(
          ["uint256", "string", "uint256"],
          [`${amount * 10 ** 6}`, KEY, Math.floor(rate * 10 ** 6)]
        );
        const response = await DexContract.swapToken(
          6,
          fromTicker,
          amount * 10 ** 6,
          toTicker,
          Math.floor(rate * 10 ** 6),
          messageHash1
        );
        setTransactionData(response.hash);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <h1>Crypto Exchange avl</h1>
      <div className="container">
        <div className="buy">
          <form onSubmit={handleSwap}>
            <label>
              From: Balance:{" "}
              {countDecimals(balanceFrom) > 2
                ? Number(balanceFrom).toFixed(2)
                : balanceFrom}
            </label>
            <select
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
              onClick={handleFromBalanceChange}
            >
              <option value="USDC">USDC</option>
              <option value="BUSD">BUSD</option>
              <option value="AVAX">AVAX</option>
              <option value="USDT">USDT</option>
              <option value="L643">L643</option>
              <option value="L949">L949</option>
              <option value="L840">L840</option>
              <option value="L784">L784</option>
            </select>
            <br />
            <label>Amount:</label>
            <input
              type="number"
              name="amount"
              value={amount}
              onChange={handleAmountChange}
            />

            <label>
              To: Balance:{" "}
              {countDecimals(balanceTo) > 2
                ? Number(balanceTo).toFixed(2)
                : balanceTo}
            </label>
            <select
              value={toCurrency}
              onChange={handleToCurrencyChange}
              onClick={handleToBalanceChange}
            >
              <option value="USDC">USDC</option>
              <option value="USDT">USDT</option>
              <option value="L643">L643</option>
              <option value="L949">L949</option>
              <option value="L840">L840</option>
              <option value="L784">L784</option>
            </select>
            <br />
            <>
              You will get:{"  "}
              {countDecimals(amount * rate) > 2
                ? (amount * rate).toFixed(2)
                : amount * rate}
              {"  "}
              {toCurrency}
            </>
            <p>
              {transactionData ? `Transaction hash: ${transactionData}` : ""}
            </p>

            <button type="submit">SWAP</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SwapAVL;
