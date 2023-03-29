export const shortenDisplayName = (name: string) => {
  if (name.length > 7) {
    return `${name?.slice(0, -6)}...`;
  } else {
    return name;
  }
};
