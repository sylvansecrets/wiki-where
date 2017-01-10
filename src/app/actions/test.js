function wholeSentenceMin(text, minLength = MIN_LENGTH) {
  let outputString = '';
  let moreSentence = 0;
  const sentences = text.match(/([^.!?]+[.!?:]"?)\s?/g);
  let i = 0;
  function addNext(i) {
    if(sentences[i]){
      outputString += sentences[i];
    }
  }
  while (moreSentence < 2) {
    addNext(i);
    const lastCapital = outputString[outputString.length - 2].match(/[A-Z]/);
    const noSpaceFollow = sentences[i + 1] && sentences[i + 1][0] !== ' ';
    if (lastCapital || noSpaceFollow) {
      moreSentence -= 1;
    }
    if (outputString.length > minLength) {
      moreSentence += 1;
    }
    i += 1;
  }
  return outputString;
}

const MIN_LENGTH = 100
console.log(wholeSentenceMin('The opening line of John Lennon\'s Beatles\' song I Am the Walrus, "I am he as you are he as you are me and we are all together," is often believed to be based on the lyric "I\'m with you and you\'re with me and so we are all together" in "Marching to Pretoria." Lennon denied this, insisting his lyrics came from:'))
