# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*BuscarContasBancarias*](#buscarcontasbancarias)
  - [*BuscarCategorias*](#buscarcategorias)
  - [*BuscarDespesas*](#buscardespesas)
- [**Mutations**](#mutations)
  - [*CriarUsuario*](#criarusuario)
  - [*CriarCategoria*](#criarcategoria)
  - [*CriarContaBancaria*](#criarcontabancaria)
  - [*RegistrarDespesa*](#registrardespesa)
  - [*ExcluirConta*](#excluirconta)
  - [*ExcluirDespesa*](#excluirdespesa)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@my-app/despesas` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@my-app/despesas';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@my-app/despesas';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## BuscarContasBancarias
You can execute the `BuscarContasBancarias` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
buscarContasBancarias(vars: BuscarContasBancariasVariables, options?: ExecuteQueryOptions): QueryPromise<BuscarContasBancariasData, BuscarContasBancariasVariables>;

interface BuscarContasBancariasRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: BuscarContasBancariasVariables): QueryRef<BuscarContasBancariasData, BuscarContasBancariasVariables>;
}
export const buscarContasBancariasRef: BuscarContasBancariasRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
buscarContasBancarias(dc: DataConnect, vars: BuscarContasBancariasVariables, options?: ExecuteQueryOptions): QueryPromise<BuscarContasBancariasData, BuscarContasBancariasVariables>;

interface BuscarContasBancariasRef {
  ...
  (dc: DataConnect, vars: BuscarContasBancariasVariables): QueryRef<BuscarContasBancariasData, BuscarContasBancariasVariables>;
}
export const buscarContasBancariasRef: BuscarContasBancariasRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the buscarContasBancariasRef:
```typescript
const name = buscarContasBancariasRef.operationName;
console.log(name);
```

### Variables
The `BuscarContasBancarias` query requires an argument of type `BuscarContasBancariasVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface BuscarContasBancariasVariables {
  usuarioId: string;
}
```
### Return Type
Recall that executing the `BuscarContasBancarias` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `BuscarContasBancariasData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface BuscarContasBancariasData {
  contaBancarias: ({
    id: UUIDString;
    nomeBanco: string;
    saldo: number;
    criadoEm: DateString;
  } & ContaBancaria_Key)[];
}
```
### Using `BuscarContasBancarias`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, buscarContasBancarias, BuscarContasBancariasVariables } from '@my-app/despesas';

// The `BuscarContasBancarias` query requires an argument of type `BuscarContasBancariasVariables`:
const buscarContasBancariasVars: BuscarContasBancariasVariables = {
  usuarioId: ..., 
};

// Call the `buscarContasBancarias()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await buscarContasBancarias(buscarContasBancariasVars);
// Variables can be defined inline as well.
const { data } = await buscarContasBancarias({ usuarioId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await buscarContasBancarias(dataConnect, buscarContasBancariasVars);

console.log(data.contaBancarias);

// Or, you can use the `Promise` API.
buscarContasBancarias(buscarContasBancariasVars).then((response) => {
  const data = response.data;
  console.log(data.contaBancarias);
});
```

### Using `BuscarContasBancarias`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, buscarContasBancariasRef, BuscarContasBancariasVariables } from '@my-app/despesas';

// The `BuscarContasBancarias` query requires an argument of type `BuscarContasBancariasVariables`:
const buscarContasBancariasVars: BuscarContasBancariasVariables = {
  usuarioId: ..., 
};

// Call the `buscarContasBancariasRef()` function to get a reference to the query.
const ref = buscarContasBancariasRef(buscarContasBancariasVars);
// Variables can be defined inline as well.
const ref = buscarContasBancariasRef({ usuarioId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = buscarContasBancariasRef(dataConnect, buscarContasBancariasVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.contaBancarias);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.contaBancarias);
});
```

## BuscarCategorias
You can execute the `BuscarCategorias` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
buscarCategorias(options?: ExecuteQueryOptions): QueryPromise<BuscarCategoriasData, undefined>;

interface BuscarCategoriasRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<BuscarCategoriasData, undefined>;
}
export const buscarCategoriasRef: BuscarCategoriasRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
buscarCategorias(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<BuscarCategoriasData, undefined>;

interface BuscarCategoriasRef {
  ...
  (dc: DataConnect): QueryRef<BuscarCategoriasData, undefined>;
}
export const buscarCategoriasRef: BuscarCategoriasRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the buscarCategoriasRef:
```typescript
const name = buscarCategoriasRef.operationName;
console.log(name);
```

### Variables
The `BuscarCategorias` query has no variables.
### Return Type
Recall that executing the `BuscarCategorias` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `BuscarCategoriasData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface BuscarCategoriasData {
  categorias: ({
    id: UUIDString;
    nomeCategoria: string;
  } & Categoria_Key)[];
}
```
### Using `BuscarCategorias`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, buscarCategorias } from '@my-app/despesas';


// Call the `buscarCategorias()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await buscarCategorias();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await buscarCategorias(dataConnect);

console.log(data.categorias);

// Or, you can use the `Promise` API.
buscarCategorias().then((response) => {
  const data = response.data;
  console.log(data.categorias);
});
```

### Using `BuscarCategorias`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, buscarCategoriasRef } from '@my-app/despesas';


// Call the `buscarCategoriasRef()` function to get a reference to the query.
const ref = buscarCategoriasRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = buscarCategoriasRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.categorias);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.categorias);
});
```

## BuscarDespesas
You can execute the `BuscarDespesas` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
buscarDespesas(vars: BuscarDespesasVariables, options?: ExecuteQueryOptions): QueryPromise<BuscarDespesasData, BuscarDespesasVariables>;

interface BuscarDespesasRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: BuscarDespesasVariables): QueryRef<BuscarDespesasData, BuscarDespesasVariables>;
}
export const buscarDespesasRef: BuscarDespesasRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
buscarDespesas(dc: DataConnect, vars: BuscarDespesasVariables, options?: ExecuteQueryOptions): QueryPromise<BuscarDespesasData, BuscarDespesasVariables>;

interface BuscarDespesasRef {
  ...
  (dc: DataConnect, vars: BuscarDespesasVariables): QueryRef<BuscarDespesasData, BuscarDespesasVariables>;
}
export const buscarDespesasRef: BuscarDespesasRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the buscarDespesasRef:
```typescript
const name = buscarDespesasRef.operationName;
console.log(name);
```

### Variables
The `BuscarDespesas` query requires an argument of type `BuscarDespesasVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface BuscarDespesasVariables {
  usuarioId: string;
}
```
### Return Type
Recall that executing the `BuscarDespesas` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `BuscarDespesasData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `BuscarDespesas`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, buscarDespesas, BuscarDespesasVariables } from '@my-app/despesas';

// The `BuscarDespesas` query requires an argument of type `BuscarDespesasVariables`:
const buscarDespesasVars: BuscarDespesasVariables = {
  usuarioId: ..., 
};

// Call the `buscarDespesas()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await buscarDespesas(buscarDespesasVars);
// Variables can be defined inline as well.
const { data } = await buscarDespesas({ usuarioId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await buscarDespesas(dataConnect, buscarDespesasVars);

console.log(data.despesas);

// Or, you can use the `Promise` API.
buscarDespesas(buscarDespesasVars).then((response) => {
  const data = response.data;
  console.log(data.despesas);
});
```

### Using `BuscarDespesas`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, buscarDespesasRef, BuscarDespesasVariables } from '@my-app/despesas';

// The `BuscarDespesas` query requires an argument of type `BuscarDespesasVariables`:
const buscarDespesasVars: BuscarDespesasVariables = {
  usuarioId: ..., 
};

// Call the `buscarDespesasRef()` function to get a reference to the query.
const ref = buscarDespesasRef(buscarDespesasVars);
// Variables can be defined inline as well.
const ref = buscarDespesasRef({ usuarioId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = buscarDespesasRef(dataConnect, buscarDespesasVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.despesas);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.despesas);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CriarUsuario
You can execute the `CriarUsuario` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
criarUsuario(vars: CriarUsuarioVariables): MutationPromise<CriarUsuarioData, CriarUsuarioVariables>;

interface CriarUsuarioRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CriarUsuarioVariables): MutationRef<CriarUsuarioData, CriarUsuarioVariables>;
}
export const criarUsuarioRef: CriarUsuarioRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
criarUsuario(dc: DataConnect, vars: CriarUsuarioVariables): MutationPromise<CriarUsuarioData, CriarUsuarioVariables>;

interface CriarUsuarioRef {
  ...
  (dc: DataConnect, vars: CriarUsuarioVariables): MutationRef<CriarUsuarioData, CriarUsuarioVariables>;
}
export const criarUsuarioRef: CriarUsuarioRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the criarUsuarioRef:
```typescript
const name = criarUsuarioRef.operationName;
console.log(name);
```

### Variables
The `CriarUsuario` mutation requires an argument of type `CriarUsuarioVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CriarUsuarioVariables {
  id: string;
  email: string;
}
```
### Return Type
Recall that executing the `CriarUsuario` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CriarUsuarioData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CriarUsuarioData {
  usuario_insert: Usuario_Key;
}
```
### Using `CriarUsuario`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, criarUsuario, CriarUsuarioVariables } from '@my-app/despesas';

// The `CriarUsuario` mutation requires an argument of type `CriarUsuarioVariables`:
const criarUsuarioVars: CriarUsuarioVariables = {
  id: ..., 
  email: ..., 
};

// Call the `criarUsuario()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await criarUsuario(criarUsuarioVars);
// Variables can be defined inline as well.
const { data } = await criarUsuario({ id: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await criarUsuario(dataConnect, criarUsuarioVars);

console.log(data.usuario_insert);

// Or, you can use the `Promise` API.
criarUsuario(criarUsuarioVars).then((response) => {
  const data = response.data;
  console.log(data.usuario_insert);
});
```

### Using `CriarUsuario`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, criarUsuarioRef, CriarUsuarioVariables } from '@my-app/despesas';

// The `CriarUsuario` mutation requires an argument of type `CriarUsuarioVariables`:
const criarUsuarioVars: CriarUsuarioVariables = {
  id: ..., 
  email: ..., 
};

// Call the `criarUsuarioRef()` function to get a reference to the mutation.
const ref = criarUsuarioRef(criarUsuarioVars);
// Variables can be defined inline as well.
const ref = criarUsuarioRef({ id: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = criarUsuarioRef(dataConnect, criarUsuarioVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.usuario_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.usuario_insert);
});
```

## CriarCategoria
You can execute the `CriarCategoria` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
criarCategoria(vars: CriarCategoriaVariables): MutationPromise<CriarCategoriaData, CriarCategoriaVariables>;

interface CriarCategoriaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CriarCategoriaVariables): MutationRef<CriarCategoriaData, CriarCategoriaVariables>;
}
export const criarCategoriaRef: CriarCategoriaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
criarCategoria(dc: DataConnect, vars: CriarCategoriaVariables): MutationPromise<CriarCategoriaData, CriarCategoriaVariables>;

interface CriarCategoriaRef {
  ...
  (dc: DataConnect, vars: CriarCategoriaVariables): MutationRef<CriarCategoriaData, CriarCategoriaVariables>;
}
export const criarCategoriaRef: CriarCategoriaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the criarCategoriaRef:
```typescript
const name = criarCategoriaRef.operationName;
console.log(name);
```

### Variables
The `CriarCategoria` mutation requires an argument of type `CriarCategoriaVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CriarCategoriaVariables {
  nomeCategoria: string;
}
```
### Return Type
Recall that executing the `CriarCategoria` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CriarCategoriaData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CriarCategoriaData {
  categoria_insert: Categoria_Key;
}
```
### Using `CriarCategoria`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, criarCategoria, CriarCategoriaVariables } from '@my-app/despesas';

// The `CriarCategoria` mutation requires an argument of type `CriarCategoriaVariables`:
const criarCategoriaVars: CriarCategoriaVariables = {
  nomeCategoria: ..., 
};

// Call the `criarCategoria()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await criarCategoria(criarCategoriaVars);
// Variables can be defined inline as well.
const { data } = await criarCategoria({ nomeCategoria: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await criarCategoria(dataConnect, criarCategoriaVars);

console.log(data.categoria_insert);

// Or, you can use the `Promise` API.
criarCategoria(criarCategoriaVars).then((response) => {
  const data = response.data;
  console.log(data.categoria_insert);
});
```

### Using `CriarCategoria`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, criarCategoriaRef, CriarCategoriaVariables } from '@my-app/despesas';

// The `CriarCategoria` mutation requires an argument of type `CriarCategoriaVariables`:
const criarCategoriaVars: CriarCategoriaVariables = {
  nomeCategoria: ..., 
};

// Call the `criarCategoriaRef()` function to get a reference to the mutation.
const ref = criarCategoriaRef(criarCategoriaVars);
// Variables can be defined inline as well.
const ref = criarCategoriaRef({ nomeCategoria: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = criarCategoriaRef(dataConnect, criarCategoriaVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.categoria_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.categoria_insert);
});
```

## CriarContaBancaria
You can execute the `CriarContaBancaria` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
criarContaBancaria(vars: CriarContaBancariaVariables): MutationPromise<CriarContaBancariaData, CriarContaBancariaVariables>;

interface CriarContaBancariaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CriarContaBancariaVariables): MutationRef<CriarContaBancariaData, CriarContaBancariaVariables>;
}
export const criarContaBancariaRef: CriarContaBancariaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
criarContaBancaria(dc: DataConnect, vars: CriarContaBancariaVariables): MutationPromise<CriarContaBancariaData, CriarContaBancariaVariables>;

interface CriarContaBancariaRef {
  ...
  (dc: DataConnect, vars: CriarContaBancariaVariables): MutationRef<CriarContaBancariaData, CriarContaBancariaVariables>;
}
export const criarContaBancariaRef: CriarContaBancariaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the criarContaBancariaRef:
```typescript
const name = criarContaBancariaRef.operationName;
console.log(name);
```

### Variables
The `CriarContaBancaria` mutation requires an argument of type `CriarContaBancariaVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CriarContaBancariaVariables {
  usuarioId: string;
  nomeBanco: string;
  saldoInicial: number;
}
```
### Return Type
Recall that executing the `CriarContaBancaria` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CriarContaBancariaData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CriarContaBancariaData {
  contaBancaria_insert: ContaBancaria_Key;
}
```
### Using `CriarContaBancaria`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, criarContaBancaria, CriarContaBancariaVariables } from '@my-app/despesas';

// The `CriarContaBancaria` mutation requires an argument of type `CriarContaBancariaVariables`:
const criarContaBancariaVars: CriarContaBancariaVariables = {
  usuarioId: ..., 
  nomeBanco: ..., 
  saldoInicial: ..., 
};

// Call the `criarContaBancaria()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await criarContaBancaria(criarContaBancariaVars);
// Variables can be defined inline as well.
const { data } = await criarContaBancaria({ usuarioId: ..., nomeBanco: ..., saldoInicial: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await criarContaBancaria(dataConnect, criarContaBancariaVars);

console.log(data.contaBancaria_insert);

// Or, you can use the `Promise` API.
criarContaBancaria(criarContaBancariaVars).then((response) => {
  const data = response.data;
  console.log(data.contaBancaria_insert);
});
```

### Using `CriarContaBancaria`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, criarContaBancariaRef, CriarContaBancariaVariables } from '@my-app/despesas';

// The `CriarContaBancaria` mutation requires an argument of type `CriarContaBancariaVariables`:
const criarContaBancariaVars: CriarContaBancariaVariables = {
  usuarioId: ..., 
  nomeBanco: ..., 
  saldoInicial: ..., 
};

// Call the `criarContaBancariaRef()` function to get a reference to the mutation.
const ref = criarContaBancariaRef(criarContaBancariaVars);
// Variables can be defined inline as well.
const ref = criarContaBancariaRef({ usuarioId: ..., nomeBanco: ..., saldoInicial: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = criarContaBancariaRef(dataConnect, criarContaBancariaVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.contaBancaria_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.contaBancaria_insert);
});
```

## RegistrarDespesa
You can execute the `RegistrarDespesa` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
registrarDespesa(vars: RegistrarDespesaVariables): MutationPromise<RegistrarDespesaData, RegistrarDespesaVariables>;

interface RegistrarDespesaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RegistrarDespesaVariables): MutationRef<RegistrarDespesaData, RegistrarDespesaVariables>;
}
export const registrarDespesaRef: RegistrarDespesaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
registrarDespesa(dc: DataConnect, vars: RegistrarDespesaVariables): MutationPromise<RegistrarDespesaData, RegistrarDespesaVariables>;

interface RegistrarDespesaRef {
  ...
  (dc: DataConnect, vars: RegistrarDespesaVariables): MutationRef<RegistrarDespesaData, RegistrarDespesaVariables>;
}
export const registrarDespesaRef: RegistrarDespesaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the registrarDespesaRef:
```typescript
const name = registrarDespesaRef.operationName;
console.log(name);
```

### Variables
The `RegistrarDespesa` mutation requires an argument of type `RegistrarDespesaVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RegistrarDespesaVariables {
  usuarioId: string;
  contaBancariaId: UUIDString;
  categoriaId: UUIDString;
  descricao: string;
  valor: number;
  novoSaldo: number;
  tipo: string;
}
```
### Return Type
Recall that executing the `RegistrarDespesa` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RegistrarDespesaData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RegistrarDespesaData {
  despesa_insert: Despesa_Key;
  contaBancaria_update?: ContaBancaria_Key | null;
}
```
### Using `RegistrarDespesa`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, registrarDespesa, RegistrarDespesaVariables } from '@my-app/despesas';

// The `RegistrarDespesa` mutation requires an argument of type `RegistrarDespesaVariables`:
const registrarDespesaVars: RegistrarDespesaVariables = {
  usuarioId: ..., 
  contaBancariaId: ..., 
  categoriaId: ..., 
  descricao: ..., 
  valor: ..., 
  novoSaldo: ..., 
  tipo: ..., 
};

// Call the `registrarDespesa()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await registrarDespesa(registrarDespesaVars);
// Variables can be defined inline as well.
const { data } = await registrarDespesa({ usuarioId: ..., contaBancariaId: ..., categoriaId: ..., descricao: ..., valor: ..., novoSaldo: ..., tipo: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await registrarDespesa(dataConnect, registrarDespesaVars);

console.log(data.despesa_insert);
console.log(data.contaBancaria_update);

// Or, you can use the `Promise` API.
registrarDespesa(registrarDespesaVars).then((response) => {
  const data = response.data;
  console.log(data.despesa_insert);
  console.log(data.contaBancaria_update);
});
```

### Using `RegistrarDespesa`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, registrarDespesaRef, RegistrarDespesaVariables } from '@my-app/despesas';

// The `RegistrarDespesa` mutation requires an argument of type `RegistrarDespesaVariables`:
const registrarDespesaVars: RegistrarDespesaVariables = {
  usuarioId: ..., 
  contaBancariaId: ..., 
  categoriaId: ..., 
  descricao: ..., 
  valor: ..., 
  novoSaldo: ..., 
  tipo: ..., 
};

// Call the `registrarDespesaRef()` function to get a reference to the mutation.
const ref = registrarDespesaRef(registrarDespesaVars);
// Variables can be defined inline as well.
const ref = registrarDespesaRef({ usuarioId: ..., contaBancariaId: ..., categoriaId: ..., descricao: ..., valor: ..., novoSaldo: ..., tipo: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = registrarDespesaRef(dataConnect, registrarDespesaVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.despesa_insert);
console.log(data.contaBancaria_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.despesa_insert);
  console.log(data.contaBancaria_update);
});
```

## ExcluirConta
You can execute the `ExcluirConta` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
excluirConta(vars: ExcluirContaVariables): MutationPromise<ExcluirContaData, ExcluirContaVariables>;

interface ExcluirContaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ExcluirContaVariables): MutationRef<ExcluirContaData, ExcluirContaVariables>;
}
export const excluirContaRef: ExcluirContaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
excluirConta(dc: DataConnect, vars: ExcluirContaVariables): MutationPromise<ExcluirContaData, ExcluirContaVariables>;

interface ExcluirContaRef {
  ...
  (dc: DataConnect, vars: ExcluirContaVariables): MutationRef<ExcluirContaData, ExcluirContaVariables>;
}
export const excluirContaRef: ExcluirContaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the excluirContaRef:
```typescript
const name = excluirContaRef.operationName;
console.log(name);
```

### Variables
The `ExcluirConta` mutation requires an argument of type `ExcluirContaVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ExcluirContaVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `ExcluirConta` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ExcluirContaData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ExcluirContaData {
  contaBancaria_delete?: ContaBancaria_Key | null;
}
```
### Using `ExcluirConta`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, excluirConta, ExcluirContaVariables } from '@my-app/despesas';

// The `ExcluirConta` mutation requires an argument of type `ExcluirContaVariables`:
const excluirContaVars: ExcluirContaVariables = {
  id: ..., 
};

// Call the `excluirConta()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await excluirConta(excluirContaVars);
// Variables can be defined inline as well.
const { data } = await excluirConta({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await excluirConta(dataConnect, excluirContaVars);

console.log(data.contaBancaria_delete);

// Or, you can use the `Promise` API.
excluirConta(excluirContaVars).then((response) => {
  const data = response.data;
  console.log(data.contaBancaria_delete);
});
```

### Using `ExcluirConta`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, excluirContaRef, ExcluirContaVariables } from '@my-app/despesas';

// The `ExcluirConta` mutation requires an argument of type `ExcluirContaVariables`:
const excluirContaVars: ExcluirContaVariables = {
  id: ..., 
};

// Call the `excluirContaRef()` function to get a reference to the mutation.
const ref = excluirContaRef(excluirContaVars);
// Variables can be defined inline as well.
const ref = excluirContaRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = excluirContaRef(dataConnect, excluirContaVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.contaBancaria_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.contaBancaria_delete);
});
```

## ExcluirDespesa
You can execute the `ExcluirDespesa` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
excluirDespesa(vars: ExcluirDespesaVariables): MutationPromise<ExcluirDespesaData, ExcluirDespesaVariables>;

interface ExcluirDespesaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ExcluirDespesaVariables): MutationRef<ExcluirDespesaData, ExcluirDespesaVariables>;
}
export const excluirDespesaRef: ExcluirDespesaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
excluirDespesa(dc: DataConnect, vars: ExcluirDespesaVariables): MutationPromise<ExcluirDespesaData, ExcluirDespesaVariables>;

interface ExcluirDespesaRef {
  ...
  (dc: DataConnect, vars: ExcluirDespesaVariables): MutationRef<ExcluirDespesaData, ExcluirDespesaVariables>;
}
export const excluirDespesaRef: ExcluirDespesaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the excluirDespesaRef:
```typescript
const name = excluirDespesaRef.operationName;
console.log(name);
```

### Variables
The `ExcluirDespesa` mutation requires an argument of type `ExcluirDespesaVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ExcluirDespesaVariables {
  despesaId: UUIDString;
  contaBancariaId: UUIDString;
  novoSaldo: number;
}
```
### Return Type
Recall that executing the `ExcluirDespesa` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ExcluirDespesaData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ExcluirDespesaData {
  despesa_delete?: Despesa_Key | null;
  contaBancaria_update?: ContaBancaria_Key | null;
}
```
### Using `ExcluirDespesa`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, excluirDespesa, ExcluirDespesaVariables } from '@my-app/despesas';

// The `ExcluirDespesa` mutation requires an argument of type `ExcluirDespesaVariables`:
const excluirDespesaVars: ExcluirDespesaVariables = {
  despesaId: ..., 
  contaBancariaId: ..., 
  novoSaldo: ..., 
};

// Call the `excluirDespesa()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await excluirDespesa(excluirDespesaVars);
// Variables can be defined inline as well.
const { data } = await excluirDespesa({ despesaId: ..., contaBancariaId: ..., novoSaldo: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await excluirDespesa(dataConnect, excluirDespesaVars);

console.log(data.despesa_delete);
console.log(data.contaBancaria_update);

// Or, you can use the `Promise` API.
excluirDespesa(excluirDespesaVars).then((response) => {
  const data = response.data;
  console.log(data.despesa_delete);
  console.log(data.contaBancaria_update);
});
```

### Using `ExcluirDespesa`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, excluirDespesaRef, ExcluirDespesaVariables } from '@my-app/despesas';

// The `ExcluirDespesa` mutation requires an argument of type `ExcluirDespesaVariables`:
const excluirDespesaVars: ExcluirDespesaVariables = {
  despesaId: ..., 
  contaBancariaId: ..., 
  novoSaldo: ..., 
};

// Call the `excluirDespesaRef()` function to get a reference to the mutation.
const ref = excluirDespesaRef(excluirDespesaVars);
// Variables can be defined inline as well.
const ref = excluirDespesaRef({ despesaId: ..., contaBancariaId: ..., novoSaldo: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = excluirDespesaRef(dataConnect, excluirDespesaVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.despesa_delete);
console.log(data.contaBancaria_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.despesa_delete);
  console.log(data.contaBancaria_update);
});
```

