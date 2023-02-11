const {isLoggedIn, isNotLoggedIn} = require('./middlewares');


// describe test : 전역변수
describe('isLoggdIn', () => {
    // 가짜 만들어주기
    const req = {        
        isAuthenticated : jest.fn(() => true)
    }
    const res = {
        status : jest.fn(() => res),
        send: jest.fn(),
    }
    const next = jest.fn()
    
    test('로그인되어 있으면 isLoggedIn이 next를 호출해야 함', () => {
        isLoggedIn(req, res, next)
        expect(next).toBeCalledTimes(1);
    })

    test('로그인되어 있지 않으면 isLoggedIn이 에러 객체 호출해야 함', () => {
        // 테스트마다 달라지기에
        const req = {
            isAuthenticated : jest.fn(() => false)
        }
        isLoggedIn(req, res, next)
        expect(res.status).toBeCalledWith(403);
        expect(res.send).toBeCalledWith('로그인 필요');
        
    })

})

describe('isNotLoggedIn', () => {
    const req = {        
        isAuthenticated : jest.fn(() => false)
    }
    const res = {
        status : jest.fn(() => res),
        redirect: jest.fn(), // 가짜 함수
    }
    const next = jest.fn()
    test('로그인되어 있으면 isNotLoggedIn이 에러를 호출해야 함', () => {
        const req = {
            isAuthenticated : jest.fn(() => true)
        }
        const message = encodeURIComponent('로그인한 상태입니다.')
        isNotLoggedIn(req, res, next)
        expect(res.redirect).toBeCalledWith(`/?error=${message}`)
    })

    test('로그인되어 있으면 isNotLoggedIn이 next를 호출해야 함', () => {
        isNotLoggedIn(req, res, next)
        expect(next).toBeCalledTimes(1);
    })
})