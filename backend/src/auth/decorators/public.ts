import { SetMetadata } from '@nestjs/common';
export const IS_PUBLIC_CONTANT = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_CONTANT, true);
