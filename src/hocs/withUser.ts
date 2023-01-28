import { whitStore } from "./whitStore";

const withUser = whitStore((state) => ({ ...state.user }));

export default withUser;
