let number = 10000;
const numberOfZeroes = {
    '0': "",
    '4': "thousand",
    '7': "million",
    '10': "billion",
    '13': "trillion",
    '16': "quadrillion",
    '19': "quintillion",
};
const specialNumbers = {
    '10': "ten",
    '11': "eleven",
    '12': "twelve",
    '13': "thirteen",
    '14': "fourteen",
    '15': "fifteen",
    '16': "sixteen",
    '17': "seventeen",
    '18': "eighteen",
    '19': "nineteen"
}
const numberOfTens = {
    '20': "twenty",
    '30': "thirty",
    '40': "forty",
    '50': "fifty",
    '60': "sixty",
    '70': "seventy",
    '80': "eighty",
    '90': "ninety",
    '100': "one hundred"
};
const numberToString = {
    '0': "",
    '1': "one",
    '2': "two",
    '3': "three",
    '4': "four",
    '5': "five",
    '6': "six",
    '7': "seven",
    '8': "eight",
    '9': "nine",
    
};

function getNrOfUnits(number) {
    let copy = number;
    let i = 0;
    while(copy >= 1) {
        i++;
        copy/=10;
    }
    return i;
}

function transformUpToTen(unit) {
    return numberToString[unit.toString()];
}

function transformUpToOneHundred(number) {
    if(number>=20 && number<=100) return numberOfTens[Math.floor(number/10) * 10] + ` ${number%10 != 0 ? transformUpToTen(number%10) : ""}`;
    else if(number < 20 && number >= 10) return specialNumbers[number];
    else return transformUpToTen(number);
}


function transformUpToAThousand(number) {
    if(number >= 100 && number < 1000) return transformUpToTen(Math.floor(number/100)) + " hundred " + transformUpToOneHundred(number%100);
    else return transformUpToOneHundred(number%100);
}

function getFirstThree(number) {
    let changedNr = number;
    let lengthIndex = 0;
    let nrLength = getNrOfUnits(number);
    while(nrLength >= 3 ) {
        changedNr = Math.floor(changedNr / 1000) ? Math.floor(changedNr / 1000) : changedNr;
        lengthIndex++;
        nrLength-=3;
    }
    return changedNr;
}

function approximateNrOfZeroes(unitsNr) {
    if(unitsNr <= 3) return '0';
    else if(unitsNr % 3 == 0) return unitsNr - 2;
    else return unitsNr - unitsNr % 3 + 1;
}

function transformFirstThousand(number) {
    let nrOfUnits = getNrOfUnits(number);
    let firstThousandUnits = getFirstThree(number);
    console.log(nrOfUnits, firstThousandUnits);
    number = number - firstThousandUnits * 10**(nrOfUnits % 3 ? nrOfUnits - nrOfUnits % 3 : nrOfUnits - 3);
    console.log(number)
    return transformUpToAThousand(firstThousandUnits) + " " + numberOfZeroes[approximateNrOfZeroes(nrOfUnits)] + " ";
}

function transformToString(number) {
    if(number == 0) return "Zero";
    let string = "";
    let copy = number;
    let zeroesInNumber = getNrOfUnits(number);
    console.log(zeroesInNumber);
    do {
        string += transformFirstThousand(copy);
        let firstThousandUnits = getFirstThree(copy);
        copy = copy - firstThousandUnits * 10**(zeroesInNumber % 3 ? zeroesInNumber - zeroesInNumber % 3 : zeroesInNumber - 3);
        zeroesInNumber-= 3;
    }while(zeroesInNumber > 0)
    return string;
}

 const random = Math.floor(Math.random() * 10000000);
 console.log(random); 
console.log(transformToString(random));

const input = document.getElementById("number-input");
const enterBtn = document.getElementById("enter-btn");
const modal = document.getElementById("result-modal");
const closeModalBtn = document.getElementById("close-modal");
const result = document.getElementById("result");

function processInput() {
    result.innerHTML = `<p>${transformToString(Number(input.value))}</p>`
    modal.showModal();
}

enterBtn.addEventListener("click", processInput);
closeModalBtn.addEventListener("click", () => {
    modal.close();
});