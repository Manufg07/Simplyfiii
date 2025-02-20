#admin

export FABRIC_CFG_PATH=${PWD}/peercfg
export CORE_PEER_LOCALMSPID=Org1MSP
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.simplyfi.com/peers/peer0.org1.simplyfi.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.simplyfi.com/users/Admin@org1.simplyfi.com/msp
export CORE_PEER_ADDRESS=localhost:7051
export ORG1_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/org1.simplyfi.com/peers/peer0.org1.simplyfi.com/tls/ca.crt
export ORG2_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/org2.simplyfi.com/peers/peer0.org2.simplyfi.com/tls/ca.crt

peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.simplyfi.com --tls --cafile "${PWD}/organizations/ordererOrganizations/simplyfi.com/orderers/orderer.simplyfi.com/msp/tlscacerts/tlsca.simplyfi.com-cert.pem" -C simplyfichannel -n SimplyFi-Task --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org1.simplyfi.com/peers/peer0.org1.simplyfi.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org2.simplyfi.com/peers/peer0.org2.simplyfi.com/tls/ca.crt" -c '{"function":"CreateAsset","Args":["Asset-1","user1","100"]}'


#User1

export FABRIC_CFG_PATH=${PWD}/peercfg
export CORE_PEER_LOCALMSPID=Org1MSP
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.simplyfi.com/peers/peer0.org1.simplyfi.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.simplyfi.com/users/User1@org1.simplyfi.com/msp
export CORE_PEER_ADDRESS=localhost:7051
export ORG1_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/org1.simplyfi.com/peers/peer0.org1.simplyfi.com/tls/ca.crt
export ORG2_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/org2.simplyfi.com/peers/peer0.org2.simplyfi.com/tls/ca.crt

peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.simplyfi.com --tls --cafile "${PWD}/organizations/ordererOrganizations/simplyfi.com/orderers/orderer.simplyfi.com/msp/tlscacerts/tlsca.simplyfi.com-cert.pem" -C simplyfichannel -n SimplyFi-Task --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org1.simplyfi.com/peers/peer0.org1.simplyfi.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org2.simplyfi.com/peers/peer0.org2.simplyfi.com/tls/ca.crt" -c '{"function":"ReadAsset","Args":["Asset-1"]}'

#Auditor
export FABRIC_CFG_PATH=${PWD}/peercfg
export CORE_PEER_LOCALMSPID=Org1MSP
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.simplyfi.com/peers/peer0.org1.simplyfi.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.simplyfi.com/users/Auditor@org1.simplyfi.com/msp
export CORE_PEER_ADDRESS=localhost:7051
export ORG1_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/org1.simplyfi.com/peers/peer0.org1.simplyfi.com/tls/ca.crt
export ORG2_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/org2.simplyfi.com/peers/peer0.org2.simplyfi.com/tls/ca.crt

peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.simplyfi.com --tls --cafile "${PWD}/organizations/ordererOrganizations/simplyfi.com/orderers/orderer.simplyfi.com/msp/tlscacerts/tlsca.simplyfi.com-cert.pem" -C simplyfichannel -n SimplyFi-Task --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org1.simplyfi.com/peers/peer0.org1.simplyfi.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org2.simplyfi.com/peers/peer0.org2.simplyfi.com/tls/ca.crt" -c '{"function":"GetAllAssets","Args":[]}'