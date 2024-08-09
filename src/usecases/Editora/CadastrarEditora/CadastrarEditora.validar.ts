import * as yup from "yup";

import { YupValidator } from "../../../common/YupValidator";
import { ICadastrarEditoraDTO } from "./CadastrarEditora.interface";

const CadastrarEditoraValidar = async ({ editora }: ICadastrarEditoraDTO) => {
  const CadastrarEditoraDTO: ICadastrarEditoraDTO = { editora };
  const setShapeValidation = {
    editora: yup.string().required("Editora é obrigatorio").min(3, "Editora precisa ter pelo menos 3 caracteres")
  };
  await YupValidator(setShapeValidation, CadastrarEditoraDTO);
};

export { CadastrarEditoraValidar };
