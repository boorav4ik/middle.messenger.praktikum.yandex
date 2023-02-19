import { withStore } from "./withStore";

export const withUser = withStore((state) => ({ user: { ...state.user } }));
