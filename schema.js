const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require("graphql");

//Launch Type
const LaunchType = new GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    rocket: { type: RocketType }
  })
});

//Rocket Type
//match type to character types you are feteching
const RocketType = new GraphQLObjectType({
  name: "Rocket",
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString }
  })
});

// Root Query, similar to .get data
//ex. search:
// {
//     launches{
//       mission_name,
//       flight_number,
//       launch_date_local,
//       rocket {
//         rocket_id
//         rocket_name
//         rocket_type
//       }
//     }
//   }
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    //launches - want an array of launches -> use GraphQLList
    launches: {
      //need list GraphQLList
      type: new GraphQLList(LaunchType),
      // axios because going to an api, otherwise could retrieve from a database
      resolve(parent, args) {
        return axios
          .get("https://api.spacexdata.com/v3/launches")
          .then(res => res.data);
      }
    },
    //get a single launch, .get by id
    //ex.search : {
    //   launch(flight_number: 2){
    //     mission_name
    //   }
    // }
    launch: {
      type: LaunchType,
      args: {
        flight_number: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
          .then(res => res.data);
      }
    }
  }
});

//could also take mutations if had any
module.exports = new GraphQLSchema({
  query: RootQuery
});
