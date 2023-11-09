import { Users } from "@/db/models/User";
import { ObjectId } from "mongodb";

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
  var oid = new ObjectId(id as string);
  const updatedUser = await Users.findOneAndUpdate({ _id: oid }, { $set: { username, icon, password } });

  if (!updatedUser) {
    return { succes: false };
  }

  return { succes: true };
}
