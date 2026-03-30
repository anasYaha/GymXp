import { ScreenShell } from "../../components/common/screen-shell";
import { DEMO_CREATE_SESSION_REQUEST } from "../../constants/demo";
import { createSession } from "../../features/session/session.service";
import { getDefaultMemberBranch } from "../../features/branch/branch.service";

export const SessionCreateScreen = async () => {
  const branch = await getDefaultMemberBranch();

  return ScreenShell({
    title: "Start workout session",
    subtitle: "New sessions should always be created inside the member's active branch.",
    content: {
      branch: {
        id: branch.id,
        name: branch.name
      },
      fields: [
        {
          id: "muscleGroup",
          label: "Muscle group",
          defaultValue: DEMO_CREATE_SESSION_REQUEST.muscleGroup
        },
        {
          id: "startedAt",
          label: "Started at",
          defaultValue: DEMO_CREATE_SESSION_REQUEST.startedAt
        }
      ],
      actions: {
        submit: (payload: { muscleGroup: string; startedAt: string }) =>
          createSession({
            branchId: branch.id,
            muscleGroup: payload.muscleGroup,
            startedAt: payload.startedAt
          })
      }
    }
  });
};

