//the perceptron algorithm:
//1. For every input, multiply that input by its weight
//2. Sum all of the weighted inputs
//3. Compute the output of the perceptron based on that sum passed through an activation function (sign of sum)

//example: 
/*
float [] inputs =  { 12 ,  4};
float [] weights = {0.5 , -1};
*/

/********************************************************************/
/*Requirements of the Perceptron class
1. constructor that takes two arguments. 
-argument_1 := the number of weights 
-argument_1 := the learning constant

2. train function that takes two arguments
-argument_1 := inputs
-argument_2 := desired output

3. feedforward function that takes inputs and returns activation

4. activate function that takes sum and returns sign

5. getWeights function returns weights

6. setWeights? (OPTIONAL)

*/

/**
*
*
**/
class Perceptron
{

  constructor(n , c) {
    this.weights = new Array(n);

    
    //randomize the weights
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] = random(-1, 1);
    }
    this.c = c; //the learning constant
  }
  
  /**
  *
  *
  **/
  train(inputs, desired) 
  {
    let guess = this.feedforward(inputs);
    /*
      This computes the factor for changing the 
      weight based on the error
      Error = desired output - guessed output
      NOTE:  The error is bound to {-2,0,2}
      -multiply by the learning constant
    */
    let error = desired - guess;
    
    //this loop adjusts the weights based on the
    //necessary chang * input
    for (let i =0; i< this.weights.length; i++)
    {
      this.weights[i] += this.c * error * inputs[i];
    }
    
  }
  /**
  *
  *
  **/
  feedforward(inputs)
  {
    //sum all the values
    let sum = 0;
    for(let i = 0 ; i < this.weights.length; i++)
    {
      sum += inputs[i] * this.weights[i];
    }
    //results is the sign of the sum, {-1,1}
    return this.activate(sum);
  }
  
  /**
  *
  *
  **/
  activate( sum )
  {
    if(sum>0) return 1;
    else return -1;
   
  }
  
  //return the weights
  getWeights()
  {
    return this.weights;
  }


}