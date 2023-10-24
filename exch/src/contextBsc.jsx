import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import dexContract from "./abis/BSC/dexABI";
import L643Contract from "./abis/BSC/L643ABI";
import L784Contract from "./abis/BSC/L784ABI";
import L840Contract from "./abis/BSC/L840ABI";
import L949Contract from "./abis/BSC/L949ABI";
import ETHContract from "./abis/BSC/ETHABI";
import BUSDContract from "./abis/BSC/BUSDABI";
import BNBContract from "./abis/BSC/BNBABI";
import USDCContract from "./abis/BSC/USDCABI";

const GlobalContext = createContext();

export const GlobalContextProviderBsc = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [DexContract, setDexContract] = useState();
  const [l643Contract, setL643Contract] = useState();
  const [l784Contract, setL784Contract] = useState();
  const [l840Contract, setL840Contract] = useState();
  const [l949Contract, setL949Contract] = useState();
  const [ethContract, setETHContract] = useState();
  const [busdContract, setBUSDContract] = useState();
  const [bnbContract, setBNBContract] = useState();
  const [usdcContract, setUSDCContract] = useState();

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
    setETHContract(ETHContract(signer));
    setBUSDContract(BUSDContract(signer));
    setBNBContract(BNBContract(signer));
    setUSDCContract(USDCContract(signer));
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
        ethContract,
        busdContract,
        bnbContract,
        usdcContract,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContextBsc = () => useContext(GlobalContext);
