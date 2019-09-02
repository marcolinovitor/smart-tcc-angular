interface FipeModelos {
  modelos: Modelo[];
  anos: Ano[];
}

interface Ano {
  nome: string;
  codigo: string;
}

interface Modelo {
  nome: string;
  codigo: number;
}