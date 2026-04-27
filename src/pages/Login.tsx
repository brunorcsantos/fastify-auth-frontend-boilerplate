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
import AquariumBackground from "../components/AquariumBackground";

const schema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof schema>;

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
  
  // return (
  //   <div className="h-screen flex justify-center items-center bg-red-200">
      
  //     <div className="flex flex-col items-center bg-white shadow-2xl rounded-2xl">
  //       <div className="">Login</div>
  //       <form
  //         className="flex flex-col items-center gap-2"
  //         onSubmit={handleSubmit(onSubmit)}
  //       >
  //         <input
  //           {...register("email")}
  //           type="text"
  //           placeholder="e-mail"
  //           className="border rounded-sm focus:outline-none"
  //         />
  //         {errors.email && <span>{errors.email.message}</span>}
  //         <input
  //           {...register("password")}
  //           type="password"
  //           placeholder="password"
  //           className="border rounded-sm focus:outline-none"
  //         />
  //         {errors.password && <span>{errors.password.message}</span>}
  //         <button type="submit" className="bg-red-400 rounded-sm">
  //           Login
  //         </button>
  //       </form>
  //       <div>ou</div>
  //       <div className="grid grid-flow-col grid-rows-2 gap-2">
  //         <button type="button" onClick={loginWithGoogle}>
  //           Google
  //         </button>
  //         <button type="button" onClick={loginWithGithub}>
  //           Github
  //         </button>
  //         <button type="button" onClick={loginWithFacebook}>
  //           Facebook
  //         </button>
  //         <button type="button" onClick={loginWithInstagram}>
  //           Instagram
  //         </button>
  //       </div>
  //       <div>
  //         Não tem uma conta?{" "}
  //         <Link to="/register" className="hover:underline">
  //           Registre-se
  //         </Link>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (<AquariumBackground/>)
};

export default Login;
