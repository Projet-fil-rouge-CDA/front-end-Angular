export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'required': 'Requis',
      'invalidEmailAddress': 'Votre addresse mail est invalide',
      'invalidPassword': 'Mot de passe invalide, veuillez y mettre une majuscule, un caratère spécial et 1 chiffre',
      'minlength': `Minimum de lettre requise ${validatorValue.requiredLength}`
    };
    return config?[validatorName] : Array
  }

  static emailValidator(control : {value: string}) {
    // RFC 2822 compliant regex
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  static passwordValidator(control : {value: string}) {
    // {6,100}           - Mot de passe entre 6 et 100 caractères
    // (?=.*[0-9])       - Possède au moins un nombre
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }

  static emailOrPhoneValidator(control : {value: string}){
    // RFC 2822 compliant regex
    // {6,100}           - Mot de passe entre 6 et 100 caractères
    // (?=.*[0-9])       - Possède au moins un nombre
    if(control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)){
      return null
    } else if(control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)){
      return null
    } else {
      return { 'invalidEmailOrPhone': true};
    }
  }
}
