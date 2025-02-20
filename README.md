# Gold Flow - Web3 Gold Mining Investment Platform

Gold Flow is an innovative Web3 investment platform that combines physical gold mining with blockchain technology. Through smart contracts and NFTs, users can participate in gold mining investments and earn returns.

![image](https://github.com/user-attachments/assets/11cab435-20c1-420d-beb7-a7c0abd8670a)


## Project Architecture

The project consists of two main parts:

### 1. Blockchain Smart Contracts (`/chain`)
- NFT Minting Contract (NFTMinter.sol)
- Staking Contract (NFTStaking.sol)
- Fund Management Contract (Vault.sol)

### 2. Frontend Application (`/my-app`)
- React Application
- Material-UI Interface
- Web3 Integration


https://github.com/user-attachments/assets/313df343-cc8e-4a10-9e32-4c0ae764b54f


## Technology Stack

### Blockchain
- Solidity ^0.8.28
- Hardhat Framework
- OpenZeppelin Contracts
- Ethers.js
- Hardhat Ignition (Deployment Tool)

### Frontend
- React 19.0.0
- Material-UI v6
- Ethers.js 6.13.5
- React Router v7
- Web3 Wallet Integration

## Detailed Deployment Guide

### I. Blockchain Deployment

1. **Environment Setup**
```bash
cd chain
npm install
```

2. **Configure Environment Variables**
Create `.env` file:
```plaintext
PRIVATE_KEY=Your wallet private key
SEPOLIA_RPC_URL=Sepolia testnet RPC URL
ETHERSCAN_API_KEY=Etherscan API key
REPORT_GAS=true
```

3. **Compile Contracts**
```bash
npx hardhat compile
```

4. **Run Tests**
```bash
npx hardhat test
npx hardhat coverage
```

5. **Deploy Contracts**
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

6. **Verify Contracts** (Optional)
```bash
npx hardhat verify --network sepolia <contract_address> <constructor_arguments>
```

### II. Frontend Deployment

1. **Environment Setup**
```bash
cd my-app
npm install
```

2. **Configure Environment Variables**
Create `.env` file:
```plaintext
REACT_APP_NFT_CONTRACT=NFT contract address
REACT_APP_STAKING_CONTRACT=Staking contract address
REACT_APP_VAULT_CONTRACT=Vault contract address
REACT_APP_CHAIN_ID=11155111
```

3. **Run Development Server**
```bash
npm start
```

4. **Build for Production**
```bash
npm run build
```

## Contract Architecture

### NFTMinter Contract
- Handles NFT minting and trading
- Integrates with ERC20 token for payments
- Includes minting price configuration

### NFTStaking Contract
- Manages NFT staking logic
- Handles reward distribution
- Implements unlock time mechanism

### Vault Contract
- Manages platform funds
- Handles yield distribution
- Implements multi-signature mechanism

## Frontend Modules

### 1. Home Page (HomePage)
- Platform introduction
- Real-time data display
- Gold price tracking

### 2. Trading Page (TradePage)
- NFT purchase interface
- Transaction history
- Wallet connection status

### 3. Rewards Page (RewardPage)
- Staking rewards display
- Claim rewards functionality
- Earnings history

### 4. Admin Page (AdminPage)
- Administrator functions
- Reward distribution settings
- System parameter configuration

## Development Guide

### Smart Contract Development
1. Contract Modifications
```bash
cd chain
# Modify contract code
npx hardhat compile
npx hardhat test
```

2. Local Test Network
```bash
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

### Frontend Development
1. Component Development
```bash
cd my-app
# Modify React components
npm start
```

2. Contract Interaction
```javascript
// Using ethers.js for contract interaction
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(address, abi, signer);
```

## Test Network Configuration

### Sepolia Testnet
- Network ID: 11155111
- RPC URL: https://sepolia.infura.io/v3/YOUR-PROJECT-ID
- Block Explorer: https://sepolia.etherscan.io

## Security Considerations

1. **Contract Security**
- Using OpenZeppelin secure contracts
- Emergency pause mechanism
- Multi-signature mechanism
- Limit management

2. **Frontend Security**
- Web3 wallet security checks
- Transaction signature verification
- Data encryption in transit

## Maintenance Guide

### Contract Upgrades
1. Deploy new version contracts
2. Update proxy contract addresses
3. Migrate existing data

### Frontend Updates
1. Test new features
2. Build production version
3. Deploy updates

## Troubleshooting

### Common Issues
1. MetaMask connection issues
2. Transaction failure handling
3. Gas fee estimation

### Debug Tools
- Hardhat Console
- React DevTools
- Etherscan Contract Verification

## Project Roadmap

### Current Version (v1.0.0)
- Basic NFT minting functionality
- Simple staking mechanism
- Basic reward distribution

### Future Plans
- Multi-chain support
- DAO governance
- Advanced data analytics
- Mobile optimization

## Contribution Guidelines

1. Fork the project
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Submit Pull Request

## License

ISC License

## Contact Information

- Project Maintainer: Team GOLDFLOW
- Email: wwwwendell638@gmail.com


## Changelog

### v1.0.0 (2024-03-xx)
- Initial release
- Basic functionality implementation
- Testnet deployment complete

## Acknowledgments

Thanks to all developers and community members who contributed to this project.

---

**Note**: Before using this project, please ensure you have thoroughly read all documentation and security recommendations. If you have any questions, please contact the project maintainers.
