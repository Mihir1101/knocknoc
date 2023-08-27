import React from "react";
import { useState, useEffect } from "react";
import lighthouse from '@lighthouse-web3/sdk';

function App() {
  
  const progressCallback = (progressData) => {
    let percentageDone =
    100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };
  const [files, setfiles] = useState([]);
  var allFiles = [];
  
  const uploadFile = async(file) =>{
    const output = await lighthouse.upload(file, '8976353a.fca13ed3f5e94bfda9383dcd3e51aa9b', false, null, progressCallback);
    console.log('File Status:', output);
    console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
    allFiles.push(output.data);
    localStorage.setItem('files', JSON.stringify(allFiles));
    setfiles(JSON.parse(localStorage.getItem('files')));
  }
  
  return (
    <div className="App">
      <input onChange={e=>uploadFile(e.target.files)} type="file" />
      {
        files.map((file, index) => {
          return (
            <div key={index}>
              <p>File name : {file.Name}</p>
              <p>File hash : {file.Hash}</p>
            </div>
          )
        })
      } 
      <h1>Upload File</h1>
      
    </div>
  );
}

export default App;