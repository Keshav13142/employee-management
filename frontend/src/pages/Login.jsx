import { AppContext } from "@/components/ContextProvider";
import { empLogin } from "@/lib/api";
import { loginSchema, parseZodErrors } from "@/lib/validations";
import {
  EnvelopeIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import { Button, TextInput, Toggle, ToggleItem } from "@tremor/react";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SUCCESS_MSG = "Logged in successfully!";
const ERROR_MSG = "Invalid credentials!";

function Home() {
  const { user, setUser } = useContext(AppContext);

  const [isAdmin, setIsAdmin] = useState(true);

  const [inputs, setInputs] = useState({
    emailId: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    emailId: null,
    password: null,
  });

  const navigate = useNavigate();

  const onChange = ({ target: { name, value } }) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const inputFieldData = [
    {
      placeholder: "you@example.com",
      label: "Email",
      icon: EnvelopeIcon,
      name: "emailId",
      type: "email",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      onChange: onChange,
      placeholder: "super secret",
      icon: LockClosedIcon,
      type: "password",
      required: true,
    },
  ];

  const mutation = useMutation(empLogin, {
    onError: () => {
      toast.error(ERROR_MSG);
    },
    onSuccess: (data) => {
      setUser(data);
      toast.success(SUCCESS_MSG);
      navigate("employee");
    },
  });

  const login = (e) => {
    if (user) {
      user.type === "ADMIN" ? navigate("admin") : navigate("employee");
    }

    e.preventDefault();

    // Check the form inputs for error
    const parsedInputs = loginSchema.safeParse(inputs);

    // Map through the errors and get then in the right format
    if (!parsedInputs.success) {
      setErrors((p) => ({ ...p, ...parseZodErrors(parsedInputs) }));
      return;
    }

    if (isAdmin) {
      if (
        inputs.emailId.trim() === "admin@gmail.com" &&
        inputs.password.trim() === "admin"
      ) {
        navigate("admin");
        setUser({ type: "ADMIN" });
        toast.success(SUCCESS_MSG);
      } else {
        toast.error(ERROR_MSG);
      }
    } else {
      mutation.mutate(inputs);
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
          {inputFieldData.map((input, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-sm text-slate-600">{input.label}</span>
              <TextInput
                label={input.label}
                name={input.name}
                type={input.type}
                onChange={onChange}
                placeholder={input.placeholder}
                icon={input.icon}
                className="placeholder mt-1"
              />
              <span className="mt-1 text-sm text-red-400">
                {errors[input.name]}
              </span>
            </div>
          ))}
          <Button loading={mutation.isLoading} type="submit">
            Login
          </Button>
        </form>
      </div>
    </main>
  );
}

export default Home;
