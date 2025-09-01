export const capitalizeText = (text: string) => {
    if (!text) return text;
    const splitName = text.split(" ");
    for (let i = 0; i < splitName.length; i++) {
      splitName[i] =
        splitName[i].charAt(0).toUpperCase() +
        splitName[i].slice(1).toLowerCase();
    }
    return splitName.join(" ");
  };
  
  
  export const capitalizeFirstLetter = (text: string) => {
    if (!text) return text
    return text.charAt(0).toUpperCase() + text.slice(1)
  }