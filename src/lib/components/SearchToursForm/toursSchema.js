import * as yup from 'yup';

const schema = yup.object().shape(
  {
    where: yup.string().when('toCities', {
      is: (toCities) => toCities.length === 0,
      then: yup.string().required(),
      otherwise: yup.string()
    }),
    toCities: yup.array().of(yup.number()).when('email', {
      is: '',
      then: yup.array().required(),
      otherwise: yup.array()
    }),
    to: yup.string().required(),
    transport: yup.string().required(),
    checkIn: yup.string().required(),
    checkTo: yup.string().required(),
    from: yup.string().required(),
    nights: yup.number().required(),
    nightsTo: yup.number().required(),
    people: yup.number().required(),
    children: yup.array().of(yup.number()).required()
  },
  ['where', 'toCities']
);

export default schema;
