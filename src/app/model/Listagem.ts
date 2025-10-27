export interface Listagem<T> {
  itens: T[];
  paginaAtual: number;
  totalPaginas: number;
  totalRegistros: number;
}
