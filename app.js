import ancientsData from './data/ancients.js';
import cardsGreenData from './data/mythicCards/green/index.js';
import cardsBrownData from './data/mythicCards/brown/index.js';
import cardsBlueData from './data/mythicCards/blue/index.js';


let libGreen = [];
let libBrown = [];
let libBlue = [];
let defDeck = [];
let curDeck = [];
let curCardSetConf = {};
let stages = [];
let greenNum, brownNum, blueNum;
let curLevel;
let curTable;
let stage1Cards, stage2Cards, stage3Cards;
let finalStack =[];
/*-----get initial cards lib --START-----*/
function createCardLib() {
    libGreen.splice(0, libGreen.length);
    libBrown.splice(0, libBrown.length);
    libBlue.splice(0, libBlue.length);
    libGreen.push.apply(libGreen, cardsGreenData);
    libBrown.push.apply(libBrown, cardsBrownData);
    libBlue.push.apply(libBlue, cardsBlueData);
    defDeck = [libGreen, libBrown, libBlue];
}
createCardLib();
console.log('Default Decks: ');
console.log(defDeck);
/*-----get cards lib ---END----*/
/*---Helper function get random number-----*/
function getRandNum(max) {
    return Math.floor(Math.random() * (max + 1));
}
const ancDataList = ancientsData.slice();
const ancPicList = document.querySelector('.ancients-container');
ancPicList.addEventListener('click', createAncCardSet);

/*---Create ancients Pics list----*/
function createAncPicList() {
    ancDataList.forEach((el) => {
        const ancPic = document.createElement('div');
        ancPicList.append(ancPic);
        ancPic.classList.add('ancient-card');
        ancPic.setAttribute('style', `background-image: url('${el.cardFace}')`);
        ancPic.setAttribute('id', `${el.id}`);
    });
}
createAncPicList();

/*---Create and display active card set config (choose ancient) and display deck table----*/


function createAncCardSet(e) {
    if (e.target.classList.contains('ancient-card')) {
        const ancActiveList = document.querySelectorAll('.option-active');
        resetFinal();
            const deck = document.querySelector('.deck');
            const deckCover = document.querySelector('.deck-cover');
            deck.classList.remove('option-active');
            deckCover.classList.remove('deck-cover-active');
            const btnActiveList = document.querySelectorAll('.btn-option-active');
            document.querySelector('#shuffle').classList.remove('option-active');

        if (ancActiveList) {
            ancActiveList.forEach((el) => {
                if (el.classList.contains('option-active') && (el.id !== e.target.id)) {
                    el.classList.remove('option-active');
                }
            });
        }
        if (!e.target.classList.contains('option-active')) {
            let ind = ancientsData.findIndex(el => el.id === e.target.id);
            Object.assign(curCardSetConf, ancientsData[ind]);
            e.target.classList.add('option-active');
            showcurCardSetConf();
            greenNum = curCardSetConf.firstStage.greenCards + curCardSetConf.secondStage.greenCards + curCardSetConf.thirdStage.greenCards;
            brownNum = curCardSetConf.firstStage.brownCards + curCardSetConf.secondStage.brownCards + curCardSetConf.thirdStage.brownCards;
            blueNum = curCardSetConf.firstStage.blueCards + curCardSetConf.secondStage.blueCards + curCardSetConf.thirdStage.blueCards;

        }
    }
    console.log(curCardSetConf);
}

/*-----Display deck table----------*/
function resetFinal () {
    const deck = document.querySelector('.deck');
    if (deck.classList.contains('option-active')) {
        const lastCard = document.querySelector('.last-card');
        lastCard.setAttribute('style', `background-image: none`);
        finalStack.splice(0,finalStack.length);
        stage1Cards.splice(0,stage1Cards.length);
        stage2Cards.splice(0,stage2Cards.length);
        stage3Cards.splice(0,stage3Cards.length);
        showcurCardSetConf();
    }
   
}
function showcurCardSetConf() {
    if (curCardSetConf) {
        const ancSetTable = document.querySelectorAll('.dot');
        stages.splice(0, stages.length);
        finalStack.splice(0, stages.length);
        let cardSetKeys = Object.keys(curCardSetConf);
        cardSetKeys.forEach((el) => {
            if (el.includes('first')) {
                stages.push(curCardSetConf[el].greenCards, curCardSetConf[el].brownCards, curCardSetConf[el].blueCards);
            }
            if (el.includes('second')) {
                stages.push(curCardSetConf[el].greenCards, curCardSetConf[el].brownCards, curCardSetConf[el].blueCards);
            }
            if (el.includes('third')) {
                stages.push(curCardSetConf[el].greenCards, curCardSetConf[el].brownCards, curCardSetConf[el].blueCards);
                curTable = {
                    stage1: {
                        green: stages[0],
                        brown: stages[1],
                        blue: stages[2],   
                    },
                    stage2: {
                        green: stages[3],
                        brown: stages[4],
                        blue: stages[5],   
                    },
                    stage3: {
                        green: stages[6],
                        brown: stages[7],
                        blue: stages[8],   
                    },
                };
                console.log(stages);
                
                for (let i = 0; i < ancSetTable.length; i++) {
                    ancSetTable[i].textContent = stages[i];
                }
            }
        });
    }
}


/*-------Choose click curLevel ----START-------*/
const levelBtns = document.querySelector('.difficulty-container');
levelBtns.addEventListener('click', setLevel);

function setLevel(e) {
    if (curCardSetConf.id) {
       


        if (e.target.classList.contains('button') && e.target.id !== 'shuffle') {
            resetFinal();
            const deck = document.querySelector('.deck');
            const deckCover = document.querySelector('.deck-cover');
            deck.classList.remove('option-active');
            deckCover.classList.remove('deck-cover-active');
            const btnActiveList = document.querySelectorAll('.btn-option-active');

            if (btnActiveList) {
                btnActiveList.forEach((el) => {
                    if (el.classList.contains('btn-option-active') && (el.id !== e.target.id)) {
                        el.classList.remove('btn-option-active');
                    }
                });
            }
            if (!e.target.classList.contains('btn-option-active')) {
                curLevel = e.target.id;
                e.target.classList.add('btn-option-active');

                document.querySelector('#shuffle').classList.add('option-active');
            }
        }
    } else if (e.target.classList.contains('button') && e.target.id !== 'shuffle') {
        alert('Choose ancient first');
    }

}
/*-------Choose click curLevel ----END-------*/

/*-------get cards for curDeck-----------*/
/*---Helper function shuffle input array------------*/
function shuffle(arrInput) {
    let array = [];
    array.push.apply(array, arrInput);
    let j, temp;
    let i = array.length - 1;
    while (i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[j];
        array[j] = array[i];
        array[i] = temp;
        i--;
    }
    return array;
}
/*--functions for chosen level------*/
function levVeryEasy() {
    let arr = [];
    arr.push.apply(arr, defDeck);
    const hard=[
        arr[0].filter(elem => elem.difficulty === 'hard'),
        arr[1].filter(elem => elem.difficulty === 'hard'),
        arr[2].filter(elem => elem.difficulty === 'hard')
    ]; 
    let ar = [];
    arr.forEach((el) => {
        el = el.filter((elem) => {
            return elem.difficulty !== 'hard';
        });
        ar.push(el);
    });
    
    const snow=[
        ar[0].filter(elem => elem.difficulty === 'easy'),
        ar[1].filter(elem => elem.difficulty === 'easy'),
        ar[2].filter(elem => elem.difficulty === 'easy')
    ]; 
    const normal = [
        ar[0].filter(elem => elem.difficulty === 'normal'),
        ar[1].filter(elem => elem.difficulty === 'normal'),
        ar[2].filter(elem => elem.difficulty === 'normal')
    ];
    function veryEasyDeck(easy,normal,num) {
        if(num>easy.length) {
            console.log('snow< then number needed');
        return shuffle(easy).concat(shuffle(normal).slice(0,num-easy.length));
        } else {
            return shuffle(easy).slice(0,num);
        }
    } 
    console.log('DefDeck: ');
    console.log(defDeck);
    console.log('hard:');
    console.log(hard);
    console.log('snow:');
    console.log(snow);
    console.log('normal:');
    console.log(normal);
    console.log('numbers needed:'+'gr: '+greenNum,'br: '+brownNum,'bl: '+blueNum);
    console.log('snowflakes:'+'gr: '+snow[0].length,'br: '+snow[1].length,'bl: '+snow[2].length);
    
      curDeck=[
        shuffle(veryEasyDeck(snow[0],normal[0],greenNum)),
        shuffle(veryEasyDeck(snow[1],normal[1],brownNum)),
        shuffle(veryEasyDeck(snow[2],normal[2],blueNum))
    ];
    console.log(curDeck);
    divideToStages();
}
function levEasy() {
    let arr = [];
    arr.push.apply(arr, defDeck);
    let ar = [];
    arr.forEach((el) => {
        el = el.filter((elem) => {
            return elem.difficulty !== 'hard';
        });
        ar.push(el);
    });
    curDeck = [shuffle(ar[0]).slice(0, greenNum), shuffle(ar[1]).slice(0, brownNum), shuffle(ar[2]).slice(0, blueNum)];
    curDeck = [shuffle(curDeck[0]), shuffle(curDeck[1]), shuffle(curDeck[2])];
    
    divideToStages();
}


function levMedium() {
    let ar = [];
    ar.push.apply(ar, defDeck);

    curDeck = [shuffle(ar[0]).slice(0, greenNum), shuffle(ar[1]).slice(0, brownNum), shuffle(ar[2]).slice(0, blueNum)];
    curDeck = [shuffle(curDeck[0]), shuffle(curDeck[1]), shuffle(curDeck[2])];

    divideToStages();
}

function levHard() {
    let arr = [];
    arr.push.apply(arr, defDeck);
    let ar = [];
    arr.forEach((el) => {
        el = el.filter((elem) => {
            return elem.difficulty !== 'easy';
        });
        ar.push(el);
    });
    curDeck = [shuffle(ar[0]).slice(0, greenNum), shuffle(ar[1]).slice(0, brownNum), shuffle(ar[2]).slice(0, blueNum)];
    curDeck = [shuffle(curDeck[0]), shuffle(curDeck[1]), shuffle(curDeck[2])];

    divideToStages();
}
function levExpert() {
    
    let arr = [];
    arr.push.apply(arr, defDeck);
    const snow=[
        arr[0].filter(elem => elem.difficulty === 'easy'),
        arr[1].filter(elem => elem.difficulty === 'easy'),
        arr[2].filter(elem => elem.difficulty === 'easy')
    ]; 
    let ar = [];
    arr.forEach((el) => {
        el = el.filter((elem) => {
            return elem.difficulty !== 'easy';
        });
        ar.push(el);
    });
    
    const hard=[
        ar[0].filter(elem => elem.difficulty === 'hard'),
        ar[1].filter(elem => elem.difficulty === 'hard'),
        ar[2].filter(elem => elem.difficulty === 'hard')
    ]; 
    const normal = [
        ar[0].filter(elem => elem.difficulty === 'normal'),
        ar[1].filter(elem => elem.difficulty === 'normal'),
        ar[2].filter(elem => elem.difficulty === 'normal')
    ];
    function veryEasyDeck(hard,normal,num) {
        if(num>hard.length) {
            console.log('hard< then number needed');
        return shuffle(hard).concat(shuffle(normal).slice(0,num-hard.length));
        } else {
            return shuffle(hard).slice(0,num);
        }
    } 
    console.log('DefDeck: ');
    console.log(defDeck);
    console.log('snow:');
    console.log(snow);
    console.log('palps:');
    console.log(hard);
    console.log('normal:');
    console.log(normal);
    console.log('numbers needed:'+'gr: '+greenNum,'br: '+brownNum,'bl: '+blueNum);
    console.log('palps:'+'gr: '+hard[0].length,'br: '+hard[1].length,'bl: '+hard[2].length);
    
      curDeck=[
        shuffle(veryEasyDeck(hard[0],normal[0],greenNum)),
        shuffle(veryEasyDeck(hard[1],normal[1],brownNum)),
        shuffle(veryEasyDeck(hard[2],normal[2],blueNum))
    ];
    console.log(curDeck);
    divideToStages();
}


const shuffleBtn = document.querySelector('#shuffle');
shuffleBtn.addEventListener('click', shuffleDeck);

function shuffleDeck() {
    if (!curLevel) {
        alert('choose level first');
    } else { 
        if (curLevel === 'very-easy') {
            resetFinal ();
            levVeryEasy();
            console.log(curLevel);
            
        }
        if (curLevel === 'easy') {
            resetFinal ();
            levEasy();
            console.log(curLevel);
            
        }
        if (curLevel === 'medium') {
            resetFinal ();
            levMedium();
            console.log(curLevel);
            
        }
        if (curLevel === 'hard') {
            resetFinal ();
            levHard();
            console.log(curLevel);
            
        }
        if (curLevel === 'expert') {
            resetFinal ();
            levExpert();
            console.log(curLevel);
            
        }
        const deck = document.querySelector('.deck');
        const deckCover = document.querySelector('.deck-cover');
        if (!deck.classList.contains('option-active')) {
            deck.classList.add('option-active');
            deckCover.classList.add('deck-cover-active');
        } 
    }
}
/*------create miniDecks for each stage-----------*/
function divideToStages() {
    stage1Cards = curDeck[0].splice(0, curCardSetConf.firstStage.greenCards).concat(curDeck[1].splice(0, curCardSetConf.firstStage.brownCards), curDeck[2].splice(0, curCardSetConf.firstStage.blueCards));
    stage1Cards = shuffle(stage1Cards);

    stage2Cards = curDeck[0].splice(0, curCardSetConf.secondStage.greenCards).concat(curDeck[1].splice(0, curCardSetConf.secondStage.brownCards), curDeck[2].splice(0, curCardSetConf.secondStage.blueCards));
    stage2Cards = shuffle(stage2Cards);

    stage3Cards = curDeck[0].splice(0, curCardSetConf.thirdStage.greenCards).concat(curDeck[1].splice(0, curCardSetConf.thirdStage.brownCards), curDeck[2].splice(0, curCardSetConf.thirdStage.blueCards));
    stage3Cards = shuffle(stage3Cards);
    console.log('stage1 cards:');
    console.log(stage1Cards);
    console.log('stage2 cards:');
    console.log(stage2Cards);
    console.log('stage3 cards:');
    console.log(stage3Cards);
}

/*-----final stack-------*/


const deckBtn = document.querySelector('.deck');
deckBtn.addEventListener('click',takeCard);

function takeCard (e) {
    if(e.target.id==='deck') {
    const dotTable = document.querySelectorAll('.dot');
    
     const dotTableIndMap = {
    stage1: {
        green: 0,
        brown: 1,
        blue: 2,   
    },
    stage2: {
        green: 3,
        brown: 4,
        blue: 5,   
    },
    stage3: {
        green: 6,
        brown: 7,
        blue: 8,   
    },
}; 
const lastCard = document.querySelector('.last-card');

    let curCard;
    let randInd;
   if(stage1Cards.length!==0) {
        randInd=getRandNum(stage1Cards.length-1);
curCard =stage1Cards.slice(randInd,randInd+1);
curTable.stage1[curCard[0].color]=curTable.stage1[curCard[0].color]-1;
dotTable[dotTableIndMap.stage1[curCard[0].color]].textContent=curTable.stage1[curCard[0].color];
console.log(curCard[0].color);
lastCard.setAttribute('style', `background-image: url('${curCard[0].cardFace}.png')`);
finalStack.push(curCard[0]);
stage1Cards.splice(randInd,1);
console.log(stage1Cards.length);
console.log(finalStack);
} else if (stage2Cards.length!==0) {
    randInd=getRandNum(stage2Cards.length-1);
    curCard =stage2Cards.slice(randInd,randInd+1);
    curTable.stage2[curCard[0].color]=curTable.stage2[curCard[0].color]-1;
    dotTable[dotTableIndMap.stage2[curCard[0].color]].textContent=curTable.stage2[curCard[0].color];
    console.log(curCard[0].color);
    lastCard.setAttribute('style', `background-image: url('${curCard[0].cardFace}.png')`);
    finalStack.unshift(curCard[0]);
    stage2Cards.splice(randInd,1);
    console.log(stage2Cards.length);
    console.log(finalStack);

} else if (stage3Cards.length!==0) {
    randInd=getRandNum(stage3Cards.length-1);
    curCard =stage3Cards.slice(randInd,randInd+1);
    curTable.stage3[curCard[0].color]=curTable.stage3[curCard[0].color]-1;
    dotTable[dotTableIndMap.stage3[curCard[0].color]].textContent=curTable.stage3[curCard[0].color];
    console.log(curCard[0].color);
    lastCard.setAttribute('style', `background-image: url('${curCard[0].cardFace}.png')`);
    finalStack.unshift(curCard[0]);
    stage3Cards.splice(randInd,1);
    console.log(stage3Cards.length);
    console.log(finalStack);
} else {
    console.log(finalStack);
    alert('WELL DONE');
}

} else {alert('shuffle decks for each stage - press Shuffle button');}
}