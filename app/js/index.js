var serial = 0

$(document).ready(function () {
    var accounts = web3.eth.accounts;
    //Connects frontend to network running on whatever
    EggContract.detectNetwork();
    $("#egg-form").submit(function (e) {
        e.preventDefault();
        EggContract.deployed().then(function (instance) {
            var recipient = $("#address").val();
            var metadata = {
                "image": "https://ipfs.io/ipfs/QmW2ndHEWzS4MKogBaEjRxDNeNDqKjxxeqUFJQ6e5Jpmhr?filename=egg.png", 
                "found": Date.now(),
                "serial": serial
            }
            EggContract.awardItem(recipient, metadata);
            serial++;
        });
    });

});