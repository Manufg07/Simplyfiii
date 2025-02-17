const { Wallets } = require("fabric-network");
const path = require("path");
const fs = require("fs");

async function setupWallet() {
  try {
    const walletPath = path.join(__dirname, "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    const identities = [
      {
        name: "org1_admin",
        user: "Admin@org1.simplyfi.com",
        org: "org1.simplyfi.com",
        msp: "Org1MSP",
      },
      {
        name: "org1_auditor",
        user: "Auditor@org1.simplyfi.com",
        org: "org1.simplyfi.com",
        msp: "Org1MSP",
      },
      {
        name: "org1_user1",
        user: "User1@org1.simplyfi.com",
        org: "org1.simplyfi.com",
        msp: "Org1MSP",
      },
      {
        name: "org2_admin",
        user: "Admin@org2.simplyfi.com",
        org: "org2.simplyfi.com",
        msp: "Org2MSP",
      },
      {
        name: "org2_auditor",
        user: "Auditor@org2.simplyfi.com",
        org: "org2.simplyfi.com",
        msp: "Org2MSP",
      },
      {
        name: "org2_user",
        user: "User1@org2.simplyfi.com",
        org: "org2.simplyfi.com",
        msp: "Org2MSP",
      },
    ];

    for (const id of identities) {
      const orgPath = path.join(
        __dirname,
        `../../SimplyFi/organizations/peerOrganizations/${id.org}/users/${id.user}/msp`
      );

      if (!fs.existsSync(orgPath)) {
        console.warn(
          `⚠️ Identity folder not found for ${id.user}, skipping...`
        );
        continue;
      }

      const certPath = path.join(orgPath, "signcerts/cert.pem");
      const keyPath = path.join(orgPath, "keystore");

      if (!fs.existsSync(certPath) || !fs.existsSync(keyPath)) {
        console.warn(
          `⚠️ Missing certificate or key for ${id.user}, skipping...`
        );
        continue;
      }

      const cert = fs.readFileSync(certPath).toString();
      const keyFiles = fs.readdirSync(keyPath);
      const privateKey = fs
        .readFileSync(path.join(keyPath, keyFiles[0]))
        .toString();

      const identity = {
        credentials: { certificate: cert, privateKey },
        mspId: id.msp,
        type: "X.509",
      };

      await wallet.put(id.name, identity);
      console.log(`✅ ${id.user} identity added to wallet as ${id.name}!`);
    }
  } catch (error) {
    console.error("❌ Error setting up wallet:", error);
  }
}

setupWallet();
