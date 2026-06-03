# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { criarUsuario, criarCategoria, criarContaBancaria, registrarDespesa, excluirConta, excluirDespesa, buscarContasBancarias, buscarCategorias, buscarDespesas } from '@my-app/despesas';


// Operation CriarUsuario:  For variables, look at type CriarUsuarioVars in ../index.d.ts
const { data } = await CriarUsuario(dataConnect, criarUsuarioVars);

// Operation CriarCategoria:  For variables, look at type CriarCategoriaVars in ../index.d.ts
const { data } = await CriarCategoria(dataConnect, criarCategoriaVars);

// Operation CriarContaBancaria:  For variables, look at type CriarContaBancariaVars in ../index.d.ts
const { data } = await CriarContaBancaria(dataConnect, criarContaBancariaVars);

// Operation RegistrarDespesa:  For variables, look at type RegistrarDespesaVars in ../index.d.ts
const { data } = await RegistrarDespesa(dataConnect, registrarDespesaVars);

// Operation ExcluirConta:  For variables, look at type ExcluirContaVars in ../index.d.ts
const { data } = await ExcluirConta(dataConnect, excluirContaVars);

// Operation ExcluirDespesa:  For variables, look at type ExcluirDespesaVars in ../index.d.ts
const { data } = await ExcluirDespesa(dataConnect, excluirDespesaVars);

// Operation BuscarContasBancarias:  For variables, look at type BuscarContasBancariasVars in ../index.d.ts
const { data } = await BuscarContasBancarias(dataConnect, buscarContasBancariasVars);

// Operation BuscarCategorias: 
const { data } = await BuscarCategorias(dataConnect);

// Operation BuscarDespesas:  For variables, look at type BuscarDespesasVars in ../index.d.ts
const { data } = await BuscarDespesas(dataConnect, buscarDespesasVars);


```