import Chip from '@mui/material/Chip';

const STATUS_META = {
  pending: { label: 'PENDING', color: '#9E6B1F' },
  in_progress: { label: 'IN PROGRESS', color: '#2B4C7E' },
  completed: { label: 'COMPLETED', color: '#3F6B4F' },
};

export default function StatusChip({ status }) {
  const meta = STATUS_META[status] ?? STATUS_META.pending;

  return (
    <Chip
      label={meta.label}
      size="small"
      sx={{
        color: meta.color,
        borderColor: meta.color,
        backgroundColor: 'transparent',
      }}
    />
  );
}