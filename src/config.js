const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "hatchable";
const description = "A tribute and thank you to all of the early CNFT supporters!";
const baseUri = "ipfs://";

const solanaMetadata = {
  symbol: "PET",
  seller_fee_basis_points: 1500, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://hatchable.me",
  creators: [
    {
      address: "addr_test1qr08vt287e6asm3apgez74asht9nz6d98ds9zef63cx3x4lr5dhtzzsetyy27fj5p8fk2a99jr87rnd09uve8778dzhsswvfme",
      share: 100,
    },
  ],
};

// If you have selected Solana then the collection starts from 0 automatically from layers folder
const layerConfigurations = [
  {
    growEditionSizeTo: 200,
    layersOrder: [
      { name: "background" },
      { name: "egg" },
      { name: "mood" },
      { name: "tier" },
      { name: "type" },
    ],
  },
];

const shuffleLayerConfigurations = false;

const debugLogs = false;

const format = {
  width: 512,
  height: 512,
  smoothing: false,
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 200,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: false,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const extraMetadata = {
  website: "https://hatchable.me",
};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
};
