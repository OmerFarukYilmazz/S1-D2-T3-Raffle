function randomNumber(/* kodlar buraya */) {
  /* kodlar buraya */
  let number = Math.floor(Math.random() * 1000);
  //console.log(number);
  if (number % 2 === 0) {
    //console.log(number + ' çift sayıdır');
    return number + ' sayısı çift sayıdır';
  } else {
    //console.log(number + ' tek sayıdır');
    return number + ' sayısı tek sayıdır';
  }
}

/* Bu satırdan sonraki satırları silmeyin! */
module.exports = randomNumber;
