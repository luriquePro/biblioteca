import { Schema, model, Document } from "mongoose";

interface IUsuario {
  id: string;
  nome_completo: string;
  cpf: string;
  email: string;
  telefone: string;
  data_nascimento: Date;
  data_cadastro: Date;
  endereco: string;
}

interface Usuario extends Partial<Omit<Document, "id">>, IUsuario {}

const UsuarioSchema = new Schema<Usuario>(
  {
    id: { type: String, required: true, trim: true, index: true, unique: true },
    nome_completo: { type: String, required: true, trim: true, index: true },
    cpf: { type: String, required: true, trim: true, index: true, unique: true },
    email: { type: String, required: true, trim: true, index: true, unique: true },
    telefone: { type: String, required: true, trim: true, index: true, unique: true },
    data_nascimento: { type: Date, required: true, index: true },
    data_cadastro: { type: Date, required: true, index: true },
    endereco: { type: String, required: true, trim: true, index: true }
  },
  { timestamps: true }
);

export const Usuario = model<Usuario>("usuarios", UsuarioSchema);
