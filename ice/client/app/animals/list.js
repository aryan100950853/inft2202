/*
   Name : aryankumar panchal
   filename : list.js
   course: INFT 2202
   date : dec 17, 1 
   description : list.js
*/
/* do table stuff */
const eleEmpty = document.getElementById('empty-message');
const eleTable = document.getElementById('animal-list');

const records = animalService.getAnimals();

if (!records.length) {
    eleEmpty.classList.remove('d-none');
    eleTable.classList.add('d-none');
} else {
    eleEmpty.classList.add('d-none');
    eleTable.classList.remove('d-none');
    drawAnimalTable(records);
}
/* 
 * 
 */
function drawAnimalTable(animals) 
{

}