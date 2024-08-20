import * as yup from "yup";

import { IEmprestarLivroRawDTO } from "../EmprestarLivro/EmprestarLivro.interface";
import { YupValidator } from "../../../common/YupValidator";
const EmprestarLivroValidar = async ({ id_livro, id_usuario, periodo_dias }: IEmprestarLivroRawDTO) => {
  const EmprestarLivroDTO: IEmprestarLivroRawDTO = { id_livro, id_usuario, periodo_dias };

  const setShapeValidation = {
    id_livro: yup.string().required("Livro é um campo obrigatorio").uuid("Livro deve ser um UUID valido"),
    id_usuario: yup.string().required("Usuario é um campo obrigatorio").uuid("Usuario deve ser um UUID valido"),
    periodo_dias: yup.number().required("Periodo de dias é um campo obrigatorio").min(1, "Periodo de dias deve ser maior que 0")
  };
  await YupValidator(setShapeValidation, EmprestarLivroDTO);
};

export { EmprestarLivroValidar };
