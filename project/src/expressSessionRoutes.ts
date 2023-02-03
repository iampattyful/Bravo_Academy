import expressSession from "express-session";

//export const expressSessionRoutes = express.Router();
// expressSessionRoutes.use(
// expressSession({
//   secret: "testingABC",
//   resave: true,
//   saveUninitialized: true,
// })
// );
export const applyExpressSessionMiddleware = expressSession({
  secret: "testingABC",
  resave: true,
  saveUninitialized: true,
});

declare module "express-session" {
  interface SessionData {
    counter?: number;
    user?: {
      id?: string;
      username?: string;
      role_id?: string;
      subject_id?: string;
    };
  }
}
