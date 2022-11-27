export type UpdateCategoryDto = {
  id: string;
  name?: string;
  description?: string|null;
  isActive?: boolean;
};