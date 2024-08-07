import * as yup from "yup";

const YupValidator = async (dataShape: yup.AnyObject, dataValidation: object) => {
  try {
    const schema = yup.object().shape(dataShape);
    await schema.validate(dataValidation);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { YupValidator };
