import React, { useEffect, useState } from "react";
import { ArrowLeft, Eye, EyeOff, KeyRound, LoaderCircle, LockKeyhole, Mail } from "lucide-react";
import { authConfigured, supabase } from "./supabase.js";

const COLORS = {
  background: "#f7f4ed",
  card: "#ffffff",
  border: "#e5e1d6",
  text: "#1a1815",
  muted: "#6b6459",
  soft: "#9c9484",
  gold: "#b08d57",
  error: "#8b3a3a",
  errorBackground: "#f5e5e1",
  success: "#315c45",
  successBackground: "#e8f2eb",
};

const friendlyError = (error) => {
  const message = error?.message?.toLowerCase() || "";

  if (message.includes("invalid login credentials")) return "E-mail ou senha incorretos.";
  if (message.includes("email not confirmed")) return "Confirme seu e-mail antes de entrar.";
  if (message.includes("password should be")) return "A senha precisa ter pelo menos 8 caracteres.";
  if (message.includes("same password")) return "Escolha uma senha diferente da atual.";
  if (message.includes("rate limit")) return "Muitas tentativas. Aguarde alguns minutos e tente novamente.";

  return "Não foi possível concluir. Verifique os dados e tente novamente.";
};

const inputWrap = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 10,
  padding: "0 12px",
  background: "#fff",
};

const fieldStyle = {
  width: "100%",
  minWidth: 0,
  border: 0,
  outline: 0,
  padding: "12px 0",
  fontSize: 15,
  color: COLORS.text,
  background: "transparent",
};

const buttonStyle = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  border: 0,
  borderRadius: 10,
  padding: "12px 16px",
  color: "#fff",
  background: COLORS.text,
  fontSize: 14,
  fontWeight: 700,
  cursor: "pointer",
};

const AuthLayout = ({ title, subtitle, children }) => (
  <main
    style={{
      minHeight: "100vh",
      padding: 24,
      display: "grid",
      placeItems: "center",
      background: `radial-gradient(circle at top, #fff 0, ${COLORS.background} 52%)`,
      color: COLORS.text,
      fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}
  >
    <section style={{ width: "100%", maxWidth: 410 }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
        <div
          aria-hidden="true"
          style={{
            width: 54,
            height: 54,
            display: "grid",
            placeItems: "center",
            borderRadius: 15,
            color: "#fff",
            background: COLORS.text,
            boxShadow: "0 12px 30px rgba(23, 21, 18, 0.18)",
          }}
        >
          <LockKeyhole size={25} />
        </div>
      </div>
      <div
        style={{
          border: `1px solid ${COLORS.border}`,
          borderRadius: 18,
          padding: "30px 28px",
          background: COLORS.card,
          boxShadow: "0 18px 50px rgba(54, 47, 35, 0.08)",
        }}
      >
        <div style={{ marginBottom: 24, textAlign: "center" }}>
          <div style={{ marginBottom: 7, color: COLORS.gold, fontSize: 12, fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase" }}>
            NutriPlanner
          </div>
          <h1 style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: 27 }}>{title}</h1>
          <p style={{ margin: "8px auto 0", maxWidth: 310, color: COLORS.muted, fontSize: 14, lineHeight: 1.55 }}>{subtitle}</p>
        </div>
        {children}
      </div>
      <p style={{ margin: "14px 0 0", color: COLORS.soft, fontSize: 11.5, lineHeight: 1.5, textAlign: "center" }}>
        A senha é validada com segurança pelo serviço de autenticação e não fica armazenada neste site.
      </p>
    </section>
  </main>
);

const Alert = ({ type = "error", children }) => {
  if (!children) return null;
  const success = type === "success";
  return (
    <div
      role="status"
      style={{
        marginBottom: 16,
        padding: "10px 12px",
        borderRadius: 9,
        color: success ? COLORS.success : COLORS.error,
        background: success ? COLORS.successBackground : COLORS.errorBackground,
        fontSize: 13,
        lineHeight: 1.45,
      }}
    >
      {children}
    </div>
  );
};

const PasswordInput = ({ value, onChange, placeholder = "Senha", autoComplete = "current-password" }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div style={inputWrap}>
      <KeyRound size={17} color={COLORS.soft} aria-hidden="true" />
      <input
        required
        minLength={8}
        type={visible ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        style={fieldStyle}
      />
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
        style={{ border: 0, padding: 4, color: COLORS.muted, background: "transparent", cursor: "pointer" }}
      >
        {visible ? <EyeOff size={17} /> : <Eye size={17} />}
      </button>
    </div>
  );
};

const ConfigurationPending = () => (
  <AuthLayout title="Proteção pronta" subtitle="Falta conectar este site ao projeto de autenticação antes de publicar.">
    <Alert>As variáveis públicas do Supabase ainda não foram configuradas.</Alert>
    <p style={{ margin: 0, color: COLORS.muted, fontSize: 13.5, lineHeight: 1.6 }}>
      O site atual continua disponível. Esta tela existe para impedir uma publicação sem autenticação configurada.
    </p>
  </AuthLayout>
);

export default function AuthGate({ children }) {
  const [session, setSession] = useState(null);
  const [loadingSession, setLoadingSession] = useState(authConfigured);
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!supabase) return undefined;

    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active) {
        setSession(data.session);
        setLoadingSession(false);
      }
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (!active) return;
      setSession(nextSession);
      setLoadingSession(false);
      if (event === "PASSWORD_RECOVERY") {
        setMode("new-password");
        setError("");
        setNotice("");
      }
    });

    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const clearMessages = () => {
    setError("");
    setNotice("");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    clearMessages();
    setSubmitting(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (signInError) setError(friendlyError(signInError));
    setSubmitting(false);
  };

  const handleRecovery = async (event) => {
    event.preventDefault();
    clearMessages();
    setSubmitting(true);
    const redirectTo = new URL(import.meta.env.BASE_URL, window.location.origin).toString();
    const { error: recoveryError } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo });
    if (recoveryError) {
      setError(friendlyError(recoveryError));
    } else {
      setNotice("Se o e-mail estiver cadastrado, você receberá um link para criar uma nova senha.");
    }
    setSubmitting(false);
  };

  const handleNewPassword = async (event) => {
    event.preventDefault();
    clearMessages();
    if (password !== passwordConfirmation) {
      setError("As senhas não coincidem.");
      return;
    }
    setSubmitting(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) {
      setError(friendlyError(updateError));
    } else {
      setPassword("");
      setPasswordConfirmation("");
      setNotice("Senha alterada com sucesso.");
      setMode("login");
    }
    setSubmitting(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut({ scope: "local" });
    setSession(null);
    setMode("login");
    setPassword("");
  };

  if (!authConfigured) return <ConfigurationPending />;

  if (loadingSession) {
    return (
      <AuthLayout title="Verificando acesso" subtitle="Aguarde um instante.">
        <div style={{ display: "flex", justifyContent: "center", color: COLORS.gold }}>
          <LoaderCircle size={26} className="auth-spinner" />
          <style>{`@keyframes auth-spin { to { transform: rotate(360deg); } } .auth-spinner { animation: auth-spin .9s linear infinite; }`}</style>
        </div>
      </AuthLayout>
    );
  }

  if (mode === "new-password") {
    return (
      <AuthLayout title="Criar nova senha" subtitle="Use pelo menos 8 caracteres e evite senhas reutilizadas.">
        <form onSubmit={handleNewPassword} style={{ display: "grid", gap: 12 }}>
          <Alert>{error}</Alert>
          <Alert type="success">{notice}</Alert>
          <PasswordInput value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Nova senha" autoComplete="new-password" />
          <PasswordInput value={passwordConfirmation} onChange={(event) => setPasswordConfirmation(event.target.value)} placeholder="Repita a nova senha" autoComplete="new-password" />
          <button disabled={submitting} type="submit" style={{ ...buttonStyle, opacity: submitting ? 0.65 : 1 }}>
            {submitting && <LoaderCircle size={17} className="auth-spinner" />}
            Salvar nova senha
          </button>
        </form>
      </AuthLayout>
    );
  }

  if (session) return children({ user: session.user, signOut: handleSignOut });

  const recovering = mode === "recovery";
  return (
    <AuthLayout
      title={recovering ? "Recuperar acesso" : "Acesso restrito"}
      subtitle={recovering ? "Informe seu e-mail para receber o link de recuperação." : "Entre com a conta autorizada para acessar seus planejamentos."}
    >
      <form onSubmit={recovering ? handleRecovery : handleLogin} style={{ display: "grid", gap: 12 }}>
        <Alert>{error}</Alert>
        <Alert type="success">{notice}</Alert>
        <div style={inputWrap}>
          <Mail size={17} color={COLORS.soft} aria-hidden="true" />
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Seu e-mail"
            autoComplete="email"
            style={fieldStyle}
          />
        </div>
        {!recovering && <PasswordInput value={password} onChange={(event) => setPassword(event.target.value)} />}
        <button disabled={submitting} type="submit" style={{ ...buttonStyle, opacity: submitting ? 0.65 : 1 }}>
          {submitting && <LoaderCircle size={17} className="auth-spinner" />}
          {recovering ? "Enviar link de recuperação" : "Entrar"}
        </button>
        <button
          type="button"
          onClick={() => {
            setMode(recovering ? "login" : "recovery");
            clearMessages();
          }}
          style={{ border: 0, padding: 5, color: COLORS.muted, background: "transparent", fontSize: 13, cursor: "pointer" }}
        >
          {recovering ? (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><ArrowLeft size={14} /> Voltar para o login</span>
          ) : (
            "Esqueci minha senha"
          )}
        </button>
      </form>
    </AuthLayout>
  );
}
