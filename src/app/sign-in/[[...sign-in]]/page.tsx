import { SignIn } from "@clerk/nextjs";

export default function SigIn() {
  return <SignIn path="/sign-in" appearance={{ elements: { footerAction__signIn: {display: "none"} }}} />;
}