// import React from 'react'

const UsernameAvatarFallout = (strA, strB) => {
  return strA.charAt(0).toUpperCase() + strB.charAt(0).toUpperCase();
};

const FormatTimeAgo = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return "Hace " + interval + " años";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return "Hace " + interval + " meses";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return "Hace " + interval + " días";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return "Hace " + interval + " horas";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return "Hace " + interval + " minutos";
  }
  return "Hace " + Math.floor(seconds) + " segundos";
};

export { UsernameAvatarFallout, FormatTimeAgo };
