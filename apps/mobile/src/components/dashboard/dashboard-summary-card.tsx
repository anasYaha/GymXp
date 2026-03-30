export interface DashboardSummaryCardProps {
  title: string;
  value: string | number;
  helperText?: string;
}

export const DashboardSummaryCard = ({
  title,
  value,
  helperText
}: DashboardSummaryCardProps) => ({
  title,
  value,
  helperText
});

