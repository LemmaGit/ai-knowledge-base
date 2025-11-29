import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { toast } from "react-hot-toast";
import api from "../lib/api";
import Layout from "../components/Layout";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      // Assuming there's a forgot password endpoint
      await api.post("/auth/forgot-password", data);
      setIsSubmitted(true);
      toast.success("Password reset email sent!");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to send reset email");
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12 px-4">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-3xl justify-center mb-4">
              Forgot Password
            </h2>
            {isSubmitted ? (
              <div className="text-center space-y-4">
                <div className="alert alert-success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    Password reset email sent! Please check your inbox.
                  </span>
                </div>
                <Link to="/login" className="link link-primary">
                  Back to Login
                </Link>
              </div>
            ) : (
              <>
                <p className="text-center mb-4">
                  Enter your email address and we'll send you a link to reset
                  your password.
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
                      {...register('email')}
                    />
                    {errors.email && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.email.message}
                        </span>
                      </label>
                    )}
                  </div> */}
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

                  <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">
                      Send Reset Link
                    </button>
                  </div>
                </form>

                <div className="divider"></div>

                <p className="text-center text-sm">
                  Remember your password?{" "}
                  <Link to="/login" className="link link-primary">
                    Login
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
