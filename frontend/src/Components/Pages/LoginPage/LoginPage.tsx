
import * as Yup from "yup";
import { useAuth } from "../../../Context/UseAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type Props = {}

type LoginFormsInputs = {
    username: string;
    password: string;
}

const validation = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
})

const LoginPage = (props: Props) => {
    const { loginUser } = useAuth();
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });

  const onSubmit = (data: LoginFormsInputs) => {
    loginUser(data.username, data.password);
  };
    


  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username:</label>
          <input type="text" {...register("username")} />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div>
          <label>Password:</label>
          <input type="password" {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  ); 
}

export default LoginPage