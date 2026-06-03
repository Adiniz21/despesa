const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'despesa',
  location: 'us-east1'
};
exports.connectorConfig = connectorConfig;

const criarUsuarioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CriarUsuario', inputVars);
}
criarUsuarioRef.operationName = 'CriarUsuario';
exports.criarUsuarioRef = criarUsuarioRef;

exports.criarUsuario = function criarUsuario(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(criarUsuarioRef(dcInstance, inputVars));
}
;

const criarCategoriaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CriarCategoria', inputVars);
}
criarCategoriaRef.operationName = 'CriarCategoria';
exports.criarCategoriaRef = criarCategoriaRef;

exports.criarCategoria = function criarCategoria(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(criarCategoriaRef(dcInstance, inputVars));
}
;

const criarContaBancariaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CriarContaBancaria', inputVars);
}
criarContaBancariaRef.operationName = 'CriarContaBancaria';
exports.criarContaBancariaRef = criarContaBancariaRef;

exports.criarContaBancaria = function criarContaBancaria(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(criarContaBancariaRef(dcInstance, inputVars));
}
;

const registrarDespesaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RegistrarDespesa', inputVars);
}
registrarDespesaRef.operationName = 'RegistrarDespesa';
exports.registrarDespesaRef = registrarDespesaRef;

exports.registrarDespesa = function registrarDespesa(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(registrarDespesaRef(dcInstance, inputVars));
}
;

const excluirContaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ExcluirConta', inputVars);
}
excluirContaRef.operationName = 'ExcluirConta';
exports.excluirContaRef = excluirContaRef;

exports.excluirConta = function excluirConta(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(excluirContaRef(dcInstance, inputVars));
}
;

const excluirDespesaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ExcluirDespesa', inputVars);
}
excluirDespesaRef.operationName = 'ExcluirDespesa';
exports.excluirDespesaRef = excluirDespesaRef;

exports.excluirDespesa = function excluirDespesa(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(excluirDespesaRef(dcInstance, inputVars));
}
;

const buscarContasBancariasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'BuscarContasBancarias', inputVars);
}
buscarContasBancariasRef.operationName = 'BuscarContasBancarias';
exports.buscarContasBancariasRef = buscarContasBancariasRef;

exports.buscarContasBancarias = function buscarContasBancarias(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(buscarContasBancariasRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const buscarCategoriasRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'BuscarCategorias');
}
buscarCategoriasRef.operationName = 'BuscarCategorias';
exports.buscarCategoriasRef = buscarCategoriasRef;

exports.buscarCategorias = function buscarCategorias(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(buscarCategoriasRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const buscarDespesasRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'BuscarDespesas', inputVars);
}
buscarDespesasRef.operationName = 'BuscarDespesas';
exports.buscarDespesasRef = buscarDespesasRef;

exports.buscarDespesas = function buscarDespesas(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(buscarDespesasRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;
