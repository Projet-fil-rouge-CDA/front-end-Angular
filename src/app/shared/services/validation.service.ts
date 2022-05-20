export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    switch (validatorName){
      case 'required':
        return 'Ce champs est requis'
      case 'invalidEmailAddress':
        return 'L\'adresse email est invalide'
      case 'invalidPassword':
        return 'Vous devez renseigner un mot de passe avec au minimum une majuscule, un chiffre et un caractère spécial'
      case 'minlength':
        return `${validatorValue.requiredLength} lettres minimum`
      default:
        return 'Ce champs n\'est pas valide'
    }
  }

  static emailValidator(control : {value: string}) {
    // RFC 2822 compliant regex
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { invalidEmailAddress : true };
    }
  }

  static passwordValidator(control : {value: string}) {
    // {6,100}           - Mot de passe entre 6 et 100 caractères
    // (?=.*[0-9])       - Possède au moins un nombre
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { invalidPassword : true };
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
      return { invalidEmailOrPhone : true};
    }
  }
}
