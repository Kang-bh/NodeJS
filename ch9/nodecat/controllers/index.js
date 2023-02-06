const axios = require('axios');

const URL = process.env.URL
axios.defaults.headers.origin = process.env.ORIGIN

const request = async(req, api) => {
    try {
        if(!req.session.jwt) {
            const tokenResult = await axios.post(`${URL}/token`, {
                clientSecret : process.env.CLIENT_SECRET,
            });
            req.session.jwt = tokenResult.data.token
        }

        return await axios.get(`${URL}${api}`, {
            headers : {authorization : req.session.jwt },
        });
    } catch (err) {
        if(err.response?.status === 419) {
            delete req.session.jwt;
            return request(req, api);
        }

        return err.response
    }
}

const getMyPosts = async(req, res, next) => {
    try {
        const result = await request(req, '/posts/my');

        console.log(result);

        res.json(result.data);
    } catch(error) {
        console.error(error);
        next(error)
    }
}

const searchByHashtag = async(req, res, next) => {
    try {
        const result = await request(
            req, `/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`,
        )
        res.json(result.data)
    } catch (error) {
        if (error.code) {
            console.error(error);
            next(error);
        }
    }
}

module.exports = {
    getMyPosts,
    searchByHashtag
}