export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    switch (validatorName){
      case 'required':
        return 'Ce champs est requis'
      case 'invalidEmailAddress':
        return 'L\'adresse email est invalide'
      case 'invalidPhone':
        return 'Le numéro de téléphone n\'est pas bon'
      case 'invalidPassword':
        return '1 majuscule, 1 chiffre et 1 caractère spécial minimum'
      case 'minlength':
        return `${validatorValue.requiredLength} lettres minimum`
      default:
        return 'Ce champs n\'est pas valide'
    }
  }

  static emailValidator(control : {value: string}) {
    // Vérifie que le mail est une forme valide
    if (control.value.match(/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i)) {
      return null;
    } else {
      return { invalidEmailAddress : true };
    }
  }

  static phoneValidator(control : {value: string}){
    if(control.value.match(/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[6-7](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/)){
      return null
    } else {
      return { invalidPhone : true}
    }
  }

  static passwordValidator(control : {value: string}) {
    // Mot de passe de 8 caractère minimum possedant au moins un nombre / une majuscule / un caractère spécial
    if (control.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z0-9\d@$!%*?&]{8,}$/)) {
      return null;
    } else {
      return { invalidPassword : true };
    }
  }

  static emailOrPhoneValidator(control : {value: string}){
    // Vérifie que le numéro de téléphone commence bien par 05 / 06 / 07 / 08 ou 09 et contient 10 chiffres
    if(control.value.match(/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[6-7](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/)){
      return null
      // Vérifie que le mail est une forme valide
    } else if(control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)){
      return null
    } else {
      return { invalidEmailOrPhone : true};
    }
  }
}
