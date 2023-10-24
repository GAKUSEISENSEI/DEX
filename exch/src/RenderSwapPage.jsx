import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import SwapETH from "./components/SwapETH";
import SwapPOLYGON from "./components/SwapPOLYGON";
import SwapAVL from "./components/SwapAVL";
import SwapBSC from "./components/SwapBSC";
import Alert from "./components/Alert";
import { GlobalContextProviderEth } from "./contextEth";
import { GlobalContextProviderPol } from "./contextPol";
import { GlobalContextProviderBsc } from "./contextBsc";
import { GlobalContextProviderAvl } from "./contextAvl";
const RenderSwapPage = () => {
  const [chainId, setChainId] = useState(null);
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      provider
        .getNetwork()
        .then((network) => {
          setChainId(network.chainId);
        })
        .catch((error) => {
          console.error(error);
        });
      window.ethereum.on("chainChanged", (newChainId) => {
        setChainId(newChainId);
      });
    } else {
      alert("Metamask is not installed");
    }
  });
  if (chainId == 1) {
    return (
      <GlobalContextProviderEth>
        <SwapETH />
      </GlobalContextProviderEth>
    );
  } else if (chainId == 137) {
    return (
      <GlobalContextProviderPol>
        <SwapPOLYGON />
      </GlobalContextProviderPol>
    );
  } else if (chainId == 43114) {
    return (
      <GlobalContextProviderAvl>
        <SwapAVL />
      </GlobalContextProviderAvl>
    );
  } else if (chainId == 56) {
    return (
      <GlobalContextProviderBsc>
        <SwapBSC />
      </GlobalContextProviderBsc>
    );
  } else {
    return <Alert />;
  }
};
export default RenderSwapPage;
