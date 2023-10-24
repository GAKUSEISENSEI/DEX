import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import dexContract from "./abis/Ethereum/dexABI";
import L643Contract from "./abis/Ethereum/L643ABI";
import L784Contract from "./abis/Ethereum/L784ABI";
import L840Contract from "./abis/Ethereum/L840ABI";
import L949Contract from "./abis/Ethereum/L949ABI";
import USDTContract from "./abis/Ethereum/USDTABI";
import USDCContract from "./abis/Ethereum/USDCABI";
import BNBContract from "./abis/Ethereum/BNBABI";
import MATICContract from "./abis/Ethereum/MATICABI";
import BUSDContract from "./abis/Ethereum/BUSDABI";

const GlobalContext = createContext();

export const GlobalContextProviderEth = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [DexContract, setDexContract] = useState();
  const [l643Contract, setL643Contract] = useState();
  const [l784Contract, setL784Contract] = useState();
  const [l840Contract, setL840Contract] = useState();
  const [l949Contract, setL949Contract] = useState();
  const [usdtContract, setUSDTContract] = useState();
  const [bnbContract, setBNBContract] = useState();
  const [usdcContract, setUSDCContract] = useState();
  const [maticContract, setMATICContract] = useState();
  const [busdContract, setBUSDContract] = useState();
  const [provider, setProvider] = useState();

  useEffect(() => {
    setSmartContractAndProvider();
    updateCurrentWalletAddress();
  }, []);

  const updateCurrentWalletAddress = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
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
    setBNBContract(BNBContract(signer));
    setUSDCContract(USDCContract(signer));
    setMATICContract(MATICContract(signer));
    setBUSDContract(BUSDContract(signer));
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
        bnbContract,
        maticContract,
        busdContract,
        provider,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContextEth = () => useContext(GlobalContext);
