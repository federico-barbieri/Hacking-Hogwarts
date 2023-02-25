"use strict";

//blood list JSON
const blood = "https://petlatkea.dk/2021/hogwarts/families.json";

function fetchBlood(){
    fetch(blood)
    .then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
            return response.json();
    })
    .then(families => {
        // we have the data 
       // console.log(families); 
        handleBlood(families);
    })
    .catch (e => {
        // something went wrong
        console.error("An error has occured.", e.message);
    })
}

fetchBlood();

// create halfblood array

let halfBloodArray = [];
let pureBloodArray = [];

// create function to handle the blood families

function handleBlood(families){

   
       for (let i=0; i < families.half.length; i++){

        halfBloodArray.push(families.half[i]);
       }
       

       for (let i=0; i < families.pure.length; i++){
        pureBloodArray.push(families.pure[i]);
       }
};

//student list JSON
const students = "https://petlatkea.dk/2021/hogwarts/students.json";

// create Wizard object

const Wizard = {
    name: "",
    middleName: "",
    lastName: "",
    nickName: "",
    house: "",
    blood: "",
    image: "",
    isInquisitor: false,
    isPrefect: false,
    isExpelled: false,
}

// create functions for each part of the wizard

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

    let whiteSpace = middleName.indexOf(' ');

    // if there is a white space...

    if (whiteSpace !== -1){
        

        // cut the first name off and trim the end in case of extra white space

        middleName = middleName.slice(whiteSpace).trimStart().trimEnd();

        // find if there is another white space

        let secondWhiteSpace = middleName.indexOf(' ');

        // if there is, cut the word from 0 until that second space
        if(secondWhiteSpace !== -1){
            middleName = middleName.slice(0, secondWhiteSpace);
        } else {
            middleName = "No middlename";
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

    if (middleName.includes('"')){
        return "This is actually a nickname"
    } else{

       
    return middleName;

    }

}


function findLastName(element){

    let lastName = element.fullname.trimStart();
    

    // find the first white space, that's where the first name ends

    let whiteSpace1 = lastName.indexOf(' ');
    

    // if there is a white space...

    if (whiteSpace1 === -1){
          // if it doesn't have a space it means there is no last name
          return "There is no last name";  
    
     } else {
   
        // cut the first name off and trim the end in case of extra white space

        lastName = lastName.slice(whiteSpace1).trimStart().trimEnd();        

        // find if there is another white space

        let whiteSpace2 = lastName.indexOf(' ');
        
        
        // if there is, cut the word from 0 until that second space
        if(whiteSpace2 === -1){
            lastName = lastName;
            

            
        } else {
            lastName = lastName.slice(whiteSpace2);
            
        }
    
    } 

    // set middlename to lower case

    let lowerLastName = lastName.trimStart().toLowerCase();
    
   
    // grab first letter and set it to upper case
   
    let lastNameFirstChar =  lowerLastName.charAt(0).toUpperCase();

    

    // concat first capital letter with the rest of the lower case word 

    lastName = lastNameFirstChar.concat(lowerLastName.slice(1));

 
    return lastName;


}


function findHouse(element){
    let firstLetter = element.house.trimStart().charAt(0).toUpperCase();
    let restOfWord = element.house.trimStart().toLowerCase().slice(1).trimEnd();

    let actualHouse = firstLetter.concat(restOfWord);

    return actualHouse;
}



function fetchStudents(){
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
}

// create global array of initial student objects
let initialGroupOfStudents = [];

fetchStudents();

// SORTING
// create a function that pushes the students from the original array
// into the sorting array

let sortingStudentsAscending = [];

function sortMe(arr){
    arr.sort((a, b) => a.name.localeCompare(b.name));
    console.log(arr);
}

function handleWizards(wizards){
    wizards.forEach(wizard => {

        // create new student object
        let newStudent = Object.create(Wizard);

        // ASSIGN FIRST NAME
        newStudent.name = findFirstName(wizard);

        // ASSIGN MIDDLE NAME
        newStudent.middleName = findMiddleName(wizard);

        // ASSIGN NICK NAME
      //  newStudent.nickName = findNickName(wizard);
      //  console.log(newStudent.nickName);
    
        // ASSIGN LAST NAME
        newStudent.lastName = findLastName(wizard);

        // ASSIGN HOUSE
        newStudent.house = findHouse(wizard);

        // ASSIGN BLOOD
        if (halfBloodArray.includes(newStudent.lastName)){
            newStudent.blood = "Half";
            
        } else if (pureBloodArray.includes(newStudent.lastName) && halfBloodArray.includes(newStudent.lastName) === false){
            newStudent.blood = "Pure";
            
        
        } else if (newStudent.name === "Zacharias"){
            newStudent.blood = "Half";
        
        } else if (newStudent.name === "Tracey"){
            newStudent.blood = "Pure";
        
        } else if (newStudent.name === "Kevin"){
            newStudent.blood = "Half";
        }

        // assign img 
        
         if(newStudent.name === "Leanne"){
            newStudent.image = `imgs/students/leanne.png`;
        } else{
            newStudent.image = `imgs/students/${newStudent.lastName.toLowerCase()}_${newStudent.name.charAt(0).toLowerCase()}.png`;
        }

        // PUSH EACH NEW STUDENT TO THE STUDENT'S BIG OBJECT ARRAY
        initialGroupOfStudents.push(newStudent);

        // PUSH EACH NEW STUDENT TO THE SORTING ARRAY
        sortingStudentsAscending.push(newStudent);

        });        
        

        // call the function that injects design to every aspect of the student
       // beautifyStudent(studentsBigObject);
    
}







// grab initial modal
const welcomingModal = document.querySelector('.welcoming-modal');
const welcomingModalBtn = document.querySelector('.welcoming-modal-btn');

// grab top header
const topHeader = document.querySelector('#top-header');

// grab dashboard
const dashboard = document.querySelector('#dashboard');

// create function that closes the modal and shows the header and the dashboard
function showDashboard(event){
    welcomingModal.style.display = "none";
    topHeader.classList.add('makingThingsAppearSlow');
    topHeader.style.display = "flex";
    dashboard.classList.add('makingThingsAppearSlow');
    dashboard.style.display = "flex";
    event.target.removeEventListener('click', showDashboard);
}




window.addEventListener("DOMContentLoaded", start);


function start(){
    welcomingModal.classList.add('makingThingsAppearSlow');

    welcomingModalBtn.addEventListener('click', showDashboard);
}