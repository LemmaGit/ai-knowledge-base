import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLogin } from "../hooks/useAuth";
import Layout from "../components/Layout";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
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
                <div className="form-control space-y-1">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Email Address
                    </span>
                  </label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    className={`input --input-bordered input-md ${
                      errors.email ? "input-error" : "focus:input-primary"
                    }`}
                    {...register("email")}
                  />
                  {errors.email && (
                    <label className="label">
                      <span className="label-text-alt text-error font-medium">
                        {errors.email.message}
                      </span>
                    </label>
                  )}
                </div>

                {/* Password Field */}
                <div className="form-control space-y-1">
                  <label className="label">
                    <span className="label-text font-semibold">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className={`input --input-bordered input-md ${
                      errors.password ? "input-error" : "focus:input-primary"
                    }`}
                    {...register("password")}
                  />
                  {errors.password && (
                    <label className="label">
                      <span className="label-text-alt text-error font-medium">
                        {errors.password.message}
                      </span>
                    </label>
                  )}

                  {/* Forgot Password Link */}
                  <div className="label mt-2">
                    <Link
                      to="/forgot-password"
                      className="label-text-alt link link-primary font-semibold hover:link-hover transition-colors ml-auto"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>

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
