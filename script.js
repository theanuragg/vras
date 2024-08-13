const menuIcon = document.querySelector('.menu-icon');
const navbarUl = document.querySelector('.navbar ul');

menuIcon.addEventListener('click', () => {
    navbarUl.classList.toggle('show');
});
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
const connectButton = document.getElementById('connectButton');
const walletPopup = document.getElementById('walletPopup');

connectButton.addEventListener('click', () => {
    walletPopup.style.display = walletPopup.style.display === 'none' ? 'block' : 'none';
});

document.addEventListener('click', (event) => {
    const isClickInside = walletPopup.contains(event.target) || connectButton.contains(event.target);
    if (!isClickInside) {
        walletPopup.style.display = 'none';
    }
});

document.getElementById('metamask').addEventListener('click', async () => {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const response = await fetch('http://localhost:3000/api/connect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ wallet: 'metamask' }),
            });
            const result = await response.json();
            console.log('Connected:', result);
        } catch (error) {
            console.error('Error connecting to Metamask:', error);
        }
    } else {
        alert('Metamask not detected.');
    }
});

// Similarly, add event listeners for Phantom, Backpack, and Trust Wallet

//but function of nft 

// Check if the wallet is connected
function isWalletConnected() {
    return window.solana && window.solana.isConnected;
}

// Show wallet connect popup
function showWalletConnectPopup() {
    // Implement your popup logic here
    alert("Please connect your wallet to proceed.");
}

// Function to handle the buy button click
async function handleBuyButtonClick(event) {
    const nftId = event.target.getAttribute("data-nft-id");

    if (!isWalletConnected()) {
        showWalletConnectPopup();
        return;
    }

    // Wallet is connected, proceed with buying the NFT
    try {
        // Assume the existence of a function to mint or buy NFT
        await mintNFT(nftId);
        alert("Transaction sent. Please check your wallet for confirmation.");
    } catch (error) {
        console.error("Error minting NFT:", error);
        alert("There was an error processing your transaction.");
    }
}

// Function to mint the NFT (example using Solana)
async function mintNFT(nftId) {
    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("devnet"));
    const wallet = window.solana;

    // Connect the wallet
    await wallet.connect();

    // Construct the transaction to buy/mint the NFT
    const transaction = new solanaWeb3.Transaction().add(
        // Add your mint instruction here
        new solanaWeb3.TransactionInstruction({
            // Specify the necessary keys and data
        })
    );

    // Send the transaction
    const signature = await wallet.sendTransaction(transaction, connection);
    await connection.confirmTransaction(signature, "processed");
    console.log("Transaction signature", signature);
}

// Add event listeners to the buy buttons
document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', handleBuyButtonClick);
});
