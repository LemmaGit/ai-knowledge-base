import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useVerifyEmail } from '../hooks/useAuth';
import Layout from '../components/Layout';
import api from '../lib/api';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const verifyEmail = useVerifyEmail();
  const [message, setMessage] = useState<string>('');
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (token && email) {
      verifyEmail.mutate(token, {
        onSuccess: () => {
          setMessage('Email verified successfully! You can now log in.');
        },
      });
    } else {
      setMessage('Please check your email for the verification link.');
    }
  }, [token, email]);

  const handleResend = async () => {
    if (!email) {
      setMessage('Please enter your email address.');
      return;
    }
    setIsResending(true);
    try {
      // Assuming there's a resend endpoint
      await api.post('/auth/resend-verification', { email });
      setMessage('Verification email sent! Please check your inbox.');
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'Failed to resend email');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12 px-4">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <h2 className="card-title text-3xl justify-center mb-4">
              Email Verification
            </h2>
            {verifyEmail.isPending ? (
              <span className="loading loading-spinner loading-lg"></span>
            ) : (
              <>
                <p className="mb-4">{message || 'Verifying your email...'}</p>
                {!token && (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      className="input input-bordered"
                      defaultValue={email || ''}
                    />
                    <button
                      onClick={handleResend}
                      className="btn btn-primary mt-4"
                      disabled={isResending}
                    >
                      {isResending ? (
                        <span className="loading loading-spinner"></span>
                      ) : (
                        'Resend Verification Email'
                      )}
                    </button>
                  </div>
                )}
                <div className="divider"></div>
                <Link to="/login" className="link link-primary">
                  Go to Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VerifyEmail;

