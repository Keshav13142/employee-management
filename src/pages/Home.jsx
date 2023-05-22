import {
  LockClosedIcon,
  MailIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { Button, TextInput, Toggle, ToggleItem } from "@tremor/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [isAdmin, setIsAdmin] = useState(true);
  const [inputs, setInputs] = useState({
    emailId: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChange = ({ target: { name, value } }) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const login = (e) => {
    e.preventDefault();
    console.log(inputs, isAdmin);
    if (isAdmin) {
      inputs.emailId.trim() === "admin@gmail.com" &&
        inputs.password.trim() === "admin" &&
        navigate("admin");
    } else {
      navigate("employee");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center pt-10">
      <div className="flex  min-w-[20%] flex-col items-center">
        <Toggle
          defaultValue="1"
          onValueChange={(v) => {
            setIsAdmin(v === "1");
          }}
          className="mt-6 max-w-fit"
        >
          <ToggleItem value="1" text="Admin" icon={ShieldCheckIcon} />
          <ToggleItem value="2" text="Employee" icon={UserIcon} />
        </Toggle>
        <form className="mt-5 flex flex-col gap-4" onSubmit={login}>
          <TextInput
            name="emailId"
            onChange={onChange}
            placeholder="Email"
            icon={MailIcon}
            type="email"
          />
          <TextInput
            name="password"
            onChange={onChange}
            placeholder="Password"
            icon={LockClosedIcon}
            type="password"
          />
          <Button type="submit">Login</Button>
        </form>
      </div>
    </main>
  );
}

export default Home;
