export interface Developer {
  _id?: string;
  nome: string;
  sexo: string;
  idade: string;
  hobby: string;
  dataNascimento: string;
};

interface SexoDescricaoInterface  {
  M: string;
  F: string;
  O: string;
  [key: string]: string;
}

export const SexoDescricao: SexoDescricaoInterface = {
  M: 'Masculino',
  F: 'Feminino',
  O: 'Outro'
}