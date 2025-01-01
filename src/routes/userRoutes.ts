import { Router } from "express";
import { UserController } from "../controllers/userController";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();
const userController = new UserController();

// User routes
router.get("/", (req, res) => {
  verifyToken(req, res, () => {
    userController.getAllUsers(req, res);
  });
});
router.get("/:id", (req, res) => {
  verifyToken(req, res, () => {
    userController.getUserById(req, res);
  });
});
router.post("/", (req, res) => {
  verifyToken(req, res, () => {
    userController.createUser(req, res);
  });
});
router.put("/:id", (req, res) => {
  verifyToken(req, res, () => {
    userController.updateUser(req, res);
  });
});
router.delete("/:id", (req, res) => {
  verifyToken(req, res, () => {
    userController.deleteUser(req, res);
  });
});
router.post("/login", (req, res) => {
  userController.loginUser(req, res);
});

export default router;
