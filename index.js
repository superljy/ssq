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

//二维数组降维
function reduceDimension(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            newArr.push(arr[i][j]);
        }
    }
    return newArr;
}
let newLottery = reduceDimension(lottery_res);
let finalReds = [];

function findMaxRed(arr) {
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
    finalReds.push(maxName);
    maxRedOne(arr, maxName);
}

//删除已筛选的号码
function maxRedOne(arr, maxName) {
    arr.forEach(item => {
        if (item === maxName) {
            let index = arr.indexOf(item);
            arr.splice(index, 1);
        }
    });
}

function findMaxBlue(arr) {
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

for (let i = 0; i < 6; i++) {
    findMaxRed(newLottery);
}

let maxBlue = findMaxBlue(blues);

finalReds.sort((a, b) => {
    return a - b;
})

console.log(`Red : ${finalReds} , Blue : ${maxBlue}`);