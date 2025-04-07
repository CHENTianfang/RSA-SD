let timeline = []
let repetition = 0
const groupList = ['truth', 'relevance', 'unbias']
let group = ''
let TOUR_GUIDE_OBJECTIVE
let listenerName = "Thomas"
let avatarImg = "asset/img/people/" + listenerName + ".png"
let msrList = [
    {
        msr: "Solid-Blue",
        value: typeScores.Solid + colorScores.Blue,
        color: "Blue",
        type: "Solid"
    },
    {
        msr: "Spotted-Green",
        value: typeScores.Spotted + colorScores.Green,
        color: "Green",
        type: "Spotted"
    },
    {
        msr: "Striped-Red",
        value: typeScores.Striped + colorScores.Red,
        color: "Red",
        type: "Striped"
    }]
let TourismQuizPass = false
let colorQuizPass = false
let textureQuizPass = false
let generalQuizPass = false
let specificQuizPass = false
let aboutChoice
let aboutLie
let aboutObjective
let instructionsMap
let jsPsych = initJsPsych({
    use_webaudio: true,
    on_finish: function () {
    },
    extensions: [
        { type: Naodao }
    ]
});

//-------------------------------------------------分组-------------------------------------------------//
groupList.shuffle()
group = groupList[0]
console.log("本局分配到的是" + group);
//-------------------------------------------------知情同意书-------------------------------------------------//

//知情同意书
let instruction_consent = {
    type: jsPsychInstructions,
    pages: function () {
        let consentPart0 = `
        <h1 >同学您好！欢迎参加本实验&nbsp👋</h1>
        <div style="text-align: center; margin: 90px 0;"></div>
        `;
        let consentPart1 = `
        <div class="consent-container" style="width: 80%; margin: 0 auto; text-align: left;">
            <h2 style="text-align: center;">知情同意书&nbsp📜</h2>
            <p>您受邀参加一项研究。在决定是否参加此研究之前，您需要了解研究的目的以及它将涉及的内容。请花时间仔细阅读以下信息，如有任何不清楚的地方或需要咨询更多信息，请联系研究人员。我们需要您的同意才能继续。</p>
            
            <h3>研究目的</h3>
            <p>该项目旨在收集数据，以评估因果学习、分类和语言学习的各种形式，并跟踪语言知识在交流时如何变化。</p>
            
            <h3>实验程序</h3>
            <p>您将会收到一些信息（包括书面陈述、假设情景或科学数据等），然后需要对这些信息做出一个或多个判断，或基于这些信息做出决定。在某些情况下，您可能需要对您的回答提供简短的解释或理由。研究不涉及在情绪上令人不安的材料，仅涉及关于类别、因果关系、学习和语言的简单问题。</p>
            
            <p>您可能需要执行的任务包括以下一项或多项，预计总实验时长约为20分钟：</p>
            <ol>
                <li>观看一个成员数量不等的类别，并被要求指出哪些对象更可能属于该类别。</li>
                <li>观看一系列图片或听取声音，并对该序列做出判断。</li>
                <li>阅读或听取一种语言的单词，并判断该单词是否属于该语言。</li>
                <li>观看有关因果关系的信息，并做出关于其中因果关系的判断。</li>
                <li>观察一系列事件或阅读关于事件的描述，并判断事件或陈述的可能性。</li>
                <li>观看一系列视觉刺激，并在屏幕上进行相应的分类或标注。</li>
                <li>观看一系列视觉刺激，并基于这些刺激做出定量或定性判断。</li>
                <li>与一个或多个参与者通过聊天框就共享的刺激进行互动。</li>
            </ol>
            <p>您的回答会被用于后续的分析，任何可以识别出您身份的数据都不会与外部人员共享。</p>
            
            <div style="text-align: center; margin-top: 20px;">
            </div>
        </div>
        `;

        let consentPart2 = `
        <div class="consent-container" style="width: 80%; margin: 0 auto; text-align: left;">
            <h3>风险与收益</h3>
            <p>本研究的风险很小，但也不会给您带来直接利益。然而，该研究将有助于促进对人类认知的理解，推动自动化系统的开发，使其能够更好地解决高计算复杂性的问题。</p>
            <p>尽管您可能会对某些问题感到轻微不适，但可以选择在实验的任何阶段退出，而不会受到任何惩罚。</p>

            <h3>保密原则</h3>
            <p>我们不会要求您提供任何身份信息，并会尽可能保密地处理您的回答。然而，我们无法保证线上实验平台的保密性。因此，为了降低风险，任何可能识别身份的数据将在存储时加密，仅限于内部人员访问。同时，作为研究的一部分，我们可能会无限期存储收集到的数据。</p>

            <h3>研究报酬</h3>
            <p>认真完成实验并正常提交，您将获得5元人民币的报酬。如果在项目完成前退出网页或因自身设备问题无法提交数据，则不会获得任何报酬。如果对报酬有任何问题，请随时联系研究负责人。</p>

            <h3>联系方式</h3>
            <p>如果对您的权利有任何疑问，或有任何需要讨论的问题，可联系研究负责人：</p>
            <p>姓名：陈天放<br>
            机构：中山大学逻辑与认知研究所<br>
            邮箱：chentf9@mail2.sysu.edu.cn</p>

            <div style="text-align: center; margin-top: 60px; font-weight:bold">
                <p>确认阅读完毕后，点击<继续>按钮</p>
            </div>
        </div>
        `;

        return [consentPart0, consentPart1, consentPart2];
    },
    show_clickable_nav: true,
    allow_keys: false,
    button_label_previous: '返回',
    button_label_next: '继续',
    show_page_number: true,
    allow_backward: true
};

//知情确认
var confirmation = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <div class="consent-container" style="width: 80%; margin: 0 auto; text-align: left;">
        <h2 style="text-align:center">受试者声明</h2>
            <p style="font-weight:bold">本人确认：</p>
            <ol>
                <li>我已阅读并理解以上内容。</li>
                <li>我的参与是自愿的，可以随时退出研究而不会受到任何惩罚。</li>
                <li>我不会放弃任何法律权利，也不会使相关研究人员免于因疏忽而导致的法律责任。</li>
                <li>我同意成为本研究的参与者。</li>
            </ol>
            <p>若您需要重新阅读知情同意书，请刷新网页后重新进入。</p>
            <p>若您不同意参与这项研究，直接关闭本网页即可退出。</p>
            <p style="font-weight:bold">若您同意参与这项研究，请点击以下按钮，即表示您自愿签署这份知情同意书。</p>
            <div style="text-align: center; margin: 30px 0;">
            </div>
        </div>
    </div>
    `,
    choices: ['我已确认并选择参与实验'],
    on_finish: function () {
    }
};

//-------------------------------------------------九宫格-------------------------------------------------//

function mushroomModal() {
    return `
    <div id="gridOverlay" class="overlay">
    <div class="mushroom-grid">
    <!-- 顶部颜色示意行 -->
    <div class="color-row">
        <div class="empty-cell">蘑菇图鉴</div>
        <div class="color-cell">
            <img src="asset/img/mushrooms/features/Green.png" alt="Green">
            <p>绿色：${colorScores.Green}</p>
        </div>
        <div class="color-cell">
            <img src="asset/img/mushrooms/features/Red.png" alt="Red">
            <p>红色：${colorScores.Red}</p>
        </div>
        <div class="color-cell">
            <img src="asset/img/mushrooms/features/Blue.png" alt="Blue">
            <p>蓝色：${colorScores.Blue}</p>
        </div>
    </div>

    <!-- Spotted行 -->
    <div class="mushroom-row">
        <div class="type-cell">
            <img src="asset/img/mushrooms/features/Spotted.png" alt="Spotted">
            <p>斑点：${typeScores.Spotted}</p>
        </div>
        <div class="mushroom-cell">
            <img src="asset/img/mushrooms/Spotted-Green.png" alt="Spotted Green">
            <p>价值：${colorScores.Green + typeScores.Spotted}</p>
        </div>
        <div class="mushroom-cell">
            <img src="asset/img/mushrooms/Spotted-Red.png" alt="Spotted Red">
            <p>价值：${colorScores.Red + typeScores.Spotted}</p>
        </div>
        <div class="mushroom-cell">
            <img src="asset/img/mushrooms/Spotted-Blue.png" alt="Spotted Blue">
            <p>价值：${colorScores.Blue + typeScores.Spotted}</p>
        </div>
    </div>

    <!-- Solid行 -->
    <div class="mushroom-row">
        <div class="type-cell">
            <img src="asset/img/mushrooms/features/Solid.png" alt="Solid">
            <p>纯色：${typeScores.Solid}</p>
        </div>
        <div class="mushroom-cell">
            <img src="asset/img/mushrooms/Solid-Green.png" alt="Solid Green">
            <p>价值：${colorScores.Green + typeScores.Solid}</p>
        </div>
        <div class="mushroom-cell">
            <img src="asset/img/mushrooms/Solid-Red.png" alt="Solid Red">
            <p>价值：${colorScores.Red + typeScores.Solid}</p>
        </div>
        <div class="mushroom-cell">
            <img src="asset/img/mushrooms/Solid-Blue.png" alt="Solid Blue">
            <p>价值：${colorScores.Blue + typeScores.Solid}</p>
        </div>
    </div>

    <!-- Striped行 -->
    <div class="mushroom-row">
        <div class="type-cell">
            <img src="asset/img/mushrooms/features/Striped.png" alt="Striped">
            <p>条纹：${typeScores.Striped}</p>
        </div>
        <div class="mushroom-cell">
            <img src="asset/img/mushrooms/Striped-Green.png" alt="Striped Green">
            <p>价值：${colorScores.Green + typeScores.Striped}</p>
        </div>
        <div class="mushroom-cell">
            <img src="asset/img/mushrooms/Striped-Red.png" alt="Striped Red">
            <p>价值：${colorScores.Red + typeScores.Striped}</p>
        </div>
        <div class="mushroom-cell">
            <img src="asset/img/mushrooms/Striped-Blue.png" alt="Striped Blue">
            <p>价值：${colorScores.Blue + typeScores.Striped}</p>
        </div>
    </div>
    </div>
    <div style="margin-top:50px;color:#fff"> 再次点击屏幕关闭</div>
    </div>
`
}

//-------------------------------------------------蘑菇丛-------------------------------------------------//

//控制按钮
function showButton(btnType) {
    if (btnType == "instr") {
        return `<div class="info-button" id="showInfo">蘑菇丛</div>`
    } else {
        return `<div class="info-button" id="showInfo">回顾蘑菇信息</div>`
    }
}

function mushroomPatch(avatarImg, listenerName, msrList, featureList, valueList, btnType) {
    // 生成唯一ID
    const uniqueId = 'mushroom-' + Math.random().toString(36).substr(2, 9);
    return `
        <div class="containerL">
        <!-- 人物对话部分 -->
        <div class="character-section">
            <img src="${avatarImg}" class="avatar" alt="listener avatar">
            <div class="verticleMid">
                <p class="dialogue">${listenerName} 正在参观这片蘑菇丛</p>
                <p class="question">你会怎么介绍？</p>
            </div>
        </div>

        <!-- 蘑菇展示区域 -->
        <div class="mushroom-container">
            <div class="mushroom-box">
                <div class="mushroom-group">
                    <!-- 三个蘑菇 -->
                    <div class="mushroom">
                        <img src="asset/img/mushrooms/${msrList[0].msr}.png" alt="mushroom 1">
                        <p class="value">价值: ${msrList[0].value}分</p>
                    </div>
                    <div class="mushroom">
                        <img src="asset/img/mushrooms/${msrList[1].msr}.png" alt="mushroom 2">
                        <p class="value">价值: ${msrList[1].value}分</p>
                    </div>
                    <div class="mushroom">
                        <img src="asset/img/mushrooms/${msrList[2].msr}.png" alt="mushroom 3">
                        <p class="value">价值: ${msrList[2].value}分</p>
                    </div>
                </div>
            </div>
        </div>
        ${mushroomModal()}
        <!-- 信息按钮 -->
        ${showButton(btnType)}
        <!-- 选择区域 -->
        <div class="selection-area">
            <select class="feature-select" name ="feature" required>
                <option value="">选择特征</option>
                <option value="${featureList[0]}">${featureList[0]}</option>
                <option value="${featureList[1]}">${featureList[1]}</option>
                <option value="${featureList[2]}">${featureList[2]}</option>
                <option value="${featureList[3]}">${featureList[3]}</option>
                <option value="${featureList[4]}">${featureList[4]}</option>
                <option value="${featureList[5]}">${featureList[5]}</option>
            </select>
            <span>价值</span>
            <select class="value-select" name="value" required>
                <option value="">选择价值</option>
                <option value="${valueList[0]}">${valueList[0]}</option>
                <option value="${valueList[1]}">${valueList[1]}</option>
                <option value="${valueList[2]}">${valueList[2]}</option>
                <option value="${valueList[3]}">${valueList[3]}</option>
                <option value="${valueList[4]}">${valueList[4]}</option>
            </select>
            <span>分</span>
        </div>
        </div>
        <script>
            (function() {
                function initEvents() {
                    const container = document.getElementById('${uniqueId}');
                    if (!container) return;
                    
                    const button = container.querySelector('.info-button');
                    const overlay = container.querySelector('.overlay');
                    
                    if (button && overlay) {
                        button.addEventListener('click', function(e) {
                            e.stopPropagation();
                            overlay.style.display = 'block';
                        });

                        document.addEventListener('click', function(e) {
                            if (e.target.classList.contains('overlay')) {
                                overlay.style.display = 'none';
                            }
                        });
                    }
                }

                // 尝试立即初始化
                initEvents();

                // 如果立即初始化失败，等待DOM加载完成后再试
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', initEvents);
                }

                // 为了确保一定能初始化，添加一个延迟尝试
                setTimeout(initEvents, 100);
            })();
        </script>
    `
}

//寻找最美味和最难吃的蘑菇
function findExtremeMushroomCombinations(colorScores, typeScores) {
    let maxScore = -Infinity;
    let minScore = Infinity;
    let bestMushroom = null;
    let worstMushroom = null;

    // 遍历所有可能的组合
    for (let color in colorScores) {
        for (let type in typeScores) {
            const totalScore = colorScores[color] + typeScores[type];

            // 更新最高分蘑菇
            if (totalScore > maxScore) {
                maxScore = totalScore;
                bestMushroom = {
                    combination: `${type}-${color}`,
                    color: color,
                    type: type,
                    value: totalScore
                };
            }

            // 更新最低分蘑菇
            if (totalScore < minScore) {
                minScore = totalScore;
                worstMushroom = {
                    combination: `${type}-${color}`,
                    color: color,
                    type: type,
                    value: totalScore
                };
            }
        }
    }

    return {
        best: bestMushroom,
        worst: worstMushroom
    };
}

//用于查找最好和最坏的特征
function findExtremeFeatures(features) {
    if (features.length === 0) return null;

    let best = features[0];
    let worst = features[0];

    features.forEach(feature => {
        if (feature.value > best.value) best = feature;
        if (feature.value < worst.value) worst = feature;
    });

    return { best, worst };
}

//-------------------------------------------------指导语-------------------------------------------------//

let welcomeInstructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `<img src="asset/img/fungal-forest.jpg" class="fullscreen-image"><h1 class="st" style="color:#FFF1AC;margin-bottom:15px">欢迎来到真菌森林</h1>`,
    choices: [`进入森林`]
}

function experimentStructureInstructions() {
    return `
    <div class="text-left">
    <img style="float: right; margin: 0px 15px 15px 0px;" src="asset/img/mushroom-picker.jpg" width="300px" />
    <h2 class="st">采摘真菌</h2>
    真菌森林以其丰富的蘑菇而闻名。游客们从四面八方赶来采摘蘑菇。<br><br>
    然而，这里有很多种蘑菇，有些比其他的更美味！
    <br>
    <br>
    <h2>本次实验</h2>
    你将在真菌森林扮演一名 <strong>导游</strong>。
    <br><br>
    <ul>
    <li>在 <strong>说明部分</strong>，你将学习关于这片森林的知识。</li>
    <li>如果你通过 <strong>蘑菇考试</strong>，你将获得导游许可证🎫。</li>
    <li>最后，作为一名 <strong>持证导游</strong>，你将负责向游客讲解。</li>
    </ul>
    <br>
    </div>
    接下来：开始学习蘑菇知识！<br><br>
    `}

function mushroomIntroInstructions() {
    return `<h2 class="st">蘑菇：美味、难吃，还是平淡无奇？</h2><br>
        <div class="text-left">
        <img style="float: right; margin: 0px 15px 15px 0px;" src="asset/img/mushroom-intro-rainbow.png" width="300px" />
        <strong>所有的蘑菇都是可以食用的。</strong> <br>
        没有毒蘑菇。<br><br>
        然而，并不是所有的蘑菇都好吃！
        <ul>
        <li>有些蘑菇 <strong>美味</strong></li>
        <li>有些蘑菇 <strong>苦涩</strong></li>
        <li>还有些只是 <strong>淡而无味</strong></li>
        </ul>
        <br>
        </div>
        接下来：是什么让蘑菇变得美味（或者难吃）？<br><br>
    `}

function mushroomFeatureInstructions() { //这里展示颜色和特征的分数
    return `
        <h2 class="st">🍄蘑菇特征</h2>
        蘑菇有3️⃣种颜色和3️⃣种纹理。<br>
        每种 <strong>颜色</strong> 或 <strong>纹理</strong> 都有不同的美味评分！<br>
        分数越高，意味着蘑菇越美味😋。<br><br>
        <div class="horizonFlex" >
            <div>
                <img src="asset/img/mushrooms/features/Green.png" class="borderRadius"></img><br>
                <div>绿色</div>
                <div>价值&nbsp${colorScores.Green}分</div>
            </div>
            <div>
                <img src="asset/img/mushrooms/features/Blue.png" class="borderRadius"></img><br>
                <div>蓝色</div>
                <div>价值&nbsp${colorScores.Blue}分</div>
            </div>
            <div>
                <img src="asset/img/mushrooms/features/Red.png" class="borderRadius"></img><br>
                <div>红色</div>
                <div>价值&nbsp${colorScores.Red}分</div>
            </div>
            <div>
                <img src="asset/img/mushrooms/features/Spotted.png"></img><br>
                <div>斑点</div>
                <div>价值&nbsp${typeScores.Spotted}分</div>
            </div>
            <div>
                <img src="asset/img/mushrooms/features/Striped.png"></img><br>
                <div>条纹</div>
                <div>价值&nbsp${typeScores.Striped}分</div>
            </div>
            <div>
                <img src="asset/img/mushrooms/features/Solid.png"></img><br>
                <div>纯色</div>
                <div>价值&nbsp${typeScores.Solid}分</div>
            </div>
        </div>
        <br>
        现在，花点时间 <strong>学习这些特征</strong>。<br>
        你需要掌握这些知识才能获得你的许可证🎫！<br><br>`
}

function mushroomActionInstructions() { // 这里举例并展示九宫格
    let bestMushroom = findExtremeMushroomCombinations(colorScores, typeScores).best
    let worstMushroom = findExtremeMushroomCombinations(colorScores, typeScores).worst
    return `
    <h2 class="mb15 st">蘑菇</h2>
    <p class="mb15">蘑菇的 <strong>美味程度</strong> 仅仅是它的 <strong>特征总和</strong>。</p>
    <p class="mb15"><strong>这里是所有蘑菇的便捷总结。</strong></p>
    <!-- 蘑菇丛 -->
    <div class="mushroom-grid" style="width:800px;border:1px solid;background-color:#b89f8d">
    <!-- 顶部颜色示意行 -->
    <div class="color-row">
        <div class="empty-cell">蘑菇图鉴</div>
        <div class="color-cell">
            <img src="asset/img/mushrooms/features/Green.png" alt="Green">
            <p>绿色：${colorScores.Green}</p>
        </div>
        <div class="color-cell">
            <img src="asset/img/mushrooms/features/Red.png" alt="Red">
            <p>红色：${colorScores.Red}</p>
        </div>
        <div class="color-cell">
            <img src="asset/img/mushrooms/features/Blue.png" alt="Blue">
            <p>蓝色：${colorScores.Blue}</p>
        </div>
    </div>

    <!-- Spotted行 -->
    <div class="mushroom-row">
        <div class="type-cell">
            <img src="asset/img/mushrooms/features/Spotted.png" alt="Spotted">
            <p>斑点：${typeScores.Spotted}</p>
        </div>
        <div class="mushroom-cell">
            <img src="asset/img/mushrooms/Spotted-Green.png" alt="Spotted Green">
            <p>价值：${colorScores.Green + typeScores.Spotted}</p>
        </div>
        <div class="mushroom-cell">
            <img src="asset/img/mushrooms/Spotted-Red.png" alt="Spotted Red">
            <p>价值：${colorScores.Red + typeScores.Spotted}</p>
        </div>
        <div class="mushroom-cell">
            <img src="asset/img/mushrooms/Spotted-Blue.png" alt="Spotted Blue">
            <p>价值：${colorScores.Blue + typeScores.Spotted}</p>
        </div>
    </div>

    <!-- Solid行 -->
    <div class="mushroom-row">
        <div class="type-cell">
            <img src="asset/img/mushrooms/features/Solid.png" alt="Solid">
            <p>纯色：${typeScores.Solid}</p>
        </div>
        <div class="mushroom-cell">
            <img src="asset/img/mushrooms/Solid-Green.png" alt="Solid Green">
            <p>价值：${colorScores.Green + typeScores.Solid}</p>
        </div>
        <div class="mushroom-cell">
            <img src="asset/img/mushrooms/Solid-Red.png" alt="Solid Red">
            <p>价值：${colorScores.Red + typeScores.Solid}</p>
        </div>
        <div class="mushroom-cell">
            <img src="asset/img/mushrooms/Solid-Blue.png" alt="Solid Blue">
            <p>价值：${colorScores.Blue + typeScores.Solid}</p>
        </div>
    </div>

    <!-- Striped行 -->
    <div class="mushroom-row">
        <div class="type-cell">
            <img src="asset/img/mushrooms/features/Striped.png" alt="Striped">
            <p>条纹：${typeScores.Striped}</p>
        </div>
        <div class="mushroom-cell">
            <img src="asset/img/mushrooms/Striped-Green.png" alt="Striped Green">
            <p>价值：${colorScores.Green + typeScores.Striped}</p>
        </div>
        <div class="mushroom-cell">
            <img src="asset/img/mushrooms/Striped-Red.png" alt="Striped Red">
            <p>价值：${colorScores.Red + typeScores.Striped}</p>
        </div>
        <div class="mushroom-cell">
            <img src="asset/img/mushrooms/Striped-Blue.png" alt="Striped Blue">
            <p>价值：${colorScores.Blue + typeScores.Striped}</p>
        </div>
    </div>
    </div>
    <br>
    <div class="horizonFlex" style=";justify-content:center;width:400px}">
        <div>
            <img src ="asset/img/mushrooms/${bestMushroom.combination}.png" class="mb15"><br>
            <p>价值${bestMushroom.value}分</p>
            <p>这种蘑菇是 <strong>美味的</strong>！</p>
        </div>
        <div>
            <img src ="asset/img/mushrooms/${worstMushroom.combination}.png" class="mb15"><br>
            <p>价值${worstMushroom.value}分</p>
            <p>这种蘑菇是 <strong>苦涩的</strong>！</p>
        </div>
    </div><br>
`}

function patchInstructions() {
    return `
        <h2 class="mb15 st">蘑菇丛</h2><br>
        <p class="mb15">蘑菇通常以 <strong>三个一组</strong> 的形式生长。</p>
        <p class="mb15"><strong>所有蘑菇的出现概率相同</strong>，</p>
        <p >任何一种蘑菇都有相同概率与其他蘑菇一起生长。</p><br><br>`
}

function teachingInstructions() {
    return `
        <h2 class="mb15 st">指导游客</h2>
        <p class="mb15">在他们做出选择之前，你可以告诉他们一个特征。<br></p>
        <div class='center flex-person-wrap'>
        ${mushroomPatch(avatarImg, listenerName, msrList, featureList, valueList, "instr")}
        <p class="mb15"><strong>游客对蘑菇一无所知</strong>。<br></p>
        你是他们唯一的信息来源。<br>`
}

function utilityInstructions() {
    // 使用示例
    const features = [
        { name: '绿色', value: colorScores.Green },
        { name: '蓝色', value: colorScores.Blue },
        { name: '红色', value: colorScores.Red },
        { name: '纯色', value: typeScores.Solid },
        { name: '条纹', value: typeScores.Striped },
        { name: '斑点', value: typeScores.Spotted }
    ];
    let extreme = findExtremeFeatures(features)
    return `
        <h2 class="mb15 st">作为导游的职责</h2>
        <div style="padding: 10px; border: 3px solid black;">
            <p class="mb15"><strong>你的任务是确保游客选择美味的蘑菇。</strong></p>
            <p class="mb15">你说实话还是撒谎都无所谓。</p>
            <p class="mb15"><strong>你可以撒谎。</strong></p>
        </div>
        ${mushroomPatch(avatarImg, listenerName, msrList, featureList, valueList, "instr")}
        <p class="mb15">这里你可以说 “<strong>${extreme.best.name} 价值 ${extreme.best.value}</strong>”，</p>
        <p class="mb15">或者 “<strong>${extreme.worst.name} 价值 ${extreme.worst.value}</strong>”。</p>
        <p class="mb15">这些说法会鼓励 Aiden 选择一个好的蘑菇！</p>
        <p class="mb15">相反，你不应该说 “<strong>${extreme.worst.name} 价值 ${extreme.best.value}</strong>”。</p>
        <p >这样 ${listenerName} 可能会选到一个苦涩的蘑菇！</p><br>`
}

function beliefInstructions() {

    return `    
        <h2 class="mb15 st">作为导游的职责</h2>
        <div style="padding: 10px; border: 3px solid black;">
            <p class="mb15"> <strong>你的任务是教游客有关蘑菇特征的事实。</strong></p>
            <p class="mb15">游客选择哪些蘑菇并不重要。</p>
            <p class="mb15"><strong>你始终只能陈述真实的事实。</strong></p>
        </div>
        ${mushroomPatch(avatarImg, listenerName, msrList, featureList, valueList, "instr")}
        <br>
             <p class="mb15">例如，始终正确的说法为“<strong>红色 价值 ${colorScores.Red}分</strong>”，</p>
             <p class="mb15">或者 “<strong>蓝色 价值 ${colorScores.Blue}分</strong>”。</p>
             <p class="mb15">这些都是关于蘑菇特征的真实事实。</p>
            <br>
             <p class="mb15">相反，你不应该说 “<strong>条纹 价值 ${typeScores.Solid}分</strong>”。</p>
             <p>这是一个错误的陈述。</p><br>
`}

function studyHallInstructions(repetition) {
    return `
        <h2 class="mb15 st">👩‍🏫真菌森林 · 导游认证考试</h2>
         <p class="mb15">现在是时候参加考试了！</p>
         <p class="mb15">你必须答对所有问题才能继续。</p>
        <br>
         <p class="mb15"><strong>如果你失败 3 次，实验将会结束，</p>
         <p class="mb15">并且你将无法获得完成奖励。</strong></p>
        <br>
         <p class="mb15">你还有 <strong>${3 - repetition}</strong> 次尝试机会。</p>
         <p class="mb15 st">答错会扣除一次机会，并且重新回到教学阶段。</p>
         <p class="mb15">点击 "上一步" 进行回顾，或点击 "继续" 进行考试。</p>
         <p >祝你好运🍀！</p><br>
`}

let instructionsBlock = {
    type: jsPsychInstructions,
    pages: function () {
        if (group == "truth") {
            instructionsMap = beliefInstructions()
        } else if (group == "relevance") {
            instructionsMap = utilityInstructions()
        } else if (group == "unbias") {
            instructionsMap = teachingInstructions()
        }
        return [
            experimentStructureInstructions(),
            mushroomIntroInstructions(),
            mushroomFeatureInstructions(),
            mushroomActionInstructions(),
            patchInstructions(),
            instructionsMap,
            studyHallInstructions(repetition)
        ]
    },
    show_clickable_nav: true,
    allow_keys: false,
    button_label_previous: '返回',
    button_label_next: '继续',
    show_page_number: true,
    allow_backward: true
}



//-------------------------------------------------问卷-------------------------------------------------//



// 定义量表选项
const likert_scale = ['非常不同意', '不同意', '中立', '同意', '非常同意'];
const value_scale = [-2, -1, 0, 1, 2];
const specific_value_scale = [-3, -2, -1, 0, 1, 2, 3];
const count_scale = [1, 2, 3, 4, 5];
const negative_value_scale = [-5, -4, -3, -2, -1];

// ambiguousTourismQuiz
var ambiguousTourismQuiz = {
    type: jsPsychSurveyMultiChoice,
    questions: [
        {
            prompt: "你作为导游的任务是什么？", //1
            options: ["防止游客践踏蘑菇丛", "给游客讲讲蘑菇的特征", "教导游客有关森林动物的知识", "给游客展示哪里可以找到蘑菇"],
            required: true
        },
        {
            prompt: "关于所有蘑菇，什么是正确的？",//1
            options: ["它们很美味", "它们可以吃", "它们有毒", "它们受法律保护"],
            required: true
        },
        {
            prompt: "你可以告诉游客以下哪条信息？",//2
            options: ["远离蘑菇丛", "中间的蘑菇是最好的", `斑点价值${typeScores.Spotted}分`, "蘑菇通常在大雨后生长"],
            required: true
        }
    ],
    button_label: "继续",
    on_finish: function (data) {
        if (data.response.Q0 == "给游客讲讲蘑菇的特征" && data.response.Q1 == "它们可以吃" && data.response.Q2 == `斑点价值${typeScores.Spotted}分`) {
            TourismQuizPass = true
        }
    }
};

if (group === 'truth') {
    aboutObjective = "教会游客关于蘑菇特征的事实"
    aboutLie = "不可以，撒谎是不被允许的"
    aboutChoice = "不重要，游客选择什么蘑菇不重要"
} else if (group === 'relevance') {
    aboutObjective = "确保游客选到最美味的蘑菇"
    aboutLie = "可以，撒谎是允许的"
    aboutChoice = "重要，我们希望游客选到最美味的蘑菇"
}

// objectiveTourismQuiz
var objectiveTourismQuiz = {
    type: jsPsychSurveyMultiChoice,
    questions: [
        {
            prompt: "你作为导游的任务是什么？",//3
            options: ["防止游客践踏蘑菇丛", "教导游客有关森林动物的知识", "给游客展示哪里可以找到蘑菇", aboutObjective],
            required: true
        },
        {
            prompt: "导游是否被允许对蘑菇特征撒谎？",//动态
            options: ["不可以，撒谎是不被允许的", "可以，撒谎是允许的"],
            required: true
        },
        {
            prompt: "游客选择哪种蘑菇重要吗？",//动态
            options: ["不重要，游客选择什么蘑菇不重要", "重要，我们希望游客选到最美味的蘑菇"],
            required: true
        }
    ],
    button_label: "继续",
    on_finish: function (data) {
        if (data.response.Q0 == aboutObjective && data.response.Q1 == aboutLie && data.response.Q2 == aboutChoice) {
            TourismQuizPass = true
        }
    }
};

// colorQuiz
var colorQuiz = {
    type: jsPsychSurveyMultiChoice,
    questions: [
        {
            prompt: "“红色”价值多少？",//动态
            options: value_scale,
            required: true,
            horizontal: true
        },
        {
            prompt: "“绿色”价值多少？",//动态
            options: value_scale,
            required: true,
            horizontal: true
        },
        {
            prompt: "“蓝色”价值多少？",//动态
            options: value_scale,
            required: true,
            horizontal: true
        }
    ],
    button_label: "继续",
    on_finish: function (data) {
        console.log(data.response);
        if (data.response.Q0 == colorScores.Red && data.response.Q1 == colorScores.Green && data.response.Q2 == colorScores.Blue) {
            colorQuizPass = true
        }
    }
};

// textureQuiz
var textureQuiz = {
    type: jsPsychSurveyMultiChoice,
    questions: [
        {
            prompt: "“斑点”价值多少？",//动态
            options: value_scale,
            required: true,
            horizontal: true
        },
        {
            prompt: "“条纹”价值多少？",//动态
            options: value_scale,
            required: true,
            horizontal: true
        },
        {
            prompt: "“纯色”价值多少？",//动态
            options: value_scale,
            required: true,
            horizontal: true
        }
    ],
    button_label: "继续",
    on_finish: function (data) {
        if (data.response.Q0 == typeScores.Spotted && data.response.Q1 == typeScores.Striped && data.response.Q2 == typeScores.Solid) {
            textureQuizPass = true
        }
    }
};

// generalMushroomQuiz
var generalMushroomQuiz = {
    type: jsPsychSurveyMultiChoice,
    questions: [
        {
            prompt: "每个蘑菇丛里有几个蘑菇？",//2
            options: count_scale,
            required: true,
            horizontal: true
        },
        {
            prompt: "游客在一片蘑菇丛中能采几个蘑菇？",//0
            options: count_scale,
            required: true,
            horizontal: true
        },
        {
            prompt: "最不值钱的蘑菇值多少？",//2
            options: negative_value_scale,
            required: true,
            horizontal: true
        },
        {
            prompt: "最值钱的蘑菇值多少？",//2
            options: count_scale,
            required: true,
            horizontal: true
        }
    ],
    button_label: "继续",
    on_finish: function (data) {
        if (data.response.Q0 == count_scale[2] && data.response.Q1 == count_scale[0] && data.response.Q2 == negative_value_scale[2] && data.response.Q3 == count_scale[2]) {
            generalQuizPass = true
        }
    }
};

// specificMushroomQuiz
var specificMushroomQuiz = {
    type: jsPsychSurveyMultiChoice,
    questions: [
        {
            prompt: "“蓝色条纹蘑菇”价值多少？",//动态
            options: specific_value_scale,
            required: true,
            horizontal: true
        },
        {
            prompt: "“绿色斑点蘑菇”价值多少？",//动态
            options: specific_value_scale,
            required: true,
            horizontal: true
        },
        {
            prompt: "“红色纯色蘑菇”价值多少？",//动态
            options: specific_value_scale,
            required: true,
            horizontal: true
        }
    ],
    button_label: "继续",
    on_finish: function (data) {
        let blueStriped = colorScores.Blue + typeScores.Striped
        let greenSpotted = colorScores.Green + typeScores.Spotted
        let redSolid = colorScores.Red + typeScores.Solid
        if (data.response.Q0 == blueStriped && data.response.Q1 == greenSpotted && data.response.Q2 == redSolid) {
            specificQuizPass = true
        }
    }
};

//-------------------------------------------------测验循环--------------------------------------//
//---------------------------------------------分组---------------------------------------------//

let TourismQuizMatch

if (group == "truth" || group == "relevance") {
    TourismQuizMatch = objectiveTourismQuiz
} else {
    TourismQuizMatch = ambiguousTourismQuiz
}

// 生成0-27中随机8个不重复的数字数组
function generateRandomNumbers() {
    const numbers = Array.from({length: 28}, (_, i) => i); // 创建0-27的数组
    const result = [];
    
    // 随机选择8个数字
    for(let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        result.push(numbers[randomIndex]);
        numbers.splice(randomIndex, 1); // 移除已选择的数字
    }
    
    return result;
}

let randomNumbers

function TourismQuizLoop() {
    return {
        timeline: [instructionsBlock, TourismQuizMatch, colorQuiz, textureQuiz, generalMushroomQuiz, specificMushroomQuiz],
        randomize_order: true,
        loop_function: function () {
            if (repetition < 2) {
                if (TourismQuizPass && colorQuizPass && textureQuizPass && generalQuizPass && specificQuizPass) {
                    jsPsych.addNodeToEndOfTimeline(congratulation);
                    for(let i = 0;i < 3; i++){
                        randomNumbers = generateRandomNumbers(); //生成注意检查的随机序号
                        if(i > 0){
                            jsPsych.addNodeToEndOfTimeline(rest(i));//加入休息试次
                        }
                        for(let j = 0; j < 28; j ++){
                            if (randomNumbers.includes(j)){
                                const attentionOBJ = attentionList.shift();
                                jsPsych.addNodeToEndOfTimeline(attentionCheck(attentionOBJ))//插入8个注意力检查
                            }
                            console.log(j + (i)*28);
                            jsPsych.addNodeToEndOfTimeline(trialCore(expList[j + (i)*28]))//插入主试次
                        }
                    }
                    jsPsych.addNodeToEndOfTimeline(exit_fullscreen);
                    jsPsych.addNodeToEndOfTimeline(end);
                    return false;
                } else {
                    repetition += 1
                    return true;
                }
            } else {
                jsPsych.addNodeToEndOfTimeline(fail);
                return false;
            }
        }
    }
}

//-------------------------------------------------主实验-------------------------------------------------//
function trialCore(trialParameter) {
    return {
    type: jsPsychSurveyHtmlForm,
    html: function () {
        featureList.shuffle()
        valueList.shuffle()
        listenerName = trialParameter.listenerName
        avatarImg = "asset/img/people/" + listenerName + ".png"
        msrList = trialParameter.msrList
        return mushroomPatch(avatarImg, listenerName, msrList, featureList, valueList, "exp")
    },
    autofocus: 'test-resp-box',
    button_label: "确认",
    on_load: function () {
        document.getElementById('gridOverlay').style.display = 'none'
        document.getElementById("showInfo").addEventListener("click", function (event) {
            let overlay = document.getElementById("gridOverlay");
            overlay.style.display = "block";
            // 阻止点击 button 触发 document 的点击事件
            event.stopPropagation();
        });
        // 监听整个页面的点击事件，点击任意地方隐藏 overlay
        document.addEventListener("click", function (event) {
            let overlay = document.getElementById("gridOverlay");
            if (overlay.style.display === "block") {
                overlay.style.display = "none";
            }
        });
    },
    on_finish(data){
        data.mushroom1 = trialParameter.msrList[0]
        data.mushroom2 = trialParameter.msrList[1]
        data.mushroom3 = trialParameter.msrList[2]
        data.feature = data.response.feature
        data.value = data.response.value
    }
}
};

let block1 = {
    timeline: [trialCore],
    timeline_variables: expList1,
    randomize_order: true
}

let block2 = {
    timeline: [trialCore],
    timeline_variables: expList2,
    randomize_order: true
}

//-------------------------------------------------组件-------------------------------------------------//
//全屏
var enter_fullscreen = {
    type: jsPsychFullscreen,
    fullscreen_mode: true,
    message: `
    <div style="margin-bottom:20px">请点击下方按钮进入全屏模式进行实验</div>
    <div style="margin-bottom:20px">实验过程中切勿离开全屏模式</div>
    `,
    button_label: '进入全屏'
}

//离开全屏
var exit_fullscreen = {
    type: jsPsychFullscreen,
    fullscreen_mode: false
}

//通过测验
let congratulation = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <div class="break-container">
        <p class="break-message">🎉太棒了</p>
        <p class="break-message">你通过了所有的测验，获得了导游资格证🎫</p>
        <p class="break-message">现在，点击下方按钮，正式开始接待游客</p>
    </div>
    `,
    enable_button_after: 100, //设置强制休息时间
    choices: ["开始接待"],
    on_finish:function(data){
        data.group = group
        data.featureMatrix = [
            {绿:colorScores.Green},
            {红:colorScores.Red},
            {蓝:colorScores.Blue},
            {斑点:typeScores.Spotted},
            {条纹:typeScores.Striped},
            {纯色:typeScores.Solid}
        ]
    }
}

//休息
function rest(index){
    return {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <div class="break-container">
        <p class="break-message">☕️您已完成了一部分实验，请耐心地休息一会儿。</p>
        <p class="break-message">当前进度${index}/3</p>
        <p class="break-message">准备好后，点击下方按钮继续。</p>
    </div>
    `,
    enable_button_after: 100, //设置强制休息时间
    choices: ["继续实验"]
    }
}

//注意力检查
function attentionCheck(attentionOBJ){
    return {
    type: jsPsychSurveyMultiChoice,
    questions: [
        {
            prompt: `请选择右边的字母 ➡ ${attentionOBJ.stim}`, //1
            options: [attentionOBJ.choice1,attentionOBJ.choice2],
            required: true
        }
    ],
    button_label: "继续",
    on_finish: function (data) {
        data.attentionStimuli = attentionOBJ.stim
        data.attentionChoice = data.response.Q0
        if (data.response.Q0 == attentionOBJ.stim) {
            data.attentionCheck = "pass"
        }else {
            data.attentionCheck = "fail"
        }
    }
}}

//实验失败
let fail = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <p style="margin-bottom: 15px;font-size: 1.4em;line-height:2">
      ⚠️失败次数已达最大上限：3
        <br>
        很抱歉，由于失败次数过多，实验自动结束
        <br>
        感谢你的参与。
      </p>`,
    choices: ['结束']
}

//结束语
let end = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <p style="margin-bottom: 15px;font-size: 1.4em;line-height:2">
      实验已完成，辛苦了☕
        <br>
        非常感谢您在百忙之中抽出时间参与我们的心理学实验。
        <br>
        您的参与对于我们的研究具有不可估量的价值。
        <br>
        通过您在实验中的表现，我们获得了珍贵的数据，这些数据将为心理学的发展添砖加瓦。
        <br>
        如果您对实验有任何疑问或者建议，随时与我们交流，您的反馈对我们至关重要。
        <br>
        再次向您表示最诚挚的感谢！愿您的生活充满阳光，幸福安康 :)
      </p>`,
    choices: ['结束'],
    extensions: [
        {type: Naodao}
    ]
};


timeline.push(
    enter_fullscreen,
    instruction_consent, 
    confirmation,
    welcomeInstructions, 
    TourismQuizLoop(),
)

jsPsych.run(timeline);