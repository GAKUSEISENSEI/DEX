import React, { useState } from "react";
import { ethers } from "ethers";
import "./Swap.css";
import { useGlobalContextEth } from "../contextEth";
const SwapETH = () => {
  const {
    l643Contract,
    l784Contract,
    l840Contract,
    l949Contract,
    usdtContract,
    bnbContract,
    usdcContract,
    maticContract,
    busdContract,
    DexContract,
    walletAddress,
    provider,
  } = useGlobalContextEth();
  const [fromCurrency, setFromCurrency] = useState("ETH");
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
      if (fromCurrency == "ETH") {
        const balance = await provider.getBalance(walletAddress);
        const balanceInEth = ethers.utils.formatEther(balance);
        setBalanceFrom(balanceInEth);
      }
      if (fromCurrency == "USDT") {
        const response = await usdtContract.balanceOf(walletAddress);
        setBalanceFrom(ethers.utils.formatUnits(response, 6));
      }
      if (fromCurrency == "USDC") {
        const response = await usdcContract.balanceOf(walletAddress);
        setBalanceFrom(ethers.utils.formatUnits(response, 6));
      }
      if (fromCurrency == "BNB") {
        const response = await bnbContract.balanceOf(walletAddress);
        setBalanceFrom(ethers.utils.formatUnits(response, 18));
      }
      if (fromCurrency == "MATIC") {
        const response = await maticContract.balanceOf(walletAddress);
        setBalanceFrom(ethers.utils.formatUnits(response, 18));
      }
      if (fromCurrency == "BUSD") {
        const response = await busdContract.balanceOf(walletAddress);
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
    console.log(rate);
  };
  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
    setTransactionData("");
  };

  const handleToBalanceChange = async () => {
    try {
      if (toCurrency == "ETH") {
        const balance = await provider.getBalance(walletAddress);
        const balanceInEth = ethers.utils.formatEther(balance);
        setBalanceTo(balanceInEth);
      }
      if (toCurrency == "USDT") {
        const response = await usdtContract.balanceOf(walletAddress);
        setBalanceTo(ethers.utils.formatUnits(response, 6));
      }
      if (toCurrency == "USDC") {
        const response = await usdcContract.balanceOf(walletAddress);
        setBalanceTo(ethers.utils.formatUnits(response, 6));
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
    ETH: "ETH",
    USDT: "USDT",
    BNB: "BNB",
    USDC: "USDC",
    BUSD: "BUSD",
    MATIC: "MATIC",
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
          "0xFF894eCda39fE9dE93E044AA85c8d272641ca6E1", // address of dex contract
          amount * 10 ** 6
        );
      } catch (err) {
        console.log(err);
      }
    }
    if (fromCurrency == "USDT") {
      try {
        await usdtContract.approve(
          "0xFF894eCda39fE9dE93E044AA85c8d272641ca6E1",
          amount * 10 ** 6
        );
      } catch (err) {
        console.log(err);
      }
    }
    if (fromCurrency == "USDC") {
      try {
        await usdcContract.approve(
          "0xFF894eCda39fE9dE93E044AA85c8d272641ca6E1",
          amount * 10 ** 6
        );
      } catch (err) {
        console.log(err);
      }
    }
    if (fromCurrency == "BNB") {
      try {
        await bnbContract.approve(
          "0xFF894eCda39fE9dE93E044AA85c8d272641ca6E1",
          amount * 10 ** 18
        );
      } catch (err) {
        console.log(err);
      }
    }
    if (fromCurrency == "BUSD") {
      try {
        await busdContract.approve(
          "0xFF894eCda39fE9dE93E044AA85c8d272641ca6E1",
          amount * 10 ** 18
        );
      } catch (err) {
        console.log(err);
      }
    }
    if (fromCurrency == "MATIC") {
      try {
        await maticContract.approve(
          "0xFF894eCda39fE9dE93E044AA85c8d272641ca6E1",
          amount * 10 ** 18
        );
      } catch (err) {
        console.log(err);
      }
    }
    if (fromCurrency == "L784") {
      try {
        await l784Contract.approve(
          "0xFF894eCda39fE9dE93E044AA85c8d272641ca6E1",
          amount * 10 ** 6
        );
      } catch (err) {
        console.log(err);
      }
    }
    if (fromCurrency == "L949") {
      try {
        await l949Contract.approve(
          "0xFF894eCda39fE9dE93E044AA85c8d272641ca6E1",
          amount * 10 ** 6
        );
      } catch (err) {
        console.log(err);
      }
    }
    if (fromCurrency == "L840") {
      try {
        await l840Contract.approve(
          "0xFF894eCda39fE9dE93E044AA85c8d272641ca6E1",
          amount * 10 ** 6
        );
      } catch (err) {
        console.log(err);
      }
    }
    if ((fromCurrency !== "ETH") & (toCurrency !== "ETH")) {
      if (
        fromCurrency == "BNB" ||
        fromCurrency == "MATIC" ||
        fromCurrency == "BUSD"
      ) {
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
    } else if (fromCurrency == "ETH") {
      try {
        const messageHash2 = ethers.utils.solidityKeccak256(
          ["uint256", "string", "uint256"],
          [`${amount * 10 ** 18}`, KEY, Math.floor(rate * 10 ** 6)]
        );
        const response = await DexContract.swapTokenForEth(
          toTicker,
          Math.floor(rate * 10 ** 6),
          messageHash2,
          {
            value: ethers.utils.parseEther(`${amount}`),
          }
        );
        setTransactionData(response.hash);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const messageHash3 = ethers.utils.solidityKeccak256(
          ["uint256", "string", "uint256"],
          [`${amount * 10 ** 6}`, KEY, Math.floor(rate * 10 ** 10)]
        );
        const response = await DexContract.swapEthForToken(
          fromTicker,
          amount * 10 ** 6,
          Math.floor(rate * 10 ** 10),
          messageHash3
        );
        setTransactionData(response.hash);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <h1>Crypto Exchange eth</h1>
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
              <option value="ETH">ETH</option>
              <option value="USDC">USDC</option>
              <option value="BNB">BNB</option>
              <option value="BUSD">BUSD</option>
              <option value="MATIC">MATIC</option>
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
              <option value="ETH">ETH</option>
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

export default SwapETH;
