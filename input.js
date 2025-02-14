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

    const url = new URL('/Valentine-Client/index.html', window.location.origin);
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

let shortenedUrl = ''; // Variable to store the shortened URL

function shortenUrl() {
    const valentineMessage = document.getElementById('valentineMessage').value;
    const envelopeMessage = document.getElementById('envelopeMessage').value;
    const letterInputs = document.querySelectorAll('#dynamicInputs input');
    const suffix = "happy-valentine"; // Set the suffix

    // Convert input values to letter format
    const letters = Array.from(letterInputs).map(input =>
        `<p>${input.value}</p>`
    ).filter(text => text.trim() !== '<p></p>'); // Remove empty inputs

    const url = new URL('/Valentine-Client/index.html', window.location.origin);
    url.searchParams.set('valentineMessage', valentineMessage);
    url.searchParams.set('envelopeMessage', envelopeMessage);
    url.searchParams.set('letters', JSON.stringify(letters));

    const longUrl = url.toString();

    // Display processing message
    document.getElementById("result").innerHTML = "<i class='fa fa-spinner fa-spin'></i> Processing...";

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var resultObject = JSON.parse(xhr.responseText);
            shortenedUrl = "https://" + resultObject.shortened_url; // Store the shortened URL
            document.getElementById("result").innerHTML = "Your Shortened URL: <a href='" + shortenedUrl + "' target='_blank'>" + resultObject.shortened_url + "</a>";
            document.getElementById("copy-button").style.display = 'inline-block'; // Show copy button
        }
    };

    // Sending request to shorten the URL
    xhr.open("POST", "https://s.squizee.in/short/formResponse?url=" + encodeURIComponent(longUrl) + "&email=&format=json&suffix=" + encodeURIComponent(suffix), true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
}

function copyShortUrl() {
    navigator.clipboard.writeText(shortenedUrl).then(() => {
        const copyButton = document.getElementById('copy-button');
        copyButton.textContent = 'Link Copied!';
        setTimeout(() => {
            copyButton.textContent = 'Salin Link';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

function searchUrl(email, id) {
    var endpoint = 'https://s.squizee.in/fetch/log';
    var url = endpoint + '?email=' + encodeURIComponent(email) + (id ? '&id=' + encodeURIComponent(id) : '');

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var responseData = JSON.parse(xhr.responseText);
                console.log('Retrieved URLs:', responseData);
            } else {
                console.error('Error fetching data:', xhr.status);
            }
        }
    };

    // Sending request to fetch URL history
    xhr.open('GET', url, true);
    xhr.send();
}

// Example usage for both functions:
var email = 'yaelahlal05@gmail.com';
var id = 'dgetybd'; // optional
searchUrl(email, id);
