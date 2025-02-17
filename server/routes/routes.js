const express = require("express");
const router = express.Router();
const { ClientApplication } = require("./client");

router.post("/assets", async (req, res) => {
  try {
    const { assetID, owner, value } = req.body;
    const client = new ClientApplication();

    const result = await client.submitTxn(
      "org1",
      "admin",
      "simplyfichannel",
      "SimplyFi-Task",
      "AssetTransfer",
      "invokeTxn",
      "CreateAsset",
      assetID,
      owner,
      value.toString()
    );

    res.status(201).json({ success: true, data: JSON.parse(result) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/assets", async (req, res) => {
  try {
    const client = new ClientApplication();
    const result = await client.submitTxn(
      "org1",
      "auditor",
      "simplyfichannel",
      "SimplyFi-Task",
      "AssetTransfer",
      "queryAuditor",
      "GetAllAssets"
    );

    res.status(200).json({ success: true, data: JSON.parse(result) });
  } catch (error) {
    res.status(403).json({ success: false, error: "Access denied." });
  }
});

// router.get("/assets/:id", async (req, res) => {
//   try {
//     const { id: assetID } = req.params;
//     // const role = req.query.role || "user"; // Default to user

//     const client = new ClientApplication();
//     const result = await client.submitTxn(
//       "org1",
//       "user",
//       "simplyfichannel",
//       "SimplyFi-Task",
//       "AssetTransfer",
//       "queryUser",
//       "ReadAsset",
//       assetID
//     );

//     res.status(200).json({ success: true, data: JSON.parse(result) });
//   } catch (error) {
//     res.status(404).json({ success: false, error: error.message });
//   }
// });
router.get("/assets/:id", async (req, res) => {
  try {
    const { id: assetID } = req.params;
    const { userId } = req.query; // Get user ID from query parameter

    if (!userId) {
      throw new Error("User ID is required.");
    }

    const client = new ClientApplication();
    const result = await client.submitTxn(
      "org1",
      userId, // <-- Pass the user ID dynamically
      "simplyfichannel",
      "SimplyFi-Task",
      "AssetTransfer",
      "queryUser",
      "ReadAsset",
      assetID
    );

    res.status(200).json({ success: true, data: JSON.parse(result) });
  } catch (error) {
    if (error.message.includes("Unauthorized")) {
      res.status(403).json({ success: false, error: "Access denied." });
    } else if (error.message.includes("does not exist")) {
      res.status(404).json({ success: false, error: "Asset not found." });
    } else {
      res.status(500).json({ success: false, error: error.message });
    }
  }
});

router.put("/assets/:id", async (req, res) => {
  try {
    const { id: assetID } = req.params;
    const { newValue, newOwner } = req.body;

    const client = new ClientApplication();
    const result = await client.submitTxn(
      "org1",
      "admin",
      "simplyfichannel",
      "SimplyFi-Task",
      "AssetTransfer",
      "invokeTxn",
      "UpdateAsset",
      assetID,
      newValue,
      newOwner
    );

    res.status(200).json({ success: true, data: JSON.parse(result) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete("/assets/:id", async (req, res) => {
  try {
    const { id: assetID } = req.params;
    const client = new ClientApplication();
    const result = await client.submitTxn(
      "org1",
      "admin",
      "simplyfichannel",
      "SimplyFi-Task",
      "AssetTransfer",
      "invokeTxn",
      "DeleteAsset",
      assetID
    );

    res
      .status(200)
      .json({ success: true, message: JSON.parse(result).message });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
