import Web3 from "web3";
import eggArtifact from "../../../build/contracts/EggContract.json";
import fleek from '@fleekhq/fleek-storage-js';

const App = {
    web3: null,
    account: null,
    eggContract: null,

    start: async function () {
        const { web3 } = this;

        try {
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = eggArtifact.networks[networkId];
            this.eggContract = new web3.eth.Contract(
                eggArtifact.abi,
                deployedNetwork.address,
            );
            const accounts = await web3.eth.getAccounts();
            this.account = accounts[0];
        } catch (error) {
            console.error("Could not connect to contract / ethereum network.", error);
        }
    },

    storeMetadata: async function (address, egg, serial) {
        var metadata = {
            "egg": egg,
            "serial": serial,
            "timestamp": new Date().toISOString()
        };

        //if (address.length != 42){
            //this.messageDisplay('Please enter a valid Ethereum address.');
            //return;
        //}

        const uploadMetadata = {
            apiKey: 'QDl6v8IgClEY6YogKvHohA==',
            apiSecret: '7Hz2zrHIxQ9FkzMe3CZgKUuMJwGgvoQnmVcROpSCrPw=',
            key: `metadata/${metadata.timestamp}.json`,
            data: JSON.stringify(metadata),
        };

        this.messageDisplay("Catching egg... It's a fiesty one!");
        const result = await fleek.upload(uploadMetadata);
        await this.awardItem(address, result.publicUrl);
    },

    awardItem: async function (address, metadataURL) {
        const { awardItem } = this.eggContract.methods;

        let id = await this.eggContract.methods.awardItem(address, metadataURL).send({ from: this.account });

        this.messageDisplay(`Egg caught! View the metadata <a href="${metadataURL}" target="_blank">here</a>.`);
        this.refreshBalance()
    },

    messageDisplay: function (message) {
        $('#message').html(message);
    }
};

window.App = App;

$(document).ready(function () {
    if (window.ethereum) {
        App.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
    } else {
        // remove this fallback when deploying
        console.warn("No web3 detected. Falling back to http://127.0.0.1:8545.");
        App.web3 = new Web3(
            new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
        );
    }

    window.App.start();

    $("#egg-form").submit(function (e) {
        // Prevent page refresh - good cuz we want egg finding popup to stay up until egg is found
        e.preventDefault();
        const address = $("#address").val();
        const egg = 'https://ipfs.io/ipfs/QmW2ndHEWzS4MKogBaEjRxDNeNDqKjxxeqUFJQ6e5Jpmhr?filename=egg.png'
        const serial = 0

        window.App.storeMetadata(address, egg, serial);
    });
});