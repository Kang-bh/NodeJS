const supertest = require('supertest');
const { sequelize } = require('../models');
const app = require('../app');

// beforeAll 에서 바로 force true 해도 ㄱㅊ 
beforeAll(async() => {
    await sequelize.sync();
})


describe('POST /join', () => {
    test("로그인 안 했으면 가입", (done) => {
        supertest(app)
            .post('/auth/join')
            .send({
                email: 'rkdgh3885@naver.com',
                nick: 'kang',
                password : 'rkdgh123'
            })
            .expect('Location', '/')
            .expect(302, done);
    })
})

describe('POST /join', () => {
    const agent = supertest.agent(app);
    beforeEach((done) => {
      agent
        .post('/auth/login')
        .send({
          email: 'rkdgh3885@naver.com',
          password: 'rkdgh123',
        })
        .end(done);
    });
  
    test('이미 로그인했으면 redirect /', (done) => {
      const message = encodeURIComponent('로그인한 상태입니다.');
      agent
        .post('/auth/join')
        .send({
          email: 'rkdgh3885@naver.com',
          nick: 'kang',
          password: 'rkdgh123',
        })
        .expect('Location', `/?error=${message}`)
        .expect(302, done);
    });
  });
  
describe('POST /login', () => {
    test('가입되지 않은 회원', (done) => {
        const message = encodeURIComponent('가입되지 않은 회원입니다.')
        supertest(app)
            .post('/auth/login')
            .send({
                email: 'rkds@naver.com',
                password: 'rkdgh123',
            })
            .expect('Location', `/?loginError=${message}`)
            .expect(302, done);
    });

    test('로그인 수행', (done) => {
        supertest(app)
            .post('/auth/login')
            .send({                
                email: 'rkdgh3885@naver.com',
                password: 'rkdgh123',
            })
            .expect('Location', '/')
            .expect(302, done);
    })
    test('비밀번호 틀림', (done) => {
        const message = encodeURIComponent('비밀번호가 일치하지 않습니다.')
        supertest(app)
            .post('/auth/login')
            .send({                
                email: 'rkdgh3885@naver.com',
                password: 'wrong',
            })
            .expect('Location', `/?loginError=${message}`)
            .expect(302, done);
    })
})


describe('GET /logout', () => {
    test('로그인 안되어 있으면 403', (done) => {
        supertest(app)
            .get('/auth/logout')
            .expect(403, done);
    });

    const agent = supertest.agent(app);
    beforeEach((done) => {
        agent
            .post('/auth/login')
            .send({
                email: 'rkdgh3885@naver.com',
                password :'rkdgh123',
            })
            .end(done);
    });

    test('logout', (done) => {
        agent
            .get('/auth/logout')
            .expect('Location', '/')
            .expect(302, done);
    })
})

afterAll(async () => {
    await sequelize.sync({ force: true });
  });