import React, { useState } from 'react';

const ClipboardForm = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);

  const sendToClipboard = async () => {
    const response = await fetch('/api/clipboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div className="container">
      <h1>Online Clipboard</h1>
      <textarea
        id="clipboardText"
        placeholder="Type or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button onClick={sendToClipboard}>Send to Online Clipboard</button>
      {result && (
        <div id="result">
          <p>Retrieve ID: {result.id}</p>
          <p>
            Shareable URL: <a href={result.url} target="_blank">{result.url}</a>
          </p>
          <p>QR Code:</p>
          <img src={result.qrCodeUrl} alt="QR Code" className="qr-code" />
        </div>
      )}
    </div>
  );
};

export default ClipboardForm;
