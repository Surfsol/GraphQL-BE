const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require("graphql");

const AllMissions = new GraphQLObjectType({
  name: "Missions",
  fields: () => ({
    mission_name: { type: GraphQLString },
    mission_id: { type: GraphQLString }
    //manufactures: { ManufactureCo }
  })
});

//const ManufactureCo = GraphQLString;

// const MissionsQuery = new GraphQLObjectType({
//   name: "MissionsQueryType",
//   fields: {
//     missions: {
//       type: new GraphQLList(AllMissions),
//       resolve(parent, args) {
//         return axios
//           .get("https://api.spacexdata.com/v3/missions")
//           .then(res => res.data);
//       }
//     }
//   }
// });

module.exports = AllMissions;
