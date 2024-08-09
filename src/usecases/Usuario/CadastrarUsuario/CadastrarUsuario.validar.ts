import * as yup from "yup";

import { ICadastrarUsuarioDTO } from "./CadastrarUsuario.interfaces";
import { CpfValidator } from "../../../common/CpfValidator";
import { YupValidator } from "../../../common/YupValidator";

const CadastrarUsuarioValidar = async ({ nomeCompleto, cpf, telefone, email, dataNascimento, endereco }: ICadastrarUsuarioDTO) => {
  const cadastrarUsuarioDTO: ICadastrarUsuarioDTO = { nomeCompleto, cpf, telefone, email, dataNascimento, endereco };

  const setShapeValidation = {
    nomeCompleto: yup.string().required("Nome Completo é obrigatorio").min(3, "Nome completo precisa ter pelo menos 3 caracteres"),
    cpf: yup
      .string()
      .required("CPF é obrigatorio")
      .min(11, "CPF precisa ter pelo menos 3 caracteres")
      .max(11, "CPF precisa ter no máximo 3 caracteres")
      .test("cpf", "CPF inválido", (value) => CpfValidator(value)),
    telefone: yup
      .string()
      .required("Telefone é obrigatorio")
      .min(11, "Telefone precisa ter pelo menos 3 caracteres")
      .max(11, "Telefone precisa ter no máximo 3 caracteres")
      .test("phone", "Telefone inválido", (value) => !/^(\d)\1{10}$/.test(value))
      .test("phone", "Telefone inválido", (value) => {
        const validPhone = value.replace(/[^0-9]+/g, "").match(/^(\d{2})(\d{5})(\d{4})$/);
        return !!validPhone && validPhone[0] === value;
      }),
    email: yup.string().required("Email é obrigatorio").email("Email inválido"),
    dataNascimento: yup.date().required("Data de Nascimento é obrigatorio"),
    endereco: yup.string().required("Endereço é obrigatorio")
  };
  await YupValidator(setShapeValidation, cadastrarUsuarioDTO);
};

export { CadastrarUsuarioValidar };
