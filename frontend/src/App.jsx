import { useState, useEffect } from 'react'
import './App.css'
import { auth, googleProvider } from './firebase' 
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { criarContaBancaria, criarUsuario, buscarContasBancarias, buscarCategorias, criarCategoria, registrarDespesa, buscarDespesas, excluirConta, excluirDespesa } from './dataconnect-generated'

function App() {
  const [status, setStatus] = useState("")
  const [contas, setContas] = useState([])
  const [categorias, setCategorias] = useState([])
  const [despesas, setDespesas] = useState([])
  const [user, setUser] = useState(null)
  const [nomeBancoInput, setNomeBancoInput] = useState("")
  const [formTransacao, setFormTransacao] = useState({
    contaId: "",
    tipo: "despesa",
    valor: "",
    descricao: ""
  })
  const [telaAtiva, setTelaAtiva] = useState("home")
  const [filtroContaId, setFiltroContaId] = useState("todas")

  // Monitora se o usuário está logado ou deslogado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioAtual) => {
      setUser(usuarioAtual);
      if (usuarioAtual) {
        // Se o usuário fez login, garante que ele existe no Postgres e carrega as contas
        garantirUsuarioNoBanco(usuarioAtual);
        carregarContas(usuarioAtual.uid);
        carregarCategorias();
        carregarDespesas(usuarioAtual.uid);
      } else {
        setContas([]); // Limpa as contas se deslogou
      }
    });
    return () => unsubscribe();
  }, []);

  // Cadastra o usuário de forma transparente após o primeiro login
  const garantirUsuarioNoBanco = async (usuarioAtual) => {
    try {
      await criarUsuario({
        id: usuarioAtual.uid,
        email: usuarioAtual.email
      });
    } catch (e) {
      // Se já existe, o banco bloqueia a duplicata e nós ignoramos
    }
  };

  // Função de Login do Firebase
  const loginComGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Erro no login:", error);
      setStatus("Falha no login com o Google.");
    }
  };

  // Função para buscar e garantir que existe pelo menos uma categoria no banco
  const carregarCategorias = async () => {
    try {
      let resposta = await buscarCategorias();
      let lista = (resposta.data || resposta).categorias || [];
      
      if (lista.length === 0) {
        await criarCategoria({ nomeCategoria: "Alimentação" });
        resposta = await buscarCategorias();
        lista = (resposta.data || resposta).categorias || [];
      }
      setCategorias(lista);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  // Função para buscar contas usando o ID Real do Google
  const carregarContas = async (uid) => {
    try {
      const resposta = await buscarContasBancarias({ usuarioId: uid });
      
      // Simplificação para extrair o array que vem do Data Connect
      const dataObj = resposta.data || resposta;
      // Usamos [...array] para forçar o React a renderizar a tela sem precisar do F5
      setContas([...(dataObj.contaBancarias || [])]);
    } catch (error) {
      console.error("Erro DETALHADO ao buscar contas:", error);
    }
  };

  // Função para buscar o extrato (despesas)
  const carregarDespesas = async (uid) => {
    try {
      const resposta = await buscarDespesas({ usuarioId: uid });
      const dataObj = resposta.data || resposta;
      setDespesas([...(dataObj.despesas || [])]);
    } catch (error) {
      console.error("Erro ao buscar despesas:", error);
    }
  };

  const handleCriarConta = async () => {
    const nomeDoBanco = nomeBancoInput.trim();
    if (!nomeDoBanco) {
      setStatus("Por favor, digite o nome do banco.");
      return;
    }

    // Validação: Verifica se a conta já existe na lista do usuário
    const bancoJaExiste = contas.some(
      c => c.nomeBanco.toLowerCase() === nomeDoBanco.toLowerCase()
    );
    if (bancoJaExiste) {
      setStatus(`Você já tem uma conta cadastrada no ${nomeDoBanco}.`);
      return;
    }

    try {
      setStatus("Criando conta...");
      
      const resposta = await criarContaBancaria({
        usuarioId: user.uid,
        nomeBanco: nomeDoBanco,
        saldoInicial: 0 // A conta nasce zerada. O usuário deposita o valor depois!
      });
      
      setStatus(`Conta ${nomeDoBanco} criada com sucesso!`);
      setNomeBancoInput(""); // Limpa o campo
      
      // Atualiza a tela imediatamente sem recarregar e sem bater no Cache (Optimistic Update)
      const novoId = resposta?.data?.contaBancaria_insert?.id || Date.now().toString();
      setContas(prev => [...prev, { id: novoId, nomeBanco: nomeDoBanco, saldo: 0 }]);
    } catch (error) {
      console.error("Erro DETALHADO ao criar conta:", error);
      setStatus("Erro ao criar conta. Veja o console do navegador.");
    }
  };

  const handleTransacao = async (e) => {
    e.preventDefault(); // Impede a página de recarregar
    if (!formTransacao.contaId) {
      setStatus("Selecione uma conta bancária.");
      return;
    }

    const valorFormatado = parseFloat(formTransacao.valor);
    if (isNaN(valorFormatado) || valorFormatado <= 0) {
      setStatus("Digite um valor válido maior que zero.");
      return;
    }

    const contaSelecionada = contas.find(c => c.id === formTransacao.contaId);
    if (!contaSelecionada) return;

    try {
      setStatus("Processando transação...");

      // Calcula o saldo dependendo se é depósito ou despesa
      const ehDespesa = formTransacao.tipo === "despesa";
      const novoSaldo = ehDespesa 
        ? contaSelecionada.saldo - valorFormatado 
        : contaSelecionada.saldo + valorFormatado;

      // Salva TUDO no histórico, passando o 'tipo' correto
      const resposta = await registrarDespesa({
        usuarioId: user.uid,
        contaBancariaId: contaSelecionada.id,
        categoriaId: categorias[0].id,
        descricao: formTransacao.descricao || (ehDespesa ? "Gasto" : "Depósito"),
        valor: valorFormatado,
        novoSaldo: novoSaldo,
        tipo: formTransacao.tipo
      });
      
      setStatus(ehDespesa ? "Gasto registrado!" : "Depósito realizado!");

      // Limpa os campos do formulário após o sucesso
      setFormTransacao({ ...formTransacao, valor: "", descricao: "" });
      
      // Atualiza o saldo na conta imediatamente na tela
      setContas(prev => prev.map(c => 
        c.id === contaSelecionada.id ? { ...c, saldo: novoSaldo } : c
      ));

      // Atualiza o extrato adicionando a nova transação no topo da lista
      const novoId = resposta?.data?.despesa_insert?.id || Date.now().toString();
      const novaDespesa = {
        id: novoId,
        descricao: formTransacao.descricao || (ehDespesa ? "Gasto" : "Depósito"),
        valor: valorFormatado,
        tipo: formTransacao.tipo,
        dataDespesa: new Date().toISOString(),
        contaBancaria: { nomeBanco: contaSelecionada.nomeBanco }
      };
      setDespesas(prev => [novaDespesa, ...prev]);
    } catch (error) {
      console.error("Erro na transação:", error);
      setStatus("Erro ao processar a transação.");
    }
  };

  const handleExcluirConta = async (conta) => {
    if (!window.confirm(`Excluir a conta ${conta.nomeBanco} e TODO o seu histórico?`)) return;
    try {
      await excluirConta({ id: conta.id });
      setContas(prev => prev.filter(c => c.id !== conta.id));
      setDespesas(prev => prev.filter(d => d.contaBancaria?.id !== conta.id));
      setStatus("Conta excluída com sucesso.");
    } catch (error) {
      console.error("Erro ao excluir conta:", error);
      setStatus("Erro ao excluir conta.");
    }
  };

  const handleExcluirDespesa = async (despesa) => {
    if (!window.confirm(`Excluir o lançamento de R$ ${despesa.valor}?`)) return;
    const contaSelecionada = contas.find(c => c.id === despesa.contaBancaria?.id);
    
    if (!contaSelecionada) {
      setStatus("Erro: Conta original não encontrada para reverter o saldo.");
      return;
    }
    try {
      // Se era uma despesa (tirou dinheiro), ao excluir, devolve o dinheiro (+).
      // Se era um depósito (colocou dinheiro), ao excluir, retira o dinheiro (-).
      const ehDespesa = despesa.tipo === "despesa";
      const novoSaldo = ehDespesa 
        ? contaSelecionada.saldo + despesa.valor 
        : contaSelecionada.saldo - despesa.valor;

      await excluirDespesa({
        despesaId: despesa.id,
        contaBancariaId: contaSelecionada.id,
        novoSaldo: novoSaldo
      });

      // Atualiza otimisticamente a tela
      setContas(prev => prev.map(c => c.id === contaSelecionada.id ? { ...c, saldo: novoSaldo } : c));
      setDespesas(prev => prev.filter(d => d.id !== despesa.id));
      setStatus("Lançamento excluído e saldo revertido!");
    } catch (error) {
      console.error("Erro ao excluir transação:", error);
      setStatus("Erro ao excluir transação.");
    }
  };

  // Filtra as despesas pelo banco selecionado
  const despesasFiltradas = despesas.filter(d => filtroContaId === "todas" || d.contaBancaria?.id === filtroContaId);

  // Agrupa as despesas formatando para "Mês de Ano"
  const despesasAgrupadas = despesasFiltradas.reduce((acc, d) => {
    const data = new Date(d.dataDespesa);
    const mesAno = data.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    const chave = mesAno.charAt(0).toUpperCase() + mesAno.slice(1);
    if (!acc[chave]) acc[chave] = [];
    acc[chave].push(d);
    return acc;
  }, {});

  // Tela exibida para quem NÃO está logado
  if (!user) {
    return (
      <div>
        <h1>Meu App de Despesas</h1>
        <p>Faça login para gerenciar suas contas.</p>
        <button onClick={loginComGoogle}>Entrar com o Google</button>
        {status && <p>{status}</p>}
      </div>
    );
  }

  // Tela exibida para quem ESTÁ logado
  return (
    <div>
      <h1>Meu App de Despesas</h1>
      <div style={{ marginBottom: "20px" }}>
        <p>Logado como: <strong>{user.email}</strong></p>
        <button onClick={() => signOut(auth)}>Sair</button>
      </div>

      {/* NAVEGAÇÃO DAS ABAS */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <button onClick={() => setTelaAtiva("home")} style={{ background: telaAtiva === "home" ? "#646cff" : "#555" }}>
          Painel Principal
        </button>
        <button onClick={() => setTelaAtiva("extrato")} style={{ background: telaAtiva === "extrato" ? "#646cff" : "#555" }}>
          Extrato Detalhado
        </button>
      </div>

      {/* ABA 1: PAINEL PRINCIPAL */}
      {telaAtiva === "home" && (
        <>
      <div style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "20px" }}>
        <h2>Adicionar Conta Bancária</h2>
        <input 
          type="text" 
          placeholder="Ex: Nubank, Itaú, Bradesco" 
          value={nomeBancoInput}
          onChange={(e) => setNomeBancoInput(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button onClick={handleCriarConta}>Criar Conta</button>
      </div>

      <div style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "20px" }}>
        <h2>Lançar Transação</h2>
        <form onSubmit={handleTransacao} style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
          <select value={formTransacao.contaId} onChange={(e) => setFormTransacao({...formTransacao, contaId: e.target.value})} style={{ padding: "5px" }}>
            <option value="">Selecione a conta...</option>
            {contas.map(c => <option key={c.id} value={c.id}>{c.nomeBanco}</option>)}
          </select>
          
          <select value={formTransacao.tipo} onChange={(e) => setFormTransacao({...formTransacao, tipo: e.target.value})} style={{ padding: "5px" }}>
            <option value="despesa">Gastar (Saque/Cartão)</option>
            <option value="deposito">Depositar (Adicionar saldo)</option>
          </select>

          <input type="text" placeholder="Descrição (ex: Mercado)" value={formTransacao.descricao} onChange={(e) => setFormTransacao({...formTransacao, descricao: e.target.value})} style={{ padding: "5px" }} />
          <input type="number" step="0.01" placeholder="Valor (R$)" value={formTransacao.valor} onChange={(e) => setFormTransacao({...formTransacao, valor: e.target.value})} style={{ padding: "5px", width: "100px" }} />
          
          <button type="submit">Confirmar</button>
        </form>
      </div>

      {status && <p>{status}</p>}
      
      <h2>Meus Saldos</h2>
      <ul>
        {contas.map((conta) => (
          <li key={conta.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", alignItems: "center" }}>
            <span><strong>{conta.nomeBanco}</strong>: R$ {Number(conta.saldo || 0).toFixed(2)}</span>
            <button onClick={() => handleExcluirConta(conta)} style={{ background: "#dc3545", color: "white", padding: "4px 8px", fontSize: "0.8em" }}>Excluir</button>
          </li>
        ))}
      </ul>
      </>
      )}

      {/* ABA 2: EXTRATO DETALHADO E FILTROS */}
      {telaAtiva === "extrato" && (
        <div style={{ textAlign: "left" }}>
          <h2>Extrato Detalhado</h2>
          
          <div style={{ marginBottom: "20px" }}>
            <label>Filtrar por Conta: </label>
            <select value={filtroContaId} onChange={(e) => setFiltroContaId(e.target.value)} style={{ padding: "5px", marginLeft: "10px" }}>
              <option value="todas">Todas as contas</option>
              {contas.map(c => <option key={c.id} value={c.id}>{c.nomeBanco}</option>)}
            </select>
          </div>

          {Object.keys(despesasAgrupadas).length === 0 && <p>Nenhuma transação encontrada.</p>}
          
          {Object.entries(despesasAgrupadas).map(([mesAno, transacoes]) => (
            <div key={mesAno} style={{ marginBottom: "30px" }}>
              <h3 style={{ borderBottom: "2px solid #646cff", paddingBottom: "5px", color: "#646cff" }}>{mesAno}</h3>
              <ul style={{ padding: 0, listStyle: "none" }}>
                {transacoes.map(d => {
                  const isDeposito = d.tipo === 'deposito';
                  const cor = isDeposito ? '#28a745' : '#dc3545';
                  const sinal = isDeposito ? '+' : '-';
                  const dataFormatada = new Date(d.dataDespesa).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });

                  return (
                    <li key={d.id} style={{ marginBottom: "15px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <strong>{d.descricao}</strong>
                        <strong style={{ color: cor }}>{sinal} R$ {Number(d.valor || 0).toFixed(2)}</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", color: "gray", fontSize: "0.85em", marginTop: "8px" }}>
                        <span>{dataFormatada} • {d.contaBancaria?.nomeBanco || 'Desconhecida'}</span>
                        <button onClick={() => handleExcluirDespesa(d)} style={{ background: "transparent", border: "1px solid #dc3545", color: "#dc3545", padding: "2px 6px", fontSize: "0.9em", cursor: "pointer" }}>Apagar</button>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
