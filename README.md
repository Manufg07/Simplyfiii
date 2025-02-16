# 🚀 Hyperledger Fabric Asset Management System with ABAC

This project is a **Hyperledger Fabric-based asset management system** that enforces **Attribute-Based Access Control (ABAC)**. It allows users with different roles (`admin`, `user`, `auditor`) to interact with assets on the blockchain securely.

---

## 📌 Features
- **Admins** can create, update, and delete assets.
- **Users** can view only their own assets.
- **Auditors** can query and view all assets.
- Implements **ABAC (Attribute-Based Access Control)** using user identity certificates.

---
## 🔐 ABAC Implementation
The system uses **Attribute-Based Access Control (ABAC)** to enforce role-based permissions. Each user's role is embedded in their X.509 certificate, and the chaincode validates access based on these attributes.

---

## 🚀 Fabric Client SDK & Wallet (Client Application)
The Fabric Client SDK (fabric-network) allows applications to interact with Hyperledger Fabric networks by:

Submitting transactions
Querying the blockchain
Managing user identities securely
The Wallet API is used to store user identities and credentials securely. It enables role-based access control by managing certificates and private keys.

---

## ⚡ Tech Stack
- **Backend:** Node.js + Express
- **Blockchain:** Hyperledger Fabric (Fabric v2.x)
- **Smart Contract:** Chaincode (Fabric Contract API)
- **Wallet & Identity Management:** Fabric CA (Certificate Authority)

---

## 🛠️ Setup Instructions

### **1️⃣ Prerequisites**
Before running this project, ensure you have the following installed:
- **Node.js** (v14+ recommended)
- **Docker & Docker Compose**
- **Hyperledger Fabric binaries and samples** (`fabric-samples`)
- **Fabric CA client** (for identity management)

---

### **2️⃣ Clone the Repository**
```bash
git clone https://github.com/Manufg07/Simplyfiii.git

