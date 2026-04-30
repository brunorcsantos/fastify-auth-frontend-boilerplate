import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FiUser, FiCalendar, FiShield, FiSettings } from "react-icons/fi";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  console.log(user)
  const dateConverter = (date: string) => {
    const isoString = date;
    const data = new Date(isoString!);
    const formatada = data.toLocaleString("pt-BR");
    return formatada;
  };

  const handleLogout = async () => {
    await logout({ id: user!.id });
    navigate("/login");
  };

  return (
    <div>
      <div className="flex flex-col gap-1 bg-card border border-border rounded-xl p-6 shadow-sm mb-6 ">
        <span
          style={{ fontFamily: "Space Grotesk" }}
          className="text-2xl font-bold text-foreground"
        >
          Olá, {user!.name}!
        </span>
        <span className=" text-muted-foreground">Bem-vindo ao seu painel</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/*Perfil*/}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          {/* cabeçalho do card */}
          <div className="flex items-center gap-2 mb-4">
            <FiUser />
            <p className="font-semibold">Profile</p>
          </div>
          {/* conteúdo do card */}
          <div className="flex flex-col gap-2">
            {/* pares label + valor virão aqui */}
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Nome</span>
              <span className="text-sm text-foreground">{user!.name}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Email</span>
              <span className="text-sm text-foreground">{user!.email}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Provedor</span>
              <span className="text-sm text-foreground">{user!.provider}</span>
            </div>
          </div>
        </div>
        {/*Conta */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          {/* cabeçalho do card */}
          <div className="flex items-center gap-2 mb-4">
            <FiCalendar />
            <p className="font-semibold">Account </p>
          </div>
          {/* conteúdo do card */}
          <div className="flex flex-col gap-2">
            {/* pares label + valor virão aqui */}
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Created at</span>
              <span className="text-sm text-foreground">
                {dateConverter(user!.createdAt)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">
                Last Update
              </span>
              <span className="text-sm text-foreground">
                {dateConverter(user!.updatedAt)}
              </span>
            </div>
          </div>
        </div>
        {/*Sessão */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          {/* cabeçalho do card */}
          <div className="flex items-center gap-2 mb-4">
            <FiShield />
            <p className="font-semibold">Session</p>
          </div>
          {/* conteúdo do card */}
          <div className="flex flex-col gap-2">
            {/* pares label + valor virão aqui */}
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">ID</span>
              <span className="text-sm text-foreground">{user!.id}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Tipo</span>
              <span className="text-sm text-foreground">
                {user!.provider === "local" ? "Email/Senha" : "OAuth"}
              </span>
            </div>
          </div>
        </div>
        {/*Ações */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          {/* cabeçalho do card */}
          <div className="flex items-center gap-2 mb-4">
            <FiSettings />
            <p className="font-semibold">Actions</p>
          </div>
          {/* conteúdo do card */}
          <div className="flex flex-col gap-2">
            {/* pares label + valor virão aqui */}
            <Link
              to="/profile"
              className="flex items-center justify-center cursor-pointer py-2 bg-primary text-primary-foreground font-semibold border border-border rounded-xl"
            >
              Edit Profile
            </Link>
            <button
              className="cursor-pointer py-2 bg-destructive text-primary-foreground font-semibold border border-border rounded-xl"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
