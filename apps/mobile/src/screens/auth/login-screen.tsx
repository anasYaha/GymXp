import { ScreenShell } from "../../components/common/screen-shell";
import { DEMO_ONBOARDING_AUTH_RESPONSE } from "../../constants/demo";
import { loginMember } from "../../features/auth/auth.service";

export const LoginScreen = () =>
  ScreenShell({
    title: "Member login",
    subtitle: "Sign in to your gym brand account, then continue into your active branch.",
    content: {
      fields: [
        {
          id: "email",
          label: "Email",
          defaultValue: DEMO_ONBOARDING_AUTH_RESPONSE.user.email
        },
        {
          id: "password",
          label: "Password",
          defaultValue: "demo-password",
          secure: true
        }
      ],
      actions: {
        submit: loginMember
      }
    }
  });

