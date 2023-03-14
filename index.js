const { ApolloServer, gql } = require("apollo-server");

const Company = [
    {
        companyName: "Mystic perfumes ",
        companyId: 130131,
        companyAddress: "43, markdown street, NY",
        companyProducts: ["perfumes", "Deodorants", "Belts"]
    },
    {
        companyName: "Nova skaters Ltd.",
        companyId: 458796,
        companyAddress: "12th street Philadelphia, PA",
        companyProducts: ["Rollers", "Skate Boards", "skate shoes"]
    },
    {
        companyName: "Julie & Jolly Pvt. Ltd.",
        companyId: 194152,
        companyAddress: "2-B, near amandiel park, LA",
        companyProducts: ["cashew", "Almonds", "walnuts"]
    },
    {
        companyName: "Kroger Pvt. Ltd.",
        companyId: 458796,
        companyAddress: "Chicago IL",
        companyProducts: ["bicycles", "Mountain Bikes", "Bikes"]
    },
    {
        companyName: "Rite Aid Corporation",
        companyId: 291412,
        companyAddress: "Houston, TX",
        companyProducts: ["First Aid kits", "Capsules", "Medicines"]
    },
]

const Catagories = [
    {
        id: 194152,
        name: "dry fruits"
    },
    {
        id: 291412,
        name: "Medical service"
    },
    {
        id: 130131,
        name: "men Grooming"
    },
    {
        id: 458796,
        name: "rides"
    },
]


const typeDefs = gql`
    type Query {
        productName: String,
        productColors: [String],
        productCompany: [Company!]!
        singleCompany(id:Int!): Company
        catagories: [Category!]!
        category(id: Int!): Category
    },
    type Company {
        companyName: String,
        companyId: Int!,
        companyAddress: String,
        companyProducts: [String!]!
    },
    type Category {
        id: Int!,
        name: String!
    }
`

const resolvers = {
    Query: {
        productName: () => {
            return "college bag"
        },
        productColors: () => {
            return ["Ocean Blue", "Midnight Black", "Military Green", "Nebula Red"];
        },
        productCompany: () => {
            return Company
        },
        singleCompany: (parent, args, context) => {
            const company = Company.find(company => company.companyId === args.id)
            return company
        },
        catagories: () => {
            return Catagories
        },
        category:(parent, args, context)=>{
            console.log(args.id)

            const category = Catagories.find((value)=> value.id === args.id)
            return category
        }
    },
}

const server = new ApolloServer(
    {
        typeDefs,
        resolvers
    }
);

server.listen().then(({ url }) => {
    console.log("server Ready at : " + url);
});

