import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import {
  loginWithGoogle,
  loginWithGithub,
  loginWithFacebook,
  loginWithInstagram,
} from "../services/authService";
import AuthLayout from "../layouts/AuthLayout";

import { FaInstagram, FaGithub, FaFacebook, FaGoogle } from "react-icons/fa";

const schema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof schema>;

const inputStyle =
  "w-full px-4 py-2 bg-secondary border-border text-foreground placeholder:text-muted-foreground rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring";
const buttonStyle =
  "w-full py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity duration-200";
const oauthButtonStyle =
  "flex gap-2 items-center justify-center border-border bg-secondary px-4 py-2 rounded-lg hover:bg-card transition-colors duration-200";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const auth = useAuth();

  const onSubmit = async (formData: LoginFormData) => {
    try {
      await auth.login(formData);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthLayout>
      
      <div
        className=" text-center text-3xl font-bold mb-6"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        <h1 className="">Bem-vindo de volta</h1>

        <p className="text-sm text-muted-foreground">
          Entre com suas credenciais
        </p>
      </div>
      <form
        className="flex flex-col items-center gap-2 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("email")}
          type="text"
          placeholder="e-mail"
          className={inputStyle}
        />
        {errors.email && <span>{errors.email.message}</span>}
        <input
          {...register("password")}
          type="password"
          placeholder="password"
          className={inputStyle}
        />
        {errors.password && <span>{errors.password.message}</span>}
        <button type="submit" className={buttonStyle}>
          Login
        </button>
      </form>
      <div className="flex items-center gap-3 mt-4">
        <hr className="flex-1 border-border" />
        ou
        <hr className="flex-1 border-border" />
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        <button
          className={oauthButtonStyle}
          type="button"
          onClick={loginWithGoogle}
        >
          <FaGoogle />
          Google
        </button>
        <button
          className={oauthButtonStyle}
          type="button"
          onClick={loginWithGithub}
        >
          <FaGithub />
          Github
        </button>
        <button
          className={oauthButtonStyle}
          type="button"
          onClick={loginWithFacebook}
        >
          <FaFacebook />
          Facebook
        </button>
        <button
          className={oauthButtonStyle}
          type="button"
          onClick={loginWithInstagram}
        >
          <FaInstagram />
          Instagram
        </button>
      </div>
      <div className="mt-4 text-muted-foreground text-sm">
        Não tem uma conta?{" "}
        <Link
          to="/register"
          className="hover:underline text-primary hover:opacity-80 transition-opacity duration-200"
        >
          Registre-se
        </Link>
      </div>
    </AuthLayout>
  );
  // return <div>Login</div>;
};

export default Login;
