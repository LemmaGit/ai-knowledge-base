import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSignup } from "../hooks/useAuth";
import Layout from "../components/Layout";

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

const Signup = () => {
  const signup = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormData) => {
    delete data["confirmPassword"];
    // const { confirmPassword, ...signupData } = data;
    // signup.mutate(signupData);
    signup.mutate(data);
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-md">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-base-content mb-2">
              Create Account
            </h1>
            <p className="text-base-content/70">
              Join us today and get started
            </p>
          </div>

          {/* Card Component */}
          <div className="card bg-base-100 shadow-2xl border border-base-300">
            <div className="card-body p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <div className="form-control space-y-1">
                  <label className="label">
                    <span className="label-text font-semibold">Full Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className={`input input-bordered input-md ${
                      errors.name ? "input-error" : "focus:input-primary"
                    }`}
                    {...register("name")}
                  />
                  {errors.name && (
                    <label className="label">
                      <span className="label-text-alt text-error font-medium">
                        {errors.name.message}
                      </span>
                    </label>
                  )}
                </div>

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
                    className={`input input-bordered input-md ${
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
                  <label className="label mt-1">
                    <span className="label-text font-semibold">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Create a strong password"
                    className={`input input-bordered input-md ${
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
                </div>

                {/* Confirm Password Field */}
                <div className="form-control space-y-1">
                  <label className="label mt-1">
                    <span className="label-text font-semibold">
                      Confirm Password
                    </span>
                  </label>
                  <input
                    type="password"
                    placeholder="Re-enter your password"
                    className={`input input-bordered input-md ${
                      errors.confirmPassword
                        ? "input-error"
                        : "focus:input-primary"
                    }`}
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <label className="label">
                      <span className="label-text-alt text-error font-medium">
                        {errors.confirmPassword.message}
                      </span>
                    </label>
                  )}
                </div>

                {/* Submit Button */}
                <div className="form-control mt-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm text-sm font-semibold"
                    disabled={signup.isPending}
                  >
                    {signup.isPending ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>
              </form>

              {/* Divider */}
              <div className="divider text-base-content/50 my-6">OR</div>

              {/* Login Link */}
              <p className="text-center text-sm sm:text-base">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="link link-primary font-semibold hover:link-hover transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>

          {/* Terms Notice */}
          <div className="text-center mt-6">
            <p className="text-sm text-base-content/60">
              By creating an account, you agree to our{" "}
              <a href="#" className="link link-hover">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="link link-hover">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
