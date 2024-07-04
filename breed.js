let dogs =[];
let dogbreeds =[];
let startnum = 0;
let endnumber = 1;
const todolist = document.querySelector(".toDoList"); 


const getTodoDog = async (breed = 'hound') => {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const dogData = await response.json();
    dogs = dogData.message;
    todolist.innerHTML="";
    generatedog(dogs.slice(startnum , endnumber));
};
const getDogbreedData = async () => {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const dogbreedData = await response.json();
    dogbreeds = Object.keys(dogbreedData.message);
    generateoption(dogbreeds);
}
getDogbreedData();
getTodoDog();


const nextbutton = document.querySelector(".next-button");
const previousbutton = document.querySelector(".previous-button");
const selectdog = document.querySelector("select[name='dog']");

nextbutton.addEventListener("click", (event) => {
    todolist.innerHTML="";
    startnum += 1;
    endnumber += 1;
    generatedog(dogs.slice(startnum , endnumber ))
    event.preventDefault();
});


previousbutton.addEventListener("click", (event) => {
    todolist.innerHTML="";
    startnum -= 1;
    endnumber -= 1;
    generatedog(dogs.slice(startnum , endnumber ))
    event.preventDefault();
});

selectdog.addEventListener("change", (event) => {
    const selectedbreed = event.target.value;
    getTodoDog(selectedbreed);
    event.preventDefault();
});

function generatedog(alldogs){
    return alldogs.map(doglink =>{
        const div= document.createElement('div');
        div.className= 'image-div';
        div.style.background = `no-repeat url('${doglink}') top/40%`
    
        todolist.appendChild(div);
    })
}
function generateoption(alloption){
    return alloption.map(breed => {
        const option= document.createElement('option');
        option.setAttribute('value',breed);
        option.innerText = breed ;
        
        selectdog.appendChild(option);
    })
}












