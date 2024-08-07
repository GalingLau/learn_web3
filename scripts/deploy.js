const {ethers,run, network} = require("hardhat")

async function main(){
    const SimpleStorageFactor  = await ethers.getContractFactory(
        "SimpleStorage"
    )
    const simpleStorage = await SimpleStorageFactor.deploy()
    await simpleStorage.waitForDeployment()
    console.log(`contract.address:${simpleStorage.target}`)
    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY){
        await simpleStorage.deploymentTransaction().wait(6)
        await verify(contractAddress, [])
    }
    const currentValue = await simpleStorage.retrieve()
    console.log(`Current value is:${currentValue}`)
    const transactionResponse = await simpleStorage.store(7);
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated Value is ${updatedValue}`)
}

async function verify(contractAddress,args){
    console.log("verifying contract...")
    try {
        await run("verify:verify",{
            address:contractAddress,
            constructorArguments:args,
        
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        }else{
            console.log(e)
        }
    }
    await run("verify")
}
main()