const express = require('express')
const app = express()
const { ApolloServer, gql } = require('apollo-server-express')
const staticCarsCollection = require('./data').cars

const typeDefs = gql`
    type Query{
        getCars: [Car]
        getCar(id: Int!): Car
    }

    type Car{
        id: ID!
        make: String!
        model: String!
        color: String!
    }
`
const resolvers = {
    Query:{
        getCars: () => {
            return  staticCarsCollection
        },
        getCar: (parent, { id }) => {
            const car = staticCarsCollection.filter(car => car.id === id)
            return car[0]
        }


    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})
server.applyMiddleware({app})

app.listen(3000, ()=> console.info('Apollo is listening at 3000'))