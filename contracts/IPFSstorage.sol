// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IPFSstorage {
    struct File {
        string fileName;
        string ipfsHash;
    }

    mapping (string => File) private files;
    string[] private fileHashes; // Maintain a list of all stored file hashes

    function upload (string memory fileName, string memory ipfsHash) public {
        require(bytes(files[fileName].ipfsHash).length == 0, "File already exits");
        files[fileName] = File(fileName, ipfsHash);
        fileHashes.push(ipfsHash); // Add the new hash to the list
    }

    function getIPFSHash (string memory fileName) public view returns (string memory) {
        require(bytes(files[fileName].ipfsHash).length > 0, "File not found");
        return files[fileName].ipfsHash;
    }

    function isFileStored (string memory fileName) public view returns (bool) {
        return bytes(files[fileName].ipfsHash).length > 0;
    }

    function getAllFileHashes() public view returns (string[] memory) {
        return fileHashes;
    }
}
