const hre = require('hardhat')

async function main() {
    const contractFactory = await hre.ethers.getContractFactory('Voting');
    const Voting = await contractFactory.deploy();
    console.log(`Deployed at address ${await Voting.getAddress()}`);    
}

main().then(()=>process.exit(0))
    .catch((e)=>{
        console.log(e);
        process.exit(1);
    })