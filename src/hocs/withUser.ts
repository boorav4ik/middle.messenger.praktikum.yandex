import { whitStore } from "./whitStore";

const withUser = whitStore((state) => {
  const output = { ...state.user };
  return output;
});

export default withUser;
