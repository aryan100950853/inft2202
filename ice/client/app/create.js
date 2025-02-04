/*
    Name: Aryan Panchal
    Date: 2025/01/17
    File: create.js
    Description: Handles the submission of the animal creation form.
*/

// Tell us what page we're on
console.log('We are on the add page');

// Assign a handler to the submit event
document.getElementById('animal-form')
    .addEventListener('submit', submitAnimalForm);

// Create a handler to deal with the submit event
async function submitAnimalForm(event) {
    // Prevent the default action from happening
    event.preventDefault();

    // Get a reference to the form (from the event)
    const animalForm = event.target;

    // Validate the form
    const valid = validateAnimalForm(animalForm);

    // Do stuff if the form is valid
    if (valid) {
        console.log('Form is valid!');

        const formData = new FormData(animalForm);

        // Create a JavaScript object to hold the form data
        const animalObject = {};
        formData.forEach((value, key) => {
            // Convert string values to numbers where needed
            if (key === 'eyes' || key === 'legs') {
                animalObject[key] = Number(value);
            } else {
                animalObject[key] = value.trim();
            }
        });

        const eleNameError = animalForm.name.nextElementSibling;
        
        try {
            await animalService.saveAnimal(animalObject);
            eleNameError.classList.add('d-none');
            animalForm.reset();
            window.location = './list.html';
        } catch (error) {
            console.log(error);
            eleNameError.classList.remove('d-none');
            eleNameError.textContent = "This animal already exists!";
        }
    } else {
        console.log('Form validation failed!');
    }
}

// Validate the animal form
function validateAnimalForm(form) {
    console.log('Validating form...');
    let valid = true;

    // Validation rules
    const fields = ['name', 'breed', 'sound'];
    fields.forEach(field => {
        const input = form[field];
        const errorElement = input.nextElementSibling;
        if (!input.value.trim()) {
            errorElement.classList.remove('d-none');
            errorElement.textContent = `Please enter a valid ${field}.`;
            valid = false;
        } else {
            errorElement.classList.add('d-none');
        }
    });

    // Validate legs and eyes (must be positive numbers)
    const numberFields = ['legs', 'eyes'];
    numberFields.forEach(field => {
        const input = form[field];
        const errorElement = input.nextElementSibling;
        const value = Number(input.value);

        if (isNaN(value) || value <= 0) {
            errorElement.classList.remove('d-none');
            errorElement.textContent = `Please enter a valid number for ${field}.`;
            valid = false;
        } else {
            errorElement.classList.add('d-none');
        }
    });

    return valid;
}
