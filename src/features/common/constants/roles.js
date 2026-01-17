
export const ROLES = {
  USER: 'user',
  ARTIST: 'artist',
  OWNER: 'owner',
  DRIVER: 'driver',
  SUPER_ADMIN: 'super_admin',
};

export const rolesOptions = [
  { label: 'Usuario', value: ROLES.USER },
  { label: 'Artista', value: ROLES.ARTIST },
  { label: 'Dueño / Encargado', value: ROLES.OWNER },
  { label: 'Super Admin', value: ROLES.SUPER_ADMIN },
  { label: 'Conductor', value: ROLES.DRIVER },
];