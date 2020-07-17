let results = require('./results/results.json');

let lottery_res = [];

for (let i = 0, res = results.result.lotteryResList; i < res.length; i++) {
    let everyResult = res[i].lottery_res.split(',');
    lottery_res.push(everyResult);
}

function balls(arr) {
    let newBalls = [];
    for (let i = 0; i < arr.length; i++) {
        newBalls.push(arr[i].pop());
    }
    return newBalls;
}

let blues = balls(lottery_res);
let red6 = balls(lottery_res);
let red5 = balls(lottery_res);
let red4 = balls(lottery_res);
let red3 = balls(lottery_res);
let red2 = balls(lottery_res);
let red1 = balls(lottery_res);

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

let max1 = findMax(red1);
let max2 = findMax(red2);
let max3 = findMax(red3);
let max4 = findMax(red4);
let max5 = findMax(red5);
let max6 = findMax(red6);
let maxBlue = findMax(blues);

console.log(max1, max2, max3, max4, max5, max6, maxBlue);