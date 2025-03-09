export const generateUniqueId = () => {
  return (Date.now() + Math.floor(Math.random() * 1000)).toString();
};
