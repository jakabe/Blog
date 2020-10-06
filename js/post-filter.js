
filterSelection("all");

function filterSelection(c)
{
    console.log("################################################");
    console.log(`running post-filter.js,  filterSelection(${c}) js`);

    console.log("################################################");
    var x, i;
    x= document.getElementsByClassName("filterDiv");
    if(c == "all")
    {
        c="";
    }
    for(i = 0 ; i < x.length ; i++)
    {
        w3RemoveClass(x[i],"show");
        if( x[i].className.indexOf(c) > -1 )
        {
            w3AddClass(x[i], "show");
        }
    }
}

function w3RemoveClass(element, name)
{
    var i, array_1, array_2;
    array_1 = element.className.split(" ");
    array_2 = name.split(" ");
    for( i=0 ; i< array_2.length ;i++)
    {
        while(array_1.indexOf(array_2[i])  > -1  )
        {
            array_1.splice( array_1.indexOf(array_2[i]) , 1 );
        }
    }
    element.className = array_1.join(" ");
}

function w3AddClass(element, name)
{
    var i, array_1, array_2;
    array_1 = element.className.split(" ");
    array_2 = name.split(" ");
    for( i = 0 ; i < array_2.length ; i++)
    {
        if( array_1.indexOf( array_2[i]) ==-1 )
        {
            element.className += " " + array_2[i];
        }
    }
}

var filterBtnContainer = document.getElementById("myFilterBtnContainer");
var filterBtns = filterBtnContainer.getElementsByClassName("filterBtn");

for (var i = 0; i < filterBtns.length; i++)
{
    filterBtns[i].addEventListener("click", 
    function()
    {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
}
