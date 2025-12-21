let shibaPrice = 0;
let bnbPriceUSD = 0;

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

// Initialize when page loads
fetchPrices();
setInterval(fetchPrices, 30000); // Update prices every 30 seconds
