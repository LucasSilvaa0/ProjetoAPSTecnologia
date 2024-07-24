
import axios from "axios";

export interface CepData {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
    error: boolean;
}

export async function fetchCep(cep: string) : Promise<CepData | null> {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) {
            throw new Error('Erro ao buscar CEP');
        }
        const cepdata = await response.json();

        return cepdata
    } catch (error) {
        console.error('Erro ao buscar CEP.');
        return null
    }
}

export async function validateCNPJ(cnpj: string) {
    try {
        const response = await fetch(`https://www.cnpj.ws/${cnpj}`);
        if (!response.ok) {
            throw new Error('Erro ao validar CNPJ na Receita WS');
        }
        const validcnpj = await response.json();
        return validcnpj;
    } catch (error) {
        throw new Error('Erro ao validar CNPJ na Receita WS');
    }
};