import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState, useEffect } from 'react';


const Home = () => {
  const [userInput, setUserInput] = useState('');
  const aboutUserTextChange = (event) => {
    setUserInput(event.target.value);
  };

  const [userInput1, setUserInput1] = useState('');
  const startUserTextChange = (event) => {
    setUserInput1(event.target.value);
  };



  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [cooldown, setCooldown] = useState(false)

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + " minutes and "  + seconds + " seconds";
  }

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling API...")
    
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput,userInput1 }),
    })
const data = await response.json()
console.log("data:"+JSON.stringify(data))
    const { output } = data;
    if(output.text){
    console.log("API replied...", output.text)
    
    setApiOutput(`${userInput1}${output.text}`);

    }
    setIsGenerating(false);
  }
  
  return (
    <div className="root">
      <Head>
        <title>The Roaster</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>The Roaster</h1>
          </div>
          <div className="header-subtitle">
            <h2>Get Roasted By AI</h2>
          </div>
       
        </div>

        <div className="prompt-container">
        <p className='prompt-label'>Paste Your Bio Here</p>
          <textarea rows="1" placeholder="Hey I'm Joe and I love to play minecraft" className="prompt-box" value={userInput} onChange={aboutUserTextChange}/>
        </div>

        <div className="prompt-buttons">
        <a
    className={isGenerating ? 'generate-button loading' : 'generate-button'}
    onClick={callGenerateEndpoint}
  >
    <div className="generate">
    {isGenerating ? <span class="loader"></span> : <p id="generate">Generate</p>}
    </div>
  </a>
  </div>
  {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Output</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
  </div>
)}
      </div>
      <div className="badge-container grow">
        <a
          href="https://dhyan99.is-a.dev"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <p>Developed By Dhyan99</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
