jest.mock('../models/user')
const User = require('../models/user');
const { addFollowing } = require('./user');

describe('addFollowing', () => {

    const req = {
        user : {id : 1},
        params : { id : 2 },
    }
    const res = {
        status : jest.fn(() => res),
        send : jest.fn(),
    }
    const next = jest.fn()

    test('사용자를 찾아 팔로잉을 추가 후 성공응답을 보냅니다.', async() => {    
        User.findOne.mockReturnValue(Promise.resolve({
            id : 1,
            name : 'zerocho', 
            addFollowings(value) {
                return Promise.resolve(true);
            }
        })); 
        await addFollowing(req, res, next);
        expect(res.status).toBeCalledWith(200);
        expect(res.send).toBeCalledWith('success');
    })
    
    test('사용자가 없어서 404 error를 보내고 no user라고 클라이언트에게 메시지를 보냄', async() => {
        User.findOne.mockReturnValue(Promise.resolve(null)); 
        await addFollowing(req, res, next); 
        expect(res.status).toBeCalledWith(404);
        expect(res.send).toBeCalledWith('no user');
    })

    test('DB오류로 인해 error 터져서 next(error)를 호출', async() => {
        const error = '테스트용 에러'
        User.findOne.mockReturnValue(Promise.reject(error)); 
        await addFollowing(req, res, next)
        expect(next).toBeCalledWith(error);
    })
})