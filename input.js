function addInput() {
    const dynamicInputs = document.getElementById('dynamicInputs');
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.placeholder = 'Enter letter content';
    dynamicInputs.appendChild(newInput);
}

function generateAndCopyUrl() {
    const valentineMessage = document.getElementById('valentineMessage').value;
    const envelopeMessage = document.getElementById('envelopeMessage').value;
    const letterInputs = document.querySelectorAll('#dynamicInputs input');

    // Convert input values to letter format
    const letters = Array.from(letterInputs).map(input =>
        `<p>${input.value}</p>`
    ).filter(text => text.trim() !== '<p></p>'); // Remove empty inputs

    const url = new URL('index.html', window.location.origin);
    url.searchParams.set('valentineMessage', valentineMessage);
    url.searchParams.set('envelopeMessage', envelopeMessage);
    url.searchParams.set('letters', JSON.stringify(letters));

    // Copy URL to clipboard
    navigator.clipboard.writeText(url.toString()).then(() => {
        const copyButton = document.getElementById('copy-button');
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
            copyButton.textContent = 'Copy Link';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

function submitMessages() {
    const valentineMessage = document.getElementById('valentineMessage').value;
    const envelopeMessage = document.getElementById('envelopeMessage').value;
    const letterInputs = document.querySelectorAll('#dynamicInputs input');

    // Convert input values to letter format
    const letters = Array.from(letterInputs).map(input =>
        `<p>${input.value}</p>`
    ).filter(text => text.trim() !== '<p></p>'); // Remove empty inputs

    const url = new URL('/Valentine-Client/index.html', window.location.origin);
    url.searchParams.set('valentineMessage', valentineMessage);
    url.searchParams.set('envelopeMessage', envelopeMessage);
    url.searchParams.set('letters', JSON.stringify(letters));

    window.location.href = url.toString();
}
