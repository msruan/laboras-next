import type { Metadata } from "next";
import { LoginPage } from '@/components/pages/login-page';

export const metadata: Metadata = {
  title: "Login",
  description: "A nice login page",
};

const Login = () => <LoginPage/>

export default Login
