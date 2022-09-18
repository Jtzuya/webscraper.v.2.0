const typeorm = require('typeorm');

// Create a new model
class Creator {
    // This constructor will have properties for id, name, img, ytURL
    // Basically everything we want to store in our database table
    constructor(id, name, img, ytURL) {
        this.id = id
        this.name = name
        this.img = img
        this.ytURL = ytURL
    }
}

// Create Schema, formalize definition of the schema and how it maps to our database
const EntitySchema = require('typeorm').EntitySchema

const CreatorSchema = new EntitySchema({
    name: 'Creator',
    target: Creator,
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        name: {
            type: 'varchar'
        },
        img: {
            type: 'text'
        },
        ytURL: {
            type: 'text'
        }
    }
})

// To interact with our database, we need to create an interaction
async function getConnection() {
    return await typeorm.createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "password",
        database: "scrapedData", // Name of the mysql database created
        synchronize: true,
        logging: false,
        entities: [
            CreatorSchema
        ]
    })
}

// This functions will use in all creators route.
// This will return everything from our creators table
async function getAllCreators() {
    // Make the connection
    const connection = await getConnection()

    // On the connection, there's a getRepository method which we get an access to that table.
    const creatorRepo = connection.getRepository(Creator)

    // Call find method on the repository, it will select everything in that table
    const creators = await creatorRepo.find()

    // Since we have our data, we close the connection
    connection.close()
    return creators
}

async function insertCreator(name, img, ytURL) {
    const connection = await getConnection()

    // create
    const creator = new Creator()
    creator.name = name
    creator.img = img
    creator.ytURL = ytURL

    // save
    const creatorRepo = connection.getRepository(Creator)
    const res = await creatorRepo.save(creator)

    // return new list of new creators
    const allCreators = await createRepo.find()
    connection.close()
    return allCreators
}

// Export function to be used in our API (index.js file)
module.exports = {
    getAllCreators,
    insertCreator
}