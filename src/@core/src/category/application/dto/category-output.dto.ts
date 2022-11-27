import { Category } from "../../domain";

export type CategoryOutputDto = {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
};