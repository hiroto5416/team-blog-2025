import LogoutButton from "../../components/modules/auth/LogoutButton";

const ProfilePage = () => {
  return (
    <>
      <h1 className="text-2xl font-bold">Profile Page</h1>
      <LogoutButton /> {/* ここでコンポーネントを使用 */}
    </>
  );
};

export default ProfilePage;
