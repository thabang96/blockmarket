import { Web3Storage, File } from "web3.storage";

const token = import.meta.env.VITE_WEB3_STORAGE_TOKEN;

function getAccessToken() {
  return token;
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken()! });
}

export async function uploadMetadataToIPFS(name: string, description: string, image: File) {
  const metadata = {
    name,
    description,
    image: `ipfs://${image.name}`,
  };

  const json = new Blob([JSON.stringify(metadata)], { type: "application/json" });
  const files = [image, new File([json], "metadata.json")];

  const client = makeStorageClient();
  const cid = await client.put(files, {
    name: `${name}-metadata`,
  });

  return `https://${cid}.ipfs.dweb.link/metadata.json`;
}
