import { z } from "zod";

export const UserSchema = z.object({
    cnpj: z.string(),
    nome: z.string().max(100),
    apelido: z.string().max(100),
    cep: z.string().max(10),
    logradouro: z.string().max(100),
    bairro: z.string().max(100),
    cidade: z.string().max(100),
    uf: z.string().max(2),
    complemento: z.string().max(100),
    email: z.string().email().max(100),
    telefone: z.string().max(15) //exemplo: "+55 81999251485"
});

const base = z.object({
    cnpj: z.string().min(14).max(14),
    nome: z.string().max(100),
    apelido: z.string().max(100),
    cep: z.string().max(10),
    email: z.string().max(100),
    telefone: z.string().max(15) //exemplo: "+55 81999251485"
})

export type User = z.infer<typeof base>;