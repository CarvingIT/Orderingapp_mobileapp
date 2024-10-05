import { Dimensions } from 'react-native';
export function phoneNumberFormat(text) {
  var cleaned = ('' + text).replace(/\D/g, '');
  var match = cleaned.match(/(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    var number = [match[1], '-', match[2], '-', match[3]].join('');
    return number;
  }

  return text;
}
export function validateEmail(text) {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(text) === false) {
    return false;
  } else {
    return true;
  }
}

export function validateRequired(value){
  if (value === null || value === "" || value === undefined || value.trim() === "") {
    return false
  } else {
    return true
  }
}

export function validateNumber(value){
  let regex = /^[0-9]*$/

  if (!regex.test(value) && value.trim() != "") {
    return false
  } else {
    return true
  }
}

export function formatPhoneNumber(phone) {
  //normalize string and remove all unnecessary characters
  if (phone) {
    phone = phone.replace(/[^\d]/g, "")
    return phone.replace(/(\d{3})(\d{3})(\d{2,4})/, "($1) $2-$3")
  }
  return null
}


export function validatePhone(value) {
  let regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{2,4}$/
  //Matches Case
  // 123-456-7890
  // (123) 456-7890
  // 123 456 7890
  // 123.456.7890
  // +91 (123) 456-7890
  value = formatPhoneNumber(value)
  if (value) {
    if (!regex.test(value)) {
      return false
    } else {
      return true
    }
  } else {
    return true
  }
}
 
export function getResponsiveRound(heightPercentage) {


    let screenWidth = Dimensions.get('window').width;
    let screenHeight = Dimensions.get('window').height;

    const data = {
        width : ((screenHeight/100*heightPercentage)*100)/screenWidth ,
        borderRadius :  (screenHeight/100*heightPercentage)/2 
    };

   return data;
    
}

export function  getGreetingTime(currentTime){
  if (!currentTime || !currentTime.isValid()) { return 'Hello'; }

  const splitAfternoon = 12; // 24hr time to split the afternoon
  const splitEvening = 17; // 24hr time to split the evening
  const currentHour = parseFloat(currentTime.format('HH'));

  if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
    // Between 12 PM and 5PM
    return 'Good Afternoon!';
  } else if (currentHour >= splitEvening) {
    // Between 5PM and Midnight
    return 'Good Evening!';
  }
  // Between dawn and noon
  return 'Good Morning!';
}

export function getInitials(name){
  return name.split(" ").map((n)=>n[0]).join("");
}
