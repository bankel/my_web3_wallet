import { ethers } from "./node_modules/ethers/dist/ethers.min.js";

console.log("Service Worker loaded successfully!");

let accounts = ["0xYourEthereumAddress"]; // 这里改成你的测试地址
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.method === "eth_requestAccounts") {
    sendResponse({ result: accounts });
  }
});

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.method === "eth_sendTransaction") {
    const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth"); // 以太坊 RPC
    const wallet = new ethers.Wallet("0xYourPrivateKey", provider); // 替换成你的私钥

    try {
      const tx = await wallet.sendTransaction(request.params[0]);
      sendResponse({ result: tx.hash });
    } catch (error) {
      sendResponse({ error: error.message });
    }
  }
});
