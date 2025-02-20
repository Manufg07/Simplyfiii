"use strict";

const { Contract } = require("fabric-contract-api");

class AssetTransfer extends Contract {
  // CreateAsset creates a new asset with the given ID, owner, and value
  async CreateAsset(ctx, assetID, owner, value) {
    // Validate input
    if (!assetID || !owner || !value) {
      throw new Error("Invalid input parameters.");
    }

    // Check if the caller has the "admin" role
    const clientID = ctx.clientIdentity;
    if (!clientID.assertAttributeValue("role", "admin")) {
      throw new Error('Only users with the "admin" role can create assets.');
    }

    // Check if the asset already exists
    const exists = await this.AssetExists(ctx, assetID);
    if (exists) {
      throw new Error(`The asset ${assetID} already exists.`);
    }

    // Create the asset object
    const asset = {
      assetID,
      owner,
      value: parseInt(value), // Convert value to integer
    };

    // Save the asset to the ledger
    await ctx.stub.putState(assetID, Buffer.from(JSON.stringify(asset)));
    return JSON.stringify(asset);
  }

  // ReadAsset returns the asset with the given ID
  async ReadAsset(ctx, assetID) {
    if (!assetID) {
      throw new Error("Asset ID is required.");
    }

    const assetJSON = await ctx.stub.getState(assetID);
    if (!assetJSON || assetJSON.length === 0) {
      throw new Error(`Asset ${assetID} does not exist.`);
    }

    const asset = JSON.parse(assetJSON.toString());
    const clientID = ctx.clientIdentity;

    // // 1. Allow Admins and Auditors to bypass ownership check
    // const role = clientID.getAttributeValue("role"); // Get the 'role' attribute
    // if (role === "admin" || role === "auditor") {
    //   return assetJSON.toString();
    // }

    // 2. For Regular Users: Check if their 'id' attribute matches the asset's owner
    const userId = clientID.getAttributeValue("id"); 
    if (asset.owner !== userId) {
      throw new Error("Unauthorized: You can only view your own assets.");
    }

    return assetJSON.toString();
  }

  async UpdateAsset(ctx, assetID, newValue, newOwner) {
    // Validate input
    if (!assetID || (!newValue && !newOwner)) {
      throw new Error("Invalid input parameters.");
    }

    // Check if the caller has the "admin" role
    const clientID = ctx.clientIdentity;
    if (!clientID.assertAttributeValue("role", "admin")) {
      throw new Error('Only users with the "admin" role can update assets.');
    }

    // Retrieve the asset from the ledger
    const assetJSON = await ctx.stub.getState(assetID);
    if (!assetJSON || assetJSON.length === 0) {
      throw new Error(`The asset ${assetID} does not exist.`);
    }

    // Parse the asset and update its value and/or owner
    const asset = JSON.parse(assetJSON.toString());
    if (newValue) {
      asset.value = parseInt(newValue); // Convert newValue to integer
    }
    if (newOwner) {
      asset.owner = newOwner;
    }

    // Save the updated asset to the ledger
    await ctx.stub.putState(assetID, Buffer.from(JSON.stringify(asset)));
    return JSON.stringify(asset);
  }

  // DeleteAsset deletes the asset with the given ID
  async DeleteAsset(ctx, assetID) {
    // Validate input
    if (!assetID) {
      throw new Error("Asset ID is required.");
    }

    // Check if the caller has the "admin" role
    const clientID = ctx.clientIdentity;
    if (!clientID.assertAttributeValue("role", "admin")) {
      throw new Error('Only users with the "admin" role can delete assets.');
    }

    // Check if the asset exists
    const exists = await this.AssetExists(ctx, assetID);
    if (!exists) {
      throw new Error(`The asset ${assetID} does not exist.`);
    }

    // Delete the asset from the ledger
    await ctx.stub.deleteState(assetID);
    return JSON.stringify({ message: `Asset ${assetID} deleted successfully` }); // Return JSON
  }

  // GetAllAssets returns all assets in the ledger (only for Auditors)
  async GetAllAssets(ctx) {
    // Check if the caller has the "Auditor" role
    const clientID = ctx.clientIdentity;
    if (!clientID.assertAttributeValue("role", "auditor")) {
      throw new Error(
        'Only users with the "Auditor" role can view all assets.'
      );
    }

    // Use a range query to retrieve all assets
    const iterator = await ctx.stub.getStateByRange("", "");
    const allResults = [];
    while (true) {
      const res = await iterator.next();
      if (res.value && res.value.value.toString()) {
        const asset = JSON.parse(res.value.value.toString("utf8"));
        allResults.push(asset);
      }
      if (res.done) {
        await iterator.close();
        return JSON.stringify(allResults);
      }
    }
  }

  // AssetExists checks if an asset with the given ID exists
  async AssetExists(ctx, assetID) {
    const assetJSON = await ctx.stub.getState(assetID);
    return assetJSON && assetJSON.length > 0;
  }
}

module.exports = AssetTransfer;
