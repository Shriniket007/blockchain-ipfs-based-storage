export const API_URL = "https://volta-rpc.energyweb.org/";

// metamask wallet private key
export const PRIVATE_KEY =
  "3f6cd404be33ecb66e69b274b015fa6d38909e881cc2124bb7bc8710d9ea6e1d";
export const contractAddress = "0xe7273D9Cff0Cb5722eEF0a6EccfC886AB826CF2E";

// be project
// export const contractAddress = "0xc3cb0b67dd1e78acbf05510cb7abc61240de9fcb";
export const Web3StorageAPI =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDI4MzQ0ODk4NzhFMTVGRDM0MDM5M0MxNjNBMzMzNjViQjJkMUZjQzYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTU1NTQ4NjQyMjMsIm5hbWUiOiJpcGZzLWJsb2NrY2hhaW4ifQ.Lc4IfriqerBZi4eARYakbBJttTQ5NOZZ2-8cFIqY9rY";

// Contract Application Binary Interface (ABI)
export const contractAbi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "fileName",
        type: "string",
      },
      {
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
    ],
    name: "upload",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "fileName",
        type: "string",
      },
    ],
    name: "getIPFSHash",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "fileName",
        type: "string",
      },
    ],
    name: "isFileStored",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

// new contract adress
// 0xe7273D9Cff0Cb5722eEF0a6EccfC886AB826CF2E
// https://volta-explorer.energyweb.org/address/0xe7273D9Cff0Cb5722eEF0a6EccfC886AB826CF2E/

// https://bafybeid2vny27skfulpv63j5uuoul3ouk7swtvrrzpvoskapb2rkalxu6m.ipfs.w3s.link/uploads

// https://ipfs.io/ipfs/<CID>
// Content Identifier (CID)
// IPFS currently uses SHA-256 by default, which produces a 256 bit (32 byte) output, and that output is encoded with Base58. Base58 is a binary-to-text encoding scheme originally developed for Bitcoin and has the advantage that letters that might be mistaken for each other in certain fonts (like zero and the capital letter O) are not included.
