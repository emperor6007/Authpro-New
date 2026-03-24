// Token Database with CoinGecko IDs and fallback prices
const TOKENS = [
    // Top 20 CoinGecko/CoinMarketCap tokens
    {
        symbol: 'BTC',
        name: 'Bitcoin',
        coingeckoId: 'bitcoin',
        icon: 'bitcoin.png',
        price: null
    },
    {
        symbol: 'ETH',
        name: 'Ethereum',
        coingeckoId: 'ethereum',
        icon: 'ethereum.png',
        price: null
    },
    {
        symbol: 'BNB',
        name: 'BNB',
        coingeckoId: 'binancecoin',
        icon: 'bnb.png',
        price: null
    },
    {
        symbol: 'SOL',
        name: 'Solana',
        coingeckoId: 'solana',
        icon: 'solana.jpg',
        price: null
    },
    {
        symbol: 'XRP',
        name: 'XRP',
        coingeckoId: 'ripple',
        icon: 'xrp.png',
        price: null
    },
    {
        symbol: 'DOGE',
        name: 'Dogecoin',
        coingeckoId: 'dogecoin',
        icon: 'dogecoin.png',
        price: null
    },
    {
        symbol: 'ADA',
        name: 'Cardano',
        coingeckoId: 'cardano',
        icon: 'ada.png',
        price: null
    },
    {
        symbol: 'AVAX',
        name: 'Avalanche',
        coingeckoId: 'avalanche-2',
        icon: 'avax.png',
        price: null
    },
    {
        symbol: 'DOT',
        name: 'Polkadot',
        coingeckoId: 'polkadot',
        icon: 'polkadot.png',
        price: null
    },
    {
        symbol: 'TRX',
        name: 'TRON',
        coingeckoId: 'tron',
        icon: 'tron.png',
        price: null
    },
    {
        symbol: 'MATIC',
        name: 'Polygon',
        coingeckoId: 'matic-network',
        icon: 'matic.png',
        price: null
    },
    {
        symbol: 'SHIB',
        name: 'Shiba Inu',
        coingeckoId: 'shiba-inu',
        icon: 'shibainu.jpg',
        price: null
    },
    {
        symbol: 'LINK',
        name: 'Chainlink',
        coingeckoId: 'chainlink',
        icon: 'chainlink.png',
        price: null
    },
    {
        symbol: 'UNI',
        name: 'Uniswap',
        coingeckoId: 'uniswap',
        icon: 'uni.png',
        price: null
    },
    {
        symbol: 'LTC',
        name: 'Litecoin',
        coingeckoId: 'litecoin',
        icon: 'litecoin.png',
        price: null
    },
    {
        symbol: 'BCH',
        name: 'Bitcoin Cash',
        coingeckoId: 'bitcoin-cash',
        icon: 'bch.png',
        price: null
    },
    {
        symbol: 'XLM',
        name: 'Stellar',
        coingeckoId: 'stellar',
        icon: 'xlm.png',
        price: null
    },
    {
        symbol: 'ATOM',
        name: 'Cosmos',
        coingeckoId: 'cosmos',
        icon: 'atom.png',
        price: null
    },
    {
        symbol: 'NEAR',
        name: 'NEAR Protocol',
        coingeckoId: 'near',
        icon: 'near.png',
        price: null
    },
    {
        symbol: 'FTM',
        name: 'Fantom',
        coingeckoId: 'fantom',
        icon: 'fantom.png',
        price: null
    },
    {
        symbol: 'ALGO',
        name: 'Algorand',
        coingeckoId: 'algorand',
        icon: 'algo.png',
        price: null
    },
    
    // Custom tokens (no CoinGecko ID - using realistic fallback prices)
    {
        symbol: 'MNEB',
        name: 'Minereum BSC',
        coingeckoId: null,
        icon: 'mne.jpg',
        price: 0.0423
    },
    {
        symbol: 'UFO',
        name: 'MetaUFO',
        coingeckoId: null,
        icon: 'metaufo.jpg',
        price: 0.000000087
    },
    {
        symbol: 'METAWAR',
        name: 'MetaWAR',
        coingeckoId: null,
        icon: 'metawar.jpg',
        price: 0.00234
    },
    {
        symbol: 'CYF',
        name: 'Cylum Finance',
        coingeckoId: null,
        icon: 'cylum.jpg',
        price: 0.156
    },
    {
        symbol: 'METAM',
        name: 'Metamusk',
        coingeckoId: null,
        icon: 'metamusk.jpg',
        price: 0.0089
    },
    {
        symbol: 'MDX',
        name: 'Maldomax',
        coingeckoId: null,
        icon: 'maldorini.png',
        price: 2.45
    },
    {
        symbol: 'IOV',
        name: 'IOV Carlive',
        coingeckoId: null,
        icon: 'iov.jpg',
        price: 0.0678
    },
    {
        symbol: 'AUTP',
        name: 'AuthPro',
        coingeckoId: null,
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Cg fill="none"%3E%3Ccircle cx="16" cy="16" r="16" fill="%23F6851B"/%3E%3Cpath fill="%23FFF" d="M23.5 8.5l-6.5 4.8 1.2-2.8 5.3-2zm-15 0l6.4 4.9-1.1-2.9-5.3-2zM21 19.7l-1.7 2.6 3.6 1 1-3.5-2.9-.1zm-11.9.1l1 3.5 3.6-1-1.7-2.6-2.9.1z" opacity=".5"/%3E%3Cpath fill="%23FFF" d="M13.3 13.9l-1 1.5 3.6.2-.1-3.9-2.5 2.2zm5.4 0l-2.6-2.3-.1 4 3.6-.2-1-1.5zm-6.4 8.4l2.2-1.1-1.9-1.5-.3 2.6zm4.4-1.1l2.2 1.1-.3-2.6-1.9 1.5z"/%3E%3C/g%3E%3C/svg%3E',
        price: 0.234
    }
];

// Current selected token and prices
let selectedToken = TOKENS[2]; // Default: BNB
let tokenPrices = {};

// Fetch prices from CoinGecko
async function fetchPrices() {
    try {
        // Build list of CoinGecko IDs
        const coingeckoIds = TOKENS
            .filter(token => token.coingeckoId)
            .map(token => token.coingeckoId)
            .join(',');
        
        if (coingeckoIds) {
            const response = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoIds}&vs_currencies=usd`
            );
            const data = await response.json();
            
            // Update prices for tokens with CoinGecko data
            TOKENS.forEach(token => {
                if (token.coingeckoId && data[token.coingeckoId]) {
                    token.price = data[token.coingeckoId].usd;
                    tokenPrices[token.symbol] = token.price;
                } else if (!token.coingeckoId && token.price) {
                    // Use fallback price for custom tokens
                    tokenPrices[token.symbol] = token.price;
                }
            });
        } else {
            // Use fallback prices
            TOKENS.forEach(token => {
                if (token.price) {
                    tokenPrices[token.symbol] = token.price;
                }
            });
        }
        
        console.log('Prices loaded:', tokenPrices);
        updatePriceDisplay();
    } catch (error) {
        console.error('Error fetching prices:', error);
        // Use fallback prices for all tokens
        TOKENS.forEach(token => {
            if (token.price) {
                tokenPrices[token.symbol] = token.price;
            } else {
                // Default fallback prices for major tokens if API fails
                const fallbackPrices = {
                    'BTC': 43000,
                    'ETH': 2300,
                    'BNB': 320,
                    'SOL': 100,
                    'XRP': 0.52,
                    'DOGE': 0.08,
                    'ADA': 0.47,
                    'AVAX': 38,
                    'DOT': 7.2,
                    'TRX': 0.11,
                    'MATIC': 0.82,
                    'SHIB': 0.000009,
                    'LINK': 15,
                    'UNI': 6.5,
                    'LTC': 72,
                    'BCH': 245,
                    'XLM': 0.12,
                    'ATOM': 10.5,
                    'NEAR': 2.8,
                    'FTM': 0.42,
                    'ALGO': 0.18
                };
                tokenPrices[token.symbol] = fallbackPrices[token.symbol] || 1;
            }
        });
        updatePriceDisplay();
    }
}

// Populate token list in modal
function populateTokenList() {
    const tokenList = document.getElementById('tokenList');
    tokenList.innerHTML = '';
    
    TOKENS.forEach(token => {
        const price = tokenPrices[token.symbol] || token.price || 0;
        const priceDisplay = price < 0.01 
            ? `$${price.toFixed(10)}` 
            : `$${price.toFixed(2)}`;
        
        const tokenItem = document.createElement('div');
        tokenItem.className = 'token-item';
        tokenItem.onclick = () => selectToken(token);
        
        tokenItem.innerHTML = `
            <img src="${token.icon}" alt="${token.symbol}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 32 32%22%3E%3Ccircle cx=%2216%22 cy=%2216%22 r=%2216%22 fill=%22%23999%22/%3E%3C/svg%3E'">
            <div class="token-info">
                <div class="token-name">${token.name}</div>
                <div class="token-symbol">${token.symbol}</div>
            </div>
            <div class="token-price">${priceDisplay}</div>
        `;
        
        tokenList.appendChild(tokenItem);
    });
}

// Filter tokens based on search
function filterTokens() {
    const searchTerm = document.getElementById('tokenSearch').value.toLowerCase();
    const tokenList = document.getElementById('tokenList');
    const tokenItems = tokenList.getElementsByClassName('token-item');
    
    let visibleCount = 0;
    
    Array.from(tokenItems).forEach(item => {
        const name = item.querySelector('.token-name').textContent.toLowerCase();
        const symbol = item.querySelector('.token-symbol').textContent.toLowerCase();
        
        if (name.includes(searchTerm) || symbol.includes(searchTerm)) {
            item.style.display = 'flex';
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });
    
    // Show "no results" message if needed
    let noResults = tokenList.querySelector('.no-results');
    if (visibleCount === 0) {
        if (!noResults) {
            noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = 'No tokens found';
            tokenList.appendChild(noResults);
        }
    } else if (noResults) {
        noResults.remove();
    }
}

// Open token selector modal
function openTokenModal() {
    const modal = document.getElementById('tokenModal');
    modal.classList.add('active');
    document.getElementById('tokenSearch').value = '';
    populateTokenList();
}

// Close token selector modal
function closeTokenModal() {
    const modal = document.getElementById('tokenModal');
    modal.classList.remove('active');
}

// Select a token
function selectToken(token) {
    selectedToken = token;
    
    // Update UI
    document.getElementById('fromTokenIcon').src = token.icon;
    document.getElementById('fromTokenIcon').alt = token.symbol;
    document.getElementById('fromTokenSymbol').textContent = token.symbol;
    document.getElementById('fromTokenLabel').textContent = `${token.symbol} Price:`;
    
    // Update price display
    updatePriceDisplay();
    
    // Recalculate amounts
    calculateToAmount();
    
    // Close modal
    closeTokenModal();
}

// Update price display
function updatePriceDisplay() {
    const fromPrice = tokenPrices[selectedToken.symbol] || selectedToken.price || 0;
    const usdtPrice = 1.00;
    
    // Format prices
    const fromPriceDisplay = fromPrice < 0.01 
        ? `$${fromPrice.toFixed(10)}` 
        : `$${fromPrice.toFixed(2)}`;
    
    document.getElementById('fromTokenPrice').textContent = fromPriceDisplay;
    document.getElementById('usdtPrice').textContent = '$1.00';
    
    // Calculate and display exchange rate
    if (fromPrice > 0) {
        const rate = fromPrice / usdtPrice;
        const rateDisplay = rate < 0.01 
            ? `1 ${selectedToken.symbol} = ${rate.toFixed(10)} USDT`
            : `1 ${selectedToken.symbol} = ${rate.toFixed(4)} USDT`;
        document.getElementById('exchangeRate').textContent = rateDisplay;
    } else {
        document.getElementById('exchangeRate').textContent = 'Loading...';
    }
}

// Calculate USDT amount based on input
function calculateToAmount() {
    const fromAmount = parseFloat(document.getElementById('fromAmount').value) || 0;
    const fromPrice = tokenPrices[selectedToken.symbol] || selectedToken.price || 0;
    const usdtPrice = 1.00;
    
    if (fromAmount > 0 && fromPrice > 0) {
        const fromValueUSD = fromAmount * fromPrice;
        const toAmount = fromValueUSD / usdtPrice;
        document.getElementById('toAmount').value = toAmount.toFixed(2);
    } else {
        document.getElementById('toAmount').value = '';
    }
}

// Execute swap
function executeSwap() {
    const fromAmount = parseFloat(document.getElementById('fromAmount').value);
    
    if (!fromAmount || fromAmount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    
    const fromPrice = tokenPrices[selectedToken.symbol] || selectedToken.price;
    if (!fromPrice || fromPrice <= 0) {
        alert('Price data not available. Please try again.');
        return;
    }
    
    // Show loading state
    document.getElementById('swapInterface').style.display = 'none';
    document.getElementById('loadingState').style.display = 'block';
    
    // Simulate transaction processing
    setTimeout(() => {
        document.getElementById('loadingState').style.display = 'none';
        document.getElementById('successState').style.display = 'block';
    }, 3000);
}

// Reset swap interface
function resetSwap() {
    document.getElementById('successState').style.display = 'none';
    document.getElementById('swapInterface').style.display = 'block';
    document.getElementById('fromAmount').value = '';
    document.getElementById('toAmount').value = '';
}

// Close modal when clicking outside
document.getElementById('tokenModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeTokenModal();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    fetchPrices();
    // Refresh prices every 30 seconds
    setInterval(fetchPrices, 30000);
});

