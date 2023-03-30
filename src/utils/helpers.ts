export const shortenDisplayName = (name: string) => {
  if (name.length > 7) {
    return `${name?.slice(0, -6)}...`;
  } else {
    return name;
  }
};

export const transformErrorMessage = (msg: string) => {
  return msg.split("/")[1].slice(0, -2);
};
