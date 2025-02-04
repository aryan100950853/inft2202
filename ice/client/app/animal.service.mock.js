/*
    Name: Aryan Panchal
    Date: 2025/01/17
    File: animal.service.mock.js
    Description: Service constructor implements the functions in this file.
*/

function AnimalService() {
    function initAnimals() {
        let animals = [];
        for (let i = 0; i < 300; i++) {
            animals.push({
                "name": `name ${i}`,
                "breed": "Grizzly Bear",
                "legs": 4,
                "eyes": 2,
                "sound": "Moo"
            });
        }
        return animals;
    }
    
    // Initialize local storage with mock data if empty
    if (!localStorage.getItem('animals')) {
        localStorage.setItem('animals', JSON.stringify(initAnimals()));
    }
}

// Retrieve all animals
AnimalService.prototype.getAnimals = function() {
    return JSON.parse(localStorage.getItem('animals') || "[]");
};

// Retrieve paginated animals
AnimalService.prototype.getAnimalPage = function({ page = 1, perPage = 15 }) {
    let records = this.getAnimals();
    let pagination = {
        page,
        perPage,
        pages: Math.ceil(records.length / perPage)
    };
    
    pagination.page = Math.max(1, Math.min(pagination.page, pagination.pages));
    let start = (pagination.page - 1) * perPage;
    let end = start + perPage;
    
    return { records: records.slice(start, end), pagination };
};

// Save a new animal
AnimalService.prototype.saveAnimal = function(animal) {
    const animals = this.getAnimals();
    if (animals.find(a => a.name.toLowerCase() === animal.name.toLowerCase())) {
        throw new Error('An animal with that name already exists!');
    }
    animals.push(animal);
    localStorage.setItem('animals', JSON.stringify(animals));
    return true;
};

// Find an animal by name
AnimalService.prototype.findAnimal = function(animalName) {
    const animals = this.getAnimals();
    return animals.find(a => a.name.toLowerCase() === animalName.toLowerCase()) || null;
};

// Update an existing animal
AnimalService.prototype.updateAnimal = function(updatedAnimal) {
    const animals = this.getAnimals();
    const idx = animals.findIndex(a => a.name.toLowerCase() === updatedAnimal.name.toLowerCase());
    if (idx === -1) {
        throw new Error('Animal not found!');
    }
    animals[idx] = updatedAnimal;
    localStorage.setItem('animals', JSON.stringify(animals));
    return true;
};

// Delete an animal
AnimalService.prototype.deleteAnimal = function(animal) {
    const animals = this.getAnimals();
    const idx = animals.findIndex(a => a.name.toLowerCase() === animal.name.toLowerCase());
    if (idx === -1) {
        throw new Error('That animal does not exist!');
    }
    animals.splice(idx, 1);
    localStorage.setItem('animals', JSON.stringify(animals));
    return true;
};

export default new AnimalService();
