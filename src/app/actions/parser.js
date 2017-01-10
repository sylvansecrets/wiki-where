const _ = require('underscore');
const CENSOR_BLOCK = '\u25A0';
const MIN_LENGTH = 150;

export default function parseWikiResponse(responseObj) {
  const textbody = responseObj.query.pages[Object.keys(responseObj.query.pages)[0]].extract;
  const answerCity = responseObj.query.pages[Object.keys(responseObj.query.pages)[0]].title;
  const $htmlEntire = window.$.parseHTML(textbody);
  let feasiblePara = $htmlEntire.filter(element => {
    return (element.nodeName === "P" && element.textContent.length > MIN_LENGTH);
  });
  feasiblePara = feasiblePara.map(element => {
    let processedString = censor(element.textContent, answerCity);
    processedString = stripParen(processedString);
    return processedString;
  });
  feasiblePara = feasiblePara.map(wholeSentenceMin);
  feasiblePara = feasiblePara.filter(element => {
    return censoredOnly(element);
  });
  return _.sample(feasiblePara, 3);
}

function censor(text, censorText, replaceText = CENSOR_BLOCK, replaceCount = 5, lim = 0.8) {
  const textList = text.split(' ');
  const censoredList = [];
  const agreement = Math.floor(censorText.length * lim);
  for (let i = 0; i < textList.length; i += 1) {
    let initJ = 0;
    let endJ = 0;
    let j = 0;
    const word = textList[i];
    for (let k = 0; k < word.length; k += 1) {
      if (word[k] === censorText[j]) {
        j += 1;
        if (j === 0) {
          initJ = j;
        }
        if (j >= agreement) {
          endJ = j;
        }
      }
    }
    if ((endJ - initJ) > agreement) {
      censoredList.push(replaceText.repeat(replaceCount));
    } else {
      censoredList.push(word);
    }
  }
  return censoredList.join(' ').trim();
}

function stripParen(text) {
  return text.replace(/\((.*?)\)/g, '');
}

function censoredOnly(text, censorBlock = CENSOR_BLOCK) {
  return Boolean(text.match(censorBlock));
}

function wholeSentenceMin(text, minLength = MIN_LENGTH) {
  let outputString = '';
  let moreSentence = 0;
  const sentences = text.match(/([^.!?]+[.!?:]"?)/g);
  if (sentences === null) {
    console.log("no paragraph", text);
    return outputString;
  }
  let i = 0;
  function addNext(i) {
    if (sentences[i]) {
      outputString += sentences[i];
    }
  }
  while (moreSentence < 2) {
    addNext(i);
    let noSpaceFollow = false;
    let lastAbbr = false;
    if (sentences[i + 1]) {
      noSpaceFollow = sentences[i + 1][0] !== ' ';
      lastAbbr = Boolean(outputString.substr(outputString.length - 4).match(/(.\s[A-Z][.])|(\s[A-Z][a-z][.])/));
    }
    // console.log("noSpaceFollow:", noSpaceFollow, "lastAbbr", lastAbbr, sentences[i], i);
    if (lastAbbr || noSpaceFollow) {
      moreSentence -= 1;
    }

    if (outputString.length > minLength || !sentences[i]) {
      moreSentence += 1;
    }
    i += 1;
  }
  return outputString;
}

