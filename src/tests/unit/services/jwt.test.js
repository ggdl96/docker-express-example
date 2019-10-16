const jwtService = require('../../../services/jwt');

describe('JWT Generator', function () {
    describe('Success', function () {
        it('should generate JWT  token', async function () {
            const token = await jwtService.generateToken({
                name: 'pepe',
                email: 'pepe@gmail.com',
                role: 'admin',
            });
            expect(token);
        });
    
        it('should decode JWT token', async function () {
            const token = await jwtService.generateToken({
                name: 'pepe',
                email: 'pepe@gmail.com',
                role: 'admin',
            });
    
            const user = jwtService.decode(token,  { algorithm: 'RS256', expiresIn: 1000 * 20 });
    
            expect(user).toHaveProperty('exp');
            expect(user).toHaveProperty('iat');
    
            expect(user.email).toEqual('pepe@gmail.com');
            expect(user.name).toEqual('pepe');
            expect(user.role).toEqual('admin');
        });

        it('should decode JWT token', async function () {
            const token = await jwtService.generateToken({
                name: 'pepe',
                email: 'pepe@gmail.com',
                role: 'admin',
            });
    
            const user = jwtService.decode(token,  {});
    
            expect(user).toHaveProperty('exp');
            expect(user).toHaveProperty('iat');
    
            expect(user.email).toEqual('pepe@gmail.com');
            expect(user.name).toEqual('pepe');
            expect(user.role).toEqual('admin');
        });
    });

    describe('Failure', function () {
        describe('Generate Token', function () {
            it('should throw error if name not provided', async function () {
                const token = jwtService.generateToken({
                    email: 'pepe@gmail.com',
                    role: 'admin',
                });
                await expect(token).rejects.toThrow('Can\'t generate token. Please provide a valid user');
            });
    
            it('should throw error if email not provided', async function () {
                const token = jwtService.generateToken({
                    name: 'pepe',
                    role: 'admin',
                });
                await expect(token).rejects.toThrow('Can\'t generate token. Please provide a valid user');
            });
    
            it('should throw error if role not provided', async function () {
                const token = jwtService.generateToken({
                    name: 'pepe',
                    email: 'pepe@gmail.com',
                });
                await expect(token).rejects.toThrow('Can\'t generate token. Please provide a valid user');
            });
    
            it('should throw error if nothing is provided', async function () {
                const token = jwtService.generateToken();
                await expect(token).rejects.toThrow('Can\'t generate token. Please provide a valid user');
            });
        });

        describe('decode', function () {
            it('should throw error if token not provided', async function () {            
                expect(() => jwtService.decode()).toThrow('No token was provided');
            });

            it('should return null if token not valid', async function () {            
                expect(jwtService.decode('some-token')).toBeNull();
            });
        });
    });
});