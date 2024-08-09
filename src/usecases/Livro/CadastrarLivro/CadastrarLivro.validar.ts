import moment from "moment";
import * as yup from "yup";

import { YupValidator } from "../../../common/YupValidator";
import { ISBNValidator } from "./../../../common/ISBNValidator";
import { ICadastrarLivroRawDTO } from "./CasdastrarLivro.interfaces";

const CadastrarLivroValidar = async ({
  titulo,
  autores_ids,
  generos_ids,
  editora_id,
  edicao,
  ISBN,
  quantidade,
  data_lancamento,
  descricao,
  valor_de_compra,
  valor_de_venda
}: ICadastrarLivroRawDTO) => {
  const cadastrarLivroDTO: ICadastrarLivroRawDTO = {
    titulo,
    autores_ids,
    generos_ids,
    editora_id,
    edicao,
    ISBN,
    quantidade,
    data_lancamento,
    descricao,
    valor_de_compra,
    valor_de_venda
  };

  const setShapeValidation = {
    titulo: yup.string().required("Titulo é obrigatorio").min(3, "Titulo deve ter pelo menos 3 caracteres"),
    autores_ids: yup
      .array()
      .required("Autores devem ser selecionados")
      .min(1, "Autores devem ser selecionados")
      .of(yup.string().required("Autor deve ser selecionado")),
    generos_ids: yup
      .array()
      .required("Generos devem ser selecionados")
      .min(1, "Gêneros devem ser selecionados")
      .of(yup.string().required("Genero deve ser selecionado")),
    editora_id: yup.string().required("Editora deve ser selecionada"),
    edicao: yup.number().required("Edição deve ser informada"),
    ISBN: yup
      .string()
      .required("ISBN é obrigatorio")
      .min(13, "ISBN deve ter pelo menos 13 caracteres")
      .max(13, "ISBN deve ter no maximo 13 caracteres")
      .test("isbn", "ISBN inválido", (value) => {
        const validISBN = value.replace(/[^0-9]+/g, "").match(/^(\d{13})$/);
        return !!validISBN && validISBN[0] === value;
      })
      .test("isbn", "ISBN inválido", (value) => ISBNValidator(value)),
    quantidade: yup.number().required("Quantidade deve ser informada").min(1, "Quantidade deve ser maior que 0"),
    data_lancamento: yup.date().required("Data de Lancamento deve ser informada"),
    descricao: yup.string().min(3, "Descricão deve ter pelo menos 3 caracteres"),
    valor_de_compra: yup.number(),
    valor_de_venda: yup.number()
  };
  await YupValidator(setShapeValidation, cadastrarLivroDTO);
};

export { CadastrarLivroValidar };
