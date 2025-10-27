import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import './VerificationForm.css';

export function VerificationForm({ email, onVerificationComplete }) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 минут

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    if (value && index < 5) {
      document.getElementById(`input-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      document.getElementById(`input-${index - 1}`)?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      setError('Введите все 6 цифр');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      setTimeout(() => onVerificationComplete?.(fullCode), 800);
    } catch {
      setError('Неверный код верификации');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="verification-container">
      <div className="verification-card">
        <h2 className="verification-title">Подтверждение почты</h2>
        <p className="verification-email">{email}</p>
        <form onSubmit={handleSubmit}>
          <div className="code-inputs">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`input-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="code-input"
                disabled={isLoading || success}
              />
            ))}
          </div>
          {error && (
            <div className="error-message animate-shake">
              <XCircle size={18} />
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="success-message animate-pulse-in">
              <CheckCircle size={18} />
              <span>Почта подтверждена!</span>
            </div>
          )}
          <div className="time-remaining">
            <AlertCircle size={16} />
            <span>Код действителен {formatTime(timeLeft)}</span>
          </div>
          <button type="submit" className="verify-button" disabled={isLoading || success || timeLeft === 0}>
            {isLoading ? (
              <><span className="spinner"></span>Проверка...</>
            ) : success ? (
              <><CheckCircle size={20} />Подтверждено</>
            ) : (
              'Подтвердить'
            )}
          </button>
          <button type="button" className="resend-button" disabled={timeLeft > 180}>
            Отправить код заново
          </button>
        </form>
      </div>
    </div>
  );
}
