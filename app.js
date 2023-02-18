
//student list JSON
const students = "https://petlatkea.dk/2021/hogwarts/students.json";

fetch(students)
.then(response => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
        return response.json();
})
.then(wizards => {
    // we have the data 
   // console.log(students); 
    handleWizards(wizards);
})
.catch (e => {
    // something went wrong
    console.error("An error has occured.", e.message);
})

//
//
//
// HANDLE EACH WIZARD

function findFirstName(element){

    let firstName = element.fullname.trimStart();

    // find the first white space, that's where the first name ends

    let firstSpace = firstName.indexOf(' ');

    // if there is a white space...

    if (firstSpace !== -1){
        firstName = firstName.slice(0,firstSpace);
    
    } else{
           // if it doesn't have a space it means there is no last name
        firstName = firstName;        
    }

    // set name to lower case

    let lowerFirstName = firstName.toLowerCase();
   
    // grab first letter and set it to upper case
   
    let firstNameFirstChar =  lowerFirstName.charAt(0).toUpperCase();

    // concat first capital letter with the rest of the lower case word 

    firstName = firstNameFirstChar.concat(lowerFirstName.slice(1));

    return firstName;
    
}


function findMiddleName(element){

    let middleName = element.fullname.trimStart();

    // find the first white space, that's where the first name ends

    let firstSpace = middleName.indexOf(' ');

    // if there is a white space...

    if (firstSpace !== -1){
        

        // cut the first name off and trim the end in case of extra white space

        middleName = middleName.slice(firstSpace).trimStart().trimEnd();

        // find if there is another white space

        let secondSpace = middleName.indexOf(' ');

        // if there is, cut the word from 0 until that second space
        if(secondSpace !== -1){
            middleName = middleName.slice(0, secondSpace)
        } else {
            middleName = "No middlename"
        }
    
    } else{
      
           // if it doesn't have a space it means there is no middle name
        middleName = "No middlename";        
    }

    // set middlename to lower case

    let lowerMiddleName = middleName.toLowerCase();
   
    // grab first letter and set it to upper case
   
    let middleNameFirstChar =  lowerMiddleName.charAt(0).toUpperCase();

    // concat first capital letter with the rest of the lower case word 

    middleName = middleNameFirstChar.concat(lowerMiddleName.slice(1));

    return middleName;
    
}


function handleWizards(wizards){
    wizards.forEach(wizard => {

        // create new student object
        let newStudent = Object.create(Wizard);

        // FIND FIRST NAME
        newStudent.name = findFirstName(wizard);

        // FIND MIDDLE NAME
        newStudent.middleName = findMiddleName(wizard);
        console.log(newStudent.middleName);
        }
    )
}



// create Wizard object

const Wizard = {
    name: "",
    middleName: "",
    lastName: "",
    nickName: "",
    image: "",
    house: "",
}






const schoolLogo = document.querySelector('.school-logo');

// make something levitate

function makeItLevitate(element){
    element.classList.add("make-it-levitate");
}

makeItLevitate(schoolLogo);