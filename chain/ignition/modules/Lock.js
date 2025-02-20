// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const JAN_1ST_2030 = 1893456000;
const ONE_GWEI = 1_000_000_000n;
const ETH_0_001 = 1_000_000_000_000_000n; // 0.001 ETH in wei (1e15)

module.exports = buildModule("Lock", (m) => {
  const unlockTime = Math.floor(Date.now() / 1000) + 60; // 1 minute from now
  
  const lock = m.contract("Lock", [unlockTime], {
    value: ETH_0_001  // 使用 bigint 类型的值
  });

  return { lock };
});
