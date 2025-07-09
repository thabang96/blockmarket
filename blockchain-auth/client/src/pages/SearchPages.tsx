import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [productId, setProductId] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) return;
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">🔎 Search Product by ID</h2>
        <form onSubmit={handleSearch} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter Product ID"
            className="p-2 border rounded"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white py-2 rounded">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchPage;
