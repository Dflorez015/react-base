import * as yup from 'yup'

// #region config

type userDocumentTypes =
    | 'CitizenshipCard'
    | 'DiplomaticCard'
    | 'ForeignerIdentityCard'
    | 'IdentityCard'
    | 'Nit'
    | 'Passport'
    | 'SafeConduct'
    | 'SpecialPermissionToStay'
    | 'TemporaryProtectionPermit';



export const identificationType: { Key: userDocumentTypes; Value: string }[] = [
    { Key: 'CitizenshipCard', Value: 'Cédula de ciudadanía' },
    { Key: 'IdentityCard', Value: 'Tarjeta de identidad' },
    { Key: 'ForeignerIdentityCard', Value: 'CE' },
    { Key: 'Nit', Value: 'NIT' },
    { Key: 'SpecialPermissionToStay', Value: 'PEP' },
    { Key: 'TemporaryProtectionPermit', Value: 'PPT' },
    { Key: 'Passport', Value: 'Pasaporte' },
    { Key: 'DiplomaticCard', Value: 'Carta diplomática' },
    { Key: 'SafeConduct', Value: 'Licencia de conducir' },
];

// #region regex

const specialCharRegExp = "@$!%*/?&_.;¡¿-"
export const passRegExp = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[${specialCharRegExp}])[A-Za-z\\d${specialCharRegExp}]{12,}$`)
export const verifyPass = new RegExp(`(?=.*[${specialCharRegExp}])`)
export const identificationTypeSchema = yup
    .mixed<userDocumentTypes>()
    .oneOf(identificationType.map(opt => opt.Key))
    .default('CitizenshipCard')

// #region methods

yup.addMethod(yup.string, 'num', function (this, message = "Valor ingresado no válido") {
    return this.matches(/^[0-9]*$/, message)
})

yup.addMethod(yup.string, 'userEmail', function (this, message = "Correo electrónico no válido") {
    return this.matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/, message)
})

yup.addMethod(yup.string, 'password', function (this, message = "Contraseña no válida") {
    return this.matches(passRegExp, message)
})

// module interface -----

declare module "yup" {
    interface StringSchema {
        num(message?: string): StringSchema;
        userEmail(message?: string): StringSchema;
        password(message?: string): StringSchema;
    }
}

export default yup