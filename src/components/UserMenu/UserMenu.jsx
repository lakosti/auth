import { useSelector } from "react-redux";
import css from "./UserMenu.module.css";
import { selectUser } from "../../redux/auth/selectors";

const UserMenu = () => {
  // const username = useSelector((state) => state.auth.user.name);
  const username = useSelector(selectUser);

  return (
    <div className={css.wrapper}>
      <p className={css.username}>Welcome, {username.name}</p>
      <button type="button">Logout</button>
    </div>
  );
};

export default UserMenu;
