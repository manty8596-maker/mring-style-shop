import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, Shield, CheckCircle, XCircle } from "lucide-react";

interface EmailVerificationProps {
  email: string;
  onVerified: () => void;
  onCancel: () => void;
}

export const EmailVerification = ({ email, onVerified, onCancel }: EmailVerificationProps) => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Automatically send verification code when component mounts
  useEffect(() => {
    const sendInitialCode = async () => {
      setIsResending(true);
      setError("");

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://mringbec.vercel.app'}/api/send-verification`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const result = await response.json();

        if (result.success) {
          setTimeLeft(60);
          setSuccess(true);
          setTimeout(() => setSuccess(false), 3000);
        } else {
          setError(result.error || "Ошибка при отправке кода");
        }
      } catch (error) {
        setError("Ошибка при отправке кода. Попробуйте еще раз.");
      } finally {
        setIsResending(false);
      }
    };

    sendInitialCode();
  }, [email]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://mringbec.vercel.app'}/api/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setTimeout(() => onVerified(), 1500);
      } else {
        setError(result.error || "Неверный код подтверждения");
      }
    } catch (error) {
      setError("Ошибка при проверке кода. Попробуйте еще раз.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setError("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://mringbec.vercel.app'}/api/send-verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.success) {
        setTimeLeft(60);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.error || "Ошибка при отправке кода");
      }
    } catch (error) {
      setError("Ошибка при отправке кода. Попробуйте еще раз.");
    } finally {
      setIsResending(false);
    }
  };

  if (success && !isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md glass border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-green-600 mb-2">Email подтвержден!</h3>
            <p className="text-muted-foreground">Теперь вы можете оформить заказ</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md glass border-0 shadow-2xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-bg-primary flex items-center justify-center">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Подтверждение email</CardTitle>
          <p className="text-muted-foreground">
            Мы отправили код подтверждения на <strong>{email}</strong>
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Код подтверждения</Label>
              <Input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Введите 6-значный код"
                maxLength={6}
                className="text-center text-lg tracking-widest"
                disabled={isLoading}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Код отправлен повторно!
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || code.length !== 6}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Проверка...
                </>
              ) : (
                "Подтвердить"
              )}
            </Button>
          </form>

          <div className="flex items-center justify-between text-sm">
            <Button
              variant="outline"
              onClick={handleResend}
              disabled={isResending || timeLeft > 0}
              className="flex-1 mr-2"
            >
              {isResending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Mail className="h-4 w-4 mr-2" />
              )}
              {timeLeft > 0 ? `Повторно через ${timeLeft}с` : "Отправить повторно"}
            </Button>
            
            <Button
              variant="ghost"
              onClick={onCancel}
              className="flex-1"
            >
              Отмена
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
