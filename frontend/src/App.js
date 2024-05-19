document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
  
    function sendToClipboard() {
      const text = document.getElementById('clipboardText').value;
      fetch('/api/clipboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })
        .then((response) => response.json())
        .then((data) => {
          const resultDiv = document.getElementById('result');
          resultDiv.innerHTML = `
            <p>Retrieve ID: ${data.id}</p>
            <p>Shareable URL: <a href="${data.url}" target="_blank">${data.url}</a></p>
            <p>QR Code:</p>
            <img src="${data.qrCodeUrl}" alt="QR Code" class="qr-code"/>
          `;
        });
    }
  
    socket.on('clipboard', (text) => {
      document.getElementById('clipboardText').value = text;
    });
  
    document.getElementById('sendButton').addEventListener('click', sendToClipboard);
  });
  