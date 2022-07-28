setInterval(() => {
    console.log('시직');
    try {
        throw new Error('서버 고장');
    } catch (err){
        console.error(err);
    }
}, 1000);