import React, { useState, useEffect } from "react";
import styles from "./page.module.css";

function App() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState("");
  const [hash, setHash] = useState("");

  useEffect(() => {}, []);

  const handleChange = (e) => {
    if (e.target.name === "filename") {
      setFileName(e.target.value);
    }
    if (e.target.name === "file") {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      var formData = new FormData();
      formData.append("filename", fileName);
      formData.append("file", file);

      const res = await fetch("/api/uploadData", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Network response is not ok");
      }
      const data = await res.json();
      setResult(data.message);
      setHash(data.Hash);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>
          <span>Store IPFS hash on blockchain</span>
        </h1>
      </header>
      <form onSubmit={handleSubmit}>
        <label className={styles.lable}>Enter Unique Filename: </label>
        <input
          type="text"
          name="filename"
          value={fileName}
          onChange={handleChange}
          className={styles.input}
        ></input>
        <br />
        <input
          type="file"
          name="file"
          onChange={handleChange}
          className={styles.input}
        ></input>
        <br />
        <input type="Submit" className={styles.button}></input>
      </form>

      {result && (
        <div>
          {" "}
          <p className={styles.result}>{result}</p>
          {/* <img src={`https://ipfs.io/ipfs/${file.ipfsHash}`} alt="" /> */}
          {/* <img
            src={`https://${hash}.ipfs.w3s.link/uploads/blockchain.png`}
            alt=""
          /> */}
        </div>
      )}
    </div>
  );
}

export default App;

// import React, { useState } from "react";
// import styles from "./page.module.css";

// function App() {
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState("");
//   const [result, setResult] = useState("");
//   const [hash, setHash] = useState("");

//   const handleChange = (e) => {
//     if (e.target.name === "filename") {
//       setFileName(e.target.value);
//     }
//     if (e.target.name === "file") {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       var formData = new FormData();
//       formData.append("filename", fileName);
//       formData.append("file", file);

//       const res = await fetch("/api/uploadData", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) {
//         throw new Error("Network response is not ok");
//       }
//       const data = await res.json();
//       setResult(data.message);
//       setHash(data.Hash);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <header className={styles.header}>
//         <h1>
//           <span>Store IPFS hash on blockchain</span>
//         </h1>
//       </header>
//       <form onSubmit={handleSubmit}>
//         <label className={styles.label}>Enter Unique Filename: </label>
//         <input
//           type="text"
//           name="filename"
//           value={fileName}
//           onChange={handleChange}
//           className={styles.input}
//         ></input>
//         <br />
//         <input
//           type="file"
//           name="file"
//           onChange={handleChange}
//           className={styles.input}
//         ></input>
//         <br />
//         <button type="submit" className={styles.button}>
//           Submit
//         </button>
//       </form>

//       {result && (
//         <div>
//           <p className={styles.result}>{result}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
