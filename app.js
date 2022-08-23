import ancientsData from './data/ancients.js';
import cardsGreenData from './data/mythicCards/green/index.js';
import cardsBrownData from './data/mythicCards/brown/index.js';
import cardsBlueData from './data/mythicCards/blue/index.js';

/*-----get cards lib --START-----*/
let libGreen=[];
let libBrown=[];
let libBlue=[];
function createCurCardLib () {
    libGreen.push.apply(libGreen,cardsGreenData);
    libBrown.push.apply(libBrown,cardsBrownData);
    libBlue.push.apply(libBlue,cardsBlueData);
}
createCurCardLib ();
console.log(libGreen);
console.log(libBrown);
console.log(libBlue);

/*-----get cards lib ---END----*/

/* const dashboard ={};
  Object.assign(dashboard,ancientsData);
console.log(ancientsData); 

let a = ancientsData.findIndex((el) => {return el.name==="azathoth";});
console.log(a); */
const ancDataList = ancientsData.slice();
const ancPicList = document.querySelector('.ancients-container');
ancPicList.addEventListener('click',createAncCardSet);
/*---Create ancients Pics list----*/
function createAncPicList() { 
ancDataList.forEach((el)=>{
    const ancPic= document.createElement('div');
ancPicList.append(ancPic);
ancPic.classList.add('ancient-card');
ancPic.setAttribute('style',`background-image: url('${el.cardFace}')`);
ancPic.setAttribute('id',`${el.id}`);
});
}
createAncPicList();

/*---Create and display current card set config----*/
let curCardSetConf = {};
function createAncCardSet(e) {
   if(e.target.classList.contains('ancient-card')) { const ancActiveList = document.querySelectorAll('.option-active');
       
     if(ancActiveList) {
        ancActiveList.forEach((el)=>{
            if (el.classList.contains('option-active')&&(el.id!==e.target.id)) {
            el.classList.remove('option-active');}
        });
        }
 if (!e.target.classList.contains('option-active')) {
    let ind = ancientsData.findIndex(el=> el.id===e.target.id);
    Object.assign(curCardSetConf,ancientsData[ind]);
    e.target.classList.add('option-active');
    showcurCardSetConf(); 
 } 
   } 
}

/*-----show Card Set----------*/
function showcurCardSetConf() {
    if (curCardSetConf) {
       const ancSetTable = document.querySelectorAll('.dot');
       let stages =[];
       let cardSetKeys =Object.keys(curCardSetConf);
       cardSetKeys.forEach ((el)=>{
        if (el.includes('first')) {
            stages.push(curCardSetConf[el].greenCards,curCardSetConf[el].brownCards,curCardSetConf[el].blueCards);
           
           }
           if (el.includes('second')) {
            stages.push(curCardSetConf[el].greenCards,curCardSetConf[el].brownCards,curCardSetConf[el].blueCards);
            
           }
           if (el.includes('third')) {
            stages.push(curCardSetConf[el].greenCards,curCardSetConf[el].brownCards,curCardSetConf[el].blueCards);
            
            for (let i=0; i<ancSetTable.length;i++) {
                ancSetTable[i].textContent =stages[i];
            }
           }
       }); 
       }  
}
 