import { withStore } from "./withStore";

const withUser = withStore((state) => {
  const output = { ...state.user };
  return output;
});

export default withUser;
