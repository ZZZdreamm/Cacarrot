import GoToMenuButton from "../Utilities/GoToMenuButton";
import Authorized from "../auth/Authorized";
import LogoutButton from "../auth/LogoutButton";

export default function Menu() {
  return (
    <div className="navbar">
      <GoToMenuButton />
      <Authorized isAuthorized={<><LogoutButton/></>} notAuthorized={<></>} />
    </div>
  );
}
