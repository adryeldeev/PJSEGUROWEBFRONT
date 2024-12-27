import  { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthProvider";
import useApi from "../../Api/Api";

const Dashboard = () => {
  const api = useApi()
  const auth = useAuth();  // Acesso ao contexto de autenticação
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/user/${auth.user.id}`);  // Fetch de dados protegidos
        setData(response);
      } catch (err) {
        setError("Falha ao carregar dados" + err);
      }
    };

    fetchData();  // Chama a função de obtenção de dados após renderização
  }, [auth.token]);

  return (
    <div className="container">
      <h1>Bem-vindo, {auth.user?.username}</h1> {/* Exibe o nome do usuário */}
      <button onClick={() => auth.logOut()} className="btn-submit">
        Logout
      </button>

      <div>
        <h2>Dados Protegidos:</h2>
        {error && <p>Error: {error}</p>}
        {data ? (
          <pre>{JSON.stringify(data, null, 2)}</pre>  // Exibe os dados protegidos
        ) : (
          <p>Carregando dados protegidos...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
