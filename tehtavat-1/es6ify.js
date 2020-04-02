function hello() { 
    console.log('Hello, World!'); 
}

function sayHi(name) { 
    console.log('Hi ' + name + '!'); 
}

function multiplyByTen(a) { 
    return a * 10; 
}

function sum(a, b) { return a + b; }

function power(base, exponent) { 
    var result = 1; 
    for (var count = 0; count < exponent; count++) { 
        result *= base; 
    } 
    return result; 
}; 
