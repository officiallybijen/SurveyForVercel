import { v4 as uuidv4 } from "uuid";


export const generateFormType = (type) => {
  const defaultAttr = { isRequired: false };
  switch (type) {
    case "email":
      return {
        id: uuidv4(),
        type: "text",
        isRequired: true,
        name: "email"
      }
    case "text":
      return {
        id: uuidv4(),
        type,
        ...defaultAttr,
      };
    case "dropdown":
      return {
        id: uuidv4(),
        type,
        ...defaultAttr,
      };
    case "rating":
      return {
        id: uuidv4(),
        type,
        ...defaultAttr,
      };
    case "boolean":
      return {
        id: uuidv4(),
        type,
        ...defaultAttr,
      };
    case "comment":
      return {
        id: uuidv4(),
        type,
        ...defaultAttr,
      };
    case "signaturepad":
      return {
        id: uuidv4(),
        type,
        ...defaultAttr,
      };
    case "radiogroup":
        return {
          id: uuidv4(),
          type,
          ...defaultAttr,
        };  
    default:
      return {};
  }
};
