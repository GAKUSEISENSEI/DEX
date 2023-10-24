import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import dexContract from "./abis/Avalanche/dexABI";
import L643Contract from "./abis/Avalanche/L643ABI";
import L784Contract from "./abis/Avalanche/L784ABI";
import L840Contract from "./abis/Avalanche/L840ABI";
import L949Contract from "./abis/Avalanche/L949ABI";
import USDTContract from "./abis/Avalanche/USDTABI";
import USDCContract from "./abis/Avalanche/USDCABI";
import BUSDContract from "./abis/Avalanche/BUSDABI";
import WAVAXContract from "./abis/Avalanche/WAVAXABI";

const GlobalContext = createContext();

export const GlobalContextProviderAvl = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [DexContract, setDexContract] = useState();
  const [l643Contract, setL643Contract] = useState();
  const [l784Contract, setL784Contract] = useState();
  const [l840Contract, setL840Contract] = useState();
  const [l949Contract, setL949Contract] = useState();
  const [usdtContract, setUSDTContract] = useState();
  const [usdcContract, setUSDCContract] = useState();
  const [busdContract, setBUSDContract] = useState();
  const [wavaxContract, setWAVAXContract] = useState();

  useEffect(() => {
    setSmartContractAndProvider();
    updateCurrentWalletAddress();
  }, []);

  const updateCurrentWalletAddress = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_accounts", []);
      setWalletAddress(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const setSmartContractAndProvider = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    setDexContract(dexContract(signer));
    setL643Contract(L643Contract(signer));
    setL784Contract(L784Contract(signer));
    setL840Contract(L840Contract(signer));
    setL949Contract(L949Contract(signer));
    setUSDTContract(USDTContract(signer));
    setUSDCContract(USDCContract(signer));
    setBUSDContract(BUSDContract(signer));
    setWAVAXContract(WAVAXContract(signer));
  };

  return (
    <GlobalContext.Provider
      value={{
        walletAddress,
        DexContract,
        l643Contract,
        l784Contract,
        l840Contract,
        l949Contract,
        usdtContract,
        usdcContract,
        busdContract,
        wavaxContract,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContextAvl = () => useContext(GlobalContext);
