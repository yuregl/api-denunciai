import { Request, Response, NextFunction} from 'express';

const parseRequestComplaintsCreate = function (req: Request, res: Response, next: NextFunction) {
  const parseValue = JSON.parse(req.body.body)
  const dateImages = `${Date.now()}`
  parseValue.dateImages = dateImages;
  if(!parseValue.userId || req.files.length === 0){
    return res.sendStatus(400).json({message: "Unsent data"})
  }
  req.body = parseValue;

  return next()
}

export { parseRequestComplaintsCreate }