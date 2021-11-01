import { setLocale } from 'yup';

setLocale({
    mixed: {
        required: 'Campo Obligatorio',
    },
    string: {
        email: 'Formato de Email Invalido',
    },
});
