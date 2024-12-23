import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-hot-toast";

const RESET_COOLDOWN = 60;
const MAX_FAILED_ATTEMPTS = 3;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [cooldownEnd, setCooldownEnd] = useState<number | null>(null);

  useEffect(() => {
    const storedAttempts = localStorage.getItem("failedAttempts");
    const storedCooldown = localStorage.getItem("cooldownEnd");
    
    if (storedAttempts) {
      setFailedAttempts(parseInt(storedAttempts));
    }
    
    if (storedCooldown) {
      setCooldownEnd(parseInt(storedCooldown));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // בדיקת קולדאון
    if (cooldownEnd && Date.now() < cooldownEnd) {
      const remainingSeconds = Math.ceil((cooldownEnd - Date.now()) / 1000);
      toast.error(`נסה שוב בעוד ${remainingSeconds} שניות`);
      return;
    }

    setLoading(true);

    try {
      if (!email || !password) {
        throw new Error("נא למלא את כל השדות");
      }

      if (password.length < 6) {
        throw new Error("הסיסמה חייבת להכיל לפחות 6 תווים");
      }

      await login(email, password);
      
      // איפוס הניסיונות הכושלים אחרי התחברות מוצלחת
      setFailedAttempts(0);
      localStorage.removeItem("failedAttempts");
      localStorage.removeItem("cooldownEnd");
      
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      
      // עדכון ניסיונות כושלים
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      localStorage.setItem("failedAttempts", newAttempts.toString());
      
      // בדיקה אם הגענו למקסימום ניסיונות
      if (newAttempts >= MAX_FAILED_ATTEMPTS) {
        const newCooldownEnd = Date.now() + (RESET_COOLDOWN * 1000);
        setCooldownEnd(newCooldownEnd);
        localStorage.setItem("cooldownEnd", newCooldownEnd.toString());
        toast.error(`יותר מדי ניסיונות כושלים. נסה שוב בעוד ${RESET_COOLDOWN} שניות`);
      } else {
        toast.error(error instanceof Error ? error.message : "שגיאה בהתחברות");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-white">
            התחברות למערכת
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                אימייל
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="כתובת אימייל"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                סיסמה
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="סיסמה"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="/reset-password"
                className="text-blue-400 hover:text-blue-300"
              >
                שכחת סיסמה?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || (cooldownEnd !== null && Date.now() < cooldownEnd)}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  מתחבר...
                </div>
              ) : (
                "התחבר"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
