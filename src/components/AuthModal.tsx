import { useState } from "react";
import { supabase } from "../supabase";
import { FcGoogle } from "react-icons/fc";
import "./AuthModal.css";

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async () => {
    setError("");

    if (isLogin) {
      if (!email || !password) {
        setError("Please fill in all fields.");
        return;
      }
    } else {
      if (!name || !email || !password || !confirmPassword) {
        setError("Please fill in all fields.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
      if (!agreed) {
        setError("You must agree to the Terms and Privacy Policy to continue.");
        return;
      }
    }

    setLoading(true);

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else onClose();
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      });
      if (error) {
        setError(error.message);
      } else if (data.user && data.user.identities && data.user.identities.length === 0) {
        setError("An account with this email already exists. Please sign in instead.");
      } else if (data.user) {
        const { data: existingUser } = await supabase
          .from("users")
          .select("id")
          .eq("id", data.user.id)
          .single();
        if (!existingUser) {
          await supabase.from("users").insert({ id: data.user.id, email, role: "user" });
        }
        // Sign in immediately so navbar updates right away
        await supabase.auth.signInWithPassword({ email, password });
        onClose();
      }
    }

    setLoading(false);
  };

  const handleGoogle = async () => {
    if (!isLogin && !agreed) {
      setError("You must agree to the Terms and Privacy Policy to continue.");
      return;
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (error) setError(error.message);
  };

  const handleReset = async () => {
    if (!resetEmail) {
      setError("Please enter your email address.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) setError(error.message);
    else setResetSent(true);
    setLoading(false);
  };

  // ── RESET PASSWORD VIEW ──
  if (showReset) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>✕</button>

          <div className="modal-logo">
            <div className="modal-logo-placeholder">CD</div>
            <span>ChizzDigital</span>
          </div>

          <h3 className="reset-title">Reset Password</h3>
          <p className="reset-sub">
            Enter your email and we'll send you a link to reset your password.
          </p>

          {error && <p className="modal-error">{error}</p>}

          {resetSent ? (
            <div className="reset-success">
              ✅ Check your email for a password reset link.
            </div>
          ) : (
            <>
              <div className="modal-input-group">
                <span className="modal-input-icon">✉️</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </div>
              <button className="modal-btn" onClick={handleReset} disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </>
          )}

          <p className="modal-switch">
            <span onClick={() => { setShowReset(false); setError(""); setResetSent(false); }}>
              ← Back to Sign In
            </span>
          </p>
        </div>
      </div>
    );
  }

  // ── MAIN VIEW ──
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-logo">
          <div className="modal-logo-placeholder">CD</div>
          <span>ChizzDigital</span>
        </div>

        <div className="modal-tabs">
          <button
            className={`modal-tab ${isLogin ? "active" : ""}`}
            onClick={() => { setIsLogin(true); setError(""); }}
          >
            Sign In
          </button>
          <button
            className={`modal-tab ${!isLogin ? "active" : ""}`}
            onClick={() => { setIsLogin(false); setError(""); }}
          >
            Create Account
          </button>
        </div>

        {error && <p className="modal-error">{error}</p>}

        {!isLogin && (
          <div className="modal-input-group">
            <span className="modal-input-icon">👤</span>
            <input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className="modal-input-group">
          <span className="modal-input-icon">✉️</span>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="modal-input-group">
          <span className="modal-input-icon">🔒</span>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Confirm Password — signup only */}
        {!isLogin && (
          <>
            <div className="modal-input-group">
              <span className="modal-input-icon">🔒</span>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {confirmPassword.length > 0 && (
              <p className={`password-match ${password === confirmPassword ? "match" : "no-match"}`}>
                {password === confirmPassword ? "✅ Passwords match" : "❌ Passwords do not match"}
              </p>
            )}
          </>
        )}

        {/* Terms checkbox — signup only */}
        {!isLogin && (
          <label className="modal-checkbox">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span>
              By creating an account, you agree to ChizzDigital's{" "}
              <a href="/terms" target="_blank" rel="noopener noreferrer">Conditions of Use</a>{" "}
              and{" "}
              <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Notice</a>.
            </span>
          </label>
        )}

        {/* Terms text — login only */}
        {isLogin && (
          <p className="modal-terms">
            By signing in, you agree to our{" "}
            <a href="/terms" target="_blank" rel="noopener noreferrer">Conditions of Use</a>{" "}
            and{" "}
            <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
          </p>
        )}

        <button
          className="modal-btn"
          onClick={handleSubmit}
          disabled={loading || (isLogin
            ? (!email || !password)
            : (!name || !email || !password || !confirmPassword || !agreed)
          )}
        >
          {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
        </button>

        <button className="google-btn" onClick={handleGoogle}>
          <FcGoogle size={22} />
          Continue with Google
        </button>

        {isLogin && (
          <p className="modal-forgot">
            Forgot your password?{" "}
            <span onClick={() => { setShowReset(true); setError(""); }}>Reset</span>
          </p>
        )}

        <p className="modal-switch">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={() => { setIsLogin(!isLogin); setError(""); }}>
            {isLogin ? "Sign up" : "Sign In"}
          </span>
        </p>
      </div>
    </div>
  );
}