import { ISBNValidator } from "./../../../common/ISBNValidator";
import { ICadastrarLivroDTO } from "./CasdastrarLivro.interfaces";
import { YupValidator } from "../../../common/YupValidator";
import * as yup from "yup";

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
}: ICadastrarLivroDTO) => {
  const cadastrarLivroDTO: ICadastrarLivroDTO = {
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
    autores_ids: yup.array().required("Autores devem ser selecionados").min(1).of(yup.string().required("Autor deve ser selecionado")),
    generos_ids: yup.array().required("Generos devem ser selecionados").min(1).of(yup.string().required("Genero deve ser selecionado")),
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
      .test("isbn", "ISBN inválido", (value) => ISBNValidator(value))
  };
  await YupValidator(setShapeValidation, cadastrarLivroDTO);
};

export { CadastrarLivroValidar };
