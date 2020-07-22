const fetch = require('node-fetch');
const fs = require('fs');

let ssqFetch = async () => {
    let response = await fetch('http://apis.juhe.cn/lottery/history?key=28105e60cccc2aaeb15e662059f507ab&lottery_id=ssq&page_size=50&page=1');
    return await response.json();
}

//data就是ssqFetch函数执行返回的promise对象
ssqFetch().then((data) => {
    let lotteryList = data.result.lotteryResList;
    let lottery_res = [];
    let finalReds = [];
    for (let i = 0; i < lotteryList.length; i++) {
        lottery_res.push(lotteryList[i].lottery_res.split(','));
    }
    let blues = balls(lottery_res);

    let newLottery = reduceDimension(lottery_res);

    for (let i = 0; i < 7; i++) {
        findMaxRed(newLottery, finalReds);
    }

    let maxBlue = findMaxBlue(blues);

    finalReds.sort((a, b) => {
        return a - b;
    })

    fs.writeFile('lottery_numbers.txt', `${Number(lotteryList[0].lottery_no) + 1}期推荐: 红球 : ${finalReds} , 蓝球 : ${maxBlue}`, (err) => {
        if (err) throw err;
        console.log('done!');
    })
})
    .catch((e) => {
        console.log(e);
    });

//截取蓝球
function balls(arr) {
    let newBalls = [];
    for (let i = 0; i < arr.length; i++) {
        newBalls.push(arr[i].pop());
    }
    return newBalls;
}

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

//找出出现最多的红球
function findMaxRed(arr, redArr) {
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
    redArr.push(maxName);
    maxRedOne(arr, maxName);
}

//每次找到最多的一个红球后 将其在数组中删除 以找出下一个最多的红球
function maxRedOne(arr, maxName) {
    arr.forEach(item => {
        if (item === maxName) {
            let index = arr.indexOf(item);
            arr.splice(index, 1);
        }
    });
}

//找出最多的蓝球
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