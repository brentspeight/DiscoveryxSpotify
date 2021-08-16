require('dotenv').config()

const Credentials = () => {

    return {
        ClientId: process.env.ClientId,
        ClientSecret: process.env.ClientSecret
    }
}

export { Credentials };
