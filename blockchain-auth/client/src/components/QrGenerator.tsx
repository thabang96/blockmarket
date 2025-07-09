import { QRCode } from "qrcode.react";

const QrGenerator = ({ productUrl }: { productUrl: string }) => {
  return (
    <div className="p-4 border rounded shadow w-fit">
      <QRCode value={productUrl} size={256} />
      <p className="mt-2 text-sm">Scan to verify this product</p>
    </div>
  );
};

export default QrGenerator;
