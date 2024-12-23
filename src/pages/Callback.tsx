import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // במקום אותנטיקציה של Supabase, נעביר ישירות לדף הראשי
        toast.success('התחברת בהצלחה!');
        navigate('/');
      } catch (error) {
        console.error('Error in authentication:', error);
        toast.error('שגיאה בתהליך ההתחברות');
        navigate('/login');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">מתחבר...</h2>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
      </div>
    </div>
  );
};

export default Callback;
