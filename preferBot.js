function priamid(number, strength, length){
    for(var i = 0; i < length; i++ ){
      minus(i,number);
      preference[preferenceNumber] += strength * (length - i);
    }
    for(var i=1;i<length; i++){
      plus(i,number);
      preference[preferenceNumber] += strength * (length - i);
    }
  }
  
  var preferenceNumber;
  function plus(add, digit){
    preferenceNumber = digit;
    while(add > 0){
      preferenceNumber++;
      add--;
      if(preferenceNumber == 360){
        preferenceNumber = 0;
      }
    }
  }
  function minus(add, digit){
    preferenceNumber = digit;
    while(add > 0){
      preferenceNumber--;
      add--;
      if(preferenceNumber ==- 1){
        preferenceNumber = 359;
      }
    }
  }