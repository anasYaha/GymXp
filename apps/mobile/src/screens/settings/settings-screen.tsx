<<<<<<< HEAD
export const SettingsScreen = () => "TODO: settings screen";
=======
import { ScreenShell } from "../../components/common/screen-shell";

export const SettingsScreen = () =>
  ScreenShell({
    title: "Settings",
    subtitle: "Member settings stay lightweight in the MVP and should not introduce branch switching yet.",
    content: {
      items: [
        {
          id: "notifications",
          label: "Notifications",
          value: "Enabled for session reminders and branch updates"
        },
        {
          id: "privacy",
          label: "Privacy",
          value: "No global public activity feed"
        },
        {
          id: "support",
          label: "Support",
          value: "Contact your gym branch team"
        }
      ]
    }
  });
>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402

