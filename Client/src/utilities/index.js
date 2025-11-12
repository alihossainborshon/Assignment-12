export const shortImageName = (image, length = 10) => {
  if (!image || typeof image?.name !== "string") return "Choose Images  ";
  if (image?.name.length <= 15) return image?.name;
  return image?.name.substring(0, length) + `...${image?.type.split("/")[1]}`;
};
