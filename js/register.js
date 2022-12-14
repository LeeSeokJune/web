
window.onload = function(){
    document.querySelector("#show_register").addEventListener('click', show);
    document.querySelector("#close_register").addEventListener('click', close);
    show();
}
function show () {
    document.querySelector(".main_background").className = "main_background show";
}
  
function close () { 
    document.querySelector(".main_background").className = "main_background";
}
