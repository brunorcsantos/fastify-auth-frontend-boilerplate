import { FiLock, FiEdit } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const nameSchema = z.object({
  name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"], // em qual campo o erro aparece
  });

type ChangePasswordFormData = z.infer<typeof passwordSchema>;
type ChangeUserDataFormData = z.infer<typeof nameSchema>;

const Profile = () => {
  const { user, update } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (formData: ChangePasswordFormData) => {
    try {
      await update(formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-1 bg-card border border-border rounded-xl p-6 shadow-sm mb-6 ">
        <span
          style={{ fontFamily: "Space Grotesk" }}
          className="text-2xl font-bold text-foreground"
        >
          Editar perfil
        </span>
        <span className=" text-muted-foreground">Edite seu perfil</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/*Dados básicos*/}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          {/* cabeçalho do card */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center gap-2">
              <span className="text-2xl font-bold text-primary-foreground">
                {user!.name[0].toLocaleUpperCase()}
              </span>
            </div>
            <p className="font-semibold">Dados básicos</p>
          </div>
          {/* conteúdo do card */}
          <div className="flex flex-col gap-2">
            {/* pares label + valor virão aqui */}
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Nome</span>
              <div className="flex justify-between">
                <div className="flex items-center justify-center">
                  <span className="text-sm text-foreground">{user!.name}</span>
                </div>
                <button className="cursor-pointer">
                  <FiEdit />
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">E-mail</span>
              <div className="flex justify-between">
                <span className="text-sm text-foreground">{user!.email}</span>
              </div>
            </div>
          </div>
        </div>
        {/*Segurança */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          {/* cabeçalho do card */}
          <div className="flex items-center gap-2 mb-4">
            <FiLock />
            <p className="font-semibold">Conta</p>
          </div>
          {/* conteúdo do card */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            {/* pares label + valor virão aqui */}
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Senha atual</span>
              <input {...register("currentPassword")} className="w-full px-4 py-2 bg-secondary border-border text-foreground placeholder:text-muted-foreground rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring" />
              {errors.currentPassword && <span className="text-destructive text-sm">{errors.currentPassword.message}</span>}
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Nova Senha</span>
              <input {...register("newPassword")} className="w-full px-4 py-2 bg-secondary border-border text-foreground placeholder:text-muted-foreground rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring" />
              {errors.newPassword && <span className="text-destructive text-sm">{errors.newPassword.message}</span>}
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">
                Confirme a nova senha
              </span>
              <input {...register("confirmPassword")} className="w-full px-4 py-2 bg-secondary border-border text-foreground placeholder:text-muted-foreground rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring" />
              {errors.confirmPassword && <span className="text-destructive text-sm">{errors.confirmPassword.message}</span>}
            </div>
            <div className="flex flex-col">
              <button disabled={isSubmitting} className={`${isSubmitting ? "cursor-not-allowed" : ""} w-full py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity duration-200`}>
                {isSubmitting ? "Salvando..." : "Salvar alterações"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
