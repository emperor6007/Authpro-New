// Token Database with CoinGecko IDs and fallback prices
const TOKENS = [
    // Top 20 CoinGecko/CoinMarketCap tokens
    {
        symbol: 'BTC',
        name: 'Bitcoin',
        coingeckoId: 'bitcoin',
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Ccircle cx="16" cy="16" r="16" fill="%23F7931A"/%3E%3Cpath fill="%23FFF" fill-rule="nonzero" d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z"/%3E%3C/g%3E%3C/svg%3E',
        price: null
    },
    {
        symbol: 'ETH',
        name: 'Ethereum',
        coingeckoId: 'ethereum',
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Ccircle cx="16" cy="16" r="16" fill="%23627EEA"/%3E%3Cg fill="%23FFF" fill-rule="nonzero"%3E%3Cpath fill-opacity=".602" d="M16.498 4v8.87l7.497 3.35z"/%3E%3Cpath d="M16.498 4L9 16.22l7.498-3.35z"/%3E%3Cpath fill-opacity=".602" d="M16.498 21.968v6.027L24 17.616z"/%3E%3Cpath d="M16.498 27.995v-6.028L9 17.616z"/%3E%3Cpath fill-opacity=".2" d="M16.498 20.573l7.497-4.353-7.497-3.348z"/%3E%3Cpath fill-opacity=".602" d="M9 16.22l7.498 4.353v-7.701z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E',
        price: null
    },
    {
        symbol: 'BNB',
        name: 'BNB',
        coingeckoId: 'binancecoin',
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Cg fill="none"%3E%3Ccircle cx="16" cy="16" r="16" fill="%23F3BA2F"/%3E%3Cpath fill="%23FFF" d="M12.116 14.404L16 10.52l3.886 3.886 2.26-2.26L16 6l-6.144 6.144 2.26 2.26zM6 16l2.26-2.26L10.52 16l-2.26 2.26L6 16zm6.116 1.596L16 21.48l3.886-3.886 2.26 2.259L16 26l-6.144-6.144-.003-.003 2.263-2.257zM21.48 16l2.26-2.26L26 16l-2.26 2.26L21.48 16zm-3.188-.002h.002V16L16 18.294l-2.291-2.29-.004-.004.004-.003.401-.402.195-.195L16 13.706l2.293 2.293z"/%3E%3C/g%3E%3C/svg%3E',
        price: null
    },
    {
        symbol: 'SOL',
        name: 'Solana',
        coingeckoId: 'solana',
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 397.7 311.7"%3E%3ClinearGradient id="a" gradientUnits="userSpaceOnUse" x1="360.879" y1="351.455" x2="141.213" y2="-69.294"%3E%3Cstop offset="0" stop-color="%2300ffa3"/%3E%3Cstop offset="1" stop-color="%23dc1fff"/%3E%3C/linearGradient%3E%3Cpath d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z" fill="url(%23a)"/%3E%3ClinearGradient id="b" gradientUnits="userSpaceOnUse" x1="264.829" y1="401.601" x2="45.163" y2="-19.148"%3E%3Cstop offset="0" stop-color="%2300ffa3"/%3E%3Cstop offset="1" stop-color="%23dc1fff"/%3E%3C/linearGradient%3E%3Cpath d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z" fill="url(%23b)"/%3E%3ClinearGradient id="c" gradientUnits="userSpaceOnUse" x1="312.548" y1="376.688" x2="92.882" y2="-44.061"%3E%3Cstop offset="0" stop-color="%2300ffa3"/%3E%3Cstop offset="1" stop-color="%23dc1fff"/%3E%3C/linearGradient%3E%3Cpath d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z" fill="url(%23c)"/%3E%3C/svg%3E',
        price: null
    },
    {
        symbol: 'XRP',
        name: 'XRP',
        coingeckoId: 'ripple',
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Cg fill="none"%3E%3Ccircle cx="16" cy="16" r="16" fill="%2323292F"/%3E%3Cpath fill="%23FFF" d="M22.63 9.37a.61.61 0 01.86 0l1.14 1.14a.61.61 0 010 .86l-5.34 5.34a4.41 4.41 0 01-6.26 0l-5.4-5.4a.61.61 0 010-.86l1.14-1.14a.61.61 0 01.86 0l5.4 5.4a2.21 2.21 0 003.14 0l5.46-5.34zm-11.4 13.2a.61.61 0 01-.86 0l-1.14-1.14a.61.61 0 010-.86l5.34-5.34a4.41 4.41 0 016.26 0l5.34 5.34a.61.61 0 010 .86l-1.14 1.14a.61.61 0 01-.86 0l-5.34-5.34a2.21 2.21 0 00-3.14 0l-5.34 5.34h-.12z"/%3E%3C/g%3E%3C/svg%3E',
        price: null
    },
    {
        symbol: 'DOGE',
        name: 'Dogecoin',
        coingeckoId: 'dogecoin',
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Ccircle cx="16" cy="16" r="16" fill="%23C3A634"/%3E%3Cpath fill="%23FFF" fill-rule="nonzero" d="M13.248 14.61h4.314c2.577 0 4.686 2.093 4.686 4.648 0 2.555-2.109 4.648-4.686 4.648h-2.222v2.833h-2.092V14.61zm2.092 7.202h2.222c1.208 0 2.195-.975 2.195-2.167 0-1.192-.987-2.167-2.195-2.167h-2.222v4.334zM11.5 18.876h2.742v2.166H11.5v-2.166zm4.834-12.615v3.355h-2.092V6.261h2.092z"/%3E%3C/g%3E%3C/svg%3E',
        price: null
    },
    {
        symbol: 'ADA',
        name: 'Cardano',
        coingeckoId: 'cardano',
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Ccircle cx="16" cy="16" r="16" fill="%230033AD"/%3E%3Cpath fill="%23FFF" d="M16 6.5c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm-2.8 1.9c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm5.6 0c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zM11 11.3c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm10 0c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zM8.2 14.2c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm15.6 0c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zM7 17.5c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm18 0c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zM8.2 20.8c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm15.6 0c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm-12.8 3c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm10 0c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm-7.2 1.8c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm4.4 0c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm-2.2 2c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z"/%3E%3C/g%3E%3C/svg%3E',
        price: null
    },
    {
        symbol: 'AVAX',
        name: 'Avalanche',
        coingeckoId: 'avalanche-2',
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Cg fill="none"%3E%3Ccircle cx="16" cy="16" r="16" fill="%23E84142"/%3E%3Cpath fill="%23FFF" d="M11.57 19.23h-1.2a.44.44 0 01-.38-.65l4.47-7.72a.44.44 0 01.76 0l1.75 3.03a10.3 10.3 0 01-5.4 5.34zm9.78 0h-4.6a.44.44 0 01-.38-.21 11.77 11.77 0 006.14-6.14l1.21 2.1a.44.44 0 010 .43l-1.99 3.43a.44.44 0 01-.38.22v.17z"/%3E%3C/g%3E%3C/svg%3E',
        price: null
    },
    {
        symbol: 'DOT',
        name: 'Polkadot',
        coingeckoId: 'polkadot',
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Cg fill="none"%3E%3Ccircle cx="16" cy="16" r="16" fill="%23E6007A"/%3E%3Cpath fill="%23FFF" d="M16 6.67c-1.19 0-2.15.96-2.15 2.15s.96 2.15 2.15 2.15 2.15-.96 2.15-2.15-.96-2.15-2.15-2.15zm0 12.21c-1.19 0-2.15.96-2.15 2.15s.96 2.15 2.15 2.15 2.15-.96 2.15-2.15-.96-2.15-2.15-2.15zm5.6-8.68c-.59-.59-1.56-.59-2.15 0l-7.23 7.23c-.59.59-.59 1.56 0 2.15.59.59 1.56.59 2.15 0l7.23-7.23c.59-.59.59-1.56 0-2.15zm-2.15 8.68c.59.59 1.56.59 2.15 0 .59-.59.59-1.56 0-2.15l-7.23-7.23c-.59-.59-1.56-.59-2.15 0-.59.59-.59 1.56 0 2.15l7.23 7.23z"/%3E%3C/g%3E%3C/svg%3E',
        price: null
    },
    {
        symbol: 'TRX',
        name: 'TRON',
        coingeckoId: 'tron',
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Cg fill="none"%3E%3Ccircle cx="16" cy="16" r="16" fill="%23EF0027"/%3E%3Cpath fill="%23FFF" d="M21.932 9.913L7.5 7.257l7.595 17.743 10.583-5.906-3.746-9.181zm-9.277 9.123l-1.856-6.334 8.838 1.458-6.982 4.876zm8.382-4.62l-8.214-1.353 9.281.83-1.067 .523z"/%3E%3C/g%3E%3C/svg%3E',
        price: null
    },
    {
        symbol: 'MATIC',
        name: 'Polygon',
        coingeckoId: 'matic-network',
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Cg fill="none"%3E%3Ccircle cx="16" cy="16" r="16" fill="%238247E5"/%3E%3Cpath fill="%23FFF" d="M21.092 12.693c-.369-.215-.848-.215-1.254 0l-2.879 1.654-1.955 1.078-2.879 1.653c-.369.216-.848.216-1.254 0l-2.288-1.294c-.369-.215-.627-.61-.627-1.042V12.19c0-.431.221-.826.627-1.042l2.25-1.258c.37-.216.85-.216 1.256 0l2.25 1.258c.37.216.628.611.628 1.042v1.654l1.955-1.115v-1.653a1.16 1.16 0 00-.627-1.042l-4.17-2.372c-.369-.216-.848-.216-1.254 0L6.627 9.034A1.16 1.16 0 006 10.076v4.78c0 .432.221.827.627 1.043l4.244 2.372c.369.215.849.215 1.254 0l2.879-1.618 1.955-1.114 2.879-1.617c.369-.216.848-.216 1.254 0l2.251 1.258c.37.215.627.61.627 1.042v2.552c0 .431-.22.826-.627 1.042l-2.25 1.294c-.37.216-.85.216-1.255 0l-2.251-1.258c-.37-.216-.628-.611-.628-1.042v-1.654l-1.955 1.115v1.653c0 .431.221.827.627 1.042l4.244 2.372c.369.216.848.216 1.254 0l4.244-2.372c.369-.215.627-.61.627-1.042v-4.78a1.16 1.16 0 00-.627-1.042l-4.28-2.409z"/%3E%3C/g%3E%3C/svg%3E',
        price: null
    },
    {
        symbol: 'SHIB',
        name: 'Shiba Inu',
        coingeckoId: 'shiba-inu',
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Cg fill="none"%3E%3Ccircle cx="16" cy="16" r="16" fill="%23FFA409"/%3E%3Cpath fill="%23FFF" d="M10.5 12.5c-.83 0-1.5.67-1.5 1.5v4c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-4c0-.83-.67-1.5-1.5-1.5zm11 0c-.83 0-1.5.67-1.5 1.5v4c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-4c0-.83-.67-1.5-1.5-1.5zM16 8c-4.42 0-8 3.58-8 8 0 1.85.63 3.55 1.69 4.9l1.56-1.56A5.987 5.987 0 0110 16c0-3.31 2.69-6 6-6s6 2.69 6 6a5.99 5.99 0 01-1.25 3.34l1.56 1.56A7.963 7.963 0 0024 16c0-4.42-3.58-8-8-8z"/%3E%3C/g%3E%3C/svg%3E',
        price: null
    },
    {
        symbol: 'LINK',
        name: 'Chainlink',
        coingeckoId: 'chainlink',
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Cg fill="none"%3E%3Ccircle cx="16" cy="16" r="16" fill="%232A5ADA"/%3E%3Cpath fill="%23FFF" d="M16 6l-1.799 1.04-5.278 3.046L7.124 11.13v9.74l1.799 1.043 5.278 3.046L16 26l1.799-1.04 5.278-3.046 1.799-1.043v-9.74l-1.799-1.043-5.278-3.046L16 6zm0 2.48l1.068.618 3.98 2.298.532.307v1.834l-.532.307-3.98 2.298L16 17.52l-1.068-.618-3.98-2.298-.532-.307v-1.834l.532-.307 3.98-2.298L16 8.48zm-5.58 7.17l1.068.618 2.913 1.682.531.307v3.668l-.531.307-2.913 1.682-1.068.618-1.068-.618V19.52l1.068-.618zm11.16 0l1.068.618v3.668l-1.068.618-1.068-.618-2.913-1.682-.531-.307v-3.668l.531-.307 2.913-1.682 1.068-.618z"/%3E%3C/g%3E%3C/svg%3E',
        price: null
    },
    {
        symbol: 'UNI',
        name: 'Uniswap',
        coingeckoId: 'uniswap',
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Cg fill="none"%3E%3Ccircle cx="16" cy="16" r="16" fill="%23FF007A"/%3E%3Cpath fill="%23FFF" d="M18.99 8.23c.78-.54 1.98.12 1.82 1l-.32 1.8a3.73 3.73 0 002.28 3.36l.88.4c.82.37.82 1.54 0 1.92l-.88.39a3.73 3.73 0 00-2.28 3.36l.32 1.81c.16.88-1.04 1.54-1.82 1l-1.43-.99a3.73 3.73 0 00-4.26 0l-1.43.99c-.78.54-1.98-.12-1.82-1l.32-1.8a3.73 3.73 0 00-2.28-3.36l-.88-.4c-.82-.37-.82-1.54 0-1.92l.88-.39a3.73 3.73 0 002.28-3.36l-.32-1.81c-.16-.88 1.04-1.54 1.82-1l1.43.99a3.73 3.73 0 004.26 0l1.43-.99z"/%3E%3C/g%3E%3C/svg%3E',
        price: null
    },
    {
        symbol: 'LTC',
        name: 'Litecoin',
        coingeckoId: 'litecoin',
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Ccircle cx="16" cy="16" r="16" fill="%23BFBBBB"/%3E%3Cpath fill="%23FFF" d="M10.427 19.214L9 19.768l.688-2.759 1.444-.58L13.213 8h5.129l-1.519 6.196 1.41-.571-.68 2.75-1.427.571-.848 3.483H23L22.127 24H9.252z"/%3E%3C/g%3E%3C/svg%3E',
        price: null
    },
    {
        symbol: 'BCH',
        name: 'Bitcoin Cash',
        coingeckoId: 'bitcoin-cash',
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Cg fill="none"%3E%3Ccircle cx="16" cy="16" r="16" fill="%238DC351"/%3E%3Cpath fill="%23FFF" d="M21.207 13.41c.274-1.83-1.12-2.816-3.023-3.472l.618-2.475-1.507-.376-.601 2.415a75.846 75.846 0 00-1.208-.285l.606-2.428-1.507-.375-.617 2.473c-.363-.083-.72-.165-1.066-.251l.002-.008-2.079-.52-.401 1.613s1.12.257 1.096.273c.61.153.72.557.702.878l-.704 2.825c.042.01.097.026.157.05l-.16-.04-.986 3.956c-.075.185-.265.463-.692.358.015.022-1.096-.274-1.096-.274l-.748 1.727 1.962.49c.365.091.723.187 1.074.277l-.623 2.502 1.507.376.618-2.477c.41.111.809.214 1.2.31l-.616 2.467 1.507.376.623-2.497c2.572.487 4.506.29 5.32-2.037.656-1.874-.033-2.955-1.387-3.66.986-.228 1.728-.876 1.926-2.217zm-3.447 4.832c-.466 1.873-3.619.86-4.64.606l.828-3.322c1.02.256 4.298.762 3.812 2.716zm.467-4.856c-.426 1.705-3.051.839-3.904.626l.751-3.012c.853.213 3.596.61 3.153 2.386z"/%3E%3C/g%3E%3C/svg%3E',
        price: null
    },
    {
        symbol: 'XLM',
        name: 'Stellar',
        coingeckoId: 'stellar',
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Cg fill="none"%3E%3Ccircle cx="16" cy="16" r="16" fill="%2314B6E7"/%3E%3Cpath fill="%23FFF" d="M16.17 10.63l-1.95 1.28a.63.63 0 01-.7 0L7.28 8.27a.31.31 0 00-.48.26v2.32c0 .13.06.25.17.32l6.24 3.64c.22.13.48.13.7 0l1.95-1.28a.63.63 0 01.7 0l6.24 3.64a.31.31 0 00.48-.26v-2.32a.43.43 0 00-.17-.32l-6.24-3.64a.63.63 0 00-.7 0zm0 10.74l-1.95-1.28a.63.63 0 00-.7 0L7.28 23.73a.31.31 0 01-.48-.26v-2.32c0-.13.06-.25.17-.32l6.24-3.64c.22-.13.48-.13.7 0l1.95 1.28a.63.63 0 00.7 0l6.24-3.64a.31.31 0 01.48.26v2.32c0 .13-.06.25-.17.32l-6.24 3.64a.63.63 0 01-.7 0z"/%3E%3C/g%3E%3C/svg%3E',
        price: null
    },
    {
        symbol: 'ATOM',
        name: 'Cosmos',
        coingeckoId: 'cosmos',
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Cg fill="none"%3E%3Ccircle cx="16" cy="16" r="16" fill="%232E3148"/%3E%3Cpath fill="%23FFF" d="M16 8.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM16 20c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm0-9c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm-7-6.5c.41 0 .79.17 1.06.44l2.47 2.47c-.21.51-.33 1.08-.33 1.67s.12 1.16.33 1.67l-2.47 2.47c-.27.27-.65.44-1.06.44A1.5 1.5 0 017.5 16c0-.83.67-1.5 1.5-1.5zm14 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5c-.41 0-.79-.17-1.06-.44l-2.47-2.47c.21-.51.33-1.08.33-1.67s-.12-1.16-.33-1.67l2.47-2.47c.27-.27.65-.44 1.06-.44z"/%3E%3C/g%3E%3C/svg%3E',
        price: null
    },
    {
        symbol: 'NEAR',
        name: 'NEAR Protocol',
        coingeckoId: 'near',
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Cg fill="none"%3E%3Ccircle cx="16" cy="16" r="16" fill="%23000"/%3E%3Cpath fill="%23FFF" d="M19.17 7.46l3.92 6.58c.13.22.07.5-.13.65l-5.82 4.23c-.22.16-.52.09-.65-.15l-3.92-6.58a.48.48 0 01.13-.65l5.82-4.23c.22-.16.52-.09.65.15zm-6.34 9.49l-3.92 6.58a.48.48 0 01-.65.15l-1.8-1.31a.48.48 0 01-.13-.65l3.92-6.58c.13-.22.43-.31.65-.15l1.8 1.31c.22.16.26.43.13.65zm13.09-5.49l-3.92 6.58a.48.48 0 01-.65.15l-1.8-1.31a.48.48 0 01-.13-.65l3.92-6.58c.13-.22.43-.31.65-.15l1.8 1.31c.22.16.26.43.13.65z"/%3E%3C/g%3E%3C/svg%3E',
        price: null
    },
    {
        symbol: 'FTM',
        name: 'Fantom',
        coingeckoId: 'fantom',
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Cg fill="none"%3E%3Ccircle cx="16" cy="16" r="16" fill="%2313B5EC"/%3E%3Cpath fill="%23FFF" d="M16 7l-7 4.04v8.09L16 23l7-3.87v-8.09L16 7zm5.25 11.03L16 21.13l-5.25-3.1V13.1l5.25-3.03 5.25 3.03v4.93zm-9.5-5.96v3.86l3.75 2.22v-3.87l-3.75-2.21zm7.5 0l-3.75 2.21v3.87l3.75-2.22v-3.86z"/%3E%3C/g%3E%3C/svg%3E',
        price: null
    },
    {
        symbol: 'ALGO',
        name: 'Algorand',
        coingeckoId: 'algorand',
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Cg fill="none"%3E%3Ccircle cx="16" cy="16" r="16" fill="%23000"/%3E%3Cpath fill="%23FFF" d="M18.875 9.5h-3.125l-2.031 5.844L11.688 9.5H8.562L5 22.5h3.125l1.563-5.844L11.719 22.5h3.125l2.031-5.844L18.906 22.5H22L18.875 9.5z"/%3E%3C/g%3E%3C/svg%3E',
        price: null
    },
    
    // Custom tokens (no CoinGecko ID - using realistic fallback prices)
    {
        symbol: 'MNEB',
        name: 'Minereum BSC',
        coingeckoId: null,
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Cg fill="none"%3E%3Ccircle cx="16" cy="16" r="16" fill="%23FFB700"/%3E%3Cpath fill="%23FFF" d="M16 8l-6 4v8l6 4 6-4v-8l-6-4zm0 2.4l3.6 2.4v4.8l-3.6 2.4-3.6-2.4v-4.8l3.6-2.4z"/%3E%3C/g%3E%3C/svg%3E',
        price: 0.0423
    },
    {
        symbol: 'UFO',
        name: 'MetaUFO',
        coingeckoId: null,
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Cg fill="none"%3E%3Ccircle cx="16" cy="16" r="16" fill="%2300FFFF"/%3E%3Cellipse cx="16" cy="15" rx="8" ry="4" fill="%23FFF"/%3E%3Ccircle cx="12" cy="15" r="1.5" fill="%2300FFFF"/%3E%3Ccircle cx="20" cy="15" r="1.5" fill="%2300FFFF"/%3E%3Cellipse cx="16" cy="15" rx="12" ry="2" fill="%23FFF" opacity="0.5"/%3E%3C/g%3E%3C/svg%3E',
        price: 0.000000087
    },
    {
        symbol: 'METAWAR',
        name: 'MetaWAR',
        coingeckoId: null,
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Cg fill="none"%3E%3Ccircle cx="16" cy="16" r="16" fill="%23D32F2F"/%3E%3Cpath fill="%23FFF" d="M16 8l-6 6 6 6 6-6-6-6zm0 10l-4 4h8l-4-4z"/%3E%3C/g%3E%3C/svg%3E',
        price: 0.00234
    },
    {
        symbol: 'CYF',
        name: 'Cylum Finance',
        coingeckoId: null,
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Cg fill="none"%3E%3Ccircle cx="16" cy="16" r="16" fill="%234CAF50"/%3E%3Cpath fill="%23FFF" d="M16 6C10.48 6 6 10.48 6 16s4.48 10 10 10 10-4.48 10-10S21.52 6 16 6zm-2 15l-5-5 1.41-1.41L14 18.17l7.59-7.59L23 12l-9 9z"/%3E%3C/g%3E%3C/svg%3E',
        price: 0.156
    },
    {
        symbol: 'METAM',
        name: 'Metamusk',
        coingeckoId: null,
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Cg fill="none"%3E%3Ccircle cx="16" cy="16" r="16" fill="%23FF5722"/%3E%3Cpath fill="%23FFF" d="M16 7L9 11.5V20L16 24.5 23 20V11.5L16 7zm0 3l5 2.88v5.74L16 21.5l-5-2.88v-5.74L16 10z"/%3E%3C/g%3E%3C/svg%3E',
        price: 0.0089
    },
    {
        symbol: 'METAV',
        name: 'MetaVerse',
        coingeckoId: null,
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Cg fill="none"%3E%3Ccircle cx="16" cy="16" r="16" fill="%239C27B0"/%3E%3Cpath fill="%23FFF" d="M16 8C11.58 8 8 11.58 8 16s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/%3E%3C/g%3E%3C/svg%3E',
        price: 0.345
    },
    {
        symbol: 'IOV',
        name: 'IOV Carlive',
        coingeckoId: null,
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Cg fill="none"%3E%3Ccircle cx="16" cy="16" r="16" fill="%23007ACC"/%3E%3Cpath fill="%23FFF" d="M16 7c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm-1-11h2v6h-2v-6zm0 8h2v2h-2v-2z"/%3E%3C/g%3E%3C/svg%3E',
        price: 0.0678
    },
    {
        symbol: 'METAMASK',
        name: 'Metamask Token',
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


