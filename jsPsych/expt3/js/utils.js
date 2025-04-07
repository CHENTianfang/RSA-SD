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
let valueList = [-3, -2, -1, 0, 1, 2, 3] //随intervals修改
let intervals = {
    small: [-1, 0, 1],
    large: [-2, 0, 2]
};


// 2. 随机决定哪个特征使用哪个区间
const useSmallForColor = Math.random() < 0.5;
const colorInterval = useSmallForColor ? intervals.small : intervals.large;
const typeInterval = useSmallForColor ? intervals.large : intervals.small;


// 3. 为颜色和形态分配随机分数

let colorScores = {}
let colorScores_A1 = {};
let colorScores_A2 = {};
let shuffledColorScores = colorInterval.shuffle();
colors.forEach((color, index) => {
    colorScores[color] = shuffledColorScores[index];
    colorScores_A1[color] = shuffledColorScores[index] -1;
    colorScores_A2[color] = shuffledColorScores[index] +1;
});

let typeScores = {};
let typeScores_A1 = {};
let typeScores_A2 = {};
let shuffledTypeScores = typeInterval.shuffle();
types.forEach((type, index) => {
    typeScores[type] = shuffledTypeScores[index];
    typeScores_A1[type] = shuffledTypeScores[index] - 1;
    typeScores_A2[type] = shuffledTypeScores[index] + 1;
});

// 4. 生成所有蘑菇组合及其分数
let mushroomList = [];
colors.forEach(color => {
    types.forEach(type => {
        mushroomList.push({
            msr: `${color}-${type}`,
            color: color.toLowerCase(),
            type: type.toLowerCase(),
            value_A1: colorScores_A1[color] + typeScores_A1[type],
            value_A2: colorScores_A2[color] + typeScores_A2[type]
        });
    });
});

mushroomList.shuffle()

//生成84套蘑菇组合（一套三个）
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
// 应该输出 84
console.log(`Total combinations: ${allCombinations.length}`); 

//--------------------开始生成实验trial--------------------

//1.定义游客列表
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


// 2. 创建实验数组
const expList = [];

// 3. 打乱蘑菇数组
allCombinations.shuffle();

// 4. 为每个听众分配6套蘑菇组合
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

//生成注意力测验数组
function generateAttentionTest(length = 24) {
    // 创建A-Z的字母数组
    const letters = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    
    // 生成测试数组
    const testArray = [];
    
    for (let i = 0; i < length; i++) {
        // 随机选择stim字母
        const stimIndex = Math.floor(Math.random() * letters.length);
        const stim = letters[stimIndex];
        
        // 决定正确答案放在choice1还是choice2
        const correctChoicePosition = Math.random() < 0.5 ? 1 : 2;
        
        // 生成一个不同于stim的随机字母
        const remainingLetters = letters.filter(l => l !== stim);
        const wrongLetter = remainingLetters[Math.floor(Math.random() * remainingLetters.length)];
        
        // 创建测试项
        const testItem = {
            stim: stim,
            choice1: correctChoicePosition === 1 ? stim : wrongLetter,
            choice2: correctChoicePosition === 2 ? stim : wrongLetter
        };
        
        testArray.push(testItem);
    }
    
    return testArray;
}

// 生成测试数组
const attentionList = generateAttentionTest();
console.log(attentionList);