# 🚀 Hyperledger Fabric Asset Management System with ABAC

This project is a **Hyperledger Fabric-based asset management system** that enforces **Attribute-Based Access Control (ABAC)**. It allows users with different roles (`admin`, `user`, `auditor`) to interact with assets on the blockchain securely.

---

## 📌 Features
- **Admins** can create, update, and delete assets.
- **Users** can view only their own assets.
- **Auditors** can query and view all assets.
- Implements **ABAC (Attribute-Based Access Control)** using user identity certificates.
- Fully integrated **frontend UI** for user interactions.

---

## 🔐 ABAC Implementation
The system uses **Attribute-Based Access Control (ABAC)** to enforce role-based permissions. Each user's role is embedded in their **X.509 certificate**, and the chaincode validates access based on these attributes.

---

## 🚀 Fabric Client SDK & Wallet (Client Application)
The **Fabric Client SDK (`fabric-network`)** allows applications to interact with the Hyperledger Fabric network by:
- Submitting transactions
- Querying the blockchain
- Managing user identities securely  

The **Wallet API** is used for **identity and credential management**. It enables **role-based access control** by storing user certificates and private keys, ensuring secure access to the blockchain.

---

## ⚡ Tech Stack
- **Backend:** Node.js + Express
- **Blockchain:** Hyperledger Fabric (Fabric v2.x)
- **Smart Contract:** Chaincode (Fabric Contract API)
- **Wallet & Identity Management:** Fabric CA (Certificate Authority)
- **Frontend:** React.js (Vite)

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
cd Simplyfiii
```
---

### **3️⃣ Set Up Hyperledger Fabric Network**
```bash
cd SimplyFi
./startSimplyfiNetwork1.sh
```

### **4️⃣ Configure Client**
```bash
cd ../server
npm install
cd ../routes
node setupWallet.js
```
### **5️⃣ Start the REST API Server**
```bash
cd server
npm install
node app.js
```

### **6️⃣ Start Frontend**
```bash
cd ui
npm install
node npm run dev
```
## 🐛 Troubleshooting

### **🛑 Network Issues**
```bash
```
# Check running Docker containers
docker ps -a
```
# Restart the Hyperledger Fabric network
./stopSimplyfiNetwork.sh && ./startSimplyfiNetwork1.sh
```

### **🔑 Identity Issues**
```bash
```
# Reimport user identities
cd server
cd routes
node setupWallet.js

# Check registered CA identities
fabric-ca-client identity list --tls.certfiles organizations/fabric-ca/organization1/ca-cert.pem
```

---

## 📜 License

This project is licensed under the **Apache License 2.0** - see the [LICENSE](LICENSE.md) file for details.

---

## 🤝 Contributing

We welcome contributions! Follow these steps to contribute:
1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/new-feature`)
3. **Commit your changes** (`git commit -m 'Add new feature'`)
4. **Push to the branch** (`git push origin feature/new-feature`)
5. **Open a Pull Request**

---

## ✨ Acknowledgments

- Hyperledger Fabric Community
- Node.js Developers
- Docker Community
