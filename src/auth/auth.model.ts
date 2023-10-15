import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface AuthModel extends Base {}
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class AuthModel extends TimeStamps {
  @prop({ unique: true })
  email: string;

  @prop()
  passwordHash: string;
}
