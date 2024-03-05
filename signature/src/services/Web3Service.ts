import { ethers } from "ethers";

function getProvider(): ethers.BrowserProvider {
  if (!window.ethereum) throw new Error("No MetaMask found");
  return new ethers.BrowserProvider(window.ethereum);
}

export async function doLogin(): Promise<string> {
  try {
    const provider = getProvider();
    const account = await provider.send("eth_requestAccounts", []);
    if (!account || !account.length)
      throw new Error("Wallet not found/allowed.");
    await provider.send("wallet_switchEthereumChain", [{ chainId: "0x61" }]);
    return account[0];
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

export async function sign() {
  const provider = await getProvider();
  const signer = await provider.getSigner();
  const hashMensagem = ethers.solidityPackedKeccak256(
    ["address", "address", "uint256"],
    [
      "0x0DFF2EA2f11EaB9F0f530C90c617085736855623",
      "0x0DFF2EA2f11EaB9F0f530C90c617085736855623",
      10000,
    ]
  );

  const signedMessage = await signer.signMessage(ethers.getBytes(hashMensagem));
  console.log(signedMessage);
}
