/**
flags the time with a string
*/
function f(strang){
    d=new Date();
    console.log(`   ${strang} @${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}`);
}

/**
    easier print function
*/
function p(pr){
    console.log(pr);
}

function clf(s)
{
    f(`[I!] `+s);
}

function includeHTML(rv) 
{
    var recursionVar = 0;
    if(rv == 0)
    {

    } else 
    {
      recursionVar = rv;
    }

    clf('includeHTML('+recursionVar+')');
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];

      //build debug string
      // var debugString ="Layer ";
      // for(var spaces = 0; spaces < recursionVar; spaces++)
      // {
      //   debugString+="-> ";
      // }

      // //
      // f(`${debugString}[I!] checking ${z[i]}`);
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("w3-include-html");

      if (file) {
        //console.log(file);
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200 ) {
              
              elmnt.innerHTML = this.responseText;

            }
            if (this.status == 404) {
              elmnt.innerHTML = "Page not found.";
            }
            if(this.status == 0){
              //console.log(`status is 0! file not from webserver`);
              //console.log(this.responseText);
            }
            //console.log(this.status);
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("w3-include-html");
            includeHTML(recursionVar+1);
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        //console.log(`includeHTML about to terminate`);
        return;
      }
    }
}