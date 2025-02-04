import { animalService } from "./animal.service.js";

document.addEventListener("DOMContentLoaded", function () {
  const animalTable = document.getElementById("animalTable");
  const messageBox = document.getElementById("messageBox");

  function refreshAnimalList() {
    const animals = animalService.getAnimals();
    if (animals.length === 0) {
      animalTable.style.display = "none";
      messageBox.style.display = "block";
    } else {
      animalTable.style.display = "table";
      messageBox.style.display = "none";
      // Re-draw the table here if needed
    }
  }

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
      event.preventDefault();
      
      const id = event.target.dataset.id;
      
      try {
        if (animalService.deleteAnimal(id)) {
          refreshAnimalList();
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  });

  refreshAnimalList();
});
