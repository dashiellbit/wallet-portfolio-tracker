const wallets = [];

document.getElementById('addWallet').addEventListener('click', addWallet);

async function addWallet() {
    const addressInput = document.getElementById('walletAddress');
    const address = addressInput.value.trim();

    if (!address || !address.startsWith('0x')) {
        alert('Please enter a valid wallet address');
        return;
    }

    if (wallets.includes(address)) {
        alert('Wallet already added');
        return;
    }

    wallets.push(address);
    addressInput.value = '';

    renderWallets();
    await updatePortfolio();
}

function renderWallets() {
    const walletsList = document.getElementById('walletsList');
    walletsList.innerHTML = '';

    wallets.forEach((wallet, index) => {
        const walletDiv = document.createElement('div');
        walletDiv.className = 'wallet-item';
        walletDiv.innerHTML = `
            <span>${wallet.substring(0, 6)}...${wallet.substring(wallet.length - 4)}</span>
            <button onclick="removeWallet(${index})">Remove</button>
        `;
        walletsList.appendChild(walletDiv);
    });
}

function removeWallet(index) {
    wallets.splice(index, 1);
    renderWallets();
    updatePortfolio();
}

async function updatePortfolio() {
    if (wallets.length === 0) {
        document.getElementById('totalValue').textContent = '$0.00';
        return;
    }

    let totalValue = 0;
    const walletsData = [];

    for (const wallet of wallets) {
        const walletData = await getWalletValue(wallet);
        totalValue += walletData.value;
        walletsData.push(walletData);
    }

    document.getElementById('totalValue').textContent = `$${totalValue.toFixed(2)}`;

    if (typeof updateChart === 'function') {
        updateChart(walletsData);
    }
}