import * as Yup from "yup";
import { fr } from "yup-locales";
import { setLocale } from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signUpUser } from "../../../../Redux/register/slice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

setLocale(fr);

export function UseClient() {
  const [hidePass, setHidePass] = useState(true);
  const [hidePass2, setHidePass2] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lowercaseRegEx = /(?=.*[a-z])/;
  const uppercaseRegEx = /(?=.*[A-Z])/;
  const numericRegEx = /(?=.*[0-9])/;
  const specialsRegEx = /[^A-Za-z 0-9]/g;
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  const HandlehidePass = () => {
    setHidePass(!hidePass);
  };

  const HandlehidePass2 = () => {
    setHidePass2(!hidePass2);
  };

  const IdentityState = {
    firstName: "",
    lastName: "",
    login: "",
    email: "",
    userRole: "CLIENT",
    password: "",
    confirmPassword: "",
  };

  let validationSchema = Yup.object().shape({
    firstName: Yup.string().required("first name is required"),
    lastName: Yup.string().required("last name is required"),
    login: Yup.string().required("pseudo is required"),
    email: Yup.string()
      .required("Email is required")
      .min(8, "Email is too short - must be at least 4 characters.")
      .matches(emailRegex, "Must be a valid email!"),
    password: Yup.string()
      .min(10, "Password is too short - must be at least 10 characters.")
      .matches(lowercaseRegEx, "Must contain a lowercase alphabetic character!")
      .matches(
        uppercaseRegEx,
        "Must contain an uppercase alphabetic character!"
      )
      .matches(numericRegEx, "Must contain a numeric character!")
      .matches(specialsRegEx, "Must contain a special character")
      .required("password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
  const notify = () => toast.success("compte créé avec succès");

  const onSuccesAction = () => {
    notify();
    navigate("/login");
  };

  const onError = (error) => {
    console.log("error", error);
    // toastRef.current.showToast(error);
  };
  const onErrorAction = () => {
    toast.error("échec,quelque chose s'est mal passé ");
  };

  const onRegister = async (values) => {
    let object = {
      onSuccesAction,
      onError,
      onErrorAction,
      obj: values,
    };
    dispatch(signUpUser(object));
    //
  };

  return {
    hidePass,
    validationSchema,
    IdentityState,
    HandlehidePass,
    HandlehidePass2,
    hidePass2,
    onRegister,
  };
}
