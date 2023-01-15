import {
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
} from "sequelize-typescript";

export type CategoryModelProps = {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
};

@Table({ tableName: "categories", timestamps: false })
export class CategorySequelizeModel extends Model<CategoryModelProps> {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare id: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  declare name: string;

  @Column({ allowNull: true, type: DataType.TEXT })
  declare description: string | null;

  @Column({ allowNull: false, type: DataType.BOOLEAN, field: 'is_active' })
  declare isActive: boolean;

  @Column({ allowNull: false, type: DataType.DATE, field: 'created_at' })
  declare createdAt: Date;
}