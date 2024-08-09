import * as yup from "yup";

import { YupValidator } from "../../common/YupValidator";
import { ICadastrarGeneroDTO } from "./CadastrarGenero.interface";

const CadastrarGeneroValidar = async ({ genero }: ICadastrarGeneroDTO) => {
  const cadastrarGeneroDTO: ICadastrarGeneroDTO = { genero };
  const setShapeValidation = { genero: yup.string().required("Gênero é obrigatorio").min(3, "Gênero precisa ter pelo menos 3 caracteres") };
  await YupValidator(setShapeValidation, cadastrarGeneroDTO);
};

export { CadastrarGeneroValidar };
