//!Sleep function
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

var inparr = [];
var numbers = document.getElementById('numbers');
var btnAdd = document.getElementById('btnAdd');
var btnClear = document.getElementById('btnClear');
var btnPop = document.getElementById('btnPop');
var btnAgain = document.getElementById('btnAgain');
var warn = document.getElementById('warn');
warn.style.display = "none";

//!Dynamic Array Display
function dyarr(){
  var sortedarray = document.getElementById('userarray');
  if(inparr.length <= 14 && numbers.value!=""){    
    inparr.push(parseInt(numbers.value));
    sortedarray.innerHTML = inparr;
    //console.log('Array updated and displayed'); //Debugging
    numbers.value = "";
    warn.style.display = "none";
  }else if(numbers.value == ""){
    //console.log('Blanks not allowed!') //Debugging
    warn.style.display = "block";
    warn.innerHTML = "Blanks not allowed!";
  }else{
    numbers.value = "";
    warn.style.display = "none";
    //console.log('You have reached the maximum size!') //Debugging    
    document.getElementById("inputspace").style.display = "none";
    document.getElementById("waiting").style.display = "block";
    sleep(2500).then(() => {
      document.getElementById("sortedarray").innerHTML = insertionSort(inparr);
      document.getElementById("waiting").style.display = "none";
      document.getElementById("results").style.display = "block";
    })
  }
}

var btnNow = document.getElementById('btnNow')
btnNow.addEventListener('click', () =>{
  numbers.value = "";
  if(inparr.length != 0){
    document.getElementById("inputspace").style.display = "none";
    document.getElementById("waiting").style.display = "block";
    sleep(2500).then(() => {
      document.getElementById("sortedarray").innerHTML = insertionSort(inparr);
      document.getElementById("waiting").style.display = "none";
      document.getElementById("results").style.display = "block";
    })
  }else{
    console.log("Empty arrays can't be sorted!")
  }
  
})

function again(){
  document.getElementById("inputspace").style.display = "block";
  document.getElementById("waiting").style.display = "none";
  document.getElementById("results").style.display = "none";
  warn.style.display = "none";
  numbers.value = "";
  userarray.innerHTML = "";
  inparr.length = 0;
}

btnAgain.addEventListener('click', again)
document.addEventListener('keydown', function(e){
  if(e.ctrlKey && e.keyCode === 82){
    again();   
  }
})

btnAdd.addEventListener('click', dyarr)
btnClear.addEventListener('click', function(){
  numbers.value = "";
  inparr.length = 0; 
  userarray.innerHTML = inparr;
})

document.addEventListener('keydown', function(e){
  if(e.ctrlKey && e.keyCode === 67){
    numbers.value = "";
    inparr.length = 0; 
    userarray.innerHTML = inparr;    
  }
})
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

document.addEventListener('keydown', function(e){
  if(e.ctrlKey && e.keyCode === 8){
    itempopper();
  }
});

document.addEventListener('keydown', function(e){
  if(e.ctrlKey && e.keyCode === 13){
    if(inparr.length != 0){
      document.getElementById("inputspace").style.display = "none";
      document.getElementById("waiting").style.display = "block";
      sleep(2500).then(() => {
        document.getElementById("sortedarray").innerHTML = insertionSort(inparr);
        document.getElementById("waiting").style.display = "none";
        document.getElementById("results").style.display = "block";
      })
    }else{
      console.log("Empty arrays can't be sorted!")
    }
  }
});


btnPop.addEventListener('click', itempopper)

numbers.addEventListener('keydown', function(e){
  if(e.keyCode === 13){
    dyarr();
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
  return inparr;
}