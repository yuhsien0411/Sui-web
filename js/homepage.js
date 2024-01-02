// usdt usdc apy
let usdcSupplyAnnual, usdtSupplyAnnual, usdcBorrowAnnual, usdtBorrowAnnual;

fetch('https://api-defi.naviprotocol.io/getIndexAssetData')
.then(response => response.json())
.then(data => {
    // 從API響應中獲取USDC和USDT的數據
    const usdcData = data['1']; // 假設'1'是USDC的鍵
    const usdtData = data['2']; // 假設'2'是USDT的鍵

    // 獲取並創建圖標的HTML
    const usdcLogo = '<img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=029" alt="" style="height: 40px;">';
    const usdtLogo = '<img src="https://seeklogo.com/images/T/tether-usdt-logo-FA55C7F397-seeklogo.com.png" alt="" style="height:40px">';

    // 計算USDC和USDT的年化供應率和借款年化
    usdcSupplyAnnual = (parseFloat(data['1'].supply_rate) + parseFloat(data['1'].boosted)).toFixed(2);
    usdtSupplyAnnual = (parseFloat(data['2'].supply_rate) + parseFloat(data['2'].boosted)).toFixed(2);
    usdcBorrowAnnual = (parseFloat(data['1'].borrow_rate) - parseFloat(data['1'].borrow_reward_apy)).toFixed(2);
    usdtBorrowAnnual = (parseFloat(data['2'].borrow_rate) - parseFloat(data['2'].borrow_reward_apy)).toFixed(2);

    // 判斷哪個幣種的供應年化加上借款年化更有利
    let advice;
    if (parseFloat(usdcSupplyAnnual) - parseFloat(usdtBorrowAnnual) > parseFloat(usdtSupplyAnnual) - parseFloat(usdcBorrowAnnual)) {
        advice = ' 供應USDC並借出USDT來獲得最大收益';
    } else {
        advice = ' 供應USDT並借出USDC來獲得最大收益';
    }

    // 格式化數據並更新網頁內容
    const displayText = `
        ${usdcLogo} USDC 供應年化: ${usdcSupplyAnnual}% 借款年化: ${usdcBorrowAnnual}%<br>
        ${usdtLogo} USDT 供應年化: ${usdtSupplyAnnual}% 借款年化: ${usdtBorrowAnnual}%<br>
        ${advice}
    `;

    // 將數據顯示在指定的位置
    document.querySelector('.custom-block-overlay .navidata').innerHTML = displayText;
})
.catch(error => {
    console.error('Error fetching data:', error);
});



console.log(usdcSupplyAnnual, usdtSupplyAnnual, usdcBorrowAnnual, usdtBorrowAnnual);

function updateAmount() {
    // 獲取輸入框中的值
    var inputAmount = document.getElementById("amount").value;
    let x = parseFloat(inputAmount);
    let n = 0;
    let v = 0;

    while (x > 1) {
        n += x; // 供應
        x = x * 0.75; // 按USDT的LTV計算下次借款
        v += x; // 累計借款
        console.log(x,n,v)
    }

    n = n + v;

    // 計算年化收益
    const text = `${((n * parseFloat(usdtSupplyAnnual/100) - v * parseFloat(usdcBorrowAnnual/100))/inputAmount*100).toFixed(2)}%`;
    document.getElementById("result").innerHTML = text;
}


