const basePath = process.cwd();
const fs = require("fs");
const buildDir = `${basePath}/build`;
const imageDir = `${buildDir}/images`;
const Bottleneck = require("bottleneck");
const pinataSDK = require('@pinata/sdk');
const { PINATA_API } = require("../constants/secrets");
const { namePrefix } = require("../src/config");
const { exit } = require("process");
const pinata = new pinataSDK({ pinataApiKey: PINATA_API.key, pinataSecretApiKey: PINATA_API.secret });

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 2000,
});

// loop through all images in the build/images directory
// get a readable stream of the image
// and pin the file to IPFS using the pinata SDK
const files = fs.readdirSync(imageDir);

for (const file of files) {
  const readableStreamForFile = fs.createReadStream(`${imageDir}/${file}`);
  // pin the file to IPFS and retry when rate limited
  limiter.schedule(() => pinata.pinFileToIPFS(readableStreamForFile, {
    pinataMetadata: {
      name: `${namePrefix}_${file}`,
    }
  }).then((response) => {
    console.log("Pinning response", response);
    result = response;
    console.log("IpfsHash", result.IpfsHash);
    // update the _metadata.json file with the new IPFS hash by replacing ipfs:///70.png with the new url from pinata
    const rawdata = fs.readFileSync(`${buildDir}/json/_metadata.json`);
    const replaceText = `/${file}`;
    const replacedData = rawdata.toString().replaceAll(replaceText, result.IpfsHash);
    fs.writeFileSync(`${buildDir}/json/_metadata.json`, replacedData);
    console.log("Updated metadata file with new IPFS hash for file", file);
  }).catch((err) => {
    throw err;
  }));

  console.log("Pinning file", file);
}
