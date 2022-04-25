const functions = require("firebase-functions");
const axios = require("axios").default;

const regionFunction = functions.region("europe-west1");

exports.checkCrypto = regionFunction.pubsub
  .schedule("every 1000 minutes")
  .onRun(async (context) => {
    const contractAddress = "0x0e9d6552b85BE180d941f1cA73Ae3E318D2D4F1F";
    const {
      data: {
        data: { floorPrice },
      },
    } = await axios.get(
      `https://api.looksrare.org/api/v1/collections/stats?address=${contractAddress}`
    );

    const floorPriceInEth = floorPrice / 100000000000000000;

    return console.log(floorPriceInEth);
  });
