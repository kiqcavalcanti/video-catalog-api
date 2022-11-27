import { UuidValueObject } from '../../../@shared/domain';
import { Entity } from '../../../@shared/domain';

export interface CategoryProps {
  name: string;
  description?: string | null;
  isActive?: boolean;
  createdAt?: Date;
}

export interface UpdateCategoryProps {
  name?: string;
  description?: string | null;
}

export class Category extends Entity<CategoryProps> {
  constructor(props: CategoryProps, uuid?: UuidValueObject | null) {
    super(props, uuid);
    this.description = this.props.description ?? null;
    this.isActive = this.props.isActive ?? true;
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  get description(): string | null {
    return this.props.description as string | null;
  }

  set description(value: string | null) {
    this.props.description = value;
  }

  get isActive(): boolean {
    return this.props.isActive as boolean;
  }

  set isActive(value: boolean) {
    this.props.isActive = value;
  }

  get createdAt(): Date {
    return this.props.createdAt as Date;
  }

  public update(props: UpdateCategoryProps) {

    if(typeof props.name !== 'undefined') {
      this.name = props.name;
    }

    if(typeof props.description !== 'undefined') {
      this.description = props.description;
    }
  }

  public activate() {
    this.isActive = true;
  }

  public deactivate() {
    this.isActive = false;
  }
}
