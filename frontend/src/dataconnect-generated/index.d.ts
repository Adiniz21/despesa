import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface BuscarCategoriasData {
  categorias: ({
    id: UUIDString;
    nomeCategoria: string;
  } & Categoria_Key)[];
}

export interface BuscarContasBancariasData {
  contaBancarias: ({
    id: UUIDString;
    nomeBanco: string;
    saldo: number;
    criadoEm: DateString;
  } & ContaBancaria_Key)[];
}

export interface BuscarContasBancariasVariables {
  usuarioId: string;
}

export interface BuscarDespesasData {
  despesas: ({
    id: UUIDString;
    descricao: string;
    valor: number;
    tipo: string;
    dataDespesa: DateString;
    contaBancaria: {
      id: UUIDString;
      nomeBanco: string;
    } & ContaBancaria_Key;
      categoria: {
        nomeCategoria: string;
      };
  } & Despesa_Key)[];
}

export interface BuscarDespesasVariables {
  usuarioId: string;
}

export interface Categoria_Key {
  id: UUIDString;
  __typename?: 'Categoria_Key';
}

export interface ContaBancaria_Key {
  id: UUIDString;
  __typename?: 'ContaBancaria_Key';
}

export interface CriarCategoriaData {
  categoria_insert: Categoria_Key;
}

export interface CriarCategoriaVariables {
  nomeCategoria: string;
}

export interface CriarContaBancariaData {
  contaBancaria_insert: ContaBancaria_Key;
}

export interface CriarContaBancariaVariables {
  usuarioId: string;
  nomeBanco: string;
  saldoInicial: number;
}

export interface CriarUsuarioData {
  usuario_insert: Usuario_Key;
}

export interface CriarUsuarioVariables {
  id: string;
  email: string;
}

export interface Despesa_Key {
  id: UUIDString;
  __typename?: 'Despesa_Key';
}

export interface ExcluirContaData {
  contaBancaria_delete?: ContaBancaria_Key | null;
}

export interface ExcluirContaVariables {
  id: UUIDString;
}

export interface ExcluirDespesaData {
  despesa_delete?: Despesa_Key | null;
  contaBancaria_update?: ContaBancaria_Key | null;
}

export interface ExcluirDespesaVariables {
  despesaId: UUIDString;
  contaBancariaId: UUIDString;
  novoSaldo: number;
}

export interface RegistrarDespesaData {
  despesa_insert: Despesa_Key;
  contaBancaria_update?: ContaBancaria_Key | null;
}

export interface RegistrarDespesaVariables {
  usuarioId: string;
  contaBancariaId: UUIDString;
  categoriaId: UUIDString;
  descricao: string;
  valor: number;
  novoSaldo: number;
  tipo: string;
}

export interface Usuario_Key {
  id: string;
  __typename?: 'Usuario_Key';
}

interface CriarUsuarioRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CriarUsuarioVariables): MutationRef<CriarUsuarioData, CriarUsuarioVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CriarUsuarioVariables): MutationRef<CriarUsuarioData, CriarUsuarioVariables>;
  operationName: string;
}
export const criarUsuarioRef: CriarUsuarioRef;

export function criarUsuario(vars: CriarUsuarioVariables): MutationPromise<CriarUsuarioData, CriarUsuarioVariables>;
export function criarUsuario(dc: DataConnect, vars: CriarUsuarioVariables): MutationPromise<CriarUsuarioData, CriarUsuarioVariables>;

interface CriarCategoriaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CriarCategoriaVariables): MutationRef<CriarCategoriaData, CriarCategoriaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CriarCategoriaVariables): MutationRef<CriarCategoriaData, CriarCategoriaVariables>;
  operationName: string;
}
export const criarCategoriaRef: CriarCategoriaRef;

export function criarCategoria(vars: CriarCategoriaVariables): MutationPromise<CriarCategoriaData, CriarCategoriaVariables>;
export function criarCategoria(dc: DataConnect, vars: CriarCategoriaVariables): MutationPromise<CriarCategoriaData, CriarCategoriaVariables>;

interface CriarContaBancariaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CriarContaBancariaVariables): MutationRef<CriarContaBancariaData, CriarContaBancariaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CriarContaBancariaVariables): MutationRef<CriarContaBancariaData, CriarContaBancariaVariables>;
  operationName: string;
}
export const criarContaBancariaRef: CriarContaBancariaRef;

export function criarContaBancaria(vars: CriarContaBancariaVariables): MutationPromise<CriarContaBancariaData, CriarContaBancariaVariables>;
export function criarContaBancaria(dc: DataConnect, vars: CriarContaBancariaVariables): MutationPromise<CriarContaBancariaData, CriarContaBancariaVariables>;

interface RegistrarDespesaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RegistrarDespesaVariables): MutationRef<RegistrarDespesaData, RegistrarDespesaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RegistrarDespesaVariables): MutationRef<RegistrarDespesaData, RegistrarDespesaVariables>;
  operationName: string;
}
export const registrarDespesaRef: RegistrarDespesaRef;

export function registrarDespesa(vars: RegistrarDespesaVariables): MutationPromise<RegistrarDespesaData, RegistrarDespesaVariables>;
export function registrarDespesa(dc: DataConnect, vars: RegistrarDespesaVariables): MutationPromise<RegistrarDespesaData, RegistrarDespesaVariables>;

interface ExcluirContaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ExcluirContaVariables): MutationRef<ExcluirContaData, ExcluirContaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ExcluirContaVariables): MutationRef<ExcluirContaData, ExcluirContaVariables>;
  operationName: string;
}
export const excluirContaRef: ExcluirContaRef;

export function excluirConta(vars: ExcluirContaVariables): MutationPromise<ExcluirContaData, ExcluirContaVariables>;
export function excluirConta(dc: DataConnect, vars: ExcluirContaVariables): MutationPromise<ExcluirContaData, ExcluirContaVariables>;

interface ExcluirDespesaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ExcluirDespesaVariables): MutationRef<ExcluirDespesaData, ExcluirDespesaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ExcluirDespesaVariables): MutationRef<ExcluirDespesaData, ExcluirDespesaVariables>;
  operationName: string;
}
export const excluirDespesaRef: ExcluirDespesaRef;

export function excluirDespesa(vars: ExcluirDespesaVariables): MutationPromise<ExcluirDespesaData, ExcluirDespesaVariables>;
export function excluirDespesa(dc: DataConnect, vars: ExcluirDespesaVariables): MutationPromise<ExcluirDespesaData, ExcluirDespesaVariables>;

interface BuscarContasBancariasRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: BuscarContasBancariasVariables): QueryRef<BuscarContasBancariasData, BuscarContasBancariasVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: BuscarContasBancariasVariables): QueryRef<BuscarContasBancariasData, BuscarContasBancariasVariables>;
  operationName: string;
}
export const buscarContasBancariasRef: BuscarContasBancariasRef;

export function buscarContasBancarias(vars: BuscarContasBancariasVariables, options?: ExecuteQueryOptions): QueryPromise<BuscarContasBancariasData, BuscarContasBancariasVariables>;
export function buscarContasBancarias(dc: DataConnect, vars: BuscarContasBancariasVariables, options?: ExecuteQueryOptions): QueryPromise<BuscarContasBancariasData, BuscarContasBancariasVariables>;

interface BuscarCategoriasRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<BuscarCategoriasData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<BuscarCategoriasData, undefined>;
  operationName: string;
}
export const buscarCategoriasRef: BuscarCategoriasRef;

export function buscarCategorias(options?: ExecuteQueryOptions): QueryPromise<BuscarCategoriasData, undefined>;
export function buscarCategorias(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<BuscarCategoriasData, undefined>;

interface BuscarDespesasRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: BuscarDespesasVariables): QueryRef<BuscarDespesasData, BuscarDespesasVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: BuscarDespesasVariables): QueryRef<BuscarDespesasData, BuscarDespesasVariables>;
  operationName: string;
}
export const buscarDespesasRef: BuscarDespesasRef;

export function buscarDespesas(vars: BuscarDespesasVariables, options?: ExecuteQueryOptions): QueryPromise<BuscarDespesasData, BuscarDespesasVariables>;
export function buscarDespesas(dc: DataConnect, vars: BuscarDespesasVariables, options?: ExecuteQueryOptions): QueryPromise<BuscarDespesasData, BuscarDespesasVariables>;

