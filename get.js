const fetch = require('node-fetch');
const fs = require('fs');
const env = require('dotenv');

env.config();

let ssqFetch = async () => {
    let response = await fetch(`http://apis.juhe.cn/lottery/history?key=${process.env.KEY}&lottery_id=ssq&page_size=50&page=1`);
    return await response.json();
}

//data就是ssqFetch函数执行返回的promise对象
ssqFetch().then((data) => {
    //获取后的原始数组
    let lotteryList = data.result.lotteryResList;
    //用来保存筛选后的开奖号码
    let lottery_res = [];
    //这两个为保存最后筛选出来的红球和蓝球
    let finalReds = [];
    let finalBlues = [];

    for (let i = 0; i < lotteryList.length; i++) {
        lottery_res.push(lotteryList[i].lottery_res.split(','));
    }
    let blues = balls(lottery_res);

    let newLottery = reduceDimension(lottery_res);

    //红球
    let redTimes = process.env.RED_TIMES;
    for (let i = 0; i < redTimes; i++) {
        findMax(newLottery, finalReds);
    }

    //蓝球
    let blueTimes = process.env.BLUE_TIMES;
    for (let i = 0; i < blueTimes; i++) {
        findMax(blues, finalBlues);
    }

    //红蓝排序
    finalReds.sort((a, b) => {
        return a - b;
    })

    finalBlues.sort((a, b) => {
        return a - b;
    })

    fs.writeFile('lottery_numbers.txt', `${Number(lotteryList[0].lottery_no) + 1}期推荐: 红球 : ${finalReds} , 蓝球 : ${finalBlues}`, (err) => {
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

//找出出现最多的红球/蓝球
function findMax(arr, finalArr) {
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
    finalArr.push(maxName);
    maxOne(arr, maxName);
}

//每次找到最多的一个红/蓝球后 将其在数组中删除 以找出下一个最多的红/蓝球
function maxOne(arr, maxName) {
    arr.forEach(item => {
        if (item === maxName) {
            let index = arr.indexOf(item);
            arr.splice(index, 1);
        }
    });
}
