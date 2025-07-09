import { ethers } from "ethers";
import ProductAuth from "../abi/ProductAuth.json";

const ADMIN_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const useProductContract = () => {
  const getContract = async () => {
    if (typeof window.ethereum === "undefined") {
      throw new Error("MetaMask not detected");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(ADMIN_ADDRESS, ProductAuth.abi, signer);
    return contract;
  };

  return { getContract };
};
