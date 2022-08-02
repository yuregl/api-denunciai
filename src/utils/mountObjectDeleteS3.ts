import { IListSave } from "../interfaces/saveS3";

interface IObjectDelete {
  Key: string
}

const mountObjectDeleteS3 = (value: Array<IListSave>): Array<IObjectDelete> => {
  const arrayKey = value.map(element => {
    return {
      Key: element.key
    }
  });

  return arrayKey;
}

export { mountObjectDeleteS3 }