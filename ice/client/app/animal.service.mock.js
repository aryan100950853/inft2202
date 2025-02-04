/*
    Name: Aryan Panchal
    Date: 2025/01/17
    File: animal.service.mock.js
    Description: Service constructor implements the functions in this file.
*/

/*
 *  Service constructor
 */
function AnimalService() {
    function initAnimals() {
        let animals = [];
        let index = 0;
        while (animals.length < 300) {
            animals.push({
                "name": `name ${index++}`,
                "breed": "Grizzly Bear",
                "legs": 4,
                "eyes": 2,
                "sound": "Moo"
            });
        }
        return animals;
    }

    // If there is no entry for animals in local storage, initialize it
    if (!localStorage.getItem('animals')) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage  
        // Create a new entry in local storage and put an empty array in it        
        localStorage.setItem('animals', JSON.stringify([]));
    }
}

/*
 * Get all animals from local storage
 */
AnimalService.prototype.getAnimals = function () {
    return JSON.parse(localStorage.getItem('animals'));
};

/*
 * Get a paginated list of animals
 */
AnimalService.prototype.getAnimalPage = function (pagination) {
    const animals = this.getAnimals();
    return {
        pagination,
        records: animals.slice(
            pagination.pageNumber * pagination.pageSize,
            (pagination.pageNumber + 1) * pagination.pageSize
        )
    };
};

/*
 * Save a new animal in local storage
 */
AnimalService.prototype.saveAnimal = function (animal) {
    const animals = this.getAnimals();

    // Check if the animal already exists
    if (animals.find(a => a.name === animal.name)) {
        throw new Error('An animal with that name already exists!');
    }

    // Add to the list and update local storage
    animals.push(animal);
    localStorage.setItem('animals', JSON.stringify(animals));

    return true;
};

/*
 * Find an animal by name
 */
AnimalService.prototype.findAnimal = function (animalName) {
    const animals = this.getAnimals();
    const animal = animals.find(a => a.name === animalName);

    if (!animal) {
        throw new Error('Animal not found!');
    }

    return animal;
};

/*
 * Update an existing animal
 */
AnimalService.prototype.updateAnimal = function (updatedAnimal) {
    const animals = this.getAnimals();
    const index = animals.findIndex(a => a.name === updatedAnimal.name);

    if (index === -1) {
        throw new Error('That animal does not exist!');
    }

    // Update the existing animal
    animals[index] = updatedAnimal;
    localStorage.setItem('animals', JSON.stringify(animals));

    return true;
};

/*
 * Delete an animal from local storage
 */
AnimalService.prototype.deleteAnimal = function (animal) {
    const animals = this.getAnimals();
    const idx = animals.findIndex(a => a.name === animal.name);

    if (idx === -1) {
        throw new Error('That animal does not exist!');
    }

    animals.splice(idx, 1);
    localStorage.setItem('animals', JSON.stringify(animals));

    return true;
};

const animalService = new AnimalService();
