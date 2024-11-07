import { Router } from "express";
import auth from "../middleware/auth";
import { getContacts } from "../controllers/contactsController";

const router = Router();

router.get("/contacts", auth, getContacts);

export default router;
