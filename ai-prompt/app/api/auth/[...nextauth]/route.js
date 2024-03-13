import { options } from "./options";
import nextAuth from "next-auth";

const handler = nextAuth;
export {handler as GET, handler as POST}