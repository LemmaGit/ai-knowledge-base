import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLogin } from "../hooks/useAuth";
import Layout from "../components/Layout";
import FormField from "../components/Field";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const login = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login.mutate(data);
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-md">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-base-content mb-2">
              Welcome Back
            </h1>
            <p className="text-base-content/70">
              Sign in to your account to continue
            </p>
          </div>

          {/* Card Component */}
          <div className="card bg-base-100 shadow-2xl border border-base-300">
            <div className="card-body p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Field */}
                <FormField
                  label="Email Address"
                  errors={errors}
                  register={register}
                  registerName="email"
                  inputType="email"
                />

                {/* Password Field */}
                <FormField
                  label="Password"
                  errors={errors}
                  register={register}
                  registerName="password"
                  inputType="password"
                />

                {/* Submit Button */}
                <div className="form-control mt-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm text-sm font-semibold"
                    disabled={login.isPending}
                  >
                    {login.isPending ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </div>
              </form>

              {/* Divider */}
              <div className="divider text-base-content/50 my-6">OR</div>

              {/* Sign Up Link */}
              <p className="text-center text-sm sm:text-base">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="link link-primary font-semibold hover:link-hover transition-colors"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>

          {/* Additional Help */}
          <div className="text-center mt-6">
            <p className="text-sm text-base-content/60">
              Need help?{" "}
              <a href="#" className="link link-hover font-medium">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
