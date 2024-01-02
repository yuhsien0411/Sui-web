// 連接錢包
let isWalletConnected = false;

const enableMetaMaskButton = document.querySelector(".enableSUIButton");

enableMetaMaskButton.addEventListener("click", connectMetaMask);

function connectMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
        // MetaMask is installed
        window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(accounts => {
                // 连接成功
                isWalletConnected = true; // 更新钱包连接状态

                // 格式化并显示地址
                const address = accounts[0];
                const formattedAddress = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
                enableMetaMaskButton.innerHTML = formattedAddress; // 更新按钮文本为格式化的地址
            })
            .catch(err => {
                // 处理用户拒绝连接的情况
                console.error(err);
                isWalletConnected = false; // 保持钱包连接状态为未连接
            });
    } else {
        // MetaMask not installed
        alert("请安装MetaMask!");
    }
}





// 存入USDC
document.querySelector('.depositButton').addEventListener('click', function() {
    // 假设isWalletConnected为true，这里只是为了示例
    var balance =0;
    // 检查钱包是否连接
    if (!isWalletConnected) {
        alert('请先连接您的钱包！');
    } else if (balance ==0){
    
        alert('餘額不足');
    }  else {
        // 新窗口的宽度和高度
        const width = 360;
        const height = 600;

        // 计算新窗口在屏幕右上角打开的位置
        const left = window.screenX + window.outerWidth - width;
        const top = window.screenY;

        // 打开新窗口
        window.open('../wallet.html', 'newwindow', `width=${width},height=${height},left=${left},top=${top}`);
    }
});


document.querySelector('.withdrawButton ').addEventListener('click', function() {
// 假设isWalletConnected为true，这里只是为了示例

// 检查钱包是否连接
if (!isWalletConnected) {
    alert('请先连接您的钱包！');
} else {
    // 新窗口的宽度和高度
    const width = 360;
    const height = 600;

    // 计算新窗口在屏幕右上角打开的位置
    const left = window.screenX + window.outerWidth - width;
    const top = window.screenY;

    // 打开新窗口
    window.open('../wallet.html', 'newwindow', `width=${width},height=${height},left=${left},top=${top}`);
}
});
