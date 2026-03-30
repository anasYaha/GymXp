import { ScreenShell } from "../../components/common/screen-shell";
import {
  DEMO_AUTH_RESPONSE,
  DEMO_BRANCHES,
  DEMO_BRANCH_ID,
  DEMO_BRAND_ID
} from "../../constants/demo";
import { registerMember } from "../../features/auth/auth.service";

export const RegisterScreen = () =>
  ScreenShell({
    title: "Create member account",
    subtitle: "Registration stays inside one gym brand and one initial branch for the demo.",
    content: {
      fields: [
        {
          id: "fullName",
          label: "Full name",
          defaultValue: DEMO_AUTH_RESPONSE.user.fullName
        },
        {
          id: "email",
          label: "Email",
          defaultValue: DEMO_AUTH_RESPONSE.user.email
        },
        {
          id: "password",
          label: "Password",
          defaultValue: "demo-password",
          secure: true
        },
        {
          id: "brandId",
          label: "Brand",
          defaultValue: DEMO_BRAND_ID
        },
        {
          id: "branchId",
          label: "Initial branch",
          defaultValue: DEMO_BRANCH_ID,
          options: DEMO_BRANCHES.map((branch) => ({
            value: branch.id,
            label: branch.name
          }))
        }
      ],
      actions: {
        submit: registerMember
      }
    }
  });

