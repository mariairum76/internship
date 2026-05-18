import express, {
  Request,
  Response,
  NextFunction
} from "express";

const app = express();

interface CustomRequest extends Request {
  user?: string;
}

const auth = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {

  req.user = "Maria";

  next();
};

app.get(
  "/profile",
  auth,
  (req: CustomRequest, res: Response) => {

    res.send(req.user);
  }
);

app.listen(3000, () => {
  console.log("Server running");
});