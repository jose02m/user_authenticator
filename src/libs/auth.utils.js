import bcrypt from 'bcryptjs';

const DUMMY_BCRYPT_HASH = '$2b$12$y1oOZ1DhtjfiPgkBC5T9M.Sr7rA1kZZgwyU0YJIUKGwEuKXXSb9vy';

export const passwordCheck = async (password, userHash) => {
    if (userHash) {
        const realHash = await bcrypt.compare(password, userHash);
        await bcrypt.compare('constant-string', DUMMY_BCRYPT_HASH);
        return realHash;
    }

    await bcrypt.compare(password, DUMMY_BCRYPT_HASH);
    await bcrypt.compare('constant-string', DUMMY_BCRYPT_HASH);
    return false;
}