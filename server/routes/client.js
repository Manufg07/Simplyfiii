const { Gateway, Wallets } = require("fabric-network");
const path = require("path");
const fs = require("fs");

class ClientApplication {
  async submitTxn(
    organization,
    role,
    channelName,
    chaincodeName,
    contractName,
    txnType,
    txnName,
    ...args
  ) {
    try {
      const walletPath = path.join(__dirname, "wallet"); // Path to wallet
      const wallet = await Wallets.newFileSystemWallet(walletPath);
      const identity = await wallet.get(`${organization}_${role}`);

      if (!identity) {
        throw new Error(
          `Identity ${organization}_${role} not found in wallet.`
        );
      }

      const connectionProfilePath = path.resolve(
        __dirname,
        "connection-profile",
        `${organization}.json`
      );
      const connectionProfile = JSON.parse(
        fs.readFileSync(connectionProfilePath, "utf8")
      );

      const gateway = new Gateway();
      await gateway.connect(connectionProfile, {
        wallet,
        identity: `${organization}_${role}`,
        discovery: { enabled: true, asLocalhost: true },
      });

      const network = await gateway.getNetwork(channelName);
      const contract = await network.getContract(chaincodeName, contractName);

      let resultBytes;

      if (txnType === "invokeTxn") {
        resultBytes = await contract.submitTransaction(txnName, ...args);
      } else if (txnType === "queryAuditor") {
        resultBytes = await contract.evaluateTransaction(txnName, ...args);
      } else if (txnType === "queryUser") {
        resultBytes = await contract.evaluateTransaction(txnName, ...args);
      } else if (txnType === "update") {
        resultBytes = await contract.evaluateTransaction(txnName, ...args);
      } else if (txnType === "invokeTxn" || txnType === "Delete") {
        resultBytes = await contract.submitTransaction(txnName, ...args);
      } else {
        result = await contract.evaluateTransaction(txnName, ...args);
      }

      const result = resultBytes.toString(); // ✅ Ensuring result is converted to string safely
      console.log("*** Transaction Result:", result);
      return result;
    } catch (error) {
      console.error("Transaction Error:", error);
      throw error;
    }
  }
}

module.exports = { ClientApplication };
