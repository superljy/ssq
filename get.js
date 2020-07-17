const fetch = require('node-fetch');

fetch('http://apis.juhe.cn/lottery/history?key=28105e60cccc2aaeb15e662059f507ab&lottery_id=ssq&page_size=50&page=1')
    .then(response => {
        return response.json()
    })
    .then(res => {
        let datas = res.result.lotteryResList;
        let lottery_res = [];
        for (let i = 0; i < datas.length; i++) {
            lottery_res.push(datas[i].lottery_res.split(','));
        }
        let blues = balls(lottery_res);
        let red6 = balls(lottery_res);
        let red5 = balls(lottery_res);
        let red4 = balls(lottery_res);
        let red3 = balls(lottery_res);
        let red2 = balls(lottery_res);
        let red1 = balls(lottery_res);

        let max1 = findMax(red1);
        let max2 = findMax(red2);
        let max3 = findMax(red3);
        let max4 = findMax(red4);
        let max5 = findMax(red5);
        let max6 = findMax(red6);
        let maxBlue = findMax(blues);

        console.log(max1, max2, max3, max4, max5, max6, maxBlue);
    });

function balls(arr) {
    let newBalls = [];
    for (let i = 0; i < arr.length; i++) {
        newBalls.push(arr[i].pop());
    }
    return newBalls;
}

function findMax(arr) {
    let hash = {};
    let maxName = null;
    let maxNum = 0;
    for (let i = 0; i < arr.length; i++) {
        if (!hash[arr[i]]) {
            hash[arr[i]] = 1;
        } else {
            hash[arr[i]]++
        }
        if (hash[arr[i]] > maxNum) {
            maxName = arr[i];
            maxNum = hash[arr[i]]
        }
    }
    return maxName;
}