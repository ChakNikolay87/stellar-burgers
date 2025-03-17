import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./forgot-password.module.css";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../services/slices/userSlice";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((store) => store.user);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const onChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormSubmitted(true);

    const resultAction = await dispatch(forgotPassword(email));
    if (forgotPassword.fulfilled.match(resultAction)) {
      navigate("/reset-password", { replace: true });
    }
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit}>
        <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
        <EmailInput
          onChange={onChange}
          value={email}
          name={"email"}
          isIcon={false}
          placeholder={"Укажите e-mail"}
          required
        />
        <Button htmlType="submit" extraClass={"mt-6"}>
          Восстановить
        </Button>
        {formSubmitted && !isLoading && error && (
          <p className="text text_type_main-default mb-6 mt-6">{`Ошибка: ${error}`}</p>
        )}
        <p className="text text_type_main-small text_color_inactive mt-20">
          Вспомнили пароль?&ensp;
          <Link to={"/login"} className={styles.link}>
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
