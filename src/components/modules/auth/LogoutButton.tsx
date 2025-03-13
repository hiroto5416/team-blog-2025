"use client";

const LogoutButton = () => {
  const handleLogout = async () => {
    await fetch("/api/auth/signout", { method: "POST" });
    window.location.href = "/auth/signin";
  };

  return <button onClick={handleLogout}>ログアウト</button>;
};

export default LogoutButton;
