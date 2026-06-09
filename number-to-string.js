let number = 10000;
//e.g: 4: thousand
const numberOfZeroes = {
    '0': "",
    '6': "thousand",
    '9': "million",
    '12': "billion",
    '15': "trillion",
    '18': "quadrillion",
    '21': "quintillion",
    '24': "sextillion",
    '27': "septillion",
    '30': "octillion",
    '33': "nonillion",
    '36': "decillion",
    '39': "undecillion",
    '42': "duodecillion",
    '45': "tredecillion",
    '48': "quattuordecillion",
    '51': "quindecillion",
    '54': "sexdecillion",
    '57': "septendecillion",
    '60': "octodecillion",
    '63': "novemdecillion",
    '66': "vigintillion",
    '69': "unvigintillion",
    '72': "duovigintillion",
    '75': "trevigintillion",
    '78': "quattuorvigintillion",
    '81': "quinvigintillion",
    '84': "sexvigintillion",
    '87': "septenvigintillion",
    '90': "octovigintillion",
    '93': "novemvigintillion",
    '96': "trigintillion",
    '99': "untrigintillion",
    '102': "duotrigintillion",
    '105': "tretrigintillion",
    '108': "quattuortrigintillion",
    '111': "quintrigintillion",
    '114': "sextrigintillion",
    '117': "septentrigintillion",
    '120': "octotrigintillion",
    '123': "novemtrigintillion",
    '126': "quadragintillion",
    '129': "unquadragintillion",
    '132': "duoquadragintillion",
    '135': "trequadragintillion",
    '138': "quattuorquadragintillion",
    '141': "quinquadragintillion",
    '144': "sexquadragintillion",
    '147': "septenquadragintillion",
    '150': "octoquadragintillion",
    '153': "novemquadragintillion",
    '156': "quinquagintillion",
    '159': "unquinquagintillion",
    '162': "duoquinquagintillion",
    '165': "trequinquagintillion",
    '168': "quattuorquinquagintillion",
    '171': "quinquinquagintillion",
    '174': "sexquinquagintillion",
    '177': "septenquinquagintillion",
    '180': "octoquinquagintillion",
    '183': "novemquinquagintillion",
    '186': "sexagintillion",
    '189': "unsexagintillion",
    '192': "duosexagintillion",
    '195': "tresexagintillion",
    '198': "quattuorsexagintillion",
};
//e.g: 10: ten, 11: eleven
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
//eg: 20: twenty
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
//e.g: 1: one
const digitToString = {
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
    const digit = /^\d$/;
    let copy = number;
    let numberString = "";
    let i = 0;
    while(copy[0] == 0) copy = copy.slice(1);
    while(copy) {
        if(digit.test(copy[0])) {
            i++;
            numberString += copy[0];
        }
        copy = copy.slice(1);
    }
    if(i % 3)   {
        numberString = '0'.repeat(3 - i % 3) + numberString;
        i += 3 - i%3;
    } 
    return {
        numberLength: i,
        numberString
    };
}

function transformUpToTen(unit) {
    return digitToString[unit];
}

function transformUpToOneHundred(number) {
    if(number >= 20) return numberOfTens[Math.floor(number/10) * 10] + ` ${number%10 != 0 ? transformUpToTen(number%10) : ""}`;
    else if(number < 20 && number >= 10) return specialNumbers[number];
    else return transformUpToTen(number);
}


function transformUpToAThousand(number) {
    if(number >= 100) return transformUpToTen(Math.floor(number/100)) + " hundred " + transformUpToOneHundred(number%100);
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
    if(unitsNr == 3) return 0;
    else return unitsNr;
}

function transformThousand(number, numberLength) {
    return transformUpToAThousand(number) + " " + numberOfZeroes[approximateNrOfZeroes(numberLength)] + " ";
}

export function transformToString(number) {
    if(number == 0) return "Zero";
    let string = "";
    let { numberLength, numberString } = getNrOfUnits(number);
    while(numberLength > 0) {
        string += transformThousand(parseInt(numberString.slice(0, 3)), numberLength);
        numberString = numberString.slice(3);
        numberLength -= 3;
    }
    return string[0].toUpperCase() + string.slice(1, string.length - 2) + '.';
}

/*
 const random = Math.floor(Math.random() * 10000000);
 console.log(random); 
console.log(transformToString(String(random)));
*/