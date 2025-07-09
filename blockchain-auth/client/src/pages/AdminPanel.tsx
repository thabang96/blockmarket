import { useEffect, useState } from "react";
import { useProductContract } from "../hooks/useProductContract";
import { ethers } from "ethers";

const ADMIN_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3".toLowerCase(); // Replace with actual admin

const AdminPanel = () => {
  const [productId, setProductId] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { getContract } = useProductContract();

  useEffect(() => {
    const checkAdmin = async () => {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = (await signer.getAddress()).toLowerCase();
        setIsAdmin(address === ADMIN_ADDRESS);
      }
    };

    checkAdmin();
  }, []);

  const handleVerify = async () => {
    setVerifying(true);
    try {
      const contract = await getContract();
      const tx = await contract.verifyProduct(productId);
      await tx.wait();
      alert("✅ Product verified!");
    } catch (err) {
      console.error("Verification failed", err);
      alert("❌ Failed to verify product");
    }
    setVerifying(false);
  };

  if (!isAdmin) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        ❌ Access denied. Admins only.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">🛠️ Admin Verification Panel</h2>
      <input
        type="text"
        placeholder="Enter Product ID to verify"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleVerify}
        disabled={verifying}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        {verifying ? "Verifying..." : "Verify Product"}
      </button>
    </div>
  );
};

export default AdminPanel;
