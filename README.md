# egghunt

## contract Address
`0xCA025341c9919815C77F633FB9Bf1A9909473BA0`
## send token manually

`truffle console --network rinkeby`
`let contractInstance = await EggContract.deployed()`
`let result = await contractInstance.awardItem("YOUR_ETH_ADDRESS_HERE", "https://ipfs.io/ipfs/QmW2ndHEWzS4MKogBaEjRxDNeNDqKjxxeqUFJQ6e5Jpmhr?filename=egg.png")`
