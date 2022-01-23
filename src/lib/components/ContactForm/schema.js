import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('The address is specified incorrectly')
    .max(250),
  name: yup.string().required('Name is required').max(250),
  phone: yup.string().max(250),
  department: yup.object().required('Department is required'),
  message: yup.string().required('Message is required').max(250)
});

export default schema;
