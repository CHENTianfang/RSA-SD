//洗牌算法
Array.prototype.shuffle = function () {
    let input = this;
    for (let i = input.length - 1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let itemAtIndex = input[randomIndex];
        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
}

//判空
function isEmpty(obj) {
    return (typeof obj === "undefined" || obj === null || obj === "")
}

// 1. 定义基础数据
const colors = ["Blue", "Green", "Red"];
const types = ["Solid", "Spotted", "Striped"];
const featureList = ["蓝色", "绿色", "红色", "纯色", "斑点", "条纹"]
const valueList = [-1, 0, 1, -2, 2]
const intervals = {
    small: [-1, 0, 1],
    large: [-2, 0, 2]
};

// 2. 随机决定哪个特征使用哪个区间
const useSmallForColor = Math.random() < 0.5;
const colorInterval = useSmallForColor ? intervals.small : intervals.large;
const typeInterval = useSmallForColor ? intervals.large : intervals.small;


// 为颜色和形态分配随机分数
const colorScores = {};
const shuffledColorScores = colorInterval.shuffle();
colors.forEach((color, index) => {
    colorScores[color] = shuffledColorScores[index];
});

const typeScores = {};
const shuffledTypeScores = typeInterval.shuffle();
types.forEach((type, index) => {
    typeScores[type] = shuffledTypeScores[index];
});

// 4. 生成所有蘑菇组合及其分数
let mushroomList = [];
colors.forEach(color => {
    types.forEach(type => {
        mushroomList.push({
            msr: `${color}-${type}`,
            color: color.toLowerCase(),
            type: type.toLowerCase(),
            value: colorScores[color] + typeScores[type]
        });
    });
});

mushroomList.shuffle()

function generateMushroomCombinations(mushroomList) {
    const combinations = [];
    // 使用三层循环，但确保 i < j < k 来避免重复组合
    for (let i = 0; i < mushroomList.length - 2; i++) {
        for (let j = i + 1; j < mushroomList.length - 1; j++) {
            for (let k = j + 1; k < mushroomList.length; k++) {
                combinations.push({
                    group: [mushroomList[i], mushroomList[j], mushroomList[k]]
                });
            }
        }
    }
    return combinations;
}

const allCombinations = generateMushroomCombinations(mushroomList);
console.log(`Total combinations: ${allCombinations.length}`); // 应该输出 84

let listenerList = [
    // Female listeners
    { name: "Andrea", sex: "female" },
    { name: "Avery", sex: "female" },
    { name: "Carla", sex: "female" },
    { name: "Charlotte", sex: "female" },
    { name: "Chloe", sex: "female" },
    { name: "Evelyn", sex: "female" },
    { name: "Kelly", sex: "female" },

    // Male listeners
    { name: "Aiden", sex: "male" },
    { name: "Daniel", sex: "male" },
    { name: "Ethan", sex: "male" },
    { name: "James", sex: "male" },
    { name: "Logan", sex: "male" },
    { name: "Sam", sex: "male" },
    { name: "Steve", sex: "male" }
];

//开始生成实验trial

// 打乱蘑菇数组
allCombinations.shuffle();

// 3. 创建实验数组
const expList = [];

// 4. 为每个听众分配6个蘑菇组合
listenerList.forEach((listener, index) => {
    // 获取这个听众的6个蘑菇组合（从index*6开始，取6个）
    const listenerCombinations = allCombinations.slice(index * 6, (index + 1) * 6);
    // 为每个组合创建一个实验对象
    listenerCombinations.forEach(combination => {
        expList.push({
            // 听众信息
            listenerName: listener.name,
            listenerSex: listener.sex,
            // 蘑菇信息
            msrList:combination.group
        });
    });
});

expList.shuffle()

let mid = Math.ceil(expList.length / 2); // 计算中点，向上取整

let expList1 = expList.slice(0, mid); // 前半部分
let expList2 = expList.slice(mid);    // 后半部分

console.log(expList);