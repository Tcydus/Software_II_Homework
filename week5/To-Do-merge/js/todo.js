const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");  
const addText = document.getElementById("add-icon")
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

let Today = new Date();
let options = {weekday : "long", month: "short", day: "numeric"};

dateElement.innerHTML = Today.toLocaleDateString("en-US",options);

let toDoList = [];
let id = 0;


let data = localStorage.getItem("TODO");
  if(data){
    toDoList = JSON.parse(data);
    loadToDoList(toDoList);
    id = toDoList.length;

  }
  else{
    toDoList = [];
    id = 0;  
}

function loadToDoList(array){
  array.forEach(function(item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

function addToDo(toDo,id,done,trash){

  if(trash) { return; }
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";
  const text = `<li class="item">
                  <i class="co fa ${DONE}" job="complete" id="${id}"></i>
                  <p class="text ${LINE}" job=None>${toDo}</p>
                  <i class="de fa fa-trash-o" job="delete" id="${id}"></i>
                </li>`;
  const position = "beforeend";
  list.insertAdjacentHTML(position,text);
}


document.addEventListener("keyup",function(event){
  if(event.key === "Enter"){
  addToDoCommand()
  }
});

function addToDoCommand(){
  
    const toDo = input.value;
    if(toDo){
      addToDo(toDo,id,false,false);
      toDoList.push({
        name : toDo,
        id : id,
        done : false,
        trash : false
      });
      input.value = "";
      id++;
      localStorage.setItem("TODO",JSON.stringify(toDoList));
    }    
  
}

function completeToDo(element){
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
  toDoList[element.id].done = toDoList[element.id].done ? false : true;
}

function removeToDo(element){
  element.parentNode.parentNode.removeChild(element.parentNode);
  toDoList[element.id].trash = true;
}

list.addEventListener("click",function(event){
  const element = event.target;
  const elementJob = element.attributes.job.value;

  console.log(elementJob);
  if(elementJob == "complete"){
    completeToDo(element);
  }
  else if(elementJob == "delete"){
    removeToDo(element);
  }

  localStorage.setItem("TODO",JSON.stringify(toDoList));

});

addText.addEventListener("click",function(event){
  addToDoCommand();
  localStorage.setItem("TODO",JSON.stringify(toDoList));
});


clear.addEventListener("click", function(){
  localStorage.clear();
  location.reload();
});




