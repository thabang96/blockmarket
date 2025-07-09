import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProductContract } from "../hooks/useProductContract";

interface Metadata {
  name: string;
  description: string;
  image: string;
}

const ProductViewer = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [meta, setMeta] = useState<Metadata | null>(null);
  const [loading, setLoading] = useState(true);
  const { getContract } = useProductContract();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const contract = await getContract();
        const data = await contract.getProduct(productId);
        setProduct(data);

        if (data.metadataURI) {
          const res = await fetch(data.metadataURI);
          const json = await res.json();
          setMeta(json);
        }
      } catch (err) {
        console.error("Error loading product", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!product || product.creator === "0x0000000000000000000000000000000000000000")
    return <p className="p-4">❌ Product not found</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">🔍 Product Info</h1>
      <p><strong>ID:</strong> {productId}</p>
      <p><strong>Creator:</strong> {product.creator}</p>
      <p><strong>Status:</strong> {product.isVerified ? "✅ Verified" : "❌ Not Verified"}</p>

      {meta && (
        <>
          <h2 className="mt-4 font-bold text-lg">📦 {meta.name}</h2>
          <p>{meta.description}</p>
          {meta.image && (
            <img
              src={meta.image.startsWith("ipfs://")
                ? `https://ipfs.io/ipfs/${meta.image.split("ipfs://")[1] || meta.image.split("/").pop()}`
                : meta.image}
              alt={meta.name}
              className="mt-4 max-w-xs rounded shadow"
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProductViewer;
