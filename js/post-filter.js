var debugBool = false;
function debugConLog(s)
{
    if(debugBool == true)
    {
        //console.log(``);
        //console.log(` /--------------------------------------------------------\\ `);
        console.log(s);
        //console.log(` \\--------------------------------------------------------/ `);
        //console.log(``);
    }
}

function filterSelection(c)
{
    debugConLog("[filterSelection]");
    
    debugConLog(` |     running post-filter.js,  filterSelection(${c}) js      `);
    
    
    var x, i;
    x = document.getElementsByClassName("filterDiv ");
    debugConLog(` |     document.getElementsByClassName("filterDiv "); has been executed     `);
    console.log(x);
    debugConLog(` |     argument passed was (${c})`);
    debugConLog(` |     array of div elements with class="${c}" is ${x.length} long`);
    for(var i = 0 ; i<x.length;i++)
    {
        debugConLog(x[i]);
    }
    

    if(c == "all")
    {
    debugConLog(` |     input was 'all' `);
        c="";
    debugConLog(` |     set c to "" `);
    }
    //
    debugConLog(`       length of x array is ${x.length}`);
    //
    for(i = 0 ; i < x.length ; i++)
    {
        debugConLog(`       removing show from...`);
        debugConLog(x[i]);

        w3RemoveClass(x[i],"show");

        if( x[i].className.indexOf(c) > -1 )
        {
            w3AddClass(x[i], "show");
        }
    }


    changeP5BackgroundColor();
}

function w3RemoveClass(element, name)
{
    debugConLog('[w3RemoveClass]');

    debugConLog(`   w3RemoveClass called with (${element}),${name}`);
    
    debugConLog(`   element name is ${element.name}`);

    var i, array_1, array_2;
    //create arr 1
    array_1 = element.className.split(" ");
    //=============================================================

        /* DEBUGGING  */
        //=========================================================
        debugConLog(`       array_1 is ${array_1.length} long`);
        debugConLog(`       array_1 contains: `);
        for(var j = 0 ; j < array_1.length ; j++)
        {
            debugConLog(`           ${j}:${array_1[j]}`);
        }
        debugConLog(`       END`);
    //=============================================================
    // create arr2
    array_2 = name.split(" ");
    //=============================================================
    
        /* DEBUGGING  */
        //=========================================================
        debugConLog(`       array_2 is ${array_2.length} long`);
        debugConLog(`           array_2 contains: `);
        for(var j = 0 ; j < array_2.length ; j++)
        {
            debugConLog(`           ${j}:${array_2[j]}`);
        }
        debugConLog(`       END`);
    //=============================================================
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
    debugConLog("[w3AddClass]");
    //=============================================================
    debugConLog(`w3AddClass called with (${element}),${name}`);
    //=============================================================
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

// Add active class to the current control button (highlight it)

var filterBtnContainer = document.getElementById("myFilterBtnContainer");
   
    debugConLog(` | filterBtnContainer is ${filterBtnContainer}   `);
    

if(filterBtnContainer != null)
{
    
    debugConLog(` | filterBtnContainer is not null  | `);
    

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

 
}else {
    
    debugConLog(` | filterBtnContainer is null  | `);
    
}


//filterSelection("all");


function changeP5BackgroundColor(){
    console.log("|      changeP5BackgroundColor()  |");
    var x;
    x= document.getElementsByTagName("iframe");
    console.log("X is ... ");
    console.log(x);
    console.log(x.length);
    
    for(var i = 0 ; i < x.length ; i++){
        console.log(" X["+i+"] is...");
        console.log(x[i]);
        
        x[i].style.backgroundColor = '#000000';
        var y= x[i].getElementsByTagName("body");
        console.log(" Y is... ");
        console.log(y);
        y.style.backgroundColor ='#000000';
    }

    console.log("|      changeP5BackgroundColor()  |");
}