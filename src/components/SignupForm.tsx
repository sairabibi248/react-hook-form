import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupFormFields } from "../schemas/signupSchema";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormFields>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<SignupFormFields> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
      className="max-w-md mx-auto mt-10 p-6 flex flex-col gap-3 border rounded-lg"
    >
      <input
        {...register("username")}
        type="text"
        placeholder="Name"
        className="border rounded px-3 py-2"
      />
      {errors.username && (
        <div className="text-red-500">{errors.username.message}</div>
      )}

      <input
        {...register("email")}
        type="text"
        placeholder="email"
        className="border rounded px-3 py-2"
      />
      {errors.email && (
        <div className="text-red-500">{errors.email.message}</div>
      )}

      <input
        {...register("password")}
        type={showPassword ? "text" : "password"}
        placeholder="password"
        className="border rounded px-3 py-2"
      />
      {errors.password && (
        <div className="text-red-500">{errors.password.message}</div>
      )}

      <input
        {...register("confirmPassword")}
        type={showPassword ? "text" : "password"}
        placeholder="confirm password"
        className="border rounded px-3 py-2"
      />
      {errors.confirmPassword && (
        <div className="text-red-500">{errors.confirmPassword.message}</div>
      )}

      <label>
        <input
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
          className="mr-1"
        />
        Show Password
      </label>

      <div>
        <p className="font-semibold">Cookies</p>
        <label className="mr-4">
          <input
            {...register("cookies")}
            type="radio"
            value="accept"
            className="mr-1"
          />
          Accept
        </label>
        <label>
          <input
            {...register("cookies")}
            type="radio"
            value="reject"
            className="mr-1"
          />
          Reject
        </label>
      </div>
      {errors.cookies && (
        <div className="text-red-500">{errors.cookies.message}</div>
      )}

      <label>
        <input {...register("terms")} type="checkbox" className="mr-1" />
        Accept Terms and Conditions
      </label>
      {errors.terms && (
        <div className="text-red-500">{errors.terms.message}</div>
      )}

      <input
        type="submit"
        disabled={isSubmitting}
        value={isSubmitting ? "Submitting..." : "Submit"}
        className="bg-[#194877] hover:bg-[#202e60] text-[18px] text-white py-3 rounded cursor-pointer disabled:opacity-50"
      />
    </form>
  );
};

export default SignupForm;
