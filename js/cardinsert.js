var inparr = [];
var numbers = document.getElementById('numbers');
var btnAdd = document.getElementById('btnAdd');
var btnClear = document.getElementById('btnClear');
var btnPop = document.getElementById('btnPop');
var btnAgain = document.getElementById('btnAgain');
var btnNow = document.getElementById('btnNow')
var warn = document.getElementById('warn');
warn.style.display = "none";

//!Sleep function
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}




//!Again function
function again(){
    document.getElementById("inputspace").style.display = "block";
    document.getElementById("waiting").style.display = "none";
    document.getElementById("results").style.display = "none";
    warn.style.display = "none";
    numbers.value = "";
    userarray.innerHTML = "";
    inparr.length = 0;
}
//?Again function with button click
btnAgain.addEventListener('click', again)
//?Again function with shortcut keys (Ctrl+R)
document.addEventListener('keydown', function(e){
    if(e.ctrlKey && e.keyCode === 82){
        again();   
    }
})




//!Delete item from list
function itempopper(){
    if(inparr.length>0){
        inparr.pop()
        console.log("Item popped")
        console.log(inparr)
        userarray.innerHTML = inparr;
    }else{
        console.log("No items left")
    }  
}
//?Item Popper with button click
btnPop.addEventListener('click', itempopper)
//?Item Popper with keyboard shortcuts (Ctrl + Backspace)
document.addEventListener('keydown', function(e){
if(e.ctrlKey && e.keyCode === 8){
    itempopper();
}
});




//!ClearList function
btnClear.addEventListener('click', function(){
    numbers.value = "";
    inparr.length = 0; 
    userarray.innerHTML = inparr;
})
//?ClearList with keyboard shortcuts(Ctrl + C)
document.addEventListener('keydown', function(e){
if(e.ctrlKey && e.keyCode === 67){
    numbers.value = "";
    inparr.length = 0; 
    userarray.innerHTML = inparr;    
}
})



//!Dynamic Array Display
function dyarr(){
    var sortedarray = document.getElementById('userarray');
    if(numbers.value >0 && numbers.value<=13 && inparr.length <= 12 && numbers.value!="" && inparr.includes(numbers.value) == false){    
      inparr.push(parseInt(numbers.value));
      sortedarray.innerHTML = inparr;
      //console.log('Array updated and displayed');//Debugging
      numbers.value = "";
      warn.style.display = "none";
    }else if(numbers.value == ""){
      //console.log("Can't sort if you have no cards");//Debugging
      warn.style.display = "block";
      warn.innerHTML = "Can't sort if you have no cards";
    }else if(inparr.includes(numbers.value)){
        warn.style.display = "block"
        warn.innerHTML = "This card has already been chosen"
    }else if(numbers.value <1 || numbers.value>13){
        warn.style.display = "block"
        warn.innerHTML = "Cards range from 1 to 13 only!"
    }else{
      numbers.value = "";
      warn.style.display = "none";
      //console.log('You have reached the maximum size!')//Debugging
      document.getElementById("inputspace").style.display = "none";
      document.getElementById("waiting").style.display = "block";
      sleep(2500).then(() => {
        insertionSort(inparr);
        document.getElementById("waiting").style.display = "none";
        document.getElementById("results").style.display = "block";
      })
    }
  }
//?DynamicArray with button click
btnAdd.addEventListener('click', dyarr);
//?DynamicArray with keyboard shortcut(Enter)
numbers.addEventListener('keydown', function(e){
    if(e.keyCode === 13){
      dyarr();
    }
  });

//!ShowResults with button click
btnNow.addEventListener('click', () =>{
    numbers.value = "";
    if(inparr.length != 0){
      document.getElementById("inputspace").style.display = "none";
      document.getElementById("waiting").style.display = "block";
      sleep(2500).then(() => {
        insertionSort(inparr);
        document.getElementById("waiting").style.display = "none";
        document.getElementById("results").style.display = "block";
      })
    }else{
      console.log("Empty arrays can't be sorted!")
    }
    
  })
//!ShowResults with keyboard shortcuts(Ctrl + Enter)
document.addEventListener('keydown', function(e){
    if(e.ctrlKey && e.keyCode === 13){
        if(inparr.length != 0){
        document.getElementById("inputspace").style.display = "none";
        document.getElementById("waiting").style.display = "block";
        sleep(2500).then(() => {
            insertionSort(inparr);
            document.getElementById("waiting").style.display = "none";
            document.getElementById("results").style.display = "block";
        })
        }else{
        console.log("Empty arrays can't be sorted!")
        }
    }
});




//! MAIN FUNCTION
function insertionSort(arr) {
    for (var i = 1, len = arr.length; i < len; i++) {
        key = arr[i];
        j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j]
            j--;
        }
        arr[j + 1] = key;
    }
    //return inparr;
    inparr.forEach(element => {
        //console.log(element) //Debugging
        if(element == 13){
            element = "K"
        }else if(element == 12){
            element = "Q"
        }else if(element == 11){
            element = "J"
        }else if(element == 1){
            element = "A"
        }
        sortedarray.innerHTML += element + "♥" +" "
    });
  }
