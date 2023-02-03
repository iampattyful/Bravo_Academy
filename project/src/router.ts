import { Router } from "express";

const router = Router();

import { loginRoutes } from "./loginRoutes";
router.use("/", loginRoutes);

//sign up
import { signupRoutes } from "./signupRoutes";
router.use("/", signupRoutes);

//logout
import { logoutRoutes } from "./logoutRoutes";
router.use("/", logoutRoutes);

//check login
import { checkLoginRoutes } from "./checkLoginRoutes";
router.use("/", checkLoginRoutes);

//loadTeacher
import { loadTeacherRoutes } from "./loadTeacherRoutes";
router.use("/", loadTeacherRoutes);

//loadTeacherIndividualPageRoutes
import { loadTeacherIndividualPageRoutes } from "./loadTeacherIndividualPageRoutes";
router.use("/", loadTeacherIndividualPageRoutes);

//loadTeacherSettingsRoutes
import { loadTeacherSettingsRoutes } from "./loadTeacherSettingsRoutes";
router.use("/", loadTeacherSettingsRoutes);

//updateTeacherSettingsRoutes
import { updateTeacherSettingsRoutes } from "./updateTeacherSettingsRoutes";
router.use("/", updateTeacherSettingsRoutes);

//update student profile
import { updateStudentLoginRoutes } from "./updateStudentLoginRoutes";
router.use("/", updateStudentLoginRoutes);

//load student profile
import { loadStudentProfileRoutes } from "./loadStudentProfileRoutes";
router.use("/", loadStudentProfileRoutes);

//bookmark
import { bookmarkRoutes } from "./bookmarkRoutes";
router.use("/", bookmarkRoutes);

//remove bookmark
import { removeBookmarkRoutes } from "./removeBookmarkRoutes";
router.use("/", removeBookmarkRoutes);

//contact us
import { contactUsRoutes } from "./contactUsRoutes";
router.use("/", contactUsRoutes);

// load user comment
import { loadUserCommentRoutes } from "./loadUserCommentRoutes";
router.use("/", loadUserCommentRoutes);

// contact teacher
import { contactTeacherRoutes } from "./contactTeacherRoute";
router.use("/", contactTeacherRoutes);

//uncontact teacher
import { removeAppointmentRoutes } from "./removeAppointmentRoutes";
router.use("/", removeAppointmentRoutes);

//load contact us data
import { loadContactUsRoutes } from "./loadContactUsRoutes";
router.use("/", loadContactUsRoutes);

//update contact us data
import { updateContactUsRoutes } from "./updateContactUsRoutes";
router.use("/", updateContactUsRoutes);

export default router;
