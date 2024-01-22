import toast from "react-hot-toast";

export function UseDetailsHook() {
  const notify = () => toast.success("détails client geted successfully");
  const onError = () => {};
  const onSuccesAction = () => {
    notify();
  };

  const onErrorAction = (message) => {
    toast.error(message);
  };

  return {
    onError,
    onSuccesAction,
    onErrorAction,
  };
}
