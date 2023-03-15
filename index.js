const { ApolloServer, gql } = require("apollo-server");

const Company = [
    {
        companyName: "Mystic perfumes ",
        companyId: 130131,
        companyAddress: "43, markdown street, NY",
        companyProducts: ["perfumes", "Deodorants", "Belts"],
        categoryId: 10001,
    },
    {
        companyName: "Nova skaters Ltd.",
        companyId: 458796,
        companyAddress: "12th street Philadelphia, PA",
        companyProducts: ["Rollers", "Skate Boards", "skate shoes"],
        categoryId: 10002,
    },
    {
        companyName: "Julie & Jolly Pvt. Ltd.",
        companyId: 194152,
        companyAddress: "2-B, near amandiel park, LA",
        companyProducts: ["cashew", "Almonds", "walnuts"],
        categoryId: 10003,
    },
    {
        companyName: "Kroger Pvt. Ltd.",
        companyId: 458796,
        companyAddress: "Chicago IL",
        companyProducts: ["bicycles", "Mountain Bikes", "Bikes"],
        categoryId: 10002,
    },
    {
        companyName: "Rite Aid Corporation",
        companyId: 291412,
        companyAddress: "Houston, TX",
        companyProducts: ["First Aid kits", "Capsules", "Medicines"],
        categoryId: 10004,
    },
    {
        companyName: "Stroll the troll INC",
        companyId: 194152,
        companyAddress: "West Cost, CN",
        companyProducts: ["wafers", "toffees", "crackles"],
        categoryId: 10003,
    },
]

const Categories = [
    {
        id: 10001,
        name: "men Grooming"
    },
    {
        id: 10002,
        name: "rides"
    },
    {
        id: 10003,
        name: "food items"
    },
    {
        id: 10004,
        name: "Medical service"
    },
]


const typeDefs = gql`
    type Query {
        productName: String,
        productColors: [String],
        productCompany: [Company!]!
        singleCompany(id:Int!): Company
        catagories: [Category!]!
        singleCategory(id: Int!): Category
    },
    type Company {
        companyName: String,
        companyId: Int!,
        companyAddress: String,
        companyProducts: [String!]!,
        category: Company
    },
    type Category {
        id: Int!,
        name: String!
        products: [Company!]!
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
            return Company // this will return the data from the Company object
        },
        singleCompany: (parent, args, context) => {
            const company = Company.find(company => company.companyId === args.id)
            return company
            // This will return company having the matching id of the product
        },
        catagories: () => {
            return Categories // This will return the Categories Object
        },
        singleCategory: (parent, args, context) => {
            const category = Categories.find((category) => {
                // console.log(category)
                return args.id === category.id
            });
            return category
        }
    },
    Category: {
        products: (parent, args, context) => {
            // console.log(parent)
            const product = Company.filter((product) => {
                // console.log(product);
                // console.log(product.categoryId);
                return product.categoryId === parent.id;
            })
            return product;
        }
    }
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

