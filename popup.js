import { ethers } from "./node_modules/ethers/dist/ethers.min.js";

document.getElementById("connect").addEventListener("click", () => {
  console.log("connect clicked");
  chrome.runtime.sendMessage({ method: "eth_requestAccounts" }, (response) => {
    console.log("连接的钱包地址:", response.result);
  });
});

document.getElementById("send").addEventListener("click", () => {
  console.log("connect send");
  const tx = {
    to: "0xReceiverAddress", // 接收地址
    value: ethers.parseEther("0.01"), // 发送 0.01 ETH
    gasLimit: "21000",
  };

  chrome.runtime.sendMessage({ method: "eth_sendTransaction", params: [tx] }, (response) => {
    console.log("交易哈希:", response.result);
  });
});
