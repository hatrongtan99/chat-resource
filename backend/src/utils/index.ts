import * as bcrypt from 'bcrypt';

export const hashValue = (value: string): Promise<string> => {
    return bcrypt.hash(value, 10);
};

export const compareValue = (
    value: string,
    encrypted: string,
): Promise<boolean> => {
    return bcrypt.compare(value, encrypted);
};
