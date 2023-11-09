import { Category } from "@/types/categories.types";
import { db } from "../mongo";

export const Categories = db!.collection<Category>("categories");
