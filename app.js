"use strict";


//blood list JSON
const blood = "https://petlatkea.dk/2021/hogwarts/families.json";

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


// create arrays to sort later

let arrayOfNames = [];
let arrayOfLastNames = [];
let arrayOfHouses = [];


// create function that handles the data from the fetching

function handleWizards(wizards){
    wizards.forEach(wizard => {

        // create new student object
        let newStudent = Object.create(Wizard);

        // FIND FIRST NAME
        newStudent.name = findFirstName(wizard);

        // FIND MIDDLE NAME
        newStudent.middleName = findMiddleName(wizard);

        // FIND NICK NAME
      //  newStudent.nickName = findNickName(wizard);
      //  console.log(newStudent.nickName);
    
        // FIND LAST NAME
        newStudent.lastName = findLastName(wizard);

        // FIND HOUSE
        newStudent.house = findHouse(wizard);


      // BUILD TEMPLATE

      const myTemplate = document.getElementById('my-template').content;

      const clone = myTemplate.cloneNode(true);

      // img

      if(newStudent.name === "Leanne"){
        clone.querySelector("img").src = `imgs/students/leanne.png`;
      } else{
        clone.querySelector("img").src = `imgs/students/${newStudent.lastName.toLowerCase()}_${newStudent.name.charAt(0).toLowerCase()}.png`;
      }

      // house

      clone.querySelector('.template-h2').textContent = `${newStudent.house}`;

      if(newStudent.house === "Gryffindor"){
        clone.querySelector('.inner-card').classList.add('gryffindor-background');
        clone.querySelector('h2').classList.add('gryffindor-h2');

      } else if (newStudent.house === "Slytherin"){
        clone.querySelector('.inner-card').classList.add('slytherin-background');
        clone.querySelector('h2').classList.add('slytherin-h2');

      } else if (newStudent.house === "Ravenclaw"){
        clone.querySelector('.inner-card').classList.add('ravenclaw-background');
        clone.querySelector('h2').classList.add('ravenclaw-h2');

      } else{
        clone.querySelector('.inner-card').classList.add('hufflepuff-background');
        clone.querySelector('h2').classList.add('hufflepuff-h2');

      }

      // blood

      if (halfBloodArray.includes(newStudent.lastName)){
        newStudent.blood = "Half";
        clone.querySelector('.li-blood').textContent = `Blood: ${newStudent.blood}`;
   
      } else if (pureBloodArray.includes(newStudent.lastName) && halfBloodArray.includes(newStudent.lastName) === false){
        newStudent.blood = "Pure";
        clone.querySelector('.li-blood').textContent = `Blood: ${newStudent.blood}`;
      }

      // name of student
      clone.querySelector(".li-name").textContent = `Name: ${newStudent.name}`;
      // middle name of student
      clone.querySelector(".li-middlename").textContent = `Middle name: ${newStudent.middleName}`;
      // last name of student
      clone.querySelector(".li-lastname").textContent = `Last name: ${newStudent.lastName}`;

      // grab parent and append child
      const daddy = document.querySelector('#dashboard');
      daddy.appendChild(clone);

      // add each part of the wizard to specific arrays for later use
      arrayOfNames.push(newStudent.name);
      arrayOfLastNames.push(newStudent.lastName);
      
    }
    
    )
    arrayOfNames.sort();
    arrayOfLastNames.sort();
    halfBloodArray.sort();
    pureBloodArray.sort();

    // if I click on a-z
    
}



// create Wizard object

const Wizard = {
    name: "",
    middleName: "",
    lastName: "",
    nickName: "",
    image: "",
    house: "",
    blood: "",
}



// designy stuff

const schoolLogo = document.querySelector('.school-logo');

// make something levitate

function makeItLevitate(element){
    element.classList.add("make-it-levitate");
}

makeItLevitate(schoolLogo);

const dashboard = document.querySelector('#dashboard');



