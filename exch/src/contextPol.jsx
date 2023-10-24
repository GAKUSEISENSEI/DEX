import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import dexContract from "./abis/Polygon/dexABI";
import L643Contract from "./abis/Polygon/L643ABI";
import L784Contract from "./abis/Polygon/L784ABI";
import L840Contract from "./abis/Polygon/L840ABI";
import L949Contract from "./abis/Polygon/L949ABI";
import ETHContract from "./abis/Polygon/ETHABI";
import USDTContract from "./abis/Polygon/USDTABI";
import BNBContract from "./abis/Polygon/BNBABI";
import USDCContract from "./abis/Polygon/USDCABI";
import BUSDContract from "./abis/Polygon/BUSDABI";
import MATICContract from "./abis/Polygon/MATICABI";
import AVAXContract from "./abis/Polygon/AVAXABI";

const GlobalContext = createContext();

export const GlobalContextProviderPol = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [DexContract, setDexContract] = useState();
  const [l643Contract, setL643Contract] = useState();
  const [l784Contract, setL784Contract] = useState();
  const [l840Contract, setL840Contract] = useState();
  const [l949Contract, setL949Contract] = useState();
  const [ethContract, setETHContract] = useState();
  const [usdtContract, setUSDTContract] = useState();
  const [bnbContract, setBNBContract] = useState();
  const [usdcContract, setUSDCContract] = useState();
  const [busdContract, setBUSDContract] = useState();
  const [maticContract, setMATICContract] = useState();
  const [avaxContract, setAVAXContract] = useState();

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
    setETHContract(ETHContract(signer));
    setL949Contract(L949Contract(signer));
    setUSDTContract(USDTContract(signer));
    setBNBContract(BNBContract(signer));
    setUSDCContract(USDCContract(signer));
    setBUSDContract(BUSDContract(signer));
    setMATICContract(MATICContract(signer));
    setAVAXContract(AVAXContract(signer));
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
        usdtContract,
        bnbContract,
        usdcContract,
        busdContract,
        maticContract,
        avaxContract,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContextPol = () => useContext(GlobalContext);
