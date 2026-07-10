import Avatar from '@mui/material/Avatar';

function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function getColorFromId(id) {
  const palette = ['#7A3B2E', '#2B4C7E', '#3F6B4F', '#6B4E9E', '#9E6B1F', '#2E7A73'];
  return palette[id % palette.length];
}

export default function EmployeeAvatar({ user, size = 26 }) {
  const color = getColorFromId(user.id);

  return (
    <Avatar
      title={user.name}
      sx={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        fontWeight: 700,
        color,
        border: `1.5px solid ${color}`,
        backgroundColor: 'background.paper',
      }}
    >
      {getInitials(user.name)}
    </Avatar>
  );
}