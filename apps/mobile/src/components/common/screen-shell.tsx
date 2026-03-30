export interface ScreenShellProps<TContent> {
  title: string;
  subtitle?: string;
  content: TContent;
}

export const ScreenShell = <TContent>({
  title,
  subtitle,
  content
}: ScreenShellProps<TContent>) => ({
  title,
  subtitle,
  content
});

