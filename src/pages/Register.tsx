import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";
import { useAuth } from "../hooks/useAuth";
import AuthLayout from "../layouts/AuthLayout";

const schema = z.object({
  name: z.string().min(2),
  email: z.email("E-mail inválido"),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres"),
});

type RegisterFormData = z.infer<typeof schema>;

const inputStyle =
  "w-full px-4 py-2 bg-secondary border-border text-foreground placeholder:text-muted-foreground rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring";
const buttonStyle =
  "w-full py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity duration-200";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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

  const inputClass = (hasError: boolean) =>
  `${inputStyle} ${hasError ? "border border-destructive" : ""}`;

  return (
    <AuthLayout>
      <div
        className=" text-center text-3xl font-bold mb-6"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        <h1 className="">Criar conta</h1>
        <p className="text-sm text-muted-foreground">Preencha seus dados</p>
      </div>
      <form
        className="flex flex-col items-center gap-2 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("name")}
          type="text"
          placeholder="Name"
          className={inputClass(!!errors.name)}
        />
        {errors.name && <span className="text-destructive text-sm">{errors.name.message}</span>}
        <input
          {...register("email")}
          type="email"
          placeholder="youremail@email.com.br"
          className={inputClass(!!errors.email)}
        />
        {errors.email && <span className="text-destructive text-sm">{errors.email.message}</span>}
        <input
          {...register("password")}
          type="password"
          placeholder="password"
          className={inputClass(!!errors.password)}
        />
        {errors.password && <span className="text-destructive text-sm">{errors.password.message}</span>}
        <button type="submit" className={isSubmitting ? buttonStyle + " cursor-not-allowed" : buttonStyle}>
          {isSubmitting ? "Registrando..." : "Registre-se"}
        </button>
      </form>
      <div className="flex items-center gap-3 mt-4">
        <hr className="flex-1 border-border" />
        ou
        <hr className="flex-1 border-border" />
      </div>
      <div className="mt-4 text-muted-foreground text-sm">
        Faça o{" "}
        <Link
          to="/login"
          className="hover:underline text-primary hover:opacity-80 transition-opacity duration-200"
        >
          Login
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Register;
