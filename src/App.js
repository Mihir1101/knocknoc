

import React from "react";
import { useState, useEffect } from "react";
import lighthouse from '@lighthouse-web3/sdk';
import "./App.css";

function App() {
  
  const progressCallback = (progressData) => {
    let percentageDone =
    100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };
  const [files, setfiles] = useState([]);
  var allFiles = [];
  
  const uploadFile = async(file) =>{
    const output = await lighthouse.upload(file, process.env.YOUR_LIGHTHOUSE_API_KEY, false, null, progressCallback);
    console.log('File Status:', output);
    console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
    allFiles.push(output.data);
    localStorage.setItem('files', JSON.stringify(allFiles));
    setfiles(JSON.parse(localStorage.getItem('files')));
  }
  
  
  return (
    // <Widgetsrc = "https://near.org/near/widget/ComponentDetailsPage?src=shelby1508.near/widget/Onboarding.Starter"></Widgetsrc>

    /* Login with BOS IDE vs code extension after making your near wallet to run the frontend decentralized */


    <div className="App">
      <header className="App-header">
        <h1 className="app-title">KnocKnoc</h1>
        <div className="input-wrapper">
          <label className="publish-label" htmlFor="file-input">Publish Music</label>
          <input id="file-input" onChange={e => uploadFile(e.target.files)} type="file" acccept = "audio/mp3"  className="file-input" />
        </div>
        <div className="file-list">
          {
            files.map((file, index) => (
              <div className="file-info" key={index}>
               
                <p ><strong>File name:</strong> {file.Name}</p>
                <p ><strong>File Hash :</strong> {file.Hash}</p>
               
                <div className="link">
                <p><a href = {"https://gateway.lighthouse.storage/ipfs/" + file.Hash }>Download File</a></p>
                </div>


              </div>
            ))
          }
        </div>
       
      </header>
    </div>
  );
}

export default App;