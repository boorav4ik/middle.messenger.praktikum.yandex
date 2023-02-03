import { whitStore } from "./whitStore";

const withUser = whitStore((state) => {
  const output = { ...state.user };
  console.log("withUser", { state, output });

  return output;
});

export default withUser;
