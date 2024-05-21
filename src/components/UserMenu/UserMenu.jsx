import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { logOut } from "../../redux/auth/operations";
import css from "./UserMenu.module.css";

const UserMenu = () => {
  const dispatch = useDispatch();

  // const username = useSelector((state) => state.auth.user.name);
  const username = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logOut());
  };
  return (
    <div className={css.wrapper}>
      <p className={css.username}>Welcome, {username.name}</p>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
