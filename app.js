import ancientsData from './data/ancients.js';
/* const dashboard ={};
  Object.assign(dashboard,ancientsData);
console.log(ancientsData); 

let a = ancientsData.findIndex((el) => {return el.name==="azathoth";});
console.log(a); */

/*---Create ancients Pics list----*/
function createAncPicList() {
const ancDataList = ancientsData.slice();
const ancPicList = document.querySelector('.ancients-container');

ancDataList.forEach((el)=>{
    const ancPic= document.createElement('div');
ancPicList.append(ancPic);
ancPic.classList.add('ancient-card');
ancPic.setAttribute('style',`background-image: url('${el.cardFace}')`);
});
}
createAncPicList();
