export const MESSAGES = {
  ERROR: {
    GENERAL: 'Une erreur est survenu, veuillez réessayer plus tard',
    NOT_FOUND: (item: string) => `${item} introuvable`,
    ALREADY_EXIST: (item: string) => `${item} existe deja`,
    FORM: {
      REQUIRED: 'Champ obligatoir',
      INVALID_DATE: 'Date invalide',
      INVALID_HOUR: 'Heure invalide',
      INVALID_HOUR_GT: 'La date de début doit être postérieure',
      INVALID_EMAIL: 'Email invalid',
      INVALID_LINK: 'Lien invalid',
    },
  },
}
