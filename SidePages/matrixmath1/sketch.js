

function s(th){
    return sin(th);
}

function c(th){
    return cos(th);
}

function r_xString(theta){
    let rx = 
    [
    [   '1',      '0',              '0'           ],
    [   '0',      ' c('+theta+')',    '-s('+theta+')' ],
    [   '0',      ' s('+theta+')',     ' c('+theta+')'  ]
    ];
    return rx;
} 

function r_yString(theta){
    let ry = 
    [
    [   ' c('+theta+')',    '0',      ' s('+theta+')' ],
    [   '0',              '1',      '0'          ],
    [   '-s('+theta+')',    '0',      ' c('+theta+')' ]
    ];
    return ry;
}

function r_zString(theta){
    let rz = 
    [
    [   ' c('+theta+')',    '-s('+theta+')',    '0' ],
    [   ' s('+theta+')',     ' c('+theta+')',     '0' ],
    [   '0',              '0',              '1' ]
    ];
    return rz;
}

//end string matrices

function r_x(theta){
    let rx = 
    [
    [   1,      0,              0           ],
    [   0,      c(theta),    -s(theta) ],
    [   0,      s(theta),     c(theta)  ]
    ];
    return rx;
} 

function r_y(theta){
    let ry = 
    [
    [   c(theta),    0,      s(theta) ],
    [   0,              1,      0          ],
    [   -s(theta),    0,      c(theta) ]
    ];
    return ry;
}

function r_z(theta){
    let rz = 
    [
    [   c(theta),    -s(theta),    0 ],
    [   s(theta),     c(theta),     0 ],
    [   0,              0,              1 ]
    ];
    return rz;
}
//end mathematical matrices

function stringMatrixMultiplication(m1, m2){
    let resultMatrix =[];
    let newRow = [];
    let newEntry ='';
    let newTerm='';
    for(let i =0 ; i < m1.length; i++){
        //i is the row indice
        for(let j=0; j < m1[i].length; j++){
            //j is the column indice
            /*
                The i,j entry of the new matrix will be made up of
                entries from m1[i][j] and m2[j][i]
            */
            //first go through all entries from m1[i]
            for(let m1_rowIndex = 0; m1_rowIndex < m1[i].length; m1_rowIndex++){
                for(let m2_colIndex = 0; m2_colIndex < m2.length; m2_colIndex++){
                   

                }
            }
           
            
        }
        

    }
    return resultMatrix;
}

function setup() {
    var canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
}


function draw(){
    background(0);
    fill(255);
    textSize(16);
    text('hello' ,20, 20);
    text(mResultsToString( r_xString('Pi') ) ,20, 40);
    let rxrz = stringMatrixMultiplication(
        r_xString('PI/2'), r_zString('PI/4') 
    );

    text(
        mResultsToString( 
             rxrz
        )
    ,100,100);

    let rxrzry = stringMatrixMultiplication(
        rxrz, r_yString('PI/3') 
    );

    text(
        mResultsToString( 
             rxrzry
        )
    ,40,300);
}

function mResultsToString(m){
    let s="";
    
    for(let i = 0 ; i < m.length ; i++){
        s+='| ';
        for(let j = 0 ; j <m[i].length; j++){
            s+=m[i][j]+', '
        }
        s=s.slice(0,s.length-1);
        s=s.slice(0,s.length-1);
        s+=' |';
        s+='\n';
        
    }
    
    return s;
}



