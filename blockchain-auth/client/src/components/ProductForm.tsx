import { useState } from "react";
import { useProductContract } from "../hooks/useProductContract";
import { QRCode } from "qrcode.react";
import { uploadMetadataToIPFS } from "../utils/uploadToIPFS";

const ProductForm = () => {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [metadataURI, setMetadataURI] = useState("");
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const { getContract } = useProductContract();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return alert("Please select a product image");
    setLoading(true);

    try {
      // Upload to IPFS
      const uri = await uploadMetadataToIPFS(name, desc, image);
      setMetadataURI(uri);

      // Register product on blockchain
      const contract = await getContract();
      const tx = await contract.registerProduct(productId, uri);
      await tx.wait();
      setRegistered(true);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to register product");
    }

    setLoading(false);
  };

  const productUrl = `https://yourdomain.com/product/${productId}`;

  return (
    <div className="max-w-md mx-auto p-6 shadow-lg rounded-xl bg-white">
      <h2 className="text-xl font-bold mb-4">Register New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product ID"
          className="w-full p-2 border rounded"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Product Name"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Product Description"
          className="w-full p-2 border rounded"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          className="w-full"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register Product"}
        </button>
      </form>

      {registered && (
        <div className="mt-6 text-center">
          <p className="font-medium">✅ Product Registered!</p>
          <div className="my-4">
            <QRCode value={productUrl} size={200} />
          </div>
          <p className="text-sm">{productUrl}</p>
          <p className="text-xs break-all text-gray-500 mt-2">
            Metadata: <a href={metadataURI} target="_blank" className="underline text-blue-500">{metadataURI}</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductForm;
