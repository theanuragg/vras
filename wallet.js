document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectWallet');
    const statusText = document.getElementById('status');
    const modal = document.getElementById('walletModal');
    const span = document.getElementsByClassName('close')[0];
    const phantomConnectButton = document.getElementById('phantomConnect');
    const backpackConnectButton = document.getElementById('backpackConnect');

    // Show the modal when Connect Wallet is clicked
    connectButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Close the modal when the "x" is clicked
    span.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Connect with Phantom
    phantomConnectButton.addEventListener('click', async () => {
        if (window.solana && window.solana.isPhantom) {
            try {
                const response = await window.solana.connect();
                const publicKey = response.publicKey.toString();

                // Update UI after successful connection
                connectButton.innerText = `Connected: ${publicKey}`;
                connectButton.style.cursor = 'default';
                connectButton.disabled = true;
                statusText.innerText = `Connected to wallet: ${publicKey}`;
                modal.style.display = 'none'; // Close modal

                // Send the publicKey to the backend
                await fetch('http://localhost:3000/wallet-connected', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ publicKey }),
                });
            } catch (error) {
                
            }
        } else {
            statusText.innerText = 'Phantom Wallet not found. Please install it.';
        }
    });

    // Connect with Backpack
    backpackConnectButton.addEventListener('click', async () => {
        if (window.backpack && window.backpack.isBackpack) {
            try {
                const response = await window.backpack.connect();
                const publicKey = response.publicKey.toString();

                // Update UI after successful connection
                connectButton.innerText = `Connected: ${publicKey}`;
                connectButton.style.cursor = 'default';
                connectButton.disabled = true;
                statusText.innerText = `Connected to wallet: ${publicKey}`;
                modal.style.display = 'none'; // Close modal

                // Send the publicKey to the backend
                await fetch('http://localhost:3000/wallet-connected', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ publicKey }),
                });
            } catch (error) {
               
            }
        } else {
            statusText.innerText = 'Backpack Wallet not found. Please install it.';
        }
    });
});