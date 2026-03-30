import { ScreenShell } from "../../components/common/screen-shell";
import { getMySessions } from "../../features/session/session.service";

export const SessionListScreen = async () => {
  const sessions = await getMySessions();

  return ScreenShell({
    title: "Session history",
    subtitle: "Your workout history is listed inside the active branch context.",
    content: {
      items: sessions.items
    }
  });
};

