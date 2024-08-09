import { ICadastrarAutorDTO } from "./CadastrarAutor.interfaces";
import * as yup from "yup";

import { YupValidator } from "../../../common/YupValidator";

const CadastrarAutorValidar = async ({ autor }: ICadastrarAutorDTO) => {
  const cadastrarAutorDTO: ICadastrarAutorDTO = { autor };
  const setShapeValidation = { autor: yup.string().required("Autor é obrigatorio").min(3, "Autor precisa ter pelo menos 3 caracteres") };
  await YupValidator(setShapeValidation, cadastrarAutorDTO);
};

export { CadastrarAutorValidar };
