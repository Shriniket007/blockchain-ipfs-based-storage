import { Web3Storage, getFilesFromPath } from "web3.storage";
const { ethers } = require("ethers");
import * as Constants from "../constant";
import formidable from "formidable";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // disable built-in body parser
  },
};

function moveFiletoServer(req) {
  return new Promise((resolve, reject) => {
    const options = {};
    options.uploadDir = path.join(process.cwd(), "/pages/uploads");
    options.filename = (name, ext, path, form) => {
      return path.originalFilename;
    };
    const form = formidable(options);

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error(err);
        reject("Something went wrong");
        return;
      }
      const uniqueFileName = fields.filename;
      const actualFileName = files.file.originalFilename;

      resolve({ uniqueFileName, actualFileName });
    });
  });
}

async function storeDataInBlockchain(actualFileName, uniqueFileName) {
  const provider = new ethers.providers.JsonRpcProvider(Constants.API_URL);
  const signer = new ethers.Wallet(Constants.PRIVATE_KEY, provider);
  const StorageContract = new ethers.Contract(
    Constants.contractAddress,
    Constants.contractAbi,
    signer
  );

  const isStored = await StorageContract.isFileStored(uniqueFileName);

  console.log(isStored);

  if (isStored == false) {
    const token = Constants.Web3StorageAPI;
    const storage = new Web3Storage({ token: token });
    const uploadPath = path.join(process.cwd(), "/pages/uploads");
    const files = await getFilesFromPath(uploadPath, `/${actualFileName}`);
    const cid = await storage.put(files);
    let hash = cid.toString();
    console.log("Storing the data in IPFS");

    // creation of transaction
    const tx = await StorageContract.upload(uniqueFileName, hash);
    await tx.wait();
    const storedhash = await StorageContract.getIPFSHash(uniqueFileName);
    return {
      message: `IPFS hash is stored in the smart contract: ${storedhash}`,
      Hash: storedhash,
    };
  } else {
    console.log("Data is already stored for this file name");
    const IPFShash = await StorageContract.getIPFSHash(uniqueFileName);
    return {
      message: `IPFS hash is already stored in the smart contract: ${IPFShash}`,
      Hash: IPFShash,
    };
  }
}
// we are moving files from local pc to this server directoy
// we are going to store file in IPFS
// we are going to store IPFS hash in blockchain
async function handler(req, res) {
  try {
    const { uniqueFileName, actualFileName } = await moveFiletoServer(req);
    console.log("Files are stored in local server");

    await new Promise((resolve) => setTimeout(resolve, 2000)); //waiting for 2 seconds

    const resposne = await storeDataInBlockchain(
      actualFileName,
      uniqueFileName
    );
    console.log("Hash stored in smart contract");

    return res.status(200).json(resposne);
  } catch (err) {
    console.error(err);
  }
}

export default handler;

// // https://bafybeid2vny27skfulpv63j5uuoul3ouk7swtvrrzpvoskapb2rkalxu6m.ipfs.w3s.link/uploads

// // https://ipfs.io/ipfs/<CID>

// pages/api/uploadData.js
// import { Web3Storage } from "web3.storage";
// import { ethers } from "ethers";
// import * as Constants from "../constant";

// export const config = {
//   api: {
//     bodyParser: false, // disable built-in body parser
//   },
// };

// async function storeDataInIPFSAndBlockchain(req) {
//   try {
//     const { file, filename } = req.body;

//     // Initialize Web3.Storage
//     const storage = new Web3Storage({ token: Constants.Web3StorageAPI });

//     // Upload the file to IPFS
//     const cid = await storage.put([file]); // Wrap the file in an array

//     const hash = cid.toString();
//     console.log("File stored in IPFS with CID:", hash);

//     // Initialize Ethereum provider and contract
//     const provider = new ethers.providers.JsonRpcProvider(Constants.API_URL);
//     const signer = new ethers.Wallet(Constants.PRIVATE_KEY, provider);
//     const StorageContract = new ethers.Contract(
//       Constants.contractAddress,
//       Constants.contractAbi,
//       signer
//     );

//     // Check if the file is already stored in the blockchain
//     const isStored = await StorageContract.isFileStored(filename);

//     if (!isStored) {
//       // Store the IPFS hash in the smart contract
//       const tx = await StorageContract.upload(filename, hash);
//       await tx.wait();
//       console.log("Hash stored in the smart contract for filename:", filename);
//     } else {
//       console.log("Data is already stored for this filename:", filename);
//     }

//     return {
//       message: `IPFS hash is stored in the smart contract: ${hash}`,
//       Hash: hash,
//     };
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// }

// async function handler(req, res) {
//   try {
//     const response = await storeDataInIPFSAndBlockchain(req);
//     return res.status(200).json(response);
//   } catch (err) {
//     return res.status(500).json({ error: "An error occurred" });
//   }
// }

// export default handler;
