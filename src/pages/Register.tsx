import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";
import { useAuth } from "../hooks/useAuth";

const schema = z.object({
  name: z.string().min(2),
  email: z.email("E-mail inválido"),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres"),
});

type RegisterFormData = z.infer<typeof schema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();
  const auth = useAuth();

  const onSubmit = async (formData: RegisterFormData) => {
    try {
      await auth.register(formData);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-red-200">
      <div className="flex flex-col items-center bg-white shadow-2xl rounded-2xl">
        <div className="">Register</div>
        <form
          className="flex flex-col items-center gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register("name")}
            type="text"
            placeholder="Name"
            className="border rounded-sm focus:outline-none"
          />
          {errors.name && <span>{errors.name.message}</span>}
          <input
            {...register("email")}
            type="email"
            placeholder="seuemail@email.com.br"
            className="border rounded-sm focus:outline-none"
          />
          {errors.email && <span>{errors.email.message}</span>}
          <input
            {...register("password")}
            type="password"
            placeholder="password"
            className="border rounded-sm focus:outline-none"
          />
          {errors.password && <span>{errors.password.message}</span>}
          <button type="submit" className="bg-red-400 rounded-sm">
            Register
          </button>
        </form>
        <div>ou</div>
        <div>

        Faça o <Link to="/login" className="hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
