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
let stage1Cards, stage2Cards, stage3Cards;
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

/*---function get random number-----*/
function getRandNum(max) {
    return Math.floor(Math.random() * (max + 1));
}


/*-----get cards lib ---END----*/

/* const dashboard ={};
  Object.assign(dashboard,ancientsData);
console.log(ancientsData); 

let a = ancientsData.findIndex((el) => {return el.name==="azathoth";});
console.log(a); */
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

/*---Create and display active card set config and display deck table----*/


function createAncCardSet(e) {
    if (e.target.classList.contains('ancient-card')) {
        const ancActiveList = document.querySelectorAll('.option-active');

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
}

/*-----Display deck table----------*/

function showcurCardSetConf() {
    if (curCardSetConf) {
        const ancSetTable = document.querySelectorAll('.dot');
        stages.splice(0, stages.length);
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

                for (let i = 0; i < ancSetTable.length; i++) {
                    ancSetTable[i].textContent = stages[i];
                }
            }
        });
    }
}

/*-------Choose curLevel ----START-------*/
const levelBtns = document.querySelector('.difficulty-container');
levelBtns.addEventListener('click', setLevel);

function setLevel(e) {
    if (curCardSetConf.id) {

        if (e.target.classList.contains('button') && e.target.id !== 'shuffle') {
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
/*-------Choose curLevel ----END-------*/

/*-------get cards for curDeck-----------*/

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


const shuffleBtn = document.querySelector('#shuffle');
shuffleBtn.addEventListener('click', shuffleDeck);

function shuffleDeck() {
    if (!curLevel) {
        alert('choose level first');
    } else {
        if (curLevel === 'easy') {
            levEasy();
            console.log(curLevel);
            console.log(curDeck);
        }
        if (curLevel === 'medium') {
            levMedium();
            console.log(curLevel);
            console.log(curDeck);
        }
        if (curLevel === 'hard') {
            levHard();
            console.log(curLevel);
            console.log(curDeck);
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
}

/*-----final stack-------*/
let finalStack =[];

