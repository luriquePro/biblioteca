import { Schema, model, Document } from "mongoose";
import { IUsuarioDTO } from "../types/Usuario.types";

interface Usuario extends Partial<Omit<Document, "id">>, IUsuarioDTO {}

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
