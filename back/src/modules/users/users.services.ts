import { Users } from "@/db/models/User";
import { ObjectId } from "mongodb";
import crypto from "crypto";

export async function getUserById(id: string) {
  try {
    var oid = new ObjectId(id);
    const user = await Users.findOne({ _id: oid });
    return user;
  } catch (error) {
    console.error("Error fetching server data:", error);
    throw error;
  }
}

export async function editUser({
  id,
  username,
  icon,
  password,
}: {
  username: string;
  icon: string;
  password: string;
  id: string;
}) {
  let hashedPassword = password;
  if (password != "no-change-&@#1%") {
    hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
  }

  var oid = new ObjectId(id as string);
  const updatedUser = await Users.findOneAndUpdate({ _id: oid }, { $set: { username, icon, hashedPassword } });

  if (!updatedUser) {
    return { succes: false };
  }

  return { succes: true };
}
