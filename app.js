import ancientsData from './data/ancients.js';
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

/*---Create card set data----*/
let curCardSet = {};
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
    Object.assign(curCardSet,ancientsData[ind]);
    e.target.classList.add('option-active');
    showCurCardSet(); 
 } 
   } 
}

/*-----show Card Set----------*/
function showCurCardSet() {
    if (curCardSet) {
       const ancSetTable = document.querySelectorAll('.dot');
       let stages =[];
       let cardSetKeys =Object.keys(curCardSet);
       cardSetKeys.forEach ((el)=>{
        if (el.includes('first')) {
            stages.push(curCardSet[el].greenCards,curCardSet[el].brownCards,curCardSet[el].blueCards);
           
           }
           if (el.includes('second')) {
            stages.push(curCardSet[el].greenCards,curCardSet[el].brownCards,curCardSet[el].blueCards);
            
           }
           if (el.includes('third')) {
            stages.push(curCardSet[el].greenCards,curCardSet[el].brownCards,curCardSet[el].blueCards);
            
            for (let i=0; i<ancSetTable.length;i++) {
                ancSetTable[i].textContent =stages[i];
            }
           }
       }); 
       } 
       console.log(curCardSet);
       
    
    
}
 