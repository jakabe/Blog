function changeP5BackgroundColor(){
    console.log("|      changeP5BackgroundColor()  |");
    var x;
    x= document.getElementsByTagName("iframe");
    console.log(x);
    console.log(x.length);
    for(var i = 0 ; i < x.length ; i++){
        console.log(x[i]);
    }

    console.log("|      changeP5BackgroundColor()  |");
}