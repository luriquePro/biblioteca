import * as yup from "yup";

import { IEmprestarLivroRawDTO } from "../EmprestarLivro/EmprestarLivro.interface";
import { YupValidator } from "../../../common/YupValidator";
const EmprestarLivroValidar = async ({ id_livro, id_usuario, periodo_dias }: IEmprestarLivroRawDTO) => {
  const EmprestarLivroDTO: IEmprestarLivroRawDTO = { id_livro, id_usuario, periodo_dias };

  const setShapeValidation = {
    id_livro: yup.string().uuid().required("Livro é um campo obrigatorio"),
    id_usuario: yup.string().uuid().required("Usuario é um campo obrigatorio"),
    periodo_dias: yup.number().required("Periodo de dias é um campo obrigatorio")
  };
  await YupValidator(setShapeValidation, EmprestarLivroDTO);
};

export { EmprestarLivroValidar };
